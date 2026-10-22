import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Hero.module.css";

/* Figma 3652:7318 — headline, a three-line lead and the two calls to action,
   above the 1240 x 564 media band (Figma 3648:6871). */
export function Hero() {
  return (
    <section className={`${styles.hero} ${tajawal.variable}`}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <Reveal as="h1" className={styles.title}>
            {" Your technology partner for business growth "}</Reveal>
          <Reveal className={styles.lead} delay={120}>
            <p className={styles.subtitle}>
              {" From AI-powered process automation to integrated digital platforms "}</p>
            <p className={styles.text}>
              <span className={styles.textLine}>At Transformix, we combine AI solutions, software development, and ERP systems</span>{" "}
              <span className={styles.textLine}>to reduce operational waste and build digital experiences that support</span>{" "}
              <span className={styles.textEnding}>confident, data-informed growth.</span>
            </p>
          </Reveal>
        </div>
        <Reveal className={styles.actions} delay={240}>
          <PillButton className={styles.primaryAction}>{"Discuss your project with an expert"}</PillButton>
          <PillButton href={"/en/works"} variant="soft">
            {" View our work "}</PillButton>
        </Reveal>
      </div>

      {/* The showreel fills the hero band. Muted and
          inline so it may autoplay; the band's gradient shows through until
          the first frame decodes, which is why there is no poster. */}
      <div className={styles.video}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-label={"Transformix showreel"}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
