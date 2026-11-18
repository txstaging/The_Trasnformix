import type { Metadata } from "next";
import { academies } from "@/components/academies/AcademiesKit";
import { AcademyAction } from "@/components/academies/AcademyAction";
import { AcademyFaq } from "@/components/academies/AcademyFaq";
import {
  CreativeIntro,
  CreativeNav,
  creativePage,
  ProcessCards,
  SectorBanner,
  StickyScrollReveal,
  WorkGrid,
  type StickyItem,
} from "@/components/creative/CreativeKit";
import { ChannelsVisual, hub, HubClosing, LabsSplit, SectorCards } from "@/components/creative/hub/HubKit";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { ServiceRequestForm } from "@/components/services/ServiceRequestForm";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { creativeHref } from "@/lib/creativeNav";
import { tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "الإبداع والتسويق الرقمي | Transformix",
  description:
    "نجمع في ترانسفورمكس بين التفكير الإبداعي والخبرة التسويقية وفهم سلوك الجمهور، لتطوير حضور رقمي يعكس شخصية علامتك التجارية ويخدم أهداف أعمالك، من الهوية والحملات الإعلانية إلى المحتوى والإنتاج وتجربة المستخدم.",
};

/* Figma 4854:7820 — الإبداع والتسويق عبر القنوات الرقمية (desktop 1440). */

const SERVICES: readonly StickyItem[] = [
  {
    title: "استراتيجية العلامة التجارية والهوية",
    text: "بناء استراتيجية واضحة للعلامة التجارية، وتطوير شخصيتها ورسائلها وهويتها البصرية، مع إعداد التطبيقات والأدلة التي تساعد على تقديمها بصورة متسقة.",
    image: "/images/creative/sticky/01.jpg",
    action: { label: "استكشف خدمات الهوية التجارية", href: creativeHref("brand") },
  },
  {
    title: "الحملات الإعلانية والتسويق بالأداء",
    text: "تخطيط الحملات الإعلانية المدفوعة وإدارتها وفق الجمهور المستهدف وأهداف النشاط وميزانيته، مع متابعة مؤشرات الأداء وتحسين القرارات الإعلانية.",
    image: "/images/creative/sticky/02.jpg",
    action: { label: "استكشف الحملات الإعلانية", href: creativeHref("marketing") },
  },
  {
    title: "إدارة منصات التواصل الاجتماعي",
    text: "تطوير خطط المحتوى وإدارة النشر والتفاعل ومتابعة الحسابات، بما يحافظ على صوت العلامة التجارية ويوثق علاقتها بجمهورها. وتبقى إدارة الإعلانات المدفوعة خدمة مستقلة.",
    image: "/images/creative/sticky/03.jpg",
    action: { label: "استكشف إدارة التواصل الاجتماعي", href: creativeHref("social") },
  },
  {
    title: "تحسين الظهور والبحث الرقمي",
    text: "تطوير حضور المواقع والتطبيقات عبر تحسين محركات البحث، ووضوح المحتوى في بيئات البحث المدعوم بالذكاء الاصطناعي، وتحسين صفحات متاجر التطبيقات. يشمل النطاق أيضًا تحسين ملف النشاط التجاري على جوجل والظهور المحلي وإدارة التقييمات وفق سياسات المنصة.",
    image: "/images/creative/sticky/04.jpg",
    action: { label: "استكشف تحسين الظهور الرقمي", href: creativeHref("seo") },
  },
  {
    title: "التسويق بالمحتوى والعلاقات العامة الرقمية",
    text: "تطوير الاستراتيجية التحريرية والمحتوى المؤسسي والأخبار والبيانات الصحفية والمواد المتخصصة، ودعم الاتصال الرقمي مع الجمهور والجهات الإعلامية.",
    image: "/images/creative/sticky/05.jpg",
    action: { label: "استكشف المحتوى والعلاقات العامة", href: creativeHref("content") },
  },
  {
    title: "التصميم الإبداعي والإنتاج الإعلامي",
    text: "إنتاج المحتوى المرئي والمسموع والتفاعلي، بما يشمل الفيديو والتصوير والتحريك والرسوم والقصص المصورة والإنفوجرافيك، إلى جانب التحرير الفني والمونتاج والمؤثرات وما بعد الإنتاج.",
    image: "/images/creative/sticky/06.jpg",
    action: { label: "استكشف الإنتاج الإبداعي", href: creativeHref("creative") },
  },
  {
    title: "تصميم تجربة المستخدم والواجهات",
    text: "تصميم تجارب المواقع والتطبيقات والمنصات المؤسسية، وتطوير رحلات المستخدم والواجهات والنماذج التفاعلية وأنظمة التصميم، مع اختبار سهولة الاستخدام.",
    image: "/images/creative/sticky/07.jpg",
    action: { label: "استكشف تصميم التجارب الرقمية", href: creativeHref("uiux") },
  },
  {
    title: "أتمتة التسويق وتحليل الأداء",
    text: "تنظيم العمليات التسويقية المتكررة، وتنسيق بيانات القنوات التسويقية، وتطوير التقارير ولوحات المؤشرات التي تدعم تحسين الحملات وفهم رحلة العميل.",
    image: "/images/creative/sticky/08.jpg",
    action: { label: "استكشف التحليلات وأتمتة التسويق", href: creativeHref("automation") },
  },
];

