import { COMMUNITY_HREF, COMMUNITY_NAV, communityHref } from "@/english/lib/communityNav";
import { INSIGHTS_HREF, INSIGHTS_LABEL } from "@/english/lib/insightsNav";
import {
  AI_SUITE_WEBSITE,
  EXTRA_SERVICES,
  getServiceWebsite,
  MANUFACTURING_WEBSITE,
  PRODUCT_WEBSITES,
} from "@/english/lib/serviceNavigation";
import { TRUST_HREF, TRUST_LABEL, TRUST_NAV, trustHref } from "@/english/lib/trustNav";

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
      site("AI & Intelligent Automation", AI_SUITE_WEBSITE),
      { label: "Data Science & Digital Intelligence", href: "/en/services/data-science" },
      {
        label: "Software Engineering & Applications",
        href: "/en/services/software-engineering",
        extras: [
          site("Web development", getServiceWebsite("web")),
          site("Mobile apps", extraWebsite("mobile")),
        ],
      },
      { label: "Odoo services", href: "/en/services/odoo" },
    ],
  }],
  [{
    links: [
      { label: "E-commerce & Multi-Vendor Marketplaces", href: "/en/services/ecommerce" },
      { label: "Reservations & Tourism Platforms", href: "/en/services/tourism" },
      site("Creative & Omnichannel Digital Marketing", getServiceWebsite("marketing")),
    ],
  }],
];

const CONSULTING: NavBlock[][] = [
  [{
    links: [
      { label: "Research & Innovation", href: "/en/services" },
      { label: "Technology Outsourcing & Managed Business Services", href: "/en/services/gbs" },
      { label: "Startups", href: extraWebsite("ventures") },
    ],
  }],
];

/* المنتجات — the agents run on the TX AI Suite. Platforms with a site of
   their own open it; the rest wait on the products page. */
const AGENTS: NavBlock = {
  title: { label: "AI Agents Suite", href: "/en/products#ai-agents" },
  links: [
    site("Customer Service Agent", AI_SUITE_WEBSITE),
    site("Sales Agent", AI_SUITE_WEBSITE),
    site("Reservations Agent", AI_SUITE_WEBSITE),
    site("Operations Agent", AI_SUITE_WEBSITE),
    site("Enterprise Knowledge Agent", AI_SUITE_WEBSITE),
    site("Reporting Agent", AI_SUITE_WEBSITE),
  ],
};

const PLATFORMS: NavBlock = {
  title: { label: "Platforms & Systems", href: "/en/products#cooperatives" },
  links: [
    site("Enterprise Resource Planning", getServiceWebsite("erp")),
    site("Investor & Cooperative Management Platform", PRODUCT_WEBSITES.cooperatives),
    site("Closed Joint-Stock Company Governance Platform", PRODUCT_WEBSITES.governance),
    site("Logistics Management Platform", PRODUCT_WEBSITES.logistics),
  ],
};

const MORE_PLATFORMS: NavBlock = {
  continues: true,
  links: [
    site("Multi-Vendor Marketplace Platform", PRODUCT_WEBSITES.marketplaces),
    site("XT Smart Learning Platform", PRODUCT_WEBSITES.xt),
    { label: "Reservations & Tourism Services Platform", href: "/en/products" },
  ],
};

/* الموارد — the sectors, the academies, trust and governance, TX Community,
   the portfolio (أعمالنا), the company (من نحن now lives here rather than on
   the bar) and what we publish. Manufacturing leaves for its own site, as
   everywhere else. */
const SECTORS: NavBlock = {
  title: { label: "Industries", href: "/en/sectors" },
  links: [
    { label: "Cooperatives & Associations", href: "/en/sectors#cooperatives" },
    site("Industry & Manufacturing", MANUFACTURING_WEBSITE),
    { label: "Education and training", href: "/en/sectors#education" },
    { label: "E-commerce & Retail", href: "/en/sectors" },
    { label: "Tourism, Services & Reservations", href: "/en/sectors" },
    { label: "Logistics", href: "/en/sectors" },
    { label: "Smart Sports", href: "/en/sectors/sports" },
  ],
};

