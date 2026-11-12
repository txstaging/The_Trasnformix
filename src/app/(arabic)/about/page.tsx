import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { ServiceAction } from "@/components/services/ServiceAction";
import { actionClass, kit } from "@/components/services/ServiceKit";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "من نحن | Transformix",
  description:
    "ترانسفورمكس شركة تقنية إقليمية تنطلق من الشرق الأوسط، وتتبنى فلسفة تكنولوجيا الجيل الخامس في تطوير حلول ومنتجات رقمية تدعم تحول الأعمال، عبر خمسة مختبرات متخصصة وحضور في جدة والإسكندرية والشارقة.",
};

/* Figma 4530:5796 — the introduction under the title. */
const INTRODUCTION = [
  "تستند قدراتنا إلى خمسة مختبرات متخصصة تعمل بصورة متكاملة في مجالات الذكاء الاصطناعي وعلوم البيانات، وهندسة البرمجيات، وأنظمة المؤسسات، والإبداع، والبحث والتطوير والاستشارات.",
  "ونمتلك خبرة في تطوير منتجات رقمية متعددة اللغات، تشمل العربية والإنجليزية والأردية والهندية، مع مراعاة الخصائص اللغوية والثقافية للمستخدمين، بما يتناسب مع تنوع الأسواق التي نخدمها.",
  "ويعزز نموذج عملنا شبكة إقليمية من خبراء التخصصات والشركاء التقنيين والتجاريين، تتيح الاستفادة من المعرفة المحلية والخبرات القطاعية وتشكيل فرق عمل تتناسب مع متطلبات المشروعات.",
];

/* Figma 4529:13317 */
const PHILOSOPHY = [
  "نؤمن بأن الذكاء الاصطناعي يفتح آفاقًا لإعادة تصور نماذج الأعمال والحياة اليومية، وأن قيمة التكنولوجيا الحقيقية تكمن في فهم احتياجات الإنسان، والاهتمام بالتفاصيل التي تحسن تجربته وتضاعف قدراته وإبداعه، لا في استبداله.",
  "ونضع البحث والتطوير والابتكار المستمر في صميم عملنا، ونتبنى نماذج التميز المؤسسي لتطوير حلول وأعمال مرنة ومستدامة بمعايير تنافسية عالمية، مع احترام البيئة والموارد وحقوق الأجيال القادمة.",
  "ونستثمر في تنمية الإنسان عبر أكاديمياتنا ومجتمعنا المهني، إيمانًا بأن المعرفة والمهارات أساس تمكينه من قيادة التحول والمشاركة في صناعة المستقبل.",
];

/* Figma 4529:13330 — two columns, the first on the reading side. */
const LABS_INTRO = [
  "تضم ترانسفورمكس خمسة مختبرات متخصصة، لكل منها قيادة مسؤولة عن تطوير خبراته وقدراته. وتعمل هذه المختبرات ضمن منظومة مترابطة تتجاوز التقسيمات التقليدية، حيث تتشارك الفرق المعرفة والموارد، وتتعاون في تطوير المنتجات وتنفيذ المشروعات وفق احتياجات كل منها.",
  "وتتداخل هذه القدرات مع خبرات تخصصية وشراكات إقليمية مختارة، بما يجمع بين الخبرة التقنية والمعرفة القطاعية والحضور المحلي. ويتيح هذا النموذج للمختبرات قيادة أعمالها بصورة مستقلة أو مشتركة، مع مرونة في تشكيل الفرق وتوزيع المسؤوليات والاستفادة من الخبرات عبر مختلف المشروعات.",
];

/* Figma 4529:13333 — the five labs in reading order; each icon keeps its
   drawn size in the 32px slot. */
const LABS = [
  {
    title: "مختبر الذكاء الاصطناعي وعلوم البيانات",
    text: "تطوير تطبيقات الذكاء الاصطناعي والوكلاء الأذكياء، والتحليلات المتقدمة والنماذج التنبؤية، واستخلاص المعرفة من البيانات لدعم المنتجات والقرارات.",
    icon: { name: "ai", width: 28.5, height: 28.5 },
  },
  {
    title: "مختبر هندسة البرمجيات",
    text: "تصميم وتطوير المنصات الرقمية وتطبيقات الويب والهواتف الذكية، وهندسة الخدمات البرمجية والتكامل بين الأنظمة، مع الاهتمام بالأداء وقابلية التطوير.",
    icon: { name: "software", width: 32.5, height: 24.5004 },
  },
  {
    title: "مختبر أنظمة المؤسسات",
    text: "تطوير وتنفيذ وتكامل أنظمة المؤسسات وإدارة علاقات العملاء، وربط العمليات والبيانات والتطبيقات بما يتناسب مع متطلبات الأعمال.",
    icon: { name: "managed", width: 27.5, height: 27 },
  },
  {
    title: "مختبر الإبداع",
    text: "تطوير الهوية البصرية وتجربة المستخدم والواجهات الرقمية والمحتوى الإبداعي، بما يربط التصميم باحتياجات المستخدم وأهداف الأعمال.",
    icon: { name: "creative", width: 22.5, height: 27 },
  },
  {
    title: "مختبر البحث والتطوير والاستشارات",
    text: "البحث التطبيقي واستكشاف التقنيات ونماذج الأعمال، وتقديم الاستشارات في التحول والتميز المؤسسي والحوكمة وتكنولوجيا الجيل الخامس.",
    icon: { name: "research", width: 25.9094, height: 26.5 },
  },
] as const;

