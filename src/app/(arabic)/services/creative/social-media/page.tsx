import type { Metadata } from "next";
import { AcademyAction } from "@/components/academies/AcademyAction";
import { AcademyFaq } from "@/components/academies/AcademyFaq";
import { SectionIntro } from "@/components/academies/AcademiesKit";
import {
  CreativeIntro,
  CreativeNav,
  creativePage,
  ProcessCards,
  SectorBanner,
} from "@/components/creative/CreativeKit";
import {
  Connected,
  Engagement,
  InfoCards,
  RequestClosing,
  SocialSection,
  social,
  type Info,
  type Linked,
  type Model,
} from "@/components/creative/social-media/SocialMedia";
import { SocialSticky, type SocialStickyItem } from "@/components/creative/social-media/SocialSticky";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import { creativeHref } from "@/lib/creativeNav";

export const metadata: Metadata = {
  title: "إدارة منصات التواصل الاجتماعي | Transformix",
  description:
    "تساعدك ترانسفورمكس على إدارة حضور علامتك التجارية عبر منصات التواصل الاجتماعي، من تطوير استراتيجية المحتوى وإنتاج المواد الإبداعية إلى النشر وإدارة التفاعل وتحليل الأداء.",
};

const image = (name: string) => `/images/creative/social-media/${name}.jpg`;
const icon = (name: string) => `/icons/creative/${name}.svg`;

/* Figma 4984:9685, the seven variants, top to bottom. */
const CAPABILITIES: readonly SocialStickyItem[] = [
  {
    title: "استراتيجية التواصل الاجتماعي",
    paragraphs: [
      "نساعدك على تحديد دور منصات التواصل في نشاطك التجاري، والجمهور الذي ترغب في الوصول إليه، والموضوعات التي تستحق اهتمامه.",
      "تشمل الخدمة مراجعة الحسابات الحالية، ودراسة الجمهور والمنافسين، واختيار القنوات المناسبة، وتحديد أسلوب التواصل وأهداف المحتوى ومؤشرات الأداء.",
      "والنتيجة خطة واضحة تساعد فريقك على إدارة المحتوى بصورة منظمة، بدل الاعتماد على منشورات متفرقة لا ترتبط بأهداف محددة.",
    ],
    image: image("strategy"),
  },
  {
    title: "تخطيط المحتوى وإدارته",
    paragraphs: [
      "نطور خطة محتوى تتناسب مع طبيعة نشاطك ومناسباتك التجارية والمنتجات والخدمات التي ترغب في إبرازها.",
      "تشمل خدماتنا إعداد التقويم التحريري، واختيار الموضوعات، وكتابة المنشورات، وتحديد الصيغ المناسبة، وتنظيم مراحل المراجعة والاعتماد والنشر.",
      "ويمكن تنسيق المحتوى مع فرق التسويق والمبيعات والعلاقات العامة داخل مؤسستك، بما يساعد على تقديم رسائل واضحة للجمهور.",
    ],
    image: image("planning"),
  },
  {
    title: "التصميم وإنتاج المحتوى",
    paragraphs: [
      "ننتج محتوى بصريًا وتحريريًا يناسب شخصية علامتك التجارية وطبيعة القنوات المستخدمة.",
      "تشمل المخرجات التصاميم الإبداعية، والمنشورات، والقصص، والفيديوهات القصيرة، والريلز، والرسوم التوضيحية، والإنفوجرافيك، والمحتوى التفاعلي.",
      "وللمشروعات التي تحتاج إلى إنتاج متخصص، يمكن الاستفادة من قدرات مختبر الإبداع في تطوير الفيديو والموشن جرافيك والوسائط المتعددة.",
    ],
    image: image("production"),
  },
  {
    title: "إدارة الحسابات والنشر",
    paragraphs: [
      "نتولى تنظيم النشر وإدارة المحتوى على حساباتك وفق خطة متفق عليها، مع الحفاظ على هوية علامتك التجارية وطريقة تواصلها مع الجمهور.",
      "نعمل بجدول واضح للمحتوى، ومراحل محددة للمراجعة والاعتماد، وصلاحيات مناسبة لإدارة الحسابات.",
      "وتظل حسابات المؤسسة وملكيتها تحت سيطرتها، مع تنظيم صلاحيات الوصول بما يتناسب مع نطاق الخدمة.",
    ],
    image: image("publishing"),
  },
  {
    title: "إدارة التفاعل والمجتمع الرقمي",
    paragraphs: [
      "تمثل التعليقات والرسائل والتفاعلات فرصة لفهم جمهورك والتواصل معه بصورة مباشرة.",
      "نساعدك على إدارة هذه التفاعلات، وإعداد أسلوب مناسب للردود، وتنظيم متابعة الاستفسارات وتحويل الطلبات التجارية أو شكاوى العملاء إلى الفرق المسؤولة داخل مؤسستك.",
      "وتُحدد أوقات المتابعة ونطاق الردود وآليات التصعيد ضمن اتفاق العمل، بما يضمن وضوح المسؤوليات.",
    ],
    image: image("community"),
  },
  {
    title: "متابعة السمعة الرقمية وتحليل الجمهور",
    paragraphs: [
      "نتابع ما يُنشر عن علامتك التجارية والموضوعات المرتبطة بنشاطك، باستخدام المعلومات المتاحة وأدوات المتابعة المناسبة.",
      "يساعد ذلك على التعرف على اهتمامات الجمهور، وفهم طبيعة التفاعل، ورصد الملاحظات المتكررة والموضوعات التي تستحق اهتمام المؤسسة.",
      "ونستخدم هذه المعرفة لتطوير المحتوى وتحسين طريقة التواصل مع الجمهور.",
    ],
    image: image("reputation"),
  },
  {
    title: "تحليل الأداء وتطوير المحتوى",
    paragraphs: [
      "لا يقتصر تقييم المحتوى على عدد الإعجابات أو المتابعين.",
      "نراجع مؤشرات مثل الوصول والمشاهدات والتفاعل ونمو الجمهور والزيارات والطلبات القابلة للتتبع، بحسب أهداف الحسابات والبيانات المتاحة.",
      "ونقدم تقارير تساعدك على معرفة المحتوى الذي يلقى اهتمام جمهورك، والموضوعات التي تحتاج إلى تطوير، والفرص التي يمكن الاستفادة منها في الفترات المقبلة.",
    ],
    image: image("analytics"),
  },
];

