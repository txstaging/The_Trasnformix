export const SERVICES = [
  "Data analytics and AI",
  "Website development",
  "Creative studio",
  "ERP systems",
] as const;

export type Service = (typeof SERVICES)[number];
