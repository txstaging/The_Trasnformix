import type { ServiceKey } from "@/components/v2/routes";
import type { Faq } from "@/components/v2/sections/FaqList";
import type { Step } from "@/components/v2/sections/ProcessSteps";
import type { Feature, FeatureCardTone } from "@/components/v2/ui/FeatureCard";

/** Everything a v2 service page says. The four artboards share one layout
    (Figma "Service narrative"), so each page is this data plus, where the
    artboard has one, a bespoke visual. Card lists run right to left. */
export type ServiceContent = {
  key: ServiceKey;
  /** The last breadcrumb. */
  crumb: string;
  title: string;
  lead: string;
  /** A supplied interface under the introduction, 1040 x 686. */
  screen?: { src: string; alt: string; caption?: string };
  context: string;
  /** The marketing artboard opens its context card with the paragraph. */
  contextTextFirst?: boolean;
  scope: { title: string; tone: FeatureCardTone; items: Feature[] };
  outcomes: { tone: FeatureCardTone; items: Feature[]; footnote: boolean };
  process: { variant: "timeline" | "ruled"; steps: Step[] };
  readiness: string;
  faqs: Faq[];
  cta: { title: string; text: string };
};

const CTA_TEXT =
  "أخبرنا عن التحدي والأنظمة أو الأدوات الحالية، لنناقش معك النطاق والخطوة التالية.";

const icon = (name: string) => `/v2/icons/${name}.svg`;

/** Figma "تحليل البيانات" (3693:65211). */
export const DATA_SERVICE: ServiceContent = {
  key: "data",
  crumb: "تحليل البيانات",
  title: "علوم البيانات والذكاء الاصطناعي",
  lead: "نساعدك على تنظيم البيانات وقراءة ما وراء الأرقام، من تحديد السؤال ومراجعة المصادر إلى بناء مؤشرات ولوحات تخدم القرار.",
  screen: { src: "/v2/screens/mcr-dashboard.png", alt: "لوحة MCR Systems لمراقبة التشغيل" },
  context:
    "عندما تختلف التقارير أو تتعدد ملفات العمل، يصبح الاتفاق على صورة واحدة تحديًا. نراجع المصدر والتعريف والسياق، قبل رسم أي مؤشر.",
  scope: {
    title: "نطاق تحليل البيانات",
    tone: "gradient-deep",
    items: [
      {
        icon: icon("data-database"),
        title: "تهيئة البيانات",
        text: "حصر المصادر، ومراجعة الجودة، ومعالجة التكرار، وتوحيد التعريفات قبل الاستخدام.",
      },
      {
        icon: icon("data-chart"),
        title: "التحليل ولوحات المؤشرات",
        text: "تحليل استكشافي ولوحات موجهة للإدارة والفرق، مع تعريف واضح لكل مؤشر.",
      },
      {
        icon: icon("data-scan-search"),
        title: "التحليلات المتقدمة",
        text: "دراسة الأنماط والسيناريوهات وفرص التنبؤ عندما تسمح جودة البيانات وطبيعتها.",
      },
    ],
  },
  outcomes: {
    tone: "neutral",
    footnote: true,
    items: [
      {
        icon: icon("messages-square"),
        title: "لغة مشتركة للأداء",
        text: "تعريفات موحدة تقلل اختلاف قراءة المؤشرات بين الإدارات.",
      },
      {
        icon: icon("target"),
        title: "رؤية للأولويات",
        text: "تحديد الأسئلة والفجوات التي تستحق المتابعة والتحقق.",
      },
      {
        icon: icon("refresh-cw"),
        title: "تقارير قابلة للاستمرار",
        text: "تنظيم التحديث والتوثيق بما يتناسب مع المصادر المتاحة.",
      },
    ],
  },
  process: {
    variant: "timeline",
    steps: [
      { title: "صياغة الأسئلة", text: "نحدد القرارات التي نريد دعمها والمستخدمين المستهدفين." },
      { title: "مراجعة البيانات", text: "نفحص المصادر والجودة والصلاحيات وإمكانات الربط." },
      { title: "التحليل والبناء", text: "نصمم المؤشرات والتصورات ونراجعها مع أصحاب العلاقة." },
      { title: "التحقق والتمكين", text: "نراجع الحسابات ونوثق التعريفات وطريقة التحديث." },
    ],
  },
  readiness:
    "عينات بيانات مناسبة للمراجعة، وقائمة بالتقارير الحالية، وأسئلة الأعمال ذات الأولوية، ومسؤول يعرف سياق البيانات.",
  faqs: [
    {
      question: "هل يمكن العمل على ملفات Excel فقط؟",
      answer:
        "يمكن دراسة الملفات كمصدر بداية. يُحدد الحل بعد مراجعة بنيتها وحجمها وجودتها وطريقة تحديثها.",
    },
    {
      question: "هل التحليل المتقدم مناسب لجميع البيانات؟",
      answer:
        "ليس بالضرورة. نقيم حجم البيانات وتاريخها ودقتها أولًا، وقد يكون تحسين التقارير الأساسية هو الخطوة الأنسب.",
    },
  ],
  cta: { title: "لنبدأ بالسؤال الذي تحتاج بياناتك أن تجيب عنه.", text: CTA_TEXT },
};