/* Reading order: the creative lab on the pill, the others row by row from the
   right (the artboard draws each row's first tile on the left). */
const LAB_ICON = "/icons/creative/hub-lab-";
const ACTIVE_LAB = { label: "المختبر الإبداعي", icon: `${LAB_ICON}sparkles.svg` };
const LABS = [
  { label: "مختبر الذكاء الاصطناعي والبيانات", icon: `${LAB_ICON}cpu.svg` },
  { label: "مختبر أنظمة المؤسسات", icon: `${LAB_ICON}layers.svg` },
  { label: "مختبر هندسة البرمجيات", icon: `${LAB_ICON}code.svg` },
  { label: "مختبر البحث والتطوير والاستشارات", icon: `${LAB_ICON}flask.svg` },
] as const;

const SECTOR_ICON = "/icons/creative/hub-sector-";
const SECTORS = [
  { label: "التجارة الالكترونية", icon: `${SECTOR_ICON}ecommerce.svg` },
  { label: "التعليم والتدريب", icon: `${SECTOR_ICON}education.svg` },
  { label: "السياحة والضيافة", icon: `${SECTOR_ICON}tourism.svg` },
  { label: "الصناعة والهندسة", icon: `${SECTOR_ICON}industry.svg` },
  { label: "الشركات والمؤسسات", icon: `${SECTOR_ICON}business.svg` },
  { label: "المبادرات المجتمعية", icon: `${SECTOR_ICON}community.svg` },
] as const;

const STEPS = [
  {
    icon: { src: "/icons/academies/users.svg", size: 26 },
    title: "تحديد الهدف والجمهور",
    text: "الاتفاق على النتائج المطلوبة وطبيعة المشروع والرسائل والقنوات ذات الصلة.",
  },
  {
    icon: { src: "/icons/creative/lightbulb.svg", size: 26 },
    title: "تطوير التصور والخطة",
    text: "إعداد اتجاه إبداعي ونطاق إنتاج أو تسويق واضح، مع تحديد المخرجات ومسؤوليات التنفيذ.",
  },
  {
    icon: { src: "/icons/creative/sparkles.svg", size: 26 },
    title: "الإنتاج والتشغيل",
    text: "تنفيذ الأعمال المشمولة بالتعاون بين التخصصات المطلوبة ومراجعة الجودة في مراحلها المناسبة.",
  },
  {
    icon: { src: "/icons/academies/trending.svg", size: 26 },
    title: "التقييم والتطوير",
    text: "مراجعة المخرجات ومتابعة المؤشرات المتاحة وتحسين الأعمال الدورية عند الاتفاق على ذلك.",
  },
] as const;

/* Reading order, row by row: the artboard draws each row's first work on the
   right. The film's tile is an unfilled placeholder in the design. */
const WORKS = [
  { title: "CHE ACADEMY", href: "/works", image: "/images/creative/works/che-academy.jpg", alt: "واجهة موقع CHE ACADEMY على جهاز لوحي", height: 415 },
  { title: "MY HORIZON", href: "/works", image: "/images/creative/works/my-horizon.jpg", alt: "واجهة موقع MY HORIZON على جهاز لوحي", height: 415 },
  { title: "انتاج و صناعة الفديوهات", href: "/works", alt: "", height: 394, video: true },
  { title: "GUIDE", href: "/works", image: "/images/creative/works/guide.jpg", alt: "واجهة موقع GUIDE", height: 394 },
] as const;

