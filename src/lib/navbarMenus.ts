import { COMMUNITY_HREF, COMMUNITY_NAV, communityHref } from "./communityNav";
import { INSIGHTS_HREF, INSIGHTS_LABEL } from "./insightsNav";
import {
  AI_SUITE_WEBSITE,
  EXTRA_SERVICES,
  getServiceWebsite,
  PRODUCT_WEBSITES,
} from "./serviceNavigation";
import { TRUST_HREF, TRUST_LABEL, TRUST_NAV, trustHref } from "./trustNav";

/* The v1 navbar (Figma 4305:4654): five labels in a white 64px bar, three of
   which open a full-width panel drawn as the V2 header's menus (Figma 4612:57
   الخدمات, 4612:136 المنتجات, 4612:222 الموارد) — a grey rail of tabs beside
   columns of links.

   Every destination is one the site already has. An entry without a page of
   its own opens the overview it belongs to (/services, /products, /sectors)
   until that page exists. */

export type NavLink = {
  label: string;
  href: string;
  /** Leaves the site, so it opens in a new tab. */
  external?: boolean;
  /** The grey line under a label (Figma 4319:37736), one link per part. */
  extras?: NavLink[];
};

/** A run of links in one column under an optional bold, blue heading. */
export type NavBlock = {
  title?: NavLink;
  links: NavLink[];
  /** Carries on the heading of the column before it, so its first link
      lines up with that column's first link (Figma 4305:4783). */
  continues?: boolean;
};

/** A sidebar row: pointing at it shows its columns; its label opens `href`. */
export type NavTab = { label: string; href?: string; columns: NavBlock[][] };

export type NavMenuId = "services" | "products" | "resources";

export type NavMenu = {
  id: NavMenuId;
  /** Everything the menu holds, shown as it opens until a tab is pointed at. */
  overview: NavBlock[][];
  /** The sidebar rows, under the menu's own label. */
  tabs: NavTab[];
};

export type NavItem = {
  label: string;
  /** The page the label opens. The resources label only opens its menu. */
  href?: string;
  /** Pages under this label, which light it up. */
  routes: string[];
  menu?: NavMenu;
};

const site = (label: string, href: string): NavLink => ({ label, href, external: true });
const extraWebsite = (key: (typeof EXTRA_SERVICES)[number]["key"]) =>
  EXTRA_SERVICES.find((service) => service.key === key)!.website;

/* الخدمات — the nine services of the home page, linked as its grid links them. */
const TECH_SOLUTIONS: NavBlock[][] = [
  [{
    links: [
      site("الذكاء الاصطناعي والأتمتة الذكية", AI_SUITE_WEBSITE),
      { label: "علوم البيانات والذكاء الرقمي", href: "/services/data-science" },
      {
        label: "هندسة البرمجيات والتطبيقات",
        href: "/services/software-engineering",
        extras: [
          site("تطوير المواقع", getServiceWebsite("web")),
          site("تطبيقات الموبيل", extraWebsite("mobile")),
        ],
      },
      { label: "خدمات Odoo", href: "/services/odoo" },
      { label: "أنظمة إدارة المؤسسات", href: "/services/enterprise-systems" },
    ],
  }],
  [{
    links: [
      { label: "التجارة الإلكترونية والأسواق متعددة البائعين", href: "/services/ecommerce" },
      { label: "منصات الحجوزات والخدمات السياحية", href: "/services/tourism" },
      site("الإبداع والتسويق الرقمي متعدد القنوات", getServiceWebsite("marketing")),
    ],
  }],
];

const CONSULTING: NavBlock[][] = [
  [{
    links: [
      { label: "البحث والابتكار", href: "/services" },
      { label: "التعهيد التقني وخدمات الأعمال المُدارة", href: "/services/gbs" },
      { label: "الشركات الناشئة", href: extraWebsite("ventures") },
    ],
  }],
];

/* المنتجات — the agents run on the TX AI Suite. Platforms with a site of
   their own open it; the rest wait on the products page. */
const AGENTS: NavBlock = {
  title: { label: "منظومة الوكلاء الأذكياء", href: "/products#ai-agents" },
  links: [
    site("وكيل خدمة العملاء", AI_SUITE_WEBSITE),
    site("وكيل المبيعات", AI_SUITE_WEBSITE),
    site("وكيل الحجوزات", AI_SUITE_WEBSITE),
    site("وكيل العمليات", AI_SUITE_WEBSITE),
    site("وكيل المعرفة المؤسسية", AI_SUITE_WEBSITE),
    site("وكيل التقارير", AI_SUITE_WEBSITE),
  ],
};