/** Figma "تطوير المواقع" (3693:65475). */
export const WEB_SERVICE: ServiceContent = {
  key: "web",
  crumb: "تطوير المواقع",
  title: "موقع يعكس هويتك، ويخدم زوّارك.",
  lead: "نصمم ونطوّر مواقع عربية منظمة، تجمع وضوح المحتوى وسهولة الاستخدام والمرونة التقنية، لتقديم تجربة متسقة عبر الأجهزة.",
  screen: {
    src: "/v2/screens/cooperative-dashboard.png",
    alt: "واجهة منصة إدارة التعاونيات",
    caption: "واجهة من المواد المرفقة — تُحدد الخصائص النهائية وفق نطاق المشروع",
  },
  context:
    "قد يكون الموقع غنيًا بالمعلومات، لكنه لا يجيب عن سؤال الزائر. نراجع رحلة الاستخدام وبنية المحتوى لنحدد ما يجب أن يظهر، ومتى، وكيف.",
  scope: {
    title: "نطاق تطوير المواقع",
    tone: "neutral",
    items: [
      {
        icon: icon("web-mouse-pointer"),
        title: "التجربة والمحتوى",
        text: "بحث الاحتياج، وبنية المعلومات، ورحلات المستخدم، ونماذج أولية توضّح الصفحات الأساسية.",
      },
      {
        icon: icon("web-panels"),
        title: "التصميم والتطوير",
        text: "واجهات RTL متجاوبة، ومكونات متسقة، وتطوير يتناسب مع متطلبات الموقع.",
      },
      {
        icon: icon("web-settings"),
        title: "الإدارة والتكامل",
        text: "إدارة محتوى ونماذج وربط بالأنظمة اللازمة، مع تحديد الصلاحيات والحدود.",
      },
    ],
  },
  outcomes: {
    tone: "gradient",
    footnote: true,
    items: [
      {
        icon: icon("web-route"),
        title: "رحلة أسهل للزائر",
        text: "ترتيب واضح للمعلومات وطرق الوصول إلى الخدمة المناسبة.",
      },
      {
        icon: icon("web-file-pen"),
        title: "إدارة أكثر مرونة",
        text: "تنظيم المحتوى لتمكين فريقك من تحديثه ضمن صلاحياته.",
      },
      {
        icon: icon("web-code-xml"),
        title: "أساس تقني مدروس",
        text: "متطلبات محددة للأداء والوصولية والصيانة المستقبلية.",
      },
    ],
  },
  process: {
    variant: "timeline",
    steps: [
      { title: "اكتشاف وبنية", text: "نفهم الجمهور والأهداف ونرتب خريطة الموقع والمحتوى." },
      { title: "تصميم التجربة", text: "نراجع النماذج والواجهات ومسارات الاستخدام." },
      { title: "تطوير واختبار", text: "نبني الصفحات ونختبر الأجهزة والنماذج والمحتوى." },
      { title: "إطلاق وتسليم", text: "نراجع جاهزية النشر ونسلّم الإرشادات لفريقك." },
    ],
  },
  readiness:
    "هوية بصرية ومحتوى متاح، وأهداف الموقع، وقائمة بالوظائف المطلوبة، ومسؤول لاعتماد المحتوى والتصميم.",
  faqs: [
    {
      question: "هل تدعمون المواقع العربية والإنجليزية؟",
      answer:
        "يمكن تضمين اللغتين ضمن النطاق، مع دراسة بنية المحتوى واتجاه العرض وإدارة الترجمات منذ البداية.",
    },
    {
      question: "ماذا عن الاستضافة والصيانة؟",
      answer:
        "تُناقش متطلباتهما بشكل مستقل ضمن العرض، بما يشمل المسؤوليات والتحديثات وحدود الدعم.",
    },
  ],
  cta: { title: "لنبنِ تجربة رقمية تعبّر عن منشأتك.", text: CTA_TEXT },
};

