import type { CSSProperties } from "react";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/services/ProductionPlanning.module.css";

/* Sample data exactly as the artboard shows it — an illustration, not a live
   system. Rows read right to left. */
const METRICS = [
  { label: "Planned orders", value: "12" },
  { label: "Materials to review", value: "08" },
  { label: "Purchasing requirements", value: "04" },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

/* Each bar runs from the start of the week (the right) and stops `inset` px
   short of the left edge (Figma "Schedule track"). */
const PHASES = [
  { name: "Forming", color: "var(--v2-orange)", inset: 0 },
  { name: "Assembly", color: "var(--v2-primary)", inset: 80 },
  { name: "Packaging", color: "var(--v2-cyan-line)", inset: 180 },
];

const ORDERS = [
  { id: "DEM-01", phase: "Forming", material: "Metal sheets", status: "Under review" },
  { id: "DEM-02", phase: "Assembly", material: "Assembly components", status: "Planned" },
  { id: "DEM-03", phase: "Packaging", material: "Packaging materials", status: "Planned" },
];

/** Figma "ERP practical illustration" (3693:65967): a sample production plan
    and the paragraph that explains what it shows. */
export function ProductionPlanning() {
  return (
    <section className={styles.section}>
      <figure className={styles.board} aria-label={"Illustrative production planning example"}>
        <div className={styles.heading}>
          <p className={styles.boardTitle}>{"Production planning"}</p>
          <p>{"Sample data — for illustration"}</p>
        </div>

        <dl className={styles.metrics}>
          {METRICS.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>

        <p>{"Operations schedule / sample week"}</p>

        <div className={styles.schedule}>
          <ol className={styles.days}>
            {DAYS.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ol>
          {PHASES.map((phase) => (
            <div key={phase.name} className={styles.phase}>
              <p>{phase.name}</p>
              <div
                className={styles.track}
                style={
                  {
                    "--bar": phase.color,
                    "--inset": `${phase.inset / 10}rem`,
                  } as CSSProperties
                }
              >
                <span className={styles.bar} />
              </div>
            </div>
          ))}
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{"Production order"}</th>
              <th scope="col">{"Stage"}</th>
              <th scope="col">{"Material"}</th>
              <th scope="col">{"Status"}</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr key={order.id}>
                <td dir="ltr">{order.id}</td>
                <td>{order.phase}</td>
                <td>{order.material}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <figcaption className={styles.footnote}>{"An illustrative interface, rather than specifications for a particular system."}</figcaption>
      </figure>

      <div className={styles.explain}>
        <SectionIntro eyebrow={"How does the work connect?"} title={"From material requirements to the operations plan."} />
        <p className={styles.lead}>
          {" In manufacturing, a production planning module can bring orders, materials, and dates together in one view. "}</p>
        <p className={styles.note}>
          {" This example illustrates the idea of integration. Required modules are defined after analyzing your business, and not every project needs a production module. "}</p>
      </div>
    </section>
  );
}
