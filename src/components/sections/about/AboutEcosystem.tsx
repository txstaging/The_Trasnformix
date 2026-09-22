import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutEcosystem.module.css";

type Pillar = {
  title: string;
  /** Leading spaces are the artboard's own; they are kept (pre-wrap). */
  text: string;
  /** Only the website card sets its line in the secondary grey. */
  muted?: boolean;
  icon: { src: string; width: number; height: number };
  /** 1440 grid cell — column 1 is the right-hand one in RTL. */
  column: 1 | 2;
  row: 1 | 2;
  /** The 375 artboard draws the ERP heading a size smaller. */
  compactTitle?: boolean;
};

/* Listed in the 375 artboard's top-to-bottom order; the 1440 artboard places
   them in a two-by-two grid via `column` / `row`. */
const PILLARS: Pillar[] = [
  {
    title: "تطوير المواقع",
    text: " لبناء منصات وتجارب رقمية تدعم المبيعات والنمو.",
    muted: true,
    icon: { src: "/icons/about-globe.svg", width: 22, height: 24 },
    column: 2,
    row: 1,
  },
  {
    title: "تحليل البيانات و الذكاء الاصطناعي",
    text: "لتحويل البيانات إلى قرارات وبناء حلول أكثر ذكاءً.",
    icon: { src: "/icons/lucide-brain-circuit.svg", width: 24, height: 24 },
    column: 1,
    row: 1,
  },
  {
    title: "ERP & Automation",
    text: " لتبسيط العمليات وربط الإدارات وتقليل العمل اليدوي",
    icon: { src: "/icons/about-puzzle.svg", width: 24, height: 24 },
    column: 1,
    row: 2,
    compactTitle: true,
  },
  {
    title: "استديو الابداع",
    text: " لبناء علامات أقوى وربطها بالجمهور بصورة أكثر تأثيرًا.",
    icon: { src: "/icons/about-astroid.svg", width: 24, height: 24 },
    column: 2,
    row: 2,
  },
];

const rem = (px: number) => `${px / 10}rem`;

/** Figma 2515:59783 "Desktop - 110" and 2519:66494 on the 375 artboard. */
export function AboutEcosystem() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        نربط الخبرات لنصنع حلًا متكاملًا.
      </Reveal>

      {/* Two text boxes on the artboard (34 and 112 tall, each centred on its
          box); the 375 artboard runs them together as one paragraph. */}
      <Reveal as="p" className={styles.lead} delay={120}>
        <span className={styles.leadIntro}>
          هي شركة حلول وتحول رقمي تأسست بهدف سد الفجوة بين احتياجات الأعمال
          وإمكانات التكنولوجيا
        </span>
        <span className={styles.leadJoin}>{"  "}</span>
        <span className={styles.leadBody}>
          لا ننظر إلى الموقع، نظام الـERP، حملة التسويق أو حل الذكاء الاصطناعي
          كمنتجات منفصلة. نبدأ بفهم نموذج العمل، العمليات، العملاء، البيانات
          والأهداف، ثم نحدد أين يمكن للتقنية والإبداع أن يصنعا تأثيرًا
          حقيقيًا.اليوم تجمع منظومتنا بين:
        </span>
      </Reveal>

      <ul className={styles.grid}>
        {PILLARS.map((pillar, index) => (
          <Reveal
            as="li"
            key={pillar.title}
            className={styles.item}
            delay={index * 90}
            style={
              {
                "--column": pillar.column,
                "--row": pillar.row,
              } as CSSProperties
            }
          >
            <div className={styles.marker} aria-hidden>
              <span className={styles.badge}>
                <Image
                  className={styles.badgeIcon}
                  style={
                    {
                      "--w": rem(pillar.icon.width),
                      "--h": rem(pillar.icon.height),
                    } as CSSProperties
                  }
                  src={pillar.icon.src}
                  alt=""
                  width={pillar.icon.width}
                  height={pillar.icon.height}
                />
              </span>
              <span className={styles.stem} />
            </div>

            <div className={styles.card}>
              <h3
                dir="auto"
                className={[
                  styles.cardTitle,
                  pillar.compactTitle && styles.cardTitleCompact,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {pillar.title}
              </h3>
              <p
                className={[styles.cardText, pillar.muted && styles.cardTextMuted]
                  .filter(Boolean)
                  .join(" ")}
              >
                {pillar.text}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
