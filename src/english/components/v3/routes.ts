export const V3 = {
  home: "/en/v3",
  about: "/en/v3/about",
  services: "/en/v3/services",
  sectors: "/en/v3/sectors",
  works: "/en/v3/works",
  academy: "/en/v3/academy",
  contact: "/en/v3/contact",
} as const;

export const servicePaths = {
  data: "/en/v3/services/data-analytics",
  web: "/en/v3/services/web-development",
  marketing: "/en/v3/services/marketing-design",
  erp: "/en/v3/services/erp",
} as const;

export type ServiceKey = keyof typeof servicePaths;
export const contactHref = (service?: string) =>
  service ? `${V3.contact}?service=${service}#request` : V3.contact;

export function localHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("/en/v3")) return href;
  const local = href.replace(/^\/en(?=\/|$)/, "");
  if (local === "/" || local === "" || local === "/v2") return V3.home;
  return `/en/v3${local.replace(/^\/v2(?=\/|#|$)/, "")}`;
}