/* Figma 4977:9002, in reading order (the first sits on the right). */
const PLATFORMS: readonly Info[] = [
  { icon: icon("social-message"), title: "إنستجرام", text: "المحتوى البصري والريلز والقصص." },
  { icon: "/icons/academies/users-sector.svg", title: "فيسبوك", text: "الصفحات والمحتوى والتفاعل المجتمعي." },
  { icon: "/icons/academies/briefcase.svg", title: "لينكدإن", text: "الحضور المهني والمحتوى المؤسسي والتواصل بين الشركات." },
  { icon: icon("social-tiktok"), title: "تيك توك", text: "الفيديوهات القصيرة والمحتوى الإبداعي." },
  { icon: icon("social-megaphone"), title: "سناب شات", text: "القصص والمحتوى المرئي والتغطيات." },
  { icon: icon("social-message"), title: "إكس", text: "الأخبار والتحديثات والتواصل المباشر." },
  { icon: "/icons/academies/layers.svg", title: "يوتيوب", text: "محتوى الفيديو وإدارة القنوات." },
];

/* Figma 4977:9020. */
const INDUSTRIES: readonly Info[] = [
  {
    icon: icon("hub-sector-business"),
    title: "الشركات والمؤسسات",
    text: "محتوى يعرض الخبرات والخدمات والمشروعات والأخبار المؤسسية، ويساعد على تطوير التواصل مع العملاء والشركاء وأصحاب القرار.",
  },
  {
    icon: icon("hub-sector-ecommerce"),
    title: "التجارة الإلكترونية والتجزئة",
    text: "محتوى يقدم المنتجات والعروض وتجارب الاستخدام، ويدعم التواصل مع المتسوقين والعملاء الحاليين.",
  },
  {
    icon: icon("hub-sector-education"),
    title: "التعليم والتدريب",
    text: "محتوى للتعريف بالبرامج والدورات، ونشر المعرفة، وتغطية الأنشطة، والتواصل مع المتعلمين والجهات التعليمية.",
  },
  {
    icon: icon("hub-sector-tourism"),
    title: "السياحة والضيافة",
    text: "محتوى بصري يقدم الوجهات والتجارب والأنشطة والخدمات السياحية، ويراعي طبيعة الجمهور والمواسم.",
  },
  {
    icon: icon("hub-sector-industry"),
    title: "الصناعة والخدمات المتخصصة",
    text: "محتوى يشرح المنتجات والعمليات والقدرات الفنية، ويعرض المشروعات والتطبيقات العملية بلغة مناسبة للجمهور المهني.",
  },
  {
    icon: icon("hub-sector-community"),
    title: "المؤسسات والمبادرات المجتمعية",
    text: "محتوى للتوعية، وتغطية الفعاليات، وإبراز المبادرات والأنشطة والإنجازات، وتطوير التواصل مع المستفيدين والأعضاء والشركاء.",
  },
];

