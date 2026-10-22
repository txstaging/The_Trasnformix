import type { RequestKey } from "@/components/v2/routes";

/** The request types of Figma "Request type" (3693:66675), in reading order:
    two per row, right to left. Shared by the form and /api/v2/contact. */
export const REQUEST_TYPES: readonly { value: RequestKey; label: string }[] = [
  { value: "data", label: "تحليل البيانات" },
  { value: "web", label: "تطوير المواقع" },
  { value: "marketing", label: "التسويق والتصميم الإلكتروني" },
  { value: "erp", label: "أنظمة ERP" },
  { value: "academy", label: "الأكاديمية والتدريب" },
  { value: "help", label: "أحتاج مساعدة في الاختيار" },
];

/** "اختر قطاع المنشأة" — the sectors the site serves, plus a way out. */
export const SECTOR_OPTIONS = [
  "الصناعة",
  "السياحة",
  "التعاونيات",
  "التعليم والتدريب",
  "قطاع آخر",
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
