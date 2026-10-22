import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/sectors/SectorsCta.module.css";

export function SectorsCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.card}>
        <span className={`${styles.ring} ${styles.ringTop}`} aria-hidden />
        <span className={`${styles.ring} ${styles.ringBottom}`} aria-hidden />

        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden />
            {" Do you work in one of these industries? "}</p>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>{"Talk to us about the right solution"}</h2>
          </div>
          <p className={styles.text}>
            {" Share your challenge or idea. We begin by understanding what you need, then turn it into a digital solution we can deliver. "}</p>
          <PillButton>{"Book a free consultation"}</PillButton>
        </div>
      </Reveal>
    </section>
  );
}