/* Figma 4977:9031, steps 01 to 04. */
const STEPS = [
  {
    icon: { src: icon("social-users-26"), size: 26 },
    title: "فهم علامتك التجارية",
    text: "نتعرف على نشاطك وجمهورك وأهدافك وحساباتك الحالية، ونراجع المحتوى المنشور وفرص تطويره.",
  },
  {
    icon: { src: icon("sparkles"), size: 26 },
    title: "التخطيط والإنتاج",
    text: "نضع استراتيجية المحتوى والتقويم التحريري، ونجهز النصوص والتصاميم والمواد المطلوبة وفق أولوياتك.",
  },
  {
    icon: { src: icon("social-calendar-check-26"), size: 26 },
    title: "المراجعة والنشر",
    text: "نقدم المحتوى للاعتماد، ثم ننشره وفق المواعيد المتفق عليها، مع تنظيم التفاعل والمتابعة حسب نطاق العمل.",
  },
  {
    icon: { src: icon("social-trending-26"), size: 26 },
    title: "التحليل والتطوير",
    text: "نراجع النتائج معك، ونوضح أداء المحتوى، ونستخدم البيانات والملاحظات لتحسين الخطة التالية.",
  },
] as const;

/* Figma 4984:9733. */
const CONNECTED: readonly Linked[] = [
  {
    icon: icon("social-layers-20"),
    title: "استراتيجية العلامة التجارية والهوية",
    text: "لتطوير شخصية العلامة ورسائلها وأسلوبها البصري.",
  },
  {
    icon: icon("social-sparkles-20"),
    title: "التصميم والإنتاج الإعلامي",
    text: "لإنتاج الفيديو والرسوم والمواد الإبداعية المتخصصة.",
  },
  {
    icon: icon("social-book-20"),
    title: "التسويق بالمحتوى والعلاقات العامة الرقمية",
    text: "لتطوير المحتوى المؤسسي والتغطيات والأخبار والرسائل التسويقية.",
  },
  {
    icon: icon("social-trending-20"),
    title: "إدارة الحملات الإعلانية والتسويق بالأداء",
    text: "خدمة مستقلة للحملات المدفوعة، يمكن إضافتها إلى خطة إدارة حساباتك عند الحاجة.",
  },
  {
    icon: icon("social-chart-20"),
    title: "أتمتة التسويق وتحليل البيانات",
    text: "لتنظيم المتابعة وقياس النتائج وربط البيانات بالأنظمة المناسبة.",
  },
];

