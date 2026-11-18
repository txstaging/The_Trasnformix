import type { Metadata } from "next";
import { academies, SectionIntro } from "@/components/academies/AcademiesKit";
import { AcademyAction } from "@/components/academies/AcademyAction";
import { AcademyFaq } from "@/components/academies/AcademyFaq";
import {
  CreativeIntro,
  CreativeNav,
  creativePage,
  ProcessCards,
  SectorBanner,
  SectorStory,
} from "@/components/creative/CreativeKit";
import { EngagementGrid, GoalCards, PlatformsLayout } from "@/components/creative/media-buying/MediaParts";
import { MediaSticky } from "@/components/creative/media-buying/MediaSticky";
import styles from "@/components/creative/media-buying/MediaBuying.module.css";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceRequestForm } from "@/components/services/ServiceRequestForm";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import { sector } from "@/components/sectors/SectorKit";

export const metadata: Metadata = {
  title: "إدارة الحملات الإعلانية والتسويق بالأداء | Transformix",
  description:
    "سواء كانت شركتك تطلق منتجًا جديدًا، أو تسعى إلى زيادة المبيعات، أو تستهدف عملاء في سوق جديد، نساعدك على اختيار المنصات المناسبة وإدارة ميزانيتك الإعلانية وفق أهداف واضحة ومؤشرات قابلة للقياس.",
};

const IMG = "/images/creative/media-buying";
const ICON = "/icons/creative";

/* Figma 4989:9383, in reading order. */
const PLATFORMS = [
  {
    icon: `${ICON}/media-globe-22.svg`,
    title: "إعلانات جوجل",
    text: "إعلانات البحث للوصول إلى المهتمين بخدماتك ومنتجاتك، وحملات العرض والتسوق وفق ملاءمة النشاط وتوافر المتطلبات.",
  },
  {
    icon: `${ICON}/media-message-22.svg`,
    title: "إعلانات إنستجرام",
    text: "إعلانات الريلز والقصص والمنشورات لتعريف الجمهور بالمنتجات وتحفيز الاهتمام والطلبات.",
  },
  {
    icon: `${ICON}/media-users-22.svg`,
    title: "إعلانات فيسبوك",
    text: "حملات الوعي بالعلامة، وجذب العملاء المحتملين، والمبيعات وإعادة الاستهداف وفق إعدادات الحساب والبيانات المتاحة.",
  },
  {
    icon: `${ICON}/media-sparkles-22.svg`,
    title: "إعلانات تيك توك",
    text: "حملات الفيديو القصير للوصول إلى الجمهور المناسب بمحتوى إبداعي يتماشى مع طبيعة المنصة.",
  },
  {
    icon: `${ICON}/media-megaphone-22.svg`,
    title: "إعلانات سناب شات",
    text: "حملات مرئية للمنتجات والخدمات والأنشطة التي يناسبها جمهور سناب شات، خاصة عند استهداف شرائح محددة في الأسواق الخليجية.",
  },
  {
    icon: `${ICON}/media-briefcase-22.svg`,
    title: "إعلانات لينكدإن",
    text: "حملات موجهة للشركات وأصحاب القرار، للتعريف بالخدمات المهنية وجذب فرص التواصل التجاري.",
  },
  {
    icon: `${ICON}/media-layers-22.svg`,
    title: "إعلانات يوتيوب",
    text: "إعلانات الفيديو للتعريف بالعلامة والمنتجات وشرح الخدمات، ضمن أهداف وميزانيات محددة.",
  },
] as const;