/* The artboard draws the first answer only; the others are collapsed. */
const QUESTIONS = [
  {
    question: "هل يمكن التعاقد على خدمة واحدة دون بقية الخدمات؟",
    answer:
      "نعم. يمكن التعاقد على أي خدمة بصورة مستقلة، سواء كانت تصميم الهوية التجارية، أو إدارة الحملات الإعلانية، أو الإنتاج الإعلامي، أو غيرها. ويمكن أيضًا الجمع بين خدمات متعددة ضمن مشروع واحد، وفق أهداف العميل ونطاق العمل المتفق عليه.",
  },
  {
    question: "كيف تحددون القنوات التسويقية المناسبة لنشاطنا؟",
    answer:
      "نبدأ بفهم نشاطك وأهدافك وجمهورك، ثم نقارن القنوات المتاحة بحسب طبيعة المنتج أو الخدمة وسلوك الجمهور والميزانية، ونقترح الجمع الأنسب منها مع مؤشرات واضحة لمتابعة الأداء.",
  },
  {
    question: "هل تقدمون الإنتاج الإبداعي والتصوير في مدن مختلفة؟",
    answer:
      "يمكن تنفيذ الإنتاج والتصوير في مواقع مختلفة بحسب احتياجات المشروع. نحدد معك مواقع التصوير والجدول والمتطلبات التنظيمية ضمن نطاق العمل المتفق عليه.",
  },
  {
    question: "هل تشمل خدمات الإنتاج المونتاج وما بعد الإنتاج؟",
    answer:
      "نعم. تشمل خدمات الإنتاج التحرير الفني والمونتاج والمؤثرات وما بعد الإنتاج، وفق نطاق العمل المتفق عليه لكل مشروع.",
  },
  {
    question: "ما أساليب الإنتاج الإبداعي المتاحة لدى ترانسفورمكس؟",
    answer:
      "يشمل الإنتاج الفيديو والتصوير والتحريك والرسوم والقصص المصورة والإنفوجرافيك. ونختار الأسلوب الأنسب لرسالة المشروع وقناة النشر وميزانيته، مع توظيف التقنيات الحديثة والذكاء الاصطناعي عندما يضيفان قيمة فعلية إلى جودة العمل.",
  },
  {
    question: "هل يمكن تطوير محتوى واحد لعدة منصات رقمية؟",
    answer:
      "نعم. يمكن تطوير فكرة أو مادة واحدة وتكييفها لتناسب طبيعة كل منصة وجمهورها، من حيث الشكل والمدة والأسلوب، مع الحفاظ على اتساق رسالة العلامة التجارية.",
  },
  {
    question: "هل يمكنكم العمل مع فريق التسويق أو التصميم الداخلي لدينا؟",
    answer:
      "نعم. يمكننا العمل بجانب فريقكم وفق تقسيم واضح للمسؤوليات والمخرجات، سواء بدعم جزء من العمل أو بتنفيذ مشروع محدد ضمن عمليات الفريق.",
  },
  {
    question: "كيف تقيسون نتائج خدمات التسويق الرقمي؟",
    answer:
      "نتفق في بداية المشروع على المؤشرات المناسبة لأهدافه، ونتابع المتاح منها خلال التنفيذ، ثم نراجع النتائج معك لتحسين القرارات والأعمال اللاحقة.",
  },
  {
    question: "ما الذي تحتاجونه لبدء مشروع جديد؟",
    answer:
      "يكفي أن تخبرنا بطبيعة نشاطك والجمهور الذي تستهدفه والخدمات التي ترغب في تطويرها. بعدها نناقش معك النطاق والمخرجات المتوقعة.",
  },
] as const;