/* Figma 4977:9099, cards 01 to 04. */
const MODELS: readonly Model[] = [
  {
    number: "01",
    icon: icon("social-calendar-24"),
    title: "إدارة شهرية للحسابات",
    text: "خدمة مستمرة تشمل التخطيط والمحتوى والنشر والمتابعة والتقارير، وفق عدد الحسابات والمخرجات المتفق عليها.",
    image: image("publishing"),
    alt: "مديرة محتوى تصوّر منشورًا على هاتفها أمام حلقة إضاءة",
  },
  {
    number: "02",
    icon: icon("social-shield-check-24"),
    title: "استراتيجية ومراجعة الحسابات",
    text: "تقييم الحضور الحالي وتطوير استراتيجية المحتوى والقنوات، مع تقديم خطة يستطيع فريقك تنفيذها داخليًا.",
    image: image("engagement-review"),
    alt: "فريق يراجع تقرير أداء الحسابات حول طاولة اجتماعات",
  },
  {
    number: "03",
    icon: icon("social-sparkles-24"),
    title: "إنتاج المحتوى فقط",
    text: "إنتاج النصوص والتصاميم والفيديوهات المطلوبة، وتسليمها لفريقك لاستخدامها عبر حساباته.",
    image: image("production"),
    alt: "تصوير حوار مرئي داخل استوديو بكاميرا احترافية",
  },
  {
    number: "04",
    icon: icon("social-layers-24"),
    title: "إدارة تسويقية متكاملة",
    text: "الجمع بين إدارة الحسابات وخدمات المحتوى والإنتاج الإعلامي والخدمات التسويقية المكملة، ضمن نطاق عمل مشترك.",
    image: image("engagement-integrated"),
    alt: "فريق تسويق يناقش الخطة أمام شاشة",
  },
];

/* Figma 4977:9190. */
const FAQ = [
  {
    question: "هل يمكنكم إدارة حساباتنا الحالية؟",
    answer: "نعم، يمكننا مراجعة حساباتك الحالية وإدارتها باستخدام الصلاحيات المناسبة، مع احتفاظ مؤسستك بملكية الحسابات.",
  },
  {
    question: "هل يجب أن نتواجد على جميع المنصات؟",
    answer: "لا. يعتمد اختيار المنصات على جمهورك وأهدافك والموارد المتاحة لإدارة المحتوى والتفاعل بصورة مناسبة.",
  },
  {
    question: "هل تشمل الخدمة التصاميم والفيديوهات؟",
    answer: "يمكن تضمين التصميم وإنتاج المحتوى ضمن الخدمة، مع تحديد نوع المخرجات وعددها في عرض العمل.",
  },
  {
    question: "هل تتولون الرد على الرسائل والتعليقات؟",
    answer: "يمكن تضمين إدارة التفاعل والردود، مع الاتفاق على ساعات المتابعة وأنواع الاستفسارات التي يتولاها فريقنا وآلية تحويل الطلبات إلى فريقك.",
  },
  {
    question: "هل يمكننا مراجعة المحتوى قبل النشر؟",
    answer: "نعم، نحدد آلية للمراجعة والاعتماد تتناسب مع طريقة عمل مؤسستك.",
  },
  {
    question: "هل تشمل إدارة الحسابات الإعلانات المدفوعة؟",
    answer: "إدارة الإعلانات المدفوعة خدمة مستقلة يمكن إضافتها إلى نطاق التعاون، مع تحديد ميزانيتها وأتعاب إدارتها بصورة منفصلة.",
  },
  {
    question: "كيف يتم قياس نجاح إدارة الحسابات؟",
    answer: "نحدد مؤشرات مناسبة لأهدافك، ونتابع النتائج باستخدام بيانات المنصات وأدوات القياس المتاحة، مع تقديم تقارير وتوصيات دورية.",
  },
] as const;

