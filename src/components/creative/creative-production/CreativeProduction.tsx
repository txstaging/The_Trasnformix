import Image from "next/image";
import type { ReactNode } from "react";
import { IconTile, type Icon } from "@/components/academies/AcademiesKit";
import { creative } from "@/components/creative/CreativeKit";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./CreativeProduction.module.css";

/* التصميم الإبداعي والإنتاج الإعلامي (Figma 4850:7981): the parts this page
   draws that the creative kit does not — the callout, the cards, the ruled
   list of capabilities and the six-step process. */

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export { styles as cp };

/** A section on the artboard's 1240px column. `compact` is the 104px rhythm of
    the capabilities; `subtle` is the grey band and `card` the cream one. */
export function CpSection({ id, labelledBy, band, compact, children }: {
  id?: string;
  labelledBy: string;
  band?: "subtle" | "card";
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx(styles.section, compact && styles.compact, band === "subtle" && styles.subtle, band === "card" && styles.cream)}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

/** Figma V2/Callout 4845:7030: a pale-blue note with a blue rule on its
    reading edge, the label over the text. */
export function Callout({ label, text }: { label: string; text: string }) {
  return (
    <div className={styles.callout}>
      <span className={styles.calloutBar} aria-hidden />
      <div className={styles.calloutBody}>
        <p className={styles.calloutLabel}>{label}</p>
        <p className={styles.calloutText}>{text}</p>
      </div>
    </div>
  );
}

/** Figma "Overview — نظرة عامة" 4850:7983: the paragraph on the reading edge,
    the callout beside it. */
export function Overview({ id, text, calloutLabel, calloutText }: {
  id: string;
  text: string;
  calloutLabel: string;
  calloutText: string;
}) {
  return (
    <Reveal className={styles.overview}>
      <p id={id} className={styles.overviewText}>
        {text}
      </p>
      <Callout label={calloutLabel} text={calloutText} />
    </Reveal>
  );
}

/** A heading block on the reading edge with its content beside it (Figma
    "Split layout" 4850:8021, 4850:8112): the heading 380px wide. */
export function SplitLayout({ id, eyebrow, title, children }: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className={styles.split}>
      <div className={styles.splitHeader}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={id} className={styles.splitTitle}>
          {title}
        </h2>
      </div>
      <div className={styles.splitBody}>{children}</div>
    </Reveal>
  );
}

export type Capability = { title: string; text: string };

/** Figma "Capability 01–09": a ruled list, each with its number in a pale
    badge before the title. */
export function CapabilityList({ items }: { items: readonly Capability[] }) {
  return (
    <ol className={styles.capabilities}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.capability}>
          <div className={styles.capabilityHead}>
            <span className={styles.capabilityNumber} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.capabilityTitle}>{item.title}</h3>
          </div>
          <p className={styles.capabilityText}>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

export type Info = { icon: string; title: string; text: string };

/** The cards (Figma 4850:8094, 4851:7513, 4850:8121): a 52px tile, the name and
    a note, three across or four. */
export function InfoCards({ items, columns }: { items: readonly Info[]; columns: 3 | 4 }) {
  return (
    <ul className={cx(styles.cards, columns === 4 && styles.cardsFour)}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.card} delay={(index % columns) * 80}>
          <span className={styles.tile} aria-hidden>
            <Image src={item.icon} alt="" width={26} height={26} />
          </span>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardText}>{item.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export type ProcessStep = { icon: Icon; title: string; text: string };

/** Figma "Process cards" 4924:8704: six cards, three across, each with a
    six-part bar that fills one part further than the one before. The kit's
    ProcessCards draws four parts, so this reuses its card and changes the bar. */
export function ProcessSix({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className={cx(creative.steps, creative.stepsThree, styles.process)}>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} className={creative.step} delay={(index % 3) * 80}>
          <div className={creative.stepTop}>
            <span className={creative.stepNumber} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <IconTile icon={step.icon} />
          </div>
          <h3 className={creative.stepTitle}>{step.title}</h3>
          <p className={creative.stepText}>{step.text}</p>
          <span className={creative.stepBar} aria-hidden>
            {[0, 1, 2, 3, 4, 5].map((part) => (
              <span key={part} className={cx(creative.stepPart, part <= index && creative.stepPartOn)} />
            ))}
          </span>
        </Reveal>
      ))}
    </ol>
  );
}
