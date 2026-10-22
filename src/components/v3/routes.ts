export const V3 = {
  home: "/v3",
  about: "/v3/about",
  services: "/v3/services",
  sectors: "/v3/sectors",
  works: "/v3/works",
  academy: "/v3/academy",
  contact: "/v3/contact",
} as const;

export const servicePaths = {
  data: "/v3/services/data-analytics",
  web: "/v3/services/web-development",
  marketing: "/v3/services/marketing-design",
  erp: "/v3/services/erp",
} as const;

export type ServiceKey = keyof typeof servicePaths;
export const contactHref = (service?: string) =>
  service ? `${V3.contact}?service=${service}#request` : V3.contact;

export function localHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("/v3")) return href;
  if (href === "/" || href === "/v2") return V3.home;
  return `/v3${href.replace(/^\/v2(?=\/|#|$)/, "")}`;
}
