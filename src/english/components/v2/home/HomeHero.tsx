import { V2, contactHref } from "@/english/components/v2/routes";
import { Button } from "@/english/components/v2/ui/Button";
import { Media } from "@/english/components/v2/ui/Media";
import motion from "@/english/components/v2/ui/Motion.module.css";
import styles from "@/english/components/v2/home/HomeHero.module.css";

/** Figma "Home hero" (3693:64497): the headline and its actions on the right,
    the supplied cooperative dashboard in a pale 560 x 388 frame on the left. */
export function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.copy} ${motion.heroCopy}`}>
        <h1 className={styles.title}>{"Clearer business direction. Lasting impact."}</h1>
        <p className={styles.lead}>
          {" We connect business understanding with technology to help your organization interpret its data, improve its digital presence, and organize operations through practical, considered steps. "}</p>
        <div className={`${styles.actions} ${motion.heroActions}`}>
          <Button href={contactHref()}>{"Get a free consultation"}</Button>
          <Button href={V2.services} variant="outline">
            {" Request this service "}</Button>
        </div>
      </div>

      <Media
        className={styles.visual}
        src="/v2/screens/cooperative-dashboard.png"
        alt={"Cooperative management platform dashboard"}
        width={560}
        height={388}
        radius={32}
        fit="contain"
        priority
      />
    </section>
  );
}
