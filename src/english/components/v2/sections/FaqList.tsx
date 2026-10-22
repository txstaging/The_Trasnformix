import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/sections/FaqList.module.css";

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
      <SectionIntro eyebrow={"Frequently asked questions"} title={"Before we begin"} />
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
