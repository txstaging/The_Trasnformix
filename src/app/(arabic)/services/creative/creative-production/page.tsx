import type { Metadata } from "next";
import { AcademyFaq } from "@/components/academies/AcademyFaq";
import { ClosingCard, SectionIntro } from "@/components/academies/AcademiesKit";
import { CreativeIntro, CreativeNav, creativePage, SectorBanner } from "@/components/creative/CreativeKit";
import { StickyScrollReveal, type StickyItem } from "@/components/creative/StickyScrollReveal";
import {
  CpSection,
  InfoCards,
  ProcessSix,
  SplitLayout,
  Callout,
  cp,
  type Info,
} from "@/components/creative/creative-production/CreativeProduction";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "التصميم الإبداعي والإنتاج الإعلامي | Transformix",
  description:
    "لا يكتشف الجمهور المعلومات بالطريقة نفسها؛ فالبعض يفضّل مشاهدة فيديو قصير، وآخر يتفاعل مع قصة مصورة أو شرح بصري، بينما يحتاج جمهور متخصص إلى عرض دقيق أو تجربة تفاعلية. المحتوى الفعّال يختار الوسيلة التي تناسب الرسالة والناس الذين يتلقونها.",
};

const icon = (name: string) => `/icons/creative/${name}.svg`;

/* Figma 4850:8091, in reading order (the first sits on the right). */
const FORMS: readonly Info[] = [
  {
    icon: icon("social-megaphone"),
    title: "الفيديو والتحريك",
    text: "الأفلام التعريفية والوثائقية، الفيديو القصير، الموشن جرافيك، الشروحات، المعالجة البصرية والصوتية.",
  },
  {
    icon: "/icons/academies/layers.svg",
    title: "التصميم والسرد البصري",
    text: "التصميم الجرافيكي، الكوميكس، الشخصيات والرسوم، الكتب المصورة، الإنفوجرافيك.",
  },
  {
    icon: icon("cp-book"),
    title: "المعرفة والتعلم الرقمي",
    text: "المحتوى التعليمي، الخرائط الذهنية، التعلم المصغر، الألعاب والأنشطة التعليمية.",
  },
  {
    icon: "/icons/academies/grid.svg",
    title: "المحتوى التفاعلي والتجارب",
    text: "النماذج القابلة للتجربة، السيناريوهات التفاعلية، الوسائط الغامرة، الخرائط السردية.",
  },
  {
    icon: "/icons/academies/briefcase.svg",
    title: "المحتوى التجاري والمؤسسي",
    text: "مواد المنتجات والسياحة، العروض والتقارير البصرية، تصوير العمليات ورحلة العميل.",
  },
  {
    icon: "/icons/academies/database.svg",
    title: "الأصول الرقمية وإعادة توظيف المحتوى",
    text: "مكتبات الصور والمكونات، الأرشفة، التحويل إلى صيغ متعددة، وسير العمل المتكرر.",
  },
];

/* Figma 4850:8020, the nine items of its sticky scroll reveal; the artboard
   gives the card one photo for all of them. */
