import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ProductsCta.module.css";

/** Figma 3817:48455 — the 1028 x 376 gradient card closing the products
    page, centred in a 549 high white band. */
export function ProductsCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.card}>
        <div className={styles.copy}>
          <h2 className={styles.title}>لنحدد أين سيصنع التحول الفرق الأكبر.</h2>
          <p className={styles.text}>
            من أول فكرة إلى الإطلاق، نصنع معك هوية وتجربة ومحتوى يعبر عن علامتك
            ويصنع أثرًا حقيقيًا.
          </p>
        </div>

        <PillButton variant="outline" className={styles.button}>
          طلب استشارة مجانية
        </PillButton>
      </Reveal>
    </section>
  );
}
