import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/about/AboutEcosystem.module.css";

type Pillar = {
  title: string;
  /** Leading spaces are the artboard's own; they are kept (pre-wrap). */
  text: string;
  muted?: boolean;
  icon: { src: string; width: number; height: number };
  /** 1440 grid cell — column 1 is the right-hand one in RTL. */
  column: 1 | 2;
  row: 1 | 2;
  compactTitle?: boolean;
};

/* Listed in the 375 artboard's top-to-bottom order; the 1440 artboard places
   them in a two-by-two grid via `column` / `row`. */
const PILLARS: Pillar[] = [
  {
    title: "Web development",
    text: "Build digital platforms and experiences that support sales and growth.",
    muted: true,
    icon: { src: "/icons/about-globe.svg", width: 22, height: 24 },
    column: 2,
    row: 1,
  },
  {
    title: "Data analytics and AI",
    text: "Turn data into decisions and build smarter solutions.",
    icon: { src: "/icons/lucide-brain-circuit.svg", width: 24, height: 24 },
    column: 1,
    row: 1,
  },
  {
    title: "ERP & Automation",
    text: "Simplify operations, connect departments, and reduce manual work.",
    icon: { src: "/icons/about-puzzle.svg", width: 24, height: 24 },
    column: 1,
    row: 2,
    compactTitle: true,
  },
  {
    title: "Creative studio",
    text: "Build stronger brands and connect with audiences more effectively.",
    icon: { src: "/icons/about-astroid.svg", width: 24, height: 24 },
    column: 2,
    row: 2,
  },
];

const rem = (px: number) => `${px / 10}rem`;

export function AboutEcosystem() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        {" Combining expertise to build a complete solution. "}</Reveal>

      <Reveal as="p" className={styles.lead} delay={120}>
        <span className={styles.leadIntro}>
          {" A digital solutions and transformation company founded to bridge the gap between business needs and the possibilities of technology. "}</span>
        <span className={styles.leadJoin}>{"  "}</span>
        <span className={styles.leadBody}>
          {" We view websites, ERP systems, marketing campaigns, and AI solutions as parts of one connected business. We start by understanding your business model, operations, customers, data, and goals, then identify where technology and creativity can make a real difference. Our capabilities include: "}</span>
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
