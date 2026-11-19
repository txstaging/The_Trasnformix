import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PillButton } from "@/components/ui/PillButton";
import {
  kit,
  SectionIntro,
  ServiceHero,
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

/* Figma 4473:8842, in right-to-left reading order. */
const VALUE_FLOW = ["قرارات ومؤشرات قابلة للقياس", "حلول ونماذج قابلة للتشغيل", "مصادر وبيانات غير مستثمرة"];

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

const RADAR_STEPS = ["التطبيق", "المنهج", "النتائج", "التحسين", "التقييم واستخلاص الدروس"];

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

const SCOPE_ICONS: Record<string, readonly string[]> = {
  automation: ["workflow", "home-shield-check", "refresh-cw", "home-network", "home-book-open"],
  predictive: ["marketing-chart", "clipboard-check", "home-chart-90", "data-chart", "home-shield-check"],
  customers: ["messages-square", "marketing-sparkles", "target", "marketing-chart", "users-round"],
  foundations: ["data-database", "refresh-cw", "home-book-open", "home-shield-check"],
};

/** Figma 4473:8787 — علوم البيانات والذكاء الرقمي. */
export default function DataSciencePage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="data-heading"
          image="/images/p18.png"
          title="ما وراء النماذج: قيمة تجارية قابلة للقياس من بياناتك"
          text="نساعد المؤسسات على الاستفادة من البيانات الموجودة في أنظمتها، حتى عندما تكون موزعة بين الإدارات أو يصعب جمعها وتحليلها. نطوّر حلولًا قابلة للتشغيل، ترتبط بمؤشرات أداء محددة وتدعم قرارات تستند إلى معلومات موثوقة."
          actions={[{ label: "ناقش مشروع البيانات" }]}
          wide
        />

        <section className={kit.section} aria-labelledby="data-team-heading">
          <SectionIntro
            id="data-team-heading"
            title="نبدأ بالقرار، لا بالتقنية"
            text="نبدأ بتحديد القرار الذي تحتاج المؤسسة إلى دعمه، ثم نختار الحل التقني المناسب ونقيس نتائجه بعد التشغيل. وبذلك تصبح البيانات أصلًا يمكن الاعتماد عليه في أعمال المؤسسة وتطويرها."
            center
          />
          <div className={styles.team}>
            <Reveal className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">
                <Image src="/v2/icons/data-chart.svg" alt="" width={24} height={24} />
              </span>
              <div>
                <h3 className={kit.cardTitle}>{PRINCIPLE.title}</h3>
                <p className={kit.cardText}>{PRINCIPLE.text}</p>
              </div>
            </Reveal>
            <Reveal className={styles.featureCard} delay={80}>
              <span className={styles.featureIcon} aria-hidden="true">
                <Image src="/v2/icons/users-round.svg" alt="" width={24} height={24} />
              </span>
              <div>
                <h3 className={kit.cardTitle}>{TEAM.title}</h3>
                <p className={kit.cardText}>{TEAM.text}</p>
              </div>
            </Reveal>
          </div>
          <Reveal className={styles.dataFlow}>
            <ol className={styles.dataFlowSteps}>
              {VALUE_FLOW.map((label, index) => (
                <li key={label}>
                  <span className={styles.flowNumber} dir="ltr">{index + 1}</span>
                  <span>{label}</span>
                  {index < VALUE_FLOW.length - 1 && <span className={styles.flowArrow} aria-hidden="true">←</span>}
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className={`${kit.section} ${kit.tinted} ${styles.frameworkSection}`} aria-labelledby="data-framework-heading">
          <SectionIntro
            id="data-framework-heading"
            title="من هدف واضح إلى حل يعمل ويتحسّن"
            text="ثلاث مراحل مترابطة: الاتفاق على هدف ومؤشرات لقياسه، ثم تطوير الحل وتشغيله، وأخيرًا متابعة الأداء وتحسينه."
            center
          />
          <ol className={styles.frameworkCards}>
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} className={styles.frameworkCard} delay={index * 80}>
                <span className={styles.frameworkIcon} aria-hidden="true">
                  <Image
                    src={["/v2/icons/target.svg", "/v2/icons/web-code-xml.svg", "/icons/lucide-chart-no-axes-combined.svg"][index]}
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
                <h3 className={kit.cardTitle}>{step.title}</h3>
                <p className={kit.cardText}>{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className={styles.radar}>
            <div className={styles.radarCopy}>
              <h3 className={`${kit.cardTitle} ${styles.radarTitle}`}>
                حلقة مستمرة للتقييم والتحسين — <span lang="en">RADAR</span>
              </h3>
              <p>يعاد التقييم بعد التحسين لبدء حلقة جديدة؛ نراجع النتائج والمنهج والتطبيق بصورة مستمرة.</p>
            </div>
            <div className={styles.radarDiagram} role="img" aria-label="مراحل RADAR: التطبيق، المنهج، النتائج، التحسين، التقييم واستخلاص الدروس">
              <span className={styles.radarOrbit} aria-hidden="true" />
              <span className={styles.radarCenter}>
                <Image src="/icons/logo.svg" alt="Transformix" width={76} height={49} />
              </span>
              {RADAR_STEPS.map((step, index) => (
                <span className={`${styles.radarNode} ${styles[`radarNode${index + 1}`]}`} key={step}>
                  <b dir="ltr">{index + 1}</b>{step}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="capabilities" className={`${kit.section} ${kit.tinted} ${styles.servicesSection}`} aria-labelledby="data-services-heading">
          <Reveal as="h2" id="data-services-heading" className={styles.servicesHeading}>خدماتنا في علوم البيانات</Reveal>
          {CAPABILITIES.map((capability) => {
            const heading = `data-${capability.slug}-heading`;
            const scope = `data-${capability.slug}-scope`;
            return (
              <article key={capability.slug} className={styles.serviceCapability} aria-labelledby={heading}>
                <Reveal className={styles.serviceCapabilityIntro}>
                  <h3 id={heading}>{capability.title}</h3>
                  <p>{capability.text} <strong>متى تحتاج المؤسسة إلى هذه الخدمة؟</strong> {capability.need}</p>
                  <a href={`#${scope}`}>ناقش احتياجك <span aria-hidden="true">←</span></a>
                </Reveal>

                <h4 id={scope} className={styles.scopeTitle}>نطاق العمل والقدرات</h4>
                <ul className={styles.scope}>
                  {capability.scope.map((item, itemIndex) => (
                    <Reveal as="li" key={item.title} className={styles.scopeItem} delay={(itemIndex % 2) * 60}>
                      <span className={styles.scopeIcon} aria-hidden="true">
                        <Image
                          src={`/v2/icons/${SCOPE_ICONS[capability.slug]?.[itemIndex] ?? "data-chart"}.svg`}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </span>
                      <div>
                        <h5>{item.title}</h5>
                        <p>{item.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <section className={styles.dataClosing} aria-labelledby="data-closing-heading">
          <div className={styles.dataClosingCopy}>
            <Reveal as="h2" id="data-closing-heading">بيانات موثوقة، وتحليل قابل للاستخدام</Reveal>
            <Reveal as="p" delay={80}>
              نراجع مع مؤسستك مصادر البيانات واحتياجات فرق العمل، ونحدد الأولويات التي يمكن تحويلها إلى مشروع قابل للتنفيذ والقياس؛ من تأسيس البيانات وتطوير التحليلات إلى تشغيل النماذج والتكامل مع أنظمتك القائمة.
            </Reveal>
            <Reveal delay={160}><PillButton size="compact">ناقش مشروع البيانات</PillButton></Reveal>
          </div>
          <Reveal className={styles.dataClosingImage} delay={80}>
            <Image src="/images/p10.png" alt="لوحة مؤشرات وتحليلات أداء الأعمال" fill sizes="(max-width: 900px) 100vw, 40vw" />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
