import {
  EMAIL_PATTERN,
  LIMITS,
  REQUEST_TYPES,
  SECTOR_OPTIONS,
  isRequestKey,
  isValidPhone,
} from "@/components/v2/contact/options";

/* Receives the v2 contact form (components/v2/contact/ContactForm.tsx).

   Kept apart from /api/contact so either design can be removed on its own.
   Delivery is the same: set CONTACT_WEBHOOK_URL to any endpoint that accepts
   a JSON POST and each request is forwarded there. Without it, development
   logs the request and production answers 503, so a missing setting can't
   silently drop leads. */

type Submission = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  sector: string;
  requestType: string;
  message: string;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function parse(body: unknown): Submission | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;

  if (!isRequestKey(input.requestType)) return null;

  const submission: Submission = {
    fullName: text(input.fullName, LIMITS.fullName),
    company: text(input.company, LIMITS.company),
    email: text(input.email, LIMITS.email),
    phone: text(input.phone, LIMITS.phone),
    jobTitle: text(input.jobTitle, LIMITS.jobTitle),
    sector: text(input.sector, 40),
    /* Forward the readable label rather than the internal key. */
    requestType: REQUEST_TYPES.find((type) => type.value === input.requestType)!.label,
    message: text(input.message, LIMITS.message),
  };

  const valid =
    submission.fullName.length >= 2 &&
    submission.company.length > 0 &&
    EMAIL_PATTERN.test(submission.email) &&
    isValidPhone(submission.phone) &&
    (SECTOR_OPTIONS as readonly string[]).includes(submission.sector) &&
    submission.message.length > 0 &&
    input.consent === true;

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
      console.info("[contact v2] CONTACT_WEBHOOK_URL is not set; request:", submission);
      return Response.json({ ok: true });
    }
    console.error("[contact v2] CONTACT_WEBHOOK_URL is not set; request not delivered.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: "v2",
        ...submission,
        submittedAt: new Date().toISOString(),
        source: request.headers.get("referer") ?? "transformix-v2",
      }),
    });
    if (!response.ok) throw new Error(`webhook answered ${response.status}`);
  } catch (error) {
    console.error("[contact v2] delivery failed:", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
