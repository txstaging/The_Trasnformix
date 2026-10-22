import Image from "next/image";
import type { CSSProperties } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./PageHero.module.css";

type Lines = {
  src: string;
  /** Box on the 1440 artboard, in px; the export is already clipped to the band. */
  width: number;
  height: number;
  top: number;
};

type PageHeroProps = {
  title: string;
  text: string;
  cta: string;
  /** Band height on the 1440 artboard, including the bar it tucks under. */
  height: number;
  textHeight: number;
  lines: { left: Lines; right: Lines };
  mobileTextHeight?: number;
  /** How much of the band runs up behind the header: the 82px bar of the
      earlier artboards, or the 117px the floating pill (34 + 83) claims. */
  tuck?: number;
  /** The copy block's box on the artboard, when a page moves it. */
  copy?: { left: number; top: number; width: number };
  titleWeight?: 500 | 700;
  /** Resizes the CTA pill through its --pill-* properties. */
  ctaClassName?: string;
};

const rem = (px: number) => `${px / 10}rem`;

/**
 * The inner-page hero: Figma 2515:53514 (about, 1440 x 552) and 2418:33584
 * (works, 1440 x 391) share one composition — an 837 wide copy block at
 * (293, 168) between two circuit-line clusters. Later pages (products,
 * 3817:42121) move the block and tuck under the floating bar via props. Only the 375 about artboard
 * is drawn for phones, so its clusters and spacing serve every inner page.
 */
export function PageHero({
  title,
  text,
  cta,
  height,
  textHeight,
  lines,
  mobileTextHeight,
  tuck,
  copy,
  titleWeight,
  ctaClassName,
}: PageHeroProps) {
  return (
    <section
      className={styles.hero}
      style={
        {
          "--hero-h": rem(height),
          "--text-h": rem(textHeight),
          "--m-text-h": mobileTextHeight ? rem(mobileTextHeight) : "auto",
          "--ll-w": rem(lines.left.width),
          "--ll-h": rem(lines.left.height),
          "--ll-t": rem(lines.left.top),
          "--lr-w": rem(lines.right.width),
          "--lr-h": rem(lines.right.height),
          "--lr-t": rem(lines.right.top),
          ...(tuck && { "--tuck": rem(tuck) }),
          ...(copy && {
            "--copy-l": rem(copy.left),
            "--copy-t": rem(copy.top),
            "--copy-w": rem(copy.width),
          }),
          ...(titleWeight && { "--title-weight": titleWeight }),
        } as CSSProperties
      }
    >
      <Image
        className={`${styles.lines} ${styles.linesLeft}`}
        src={lines.left.src}
        alt=""
        width={lines.left.width}
        height={lines.left.height}
        priority
        aria-hidden
      />
      <Image
        className={`${styles.lines} ${styles.linesRight}`}
        src={lines.right.src}
        alt=""
        width={lines.right.width}
        height={lines.right.height}
        priority
        aria-hidden
      />
      <Image
        className={`${styles.lines} ${styles.linesLeftMobile}`}
        src="/icons/about-hero-lines-left-mobile.svg"
        alt=""
        width={140}
        height={257}
        aria-hidden
      />
      <Image
        className={`${styles.lines} ${styles.linesRightMobile}`}
        src="/icons/about-hero-lines-right-mobile.svg"
        alt=""
        width={65}
        height={213}
        aria-hidden
      />

      <div className={styles.stage}>
        <div className={styles.content}>
          <div className={styles.copy}>
            <Reveal as="h1" className={styles.title}>
              {title}
            </Reveal>
            <Reveal as="p" className={styles.text} delay={120}>
              {text}
            </Reveal>
          </div>
          <Reveal className={styles.cta} delay={240}>
            <PillButton className={ctaClassName}>{cta}</PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
