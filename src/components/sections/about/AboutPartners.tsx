import Image from "next/image";
import { Button8 } from "@/components/ui/Button8";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutPartners.module.css";

/** Figma 2515:60020 "Desktop - 114" and 2519:67008 on the 375 artboard. */
export function AboutPartners() {
  return (
    <section className={styles.section}>
      {/* "90554-OIVDSQ-877" 1 and 2 — the same circuit render, cropped two
          ways and flipped vertically; the 375 artboard leaves them out. */}
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
              نعمل ضمن منظومة من الشركاء العالميين
            </Reveal>
            <Reveal as="p" className={styles.text} delay={120}>
              شراكاتنا تساعدنا على توسيع قدراتنا وبناء حلول أكثر تكاملًا وموثوقية
              لعملائنا.
            </Reveal>
          </div>
          <Reveal className={styles.cta} delay={240}>
            <Button8 fluid={false}>ناقش تحديك معنا</Button8>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
