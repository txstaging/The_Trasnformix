import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PrefillLink, ServiceRequestForm } from "@/components/services/ServiceRequestForm";
import {
  Closing,
  FaqList,
  kit,
  ProcessSteps,
  SectionIntro,
  ServiceHero,
} from "@/components/services/ServiceKit";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "السياحة والضيافة والتراث | Transformix",
  description:
    "مسارات تقنية وتشغيلية لشركات السياحة والعمرة ومشغلي الأنشطة والمتاحف والمواقع التراثية: منصات مخصصة، إدارة توزيع وحجوزات، توثيق وتجارب رقمية، وتحليلات تدعم القرار.",
};

/** The request form further down, which every call on the page drops to. */
const FORM = "tourism-request";
const toForm = `#${FORM}`;

/* Figma 4473:9246 — who the page is for, in reading order; each call picks
   the activity in the form. */
const AUDIENCES = [
  {
    activity: "operators",
    title: "مشغلو الأنشطة والتجارب وشركات السياحة",
    text: "اعرض تجاربك في قنوات مناسبة، وأدِر الحجوزات والعملاء من منظومة واضحة: توزيع الأنشطة وإدارة القنوات، الحجز المباشر، الأسعار والتوافر، إدارة العملاء وتحليل المبيعات.",
  },
  {
    activity: "umrah",
    title: "شركات العمرة وخدمات الزوار",
    text: "نظّم طلبات العملاء والمجموعات والخدمات والموردين، وامنح فريقك رؤية أوضح لكل حجز؛ من رحلة المعتمر أو الزائر إلى السداد والمتابعة والتقارير بحسب المتطلبات النظامية ونطاق المشروع.",
  },
  {
    activity: "heritage",
    title: "المتاحف والمواقع التراثية",
    text: "اجعل مقتنياتك وموقعك التاريخي أصولًا رقمية قابلة للتوثيق والعرض والتطوير: فهرسة المقتنيات والتوثيق الإلكتروني، التصوير الرقمي للموقع، الواقع الافتراضي وإتاحة المحتوى للزوار.",
  },
  {
    activity: "guides",
    title: "المرشدون والجهات ذات العضوية",
    text: "قدّم خدمات الأعضاء والمرشدين وإجراءاتهم ومدفوعاتهم من خلال منصة واحدة؛ بوابات العضوية والخدمات والطلبات والتواصل والحوكمة والمدفوعات والربط مع الجهات ذات العلاقة.",
  },
] as const;

type Solution = {
  slug: string;
  /** Picks the solution area in the form. */
  interest: string;
  /** The icon and kicker over the title; an area can go without them. */
  icon?: { src: string; width: number; height: number };
  label?: string;
  title: string;
  paragraphs: readonly string[];
  /** A pale note under the copy. */
  definition?: string;
  cta: string;
  /** The far panel: a photo, a scope card, or (until its photo is chosen)
      an empty panel — the artboard leaves three of them unfilled. */
  panel:
    | { kind: "photo"; src: string; shade: number }
    | { kind: "scope"; title: string; items: readonly { label: string; text: string }[] }
    | { kind: "blank" };
};

