import type { Field, FormSpec, Option, Values } from "@/components/careers/forms";

/* The partnerships modal (components/contact/PartnershipModal.tsx), opened
   by the hero's ناقش فرصة تعاون: the six ways of working with Transformix
   from Transformix_Contact_Partnerships_UIUX.pdf, each leading to one of its
   two forms. /api/partnerships validates against the same specs and emails
   the request. */

export type PartnershipFormId = "inquiry" | "proposal" | "contact" | "tourism" | "creative" | "mediaBuying";

export type PartnershipPathId =
  | "business"
  | "technology"
  | "regional"
  | "outsourcing"
  | "academic"
  | "ventures";

export type PartnershipPath = {
  id: PartnershipPathId;
  title: string;
  en: string;
  text: string;
  /** The card's call, which opens the path's form. */
  cta: string;
  form: PartnershipFormId;
  /** Answers the form starts with on this path. */
  initial?: Values;
};

export const PARTNERSHIP_PATHS: readonly PartnershipPath[] = [
  {
    id: "business",
    title: "استفسارات الأعمال والمشروعات",
    en: "Business Inquiries",
    text: "للشركات والمؤسسات الراغبة في تطوير حلول تقنية جديدة، أو تحديث أنظمتها الحالية، أو الاستفادة من خدمات ترانسفورمكس المتخصصة. تشمل المجالات الذكاء الاصطناعي والوكلاء الأذكياء، والبيانات، وERP وCRM، والتجارة الإلكترونية، وتطبيقات الهواتف، والمنصات المؤسسية، والتحول الرقمي والإداري.",
    cta: "ناقش متطلبات مشروعك",
    form: "inquiry",
  },
  {
    id: "technology",
    title: "الشراكات التقنية والاستراتيجية",
    en: "Technology & Strategic Partnerships",
    text: "نتعاون مع شركات التكنولوجيا، ومزودي الحلول والمنصات، والمؤسسات الاستشارية، وشركاء التنفيذ لتطوير عروض وخدمات مشتركة، وتبادل الخبرات، والتكامل بين الحلول، وتنفيذ المشروعات في أسواق متعددة.",
    cta: "اقترح شراكة",
    form: "proposal",
  },
  {
    id: "regional",
    title: "الشراكات التجارية والإقليمية",
    en: "Channel & Regional Partnerships",
    text: "نرحب بالشركات ذات الحضور التجاري أو الخبرة القطاعية في الأسواق المحلية والإقليمية لتطوير فرص الأعمال وتسويق الحلول والمنتجات وتقديم الخدمات. تشمل المسارات شركاء المبيعات والقنوات التجارية وشركاء التنفيذ والتوسع في أسواق جديدة.",
    cta: "قدّم طلب شراكة إقليمية",
    form: "proposal",
    initial: { partnershipType: "channel" },
  },
  {
    id: "outsourcing",
    title: "التعهيد والخدمات المُدارة",
    en: "Outsourcing & Managed Services",
    text: "نوفر فرقًا وخبرات متخصصة في تطوير البرمجيات والذكاء الاصطناعي والبيانات وأنظمة المؤسسات، ودعم التجارة الإلكترونية والحجوزات الرقمية، وخدمات المحاسبة والأعمال المساندة. تشمل النماذج توفير الكفاءات، والفرق المخصصة، والمشروعات، والخدمات المُدارة.",
    cta: "ناقش احتياجات فريقك",
    form: "inquiry",
  },
  {
    id: "academic",
    title: "التعاون الأكاديمي والمؤسسي",
    en: "Academic & Institutional Collaboration",
    text: "نتعاون مع الجامعات والمؤسسات التعليمية ومراكز الابتكار والجهات المهنية في الأنشطة التقنية والتطبيقية، والتدريب، والمشروعات الطلابية والإرشاد. وتشمل المجالات Transformix Academy وTX Community والمحاضرات وورش العمل ومشروعات التخرج.",
    cta: "اقترح تعاونًا مؤسسيًا",
    form: "proposal",
    initial: { partnershipType: "academic" },
  },
  {
    id: "ventures",
    title: "التعاون في المنتجات والمشروعات الناشئة",
    en: "Product & Venture Collaboration",
    text: "ندرس التعاون مع الشركات الناشئة ومالكي المنتجات الرقمية والفرق المتخصصة لتطوير المنتجات، والنماذج الأولية، وحلول MVP. وقد يشمل التعاون خدمات تقنية متخصصة أو تطويرًا مشتركًا أو دراسة شراكات في مشروعات مختارة وفق اتفاق مستقل.",
    cta: "شاركنا مقترحك",
    form: "proposal",
    initial: { partnershipType: "venture" },
  },
];

