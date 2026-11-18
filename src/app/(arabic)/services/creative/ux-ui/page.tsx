import type { Metadata } from "next";
import { academies, ClosingCard, SectionIntro, Split } from "@/components/academies/AcademiesKit";
import { AcademyFaq } from "@/components/academies/AcademyFaq";
import {
  CreativeIntro,
  CreativeNav,
  creativePage,
  ProcessCards,
  SectorBanner,
  StickyScrollReveal,
  WorkGrid,
} from "@/components/creative/CreativeKit";
import {
  CapabilityCards,
  Callout,
  EngagementCards,
  ExperienceGrid,
} from "@/components/creative/ux-ui/UxUiParts";
import styles from "@/components/creative/ux-ui/UxUi.module.css";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "تصميم تجربة المستخدم والواجهات الرقمية | Transformix",
  description:
    "تصميم التجربة الرقمية قرار يؤثر في سهولة استخدام المنتج، وكفاءة إجراءاته، وقدرته على خدمة العملاء والموظفين. تقدم ترانسفورمكس تصميمًا يجمع الفهم الدقيق للأعمال مع خبرة تجربة المستخدم وجمال الواجهات، لتصبح المعلومات والخدمات والوظائف أكثر وضوحًا واستجابة لاحتياجات مستخدميها.",
};

/* Figma 4845:7043, in reading order (01 on the start edge). */
const PILLARS = [
  { icon: "/icons/creative/pillar-briefcase.svg", title: "أهداف المؤسسة", chips: ["المنتج", "العمليات", "الأولويات"] },
  { icon: "/icons/creative/pillar-users.svg", title: "احتياجات المستخدم", chips: ["الأبحاث", "الرحلات", "سهولة الاستخدام"] },
  { icon: "/icons/creative/pillar-layers.svg", title: "تصميم قابل للتنفيذ", chips: ["الواجهات", "النماذج", "المكونات"] },
] as const;

/* Figma 4939:8940. The artboard draws one photo on the sticky card (item 01's);
   the other items have none of their own, so they repeat it. */