/* Figma 4473:9336 — the five solution areas, the copy on the reading side. */
const SOLUTIONS: readonly Solution[] = [
  {
    slug: "distribution",
    interest: "distribution",
    title: "اجعل أنشطتك وتجاربك أقرب إلى العملاء القادرين على حجزها",
    paragraphs: [
      "OTA Mark خدمة متخصصة لإدارة التوزيع التجاري للأنشطة والتجارب السياحية. تشمل إعداد القوائم وتشغيلها وتحسين المحتوى والظهور ومتابعة الحجوزات والأداء عبر القنوات الملائمة.",
      "تضم أعمال الخدمة إدارة الأسعار والتوافر، وتحسين الصور والوصف والكلمات المستهدفة في البحث، والحملات الرقمية وتقارير الأداء، وفق الاتفاق مع كل مشغل.",
    ],
    definition: "خدمة توزيع مُدارة تستخدم منصات وتقنيات طرف ثالث بحسب احتياجات المشروع، وليست منصة حجوزات خاصة بترانسفورمكس.",
    cta: "اطلب مراجعة قنوات بيع أنشطتك",
    panel: { kind: "photo", src: "/images/services/tourism/distribution.jpg", shade: 0.29 },
  },
  {
    slug: "platforms",
    interest: "platforms",
    icon: { src: "/icons/services/tech/software.svg", width: 65, height: 49.0007 },
    label: "تطوير المنصات والتطبيقات السياحية",
    title: "منصة حجز أو تطبيق مصمم لطريقة عملك",
    paragraphs: [
      "نطوّر المنصات السياحية وتطبيقات المشغلين والعملاء والمرشدين وفق رحلة الاستخدام الفعلية، مع مراعاة أدوار الموظفين والموردين والأعضاء والإدارة. نربط واجهات الحجز المباشر وبوابات المشغلين والأعضاء بالمدفوعات والأنظمة الخارجية.",
      "حلول مخصصة وفق طبيعة العمل، وليست منصة سياحية جاهزة بنظام اشتراك SaaS.",
    ],
    cta: "ناقش تطوير منصتك",
    panel: { kind: "photo", src: "/images/services/tourism/booking-platform.jpg", shade: 0.29 },
  },
  {
    slug: "operations",
    interest: "operations",
    icon: { src: "/icons/services/tourism/booking.svg", width: 51, height: 53 },
    label: "إدارة العمليات والعملاء والتكاملات",
    title: "نظّم رحلة الخدمة من الطلب حتى إتمامها",
    paragraphs: [
      "إذا كانت مؤسستك تدير برامج عمرة أو خدمات زوار أو حجوزات متعددة الأطراف، فيمكن تصميم العمليات الرقمية حول العميل والموظف والمورد: تقديم الطلب، ومتابعة الحالة، وإدارة الخدمات، والفوترة، والتقارير والتكاملات اللازمة.",
      "نربط سير العمل وإدارة علاقات العملاء بالأنظمة القائمة حيثما يناسب، بحسب المتطلبات النظامية ونطاق المشروع. لا نفرض على هذه الأنشطة نموذج بيع التجارب عبر منصات التوزيع؛ لكل نشاط رحلة وقنوات واشتراطات مختلفة.",
    ],
    cta: "حدد نطاق نظام التشغيل المطلوب",
    panel: { kind: "photo", src: "/images/services/tourism/operations.jpg", shade: 0.29 },
  },
  {
    slug: "heritage",
    interest: "heritage",
    icon: { src: "/icons/services/tech/creative.svg", width: 45, height: 54 },
    label: "تكنولوجيا المتاحف والتجارب الغامرة",
    title: "وثّق مقتنياتك، وامنح تاريخ المكان امتدادًا رقميًا",
    paragraphs: [
      "للمتاحف والمواقع التراثية احتياجات تتجاوز الموقع التعريفي. نوفر حلول التوثيق الإلكتروني للمقتنيات، والتصوير الرقمي للمباني والمحتوى، وتطوير تجارب الواقع الافتراضي والعرض الرقمي للمحتوى الثقافي.",
      "في بيت المتبولي بجدة التاريخية شملت الأعمال المنفذة التوثيق الإلكتروني للقطع المتحفية، وتصوير المكان، وأعمال الواقع الافتراضي.",
    ],
    cta: "ناقش توثيق موقعك ومقتنياتك",
    panel: { kind: "blank" },
  },
  {
    slug: "analytics",
    interest: "analytics",
    icon: { src: "/icons/services/tourism/data.svg", width: 56, height: 52 },
    label: "تحليلات السياحة والذكاء الاصطناعي",
    title: "اكتشف ما تقوله بيانات عملائك عن فرص النمو",
    paragraphs: [
      "يمكن لبيانات الحجوزات والاشتراكات والأنشطة أن توضح ارتباط الخدمات ببعضها، وأنماط الطلب، والفرص المناسبة لتطوير الباقات والتوصيات وتحسين القرارات.",
      "في دراسة MerMates Market Basket Analysis جرى تحليل أكثر من 1,827 سجل تسجيل، شملت 16 دورة خلال الفترة من 2015 حتى مارس 2025، باستخدام قواعد الارتباط وتحليل سلة المشتريات. هذه بيانات دراسة حالة، وليست مؤشرات أداء لجميع العملاء.",
    ],
    cta: "ناقش تحليل بياناتك",
    panel: {
      kind: "scope",
      title: "من البيانات إلى الرؤى",
      items: [
        { label: "المدخلات", text: "بيانات التسجيل والاشتراك والحجوزات والأنشطة الفعلية." },
        { label: "التحليل", text: "علاقات المنتجات وأنماط الارتباط والتكرار، باستخدام قواعد الارتباط وتحليل سلة المشتريات." },
        { label: "المخرجات", text: "رؤى للتوصيات التجارية وتطوير العروض والباقات ولوحات المتابعة والتطبيقات الذكية بحسب البيانات المتاحة." },
      ],
    },
  },
];