export default function CreativeHubPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${creativePage} ${tajawal.variable}`}>
        <CreativeNav current="overview" />

        <SectorBanner
          id="creative-banner-heading"
          className={hub.banner}
          image="/images/creative/hub/banner.jpg"
          focus="12% 30%"
          title="الإبداع والتسويق عبر القنوات الرقمية"
          text="إبداع يمنح علامتك حضورًا مميزًا، وتسويق يفهم جمهور كل قناة. تختلف طبيعة الجمهور واهتماماته وأساليب تفاعله باختلاف نشاط الشركة و نوع المنتجات و الخدمات و المنصات الرقمية المختارة. وما يحقق التأثير في إحدى القنوات قد يحتاج إلى رسالة مختلفة أو معالجة إبداعية جديدة في قناة أخرى."
          actions={[
            { label: "ناقش مشروعك", tone: "inverse" },
            { label: "استكشف خدماتنا", href: "#services", tone: "outlineInverse" },
          ]}
        />

        <section className={hub.overview} aria-labelledby="creative-overview-heading">
          <Reveal className={hub.overviewCopy}>
            <h2 id="creative-overview-heading" className={`${hub.heading} ${hub.headingBlue}`}>
              إبداع يمنح علامتك حضورًا مميزًا
            </h2>
            <div className={hub.overviewColumn}>
              <p className={hub.overviewLead}>
                في ترانسفورمكس، نجمع بين التفكير الإبداعي والخبرة التسويقية وفهم سلوك الجمهور، لتطوير حضور رقمي يعكس شخصية علامتك التجارية ويخدم أهداف أعمالك. نعتمد على استراتيجية واضحة لكل قناة، ومحتوى يناسب طبيعتها، وقرارات تسويقية تستند إلى البيانات والأداء الفعلي.
              </p>
              <p className={hub.overviewNote}>
                تستفيد مشروعاتنا من خبرات التصميم والإنتاج الإبداعي داخل ترانسفورمكس، مع توظيف التقنيات الحديثة والذكاء الاصطناعي عندما يضيفان قيمة فعلية إلى جودة العمل.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ChannelsVisual />
          </Reveal>
        </section>

        <section id="services" className={hub.band} aria-labelledby="creative-services-heading">
          <CreativeIntro id="creative-services-heading" title="خدماتنا الإبداعية والتسويقية" />
          <Reveal>
            <StickyScrollReveal label="خدماتنا الإبداعية والتسويقية" items={SERVICES} />
          </Reveal>
        </section>

        <LabsSplit
          id="creative-labs-heading"
          title="تعاون تخصصي بحسب احتياجات المشروع"
          text="يمكن تنفيذ كل خدمة إبداعية أو تسويقية بصورة مستقلة، كما يمكن الجمع بين الخدمات التي يتطلبها المشروع ضمن نطاق واضح. وعندما يشمل العمل بناء أنظمة أو تطوير برمجيات أو نماذج ذكاء اصطناعي وعلوم بيانات، تتعاون فرق المختبر مع التخصصات الهندسية والتقنية الأخرى في ترانسفورمكس."
          active={ACTIVE_LAB}
          labs={LABS}
        />

        <section className={academies.section} aria-labelledby="creative-sectors-heading">
          <CreativeIntro id="creative-sectors-heading" title="تطبيقات عملية لقطاعات مختلفة" />
          <SectorCards items={SECTORS} />
        </section>

        <section className={academies.section} aria-labelledby="creative-approach-heading">
          <CreativeIntro id="creative-approach-heading" title="كيف نعمل معك؟" blue />
          <ProcessCards steps={STEPS} />
        </section>

        <section id="works" className={hub.band} aria-labelledby="creative-works-heading">
          <div className={hub.workHead}>
            <CreativeIntro
              id="creative-works-heading"
              title="أعمال وتجارب يمكن استكشافها"
              text="يقدم معرض الأعمال نماذج فعلية من التصميم والإنتاج والحملات والتجارب الرقمية المصرح بنشرها، مع توضيح دور ترانسفورمكس في كل مشروع. وتُعرض النماذج التجريبية بصفتها أعمالًا توضيحية، لا مشروعات عملاء أو نتائج محققة."
              blue
            />
            <div className={hub.workActions}>
              <AcademyAction action={{ label: "استكشف أعمالنا", href: "/works" }} />
              <AcademyAction action={{ label: "اقرأ دراسات الحالة", href: "/works", tone: "outline" }} />
            </div>
          </div>
          <WorkGrid items={WORKS} />
        </section>

        <section className={hub.band} aria-labelledby="creative-faq-heading">
          <Reveal className={`${academies.intro} ${academies.introStart}`}>
            <h2 id="creative-faq-heading" className={academies.title}>
              الأسئلة الشائعة
            </h2>
          </Reveal>
          <AcademyFaq items={QUESTIONS} />
        </section>

        <HubClosing
          id="creative-closing-heading"
          title="لنعمل على ما يحتاجه مشروعك"
          text="أخبرنا بطبيعة نشاطك، والجمهور الذي تستهدفه، والخدمات التي ترغب في تطويرها. سنناقش معك القدرات المناسبة ونطاق العمل والمخرجات المتوقعة بصورة واضحة."
          actions={[
            { label: "اطلب عرض خدمة", href: "#request" },
            { label: "استكشف أعمالنا", href: "/works", tone: "outline" },
          ]}
          form={<ServiceRequestForm id="request" title="ناقش مشروعك" form="creative" path="business" />}
        />
      </main>
      <Footer />
    </>
  );
}
