import Image from "next/image";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/sectors/SectorsHero.module.css";

export function SectorsHero() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.copy}>
        <h1 className={styles.title}>
          {" Digital solutions designed "}<br />
          {" for each industry's needs. "}</h1>
        <p className={styles.text}>
          {" We provide operational systems, digital transformation, and AI solutions tailored to each industry, making complex processes clearer and more efficient. "}</p>
        <div className={styles.actions}>
          <PillButton>{"Discuss your project with us"}</PillButton>
        </div>
      </Reveal>

      <Reveal className={styles.visualWrap} delay={120}>
        <Image
          className={styles.visual}
          src="/images/sectors/hero-ecosystem.png"
          alt={"The Transformix ecosystem connecting manufacturing, cooperatives, education, and operational systems"}
          width={1602}
          height={982}
          sizes="(max-width: 1024px) 100vw, 672px"
          loading="eager"
          fetchPriority="high"
        />
      </Reveal>
    </section>
  );
}
