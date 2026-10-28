import { getServiceWebsite, MANUFACTURING_WEBSITE } from "@/english/lib/serviceNavigation";

export type FooterVersion = "v1" | "v2" | "v3";
export type FooterNavLink = { label: string; href: string; external?: boolean };
export type FooterNavColumn = {
  id: "company" | "services" | "sectors" | "academy";
  title: string;
  href: string;
  links: FooterNavLink[];
};

/** Footer destinations use each version's real pages and section IDs. */
export function getFooterColumns(version: FooterVersion): FooterNavColumn[] {
  const base = version === "v1" ? "/en" : `/en/${version}`;
  return [
    {
      id: "company", title: "Company", href: `${base}/about`,
      links: [
        { label: "About us", href: `${base}/about` },
        { label: "Our work", href: `${base}/works` },
        { label: "Contact us", href: `${base}/contact` },
      ],
    },
    {
      id: "services", title: "Services", href: `${base}/services`,
      links: [
        { label: "Data science", href: getServiceWebsite("data"), external: true },
        { label: "Artificial intelligence", href: getServiceWebsite("data"), external: true },
        { label: "Creative studio", href: getServiceWebsite("marketing"), external: true },
        { label: "ERP systems", href: getServiceWebsite("erp"), external: true },
        { label: "Web development", href: getServiceWebsite("web"), external: true },
      ],
    },
    {
      id: "sectors", title: "Industries", href: `${base}/sectors`,
      links: [
        { label: "Manufacturing", href: MANUFACTURING_WEBSITE, external: true },
        { label: "Education", href: `${base}/sectors#education` },
        version === "v1"
          ? { label: "All industries", href: "/en/sectors" }
          : { label: "Tourism", href: `${base}/sectors#tourism` },
        { label: "Cooperatives", href: `${base}/sectors#cooperatives` },
      ],
    },
    {
      id: "academy", title: "Academy", href: `${base}/academy`,
      links: [
        { label: "Vocational training", href: `${base}/academy#vocational` },
        { label: "Industries", href: `${base}/academy#industry` },
        { label: "Cooperatives", href: `${base}/academy#cooperatives` },
      ],
    },
  ];
}