export const isPartnershipPathId = (value: unknown): value is PartnershipPathId =>
  PARTNERSHIP_PATHS.some(({ id }) => id === value);

export const getPartnershipPath = (id: PartnershipPathId) =>
  PARTNERSHIP_PATHS.find((path) => path.id === id)!;

/* ---- The two forms ------------------------------------------------------ */

const COUNTRIES: readonly Option[] = [
  { value: "sa", label: "المملكة العربية السعودية" },
  { value: "ae", label: "الإمارات العربية المتحدة" },
  { value: "eg", label: "مصر" },
  { value: "kw", label: "الكويت" },
  { value: "qa", label: "قطر" },
  { value: "bh", label: "البحرين" },
  { value: "om", label: "عُمان" },
  { value: "jo", label: "الأردن" },
  { value: "other", label: "دولة أخرى" },
];

/** Who is asking: the same six fields open both forms. */
const CONTACT: readonly Field[] = [
  { name: "fullName", label: "الاسم الكامل", kind: "text", required: true, autoComplete: "name", placeholder: "الاسم كما يظهر في بيانات الاتصال" },
  { name: "email", label: "البريد الإلكتروني للعمل", kind: "email", required: true, autoComplete: "email", placeholder: "name@company.com" },
  { name: "company", label: "الشركة / المؤسسة", kind: "text", autoComplete: "organization", placeholder: "اسم المؤسسة" },
  { name: "jobTitle", label: "المنصب الوظيفي", kind: "text", autoComplete: "organization-title", placeholder: "المسمى المهني" },
  { name: "country", label: "الدولة", kind: "select", required: true, placeholder: "اختر الدولة", options: COUNTRIES },
  { name: "city", label: "المدينة", kind: "text", autoComplete: "address-level2", placeholder: "المدينة" },
];

const COMMON = {
  consent: "أوافق على معالجة بياناتي لغرض مراجعة الطلب والرد عليه وفق سياسة الخصوصية.",
  submit: "مراجعة الطلب",
  doneTitle: "شكرًا لتواصلك مع ترانسفورمكس",
  doneText: "وصلنا طلبك، وسيراجع فريق ترانسفورمكس المعلومات المقدمة لتحديد مسار التواصل المناسب.",
  again: "إرسال طلب آخر",
};

export type PartnershipForm = FormSpec<PartnershipFormId> & {
  /** The line above the title, in English on both sites. */
  eyebrow: string;
  title: string;
};

const inquiry: PartnershipForm = {
  id: "inquiry",
  eyebrow: "Smart Contact Form · Business Inquiry",
  title: "طلب مشروع أو خدمة",
  sections: [
    {
      fields: [
        ...CONTACT,
        {
          name: "service",
          label: "مجال الخدمة المطلوبة",
          kind: "select",
          placeholder: "AI & Data / ERP & CRM / Software Engineering",
          options: [
            { value: "ai-data", label: "الذكاء الاصطناعي والبيانات (AI & Data)" },
            { value: "agents", label: "الوكلاء الأذكياء (AI Agents)" },
            { value: "erp-crm", label: "أنظمة ERP وCRM" },
            { value: "software", label: "هندسة البرمجيات (Software Engineering)" },
            { value: "ecommerce", label: "التجارة الإلكترونية والحجوزات الرقمية" },
            { value: "mobile", label: "تطبيقات الهواتف" },
            { value: "platforms", label: "المنصات المؤسسية" },
            { value: "transformation", label: "التحول الرقمي والإداري" },
            { value: "back-office", label: "المحاسبة والأعمال المساندة" },
            { value: "other", label: "مجال آخر" },
          ],
        },
        {
          name: "stage",
          label: "مرحلة المشروع",
          kind: "select",
          placeholder: "دراسة المتطلبات / نظام قائم / جاهز للتنفيذ",
          options: [
            { value: "requirements", label: "دراسة المتطلبات" },
            { value: "existing", label: "نظام قائم" },
            { value: "ready", label: "جاهز للتنفيذ" },
          ],
        },
        {
          name: "budget",
          label: "الميزانية التقديرية (اختياري)",
          kind: "select",
          placeholder: "لم تُحدد بعد / معتمدة / نطلب عرضًا ماليًا",
          options: [
            { value: "undecided", label: "لم تُحدد بعد" },
            { value: "approved", label: "معتمدة" },
            { value: "quote", label: "نطلب عرضًا ماليًا" },
          ],
        },
        {
          name: "start",
          label: "موعد بدء التنفيذ المتوقع",
          kind: "select",
          placeholder: "الفترة المستهدفة",
          options: [
            { value: "month", label: "خلال شهر" },
            { value: "quarter", label: "خلال 1–3 أشهر" },
            { value: "half", label: "خلال 3–6 أشهر" },
            { value: "later", label: "بعد 6 أشهر" },
            { value: "undecided", label: "لم يُحدد بعد" },
          ],
        },
        {
          name: "details",
          label: "تفاصيل المشروع والمتطلبات",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "وصف نطاق المشروع، الأنظمة القائمة، والأهداف المطلوبة...",
        },
      ],
    },
  ],
  ...COMMON,
};

