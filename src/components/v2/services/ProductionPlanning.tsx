import type { CSSProperties } from "react";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./ProductionPlanning.module.css";

/* Sample data exactly as the artboard shows it — an illustration, not a live
   system. Rows read right to left. */
const METRICS = [
  { label: "أوامر مخططة", value: "12" },
  { label: "خامات للمراجعة", value: "08" },
  { label: "احتياجات شراء", value: "04" },
];

const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];

/* Each bar runs from the start of the week (the right) and stops `inset` px
   short of the left edge (Figma "Schedule track"). */
const PHASES = [
  { name: "التشكيل", color: "var(--v2-orange)", inset: 0 },
  { name: "التجميع", color: "var(--v2-primary)", inset: 80 },
  { name: "التعبئة", color: "var(--v2-cyan-line)", inset: 180 },
];

const ORDERS = [
  { id: "DEM-01", phase: "التشكيل", material: "ألواح معدنية", status: "قيد المراجعة" },
  { id: "DEM-02", phase: "التجميع", material: "مكونات تجميع", status: "مخطط" },
  { id: "DEM-03", phase: "التعبئة", material: "مواد تعبئة", status: "مخطط" },
];

/** Figma "ERP practical illustration" (3693:65967): a sample production plan
    and the paragraph that explains what it shows. */
export function ProductionPlanning() {
  return (
    <section className={styles.section}>
      <figure className={styles.board} aria-label="مثال توضيحي لتخطيط الإنتاج">
        <div className={styles.heading}>
          <p className={styles.boardTitle}>تخطيط الإنتاج</p>
          <p>بيانات تجريبية — مثال توضيحي</p>
        </div>

        <dl className={styles.metrics}>
          {METRICS.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>

        <p>جدول التشغيل / أسبوع تجريبي</p>

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
              <th scope="col">أمر الإنتاج</th>
              <th scope="col">المرحلة</th>
              <th scope="col">الخامة</th>
              <th scope="col">الحالة</th>
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

        <figcaption className={styles.footnote}>واجهة توضيحية؛ ليست مواصفات نظام بعينه.</figcaption>
      </figure>

      <div className={styles.explain}>
        <SectionIntro eyebrow="كيف يترابط العمل؟" title="من احتياج المواد إلى خطة التشغيل." />
        <p className={styles.lead}>
          في السياق الصناعي، يمكن لوحدة تخطيط الإنتاج ربط الأوامر والخامات والمواعيد في قراءة واحدة.
        </p>
        <p className={styles.note}>
          هذا المثال يوضح فكرة الترابط فقط. تُحدد الوحدات المطلوبة بعد تحليل نشاط المنشأة، ولا يلزم أن
          يشمل كل مشروع وحدة إنتاج.
        </p>
      </div>
    </section>
  );
}
