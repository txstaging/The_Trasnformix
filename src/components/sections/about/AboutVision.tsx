import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutVision.module.css";

type Statement = {
  key: "vision" | "mission";
  title: string;
  text: string;
  icon: { src: string; width: number; height: number };
};

/* Right-to-left: رؤيتنا sits on the right at 1440 and first at 375.
   NOTE: the 375 artboard badges both cards with the eye glyph; that is kept
   here (see `.iconMobile`), while 1440 gives رسالتنا its own target glyph. */
const STATEMENTS: Statement[] = [
  {
    key: "vision",
    title: "رؤيتنا",
    text: "أن تصبح التكنولوجيا والبيانات محركًا حقيقيًا لنمو الأعمال واتخاذ القرار بكفاءة.",
    icon: { src: "/icons/about-vision.svg", width: 27, height: 24 },
  },
  {
    key: "mission",
    title: "رسالتنا",
    text: "نحوّل تحديات الأعمال إلى حلول رقمية عملية من خلال الدمج بين الفهم التجاري والتنفيذ التقني.",
    icon: { src: "/icons/about-mission.svg", width: 24, height: 24 },
  },
];

/** Figma 2515:59851 "Desktop - 138" and 2519:66543 on the 375 artboard. */
export function AboutVision() {
  return (
    <section className={styles.section}>
      <div className={styles.stage}>
        <Reveal as="h2" className={styles.title}>
          رؤية واضحة. رسالة عملية. أثر قابل للقياس.
        </Reveal>

        <Reveal className={styles.figure} delay={100}>
          <Image
            className={styles.figureImage}
            src="/images/about-vision.png"
            alt="مساران يلتقيان عند هدف واحد وسط رسوم بيانية ووحدات تقنية"
            width={1254}
            height={1254}
            sizes="(max-width: 640px) 232px, (max-width: 1024px) 387px, 26.875vw"
          />
        </Reveal>

        <div className={styles.cards}>
          {STATEMENTS.map((item, index) => (
            <Reveal
              key={item.key}
              className={`${styles.card} ${styles[item.key]}`}
              delay={200 + index * 120}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardHead}>
                  <span className={styles.iconBox} aria-hidden>
                    <Image
                      className={styles.icon}
                      src={item.icon.src}
                      alt=""
                      width={item.icon.width}
                      height={item.icon.height}
                    />
                    <Image
                      className={styles.iconMobile}
                      src="/icons/about-vision-mobile.svg"
                      alt=""
                      width={14}
                      height={12}
                    />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
