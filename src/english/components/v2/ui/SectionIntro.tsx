import type { ReactNode } from "react";
import motion from "@/english/components/v2/ui/Motion.module.css";
import styles from "@/english/components/v2/ui/SectionIntro.module.css";

type SectionIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** 16 / 18 / 20 / 24 design px — the artboards vary the lead per section. */
  leadSize?: 16 | 18 | 20 | 24;
  align?: "center" | "start";
  tone?: "default" | "inverse";
  /** 1.85 leading instead of 1.95, as in the works, partners and clients
      introductions (Figma 3709:733). */
  tight?: boolean;
  titleId?: string;
  className?: string;
};

const LEAD_CLASS = { 16: styles.lead16, 18: styles.lead18, 20: styles.lead20, 24: styles.lead24 };

/** Figma "Section introduction" (3693:64534): a blue SemiBold eyebrow, a 32px
    Bold title and an optional lead, 14px apart. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  leadSize = 16,
  align = "center",
  tone = "default",
  tight = false,
  titleId,
  className,
}: SectionIntroProps) {
  return (
    <div
      className={[
        styles.intro,
        motion.rise,
        align === "start" && styles.start,
        tone === "inverse" && styles.inverse,
        tight && styles.tight,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={`${styles.lead} ${LEAD_CLASS[leadSize]}`}>{lead}</p>}
    </div>
  );
}