/* Figma 4973:8630 (the items of the sticky list 4974:8970). */
const CAPABILITIES = [
  {
    title: "استراتيجية الإعلان وتخطيط الميزانية",
    text: "نحدد معك هدف الحملة والجمهور والسوق والميزانية، ثم نضع خطة توضح القنوات المقترحة، والرسائل الإعلانية، وتوزيع الإنفاق، ومؤشرات نجاح قابلة للمتابعة.",
  },
  {
    title: "إدارة إعلانات محركات البحث",
    text: "نعد الحملات على جوجل ومحركات البحث الملائمة، بما يشمل دراسة عبارات البحث، وكتابة الإعلانات، وتنظيم المجموعات الإعلانية، وإدارة الإنفاق، وقياس الاستجابة.",
  },
  {
    title: "إدارة إعلانات وسائل التواصل",
    text: "نجهز إعلانات إنستجرام وفيسبوك وتيك توك وسناب شات ولينكدإن وفق طبيعة جمهور كل منصة، ونختبر الرسائل والتصاميم، ونتابع الإنفاق والنتائج.",
  },
  {
    title: "حملات جذب العملاء المحتملين",
    text: "نطور حملات ونماذج تواصل تساعد على جذب استفسارات مرتبطة بنشاطك، مع متابعة جودة الطلبات وتكلفتها وإمكانية تحويلها إلى فرص مبيعات، وليس عددها فقط.",
  },
  {
    title: "حملات إعادة الاستهداف",
    text: "نواصل التواصل مع الجمهور الذي سبق أن تفاعل مع علامتك أو زار موقعك، عندما تتوافر بيانات صالحة وموافقات مناسبة، برسائل تتوافق مع مرحلة اهتمامه.",
  },
  {
    title: "تحسين الإعلانات والتحويلات",
    text: "نراجع الاستهداف والإعلانات والميزانيات وصفحات الوصول. نوضح ما نجح، وما يحتاج إلى تغيير، وكيف يمكن توجيه الإنفاق على أساس النتائج الفعلية.",
  },
  {
    title: "تحليلات الأداء والتقارير",
    text: "نقدم تقارير واضحة عن الإنفاق والوصول والطلبات والتحويلات ومؤشرات العائد عند إمكان قياسها بدقة، مع توصيات عملية للمرحلة التالية.",
  },
] as const;

/* Figma 4973:9160, in reading order (the first sits on the right). */
const GOALS = [
  {
    icon: { src: `${ICON}/media-cart.svg`, size: 26 },
    title: "زيادة المبيعات والطلبات",
    text: "حملات للمنتجات والخدمات والمتاجر الرقمية، مع قياس الطلبات والتحويلات متى توافرت بيانات التتبع المناسبة.",
  },
  {
    icon: { src: "/icons/academies/briefcase.svg", size: 26 },
    title: "استقطاب عملاء للشركات",
    text: "حملات موجهة لصناع القرار والمهتمين بالخدمات المهنية، مع التركيز على جودة الاستفسارات وفرص المتابعة.",
  },
  {
    icon: { src: `${ICON}/media-launch.svg`, size: 26 },
    title: "إطلاق علامة أو منتج",
    text: "حملات تعريف وإطلاق، واختبار الرسائل الإعلانية، وبناء حضور أولي يمكن تطويره وفق الاستجابة.",
  },
  {
    icon: { src: `${ICON}/media-globe-26.svg`, size: 26 },
    title: "التوسع في سوق جديد",
    text: "اختيار المنصات والرسائل واللغة وفق خصائص السوق، والبدء باختبارات قبل التوسع في الميزانية.",
  },
  {
    icon: { src: `${ICON}/media-calendar-check-26.svg`, size: 26 },
    title: "الترويج للفعاليات والبرامج",
    text: "حملات لدعم التسجيل والحجز والمشاركة في الفعاليات والبرامج التعليمية والمهنية.",
  },
] as const;

/* Figma 4973:8647. */
const STEPS = [
  {
    icon: { src: `${ICON}/media-users-26.svg`, size: 26 },
    title: "الفهم والتخطيط",
    text: "نتعرف على نشاطك، وجمهورك، وميزانيتك، وحساباتك الحالية، والنتائج التي تريد قياسها.",
  },
  {
    icon: { src: `${ICON}/media-megaphone-26.svg`, size: 26 },
    title: "التجهيز والإطلاق",
    text: "نحدد القنوات والرسائل، ونعد الإعلانات والاستهداف وأدوات القياس، ونراجع جاهزية الحسابات وصفحات الوصول.",
  },
  {
    icon: { src: `${ICON}/media-trending-26.svg`, size: 26 },
    title: "المتابعة والتحسين",
    text: "نتابع الإنفاق والأداء، ونختبر التعديلات المناسبة على الرسائل والجمهور والميزانية.",
  },
  {
    icon: { src: `${ICON}/media-chart-26.svg`, size: 26 },
    title: "التقارير والقرارات",
    text: "نشاركك النتائج وما تعنيه، والإجراءات التي نُفذت، والفرص المقترحة للفترة التالية.",
  },
] as const;

