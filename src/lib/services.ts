export const SERVICES = [
  "تحليل البيانات و الذكاء الاصطناعي",
  "تطوير المواقع الالكترونية",
  "استديو الابداع",
  "انظمة ERP",
] as const;

export type Service = (typeof SERVICES)[number];
