/* The four service lines, as the navbar's الخدمات menu (Figma 2166:28462) and
   the contact form's picker (Figma 2551:8086) both list them. */
export const SERVICES = [
  "تحليل البيانات و الذكاء الاصطناعي",
  "تطوير المواقع الالكترونية",
  "استديو الابداع",
  "انظمة ERP",
] as const;

export type Service = (typeof SERVICES)[number];