const SERVICES = [
  {
    title: "استراتيجية تجربة المستخدم",
    text: "تحدد استراتيجية تجربة المستخدم الدور الذي يؤديه المنتج في أعمال المؤسسة، وما يحتاج إليه كل مستخدم لإنجاز مهامه بوضوح. نراجع أهداف المنتج وأدوار المستخدمين والعمليات الأساسية، ونضع مبادئ التصميم وأولويات التطوير التي تستند إليها القرارات اللاحقة.",
  },
  {
    title: "تصميم الواجهات الرقمية",
    text: "تصميم واجهات احترافية للمواقع والتطبيقات ولوحات التحكم والمنصات المؤسسية، مع تنظيم العناصر والمعلومات والحالات التفاعلية بما ينسجم مع هوية المنتج ووظائفه. تراعي التصميمات الأجهزة المختلفة وطبيعة الاستخدام والصلاحيات، وتوفر تفاصيل كافية للانتقال إلى التنفيذ التقني.",
    outputs: "تصميمات واجهات متجاوبة، ومكونات وحالات تفاعلية، ومواصفات تسليم.",
  },
  {
    title: "رحلات المستخدم وهندسة المعلومات",
    text: "تنظيم الخدمات والمحتوى والوظائف في مسارات يسهل فهمها واستخدامها، بما يشمل التسجيل والشراء والحجز والموافقات وإدارة الطلبات. ونعالج تجارب المنتجات متعددة الأدوار، حيث تختلف احتياجات العميل والموظف والمشرف والإدارة.",
    outputs: "خرائط رحلة المستخدم، وهيكل المحتوى والتنقل، وتدفقات العمليات.",
  },
  {
    title: "النماذج الأولية والتصميم التفاعلي",
    text: "نماذج قابلة للتجربة تكشف مبكرًا شكل التفاعل ومسارات الاستخدام قبل تخصيص موارد التطوير. تتيح هذه النماذج لأصحاب القرار والفرق التقنية مناقشة الخيارات والتأكد من وضوح المتطلبات واستيعاب الملاحظات.",
    outputs: "مخططات أولية، ونماذج تفاعلية قابلة للنقر، وسيناريوهات استخدام.",
  },
  {
    title: "تقييم تجربة المستخدم واختبار سهولة الاستخدام",
    text: "تقييم تجربة المواقع والتطبيقات القائمة للكشف عن العقبات في التنقل والبحث وإتمام الإجراءات، مع مراجعة الملاحظات والبيانات المتاحة وتنفيذ اختبارات استخدام عند الاتفاق عليها. تُرتّب فرص التطوير بحسب أهمية المهمة وتأثيرها في التجربة.",
    outputs: "تقرير تقييم، وملاحظات موثقة، وأولويات تحسين قابلة للتنفيذ.",
  },
  {
    title: "أبحاث المستخدمين واكتشاف المتطلبات",
    text: "دراسة الجمهور وسياقات الاستخدام والاحتياجات الفعلية عبر مقابلات واستبيانات وملاحظة الاستخدام وتحليل المنتجات المشابهة بحسب نطاق المشروع. تتحول نتائج الأبحاث إلى قرارات تصميم محددة، بدل الاعتماد على الانطباعات والتفضيلات الشخصية وحدها.",
    outputs: "ملخص أبحاث، وشرائح مستخدمين عند الحاجة، ومتطلبات وفرص تصميم.",
  },
  {
    title: "أنظمة التصميم والمكونات الرقمية",
    text: "إنشاء مكتبات مكونات وقواعد تصميم تسهّل تطوير المنتجات الرقمية والمحافظة على وضوح الواجهات عبر الشاشات والفرق. تشمل المكونات والألوان والخطوط والحالات التفاعلية وإرشادات استخدامها، مع مراعاة متطلبات التسليم لفرق التطوير.",
    outputs: "مكتبة مكونات، ودليل تصميم، وقواعد تطبيق الواجهات.",
  },
  {
    title: "التصميم متعدد اللغات وإمكانية الوصول",
    text: "تصميم واجهات تراعي اتجاه العربية وخصوصية التجربة متعددة اللغات، مع الاهتمام بوضوح النصوص والتباين والتنقل واستخدام النماذج. ويُحدد مستوى متطلبات إمكانية الوصول واختباراتها وفق طبيعة المنتج ونطاق التعاقد.",
    outputs: "أنماط واجهات متعددة اللغات، وتوصيات إتاحة، ومراجعات محددة النطاق.",
  },
].map((item, index) => ({
  title: item.title,
  text: "outputs" in item ? [item.text, `المخرجات المحتملة: ${item.outputs}`] : item.text,
  image: `/images/creative/ux-ui/sticky-0${index + 1}.jpg`,
}));

/* Figma 4846:7040, in reading order (row by row from the start edge). */
const EXPERIENCES = [
  { icon: { src: "/icons/creative/ux-apps.svg", size: 26 }, title: "التطبيقات الرقمية", text: "تجارب مناسبة للهواتف والأجهزة اللوحية ومتطلبات التفاعل اليومية." },
  { icon: { src: "/icons/creative/ux-website.svg", size: 26 }, title: "المواقع المؤسسية والتجارية", text: "صفحات واضحة تعرض الخدمات وتيسر البحث عن المعلومات والتواصل." },
  { icon: { src: "/icons/creative/ux-dashboard.svg", size: 26 }, title: "أنظمة المؤسسات ولوحات التحكم", text: "واجهات العمليات والموافقات والبيانات والأدوار والصلاحيات." },
  { icon: { src: "/icons/creative/ux-cart.svg", size: 26 }, title: "التجارة الإلكترونية والأسواق الرقمية", text: "رحلات البحث والمقارنة والشراء وإدارة الطلبات للمستخدمين والبائعين." },
  { icon: { src: "/icons/creative/ux-booking.svg", size: 26 }, title: "منصات الحجز والخدمات", text: "تجارب الاستكشاف والحجز والدفع والخدمات الذاتية." },
  { icon: { src: "/icons/academies/graduation.svg", size: 26 }, title: "التعليم والتدريب", text: "تجارب المتعلمين والمدربين والإداريين والمحتوى والتقييمات." },
] as const;