const CAPABILITIES_RAW = [
  {
    title: "إنتاج الفيديو والأفلام الرقمية",
    text: "محتوى مرئي لعرض المنتج أو المؤسسة أو التجربة أو المعرفة: فيديوهات تعريفية، مقابلات، أفلام قصيرة، تغطيات، مواد تعليمية ومحتوى مناسب للنشر الرقمي. يتحدد النطاق وفق الحاجة إلى كتابة السيناريو والتصوير والإخراج والمونتاج والتلوين والصوت والنسخ المختلفة.",
  },
  {
    title: "الموشن جرافيك والتحريك",
    text: "رسوم متحركة تشرح فكرة أو عملية أو خدمة، وتشمل تحريك العناصر والبيانات والشخصيات والواجهات والمشاهد التوضيحية. يختار الأسلوب الفني بحسب مستوى التفاصيل والجمهور والقناة.",
  },
  {
    title: "التصميم الجرافيكي والإنتاج البصري",
    text: "مواد إعلانية ومؤسسية ومطبوعات وكتالوجات وعروض وأغلفة ومكونات رقمية. تشمل الخدمة تطوير قوالب قابلة لإعادة الاستخدام، مع الالتزام بالهوية المعتمدة للعلامة التجارية.",
  },
  {
    title: "التصوير التجاري والمرئي",
    text: "تصوير المنتجات والأنشطة والمواقع والفعاليات والفرق والمواد المؤسسية بحسب ترتيبات الإنتاج المتاحة، مع معالجة الصور وتجهيزها للمواقع والمتاجر والحملات والمطبوعات. نميّز الصور الحقيقية عن الصور التوضيحية أو المُولدة.",
  },
  {
    title: "الكوميكس والقصص المصورة",
    text: "قصص متسلسلة وشخصيات وحوارات ورسوم موجهة للتوعية والتعليم وتقديم المنتجات والإجراءات. يمكن إنتاج شرائط مصورة، وقصص رقمية طولية، وأدلة تدريب مصورة، مع الحفاظ على ثبات الأسلوب والشخصيات واللغة.",
  },
  {
    title: "الإنفوجرافيك وتصميم المعلومات",
    text: "تصميم البيانات والمفاهيم في رسوم واضحة: خرائط ذهنية، مخططات عمليات، رحلات عملاء، خطوط زمنية، رسوم بيانية، تقارير وعروض بصرية. تُراجع صحة المعلومات ومصادرها قبل الإنتاج.",
  },
  {
    title: "المحتوى التعليمي والتفاعلي",
    text: "فيديوهات شرح، كتب ورسوم تعليمية، وحدات تعلم مصغر، اختبارات وأنشطة وألعاب تعليمية ونماذج تفاعلية. يمكن تجهيز المخرجات لبيئات التعلم الرقمية وفق المتطلبات التقنية المتفق عليها.",
  },
  {
    title: "التصوير ثلاثي الأبعاد والتجارب الغامرة",
    text: "نماذج ومشاهد ثلاثية الأبعاد لعرض المنتجات والمكونات والعمليات والتجارب، مع خيارات للتصوير التوضيحي والمحاكاة والتفاعل بحسب طبيعة الاستخدام. تُحدد الدقة المطلوبة وحدود المحاكاة في نطاق العمل.",
  },
  {
    title: "الصوت والإنتاج متعدد الصيغ",
    text: "معالجة الصوت والتعليق الصوتي والنسخ المصاحبة للفيديو عند الاتفاق عليها، وتجهيز المحتوى للعرض الأفقي والرأسي والمربع، مع نسخ للغات وقنوات مختلفة. إنتاج البودكاست أو التسجيلات الكاملة يُحدد كعمل متخصص ضمن المشروع.",
  },
] as const;

const CAPABILITIES: readonly StickyItem[] = CAPABILITIES_RAW.map((item) => ({
  ...item,
  image: "/images/creative/creative-production/capabilities.jpg",
}));

/* Figma 4851:7509, in reading order. */
const SECTORS: readonly Info[] = [
  {
    icon: icon("hub-sector-ecommerce"),
    title: "التجارة والتجزئة",
    text: "تصوير المنتجات، فيديوهات الاستخدام، المواد الإعلانية، الكتالوجات والقصص المرئية.",
  },
  {
    icon: icon("hub-sector-education"),
    title: "التعليم والتدريب",
    text: "شرح مرئي، كوميكس تعليمية، خرائط ذهنية، وحدات تفاعلية وألعاب تعلم.",
  },
  {
    icon: icon("hub-sector-tourism"),
    title: "السياحة والضيافة",
    text: "تصوير التجارب والوجهات، معاينات مرئية، قصص وخرائط وأنشطة ومحتوى للحجز.",
  },
  {
    icon: icon("hub-sector-industry"),
    title: "الصناعة والهندسة",
    text: "تصوير العمليات والمنتجات، رسوم توضيحية تقنية، تحريك ثلاثي الأبعاد ومحتوى سلامة.",
  },
  {
    icon: icon("hub-sector-business"),
    title: "الشركات والمؤسسات",
    text: "أفلام تعريفية، عروض المستثمرين، التقارير المرئية، محتوى الموظفين والأخبار.",
  },
  {
    icon: icon("hub-sector-community"),
    title: "المبادرات المجتمعية",
    text: "حملات التوعية، القصص المصورة، توثيق المبادرات، محتوى الأثر والتواصل.",
  },
];

