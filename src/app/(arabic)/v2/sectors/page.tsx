import type { Metadata } from "next";
import { PageBody } from "@/components/v2/layout/PageBody";
import { SectorChapter, type Sector } from "@/components/v2/sectors/SectorChapter";
import { CardSection } from "@/components/v2/sections/CardSection";
import { CtaBanner } from "@/components/v2/sections/CtaBanner";
import { PageIntro } from "@/components/v2/sections/PageIntro";

export const metadata: Metadata = {
  title: "القطاعات",
  description:
    "تختلف رحلة المستخدم ودورات العمل ومصادر البيانات من قطاع إلى آخر. نبدأ بفهم هذه الاختلافات، ثم نربطها بالخدمة المناسبة بدل تقديم وصفة موحدة.",
};

/* Figma 3693:66276 – 3693:66315, top to bottom. */
const SECTORS: Sector[] = [
  {
    id: "industry",
    icon: "/v2/icons/factory.svg",
    title: "قطاع الصناعة",
    lead: "ربط الصورة التشغيلية من أرض المصنع إلى القرار الإداري، مع مراعاة طبيعة الإنتاج والموارد ودورات التوريد.",
    priorities: [
      "وضوح مؤشرات الإنتاج والجودة",
      "ترابط المخزون والمشتريات والتخطيط",
      "تأهيل الفرق لاستخدام الأدوات الرقمية",
    ],
    services:
      "تحليل بيانات التشغيل، ودراسة أنظمة ERP، ومواقع تعريفية بالقدرات والمنتجات، ومسارات تدريب مرتبطة بالعمل الصناعي.",
    image: { src: "/v2/images/sectors-industry.png", alt: "خط إنتاج في مصنع", width: 530, height: 574 },
    imageSide: "left",
    layout: { copy: 655, gap: 32, rhythm: 20, leadWidth: 521, servicesWidth: 539 },
  },
  {
    id: "tourism",
    icon: "/v2/icons/map-pinned.svg",
    title: "قطاع السياحة",
    lead: "حضور رقمي يساعد المستفيد على فهم التجربة واختيارها، ويمنح الفريق رؤية أوضح لرحلة الزائر.",
    priorities: [
      "وضوح عرض الوجهات والخدمات",
      "اتساق المحتوى عبر القنوات",
      "قراءة تفضيلات المستفيد ومصادر الطلب",
    ],
    services:
      "تطوير مواقع وتجارب رقمية، ومحتوى وتصميم للحملات، وتحليل بيانات الاستفسارات والاهتمام بحسب المصادر المتاحة.",
    image: { src: "/v2/images/sectors-tourism.png", alt: "زوار في وجهة سياحية بين الجبال", width: 530, height: 500 },
    imageSide: "right",
    layout: { copy: 673, gap: 32, rhythm: 12, leadWidth: 555, servicesWidth: 538 },
  },
  {
    id: "cooperatives",
    icon: "/v2/icons/sectors-handshake.svg",
    title: "قطاع التعاونيات السعودية",
    lead: "أدوات تدعم العمل المشترك، وتنظم العلاقة بين الإدارة والأعضاء، وتُظهر الخدمات والمبادرات بوضوح.",
    priorities: [
      "تنظيم بيانات الأعضاء والخدمات",
      "وضوح الإجراءات والصلاحيات",
      "دعم التواصل والحوكمة الداخلية",
    ],
    services:
      "بوابات تعريفية وخدمية، وتحليل بيانات العضوية والأنشطة، وتنظيم العمليات، وبرامج معرفية في إدارة العمل التعاوني.",
    image: { src: "/v2/images/sectors-cooperatives.png", alt: "أعضاء جمعية زراعية في مشتل", width: 530, height: 553 },
    imageSide: "left",
    layout: { copy: 678, gap: 32, rhythm: 20, leadWidth: 526, servicesWidth: 552 },
  },
  {
    id: "education",
    icon: "/v2/icons/graduation-cap.svg",
    title: "قطاع التعليم",
    lead: "تجربة أوضح للمستفيد، وبيانات تساعد على فهم العمليات والخدمات التعليمية دون فصلها عن السياق.",
    priorities: [
      "تسهيل الوصول إلى المعلومات والخدمات",
      "تنظيم البيانات والتقارير الإدارية",
      "بناء قدرات الفرق على الاستخدام",
    ],
    services:
      "تطوير مواقع المؤسسات والبرامج، ولوحات مؤشرات إدارية، وتصميم محتوى رقمي، ودراسة تكامل العمليات والأنظمة.",
    image: { src: "/v2/images/sectors-education.png", alt: "طلاب في مكتبة جامعية", width: 556, height: 556 },
    imageSide: "right",
    layout: { copy: 568, gap: 106, rhythm: 20 },
  },
];

/** Figma "القطاعات" (3693:66230). */
export default function SectorsV2() {
  return (
    <PageBody>
      <PageIntro
        crumbs={[{ label: "القطاعات" }]}
        title="نفهم خصوصية القطاع، لنصمم الحل الأقرب لواقعه."
        lead="تختلف رحلة المستخدم ودورات العمل ومصادر البيانات من قطاع إلى آخر. نبدأ بفهم هذه الاختلافات، ثم نربطها بالخدمة المناسبة بدل تقديم وصفة موحدة."
        width={672}
      />

      {SECTORS.map((sector) => (
        <SectorChapter key={sector.id} sector={sector} />
      ))}

      <CardSection
        eyebrow="منهجية مشتركة، وتطبيق مختلف"
        title="نقطة الانطلاق دائمًا: من يستخدم الحل؟"
        items={[
          {
            icon: "/v2/icons/users-round.svg",
            title: "المستفيدون",
            text: "فهم الأعضاء أو الزوار أو المتعلمين أو فرق التشغيل.",
          },
          {
            icon: "/v2/icons/workflow.svg",
            title: "دورة العمل",
            text: "رسم الإجراءات ونقاط التسليم والاعتماد بين الأطراف.",
          },
          {
            icon: "/v2/icons/database.svg",
            title: "البيانات",
            text: "تحديد ما يتوفر من معلومات وما يحتاج إلى تحسين.",
          },
        ]}
      />

      <CtaBanner
        title="لنتحدث عن تحديات قطاعك."
        text="شاركنا طبيعة نشاطك والفئات التي تخدمها، لنناقش احتياجك في سياقه الصحيح."
      />
    </PageBody>
  );
}
