import type { Metadata } from "next";
import { ClosingCard } from "@/components/academies/AcademiesKit";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { sector, SectorBanner, sectorPage, SectorStory, type Story } from "@/components/sectors/SectorKit";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "قطاع الرياضات الذكية | Transformix",
  description:
    "تساعد ترانسفورمكس الأندية والأكاديميات والمنشآت والمستثمرين في القطاع الرياضي على تطوير قدراتهم الإدارية والتشغيلية والرقمية، من تجربة الأعضاء إلى الأداء الرياضي الذكي.",
};

const photo = (name: string, alt: string, height: number, shade = 0.2) => ({
  src: `/images/sectors/sports/${name}.jpg`,
  alt,
  height,
  shade,
});

/* Figma 4781:5948 – 4781:6062, top to bottom. The photo alternates sides,
   starting on the far (left) one. */
const STORIES: readonly Story[] = [
  {
    id: "sports-technology",
    title: "الرياضة والتكنولوجيا",
    paragraphs: [
      "تشهد الصناعة الرياضية في المنطقة العربية توسعًا في الاستثمارات وتطوير الأندية والأكاديميات والمنشآت، مع اهتمام متزايد باكتشاف المواهب ورفع مستوى المنافسة. وتبرز السعودية وقطر والمغرب ضمن الدول التي تستثمر في تطوير القطاع الرياضي، كلٌّ وفق أولوياته وبرامجه.",
      "ومع هذا النمو، تتزايد الحاجة إلى مؤسسات رياضية قادرة على تطوير الرياضيين، وإدارة مواردها بكفاءة، وتحسين تجربة الأعضاء، وبناء مصادر دخل مستدامة. وتفتح التكنولوجيا فرصًا جديدة لتحقيق ذلك، من خلال الأنظمة الرقمية والأتمتة والذكاء الاصطناعي وعلوم البيانات وتقنيات قياس الأداء.",
      "تساعد ترانسفورمكس المؤسسات الرياضية على تطوير قدراتها الإدارية والتشغيلية والرقمية، بما يتناسب مع أهدافها وطبيعة أنشطتها.",
    ],
    photo: photo("technology", "مدرب يتابع بيانات أداء رياضي على جهاز لوحي أثناء تمرين في صالة رياضية", 600, 0.18),
    far: true,
  },
  {
    id: "clubs",
    title: "الأندية وتجربة الأعضاء",
    subtitle: "إدارة متكاملة وعلاقة أقوى مع الأعضاء",
    paragraphs: [
      "تطوير إدارة الأندية الرياضية وعملياتها، بما يشمل العضويات والاشتراكات والانتخابات والجمعيات العمومية والمرافق والأنشطة والموارد المالية والتشغيلية.",
      "وتساعد المنصات الرقمية على تحسين تجربة الأعضاء في التسجيل والتجديد والحجوزات والفعاليات والطلبات والتواصل، مع تعزيز الشفافية وإتاحة تقارير واضحة عن أعمال النادي وإنجازاته.",
      "وتشمل هذه المنظومة إدارة الأكاديميات والفرق الرياضية التابعة للنادي، وربط أنشطتها بالإدارة والموارد ومؤشرات الأداء.",
    ],
    action: { label: "طوّر تجربة أعضاء ناديك" },
    photo: photo("clubs", "موظف استقبال يرحب بعضو في نادٍ رياضي", 520, 0.22),
    tinted: true,
  },
  {
    id: "sports-academies",
    title: "منظومة الأكاديميات الرياضية",
    subtitle: "أكاديمية واحدة، وأطراف متعددة، وتجربة مترابطة",
    paragraphs: [
      "يمكن أن تعمل الأكاديمية داخل نادٍ أو مدرسة أو جامعة، أو كمشروع استثماري مستقل. وفي جميع الحالات، ترتبط نجاحاتها بجودة التدريب، وتطور الرياضيين، وثقة أولياء الأمور، وكفاءة الإدارة.",
      "تساعد المنصات الرقمية على تنظيم البرامج والجداول والحضور والاشتراكات والتقييمات، وربط إدارة الأكاديمية بالمدربين والرياضيين وأولياء الأمور. ويحصل كل طرف على المعلومات والخدمات المناسبة لدوره، بما يحسن التواصل ومتابعة التقدم الرياضي.",
      "وتتيح هذه المنظومة للأندية والمدارس والجامعات والمستثمرين تطوير برامج رياضية أكثر تنظيمًا، وتوسيع المشاركة، وبناء مصادر إيرادات إضافية.",
    ],
    action: { label: "طوّر منظومة أكاديميتك" },
    photo: photo("academies", "مدرب يشرح خطة على جهاز لوحي لمجموعة من اللاعبين الناشئين في الملعب", 620),
    far: true,
  },
  {
    id: "performance",
    title: "الأداء الرياضي الذكي",
    subtitle: "تطوير الرياضيين بقرارات تدعمها البيانات",
    paragraphs: [
      "تساعد بيانات التدريب والاختبارات والأجهزة القابلة للارتداء والمستشعرات على متابعة الأداء والأحمال التدريبية والتطور البدني والفني، وفق متطلبات كل رياضة.",
      "وتتيح علوم البيانات والذكاء الاصطناعي تطوير التحليلات ولوحات المؤشرات وأدوات دعم القرار، بما يساعد المدربين والمختصين على تقييم البرامج والتخطيط للتدريب ومتابعة الرياضيين.",
      "وتشمل قدراتنا تطوير التطبيقات والتحليلات والتكامل مع التقنيات المتخصصة، دون أن تحل التكنولوجيا محل الخبرة الرياضية والطبية.",
    ],
    action: { label: "استكشف حلول الأداء الرياضي", href: "/services/data-science" },
    photo: photo("performance", "مدرب يراجع بيانات الأداء على جهاز لوحي بينما يتدرب رياضي في الملعب", 520),
  },
  {
    id: "operations",
    title: "التشغيل الذكي",
    subtitle: "عمليات أكثر تنظيمًا وموارد أفضل استخدامًا",
    paragraphs: [
      "تساعد الأنظمة المتكاملة والأتمتة على إدارة المنشآت والحجوزات والمدفوعات والفعاليات والموارد، وتقليل الأعمال اليدوية وتكرار البيانات.",
      "وتوفر التقارير التشغيلية والمالية رؤية أوضح للإدارة حول استخدام المرافق، والإقبال على البرامج، والتكاليف والإيرادات، بما يدعم التخطيط وتحسين الخدمات.",
    ],
    action: { label: "طوّر عملياتك الرياضية" },
    photo: photo("operations", "موظف يدير الحجوزات على جهاز لوحي داخل منشأة رياضية", 440),
    far: true,
  },
  {
    id: "investment",
    title: "الاستثمار والاقتصاد الرياضي",
    subtitle: "فرص نمو تتجاوز الاشتراكات والأنشطة التقليدية",
    paragraphs: [
      "تتوسع فرص الاستثمار الرياضي عبر الأندية والأكاديميات والمنشآت والفعاليات والرعاية والشراكات التجارية. ويتطلب نجاح هذه المشروعات فهم احتياجات السوق، وتطوير نماذج أعمال مناسبة، ومتابعة الأداء والعائد والمخاطر.",
      "تساعد الحلول الإدارية والرقمية على تقييم الطلب، وإدارة العلاقات مع الشركاء والرعاة، وتحليل الإيرادات والتكاليف، وتطوير خدمات ومصادر دخل جديدة.",
      "وتربط المنظومة الاقتصادية بين المستثمرين والمشغلين والأندية والأكاديميات والرياضيين والأسر والشركاء، بما يدعم استدامة الأنشطة وإعادة الاستثمار في تطوير المواهب والخدمات.",
    ],
    action: { label: "ناقش فرص الاستثمار الرياضي" },
    photo: photo("investment", "اجتماع أعمال لمناقشة فرص الاستثمار الرياضي", 580, 0.21),
  },
  {
    id: "quality-of-life",
    title: "الرياضة وجودة الحياة",
    subtitle: "أثر يمتد إلى الأسرة والمجتمع",
    paragraphs: [
      "تسهم البرامج الرياضية المدرسية والمجتمعية في توسيع المشاركة في النشاط البدني، وتشجيع الأسر على تبني عادات أكثر نشاطًا واهتمامًا بالصحة والتغذية.",
      "ويساعد تطوير الأندية والأكاديميات والبرامج الرياضية على إتاحة فرص أفضل للمشاركة والتعلم والتدريب، وتعزيز القيمة المجتمعية للاستثمار في الرياضة.",
    ],
    action: { label: "استكشف تطوير البرامج الرياضية" },
    photo: photo("quality", "أسرة تمارس رياضة المشي في حديقة", 440),
    far: true,
  },
];

