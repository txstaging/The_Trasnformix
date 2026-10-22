import Image from "next/image";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/about/AboutPartners.module.css";

export function AboutPartners() {
  return (
    <section className={styles.section}>
      <div className={`${styles.ornament} ${styles.ornamentRight}`} aria-hidden>
        <Image
          className={styles.ornamentImage}
          src="/images/about-partners-lines.png"
          alt=""
          width={2500}
          height={1667}
          sizes="68.4vw"
        />
      </div>
      <div className={`${styles.ornament} ${styles.ornamentLeft}`} aria-hidden>
        <Image
          className={styles.ornamentImage}
          src="/images/about-partners-lines.png"
          alt=""
          width={2500}
          height={1667}
          sizes="68.4vw"
        />
      </div>

      <div className={styles.stage}>
        <div className={styles.content}>
          <div className={styles.copy}>
            <Reveal as="h2" className={styles.title}>
              {" Part of a global partner ecosystem "}</Reveal>
            <Reveal as="p" className={styles.text} delay={120}>
              {" Our partnerships expand our capabilities and help us build more connected, reliable solutions for our clients. "}</Reveal>
          </div>
          <Reveal className={styles.cta} delay={240}>
            <PillButton>{"Discuss your challenge with us"}</PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