/* Figma 4850:8103, steps 01 to 06. */
const STEPS = [
  {
    icon: { src: icon("media-users-26"), size: 26 },
    title: "الهدف والجمهور",
    text: "موجز العمل وقنوات الاستخدام والمخرجات",
  },
  {
    icon: { src: icon("lightbulb"), size: 26 },
    title: "الفكرة والمعالجة",
    text: "سيناريو واتجاه فني ومراجع",
  },
  {
    icon: { src: icon("sparkles"), size: 26 },
    title: "الإنتاج",
    text: "تصميم وتصوير وتحريك ومونتاج",
  },
  {
    icon: { src: icon("ux-shield-check"), size: 26 },
    title: "المراجعة",
    text: "دقة وحقوق وجودة وملاحظات",
  },
  {
    icon: { src: icon("cp-truck"), size: 26 },
    title: "التسليم",
    text: "الصيغ واللغات والمقاسات المتفق عليها",
  },
  {
    icon: { src: icon("cp-repeat"), size: 26 },
    title: "إعادة الاستخدام",
    text: "نسخ وقنوات إضافية عند الحاجة",
  },
] as const;

/* Figma 4850:8118, in reading order. */
const ENGAGEMENTS: readonly Info[] = [
  {
    icon: icon("sparkles"),
    title: "مشروع مستقل",
    text: "فيديو أو كتاب مصور أو كوميكس أو تقرير بصري أو أصل تفاعلي بمواصفات وتسليمات واضحة.",
  },
  {
    icon: "/icons/academies/layers.svg",
    title: "حزمة إنتاج",
    text: "مجموعة أصول مترابطة لحملة أو إطلاق منتج أو برنامج تعليمي.",
  },
  {
    icon: icon("cp-calendar"),
    title: "إنتاج دوري",
    text: "مواد شهرية أو موسمية وفق تقويم إنتاج ومراحل مراجعة متفق عليها.",
  },
  {
    icon: icon("media-users-26"),
    title: "دعم فريق العميل",
    text: "تصميم أو تحريك أو مونتاج أو إنتاج متخصص بالتعاون مع فرق المؤسسة.",
  },
];

/* Figma 4850:8135; the answers are the FAQ instances' own text properties
   (only the first is drawn open). */
const FAQ = [
  {
    question: "هل يمكن تنفيذ الكوميكس أو الإنفوجرافيك كخدمة مستقلة؟",
    answer: "نعم، يمكن طلب أي مخرج محدد بصورة مستقلة أو ضمن مجموعة مواد متكاملة.",
  },
  {
    question: "هل تعتمد الأعمال كلها على الذكاء الاصطناعي؟",
    answer:
      "لا. قد يكون العمل مرسومًا أو مصورًا أو منتجًا بأدوات تقليدية، أو يستخدم تقنيات حديثة في خطوات محددة. الاختيار يتبع الغرض والجودة والحقوق.",
  },
  {
    question: "هل يمكن تحويل فيديو واحد إلى محتويات متعددة؟",
    answer:
      "يمكن إعداد مقتطفات وملصقات وصور ورسوم ونسخ لغوية ومقاسات مختلفة، إذا كانت المادة الأصلية وحقوقها تتيح ذلك.",
  },
  {
    question: "هل تقدمون ملفات المصدر؟",
    answer: "تُحدد ملفات المصدر والتراخيص وحقوق الملكية والاستخدام بوضوح في عرض المشروع.",
  },
  {
    question: "هل يمكن ربط المحتوى التفاعلي بمنصة تعليمية؟",
    answer:
      "يمكن دراسة التكامل وفق متطلبات المنصة والمعايير التقنية المستخدمة، ويُحدد التنفيذ والاختبار ضمن نطاق المشروع.",
  },
] as const;

