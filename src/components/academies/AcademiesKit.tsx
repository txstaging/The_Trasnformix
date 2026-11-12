import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AcademyAction, type Action } from "./AcademyAction";
import { ClampText } from "./ClampText";
import styles from "./Academies.module.css";

/* The parts of the "الأكاديميات" redesign (Figma 4726:4790). Lists are kept
   in reading order: on the RTL page the first item sits on the right. */

export { styles as academies };

export type Icon = { src: string; size: 16 | 26 | 28 };

/** The pale blue square behind each line icon. */
export function IconTile({ icon }: { icon: Icon }) {
  const size = icon.size === 28 ? styles.iconTileLarge : icon.size === 16 ? styles.iconTileSmall : "";
  return (
    <span className={`${styles.iconTile} ${size}`} aria-hidden>
      <Image src={icon.src} alt="" width={icon.size} height={icon.size} />
    </span>
  );
}

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** The 1440 × 600 opening band. Each word of the title is its own span so it
    can rise in turn; the reader still hears the whole line. */
export function AcademiesHero({ id, title, paragraphs, actions }: {
  id: string;
  title: string;
  paragraphs: readonly string[];
  /** In reading order. */
  actions: readonly Action[];
}) {
  const words = title.split(" ");
  const rise = (ms: number) => ({ "--rise": `${ms}ms` }) as CSSProperties;
  return (
    <section className={styles.hero} aria-labelledby={id}>
      <div className={styles.heroMedia} aria-hidden>
        <Image
          className={styles.heroImage}
          src="/images/academies/banner.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
        />
      </div>
      <div className={styles.heroCopy}>
        <h1 id={id} className={styles.heroTitle}>
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className={styles.heroWord} style={{ "--word": index } as CSSProperties}>
                {word}
              </span>
              {index < words.length - 1 && " "}
            </span>
          ))}
        </h1>
        <div className={styles.heroText}>
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={styles.heroRise} style={rise(800 + index * 150)}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className={cx(styles.heroActions, styles.heroRise)} style={rise(1100)}>
          {actions.map((action) => (
            <AcademyAction key={action.label} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** A section's heading block, centred unless `start` is set. */
export function SectionIntro({ id, title, text, start, narrow }: {
  id: string;
  title: string;
  text?: ReactNode;
  start?: boolean;
  /** Holds the lead to the artboard's 1083px. */
  narrow?: boolean;
}) {
  return (
    <Reveal className={cx(styles.intro, start && styles.introStart)}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {text && <p className={cx(styles.lead, narrow && styles.leadNarrow)}>{text}</p>}
    </Reveal>
  );
}

export type Feature = { icon: Icon; title: string; text: string };

/** The feature cards: three across, two on tablets; on phones they either
    scroll sideways (`carousel`) or stack. */
export function FeatureCards({ items, layout, minHeight }: {
  items: readonly Feature[];
  layout: "carousel" | "stack";
  /** The cards' least height on the desktop artboard, in px. */
  minHeight?: number;
}) {
  return (
    <ul
      className={cx(styles.cards, styles[layout])}
      style={minHeight ? ({ "--card-min": `${minHeight / 10}rem` } as CSSProperties) : undefined}
    >
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.card} delay={(index % 3) * 80}>
          <IconTile icon={item.icon} />
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <ClampText text={item.text} />
        </Reveal>
      ))}
    </ul>
  );
}

export type Pillar = { icon: Icon; title: string; text: string };

/** The larger cards whose copy is shown in full. */
export function Pillars({ items, layout }: { items: readonly Pillar[]; layout: "learning" | "alumni" }) {
  return (
    <ul className={styles[layout]}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.pillar} delay={(index % 3) * 80}>
          <IconTile icon={item.icon} />
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.pillarText}>{item.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export type Photo = {
  src: string;
  alt: string;
  /** The photo's height on the desktop artboard, in px. */
  height: number;
  /** How dark its veil is, 0–1. */
  shade?: number;
  /** `object-position`, where the artboard crops off-centre. */
  focus?: string;
};

/** A 540px photo beside its copy; on tablets and phones the photo leads. */
export function Split({ id, photo, far, className, children }: {
  id?: string;
  photo: Photo;
  /** Puts the photo on the far (left) side. */
  far?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className={cx(styles.split, far && styles.splitFar)}>
      <Reveal
        className={styles.splitMedia}
        delay={80}
        style={{
          "--media-h": `${photo.height / 10}rem`,
          "--shade": photo.shade ?? 0.2,
          "--focus": photo.focus,
        } as CSSProperties}
      >
        <Image
          className={styles.splitImage}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 540px"
        />
      </Reveal>
      <Reveal className={cx(styles.splitCopy, className)}>{children}</Reveal>
    </div>
  );
}

export type Academy = {
  id: string;
  title: string;
  summary: string;
  details: readonly { label: string; text: string }[];
  action: Action;
  photo: Photo;
};

/** One academy: its name, who it serves and what it trains, then the call. */
export function AcademyRow({ academy, far }: { academy: Academy; far?: boolean }) {
  const heading = `${academy.id}-heading`;
  return (
    <Split id={academy.id} photo={academy.photo} far={far}>
      <h3 id={heading} className={styles.academyTitle}>
        {academy.title}
      </h3>
      <p className={styles.body}>{academy.summary}</p>
      {academy.details.map((detail) => (
        <p key={detail.label} className={styles.detail}>
          <strong>{detail.label}</strong> {detail.text}
        </p>
      ))}
      <div className={styles.splitAction}>
        <AcademyAction action={academy.action} />
      </div>
    </Split>
  );
}

/** The outcomes, each led by a shield tick. */
export function Outcomes({ items }: { items: readonly { label: string; text: string }[] }) {
  return (
    <ul className={styles.outcomes}>
      {items.map((item) => (
        <li key={item.label} className={styles.outcome}>
          <IconTile icon={{ src: "/icons/academies/shield-check.svg", size: 16 }} />
          <p>
            <strong>{item.label}</strong> {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** The closing card: the call, its note and up to two buttons. */
export function ClosingCard({ id, title, text, actions }: {
  id: string;
  title: string;
  text: string;
  /** In reading order. */
  actions: readonly Action[];
}) {
  return (
    <section className={cx(styles.section, styles.closing)} aria-labelledby={id}>
      <Reveal className={styles.closingCard}>
        <div className={styles.closingCopy}>
          <h2 id={id} className={styles.closingTitle}>
            {title}
          </h2>
          <p className={styles.closingText}>{text}</p>
        </div>
        <div className={styles.closingActions}>
          {actions.map((action) => (
            <AcademyAction key={action.label} action={action} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