const ACADEMIES: NavBlock = {
  title: { label: "Academies", href: "/en/academy" },
  links: [
    { label: "Cooperatives Academy", href: "/en/academy#cooperatives" },
    { label: "Industrial Academy", href: "/en/academy#industry" },
    { label: "Youth & Digital Skills Academy", href: "/en/academy#vocational" },
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
const COMMUNITY_TITLE: NavLink = { label: "Community", href: COMMUNITY_HREF };
const COMMUNITY: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS };
const COMMUNITY_SPLIT = Math.ceil(COMMUNITY_LINKS.length / 2);
const COMMUNITY_FIRST: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS.slice(0, COMMUNITY_SPLIT) };
const COMMUNITY_REST: NavBlock = { continues: true, links: COMMUNITY_LINKS.slice(COMMUNITY_SPLIT) };

/* The portfolio's case studies. The overview lists them under المعرفة
   والأخبار, as the artboard does; the أعمالنا tab still shows them alone. */
const CASE_STUDIES: NavLink = { label: "Case Studies", href: "/en/works" };

const WORKS: NavBlock = {
  title: { label: "Our work", href: "/en/works" },
  links: [CASE_STUDIES],
};

/* عن الشركة وأثرها — the about page and its labs, then the community and
   contact pages that cover impact and partnership until each has its own. */
const COMPANY: NavBlock = {
  title: { label: "Company & Impact", href: "/en/about" },
  links: [
    { label: "About us", href: "/en/about" },
    { label: "Our Labs & Expertise", href: "/en/about#labs" },
    { label: "Sustainability & Social Responsibility", href: communityHref("impact") },
    { label: "Technology for Good", href: communityHref("impact") },
    { label: "Partnerships & Collaboration", href: "/en/contact#ways" },
  ],
};

const KNOWLEDGE: NavBlock = {
  title: { label: "Knowledge & News", href: INSIGHTS_HREF },
  links: [
    { label: INSIGHTS_LABEL, href: INSIGHTS_HREF },
    { label: "News & Updates", href: communityHref("news") },
    CASE_STUDIES,
  ],
};

/** Right-to-left reading order, so the first entry sits beside the logo. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/en/services",
    routes: ["/en/services", "/en/ventures"],
    menu: {
      id: "services",
      overview: [...TECH_SOLUTIONS, ...CONSULTING],
      tabs: [
        { label: "Our Technology Solutions", href: "/en/services", columns: TECH_SOLUTIONS },
        { label: "Consulting & Venture Building", href: "/en/ventures", columns: CONSULTING },
      ],
    },
  },
  {
    label: "Products",
    href: "/en/products",
    routes: ["/en/products"],
    menu: {
      id: "products",
      overview: [[AGENTS], [PLATFORMS], [MORE_PLATFORMS]],
      tabs: [
        { label: "AI Agents Suite", href: "/en/products#ai-agents", columns: [[AGENTS]] },
        { label: "Platforms & Systems", href: "/en/products#cooperatives", columns: [[PLATFORMS], [MORE_PLATFORMS]] },
      ],
    },
  },
  {
    label: "Resources",
    routes: ["/en/sectors", "/en/academy", TRUST_HREF, "/en/works", "/en/community", "/en/about", INSIGHTS_HREF],
    menu: {
      id: "resources",
      overview: [[SECTORS], [ACADEMIES, TRUST], [COMMUNITY], [COMPANY, KNOWLEDGE]],
      tabs: [
        { label: "Industries", href: "/en/sectors", columns: [[SECTORS]] },
        { label: "Academies", href: "/en/academy", columns: [[ACADEMIES]] },
        { label: TRUST_LABEL, href: trustHref("ethics"), columns: [[TRUST]] },
        { label: "Community", href: COMMUNITY_HREF, columns: [[COMMUNITY_FIRST], [COMMUNITY_REST]] },
        { label: "Our work", href: "/en/works", columns: [[WORKS]] },
        { label: "Company & Impact", href: "/en/about", columns: [[COMPANY]] },
        { label: "Knowledge & News", href: INSIGHTS_HREF, columns: [[KNOWLEDGE]] },
      ],
    },
  },
  { label: "Careers", href: "/en/careers", routes: ["/en/careers"] },
  { label: "Contact us", href: "/en/contact", routes: ["/en/contact"] },
];

/** The logo's destination, which the small-screen sheet also lists. */
export const HOME_LINK: NavLink = { label: "Home", href: "/en" };

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