/** Figma 4850:7981 — التصميم الإبداعي والإنتاج الإعلامي (desktop 1440). */
export default function CreativeProductionPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${creativePage} ${tajawal.variable}`}>
        <CreativeNav current="creative" />

        <SectorBanner
          id="cp-banner-heading"
          className={cp.banner}
          image="/images/creative/creative-production/banner.jpg"
          title="التصميم الإبداعي والإنتاج الإعلامي"
          text={
            <p>
              <strong>الذكاء الاصطناعي يوسّع خيارات الإنتاج، ولا يحل محل المبدع.</strong>
              {" "}
              لا يكتشف الجمهور المعلومات بالطريقة نفسها؛ فالبعض يفضّل مشاهدة فيديو قصير، وآخر يتفاعل مع قصة مصورة أو شرح بصري، بينما يحتاج جمهور متخصص إلى عرض دقيق أو تجربة تفاعلية. المحتوى الفعّال يختار الوسيلة التي تناسب الرسالة والناس الذين يتلقونها. في مختبر الإبداع بترانسفورمكس، تتكامل الكتابة والتصميم والرسم والتصوير والتحريك والمونتاج مع تقنيات الإنتاج الرقمي لتقديم محتوى تجاري وتعليمي ومؤسسي ذي غرض واضح ومخرجات قابلة للاستخدام.
            </p>
          }
          actions={[
            { label: "ناقش مشروعك الإبداعي", tone: "inverse" },
            { label: "استكشف الأعمال", href: "/works", tone: "outlineInverse" },
          ]}
        />

        <CpSection compact labelledBy="cp-capabilities-heading">
          <CreativeIntro id="cp-capabilities-heading" title="قدراتنا الإبداعية والإنتاجية" />
          <StickyScrollReveal label="قدراتنا الإبداعية والإنتاجية" items={CAPABILITIES} />
        </CpSection>

        <CpSection band="subtle" labelledBy="cp-forms-heading">
          <CreativeIntro
            id="cp-forms-heading"
            title="اختر شكل المحتوى الذي يناسب رسالتك"
            text={
              <>
                فيديوهات وقصص مصورة ومحتوى تفاعلي وعروض بصرية؛ تتنوع المخرجات وفق الرسالة والجمهور وقنوات الاستخدام.
                <br />
                اختر خدمة مستقلة أو مجموعة أعمال مترابطة لمشروعك.
              </>
            }
          />
          <InfoCards items={FORMS} columns={3} />
        </CpSection>

        <CpSection labelledBy="cp-ai-heading">
          <SplitLayout id="cp-ai-heading" title="الذكاء الاصطناعي داخل العملية الإبداعية">
            <Callout
              label="إبداع بشري يقود. وتقنية توسّع الإمكانات."
              text="تتيح أدوات الذكاء الاصطناعي إنتاج تصورات أولية، وإعداد عناصر مرئية وصوتية، وتجربة أساليب فنية، وإعادة تهيئة المادة لأكثر من قناة. غير أن قيمة العمل تتحدد بوضوح الفكرة والبحث وجودة الكتابة وحسّ المصمم والمخرج ومراجعة التفاصيل. لا نعدّ الصورة المُولدة وحدها مشروعًا مكتملًا، ولا نعرض مشهدًا تخيليًا بوصفه تصويرًا حقيقيًا لمنتج أو منشأة."
            />
          </SplitLayout>
        </CpSection>

        <CpSection labelledBy="cp-sectors-heading">
          <CreativeIntro id="cp-sectors-heading" title="تطبيقات عملية لقطاعات مختلفة" />
          <InfoCards items={SECTORS} columns={3} />
        </CpSection>

        <CpSection labelledBy="cp-process-heading">
          <CreativeIntro id="cp-process-heading" title="كيف يُدار مشروعك الإبداعي؟" blue />
          <ProcessSix steps={STEPS} />
        </CpSection>

        <CpSection band="card" labelledBy="cp-engagement-heading">
          <CreativeIntro id="cp-engagement-heading" title="نماذج التعاون والمخرجات" />
          <InfoCards items={ENGAGEMENTS} columns={4} />
        </CpSection>

        <CpSection band="subtle" labelledBy="cp-faq-heading">
          <SectionIntro id="cp-faq-heading" title="الأسئلة الشائعة" start />
          <AcademyFaq items={FAQ} />
        </CpSection>

        <ClosingCard
          id="cp-closing-heading"
          title="لننتج محتوى يليق بفكرتك"
          text="فيلم قصير، قصة مصورة، محتوى تعليمي، عرض بصري أو تجربة تفاعلية؛ نحدد المعالجة الإبداعية المناسبة لرسالتك وجمهورك والقنوات التي تستخدمها، ونقدم مخرجات واضحة يمكن اعتمادها وتسليمها."
          actions={[
            { label: "ناقش مشروعك الإبداعي" },
            { label: "استكشف نماذج الإنتاج", href: "/works", tone: "outline" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