/* Figma 4846:7186. */
const STEPS = [
  { icon: { src: "/icons/academies/users.svg", size: 28 }, title: "فهم متطلبات المشروع", text: "مراجعة أهداف الأعمال وأدوار المستخدمين والعمليات والقيود التقنية." },
  { icon: { src: "/icons/academies/layers.svg", size: 26 }, title: "بناء تجربة الاستخدام", text: "تنظيم المعلومات والمسارات والمخططات والنماذج الأولية." },
  { icon: { src: "/icons/creative/sparkles.svg", size: 26 }, title: "تصميم الواجهات والتفاعلات", text: "تطوير الشاشات والمكونات والحالات المختلفة وربطها بهوية المنتج." },
  { icon: { src: "/icons/creative/ux-shield-check.svg", size: 26 }, title: "المراجعة والاختبار والتسليم", text: "التحقق من الاستخدام وفق النطاق، واعتماد ملفات ومواصفات تسليم فرق التطوير." },
] as const;

/* Figma 4846:7237, in reading order. */
const ENGAGEMENTS = [
  {
    icon: "/icons/creative/repeat.svg",
    title: "إعادة تصميم منتج قائم",
    text: "مراجعة التجربة وتطوير المسارات والواجهات وفق أولويات متفق عليها.",
    image: "/images/creative/ux-ui/collab-redesign.jpg",
    alt: "يد على لوحة مفاتيح أمام شاشات تعرض لوحات بيانات",
  },
  {
    icon: "/icons/creative/sparkles.svg",
    title: "تصميم منتج جديد",
    text: "تحديد تجربة المنتج، والواجهات، والنماذج التفاعلية، والملفات المعتمدة.",
    image: "/images/creative/ux-ui/collab-new.jpg",
    alt: "جهاز لوحي يعرض واجهة منتج رقمي بجوار مجسم مضيء",
  },
  {
    icon: "/icons/academies/users.svg",
    title: "دعم فرق المنتجات",
    text: "تنفيذ مهام تصميم متخصصة بالتعاون مع فرق المؤسسة أو مطوريها.",
    image: "/images/creative/ux-ui/integration.jpg",
    alt: "مصمم ومطور يراجعان شاشة برمجية معًا",
  },
  {
    icon: "/icons/creative/shield-check-24.svg",
    title: "تقييم تجربة المستخدم",
    text: "تقرير متخصص يوضح فرص التحسين وأهميتها والتوصيات المناسبة.",
    image: "/images/creative/ux-ui/collab-eval.jpg",
    alt: "متخصص يشير إلى بيانات على شاشة حاسوب",
  },
] as const;

/* Figma 4846:7333: the same four works as the hub, in reading order. */
const WORKS = [
  { title: "CHE ACADEMY", href: "/works", image: "/images/creative/works/che-academy.jpg", alt: "موقع أكاديمية CHE على جهاز لوحي", height: 415 },
  { title: "MY HORIZON", href: "/works", image: "/images/creative/works/my-horizon.jpg", alt: "هوية أكاديمية MY HORIZON للتنس والبادل", height: 415 },
  /* Unfilled purple placeholder in the artboard: the kit's blue video block. */
  { title: "انتاج و صناعة الفديوهات", href: "/works", alt: "", height: 394, video: true },
  { title: "GUIDE", href: "/works", image: "/images/creative/works/guide.jpg", alt: "موقع وتطبيق دليل Guide للسياحة", height: 394 },
] as const;