const proposal: PartnershipForm = {
  id: "proposal",
  eyebrow: "Smart Contact Form · Partnership Proposal",
  title: "طلب شراكة تجارية أو تقنية",
  sections: [
    {
      fields: [
        ...CONTACT,
        {
          name: "partnershipType",
          label: "نوع الشراكة المقترحة",
          kind: "select",
          placeholder: "شريك تنفيذ / تكامل / قنوات بيع / تطوير مشترك",
          options: [
            { value: "implementation", label: "شريك تنفيذ" },
            { value: "integration", label: "تكامل الحلول" },
            { value: "channel", label: "قنوات بيع" },
            { value: "co-development", label: "تطوير مشترك" },
            { value: "academic", label: "تعاون أكاديمي أو مؤسسي" },
            { value: "venture", label: "تعاون في منتج أو مشروع ناشئ" },
            { value: "other", label: "نوع آخر" },
          ],
        },
        { name: "markets", label: "الأسواق أو القطاعات المستهدفة", kind: "text", placeholder: "الدول والقطاعات محل التعاون" },
        { name: "website", label: "الموقع الإلكتروني للمؤسسة", kind: "url", autoComplete: "url", placeholder: "https://" },
        { name: "capabilities", label: "القدرات والخبرات ذات الصلة", kind: "text", placeholder: "خبرات المؤسسة أو الفريق" },
        {
          name: "details",
          label: "تفاصيل مقترح الشراكة",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "طبيعة التعاون المتوقعة، الإسهام المتاح، ونموذج العمل المقترح...",
        },
      ],
    },
  ],
  ...COMMON,
};

/* The /contact page's own form (Figma 4431:12256): one short request for
   every path, picked from the request types above its fields. It asks no
   consent, as the artboard draws none. */
const contact: PartnershipForm = {
  id: "contact",
  eyebrow: "Contact Page · Unified Request",
  title: "طلب تواصل",
  sections: [
    {
      fields: [
        { name: "fullName", label: "الاسم الكامل", kind: "text", required: true, autoComplete: "name", placeholder: "اكتب اسمك الكامل" },
        { name: "company", label: "الجهة / الشركة", kind: "text", required: true, autoComplete: "organization", placeholder: "اسم المؤسسة أو الشركة" },
        { name: "email", label: "البريد الإلكتروني", kind: "email", required: true, autoComplete: "email", placeholder: "name@company.com" },
        { name: "country", label: "الدولة", kind: "select", required: true, placeholder: "اختر الدولة", options: COUNTRIES },
        {
          name: "details",
          label: "تفاصيل الطلب",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "أخبرنا عن مشروعك أو مقترح التعاون والنتائج التي تتطلع إليها…",
        },
        {
          name: "context",
          label: "سياق إضافي ذو صلة (اختياري)",
          kind: "text",
          wide: true,
          placeholder: "الأنظمة الحالية، السوق المستهدف أو روابط تعريفية",
        },
      ],
    },
  ],
  ...COMMON,
  consent: "",
  submit: "إرسال طلب التواصل",
};

/* The tourism service page's request (Figma 4473:9612): who is asking,
   their activity, the solution area they lean to and the outcome they want.
   It reaches the team on the business path. */
