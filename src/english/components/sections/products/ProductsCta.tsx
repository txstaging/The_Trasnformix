import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/products/ProductsCta.module.css";

/** Figma 3817:48455 — the 1028 x 376 gradient card closing the products
    page, centred in a 549 high white band. */
export function ProductsCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.card}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{"Let us find where transformation will make the biggest difference."}</h2>
          <p className={styles.text}>
            {" From the first idea to launch, we work with you to create an identity, experience, and content that express your brand and make a real impact. "}</p>
        </div>

        <PillButton variant="outline" className={styles.button}>
          {" Request a free consultation "}</PillButton>
      </Reveal>
    </section>
  );
}