/* Questions 2 to 5 are drawn collapsed, so their answers are not in the artboard. */
const QUESTIONS = [
  {
    question: "ما الفرق بين تجربة المستخدم وتصميم الواجهات؟",
    answer:
      "تصميم تجربة المستخدم يحدد منطق المنتج وطريقة استخدامه وتنظيم مهامه ومعلوماته، بينما يهتم تصميم الواجهات بالعناصر المرئية والتفاعلية التي يتعامل معها المستخدم.",
  },
  {
    question: "هل يمكن التعاقد على التصميم دون تطوير برمجي؟",
    answer:
      "نعم، يمكن التعاقد على التصميم كخدمة مستقلة، وتسليم ملفاته ومواصفاته إلى فريقك أو إلى مطورين آخرين، أو إضافة التطوير البرمجي ضمن مشروع آخر محدد النطاق.",
  },
  {
    question: "هل يمكن تحسين منتج قائم بدل إعادة تصميمه بالكامل؟",
    answer:
      "نعم، يبدأ العمل عادة بتقييم التجربة القائمة وتحديد العقبات الأهم، ثم تطوير المسارات والواجهات التي تستحق التحسين وفق أولويات متفق عليها، دون الحاجة إلى إعادة التصميم كاملًا.",
  },
  {
    question: "هل تدعمون العربية والتصميم متعدد اللغات؟",
    answer:
      "نعم، نصمم واجهات تراعي اتجاه العربية وخصوصية التجربة متعددة اللغات، مع الاهتمام بوضوح النصوص والتباين والتنقل واستخدام النماذج.",
  },
  {
    question: "ما مخرجات مشروع التصميم؟",
    answer:
      "تختلف المخرجات بحسب النطاق، وقد تشمل رحلات المستخدم وهيكل المحتوى، ومخططات ونماذج تفاعلية، وتصميمات واجهات متجاوبة، ومكتبة مكونات، وتقرير تقييم، ومواصفات تسليم لفرق التطوير.",
  },
];