/* Figma 4529:13431 */
const EXPERTISE = [
  "تقود ترانسفورمكس مشروعاتها ومنتجاتها من خلال مختبراتها المتخصصة، مستندةً إلى خبراتها وقدراتها الداخلية، مع الاستفادة من علاقات مهنية إقليمية راسخة تضم خبراء تخصصيين وشركاء مختارين.",
  "وتتيح هذه العلاقات إضافة المعرفة القطاعية والخبرة المحلية والقدرات المتخصصة عندما تتطلبها طبيعة العمل، مع احتفاظ ترانسفورمكس بقيادة المشروعات ومسؤولية التكامل وجودة التنفيذ.",
];

/* Figma 4529:13443 */
const KNOWLEDGE = [
  "نؤمن بأن تطوير التكنولوجيا يرتبط بتطوير الإنسان القادر على فهمها وتوظيفها وابتكار تطبيقاتها. ومن خلال أكاديميات ترانسفورمكس ومجتمعها المهني، نساهم في تنمية المهارات، ونقل الخبرات العملية، وربط المعرفة بفرص التطور المهني وريادة الأعمال.",
  "ونتعاون مع الجامعات والمؤسسات التعليمية والمجتمعات المتخصصة، ونشارك في اللقاءات والفعاليات التقنية، ونوفر مساحات للتعلم والإرشاد والتدريب العملي واكتشاف المواهب، بما يدعم بناء جيل جديد من المتخصصين والمبتكرين.",
];

/* Figma 4529:13458 */
const PRESENCE = [
  "تعمل ترانسفورمكس من خلال حضور إقليمي في جدة والإسكندرية والشارقة، يجمع الخبرات التقنية والتجارية والتشغيلية ضمن منظومة واحدة، مع مرونة في تشكيل فرق العمل وإدارة المشروعات وفق متطلبات العملاء.",
  "ويمتد نطاق أعمالنا إلى أسواق أخرى في الشرق الأوسط، مستفيدين من خبراتنا الإقليمية وشراكاتنا المتخصصة، مع الحفاظ على معايير موحدة في التنفيذ والجودة وإدارة العلاقات مع العملاء.",
];

/* Figma 4529:13461 — in reading order. */
const CITIES = [
  { city: "جدة", country: "المملكة العربية السعودية" },
  { city: "الإسكندرية", country: "جمهورية مصر العربية" },
  { city: "الشارقة", country: "الإمارات العربية المتحدة" },
] as const;

function Arrow() {
  return (
    <span className={kit.arrow} aria-hidden="true">
      ←
    </span>
  );
}

function Columns({ items }: { items: readonly string[] }) {
  return (
    <Reveal className={styles.columns}>
      {items.map((text) => (
        <p key={text} className={kit.cardText}>
          {text}
        </p>
      ))}
    </Reveal>
  );
}

/** The designer's photo beside a section's copy, as tall as the copy runs. */
function Photo({ src }: { src: string }) {
  return (
    <Reveal className={styles.panel} delay={80} aria-hidden="true">
      <Image className={styles.panelImage} src={src} alt="" fill sizes="(max-width: 900px) 100vw, 525px" />
    </Reveal>
  );
}

