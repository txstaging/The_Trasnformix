import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SectorsHero.module.css";

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
          <PillButton>ناقش مشروعك معنا</PillButton>
        </div>
      </Reveal>

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
