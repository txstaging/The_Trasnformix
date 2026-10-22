import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ContactHero.module.css";

export function ContactHero() {
  return (
    <section className={styles.hero}>
      <Image
        className={`${styles.pattern} ${styles.patternLeft}`}
        src="/images/contact/pattern-left.png"
        alt=""
        width={549}
        height={309}
        priority
        aria-hidden
      />
      <Image
        className={`${styles.pattern} ${styles.patternRight}`}
        src="/images/contact/pattern-right.png"
        alt=""
        width={436}
        height={228}
        priority
        aria-hidden
      />

      <div className={styles.copy}>
        <Reveal as="h1" className={styles.title}>
          تواصل معنا
        </Reveal>
        <Reveal as="p" className={styles.text} delay={120}>
          كل فكرة كبيرة تبدأ بحوار.
          <br />
          شاركنا احتياجك، ولنكتشف معًا الخطوة التالية.
        </Reveal>
      </div>
    </section>
  );
}
