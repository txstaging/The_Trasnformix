import { SERVICES } from "@/lib/services";

/* Receives the contact form (components/contact/ContactModal.tsx).

   Delivery: set CONTACT_WEBHOOK_URL to any endpoint that accepts a JSON POST
   — a Make / Zapier / n8n webhook, Formspree, a Slack workflow, a CRM — and
   each request is forwarded there. Without it, development logs the request
   and production answers 503, so a missing setting can't silently drop leads. */

const LIMITS = {
  name: 120,
  phone: 40,
  company: 160,
  website: 300,
  message: 4000,
} as const;

type Submission = {
  name: string;
  phone: string;
  company: string;
  website: string;
  services: string[];
  message: string;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function parse(body: unknown): Submission | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;

  const submission: Submission = {
    name: text(input.name, LIMITS.name),
    phone: text(input.phone, LIMITS.phone),
    company: text(input.company, LIMITS.company),
    website: text(input.website, LIMITS.website),
    message: text(input.message, LIMITS.message),
    services: Array.isArray(input.services)
      ? input.services.filter((item): item is string =>
          (SERVICES as readonly string[]).includes(item as string),
        )
      : [],
  };

  const digits = submission.phone.replace(/\D/g, "");
  const valid =
    submission.name.length >= 2 &&
    /^[+\d\s()-]+$/.test(submission.phone) &&
    digits.length >= 7 &&
    submission.company.length > 0 &&
    submission.services.length > 0;

  return valid ? submission : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const submission = parse(body);
  if (!submission) {
    return Response.json({ error: "invalid_submission" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL is not set; request:", submission);
      return Response.json({ ok: true });
    }
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; request not delivered.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...submission,
        submittedAt: new Date().toISOString(),
        source: request.headers.get("referer") ?? "transformix",
      }),
    });
    if (!response.ok) throw new Error(`webhook answered ${response.status}`);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
