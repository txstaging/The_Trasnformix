"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Step = { title: string; text: string };

type StepsAccordionProps = {
  steps: Step[];
  image: string;
};

const AUTOPLAY_MS = 6000;

/* Figma 5226:32552 — four columns, the active one open with its copy and a
   picture; it advances on its own until paused. */
export function StepsAccordion({ steps, image }: StepsAccordionProps) {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % steps.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, steps.length]);

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionControls}>
        <button
          type="button"
          className={styles.pauseButton}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span className={paused ? styles.playIcon : styles.pauseIcon} aria-hidden="true" />
          {paused ? "تشغيل" : "إيقاف مؤقت"}
        </button>
      </div>
      <ol className={styles.accordionColumns}>
        {steps.map((step, index) => {
          const isActive = index === active;
          return (
            <li
              key={step.title}
              className={`${styles.accordionItem} ${isActive ? styles.accordionActive : ""}`}
            >
              <button
                type="button"
                className={styles.accordionButton}
                aria-expanded={isActive}
                onClick={() => setActive(index)}
              >
                <span className={styles.accordionNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.accordionTitle}>{step.title}</span>
                {isActive ? <span className={styles.accordionText}>{step.text}</span> : null}
              </button>
              {isActive ? (
                <div className={styles.accordionMedia}>
                  <Image
                    className={styles.accordionImage}
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 90vw, 660px"
                  />
                </div>
              ) : null}
              {isActive && !paused ? (
                <span
                  key={active}
                  className={styles.accordionProgress}
                  aria-hidden="true"
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
