import { Reveal } from "@/components/ui/Reveal";
import { MANUFACTURING_WEBSITE } from "@/lib/serviceNavigation";
import styles from "./SectorsOverview.module.css";

/* Right-to-left: الصناعة is the right-hand card. It leaves for the
   manufacturing site; the others jump to their band. */
const SECTORS = [
  {
    key: "industry",
    number: "01",
    title: "الصناعة",
    text: "تشغيل المصانع، التحول الرقمي، أنظمة MRC والذكاء الاصطناعي.",
    href: MANUFACTURING_WEBSITE,
  },
  {
    key: "cooperatives",
    number: "02",
    title: "التعاونيات",
    text: "حوكمة وامتثال، منصات، تطبيقات واستثمارات وERP.",
    href: "#cooperatives",
  },
  {
    key: "education",
    number: "03",
    title: "التعليم و التدريب",
    text: "تدريب Odoo ومنصات رقمية لبناء المهارات.",
    href: "#education",
  },
] as const;

export function SectorsOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <p className={styles.eyebrow}>قطاعاتنا</p>
          <h2 className={styles.title}>
            خبرة متخصصة، وحلول مبنية على واقع
            <br />
            العمل.
          </h2>
          <p className={styles.sub}>
            ثلاثة قطاعات رئيسية نطوّر لها حلولًا رقمية وتشغيلية من الفكرة حتى
            التطبيق.
          </p>
        </Reveal>

        <Reveal className={styles.cards} delay={120}>
          {SECTORS.map((sector) => (
            <a
              key={sector.key}
              href={sector.href}
              target={sector.href.startsWith("http") ? "_blank" : undefined}
              rel={sector.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`${styles.card} ${styles[sector.key]}`}
            >
              <span className={styles.number} aria-hidden>
                <span className={styles.numberText} dir="ltr">
                  {sector.number}
                </span>
              </span>
              <h3 className={styles.cardTitle}>{sector.title}</h3>
              <p className={styles.cardText}>{sector.text}</p>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
