import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./FaqList.module.css";

export type Faq = { question: string; answer: string };

type FaqListProps = {
  items: Faq[];
  /** The home artboard insets each row 24px from the sides (3693:64757). */
  inset?: boolean;
};

/** Figma "Frequently asked questions": every answer is shown, each pair ruled
    off underneath. */
export function FaqList({ items, inset = false }: FaqListProps) {
  return (
    <section className={styles.section}>
      <SectionIntro eyebrow="أسئلة شائعة" title="قبل أن نبدأ" />
      <dl className={`${styles.list} ${inset ? styles.inset : ""}`}>
        {items.map((item) => (
          <div key={item.question} className={styles.item}>
            <dt className={styles.question}>{item.question}</dt>
            <dd className={styles.answer}>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
