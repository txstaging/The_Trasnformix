import styles from "./ContextNote.module.css";

type ContextNoteProps = {
  text: string;
  eyebrow?: string;
  title?: string;
  /** The marketing artboard leads with the paragraph (3693:65743). */
  textFirst?: boolean;
};

/** Figma "Service context" (3693:65326): the cream card that frames the
    problem before a service lists what it offers. */
export function ContextNote({
  text,
  eyebrow = "من أين نبدأ؟",
  title = "نفهم المشكلة قبل اختيار الأداة.",
  textFirst = false,
}: ContextNoteProps) {
  return (
    <section className={`${styles.note} ${textFirst ? styles.textFirst : ""}`}>
      <div className={styles.label}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.text}>{text}</p>
    </section>
  );
}
