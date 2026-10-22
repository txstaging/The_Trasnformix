import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./FeatureCard.module.css";
import motion from "./Motion.module.css";

export type FeatureCardTone =
  /** #f4f7fc with a navy title (Figma 3693:64539). */
  | "blue"
  /** #f5f6f8 with a black title (3693:64872). */
  | "neutral"
  /** The blue gradient with white type (3693:64855). */
  | "gradient"
  /** The gradient held dark across the middle (3693:65337). */
  | "gradient-deep"
  /** A 20% wash for cards set on the gradient panel (3693:64741). */
  | "glass"
  /** The tall home service tile with a 90px icon (3733:8906). */
  | "service";

export type Feature = {
  icon: string;
  title: string;
  text: ReactNode;
  href?: string;
  external?: boolean;
};

type FeatureCardProps = Feature & {
  tone?: FeatureCardTone;
  /** The icon's own px size; every exported icon is square. */
  iconSize?: 28 | 36 | 90;
  /** Position along its row, to stagger the cards' rise. */
  step?: number;
};

/** Figma "Offering": an icon, a 22px Bold title and a 16px description,
    centred in a 240px-high card with 28px padding. */
export function FeatureCard({
  icon,
  title,
  text,
  href,
  external = false,
  tone = "neutral",
  iconSize = tone === "service" ? 90 : 28,
  step = 0,
}: FeatureCardProps) {
  const body = (
    <>
      <Image
        className={styles.icon}
        src={icon}
        alt=""
        width={iconSize}
        height={iconSize}
        style={{ "--icon": `${iconSize / 10}rem` } as CSSProperties}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </>
  );

  const className = `${styles.card} ${styles[tone]} ${motion.rise}`;
  const style = { "--rise-step": step } as CSSProperties;

  return href ? (
    <Link href={href} className={`${className} ${styles.link}`} style={style}
      target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {body}
    </Link>
  ) : (
    <article className={className} style={style}>
      {body}
    </article>
  );
}

type CardGridProps = {
  items: Feature[];
  tone?: FeatureCardTone;
  iconSize?: 28 | 36 | 90;
  /** Cards per row on desktop; the artboards use three or four. Two rows of
      two (the home services) pass 2. */
  columns?: 2 | 3 | 4;
  /** Design px between rows when the cards wrap; 24 like the columns unless
      set (the home services rows sit 40 apart). */
  rowGap?: number;
  className?: string;
};

/** A row of offering cards, 24px apart. Items are listed in reading order
    (right to left). */
export function CardGrid({
  items,
  tone,
  iconSize,
  columns = items.length as 2 | 3 | 4,
  rowGap,
  className,
}: CardGridProps) {
  return (
    <div
      className={[styles.grid, className].filter(Boolean).join(" ")}
      style={
        {
          "--cols": columns,
          "--row-gap": rowGap ? `${rowGap / 10}rem` : undefined,
        } as CSSProperties
      }
    >
      {items.map((item, index) => (
        <FeatureCard
          key={item.title}
          {...item}
          tone={tone}
          iconSize={iconSize}
          step={index % columns}
        />
      ))}
    </div>
  );
}