/* Figma 4973:8718, in reading order (01 on the right of the first row). */
const ENGAGEMENTS = [
  {
    icon: `${ICON}/media-calendar-check-24.svg`,
    title: "حملة محددة",
    text: "تخطيط وتنفيذ ومتابعة حملة مرتبطة بهدف أو فترة زمنية محددة.",
    image: `${IMG}/banner.jpg`,
    alt: "مختص يتابع لوحات بيانات حملة إعلانية على شاشة",
  },
  {
    icon: `${ICON}/media-calendar-24.svg`,
    title: "إدارة شهرية",
    text: "إدارة مستمرة للحملات ومراجعة الميزانيات وتحسين الأداء والتقارير.",
    image: `${IMG}/monthly.jpg`,
    alt: "زميلان يراجعان عملًا على جهاز محمول",
  },
  {
    icon: `${ICON}/media-shield-check-24.svg`,
    title: "مراجعة الحسابات والاستشارات",
    text: "تقييم الحملات الحالية وتقديم خطة للتحسين، مع أو دون تولي التنفيذ.",
    image: `${IMG}/audit.jpg`,
    alt: "يدان على لوحة مفاتيح أمام لوحة تحليلات الإعلانات",
  },
  {
    icon: `${ICON}/media-layers-24.svg`,
    title: "برنامج تسويقي متكامل",
    text: "ربط إدارة الإعلان بإنتاج المحتوى والتصميم والتحليلات وفق اتفاق واضح.",
    image: `${IMG}/program.jpg`,
    alt: "فريق تسويق يناقش خطة حول طاولة",
  },
] as const;

/* Figma 4973:8809. The artboard draws the first answer only; the others
   follow the page's own copy. */
const QUESTIONS = [
  {
    question: "هل تديرون إعلانات إنستجرام وفيسبوك وجوجل؟",
    answer:
      "نعم، ويمكن إدارة حملات على منصات أخرى مثل تيك توك وسناب شات ولينكدإن ويوتيوب، حسب الجمهور وأهداف المشروع وجاهزية الحسابات.",
  },
  {
    question: "هل يمكنكم العمل على حساباتي الإعلانية الحالية؟",
    answer:
      "نعم، نراجع حساباتك الإعلانية الحالية أولًا، ثم نحدد معك ما يمكن تحسينه وما يلزم إعداده، مع توضيح الصلاحيات المطلوبة وملكية الحسابات.",
  },
  {
    question: "كيف نحدد الميزانية المناسبة؟",
    answer:
      "نبدأ من هدف الحملة والجمهور والسوق والمنصات المقترحة، ثم نقترح توزيعًا للإنفاق يمكن مراجعته وتعديله وفق الأداء الفعلي بعد الإطلاق.",
  },
  {
    question: "هل تشمل الإدارة تصميم الفيديوهات والإعلانات؟",
    answer:
      "لا تُعد هذه الخدمات إضافات مشمولة تلقائيًا في إدارة الإعلانات، لكن يمكن إضافتها ضمن نطاق التعاون عند الحاجة إلى التصميم أو إنتاج الفيديو.",
  },
  {
    question: "هل تشمل الأتعاب تكلفة الإعلان؟",
    answer:
      "لا، تُحدد ميزانية الإنفاق الإعلاني منفصلة عن أتعاب الإدارة، ويُوضح ذلك في العرض التجاري مع الصلاحيات والموافقات ودورية التقارير.",
  },
  {
    question: "هل تضمنون عددًا محددًا من العملاء أو المبيعات؟",
    answer:
      "لا نعرض أرقامًا أو عوائد افتراضية. نحدد مؤشرات نجاح قابلة للقياس، ونشاركك النتائج الفعلية والتوصيات لتحسينها.",
  },
  {
    question: "كيف أتابع النتائج؟",
    answer:
      "نقدم تقارير واضحة عن الإنفاق والوصول والطلبات والتحويلات، مع شرح لما تعنيه الأرقام والإجراءات التي نُفذت والفرص المقترحة للفترة التالية.",
  },
] as const;

const REQUEST = "media-request";

