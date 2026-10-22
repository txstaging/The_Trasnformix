import Image from "next/image";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/sections/ProcessSteps.module.css";

export type Step = { title: string; text: string };

type ProcessStepsProps = {
  /** In reading order, 01 first (it lands on the right). */
  steps: Step[];
  /** `timeline` threads glass number badges on a cyan line (Figma
      3693:64671); `ruled` sets plain numbers under a hairline (3693:65788). */
  variant?: "timeline" | "ruled";
  /** The home artboard draws larger 60px badges on a thinner line. */
  badge?: "default" | "large";
  /** The about artboard keeps the hairline above the timeline too. */
  bordered?: boolean;
  eyebrow?: string;
  title?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Figma "Delivery methodology": four centred steps, 28px apart. */
export function ProcessSteps({
  steps,
  variant = "timeline",
  badge = "default",
  bordered = false,
  eyebrow = "Our process",
  title = "Clear steps, from the start to delivery",
}: ProcessStepsProps) {
  const timeline = variant === "timeline";
  const large = badge === "large";

  return (
    <section className={styles.section}>
      <SectionIntro eyebrow={eyebrow} title={title} />
      <div
        className={[
          styles.track,
          timeline ? styles.timeline : styles.ruled,
          large && styles.large,
          bordered && styles.bordered,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {timeline && (
          <div className={styles.line} aria-hidden>
            {large ? (
              <Image src="/v2/icons/process-line-home.svg" alt="" width={1210} height={5} />
            ) : (
              <Image src="/v2/icons/process-line.svg" alt="" width={1228} height={11} />
            )}
          </div>
        )}
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number}>{pad(index + 1)}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
