import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/sectors/SectorsStats.module.css";

/* Right-to-left, so "03" leads on the right. The artboard fixes ERP and 03 at
   170 tall and still sets the "03" figure in Segoe UI. */
const STATS = [
  { value: "03", label: "Core industries", fixed: true, segoe: true },
  { value: "AI", label: "Artificial intelligence" },
  { value: "ERP", label: "Operational systems", fixed: true },
  { value: "360°", label: "An integrated digital ecosystem" },
];

export function SectorsStats() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.head}>
        <p className={styles.eyebrow}>{"One connected ecosystem"}</p>
        <h2 className={styles.title}>{"Connecting technology to your industry's needs."}</h2>
        <p className={styles.sub}>
          {" From strategy and design to development, operations, and continuous improvement. "}</p>
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