/* Figma 4781:5989, in reading order. */
const OPERATORS = ["نادي", "مدرسة", "جامعة", "مستثمر"] as const;
const ROLES = [
  { title: "المدربون", text: "التدريب والتقييم" },
  { title: "الرياضيون", text: "الأنشطة والتطور" },
  { title: "أولياء الأمور", text: "المتابعة والتواصل" },
] as const;

/** Who runs a sports academy, what it holds together, and whom it serves. */
function OperatingModel() {
  return (
    <Reveal as="figure" className={sector.model} aria-labelledby="sports-model-heading">
      <h3 id="sports-model-heading" className={sector.modelTitle}>
        النموذج التشغيلي للأكاديمية الرياضية
      </h3>
      <ul className={sector.modelRow}>
        {OPERATORS.map((operator) => (
          <li key={operator} className={sector.modelNode}>
            <span className={sector.modelNodeTitle}>{operator}</span>
          </li>
        ))}
      </ul>
      <span className={sector.modelArrow} aria-hidden>
        ↓
      </span>
      <div className={sector.modelCore}>
        <p className={sector.modelCoreTitle}>الأكاديمية الرياضية</p>
        <p className={sector.modelCoreText}>البرامج · التدريب · الاشتراكات · التقييمات · التواصل</p>
      </div>
      <span className={sector.modelArrow} aria-hidden>
        ↓
      </span>
      <ul className={`${sector.modelRow} ${sector.modelRoles}`}>
        {ROLES.map((role) => (
          <li key={role.title} className={sector.modelNode}>
            <span className={sector.modelNodeTitle}>{role.title}</span>
            <span className={sector.modelNodeText}>{role.text}</span>
          </li>
        ))}
      </ul>
      <figcaption className={sector.modelNote}>
        نموذج مفاهيمي يوضح الجهات المشغلة والأطراف المستفيدة، وليس مواصفات منتج جاهز.
      </figcaption>
    </Reveal>
  );
}

