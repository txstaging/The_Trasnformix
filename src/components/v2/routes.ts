import { getServiceLinks, type ServiceKey } from "@/lib/serviceNavigation";

export type { ServiceKey } from "@/lib/serviceNavigation";

/** Every v2 page lives under /v2 so the two designs can be compared side by
    side. Keeping the paths here means renaming the prefix is a single edit. */
export const V2 = {
  home: "/v2",
  about: "/v2/about",
  services: "/v2/services",
  sectors: "/v2/sectors",
  academy: "/v2/academy",
  contact: "/v2/contact",
  works: "/v2/works",
} as const;

/** Keys the contact form uses to preselect a request type, e.g.
    /v2/contact?service=web. Must match REQUEST_TYPES in contact/options.ts. */
export type ServiceLink = {
  key: ServiceKey;
  label: string;
  href: string;
};

/** Numbered as on the services page (Figma 3783:7982): 01 to 04. */
export const SERVICES: ServiceLink[] = getServiceLinks(V2.services);

export const serviceHref = (key: ServiceKey) =>
  SERVICES.find((service) => service.key === key)!.href;

/** Everything the contact form can be opened for: a service, the academy,
    or help choosing (Figma 3693:66675). */
export type RequestKey = ServiceKey | "academy" | "help";

/** The contact page with a request type already chosen. */
export const contactHref = (request?: RequestKey) =>
  request ? `${V2.contact}?service=${request}#request` : V2.contact;