const PLATFORMS: NavBlock = {
  title: { label: "المنصات والأنظمة", href: "/products#cooperatives" },
  links: [
    site("نظام تخطيط موارد المؤسسات", getServiceWebsite("erp")),
    site("منصة إدارة المستثمرين والتعاونيات", PRODUCT_WEBSITES.cooperatives),
    site("منصة حوكمة الشركات المساهمة المقفلة", PRODUCT_WEBSITES.governance),
    site("منصة إدارة الخدمات اللوجستية", PRODUCT_WEBSITES.logistics),
  ],
};

const MORE_PLATFORMS: NavBlock = {
  continues: true,
  links: [
    site("منصة الأسواق الإلكترونية متعددة البائعين", PRODUCT_WEBSITES.marketplaces),
    site("منصة التعلم الذكي XT", PRODUCT_WEBSITES.xt),
    { label: "منصة الحجوزات والخدمات السياحية", href: "/products" },
  ],
};

/* الموارد — the sectors, the academies, trust and governance, TX Community,
   the portfolio (أعمالنا), the company (من نحن now lives here rather than on
   the bar) and what we publish. Manufacturing leaves for its own site, as
   everywhere else. */
const SECTORS: NavBlock = {
  title: { label: "القطاعات", href: "/sectors" },
  links: [
    { label: "التعاونيات والجمعيات", href: "/sectors#cooperatives" },
    { label: "الصناعة والتصنيع", href: "/manufacturing" },
    { label: "التعليم والتدريب", href: "/sectors#education" },
    { label: "التجارة الإلكترونية والتجزئة", href: "/sectors" },
    { label: "السياحة والخدمات والحجوزات", href: "/sectors" },
    { label: "الخدمات اللوجستية", href: "/sectors" },
    { label: "الرياضات الذكية", href: "/sectors/sports" },
  ],
};

const ACADEMIES: NavBlock = {
  title: { label: "الأكاديميات", href: "/academy" },
  links: [
    { label: "أكاديمية التعاونيات", href: "/academy#cooperatives" },
    { label: "الأكاديمية الصناعية", href: "/academy#industry" },
    { label: "أكاديمية الشباب والمهارات الرقمية", href: "/academy#vocational" },
  ],
};

/* الثقة والحوكمة — our ethics, the code of conduct and regulatory compliance
   (lib/trustNav.ts). The heading opens the first of them. */
const TRUST: NavBlock = {
  title: { label: TRUST_LABEL, href: trustHref("ethics") },
  links: TRUST_NAV.map(({ slug, label }) => ({ label, href: trustHref(slug) })),
};

/* TX Community — the hub, then a page per activity (lib/communityNav.ts). Its
   own tab splits the list over two columns. */
const COMMUNITY_LINKS: NavLink[] = COMMUNITY_NAV.map(({ slug, label }) => ({ label, href: communityHref(slug) }));
const COMMUNITY_TITLE: NavLink = { label: "المجتمع", href: COMMUNITY_HREF };
const COMMUNITY: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS };
const COMMUNITY_SPLIT = Math.ceil(COMMUNITY_LINKS.length / 2);
const COMMUNITY_FIRST: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS.slice(0, COMMUNITY_SPLIT) };
const COMMUNITY_REST: NavBlock = { continues: true, links: COMMUNITY_LINKS.slice(COMMUNITY_SPLIT) };

/* The portfolio's case studies. The overview lists them under المعرفة
   والأخبار, as the artboard does; the أعمالنا tab still shows them alone. */
const CASE_STUDIES: NavLink = { label: "دراسات الحالة", href: "/works" };

const WORKS: NavBlock = {
  title: { label: "أعمالنا", href: "/works" },
  links: [CASE_STUDIES],
};

/* عن الشركة وأثرها — the about page and its labs, then the community and
   contact pages that cover impact and partnership until each has its own. */
const COMPANY: NavBlock = {
  title: { label: "عن الشركة وأثرها", href: "/about" },
  links: [
    { label: "من نحن", href: "/about" },
    { label: "مختبراتنا وخبراتنا", href: "/about#labs" },
    { label: "الاستدامة والمسؤولية المجتمعية", href: communityHref("impact") },
    { label: "التكنولوجيا من أجل الخير", href: communityHref("impact") },
    { label: "الشراكات والتعاون", href: "/contact#ways" },
  ],
};

const KNOWLEDGE: NavBlock = {
  title: { label: "المعرفة والأخبار", href: INSIGHTS_HREF },
  links: [
    { label: INSIGHTS_LABEL, href: INSIGHTS_HREF },
    { label: "الأخبار والمستجدات", href: communityHref("news") },
    CASE_STUDIES,
  ],
};

