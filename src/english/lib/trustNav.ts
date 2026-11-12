/* الثقة والحوكمة — the trust and governance pages, in the order their
   banners link to one another (Figma 4796:6202, 4796:6403, 4797:6416). The
   navbar lists them under الموارد. */

export const TRUST_LABEL = "Trust & Governance";

export const TRUST_HREF = "/en/trust";

export const TRUST_NAV = [
  { slug: "ethics", label: "Our Ethics" },
  { slug: "code-of-conduct", label: "Code of Professional Conduct" },
  { slug: "compliance", label: "Regulatory Compliance & Standards" },
] as const;

export type TrustSlug = (typeof TRUST_NAV)[number]["slug"];

export const trustHref = (slug: TrustSlug) => `${TRUST_HREF}/${slug}`;
