/* الثقة والحوكمة — the trust and governance pages, in the order their
   banners link to one another (Figma 4796:6202, 4796:6403, 4797:6416). The
   navbar lists them under الموارد. */

export const TRUST_LABEL = "الثقة والحوكمة";

export const TRUST_HREF = "/trust";

export const TRUST_NAV = [
  { slug: "ethics", label: "أخلاقياتنا" },
  { slug: "code-of-conduct", label: "مدونة السلوك المهني" },
  { slug: "compliance", label: "الامتثال التنظيمي والمعايير" },
] as const;

export type TrustSlug = (typeof TRUST_NAV)[number]["slug"];

export const trustHref = (slug: TrustSlug) => `${TRUST_HREF}/${slug}`;