/* Figma 4473:9489 — the work done, in reading order. */
const PROJECTS = [
  {
    title: "بيت المتبولي – جدة التاريخية",
    text: "التوثيق الإلكتروني للقطع المتحفية، والتصوير الرقمي للموقع، وأعمال الواقع الافتراضي. خبرة في تحويل المقتنيات والمكان إلى أصول رقمية قابلة للتوثيق والعرض.",
    cta: "ناقش مشروعًا مشابهًا",
    interest: "heritage",
  },
  {
    title: "منصة جايد للمرشدين السياحيين",
    text: "مشروع منفذ لمنصة تعاونية متخصصة في قطاع المرشدين السياحيين. شمل تطوير المنصة والتكاملات البنكية والأنظمة والجهات ذات العلاقة وفق نطاق المشروع.",
    cta: "ناقش منصة مخصصة",
    interest: "platforms",
  },
  {
    title: "MerMates – تحليل سلة المشتريات",
    text: "تحليل أكثر من 1,827 سجل تسجيل في 16 دورة، من 2015 حتى مارس 2025، لاستخراج علاقات بين الأنشطة ودعم القرارات التجارية والتوصيات باستخدام قواعد الارتباط.",
    cta: "ناقش تحليل بياناتك",
    interest: "analytics",
  },
  {
    title: "OTA Mark – أعمال تشغيل وتسويق",
    text: "تجارب تشغيلية منفذة في إدارة التوزيع والمحتوى والقنوات والتسويق السياحي؛ تشمل إعداد القوائم ومتابعة الأسعار والتوافر والحجوزات والظهور وتقارير الأداء.",
    cta: "اطلب تقييم التوزيع",
    interest: "distribution",
  },
] as const;

/* Figma 4473:9563 */
const STEPS = [
  { title: "مناقشة النشاط والهدف", text: "تحدد الجهة نوع العمل والهدف المطلوب والأنظمة أو القنوات المستخدمة حاليًا." },
  { title: "تحديد الحل والمخرجات", text: "نحدد التطوير أو التشغيل المطلوب، والتكاملات والأولويات ومقاييس التقييم." },
  { title: "التنفيذ والمتابعة", text: "التسليم والتشغيل والتحسين ضمن اتفاق واضح يلائم طبيعة الخدمة والمشروع." },
] as const;

