import Image from "next/image";
import styles from "./ReadinessNote.module.css";

type ReadinessNoteProps = {
  /** What the client prepares; the access note below it is the same on
      every service page. */
  text: string;
};

/** Figma "Readiness guidance" (3693:65401): a 1040 wide cream card naming what
    a service needs before work starts. */
export function ReadinessNote({ text }: ReadinessNoteProps) {
  return (
    <section className={styles.note}>
      <Image
        className={styles.icon}
        src="/v2/icons/clipboard-check.svg"
        alt=""
        width={36}
        height={36}
      />
      <h2 className={styles.title}>ما الذي نحتاجه للبدء؟</h2>
      <p className={styles.text}>{text}</p>
      <p className={styles.text}>
        تُحدد الصلاحيات وآلية مشاركة المعلومات قبل الوصول إلى أي بيانات أو أنظمة.
      </p>
    </section>
  );
}
