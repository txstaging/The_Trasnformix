import Image from "next/image";
import { Media } from "@/english/components/v2/ui/Media";
import styles from "@/english/components/v2/services/CampaignConcept.module.css";

/** Figma "Campaign concept" (3693:65724): the marketing page's visual — a
    sample campaign card on a pale blue mat. */
export function CampaignConcept() {
  return (
    <figure className={styles.concept}>
      <p className={styles.label}>
        {" Consistency makes a difference "}<Image src="/v2/icons/marketing-sparkles.svg" alt="" width={28} height={28} />
      </p>
      <div className={styles.artwork}>
        <p className={styles.headline}>{"A clear message. A consistent presence."}</p>
        <Media
          className={styles.image}
          src="/v2/images/marketing-creative.png"
          alt={"Blue glass shapes on a marble platform"}
          width={466}
          height={200}
          radius={12}
          priority
        />
        <p className={styles.tagline}>{"From strategy to content and design"}</p>
      </div>
      <figcaption className={styles.caption}>{"An illustrative visual direction for a digital campaign."}</figcaption>
    </figure>
  );
}
