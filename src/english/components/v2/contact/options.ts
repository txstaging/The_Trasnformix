import type { RequestKey } from "@/english/components/v2/routes";

/** The request types of Figma "Request type" (3693:66675), in reading order:
    two per row, right to left. Shared by the form and /api/v2/contact. */
export const REQUEST_TYPES: readonly { value: RequestKey; label: string }[] = [
  { value: "data", label: "Data analytics" },
  { value: "web", label: "Web development" },
  { value: "marketing", label: "Digital marketing and design" },
  { value: "erp", label: "ERP systems" },
  { value: "academy", label: "Academy and training" },
  { value: "help", label: "I need help choosing" },
];

/** "اختر قطاع المنشأة" — the sectors the site serves, plus a way out. */
export const SECTOR_OPTIONS = [
  "Manufacturing",
  "Tourism",
  "Cooperatives",
  "Education and training",
  "Other industry",
] as const;

export const LIMITS = {
  fullName: 120,
  company: 160,
  email: 254,
  phone: 40,
  jobTitle: 120,
  message: 4000,
} as const;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Optional, but when given it must look like a phone number. */
export const isValidPhone = (phone: string) =>
  !phone || (/^[+\d\s()-]+$/.test(phone) && phone.replace(/\D/g, "").length >= 7);

export const isRequestKey = (value: unknown): value is RequestKey =>
  REQUEST_TYPES.some((type) => type.value === value);