/** Figma 4781:5929 — القطاع الرياضي (tablet 4782:6068, mobile 4782:6388). */
export default function SportsSectorPage() {
  const [technology, clubs, academy, ...rest] = STORIES;
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${sectorPage} ${tajawal.variable}`}>
        <SectorBanner
          id="sports-banner-heading"
          image="/images/sectors/sports/banner.jpg"
          title="القطاع الرياضي"
          text="صناعة رياضية أكثر تنافسية واستدامة"
          actions={[
            { label: "ناقش مشروعك الرياضي", tone: "inverse" },
            { label: "استكشف مجالات التطوير", href: "#sports-technology", tone: "outlineInverse" },
          ]}
        />

        <SectorStory story={technology} />
        <SectorStory story={clubs} />
        <SectorStory story={academy}>
          <OperatingModel />
        </SectorStory>
        {rest.map((story) => (
          <SectorStory key={story.id} story={story} />
        ))}

        <ClosingCard
          id="sports-closing-heading"
          title="لنطوّر مشروعك الرياضي"
          text="سواء كنت تدير ناديًا أو أكاديمية، أو تطور نشاطًا رياضيًا داخل مدرسة أو جامعة، أو تستثمر في منشأة أو مشروع رياضي، نساعدك على تحديد فرص التطوير واختيار القدرات الإدارية والتقنية المناسبة لأهدافك."
          actions={[
            { label: "ناقش مشروعك معنا" },
            { label: "تواصل مع فريقنا", href: "/contact", tone: "outline" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
