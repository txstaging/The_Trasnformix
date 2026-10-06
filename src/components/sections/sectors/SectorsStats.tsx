import { Reveal } from "@/components/ui/Reveal";
import styles from "./SectorsStats.module.css";

/* Right-to-left, so "03" leads on the right. The artboard fixes ERP and 03 at
   170 tall and still sets the "03" figure in Segoe UI. */
const STATS = [
  { value: "03", label: "قطاعات رئيسية", fixed: true, segoe: true },
  { value: "AI", label: "ذكاء اصطناعي" },
  { value: "ERP", label: "منظومات تشغيل", fixed: true },
  { value: "360°", label: "منظومة رقمية متكاملة" },
];

/** Figma 2789:11760 "Section - STATS". */
export function SectorsStats() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.head}>
        <p className={styles.eyebrow}>منظومة واحدة</p>
        <h2 className={styles.title}>نربط التقنية باحتياج القطاع.</h2>
        <p className={styles.sub}>
          من الاستراتيجية والتصميم، إلى التطوير والتشغيل والتحسين المستمر.
        </p>
      </Reveal>

      <div className={styles.row}>
        {STATS.map((stat, index) => (
          <Reveal
            key={stat.value}
            className={[styles.card, stat.fixed && styles.fixed].filter(Boolean).join(" ")}
            delay={index * 90}
          >
            <span
              className={[styles.value, stat.segoe && styles.segoe].filter(Boolean).join(" ")}
              dir="ltr"
            >
              {stat.value}
            </span>
            <span className={styles.label}>{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