/* Figma 4473:9593 */
const QUESTIONS = [
  {
    question: "هل OTA Mark منصة حجوزات خاصة بترانسفورميكس؟",
    answer: "لا. OTA Mark خدمة متخصصة لإدارة التوزيع التجاري للأنشطة والتجارب السياحية، تشمل إعداد القوائم وتشغيلها وتحسين المحتوى والظهور ومتابعة الحجوزات والأداء. تستخدم منصات وتقنيات طرف ثالث بحسب احتياجات المشروع.",
  },
  {
    question: "هل تعملون مع شركة عمرة تحتاج نظام تشغيل وليس تسويقًا سياحيًا؟",
    answer: "يمكن تصميم عمليات رقمية مخصصة لإدارة العملاء والمجموعات والخدمات والموردين والسداد والمتابعة والتقارير والتكاملات، وفق المتطلبات النظامية ونطاق المشروع. لا نفرض نموذج بيع التجارب عبر قنوات التوزيع على هذا النشاط.",
  },
  {
    question: "هل لديكم منتج SaaS سياحي جاهز؟",
    answer: "الحلول المعروضة هنا منصات وتطبيقات مخصصة وفق طبيعة العمل ورحلة الاستخدام والأدوار والتكاملات المطلوبة، وليست منصة سياحية جاهزة بنظام اشتراك.",
  },
  {
    question: "ما المشروعات التي تعكس خبرتكم في المتاحف؟",
    answer: "بيت المتبولي – جدة التاريخية؛ شملت الأعمال المنفذة التوثيق الإلكتروني للقطع المتحفية، والتصوير الرقمي للموقع، وأعمال الواقع الافتراضي.",
  },
] as const;

const pad = (index: number) => String(index + 1).padStart(2, "0");

function Arrow() {
  return (
    <span className={kit.arrow} aria-hidden="true">
      ←
    </span>
  );
}

