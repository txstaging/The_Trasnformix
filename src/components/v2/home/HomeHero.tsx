import { V2, contactHref } from "@/components/v2/routes";
import { Button } from "@/components/v2/ui/Button";
import { Media } from "@/components/v2/ui/Media";
import motion from "@/components/v2/ui/Motion.module.css";
import styles from "./HomeHero.module.css";

/** Figma "Home hero" (3693:64497): the headline and its actions on the right,
    the supplied cooperative dashboard in a pale 560 x 388 frame on the left. */
export function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.copy} ${motion.heroCopy}`}>
        <h1 className={styles.title}>نحو أعمال أكثر وضوحًا، وأثرٍ يدوم.</h1>
        <p className={styles.lead}>
          نربط فهم الأعمال بالتقنية، لنساعد منشأتك على قراءة بياناتها، وتطوير حضورها الرقمي،
          وتنظيم عملياتها بخطوات عملية ومدروسة.
        </p>
        <div className={`${styles.actions} ${motion.heroActions}`}>
          <Button href={contactHref()}>اطلب استشارة مجانية</Button>
          <Button href={V2.services} variant="outline">
            اطلب الخدمة
          </Button>
        </div>
      </div>

      <Media
        className={styles.visual}
        src="/v2/screens/cooperative-dashboard.png"
        alt="لوحة منصة إدارة التعاونيات"
        width={560}
        height={388}
        radius={32}
        fit="contain"
        priority
      />
    </section>
  );
}