/** Figma 4529:13270 — من نحن. */
export default function AboutPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${styles.main} ${tajawal.variable} ${jakarta.variable}`}>
        <section className={styles.hero} aria-labelledby="about-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image className={styles.heroImage} src="/images/about/hero.jpg" alt="" fill preload sizes="100vw" />
          </div>
          <div className={styles.heroCopy}>
            <Reveal as="h1" id="about-heading" className={styles.heroTitle}>
              من نحن
            </Reveal>
            <Reveal as="p" className={styles.heroLead} delay={60}>
              ترانسفورمكس شركة تقنية إقليمية تنطلق من الشرق الأوسط، وتتبنى فلسفة تكنولوجيا الجيل الخامس في تطوير حلول
              ومنتجات رقمية تدعم تحول الأعمال، وتجمع بين الابتكار المرتكز على الإنسان والذكاء الاصطناعي والاستدامة والمرونة.
            </Reveal>
            {INTRODUCTION.map((text, index) => (
              <Reveal as="p" key={text} className={styles.heroText} delay={120 + index * 40}>
                {text}
              </Reveal>
            ))}
            <Reveal className={styles.heroActions} delay={280}>
              <Link href="/services" className={actionClass("primary")}>
                استكشف خدماتنا
              </Link>
              <Link href="/contact" className={actionClass()}>
                تواصل معنا
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={`${kit.section} ${styles.pale}`} aria-labelledby="about-philosophy-heading">
          <div className={styles.split}>
            <Reveal className={styles.splitCopy}>
              <h2 id="about-philosophy-heading" className={kit.title}>
                فلسفتنا
              </h2>
              {PHILOSOPHY.map((text) => (
                <p key={text} className={kit.cardText}>
                  {text}
                </p>
              ))}
            </Reveal>
            <Photo src="/images/about/philosophy.jpg" />
          </div>
        </section>

        <section id="labs" className={`${kit.section} ${styles.anchor}`} aria-labelledby="about-labs-heading">
          <Reveal as="h2" id="about-labs-heading" className={kit.title}>
            مختبراتنا
          </Reveal>
          <Columns items={LABS_INTRO} />
          <ul className={styles.labs}>
            {LABS.map((lab, index) => (
              <Reveal as="li" key={lab.title} className={styles.lab} delay={(index % 2) * 80}>
                <div className={styles.labCard}>
                  <span className={styles.labIcon} aria-hidden="true">
                    <Image
                      src={`/icons/about/${lab.icon.name}.svg`}
                      alt=""
                      width={lab.icon.width}
                      height={lab.icon.height}
                    />
                  </span>
                  <h3 className={kit.cardTitle}>{lab.title}</h3>
                  <p className={kit.cardText}>{lab.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Link href="/works" className={`${kit.cardLink} ${styles.more}`}>
              استكشف دراسات الحالة والرؤى
              <Arrow />
            </Link>
          </Reveal>
        </section>

        <section className={`${kit.section} ${styles.pale}`} aria-labelledby="about-expertise-heading">
          <div className={`${styles.split} ${styles.splitWide}`}>
            <Reveal className={styles.splitCopy}>
              <h2 id="about-expertise-heading" className={kit.title}>
                خبراتنا الممتدة
              </h2>
              {EXPERTISE.map((text) => (
                <p key={text} className={kit.cardText}>
                  {text}
                </p>
              ))}
              <Link href="/careers" className={`${kit.cardLink} ${styles.more}`}>
                انضم إلى خبرائنا
                <Arrow />
              </Link>
            </Reveal>
            <Photo src="/images/about/expertise.jpg" />
          </div>
        </section>

        <section className={kit.section} aria-labelledby="about-knowledge-heading">
          <Reveal as="h2" id="about-knowledge-heading" className={kit.title}>
            المعرفة والمجتمع
          </Reveal>
          <Columns items={KNOWLEDGE} />
          <Reveal className={styles.actions}>
            <Link href="/academy" className={actionClass("primary")}>
              استكشف الأكاديمية
            </Link>
            <Link href="/community" className={actionClass()}>
              انضم إلى مجتمعنا
            </Link>
          </Reveal>
        </section>

        <section className={`${kit.section} ${styles.pale}`} aria-labelledby="about-presence-heading">
          <Reveal as="h2" id="about-presence-heading" className={kit.title}>
            حضورنا
          </Reveal>
          <Columns items={PRESENCE} />
          <ul className={styles.cities}>
            {CITIES.map((city, index) => (
              <Reveal as="li" key={city.city} className={styles.city} delay={index * 60}>
                <Image src="/icons/about/map-pin.svg" alt="" width={28} height={28} aria-hidden="true" />
                <h3 className={kit.cardTitle}>{city.city}</h3>
                <p className={styles.country}>{city.country}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.section} ${styles.next}`} aria-labelledby="about-next-heading">
          <Reveal as="h2" id="about-next-heading" className={`${kit.title} ${styles.nextTitle}`}>
            لنصنع ما هو قادم
          </Reveal>
          <Reveal as="p" className={styles.nextText} delay={60}>
            نتطلع إلى التعاون مع المؤسسات والشركات ورواد الأعمال لتطوير حلول ومنتجات رقمية تجمع بين الابتكار والخبرة
            التقنية وفهم الأعمال.
          </Reveal>
          <Reveal className={styles.actions} delay={120}>
            <ServiceAction className={actionClass()}>ناقش مشروعك معنا</ServiceAction>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