const tourism: PartnershipForm = {
  id: "tourism",
  eyebrow: "Tourism, Hospitality & Heritage · Discussion Request",
  title: "طلب مناقشة من صفحة السياحة والضيافة والتراث",
  sections: [
    {
      fields: [
        { name: "fullName", label: "الاسم", kind: "text", required: true, autoComplete: "name", placeholder: "اكتب اسمك بالكامل" },
        { name: "company", label: "الجهة", kind: "text", required: true, autoComplete: "organization", placeholder: "اسم الشركة أو المؤسسة" },
        { name: "email", label: "البريد الإلكتروني", kind: "email", required: true, autoComplete: "email", placeholder: "name@organization.com" },
        { name: "country", label: "الدولة", kind: "select", required: true, placeholder: "اختر الدولة", options: COUNTRIES },
        {
          name: "activity",
          label: "النشاط",
          kind: "select",
          required: true,
          placeholder: "اختر طبيعة نشاطك",
          options: [
            { value: "operators", label: "مشغلو الأنشطة والتجارب وشركات السياحة" },
            { value: "umrah", label: "شركات العمرة وخدمات الزوار" },
            { value: "heritage", label: "المتاحف والمواقع التراثية" },
            { value: "guides", label: "المرشدون والجهات ذات العضوية" },
            { value: "other", label: "نشاط آخر" },
          ],
        },
        {
          name: "interest",
          label: "الاهتمام الرئيسي",
          kind: "select",
          placeholder: "اختر مجال الحل المناسب",
          options: [
            { value: "distribution", label: "إدارة التوزيع السياحي" },
            { value: "platforms", label: "تطوير المنصات والتطبيقات السياحية" },
            { value: "operations", label: "إدارة العمليات والعملاء والتكاملات" },
            { value: "heritage", label: "تكنولوجيا المتاحف والتجارب الغامرة" },
            { value: "analytics", label: "تحليلات السياحة والذكاء الاصطناعي" },
            { value: "undecided", label: "لم أحدد بعد" },
          ],
        },
        {
          name: "details",
          label: "الهدف المطلوب",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "ما الذي تريد تطويره؟ شاركنا هدفك والأنظمة أو القنوات المستخدمة حاليًا…",
        },
      ],
    },
  ],
  ...COMMON,
  consent: "",
  submit: "أرسل طلب المناقشة",
};

/* The creative and digital-marketing hub's request (Figma 4854:7820, the
   closing form): who is asking, the service they want and a note on the
   project. Each service page's calls drop to it with the service chosen.
   It reaches the team on the business path and asks no consent, as the
   artboard draws none. */
const creative: PartnershipForm = {
  id: "creative",
  eyebrow: "Creative & Digital Marketing · Project Request",
  title: "طلب مناقشة من صفحة الإبداع والتسويق الرقمي",
  sections: [
    {
      fields: [
        { name: "fullName", label: "الاسم الكامل", kind: "text", required: true, autoComplete: "name", placeholder: "اكتب اسمك" },
        { name: "company", label: "الشركة أو النشاط", kind: "text", autoComplete: "organization", placeholder: "اسم الشركة" },
        { name: "email", label: "البريد الإلكتروني", kind: "email", required: true, autoComplete: "email", placeholder: "بريدك الإلكتروني" },
        { name: "phone", label: "رقم الجوال", kind: "tel", autoComplete: "tel", placeholder: "+966" },
        {
          name: "service",
          label: "الخدمة المطلوبة",
          kind: "select",
          wide: true,
          placeholder: "اختر الخدمة",
          options: [
            { value: "brand", label: "استراتيجية العلامة التجارية والهوية" },
            { value: "media-buying", label: "الحملات الإعلانية والتسويق بالأداء" },
            { value: "social", label: "إدارة منصات التواصل الاجتماعي" },
            { value: "seo", label: "تحسين الظهور والبحث الرقمي" },
            { value: "content", label: "التسويق بالمحتوى والعلاقات العامة الرقمية" },
            { value: "production", label: "التصميم الإبداعي والإنتاج الإعلامي" },
            { value: "uiux", label: "تصميم تجربة المستخدم والواجهات" },
            { value: "automation", label: "أتمتة التسويق وتحليل الأداء" },
            { value: "undecided", label: "لم أحدد بعد" },
          ],
        },
        {
          name: "details",
          label: "نبذة عن المشروع",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "أخبرنا بطبيعة نشاطك والجمهور الذي تستهدفه",
        },
      ],
    },
  ],
  ...COMMON,
  consent: "",
  submit: "ناقش مشروعك",
};

/* The media-buying page's request (Figma 4973:8825, the closing form): who is
   asking, where and on which platforms, the goal, the budget and the start.
   The artboard draws the fields only; the choices behind its selects are the
   page's own (the platforms and goals it lists). Reads in the same business
   path as the creative hub's and asks no consent. */
