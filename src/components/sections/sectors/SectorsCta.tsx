import { Button8 } from "@/components/ui/Button8";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SectorsCta.module.css";

/** Figma 2789:11785 "Section - CTA" — the navy closing banner. */
export function SectorsCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.card}>
        <span className={`${styles.ring} ${styles.ringTop}`} aria-hidden />
        <span className={`${styles.ring} ${styles.ringBottom}`} aria-hidden />

        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden />
            هل تعمل في أحد هذه القطاعات؟
          </p>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>خلّينا نبني الحل المناسب لطبيعة شغلك.</h2>
          </div>
          <p className={styles.text}>
            شاركنا التحدي أو الفكرة، ونبدأ من فهم احتياجك الحقيقي ثم نحولها إلى
            منظومة رقمية قابلة للتنفيذ.
          </p>
          <Button8>احجز استشارة مجانية</Button8>
        </div>
      </Reveal>
    </section>
  );
}
