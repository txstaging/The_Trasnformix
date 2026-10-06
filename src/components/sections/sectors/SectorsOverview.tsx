import { Reveal } from "@/components/ui/Reveal";
import styles from "./SectorsOverview.module.css";

/* Right-to-left: الصناعة is the right-hand card. Each one jumps to its band. */
const SECTORS = [
  {
    key: "industry",
    number: "01",
    title: "الصناعة",
    text: "تشغيل المصانع، التحول الرقمي، أنظمة MRC والذكاء الاصطناعي.",
    href: "#industry",
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

/** Figma 2789:11533 "Section - OVERVIEW". */
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
