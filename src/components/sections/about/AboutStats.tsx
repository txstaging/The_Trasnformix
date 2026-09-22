import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutStats.module.css";

type Box = { left: number; top: number; width: number; height: number };

type Glyph = { src: string; box: Box };

type Stat = {
  icon: string;
  title: string;
  /** The 375 artboard words the first title differently. */
  mobileTitle?: string;
  text: string;
  /* Vector counters exported from Figma, placed at their *rendered* boxes
     (the artboard insets each frame to let the stroke bleed). */
  number: Glyph;
  plus: Glyph;
  mobileNumber: Glyph;
  mobilePlus: Glyph;
  /** The 375 artboard: width of the counter row and its gap to the icon. */
  mobileWidth: number;
  mobileGap: number;
  mobileTitleWidth?: number;
  mobileTextWidth: number;
};

/* Right-to-left order: the 51+ card sits furthest right at 1440 and first at
   375. The 1440 counters share their geometry with the home page's; only the
   stroke is black here. */
const STATS: Stat[] = [
  {
    icon: "/icons/stat-icon-1.svg",
    title: "مشروع وحل رقمي",
    mobileTitle: "مشروع تحول رقمي",
    text: "نفذنا حلولًا رقمية لعلامات وشركات في قطاعات واحتياجات مختلفة.",
    number: {
      src: "/icons/about-num-51.svg",
      box: { left: 161, top: 0.55, width: 141, height: 106.445 },
    },
    plus: {
      src: "/icons/about-plus.svg",
      box: { left: 324, top: 35, width: 47, height: 46 },
    },
    mobileNumber: {
      src: "/icons/about-num-51-mobile.svg",
      box: { left: 52, top: 3.851, width: 196, height: 74.1936 },
    },
    mobilePlus: {
      src: "/icons/about-plus-mobile.svg",
      box: { left: 215, top: 19, width: 45, height: 44 },
    },
    mobileWidth: 312,
    mobileGap: 24,
    mobileTextWidth: 312,
  },
  {
    icon: "/icons/stat-icon-2.svg",
    title: "حلول AI وAutomation",
    text: "حل بالذكاء الاصطناعي و Automation تم تطويرها لخدمة تحديات حقيقية في الأعمال.",
    number: {
      src: "/icons/about-num-20.svg",
      box: { left: 158, top: 1, width: 153, height: 111 },
    },
    plus: {
      src: "/icons/about-plus.svg",
      box: { left: 324, top: 35, width: 47, height: 46 },
    },
    mobileNumber: {
      src: "/icons/about-num-20-mobile.svg",
      box: { left: 129.66, top: 15, width: 114, height: 76 },
    },
    mobilePlus: {
      src: "/icons/about-plus-mobile.svg",
      box: { left: 256.66, top: 34, width: 45, height: 44 },
    },
    mobileWidth: 373.328,
    mobileGap: 24,
    mobileTitleWidth: 322,
    mobileTextWidth: 322,
  },
  {
    icon: "/icons/stat-icon-3.svg",
    title: "سنوات من الخبرة",
    text: "خبرة تجمع بين التقنية، التصميم، التسويق وتطوير الأعمال.",
    number: {
      src: "/icons/about-num-10.svg",
      box: { left: 171.67, top: 0.55, width: 137, height: 106.445 },
    },
    plus: {
      src: "/icons/about-plus-2.svg",
      box: { left: 324.67, top: 35, width: 48, height: 46 },
    },
    mobileNumber: {
      src: "/icons/about-num-10-mobile.svg",
      box: { left: 117.66, top: 0.851, width: 137, height: 74.1936 },
    },
    mobilePlus: {
      src: "/icons/about-plus-2-mobile.svg",
      box: { left: 252.66, top: 16, width: 46, height: 44 },
    },
    mobileWidth: 373.328,
    mobileGap: 32,
    mobileTitleWidth: 305,
    mobileTextWidth: 327,
  },
];

const rem = (px: number) => `${px / 10}rem`;

const boxVars = (prefix: string, box: Box) =>
  ({
    [`--${prefix}-l`]: rem(box.left),
    [`--${prefix}-t`]: rem(box.top),
    [`--${prefix}-w`]: rem(box.width),
    [`--${prefix}-h`]: rem(box.height),
  }) as CSSProperties;

function Counter({ glyph, mobile, className }: { glyph: Glyph; mobile: boolean; className: string }) {
  return (
    <Image
      className={className}
      style={boxVars(mobile ? "m" : "d", glyph.box)}
      src={glyph.src}
      alt=""
      width={Math.round(glyph.box.width)}
      height={Math.round(glyph.box.height)}
      aria-hidden
    />
  );
}

/**
 * Figma 2519:67017 "Desktop - 139" (the counters) and 2515:59912
 * "Desktop - 113" (its heading); 2525:3123 on the 375 artboard.
 *
 * NOTE: the 1440 artboard stacks the heading band *under* the counters while
 * the 375 one puts it on top. The markup keeps the heading first and the
 * 1440 order is restored with `order`, so both match their artboards.
 */
export function AboutStats() {
  return (
    <section className={styles.section}>
      <div className={styles.headBand}>
        <Reveal as="h2" className={styles.heading}>
          خبرة تُترجم إلى حلول
        </Reveal>
      </div>

      <div className={styles.cardsBand}>
        <div className={styles.inner}>
          <div className={styles.cards}>
            {STATS.map((stat, index) => (
              <Reveal
                key={stat.title}
                className={styles.card}
                delay={index * 130}
                style={
                  {
                    "--m-width": rem(stat.mobileWidth),
                    "--m-gap": rem(stat.mobileGap),
                    "--m-title-width": stat.mobileTitleWidth
                      ? rem(stat.mobileTitleWidth)
                      : "auto",
                    "--m-text-width": rem(stat.mobileTextWidth),
                  } as CSSProperties
                }
              >
                <Image
                  className={styles.cardIcon}
                  src={stat.icon}
                  alt=""
                  width={54}
                  height={54}
                  aria-hidden
                />

                <div className={styles.cardBody}>
                  <div className={styles.figure}>
                    <Counter glyph={stat.number} mobile={false} className={styles.number} />
                    <Counter glyph={stat.plus} mobile={false} className={styles.plus} />
                    <Counter
                      glyph={stat.mobileNumber}
                      mobile
                      className={`${styles.number} ${styles.mobileGlyph}`}
                    />
                    <Counter
                      glyph={stat.mobilePlus}
                      mobile
                      className={`${styles.plus} ${styles.mobileGlyph}`}
                    />
                  </div>

                  <div className={styles.cardTitleWrap}>
                    <h3 dir="auto" className={styles.cardTitle}>
                      {stat.mobileTitle ? (
                        <>
                          <span className={styles.wideOnly}>{stat.title}</span>
                          <span className={styles.narrowOnly}>
                            {stat.mobileTitle}
                          </span>
                        </>
                      ) : (
                        stat.title
                      )}
                    </h3>
                  </div>

                  <div className={styles.cardTextWrap}>
                    <p dir="auto" className={styles.cardText}>
                      {stat.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
