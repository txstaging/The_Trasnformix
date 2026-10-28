import { getServiceWebsite, MANUFACTURING_WEBSITE } from "./serviceNavigation";

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
  const base = version === "v1" ? "" : `/${version}`;
  return [
    {
      id: "company", title: "الشركة", href: `${base}/about`,
      links: [
        { label: "من نحن", href: `${base}/about` },
        { label: "أعمالنا", href: `${base}/works` },
        { label: "تواصل معنا", href: `${base}/contact` },
      ],
    },
    {
      id: "services", title: "الخدمات", href: `${base}/services`,
      links: [
        { label: "علوم البيانات", href: getServiceWebsite("data"), external: true },
        { label: "الذكاء الاصطناعي", href: getServiceWebsite("data"), external: true },
        { label: "استديو الإبداع", href: getServiceWebsite("marketing"), external: true },
        { label: "أنظمة ERP", href: getServiceWebsite("erp"), external: true },
        { label: "تطوير المواقع", href: getServiceWebsite("web"), external: true },
      ],
    },
    {
      id: "sectors", title: "القطاعات", href: `${base}/sectors`,
      links: [
        { label: "الصناعة", href: MANUFACTURING_WEBSITE, external: true },
        { label: "التعليم", href: `${base}/sectors#education` },
        version === "v1"
          ? { label: "جميع القطاعات", href: "/sectors" }
          : { label: "السياحة", href: `${base}/sectors#tourism` },
        { label: "التعاونيات", href: `${base}/sectors#cooperatives` },
      ],
    },
    {
      id: "academy", title: "الأكاديمية", href: `${base}/academy`,
      links: [
        { label: "التأهيل المهني", href: `${base}/academy#vocational` },
        { label: "الصناعات", href: `${base}/academy#industry` },
        { label: "التعاونيات", href: `${base}/academy#cooperatives` },
      ],
    },
  ];
}
