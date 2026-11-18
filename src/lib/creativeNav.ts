/* الإبداع والتسويق الرقمي — the hub and the service pages under it, in the
   order the local nav lists them (Figma V2/Local Nav 4923:9136, the artboard
   4923:9269). The hub is the first tab; every other tab is one service.

   Two of the nine tabs have no page of their own yet (the marketing
   automation and content/PR artboards are not drawn).
   Until they are, their tab and every call that points at them lead to the
   hub's request form; give the entry a `slug` and it becomes a link to its
   page, here and everywhere the entry is used. */

export const CREATIVE_LABEL = "الإبداع والتسويق الرقمي";

export const CREATIVE_HREF = "/services/creative";

/** The hub's request form, where a service without a page sends its calls. */
export const CREATIVE_REQUEST_HREF = `${CREATIVE_HREF}#request`;

export type CreativeKey =
  | "overview"
  | "brand"
  | "marketing"
  | "social"
  | "seo"
  | "automation"
  | "uiux"
  | "creative"
  | "content";

export type CreativeEntry = {
  key: CreativeKey;
  /** The tab, as the local nav draws it. */
  label: string;
  /** The page's own title where the tab shortens it; read out for the tab. */
  title?: string;
  /** The route under /services/creative, once the page exists. */
  slug?: string;
};

/** Reading order: the first sits beside the edge, on the right. */
export const CREATIVE_NAV: readonly CreativeEntry[] = [
  { key: "overview", label: "نظرة عامة" },
  {
    key: "brand",
    label: "العلامة التجارية والهوية",
    title: "استراتيجية العلامة التجارية والهوية",
    slug: "brand",
  },
  {
    key: "marketing",
    label: "التسويق",
    title: "إدارة الحملات الإعلانية والتسويق بالأداء",
    slug: "media-buying",
  },
  {
    key: "social",
    label: "إدارة منصات",
    title: "إدارة منصات التواصل الاجتماعي",
    slug: "social-media",
  },
  {
    key: "seo",
    label: "تحسين الظهور",
    title: "تحسين الظهور في البحث والذكاء الاصطناعي ومتاجر التطبيقات",
    slug: "seo",
  },
  { key: "automation", label: "أتمتة التسويق" },
  {
    key: "uiux",
    label: "تصميم تجربة المستخدم والواجهات",
    title: "تصميم تجربة المستخدم والواجهات الرقمية",
    slug: "ux-ui",
  },
  {
    key: "creative",
    label: "التصميم الإبداعي والإنتاج الإعلامي",
    slug: "creative-production",
  },
  { key: "content", label: "التسويق بالمحتوى والعلاقات العامة الرقمية" },
];

/** Where a tab, or a call that points at that service, leads. */
export const creativeHref = (key: CreativeKey) => {
  if (key === "overview") return CREATIVE_HREF;
  const entry = CREATIVE_NAV.find((item) => item.key === key);
  return entry?.slug ? `${CREATIVE_HREF}/${entry.slug}` : CREATIVE_REQUEST_HREF;
};
