export const SERVICE_CATEGORIES = [
  {
    key: "data",
    slug: "data-analytics",
    label: "علوم البيانات والذكاء الاصطناعي",
    website: "https://Data.thetransformix.com",
    text: "نحوّل البيانات المتفرقة إلى مؤشرات واضحة تدعم القرار وتكشف فرص التحسين.",
  },
  {
    key: "web",
    slug: "web-development",
    label: "تطوير المواقع",
    website: "https://web.thetransformix.com/",
    text: "نبني تجارب عربية واضحة وسريعة، تعكس هوية المنشأة وتخدم مستخدميها.",
  },
  {
    key: "marketing",
    slug: "marketing-design",
    label: "استديو الإبداع والتسويق الرقمي",
    website: "https://creative.thetransformix.com/",
    text: "نربط الرسالة بالمحتوى والتصميم، ضمن تجربة متسقة عبر القنوات الرقمية.",
  },
  {
    key: "erp",
    slug: "erp",
    label: "أنظمة ERP",
    website: "https://ai.thetransformix.com/erp",
    text: "ننظم العمليات ونربط الإدارات في منظومة مرنة تدعم العمل اليومي.",
  },
] as const;

export type ServiceKey = (typeof SERVICE_CATEGORIES)[number]["key"];

export const getServiceWebsite = (key: ServiceKey) =>
  SERVICE_CATEGORIES.find(service => service.key === key)!.website;

export const SERVICES_INTRO = {
  title: "حلول تبدأ من احتياجك، وتعمل معًا.",
  lead: "أربع خدمات تغطي البيانات والحضور الرقمي والتواصل والعمليات. نساعدك على اختيار المسار المناسب، مع إمكانية تكامل الخدمات وفق الأولويات وجاهزية المنشأة.",
};

export const getServiceLinks = (basePath: string) =>
  SERVICE_CATEGORIES.map(({ key, slug, label }) => ({
    key,
    label,
    href: `${basePath}/${slug}`,
  }));

export type ServiceMenuLink = { label: string; href: string; external?: boolean };

export const getServicesMenu = (basePath: string): ServiceMenuLink[] => [
  { label: "جميع الخدمات", href: basePath },
  ...SERVICE_CATEGORIES.map(({ label, website }) => ({ label, href: website, external: true })),
];