function SolutionPanel({ panel }: { panel: Solution["panel"] }) {
  if (panel.kind === "photo") {
    return (
      <div className={`${styles.panel} ${styles.panelPhoto}`} aria-hidden="true">
        <Image className={styles.panelImage} src={panel.src} alt="" fill sizes="(max-width: 900px) 100vw, 603px" />
        <span className={styles.panelShade} style={{ opacity: panel.shade }} />
      </div>
    );
  }
  if (panel.kind === "scope") {
    return (
      <div className={`${styles.panel} ${styles.panelScope}`}>
        <h4 className={kit.cardTitle}>{panel.title}</h4>
        <dl className={styles.scopeList}>
          {panel.items.map((item) => (
            <div key={item.label} className={styles.scopeItem}>
              <dt className={styles.scopeLabel}>{item.label}</dt>
              <dd className={kit.cardText}>{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  return <div className={`${styles.panel} ${styles.panelBlank}`} aria-hidden="true" />;
}

/** Figma 4473:9198 — السياحة والضيافة والتراث. */
export default function TourismPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="tourism-heading"
          image="/images/services/tourism/hero.jpg"
          title="وسّع أعمالك السياحية، وطوّر تجربة عملائك وزوارك"
          text="سواء كنت تدير شركة سياحة، أو خدمات عمرة، أو أنشطة وتجارب، أو متحفًا وموقعًا تراثيًا، نوفر لك مسارات تقنية وتشغيلية تناسب طبيعة نشاطك: منصات مخصصة، إدارة توزيع وحجوزات، توثيق وتجارب رقمية، وتحليلات تدعم قراراتك."
          actions={[
            { label: "ابحث عن الحل المناسب لنشاطك", href: "#tourism-paths" },
            { label: "تواصل معنا", href: toForm },
          ]}
          wide
        />

        <section id="tourism-paths" className={`${kit.section} ${styles.paths}`} aria-labelledby="tourism-paths-heading">
          <SectionIntro
            id="tourism-paths-heading"
            title="ما الذي تريد تطويره في أعمالك؟"
            text="تختار مؤسستك النتيجة التشغيلية أو التجارية المستهدفة، ثم نحدد معها الخدمة أو نطاق التطوير المناسب، بدل تقديم برنامج واحد لجميع العملاء."
            center
          />
          <ul className={styles.cards}>
            {AUDIENCES.map((audience, index) => (
              <Reveal as="li" key={audience.activity} className={`${kit.card} ${styles.card}`} delay={(index % 2) * 80}>
                <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={kit.cardTitle}>{audience.title}</h3>
                <p className={kit.cardText}>{audience.text}</p>
                <PrefillLink href={toForm} values={{ activity: audience.activity }} className={kit.cardLink}>
                  ابدأ من احتياج مؤسستك
                  <Arrow />
                </PrefillLink>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.tinted} ${styles.solutionsIntro}`} aria-labelledby="tourism-solutions-heading">
          <SectionIntro
            id="tourism-solutions-heading"
            title="ما الذي تريد تطويره في أعمالك؟"
            text="تختار مؤسستك النتيجة التشغيلية أو التجارية المستهدفة، ثم نحدد معها الخدمة أو نطاق التطوير المناسب، بدل تقديم برنامج واحد لجميع العملاء."
            center
          />
        </section>

        {SOLUTIONS.map((solution, index) => {
          const heading = `tourism-${solution.slug}-heading`;
          return (
            <section
              key={solution.slug}
              className={index % 2 ? kit.section : `${kit.section} ${kit.tinted}`}
              aria-labelledby={heading}
            >
              <div className={styles.solution}>
                <Reveal className={styles.solutionCopy}>
                  <div className={styles.solutionIntro}>
                    {solution.icon && (
                      <span className={styles.solutionIcon} aria-hidden="true">
                        <Image src={solution.icon.src} alt="" width={solution.icon.width} height={solution.icon.height} />
                      </span>
                    )}
                    {solution.label && <p className={kit.kicker}>{solution.label}</p>}
                    <h3 id={heading} className={kit.title}>
                      {solution.title}
                    </h3>
                  </div>
                  {solution.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={kit.cardText}>
                      {paragraph}
                    </p>
                  ))}
                  {solution.definition && <p className={styles.definition}>{solution.definition}</p>}
                  <PrefillLink
                    href={toForm}
                    values={{ interest: solution.interest }}
                    className={`${kit.button} ${kit.buttonPrimary}`}
                  >
                    {solution.cta}
                  </PrefillLink>
                </Reveal>
                <Reveal className={styles.solutionPanel} delay={80}>
                  <SolutionPanel panel={solution.panel} />
                </Reveal>
              </div>
            </section>
          );
        })}

        <section className={kit.section} aria-labelledby="tourism-projects-heading">
          <SectionIntro
            id="tourism-projects-heading"
            kicker="من أعمالنا وخبراتنا"
            title="أعمال منفذة يمكنك الاستناد إليها في تقييم قدراتنا"
            text="لكل مشروع نطاق مختلف؛ نعرض نوع العمل الذي نُفّذ، دون تعميم بيانات دراسة حالة على جميع العملاء."
          />
          <ul className={`${styles.cards} ${styles.cardsWide}`}>
            {PROJECTS.map((project, index) => (
              <Reveal as="li" key={project.title} className={`${kit.card} ${styles.card}`} delay={(index % 2) * 80}>
                <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={kit.cardTitle}>{project.title}</h3>
                <p className={kit.cardText}>{project.text}</p>
                <PrefillLink href={toForm} values={{ interest: project.interest }} className={kit.cardLink}>
                  {project.cta}
                  <Arrow />
                </PrefillLink>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="tourism-process-heading">
          <SectionIntro id="tourism-process-heading" title="مسار واضح من احتياجك إلى نطاق عمل قابل للتنفيذ" center />
          <ProcessSteps steps={STEPS} roomy />
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="tourism-faq-heading">
          <SectionIntro id="tourism-faq-heading" title="أسئلة قبل بدء المشروع" center />
          <FaqList items={QUESTIONS} />
        </section>

        <section className={kit.section} aria-labelledby="tourism-request-heading">
          <SectionIntro
            id="tourism-request-heading"
            title="أخبرنا بما تريد تطويره في مؤسستك"
            text="حدد نشاطك والنتيجة التي تسعى إليها، لنناقش نطاقًا مناسبًا بدل إرسال عرض عام لا يراعي طبيعة عملك."
            center
          />
          <Reveal>
            <ServiceRequestForm id={FORM} title="بيانات الطلب" form="tourism" path="business" />
          </Reveal>
        </section>

        <Closing
          id="tourism-closing-heading"
          title="طوّر تجربتك السياحية مع ترانسفورمكس"
          text="من التوزيع والتشغيل إلى المنصات المخصصة والتجارب الرقمية والتحليلات؛ نحدد معك المسار الذي يلائم نشاطك واحتياجات عملائك وزوارك."
          actions={[{ label: "ناقش مشروعك معنا" }]}
        />
      </main>
      <Footer />
    </>
  );
}
