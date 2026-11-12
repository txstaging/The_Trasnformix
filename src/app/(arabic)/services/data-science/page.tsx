import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import {
  Closing,
  FlowDiagram,
  kit,
  ProcessSteps,
  SectionIntro,
  ServiceHero,
  type FlowStep,
} from "@/components/services/ServiceKit";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "علوم البيانات والذكاء الرقمي | Transformix",
  description:
    "نساعد المؤسسات على الاستفادة من بياناتها بحلول قابلة للتشغيل ترتبط بمؤشرات أداء محددة: الأتمتة والذكاء الاصطناعي، والتنبؤ وذكاء الأعمال، وذكاء العملاء، وبنية البيانات وحوكمتها.",
};

/* Figma 4473:8835 — the team beside the principle it works by. */
const TEAM = {
  title: "خبرات متكاملة تعمل مع فريقك",
  text: "يضم فريق العمل خبرات في تحليل البيانات وتطوير النماذج وهندسة الحلول، بالتعاون مع المختصين بالعمليات داخل المؤسسة. نجمع فهم الأعمال والتنفيذ التقني لتحويل البيانات إلى حلول يمكن استخدامها يوميًا.",
};

const PRINCIPLE = {
  title: "نقيّم النجاح بفائدته للأعمال",
  text: "لا بمستوى الدقة التقنية وحده. نراعي قابلية التنفيذ والتشغيل، ووضوح النتائج للمستخدمين، واحتياجات التطوير المستقبلية.",
};

/* Figma 4473:8842, in reading order. */
const VALUE_FLOW = ["مصادر وبيانات غير مستثمرة", "حلول ونماذج قابلة للتشغيل", "قرارات ومؤشرات قابلة للقياس"];

/* Figma 4473:8860 */
const STEPS = [
  {
    title: "المواءمة الاستراتيجية وتحديد النطاق",
    text: "نحدد القرار ومؤشرات الأداء والمسؤول عن اعتماد النتائج. نراجع جودة البيانات والميزانية والقيود التقنية ومتطلبات الاستخدام المسؤول قبل التطوير.",
  },
  {
    title: "البناء والنشر بجودة تشغيلية",
    text: "مراحل تطوير قصيرة ومراجعة مستمرة. قد نستخدم لوحة مبكرة بأداة Streamlit لاختبار البيانات والمنطق التحليلي وتجربة الاستخدام مع الفريق المستفيد قبل التشغيل النهائي.",
  },
  {
    title: "القياس والتحسين",
    text: "نتابع أداء الحل ومدى استخدامه ونتائجه الفعلية بعد الإطلاق. نستفيد من دورة RADAR لتقييم ما تحقق ومراجعة طريقة العمل وتحديد التحسينات.",
  },
] as const;

/* Figma 4473:8885 — the RADAR loop in two rows, each in reading order. */
const RADAR_FIRST: readonly FlowStep[] = [
  { label: "النتائج", en: "Results" },
  { label: "المنهج", en: "Approach" },
  { label: "التطبيق", en: "Deployment" },
];

const RADAR_SECOND: readonly FlowStep[] = [
  { label: "التقييم واستخلاص الدروس", en: "Assess & Synthesize" },
  { label: "التحسين", en: "Refine" },
];

type Capability = {
  slug: string;
  title: string;
  text: string;
  image: string;
  need: string;
  /** In reading order, two to a row; an odd last one spans the row. */
  scope: readonly { title: string; text: string }[];
  applications: string;
  flow: readonly string[];
  note?: string;
};

/* Figma 4473:8911 — the four capabilities, each with its need, scope,
   applications and flow. */