/** Figma 4973:8579 — إدارة الحملات الإعلانية والتسويق بالأداء (Media Buying). */
export default function MediaBuyingPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${creativePage} ${tajawal.variable}`}>
        <CreativeNav current="marketing" />

        <SectorBanner
          id="media-banner-heading"
          className={styles.banner}
          image={`${IMG}/banner.jpg`}
          focus="30% 30%"
          title="إدارة الحملات الإعلانية والتسويق بالأداء"
          text={
            <>
              <p>
                <strong>حملات إعلانية بخطة واضحة، وإدارة احترافية لكل منصة.</strong>
                {" "}
                سواء كانت شركتك تطلق منتجًا جديدًا، أو تسعى إلى زيادة المبيعات، أو تستهدف عملاء في سوق جديد، نساعدك على اختيار المنصات المناسبة وإدارة ميزانيتك الإعلانية وفق أهداف واضحة ومؤشرات قابلة للقياس.
              </p>
              <p>
                تدير ترانسفورمكس الحملات المدفوعة على جوجل وإنستجرام وفيسبوك وتيك توك وسناب شات ولينكدإن ويوتيوب، بدءًا من التخطيط وتحديد الجمهور وإعداد الإعلانات، حتى متابعة النتائج وتحسين الأداء. ونجمع عند الحاجة بين إدارة الإعلانات والتصميم الإبداعي وتحليل البيانات وتجربة المستخدم.
              </p>
            </>
          }
          actions={[
            { label: "ناقش حملتك الإعلانية", tone: "inverse" },
            { label: "اطلب مراجعة حساباتك الإعلانية", tone: "outlineInverse" },
          ]}
        />

        <section className={academies.section} aria-labelledby="media-capabilities-heading">
          <CreativeIntro id="media-capabilities-heading" title="قدراتنا في إدارة الحملات" />
          <Reveal>
            <MediaSticky
              label="قدراتنا في إدارة الحملات"
              image={`${IMG}/strategy.jpg`}
              alt="فريق يناقش استراتيجية إعلانية وخطة الميزانية"
              items={CAPABILITIES}
            />
          </Reveal>
        </section>

        <section id="platforms" className={`${academies.section} ${styles.grey}`} aria-labelledby="media-platforms-heading">
          <CreativeIntro
            id="media-platforms-heading"
            title="المنصات الإعلانية التي نعمل من خلالها"
            text="لكل منصة جمهورها وطبيعة استخدامها. نحدد القنوات وفق المنتج والسوق والميزانية وهدف الحملة، وقد نوصي بمنصة واحدة أو بخطة متعددة القنوات."
          />
          <PlatformsLayout platforms={PLATFORMS} image={`${IMG}/banner.jpg`} alt="مختص يتابع لوحات بيانات الحملات الإعلانية على شاشة" />
        </section>

        <section className={academies.section} aria-labelledby="media-goals-heading">
          <CreativeIntro id="media-goals-heading" title="حملات تناسب ما تريد تحقيقه" />
          <GoalCards goals={GOALS} />
        </section>

        <section className={`${academies.section} ${styles.grey}`} aria-labelledby="media-approach-heading">
          <CreativeIntro id="media-approach-heading" title="كيف ندير حملتك؟" blue />
          <ProcessCards steps={STEPS} />
        </section>

        <SectorStory
          story={{
            id: "media-integrated",
            title: "الإبداع والتصميم والبيانات في خدمة إعلانك",
            paragraphs: [
              "قد تحتاج حملتك إلى أكثر من إدارة الحسابات الإعلانية. لذلك يمكن الاستفادة من قدرات ترانسفورمكس في تصميم الإعلانات وإنتاج الفيديو، وتطوير هوية الرسائل، وتحسين صفحات الوصول، وتهيئة التحليلات، وربط طلبات العملاء بأنظمة المتابعة. تُحدد هذه الخدمات ضمن نطاق التعاون، ولا تُعد إضافات مشمولة تلقائيًا في إدارة الإعلانات.",
            ],
            photo: {
              src: `${IMG}/creative.jpg`,
              alt: "فريق تصوير يسجل مقابلة في استوديو بإطلالة على المدينة",
              height: 400,
              shade: 0,
            },
            far: true,
          }}
        />

        <section className={`${academies.section} ${sector.tinted}`} aria-labelledby="media-engagement-heading">
          <CreativeIntro id="media-engagement-heading" title="طرق التعاون" />
          <EngagementGrid items={ENGAGEMENTS} />
        </section>

        <section className={academies.section} aria-labelledby="media-faq-heading">
          <SectionIntro id="media-faq-heading" title="الأسئلة الشائعة" start />
          <AcademyFaq items={QUESTIONS} />
        </section>

        <section className={`${academies.section} ${academies.closing}`} aria-labelledby="media-request-heading">
          <Reveal className={styles.request}>
            <div className={styles.requestCopy}>
              <h2 id="media-request-heading" className={styles.requestTitle}>
                لنخطط لحملتك القادمة
              </h2>
              <p className={styles.requestText}>
                أخبرنا بطبيعة نشاطك، وما تريد تحقيقه، والمنصات التي تستخدمها، والميزانية التقريبية. سنناقش معك نطاق الإدارة والقنوات والقدرات الإبداعية التي يحتاجها مشروعك.
              </p>
              <div className={styles.requestActions}>
                <AcademyAction action={{ label: "اطلب مراجعة حساباتك الإعلانية" }} />
              </div>
            </div>
            <ServiceRequestForm id={REQUEST} title="بيانات الطلب" form="mediaBuying" path="business" />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
