import Image from "next/image";
import styles from "@/english/components/v2/sections/ReadinessNote.module.css";

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
      <h2 className={styles.title}>{"What do we need to get started?"}</h2>
      <p className={styles.text}>{text}</p>
      <p className={styles.text}>
        {" Access permissions and information-sharing arrangements are defined before accessing any data or systems. "}</p>
    </section>
  );
}
