export const SERVICE_CATEGORIES = [
  {
    key: "data",
    slug: "data-analytics",
    label: "Data science and artificial intelligence",
    website: "https://Data.thetransformix.com",
    text: "We turn scattered data into clear metrics that support decisions and reveal opportunities for improvement.",
  },
  {
    key: "web",
    slug: "web-development",
    label: "Web development",
    website: "https://web.thetransformix.com/",
    text: "We build clear, fast Arabic websites that reflect your organization's identity and serve its users.",
  },
  {
    key: "marketing",
    slug: "marketing-design",
    label: "Creative studio and digital marketing",
    website: "https://creative.thetransformix.com/",
    text: "We connect messaging with content and design for a consistent experience across digital channels.",
  },
  {
    key: "erp",
    slug: "erp",
    label: "ERP systems",
    website: "https://ai.thetransformix.com/erp",
    text: "We organize operations and connect departments through a flexible system that supports daily work.",
  },
] as const;

export type ServiceKey = (typeof SERVICE_CATEGORIES)[number]["key"];

export const getServiceWebsite = (key: ServiceKey) =>
  SERVICE_CATEGORIES.find(service => service.key === key)!.website;

export const SERVICES_INTRO = {
  title: "Solutions that start with your needs and work together.",
  lead: "Four services covering data, digital presence, communication, and operations. We help you choose the right path, with services that can work together according to your priorities and readiness.",
};

export const getServiceLinks = (basePath: string) =>
  SERVICE_CATEGORIES.map(({ key, slug, label }) => ({
    key,
    label,
    href: `${basePath}/${slug}`,
  }));

export type ServiceMenuLink = { label: string; href: string; external?: boolean };

export const getServicesMenu = (basePath: string): ServiceMenuLink[] => [
  { label: "All services", href: basePath },
  ...SERVICE_CATEGORIES.map(({ label, website }) => ({ label, href: website, external: true })),
];