/** Figma 4977:8988 — إدارة منصات التواصل الاجتماعي (desktop 1440). */
export default function SocialMediaPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${creativePage} ${tajawal.variable}`}>
        <CreativeNav current="social" />

        <SectorBanner
          id="social-banner-heading"
          className={social.banner}
          image="/images/creative/social-media/banner.jpg"
          focus="50% 0%"
          title="إدارة منصات التواصل الاجتماعي"
          text={
            <p>
              <strong>محتوى يعكس علامتك التجارية، وتواصل يبني علاقتك بجمهورك.</strong>
              {" "}
              تساعدك ترانسفورمكس على إدارة حضور علامتك التجارية عبر منصات التواصل الاجتماعي، من تطوير استراتيجية المحتوى وإنتاج المواد الإبداعية إلى النشر وإدارة التفاعل وتحليل الأداء. سواء كنت تطلق علامة جديدة، أو ترغب في تطوير حساباتك الحالية، أو تحتاج إلى فريق يدير التواصل مع جمهورك، نقدم خدمات تتناسب مع طبيعة أعمالك وأهدافك التسويقية. نجمع بين التخطيط والتحرير والتصميم وفهم سلوك الجمهور، لتقديم محتوى يعبر عن علامتك التجارية ويمنح عملاءك أسبابًا حقيقية للمتابعة والتفاعل.
            </p>
          }
          actions={[
            { label: "ناقش إدارة حساباتك", tone: "inverse" },
            { label: "استكشف أعمالنا", href: "/works", tone: "outlineInverse" },
          ]}
        />

        <SocialSection compact labelledBy="social-capabilities-heading">
          <CreativeIntro id="social-capabilities-heading" title="خدمات إدارة منصات التواصل الاجتماعي" />
          <SocialSticky label="خدمات إدارة منصات التواصل الاجتماعي" items={CAPABILITIES} />
        </SocialSection>

        <SocialSection labelledBy="social-platforms-heading">
          <CreativeIntro
            id="social-platforms-heading"
            title="المنصات التي نديرها"
            text="نساعدك على إدارة حساباتك على المنصات التي تناسب جمهورك وطبيعة نشاطك."
          />
          <InfoCards items={PLATFORMS} columns={4} />
        </SocialSection>

        <SocialSection labelledBy="social-industries-heading">
          <CreativeIntro id="social-industries-heading" title="محتوى يناسب طبيعة أعمالك" />
          <InfoCards items={INDUSTRIES} columns={3} />
          <div className={social.sectionAction}>
            <AcademyAction action={{ label: "استكشف القطاعات التي نخدمها", href: "/sectors", tone: "outline" }} />
          </div>
        </SocialSection>

        <SocialSection band="subtle" labelledBy="social-approach-heading">
          <CreativeIntro id="social-approach-heading" title="كيف نعمل معك؟" blue />
          <ProcessCards steps={STEPS} />
        </SocialSection>

        <SocialSection labelledBy="social-connected-heading">
          <Connected
            id="social-connected-heading"
            title="خدمات إبداعية وتسويقية متكاملة"
            lead="يمكن أن تتكامل إدارة حسابات التواصل الاجتماعي مع خدمات أخرى تقدمها ترانسفورمكس، وفق احتياجات مشروعك."
            items={CONNECTED}
            image={image("connected")}
            alt="مواد هوية بصرية مطبوعة تضم بطاقات وأظرفًا وعينات ألوان بدرجات الأزرق"
            action={{ label: "استكشف خدمات الإبداع والتسويق الرقمي", href: creativeHref("overview") }}
          />
        </SocialSection>

        <SocialSection band="card" labelledBy="social-models-heading">
          <CreativeIntro id="social-models-heading" title="نماذج التعاون" />
          <Engagement items={MODELS} />
        </SocialSection>

        <SocialSection labelledBy="social-faq-heading">
          <SectionIntro id="social-faq-heading" title="الأسئلة الشائعة" start />
          <AcademyFaq items={FAQ} />
        </SocialSection>

        <section className={social.closingSection} aria-labelledby="social-closing-heading">
          <RequestClosing
            id="social-closing-heading"
            title="طوّر حضور علامتك التجارية"
            paragraphs={[
              "سواء كنت تبدأ حضورك على منصات التواصل الاجتماعي، أو تطور حسابات قائمة، أو تحتاج إلى فريق متخصص في إدارة المحتوى والتواصل مع الجمهور، نساعدك على تحديد الخدمات المناسبة لأعمالك.",
              "شاركنا حساباتك الحالية وأهدافك، لنتعرف على احتياجاتك ونناقش نطاق التعاون المناسب.",
            ]}
            actionLabel="اطلب مراجعة حضورك الرقمي"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