/** Figma "التسويق والتصميم الإلكتروني" (3693:65692). Its visual is the
    campaign concept card (services/CampaignConcept). */
export const MARKETING_SERVICE: ServiceContent = {
  key: "marketing",
  crumb: "التسويق والتصميم الإلكتروني",
  title: "استديو الإبداع والتسويق الرقمي",
  lead: "نجمع التخطيط التسويقي بالمحتوى والتصميم الإلكتروني في خدمة واحدة، لبناء تواصل متسق يعبّر عن هوية المنشأة ويخاطب جمهورها.",
  context:
    "حين تختلف الرسالة من قناة إلى أخرى، تضيع هوية العلامة. نبدأ بتحديد الجمهور والقيمة واللغة، ثم نترجمها إلى محتوى وتصميم قابلين للتطبيق.",
  contextTextFirst: true,
  scope: {
    title: "نطاق التسويق والتصميم الإلكتروني",
    tone: "neutral",
    items: [
      {
        icon: icon("messages-square"),
        title: "الاستراتيجية والمحتوى",
        text: "تحديد الجمهور والرسائل، واختيار القنوات، وصياغة خطة محتوى تناسب أهداف التواصل.",
      },
      {
        icon: icon("marketing-pen-tool"),
        title: "التصميم الإلكتروني",
        text: "اتجاه بصري وقوالب رقمية ومواد حملات متسقة مع الهوية وطبيعة كل قناة.",
      },
      {
        icon: icon("marketing-megaphone"),
        title: "الحملات والتحسين",
        text: "إعداد تصورات الحملات ومؤشرات المتابعة، ومراجعة النتائج لتوجيه التحسين.",
      },
    ],
  },
  outcomes: {
    tone: "neutral",
    footnote: true,
    items: [
      {
        icon: icon("marketing-palette"),
        title: "هوية متسقة",
        text: "رسائل وقواعد بصرية مشتركة تساعد الفريق على إنتاج محتوى منسجم.",
      },
      {
        icon: icon("target"),
        title: "محتوى له غاية",
        text: "ربط كل مادة بجمهورها ومرحلتها في رحلة التعرف إلى الخدمة.",
      },
      {
        icon: icon("marketing-chart"),
        title: "متابعة أكثر وضوحًا",
        text: "تعريف المؤشرات المناسبة لكل هدف وقناة قبل التنفيذ.",
      },
    ],
  },
  process: {
    variant: "ruled",
    steps: [
      { title: "نفهم العلامة", text: "نراجع الهوية والجمهور والرسائل والحضور الحالي." },
      { title: "نرسم الاتجاه", text: "نحدد خطة التواصل ونقترح الاتجاه الإبداعي." },
      { title: "ننتج ونراجع", text: "نصمم المواد ونكتب المحتوى ضمن دورات اعتماد واضحة." },
      { title: "نتابع ونحسن", text: "نقرأ مؤشرات الأداء ونقترح تحسينات على المحتوى." },
    ],
  },
  readiness:
    "ملفات الهوية، وتعريف الخدمات والجمهور، وصلاحيات القنوات عند الحاجة، وآلية لاعتماد المحتوى والمواد.",
  faqs: [
    {
      question: "هل التسويق والتصميم خدمتان منفصلتان؟",
      answer:
        "يُقدمان هنا كخدمة متكاملة، مع تحديد ما يحتاجه المشروع من تخطيط ومحتوى وتصميم وتنفيذ ضمن النطاق.",
    },
    {
      question: "هل تشمل الخدمة ميزانيات الإعلانات؟",
      answer:
        "تُحدد إدارة الحملات والميزانية الإعلانية بشكل صريح عند الاتفاق؛ ولا تُفترض ضمن أعمال المحتوى والتصميم.",
    },
  ],
  cta: { title: "لنمنح رسالتك اتجاهًا متسقًا.", text: CTA_TEXT },
};