/** Figma 4843:6923 — تصميم تجربة المستخدم والواجهات الرقمية (desktop 1440). */
export default function UxUiPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${creativePage} ${tajawal.variable}`}>
        <CreativeNav current="uiux" />

        <SectorBanner
          id="uiux-banner-heading"
          image="/images/creative/ux-ui/banner.jpg"
          focus="50% 28%"
          className={styles.banner}
          title="تصميم تجربة المستخدم والواجهات الرقمية"
          text="تصميم التجربة الرقمية قرار يؤثر في سهولة استخدام المنتج، وكفاءة إجراءاته، وقدرته على خدمة العملاء والموظفين. تقدم ترانسفورمكس تصميمًا يجمع الفهم الدقيق للأعمال مع خبرة تجربة المستخدم وجمال الواجهات، لتصبح المعلومات والخدمات والوظائف أكثر وضوحًا واستجابة لاحتياجات مستخدميها."
          actions={[
            { label: "ناقش مشروع التصميم", tone: "inverse" },
            { label: "اطلب تقييم تجربة المستخدم", tone: "outlineInverse" },
          ]}
        />

        <section className={academies.section} aria-labelledby="uiux-overview-heading">
          <Split
            photo={{
              src: "/images/creative/ux-ui/overview.jpg",
              alt: "مدير يعرض لوحة مؤشرات أداء رقمية على شاشة كبيرة",
              height: 532,
              shade: 0,
              focus: "55% 50%",
            }}
            far
          >
            <h2 id="uiux-overview-heading" className={styles.subtitle}>
              تجارب رقمية ترتقي بجودة المنتج، وتمنح كل تفاعل قيمة واضحة.
            </h2>
            <p className={academies.lead}>
              تشمل خبراتنا المواقع والتطبيقات والمنصات وأنظمة الأعمال ولوحات التحكم، مع الاهتمام بالتجارب العربية ومتعددة اللغات، وإمكانية الوصول، والتكامل المدروس مع فرق هندسة البرمجيات.
            </p>
            <p className={academies.lead}>
              <span className={styles.valueLabel}>قيمة الخدمة</span> تحسين وضوح رحلة الاستخدام، وتحديد متطلبات المنتج بدقة أكبر، ودعم التعاون بين أصحاب القرار وفرق التصميم والتطوير، مع إمكانية تقييم الخيارات قبل تنفيذها برمجيًا.
            </p>
          </Split>
        </section>

        <section className={academies.section} aria-labelledby="uiux-framework-heading">
          <Reveal className={styles.frameworkHead}>
            <h2 id="uiux-framework-heading" className={styles.frameworkTitle}>
              كيف تتكامل قدرات تصميم التجربة؟
            </h2>
            <p className={styles.frameworkLead}>منظومة واحدة تجمع قيمة الأعمال وتجربة المستخدم وجاهزية التنفيذ</p>
          </Reveal>
          <CapabilityCards items={PILLARS} />
        </section>

        <section className={academies.section} aria-labelledby="uiux-capabilities-heading">
          <CreativeIntro
            id="uiux-capabilities-heading"
            title="قدراتنا في تصميم التجارب الرقمية"
            text="نقدم خدمات تصميم مستقلة أو مترابطة، ويحدد نطاق المشروع ما يلزمه من بحث وتحليل وتصميم واختبار. يأتي ترتيب العرض التالي بحسب وضوح القيمة التجارية للعميل، وليس بحسب التسلسل الزمني للتنفيذ."
          />
          <Reveal>
            <StickyScrollReveal label="قدراتنا في تصميم التجارب الرقمية" items={SERVICES} />
          </Reveal>
        </section>

        <section className={academies.section} aria-labelledby="uiux-experiences-heading">
          <CreativeIntro id="uiux-experiences-heading" title="تجارب رقمية لمنتجات وأعمال متنوعة" />
          <ExperienceGrid items={EXPERIENCES} />
        </section>

        <section className={academies.section} aria-labelledby="uiux-method-heading">
          <CreativeIntro id="uiux-method-heading" title="منهجية العمل" blue />
          <ProcessCards steps={STEPS} />
        </section>

        <section className={academies.section} aria-labelledby="uiux-integration-heading">
          <Split
            photo={{
              src: "/images/creative/ux-ui/integration.jpg",
              alt: "مصمم ومطور يراجعان شاشة برمجية معًا",
              height: 400,
              shade: 0,
            }}
            far
          >
            <h2 id="uiux-integration-heading" className={academies.title}>
              التصميم والهندسة التقنية
            </h2>
            <p className={academies.leadDark}>
              تتيح خبرات ترانسفورمكس في البرمجيات والأنظمة المؤسسية تعاونًا عمليًا بين فرق التصميم والتطوير، مع مراعاة متطلبات التنفيذ أثناء صياغة التجربة. يمكن التعاقد على التصميم كخدمة مستقلة، أو إضافة التطوير البرمجي ضمن مشروع آخر محدد النطاق.
            </p>
            <Callout label="تميّز مهم">
              نهتم بتجارب الأنظمة المعقدة والمنتجات متعددة الأدوار، ولا يقتصر نطاقنا على المواقع التسويقية والصفحات التعريفية.
            </Callout>
          </Split>
        </section>

        <section className={`${academies.section} ${styles.band}`} aria-labelledby="uiux-engagement-heading">
          <CreativeIntro id="uiux-engagement-heading" title="نماذج التعاون والمخرجات" />
          <EngagementCards items={ENGAGEMENTS} />
        </section>

        <section className={academies.section} aria-labelledby="uiux-works-heading">
          <CreativeIntro
            id="uiux-works-heading"
            title="أعمال وتجارب قابلة للاستكشاف"
            text="يعرض معرض الأعمال واجهات حقيقية لمشروعات ترانسفورمكس المتاحة للنشر، مع توضيح نطاق التصميم والنتائج التي يمكن توثيقها."
            blue
          />
          <WorkGrid items={WORKS} />
        </section>

        <section className={academies.section} aria-labelledby="uiux-faq-heading">
          <SectionIntro id="uiux-faq-heading" title="الأسئلة الشائعة" start />
          <Reveal>
            <AcademyFaq items={QUESTIONS} />
          </Reveal>
        </section>

        <ClosingCard
          id="uiux-closing-heading"
          title="تجربة رقمية تستحق أن تُصمَّم بعناية"
          text="شاركنا فكرة المنتج أو رابط التجربة الحالية، لنناقش نطاق التصميم والقدرات المطلوبة والخيارات المناسبة لفريقك ومستخدميك."
          actions={[{ label: "ناقش مشروع التصميم" }, { label: "اطلب تقييم تجربة المستخدم", tone: "outline" }]}
        />
      </main>
      <Footer />
    </>
  );
}