/** Right-to-left reading order, so the first entry sits beside the logo. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "الخدمات",
    href: "/services",
    routes: ["/services", "/ventures"],
    menu: {
      id: "services",
      overview: [...TECH_SOLUTIONS, ...CONSULTING],
      tabs: [
        { label: "حلولنا التقنية", href: "/services", columns: TECH_SOLUTIONS },
        { label: "الاستشارات وبناء المشروعات", href: "/ventures", columns: CONSULTING },
      ],
    },
  },
  {
    label: "المنتجات",
    href: "/products",
    routes: ["/products"],
    menu: {
      id: "products",
      overview: [[AGENTS], [PLATFORMS], [MORE_PLATFORMS]],
      tabs: [
        { label: "منظومة الوكلاء الأذكياء", href: "/products#ai-agents", columns: [[AGENTS]] },
        { label: "المنصات والأنظمة", href: "/products#cooperatives", columns: [[PLATFORMS], [MORE_PLATFORMS]] },
      ],
    },
  },
  {
    label: "الموارد",
    routes: ["/sectors", "/manufacturing", "/academy", TRUST_HREF, "/works", "/community", "/about", INSIGHTS_HREF],
    menu: {
      id: "resources",
      overview: [[SECTORS], [ACADEMIES, TRUST], [COMMUNITY], [COMPANY, KNOWLEDGE]],
      tabs: [
        { label: "القطاعات", href: "/sectors", columns: [[SECTORS]] },
        { label: "الأكاديميات", href: "/academy", columns: [[ACADEMIES]] },
        { label: TRUST_LABEL, href: trustHref("ethics"), columns: [[TRUST]] },
        { label: "المجتمع", href: COMMUNITY_HREF, columns: [[COMMUNITY_FIRST], [COMMUNITY_REST]] },
        { label: "أعمالنا", href: "/works", columns: [[WORKS]] },
        { label: "عن الشركة وأثرها", href: "/about", columns: [[COMPANY]] },
        { label: "المعرفة والأخبار", href: INSIGHTS_HREF, columns: [[KNOWLEDGE]] },
      ],
    },
  },
  { label: "الوظائف", href: "/careers", routes: ["/careers"] },
  { label: "تواصل معنا", href: "/contact", routes: ["/contact"] },
];

/** The logo's destination, which the small-screen sheet also lists. */
export const HOME_LINK: NavLink = { label: "الرئيسية", href: "/" };

export type NavSearchEntry = NavLink & { trail: string };

/* Folds the spellings people type interchangeably — hamza seats, taa
   marbuta, alef maqsura, diacritics and tatweel — and letter case. */
const ALEF = String.fromCharCode(0x0627);
const HEH = String.fromCharCode(0x0647);
const YEH = String.fromCharCode(0x064a);
const fold = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[آأإٱ]/g, () => ALEF)
    .replace(/ة/g, () => HEH)
    .replace(/ى/g, () => YEH)
    .replace(/\s+/g, " ")
    .trim();

function buildIndex(): NavSearchEntry[] {
  const entries: NavSearchEntry[] = [{ ...HOME_LINK, trail: "" }];
  const add = (link: NavLink, trail: string) => {
    if (!entries.some((entry) => entry.label === link.label && entry.href === link.href)) {
      entries.push({ label: link.label, href: link.href, external: link.external, trail });
    }
    link.extras?.forEach((extra) => add(extra, trail));
  };

  for (const item of NAV_ITEMS) {
    if (item.href) add({ label: item.label, href: item.href }, "");
    for (const tab of item.menu?.tabs ?? []) {
      if (tab.href) add({ label: tab.label, href: tab.href }, item.label);
      for (const block of tab.columns.flat()) {
        const trail = block.title ? `${item.label} · ${block.title.label}` : item.label;
        if (block.title) add(block.title, item.label);
        block.links.forEach((link) => add(link, trail));
      }
    }
  }
  return entries;
}

const INDEX = buildIndex().map((entry) => ({ entry, label: fold(entry.label), trail: fold(entry.trail) }));

/** Pages and menu entries whose label (or section) holds every typed word;
    labels that start with the query rank first. */
export function searchNav(query: string, limit = 8): NavSearchEntry[] {
  const words = fold(query).split(" ").filter(Boolean);
  if (!words.length) return [];
  const phrase = words.join(" ");
  return INDEX
    .filter(({ label, trail }) => words.every((word) => label.includes(word) || trail.includes(word)))
    .map((item) => ({ ...item, rank: item.label.startsWith(phrase) ? 0 : item.label.includes(phrase) ? 1 : 2 }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

/** What the search panel offers before anything is typed. */
export const NAV_SEARCH_SUGGESTIONS: NavSearchEntry[] = INDEX
  .filter(({ entry }) => !entry.trail)
  .map(({ entry }) => entry);
