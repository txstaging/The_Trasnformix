import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "./Hero.module.css";

/* Figma 3652:7318 — headline, a three-line lead and the two calls to action,
   above the 1240 x 564 media band (Figma 3648:6871). */
export function Hero() {
  return (
    <section className={`${styles.hero} ${tajawal.variable}`}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <Reveal as="h1" className={styles.title}>
            شريكك التقني لتطوير الأعمال
          </Reveal>
          <Reveal className={styles.lead} delay={120}>
            {/* <p className={styles.subtitle}>
              من أتمتة العمليات بالذكاء الاصطناعي إلى المنصات الرقمية المتكاملة
            </p> */}
            <p className={styles.text}>
              <span className={styles.textLine}>معنا في ترانسفورمكس ندمج بين حلول الذكاء الاصطناعي، تطوير البرمجيات، وأنظمة ERP</span>{" "}
              <span className={styles.textLine}>لنلغي الهدر التشغيلي ونمنحك تجارب رقمية تقود نمو شركتك بثقة</span>{" "}
              <span className={styles.textEnding}>وبقرارات مبنية على البيانات</span>
            </p>
          </Reveal>
        </div>
        <Reveal className={styles.actions} delay={240}>
          <PillButton className={styles.primaryAction}>
            ناقش مشروعك مع خبير تقني
          </PillButton>
          <PillButton href="/works" variant="soft">
            عرض سابقة الاعمال
          </PillButton>
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
          aria-label="عرض أعمال Transformix"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
