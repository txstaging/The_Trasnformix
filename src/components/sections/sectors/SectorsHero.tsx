import Image from "next/image";
import { Button8 } from "@/components/ui/Button8";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SectorsHero.module.css";

/** Figma 2789:11502 "Section - HERO" — copy on the right, the 672 x 410
    sector ecosystem image (2901:6386) on the left. */
export function SectorsHero() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.copy}>
        <h1 className={styles.title}>
          حلول رقمية مصممة
          <br />
          لاحتياجات كل قطاع.
        </h1>
        <p className={styles.text}>
          نقدّم منظومات تشغيل وتحول رقمي وذكاء اصطناعي، مصممة لتناسب طبيعة كل
          صناعة وتحوّل العمليات المعقدة إلى تجارب أكثر وضوحًا وكفاءة.
        </p>
        <div className={styles.actions}>
          <Button8>ناقش مشروعك معنا</Button8>
        </div>
      </Reveal>

      {/* Figma 2901:6386 "Mask Group" — the sector ecosystem render, 672 x 410,
          cover-fitted. It sits on the outer edge of its 636 track and runs
          36px into the gap, as drawn. */}
      <Reveal className={styles.visualWrap} delay={120}>
        <Image
          className={styles.visual}
          src="/images/sectors/hero-ecosystem.png"
          alt="منظومة Transformix تربط الصناعة والتعاونيات والتعليم وأنظمة التشغيل"
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
