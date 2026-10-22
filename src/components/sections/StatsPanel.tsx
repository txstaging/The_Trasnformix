import Image from "next/image";
import type { ReactNode } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { notoSerif } from "@/lib/fonts";
import styles from "./StatsPanel.module.css";

export type Stat = {
  value: number;
  /** An exported icon file, or an `element` for a mark built from layers. */
  icon: { width: number; height: number } & ({ src: string } | { element: ReactNode });
  title: string;
  text: string;
};

type StatsPanelProps = {
  stats: Stat[];
  /** Milliseconds before the panel fades in; the cards follow it. */
  delay?: number;
  /** `light` — white cards on the blue gradient (Figma 3648:6872).
      `dark` — glass cards on the navy panel of the home intro (3800:4860). */
  tone?: "light" | "dark";
};

const rem = (px: number) => `${px / 10}rem`;

/** The panel of counter cards shared by the home intro and the about page.
    Each card rises in turn and its number counts up from 0. */
export function StatsPanel({ stats, delay = 0, tone = "light" }: StatsPanelProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={`${styles.panel} ${dark ? styles.dark : ""} ${notoSerif.variable}`}
      delay={delay}
    >
      <div className={styles.cards}>
        {stats.map((stat, index) => {
          const cardDelay = delay + 100 + index * 130;
          const { icon } = stat;
          return (
            <Reveal key={stat.title} className={styles.card} delay={cardDelay}>
              <div className={styles.cardTop}>
                {"element" in icon ? (
                  <span
                    className={styles.cardIcon}
                    style={{ width: rem(icon.width), height: rem(icon.height) }}
                  >
                    {icon.element}
                  </span>
                ) : (
                  <Image
                    className={styles.cardIcon}
                    style={{ width: rem(icon.width), height: rem(icon.height) }}
                    src={icon.src}
                    alt=""
                    width={icon.width}
                    height={icon.height}
                    aria-hidden
                  />
                )}
              </div>

              {/* The counter reads left-to-right with the plus on its right;
                  it counts up from 0 once the card scrolls into view. */}
              <div className={styles.figure} dir="ltr">
                <CountUp className={styles.figureNumber} to={stat.value} delay={cardDelay} />
                <span className={styles.figurePlus} aria-hidden>
                  <Image
                    src={dark ? "/icons/stat-plus-light.svg" : "/icons/stat-plus.svg"}
                    alt=""
                    width={48}
                    height={46}
                  />
                </span>
              </div>

              <div className={styles.cardCopy}>
                <p dir="auto" className={styles.cardTitle}>
                  {stat.title}
                </p>
                <p dir="auto" className={styles.cardText}>
                  {stat.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}