const CAPABILITIES: readonly Capability[] = [
  {
    slug: "automation",
    title: "الأتمتة والكفاءة المدعومتان بالذكاء الاصطناعي",
    text: "نطوّر مسارات أتمتة ووكلاء ذكاء اصطناعي لتنفيذ مهام مترابطة بين الأنظمة، مع ضوابط للصلاحيات والمتابعة؛ من معالجة المستندات وتبادل البيانات إلى الاستجابة للطلبات المتكررة.",
    image: "/images/services/data/capability-1.jpg",
    need: "عند تكرار إدخال البيانات يدويًا، أو معالجة أعداد كبيرة من الرسائل والمستندات، أو انتقال المعاملة بين أكثر من نظام، أو تأثر أوقات الاستجابة بكثرة الخطوات اليدوية.",
    scope: [
      {
        title: "سير العمل والتكامل",
        text: "رسم العمليات لتحديد فرص الأتمتة الأكثر تأثيرًا، وإعداد المشغلات وتدفق البيانات بين المتاجر الإلكترونية وأنظمة CRM وWhatsApp.",
      },
      {
        title: "الحوكمة والتحكم",
        text: "اتفاقيات مستوى الخدمة وحدود الطلبات وآليات الموافقة على الخطوات الحساسة؛ مع مهلة زمنية وصلاحيات محددة وبوابات موافقة قبل الإجراءات عالية الأثر.",
      },
      {
        title: "الاعتمادية المؤسسية",
        text: "معالجة آمنة للتكرار (Idempotency)، ومحاولات إعادة التشغيل، وطوابير الرسائل المتعثرة، والسجلات التفصيلية.",
      },
      {
        title: "وكلاء بأدوات معتمدة",
        text: "حصر الوكلاء في أدوات البحث وCRM والبريد المصرح بها، وتوثيق تسلسل الإجراءات. تستخدم النماذج اللغوية لفهم الرسائل وتذاكر الدعم والمحتوى غير المنظم وتنفيذ خطوات مضبوطة.",
      },
      {
        title: "المعالجة الذكية للمستندات",
        text: "استخلاص بيانات الفواتير والتقارير والمستندات الممسوحة ضوئيًا وتنظيمها باستخدام OCR وتقنيات المعالجة الذكية.",
      },
    ],
    applications: "وكلاء الذكاء الاصطناعي · روبوتات المحادثة والمساعدون الافتراضيون · أتمتة تدفقات العمل والعمليات · الصيانة التنبؤية · المعالجة الذكية للمستندات (IDP)",
    flow: ["البريد والمستندات وCRM والمتاجر", "وكلاء ومسارات تكامل مضبوطة", "تنفيذ المهام والتدقيق والموافقة"],
  },
  {
    slug: "predictive",
    title: "الذكاء التنبؤي وذكاء الأعمال",
    text: "نطوّر نماذج للتنبؤ بالطلب والمبيعات والمخاطر وسلوك العملاء، ونربط نتائجها بلوحات ذكاء أعمال تعرض المؤشرات وتفسر التغيرات وتدعم القرارات اليومية والتخطيطية.",
    image: "/images/services/data/capability-2.jpg",
    need: "عندما تتعارض الأرقام بين التقارير، أو يتغير الطلب والمخزون دون توقعات موثوقة، أو تعرض لوحات المتابعة بيانات كثيرة دون تفسير كافٍ لما يحدث.",
    scope: [
      {
        title: "التنبؤ والنمذجة",
        text: "اختيار نماذج للسلاسل الزمنية المستقرة والأنماط المعقدة والمتغيرة؛ وبناء نماذج تعلم آلة للتنبؤ والاحتفاظ بالعملاء وتقييم المخاطر.",
      },
      {
        title: "اختبار دقة التنبؤ",
        text: "اختبار تاريخي وتحقق متقاطع متحرك، باستخدام مقاييس WAPE وMAPE والانحياز.",
      },
      {
        title: "لوحات وعروض بحسب الدور",
        text: "واجهات متخصصة للقرار المطلوب: بطاقات مؤشرات للقيادات، وتحليل تفصيلي للمديرين، وشاشات تشغيلية للفرق.",
      },
      {
        title: "تفسير التغيرات",
        text: "تحليل الموسمية ومخططات الضبط لاكتشاف الحالات غير المعتادة، مع تصوير البيانات وسرد نتائج النماذج بصورة مفهومة للمتخصصين وغير المتخصصين.",
      },
      {
        title: "التحليل الذاتي الآمن",
        text: "مجموعات بيانات معتمدة ومرشحات آمنة تتيح للمستخدمين استكشاف البيانات بضوابط واضحة.",
      },
    ],
    applications: "توقع المبيعات والطلب · التحليلات التنبؤية · كشف الاحتيال · تحليل احتمالات فقد العملاء · لوحات ذكاء الأعمال (BI) · تحليل سلة المشتريات",
    flow: ["بيانات تاريخية وتشغيلية", "نماذج توقع واختبار الدقة", "لوحات مؤشرات وإجراءات تشغيلية"],
  },
  {
    slug: "customers",
    title: "التخصيص وذكاء العملاء",
    text: "نحلّل بيانات العملاء وتفاعلاتهم لتطوير شرائح أكثر دقة، وتوصيات ملائمة، وعروض تستند إلى أنماط الاستخدام والشراء. ونستخدم تحليل الآراء والمشاعر لفهم تجربة العميل وتحسين التواصل معه.",
    image: "/images/services/data/capability-3.jpg",
    need: "عندما يصعب تفسير نتائج رضا العملاء، أو تُوجّه العروض نفسها لجميع الشرائح، أو تتراكم شكاوى العملاء وآراؤهم في قنوات متعددة دون تحليل منظم.",
    scope: [
      {
        title: "معالجة اللغة وتحليل المشاعر",
        text: "نماذج Transformer لتحليل الانطباع والجوانب الموضوعية في التقييمات والتذاكر والمنصات الاجتماعية.",
      },
      {
        title: "أنظمة التوصية",
        text: "ترشيح المنتجات والمحتوى بناءً على تاريخ الاستخدام والسلوك وخصائص العناصر.",
      },
      {
        title: "هندسة الخصائص والتقسيم",
        text: "دمج الحداثة والتكرار والقيمة المالية (RFM) مع خصائص السلوك، وتوظيف التجميع (Clustering) لتكوين شرائح عملية بحسب السلوك والقيمة العمرية للعميل (CLV).",
      },
      {
        title: "التفعيل وقياس الأثر",
        text: "إرسال الشرائح والإجراءات المقترحة إلى CRM ومنصات الإعلانات والمنتجات، وتقدير من قد يغيّر سلوكه بسبب عرض معين لقياس الأثر الإضافي الحقيقي للحملات.",
      },
    ],
    applications: "توصيات المنتجات الشخصية · منصات ذكاء العملاء (CIP) · تحليل رحلة العميل · تقسيم العملاء · التخصيص فائق الدقة · تحليل المشاعر",
    flow: ["التفاعلات والمشتريات والآراء", "تقسيم وتحليل السلوك والمشاعر", "توصية وتخصيص وتفعيل متعدد القنوات"],
  },
  {
    slug: "foundations",
    title: "البنية الأساسية للبيانات وحوكمتها",
    text: "نصمم بنية بيانات تجمع المعلومات من مصادر المؤسسة وتنظمها بصورة قابلة للاستخدام، بما يشمل التكامل بين الأنظمة، ومستودعات البيانات، وضوابط الجودة والصلاحيات والحوكمة.",
    image: "/images/services/data/capability-4.jpg",
    need: "عندما تكون البيانات موزعة بين الأنظمة والإدارات، أو لا تتفق الفرق على تعريف المؤشرات، أو تتأخر التقارير بسبب صعوبة استخراج البيانات والتحقق منها.",
    scope: [
      {
        title: "مستودعات وهندسة بيانات حديثة",
        text: "مستودعات مركزية قابلة للتوسع تحفظ البيانات باتساق وكفاءة، وربط ERP وCRM وواجهات API والمصادر الأخرى وتنظيمها للاستخدام.",
      },
      {
        title: "معالجة البيانات وتتبع تحوّلاتها",
        text: "تحميل البيانات ثم تحويلها داخل بيئتها، مع الحفاظ على التتبع والمرونة.",
      },
      {
        title: "تعريفات ومسؤوليات موحدة",
        text: "تعريفات مشتركة للمؤشرات، وتحديد مالكي البيانات ومسؤوليات الجودة، ومسرد الأعمال وقاموس البيانات.",
      },
      {
        title: "الحماية منذ التصميم",
        text: "التحكم في الصلاحيات، وإخفاء البيانات الحساسة، ودمج ضوابط الامتثال في التصميم عبر جميع طبقات البيانات.",
      },
    ],
    applications: "إدارة البيانات الرئيسية (MDM) · حوكمة البيانات · أمن البيانات · إدارة جودة البيانات · مسرد الأعمال وقاموس البيانات · إدارة الامتثال",
    flow: ["مصادر البيانات ERP / CRM / API", "المعالجة والمستودع والجودة والتعريفات", "تحليلات موثوقة وذكاء اصطناعي"],
    note: "الحوكمة والصلاحيات والحماية تشمل جميع الطبقات.",
  },
];