/** Figma "أنظمة ERP" (3693:65892). Its production-planning example sits
    after the context card (services/ProductionPlanning). */
export const ERP_SERVICE: ServiceContent = {
  key: "erp",
  crumb: "أنظمة ERP",
  title: "عمليات مترابطة. رؤية أشمل للمنشأة.",
  lead: "نساعدك على دراسة وتهيئة أنظمة تخطيط موارد المنشأة، لربط الإجراءات والبيانات بين الإدارات وتقليل العمل المنفصل، وفق نموذج تشغيل يناسبك.",
  screen: {
    src: "/v2/screens/mcr-dashboard.png",
    alt: "لوحة MCR Systems لمراقبة التشغيل",
    caption: "واجهة من المواد المرفقة — تُحدد الخصائص النهائية وفق نطاق المشروع",
  },
  context:
    "تكرار إدخال البيانات وتعدد الملفات قد يخفيان أصل المشكلة. نراجع دورة العمل والأدوار والاعتمادات قبل اختيار النظام أو تهيئته.",
  scope: {
    title: "نطاق أنظمة ERP",
    tone: "neutral",
    items: [
      {
        icon: icon("erp-git-branch"),
        title: "تحليل العمليات والمتطلبات",
        text: "توثيق دورات العمل، وتحديد الفجوات، وصياغة متطلبات تساعد على تقييم الحلول.",
      },
      {
        icon: icon("workflow"),
        title: "التهيئة والتكامل",
        text: "تهيئة الوحدات والصلاحيات، ودراسة الربط وترحيل البيانات بحسب نطاق المشروع.",
      },
      {
        icon: icon("users-round"),
        title: "الاختبار وتمكين المستخدمين",
        text: "سيناريوهات اختبار قبول، وأدلة تشغيل، وتدريب مرتبط بأدوار المستخدمين.",
      },
    ],
  },
  outcomes: {
    tone: "neutral",
    footnote: false,
    items: [
      {
        icon: icon("database"),
        title: "بيانات أكثر اتساقًا",
        text: "تعريف مصادر مشتركة وتحديد مسؤوليات إدخال البيانات ومراجعتها.",
      },
      {
        icon: icon("erp-list-checks"),
        title: "إجراءات أوضح",
        text: "مسارات اعتماد وصلاحيات تساعد على ضبط العمل بين الإدارات.",
      },
      {
        icon: icon("erp-layout-dashboard"),
        title: "متابعة مترابطة",
        text: "تقارير تجمع سياق العمليات بدل الاعتماد على ملفات منفصلة.",
      },
    ],
  },
  process: {
    variant: "ruled",
    steps: [
      { title: "تحليل الوضع", text: "نراجع الإجراءات والأنظمة والتحديات التشغيلية." },
      { title: "تصميم الحل", text: "نحدد الوحدات والأدوار والفجوات وخطة الترحيل." },
      { title: "تهيئة واختبار", text: "نجهز النظام ونختبر العمليات والبيانات مع المستخدمين." },
      { title: "إطلاق وتمكين", text: "ننظم الانتقال ونوثق التشغيل واحتياجات الدعم." },
    ],
  },
  readiness:
    "أصحاب عمليات من الإدارات المعنية، ووصف للإجراءات الحالية، وعينات للبيانات، وقائمة بالأنظمة والتكاملات ذات الصلة.",
  faqs: [
    {
      question: "هل يجب تغيير النظام الحالي بالكامل؟",
      answer:
        "ليس بالضرورة. يبدأ القرار بتقييم ما يمكن تحسينه أو ربطه، وما يتطلب استبدالًا، مع مراعاة أثر الانتقال على التشغيل.",
    },
    {
      question: "هل تشمل الخدمة التراخيص والدعم المستمر؟",
      answer: "تُوضح التراخيص والاستضافة والدعم بشكل مستقل بحسب المنتج المختار ومسؤوليات كل طرف.",
    },
  ],
  cta: { title: "لنجعل الإجراءات تعمل كمنظومة واحدة.", text: CTA_TEXT },
};