const mediaBuying: PartnershipForm = {
  id: "mediaBuying",
  eyebrow: "Creative & Digital Marketing · Campaign Request",
  title: "طلب مناقشة حملة إعلانية",
  sections: [
    {
      fields: [
        { name: "company", label: "اسم النشاط", kind: "text", required: true, autoComplete: "organization", placeholder: "اسم النشاط" },
        { name: "fullName", label: "اسم جهة التواصل", kind: "text", required: true, autoComplete: "name", placeholder: "الاسم" },
        { name: "contact", label: "البريد أو الهاتف", kind: "text", required: true, autoComplete: "email", placeholder: "بريدك الإلكتروني أو رقم الجوال" },
        { name: "market", label: "الدولة أو السوق المستهدف", kind: "text", placeholder: "الدولة أو السوق" },
        {
          name: "goal",
          label: "هدف الحملة",
          kind: "select",
          placeholder: "اختر الهدف",
          options: [
            { value: "sales", label: "زيادة المبيعات والطلبات" },
            { value: "leads", label: "استقطاب عملاء للشركات" },
            { value: "launch", label: "إطلاق علامة أو منتج" },
            { value: "expansion", label: "التوسع في سوق جديد" },
            { value: "events", label: "الترويج للفعاليات والبرامج" },
            { value: "undecided", label: "لم أحدد بعد" },
          ],
        },
        {
          name: "platforms",
          label: "المنصات المطلوبة",
          kind: "select",
          placeholder: "اختر المنصات",
          options: [
            { value: "google", label: "إعلانات جوجل" },
            { value: "instagram", label: "إعلانات إنستجرام" },
            { value: "facebook", label: "إعلانات فيسبوك" },
            { value: "tiktok", label: "إعلانات تيك توك" },
            { value: "snapchat", label: "إعلانات سناب شات" },
            { value: "linkedin", label: "إعلانات لينكدإن" },
            { value: "youtube", label: "إعلانات يوتيوب" },
            { value: "multi", label: "أكثر من منصة" },
            { value: "undecided", label: "أحتاج إلى توصية" },
          ],
        },
        { name: "budget", label: "الميزانية الإعلانية الشهرية التقريبية", kind: "text", placeholder: "المبلغ والعملة" },
        {
          name: "accounts",
          label: "وجود حسابات إعلانية حالية",
          kind: "select",
          placeholder: "اختر",
          options: [
            { value: "yes", label: "نعم، لدينا حسابات إعلانية" },
            { value: "no", label: "لا، نحتاج إلى إعدادها" },
            { value: "unsure", label: "لست متأكدًا" },
          ],
        },
        { name: "start", label: "موعد بدء الحملة", kind: "text", wide: true, placeholder: "التاريخ المتوقع" },
        { name: "details", label: "تفاصيل إضافية", kind: "textarea", wide: true, placeholder: "أخبرنا بما تريد تحقيقه" },
      ],
    },
  ],
  ...COMMON,
  consent: "",
  submit: "ناقش حملتك الإعلانية",
};

export const PARTNERSHIP_FORMS: Record<PartnershipFormId, PartnershipForm> = { inquiry, proposal, contact, tourism, creative, mediaBuying };

/** The forms a page shows on its own rather than one a path leads to. */
const PAGE_FORM_IDS: readonly PartnershipFormId[] = ["contact", "tourism", "creative", "mediaBuying"];

export const isPageFormId = (value: unknown): value is PartnershipFormId =>
  PAGE_FORM_IDS.includes(value as PartnershipFormId);

/** The request types the /contact form offers, one per path, in reading order. */
export const CONTACT_REQUEST_TYPES: readonly { id: PartnershipPathId; label: string }[] = [
  { id: "business", label: "استفسارات الأعمال والمشروعات" },
  { id: "technology", label: "الشراكات التقنية والاستراتيجية" },
  { id: "regional", label: "الشراكات التجارية والإقليمية" },
  { id: "outsourcing", label: "التعهيد والخدمات المُدارة" },
  { id: "academic", label: "التعاون الأكاديمي والمؤسسي" },
  { id: "ventures", label: "المنتجات والمشروعات الناشئة" },
];

/** The modal's own copy. */
export const PARTNERSHIP_COPY = {
  steps: ["نوع الطلب", "التفاصيل", "مراجعة وإرسال"],
  choose: {
    eyebrow: "Ways to Work With Us",
    title: "كيف يمكننا التعاون؟",
    text: "اختر المسار الأقرب إلى طلبك، وسننقلك إلى النموذج المناسب له.",
  },
  path: "المسار",
  required: "الحقول المميزة بنجمة مطلوبة",
  back: "رجوع",
  review: {
    eyebrow: "Review & Send",
    title: "مراجعة وإرسال",
    text: "راجع بيانات طلبك قبل إرساله، ويمكنك الرجوع لتعديلها.",
    edit: "تعديل البيانات",
    send: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
  },
  close: "إغلاق",
  error: "تعذّر إرسال الطلب الآن. حاول مرة أخرى، أو راسلنا على Info@thetransformix.com",
};