const pad = (index: number) => String(index + 1).padStart(2, "0");

/** Figma 4473:8787 — علوم البيانات والذكاء الرقمي. */
export default function DataSciencePage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="data-heading"
          image="/images/services/data/hero.jpg"
          kicker="علوم البيانات والذكاء الرقمي"
          title="ما وراء النماذج: قيمة تجارية قابلة للقياس من بياناتك"
          text="نساعد المؤسسات على الاستفادة من البيانات الموجودة في أنظمتها، حتى عندما تكون موزعة بين الإدارات أو يصعب جمعها وتحليلها. نطوّر حلولًا قابلة للتشغيل، ترتبط بمؤشرات أداء محددة وتدعم قرارات تستند إلى معلومات موثوقة."
          actions={[{ label: "ناقش مشروع البيانات" }, { label: "استكشف قدراتنا", href: "#capabilities" }]}
          wide
        />

        <section className={kit.section} aria-labelledby="data-team-heading">
          <SectionIntro
            id="data-team-heading"
            kicker="الخدمة وفريق العمل"
            title="نبدأ بالقرار، لا بالتقنية"
            text="نبدأ بتحديد القرار الذي تحتاج المؤسسة إلى دعمه، ثم نختار الحل التقني المناسب ونقيس نتائجه بعد التشغيل. وبذلك تصبح البيانات أصلًا يمكن الاعتماد عليه في أعمال المؤسسة وتطويرها."
          />
          <div className={styles.team}>
            <Reveal className={styles.teamIntro}>
              <h3 className={kit.cardTitle}>{TEAM.title}</h3>
              <p className={kit.cardText}>{TEAM.text}</p>
            </Reveal>
            <Reveal className={styles.principle} delay={80}>
              <h3 className={kit.cardTitle}>{PRINCIPLE.title}</h3>
              <p className={kit.cardText}>{PRINCIPLE.text}</p>
            </Reveal>
          </div>
          <Reveal>
            <FlowDiagram steps={VALUE_FLOW} />
          </Reveal>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="data-framework-heading">
          <SectionIntro
            id="data-framework-heading"
            title="من هدف واضح إلى حل يعمل ويتحسّن"
            text="ثلاث مراحل مترابطة: الاتفاق على هدف ومؤشرات لقياسه، ثم تطوير الحل وتشغيله، وأخيرًا متابعة الأداء وتحسينه."
            center
          />
          <ProcessSteps steps={STEPS} roomy />
          <Reveal className={styles.radar}>
            <h3 className={`${kit.cardTitle} ${styles.radarTitle}`}>
              حلقة مستمرة للتقييم والتحسين — <span lang="en">RADAR</span>
            </h3>
            <FlowDiagram steps={RADAR_FIRST} />
            <span className={styles.radarTurn} aria-hidden="true">
              ↓
            </span>
            <FlowDiagram
              steps={RADAR_SECOND}
              note="↻ يعاد التقييم بعد التحسين لبدء حلقة جديدة؛ نراجع النتائج والمنهج والتطبيق بصورة مستمرة."
            />
          </Reveal>
        </section>

        {CAPABILITIES.map((capability, index) => {
          const heading = `data-${capability.slug}-heading`;
          const scope = `data-${capability.slug}-scope`;
          return (
            <section
              key={capability.slug}
              id={index === 0 ? "capabilities" : undefined}
              className={index % 2 ? `${kit.section} ${kit.tinted}` : kit.section}
              aria-labelledby={heading}
            >
              <div className={styles.overview}>
                <Reveal className={`${kit.card} ${styles.overviewCard}`}>
                  <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                    {pad(index)}
                  </span>
                  <h2 id={heading} className={kit.cardTitle}>
                    {capability.title}
                  </h2>
                  <p className={kit.cardText}>{capability.text}</p>
                  <a href={`#${scope}`} className={kit.cardLink}>
                    نطاق تقني مرتبط باحتياج أعمالك
                  </a>
                </Reveal>
                <Reveal className={styles.overviewMedia} delay={80}>
                  <Image
                    className={styles.overviewImage}
                    src={capability.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 330px"
                  />
                </Reveal>
              </div>

              <Reveal className={styles.need}>
                <p className={styles.label}>متى تحتاج المؤسسة إلى هذه الخدمة؟</p>
                <p className={kit.cardText}>{capability.need}</p>
              </Reveal>

              <h3 id={scope} className={`${kit.cardTitle} ${styles.scopeTitle}`}>
                نطاق العمل والقدرات
              </h3>
              <ul className={styles.scope}>
                {capability.scope.map((item, itemIndex) => (
                  <Reveal as="li" key={item.title} className={styles.scopeItem} delay={(itemIndex % 2) * 60}>
                    <h4 className={kit.cardTitle}>{item.title}</h4>
                    <p className={kit.cardText}>{item.text}</p>
                  </Reveal>
                ))}
              </ul>

              <Reveal className={styles.applications}>
                <p className={styles.label}>تطبيقات تخدم أعمالك</p>
                <p className={kit.cardText}>{capability.applications}</p>
              </Reveal>

              <Reveal>
                <FlowDiagram steps={capability.flow} note={capability.note} />
              </Reveal>
            </section>
          );
        })}

        <Closing
          id="data-closing-heading"
          title="بيانات موثوقة، وتحليل قابل للاستخدام"
          text="نراجع مع مؤسستك مصادر البيانات واحتياجات فرق العمل، ونحدد الأولويات التي يمكن تحويلها إلى مشروع قابل للتنفيذ والقياس؛ من تأسيس البيانات وتطوير التحليلات إلى تشغيل النماذج والتكامل مع أنظمتك القائمة."
          actions={[{ label: "ناقش مشروع البيانات" }]}
        />
      </main>
      <Footer />
    </>
  );
}
