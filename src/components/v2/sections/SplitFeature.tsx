import type { CSSProperties, ReactNode } from "react";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./SplitFeature.module.css";

type SplitFeatureProps = {
  eyebrow: string;
  title: string;
  /** The 20px paragraph under the title. */
  lead: string;
  /** The smaller 16px paragraph that follows. */
  note?: string;
  action?: ReactNode;
  /** The image on the left; build it with <Media>. */
  media: ReactNode;
  /** Design widths of the copy column and the gap, in px. */
  copyWidth: number;
  gap?: number;
  id?: string;
};

/** Copy on the right and a visual on the left, as in the home "Data
    perspective" (Figma 3693:64582) and the about "Company perspective"
    (3693:64845). */
export function SplitFeature({
  eyebrow,
  title,
  lead,
  note,
  action,
  media,
  copyWidth,
  gap = 32,
  id,
}: SplitFeatureProps) {
  return (
    <section
      id={id}
      className={styles.split}
      style={{ "--copy-w": `${copyWidth / 10}rem`, "--gap": `${gap / 10}rem` } as CSSProperties}
    >
      <div className={styles.copy}>
        <SectionIntro eyebrow={eyebrow} title={title} align="start" />
        <p className={styles.lead}>{lead}</p>
        {note && <p className={styles.note}>{note}</p>}
        {action}
      </div>
      {media}
    </section>
  );
}
