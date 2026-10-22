import Image from "next/image";
import { Media } from "@/components/v2/ui/Media";
import styles from "./CampaignConcept.module.css";

/** Figma "Campaign concept" (3693:65724): the marketing page's visual — a
    sample campaign card on a pale blue mat. */
export function CampaignConcept() {
  return (
    <figure className={styles.concept}>
      <p className={styles.label}>
        اتساق يصنع الفرق
        <Image src="/v2/icons/marketing-sparkles.svg" alt="" width={28} height={28} />
      </p>
      <div className={styles.artwork}>
        <p className={styles.headline}>رسالة واضحة. حضور متّسق.</p>
        <Media
          className={styles.image}
          src="/v2/images/marketing-creative.png"
          alt="أشكال زجاجية زرقاء على منصة رخامية"
          width={466}
          height={200}
          radius={12}
          priority
        />
        <p className={styles.tagline}>من الاستراتيجية إلى المحتوى والتصميم</p>
      </div>
      <figcaption className={styles.caption}>تصور بصري توضيحي لاتجاه حملة رقمية.</figcaption>
    </figure>
  );
}
