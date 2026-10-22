import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/sectors/SectorsOverview.module.css";

/* Right-to-left: الصناعة is the right-hand card. Each one jumps to its band. */
const SECTORS = [
  {
    key: "industry",
    number: "01",
    title: "Manufacturing",
    text: "Factory operations, digital transformation, MCR systems, and AI.",
    href: "#industry",
  },
  {
    key: "cooperatives",
    number: "02",
    title: "Cooperatives",
    text: "Governance, compliance, platforms, applications, investments, and ERP.",
    href: "#cooperatives",
  },
  {
    key: "education",
    number: "03",
    title: "Education and training",
    text: "Odoo training and digital platforms for developing skills.",
    href: "#education",
  },
] as const;

export function SectorsOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <p className={styles.eyebrow}>{"Our industries"}</p>
          <h2 className={styles.title}>
            {" Specialist expertise. Solutions grounded in "}<br />
            {" real work. "}</h2>
          <p className={styles.sub}>
            {" Three core industries where we develop digital and operational solutions from concept to implementation. "}</p>
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
