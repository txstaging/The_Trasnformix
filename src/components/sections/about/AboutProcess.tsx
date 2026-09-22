import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutProcess.module.css";

type Step = {
  number: string;
  label: string;
  icon: string;
  /** Glyph box inside the 154px disc at 1440 (the artboard nudges some 1px). */
  iconX: number;
  iconY: number;
  /** Glyph box inside the 105px disc at 375, which sizes each glyph apart. */
  mobileIcon: { x: number; y: number; size: number };
};

/* Right-to-left: step 01 sits furthest right at 1440 and on top at 375.
   The 375 artboard spells step 03 "الاتجاة"; the 1440 spelling is used. */
const STEPS: Step[] = [
  {
    number: "01",
    label: "نفهم",
    icon: "/icons/about-step-understand.svg",
    iconX: 41,
    iconY: 41,
    mobileIcon: { x: 27.32, y: 28.32, size: 47 },
  },
  {
    number: "02",
    label: "نحلل",
    icon: "/icons/about-step-analyse.svg",
    iconX: 42,
    iconY: 41,
    mobileIcon: { x: 27.32, y: 28.32, size: 47 },
  },
  {
    number: "03",
    label: "نحدد الاتجاه",
    icon: "/icons/about-step-direction.svg",
    iconX: 42,
    iconY: 41,
    mobileIcon: { x: 25.32, y: 26.32, size: 51 },
  },
  {
    number: "04",
    label: "نطلق",
    icon: "/icons/about-step-launch.svg",
    iconX: 42,
    iconY: 42,
    mobileIcon: { x: 24.32, y: 25.32, size: 53 },
  },
  {
    number: "05",
    label: "نطور",
    icon: "/icons/about-step-evolve.svg",
    iconX: 41,
    iconY: 41,
    mobileIcon: { x: 25.32, y: 26.32, size: 51 },
  },
];

/* The 375 artboard hangs a curved arrow beside every step, alternating sides:
   x is from the centre of the 327 column, y from its top; `flip` mirrors the
   curve for the right-hand ones. */
const MOBILE_ARROWS = [
  { x: 46.5, y: 23, flip: true },
  { x: -61.5, y: 176, flip: false },
  { x: 51.5, y: 287, flip: true },
  { x: -61.5, y: 395, flip: false },
  { x: 51.5, y: 548, flip: true },
];

const rem = (px: number) => `${px / 10}rem`;

/** Figma 2515:59882 "Desktop - 1" and 2525:3255 "Mobile Process Flow". */
export function AboutProcess() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        من تحدي أعمال إلى حل قابل للنمو
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
                  "--icon-x": rem(step.iconX),
                  "--icon-y": rem(step.iconY),
                  "--m-icon-x": rem(step.mobileIcon.x),
                  "--m-icon-y": rem(step.mobileIcon.y),
                  "--m-icon-size": rem(step.mobileIcon.size),
                } as CSSProperties
              }
            >
              <div className={styles.disc} aria-hidden>
                <span className={styles.discCore} />
                <Image
                  className={styles.icon}
                  src={step.icon}
                  alt=""
                  width={70}
                  height={70}
                />
                <span className={styles.badge}>
                  <span className={styles.badgeNumber}>{step.number}</span>
                </span>
              </div>
              <p className={styles.label}>{step.label}</p>

              {index < STEPS.length - 1 && (
                <Image
                  className={styles.arrow}
                  src="/icons/about-step-arrow.svg"
                  alt=""
                  width={90}
                  height={17}
                  aria-hidden
                />
              )}
            </Reveal>
          ))}
        </ol>

        {MOBILE_ARROWS.map((arrow) => (
          <span
            key={arrow.y}
            className={styles.flowArrow}
            style={{
              left: `calc(50% + ${rem(arrow.x)})`,
              top: rem(arrow.y),
            }}
            aria-hidden
          >
            <Image
              className={arrow.flip ? styles.flowArrowFlip : undefined}
              src="/icons/about-step-arrow.svg"
              alt=""
              width={90}
              height={17}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
