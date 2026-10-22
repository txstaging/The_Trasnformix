import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AcademyJourney.module.css";

const rem = (px: number) => `${px / 10}rem`;

type Step = {
  number: string;
  label: string;
  icon: string;
  x: number;
  iconX: number;
  iconY: number;
  labelX: number;
  labelW: number;
};

/* Right-to-left: step 01 sits furthest right. */
const STEPS: Step[] = [
  { number: "01", label: "تحديد المستوى والمهام المستهدفة", icon: "step-file-pen", x: 1128, iconX: 41, iconY: 41, labelX: 1085, labelW: 227 },
  { number: "02", label: "التعلّم من خلال  والفيديوهات", icon: "step-pencil-ruler", x: 857, iconX: 42, iconY: 41, labelX: 848, labelW: 216 },
  { number: "03", label: "الممارسة داخل بيئة تدريبية.", icon: "step-refresh", x: 586, iconX: 42, iconY: 41, labelX: 586, labelW: 179 },
  { number: "04", label: "تنفيذ واجبات فردية ومهام جماعية.", icon: "step-gamepad", x: 315, iconX: 42, iconY: 42, labelX: 305, labelW: 198 },
  { number: "05", label: "التقييمات العملية للتحقق من إتقان", icon: "step-shield", x: 44, iconX: 41, iconY: 41, labelX: 0, labelW: 210 },
];

const ARROWS = [
  { x: 1014, y: 47, shaft: "step-arrow-c", head: "step-arrow-head-a" },
  { x: 743, y: 42, shaft: "step-arrow-b", head: "step-arrow-head-b" },
  { x: 476, y: 41, shaft: "step-arrow-a", head: "step-arrow-head-a" },
  { x: 198, y: 46, shaft: "step-arrow-a", head: "step-arrow-head-a" },
];

export function AcademyJourney() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        كيف تبدو تجربة التعلم؟
      </Reveal>

      <div className={styles.flow}>
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              className={styles.step}
              delay={index * 110}
              style={
                {
                  "--x": rem(step.x),
                  "--icon-x": rem(step.iconX),
                  "--icon-y": rem(step.iconY),
                  "--label-x": rem(step.labelX - step.x),
                  "--label-w": rem(step.labelW),
                } as CSSProperties
              }
            >
              <div className={styles.disc} aria-hidden>
                <span className={styles.ring} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.icon}
                  src={`/icons/academy/${step.icon}.svg`}
                  alt=""
                  width={70}
                  height={70}
                />
                <span className={styles.badge}>{step.number}</span>
              </div>
              <p className={styles.label}>{step.label}</p>
            </Reveal>
          ))}
        </ol>

        {ARROWS.map((arrow) => (
          <span
            key={arrow.x}
            className={styles.arrow}
            style={{ left: rem(arrow.x), top: rem(arrow.y) }}
            aria-hidden
          >
            <span className={styles.shaft}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/icons/academy/${arrow.shaft}.svg`} alt="" />
            </span>
            <span className={styles.head}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/icons/academy/${arrow.head}.svg`} alt="" />
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
