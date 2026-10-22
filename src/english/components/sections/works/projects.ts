/* Figma 2418:33317 "all categ" — the أعمالنا grid, card by card.

   Every card is 604 wide with a 462 tall picture window (رزانا البخاري's is
   451). `crop` is the picture's own box inside that window, in artboard px,
   exactly as the artboard places it: some stills are cover-fitted, some are
   scaled into a box of a different ratio ("fill"), and one (Belli) is inset.

   Tags are listed right-to-left, as they read. */

export type WorkTag = { label: string };

export type WorkCategory = "ai" | "web" | "creative" | "erp";

export type WorkProject = {
  key: string;
  title: string;
  image: string;
  /** Case study on Behance; a card without one is not a link. */
  behanceUrl?: string;
  frame?: number;
  crop: { x: number; y: number; w: number; h: number; fit: "cover" | "fill" };
  tags: WorkTag[];
};

const BRAND_TAGS: WorkTag[] = [
  { label: "Brand strategy" },
  { label: "Visual identity" },
  { label: "Brand guidelines" },
];

const CONTENT_AI_TAGS: WorkTag[] = [
  { label: "Trend analysis" },
  { label: "Content automation" },
  { label: "Generative AI" },
];

const SOCIAL_TAGS: WorkTag[] = [
  { label: "Content strategy" },
  { label: "Content management" },
  { label: "Social media design" },
];

const PLATFORM_TAGS: WorkTag[] = [
  { label: "User experience design" },
  { label: "Platform development" },
  { label: "Platform strategy" },
];

const reem: WorkProject = {
  key: "reem",
  title: "Dr. Reem Bakhit",
  image: "/images/work-reem.png",
  behanceUrl:
    "https://www.behance.net/gallery/233657039/Reem-Bakheet-Identity-Brand",
  crop: { x: 0, y: 0, w: 604, h: 494, fit: "cover" },
  tags: BRAND_TAGS,
};

const omayma: WorkProject = {
  key: "omayma",
  title: "Omayma",
  image: "/images/works/omayma.png",
  behanceUrl:
    "https://www.behance.net/gallery/239397045/Omaimah-Qadhi-Branding-Visual-Identity",
  crop: { x: 0, y: 0, w: 604, h: 494, fit: "cover" },
  tags: BRAND_TAGS,
};

const salesAgent: WorkProject = {
  key: "sales-agent",
  title: "An intelligent sales agent working 24/7 to increase conversion opportunities",
  image: "/images/works/sales-agent.png",
  behanceUrl:
    "https://www.behance.net/gallery/239995263/Revolutionizing-Engagement-AI-Sales-Agent",
  crop: { x: -16.006, y: -29.984, w: 620.006, h: 620.004, fit: "fill" },
  tags: [
    { label: "Intelligent sales agent" },
    { label: "Conversational AI" },
    { label: "Sales automation" },
  ],
};

const futureExperts: WorkProject = {
  key: "future-experts",
  title: "Future Experts",
  image: "/images/works/future.png",
  behanceUrl:
    "https://www.behance.net/gallery/234186405/Future-Expert-Branding-Visual-Identity",
  crop: { x: 0, y: 0, w: 604, h: 494, fit: "cover" },
  tags: BRAND_TAGS,
};

const support: WorkProject = {
  key: "support",
  title: "Support and enablement",
  image: "/images/works/support.png",
  behanceUrl: "https://www.behance.net/gallery/231638901/Support-Empowerment",
  crop: { x: -67.829, y: -29.344, w: 739.96, h: 494, fit: "fill" },
  tags: BRAND_TAGS,
};

const contentSystem: WorkProject = {
  key: "content-system",
  title: "An intelligent content ecosystem for building presence and influence",
  image: "/images/works/content-system.png",
  behanceUrl:
    "https://www.behance.net/gallery/239994481/Scaling-Authority-AI-Driven-Content-Pipeline-S",
  crop: { x: 0, y: 0, w: 604, h: 604.019, fit: "fill" },
  tags: CONTENT_AI_TAGS,
};

const mermatesWeb: WorkProject = {
  key: "mermates-web",
  title: "Memerates",
  image: "/images/works/mermates-web.png",
  behanceUrl:
    "https://www.behance.net/gallery/239322855/MERMATES-web-design-and-case-study",
  crop: { x: -75.017, y: -0.049, w: 679.198, h: 453.393, fit: "fill" },
  tags: [
    { label: "Digital experience" },
    { label: "Interface design" },
    { label: "Website development" },
  ],
};

const razana: WorkProject = {
  key: "razana",
  title: "Rozana Al Bukhari",
  image: "/images/works/razana.png",
  behanceUrl:
    "https://www.behance.net/gallery/238496639/Rozana-al-bukhaary-Branding-Visual-Identity",
  frame: 451,
  crop: { x: 0, y: -60, w: 604, h: 604, fit: "fill" },
  tags: CONTENT_AI_TAGS,
};

const inspiration: WorkProject = {
  key: "inspiration",
  title: "Inspiration Academy",
  image: "/images/works/inspiration.png",
  behanceUrl: "https://www.behance.net/gallery/233003747/INSPIRATION-ACADEMY",
  crop: { x: 0, y: -62, w: 648, h: 648, fit: "cover" },
  tags: BRAND_TAGS,
};

const belli: WorkProject = {
  key: "belli",
  title: "Belli",
  image: "/images/works/belli.png",
  behanceUrl:
    "https://www.behance.net/gallery/238962329/BELLI-GROUP-Web-Design-Case-Study",
  crop: { x: 38, y: 0, w: 529, h: 530, fit: "fill" },
  tags: PLATFORM_TAGS,
};

const marsiCrunch: WorkProject = {
  key: "marsi-crunch",
  title: "Marcy Crunch",
  image: "/images/works/marsi.png",
  behanceUrl:
    "https://www.behance.net/gallery/231986863/Marcy-Crunch-Branding-Case-Study",
  crop: { x: 0, y: -16.143, w: 604, h: 494.3, fit: "fill" },
  tags: BRAND_TAGS,
};

const wetsuit: WorkProject = {
  key: "mermates-social",
  title: "Memerates",
  image: "/images/works/wetsuit.png",
  behanceUrl: "https://www.behance.net/gallery/239688945/MERMATES-Social-Media",
  crop: { x: 0, y: -116, w: 604, h: 604, fit: "cover" },
  tags: SOCIAL_TAGS,
};

const divingSchool: WorkProject = {
  key: "diving-school",
  title: "JFS Diving School",
  image: "/images/works/diving.png",
  behanceUrl: "https://www.behance.net/gallery/234121459/JFS-Social-Media",
  crop: { x: -49, y: -52, w: 653, h: 534, fit: "cover" },
  tags: BRAND_TAGS,
};

const seaSoul: WorkProject = {
  key: "sea-soul",
  title: "Sea Soul",
  image: "/images/works/sea-soul.png",
  behanceUrl:
    "https://www.behance.net/gallery/239629971/SeaSoul-Camp-web-design-and-case-study",
  crop: { x: 0, y: -27, w: 605, h: 734, fit: "cover" },
  tags: SOCIAL_TAGS,
};

const guide: WorkProject = {
  key: "guide",
  title: "Guide",
  image: "/images/works/guide.png",
  behanceUrl: "https://www.behance.net/gallery/256093169/JTGC?share=1",
  crop: { x: 0, y: 0, w: 616, h: 462, fit: "cover" },
  tags: PLATFORM_TAGS,
};

/* NOTE: no Behance case study has been supplied for KUNI yet. */
const kuni: WorkProject = {
  key: "kuni",
  title: "KUNI",
  image: "/images/works/kuni.png",
  crop: { x: -169.052, y: 0, w: 821.786, h: 462, fit: "fill" },
  tags: BRAND_TAGS,
};

const ALL: WorkProject[] = [
  reem,
  omayma,
  salesAgent,
  futureExperts,
  support,
  contentSystem,
  mermatesWeb,
  razana,
  inspiration,
  belli,
  marsiCrunch,
  wetsuit,
  divingSchool,
  seaSoul,
  kuni,
  guide,
];

export type WorkFilter = {
  id: "all" | WorkCategory;
  label: string;
  width?: number;
  projects: WorkProject[];
};

/* Right-to-left, as the chips read. استديو الابداع and تطوير المواقع follow
   their own artboards (2418:39853 and 2422:2951) card for card. The other two
   are not drawn:
   the AI list holds the two AI products, and ERP has no project yet. */
export const WORK_FILTERS: WorkFilter[] = [
  { id: "all", label: "All", projects: ALL },
  {
    id: "ai",
    label: "Data analytics and AI",
    width: 245,
    projects: [salesAgent, contentSystem],
  },
  {
    id: "web",
    label: "Web development",
    width: 126,
    projects: [belli, mermatesWeb],
  },
  {
    id: "creative",
    label: "Creative studio",
    width: 126,
    projects: [
      reem,
      omayma,
      support,
      futureExperts,
      razana,
      inspiration,
      marsiCrunch,
      wetsuit,
      divingSchool,
      seaSoul,
    ],
  },
  { id: "erp", label: "ERP systems", width: 107, projects: [] },
];
