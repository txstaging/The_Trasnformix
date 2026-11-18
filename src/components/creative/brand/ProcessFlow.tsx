"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { IconTile } from "@/components/academies/AcademiesKit";
import type { Step } from "@/components/creative/CreativeKit";
import creative from "../Creative.module.css";
import styles from "./Brand.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Entrance spacing between cards, and how long each stays lit. */
const STAGGER = 380;
const DWELL = 2400;

/** The step cards of "كيف نطوّر علامتك التجارية؟" in motion (Figma 5036:9597,
    the same cards as `ProcessCards`). Once the row scrolls into view the cards
    arrive one after another, each bar filling part by part; then the lit step
    moves on through the five, a card lifting and its tile filling, for as long
    as the row stays on screen. Hovering or focusing a card holds the light on
    it. With reduced motion, or no script, the row is simply there. */
export function ProcessFlow({ steps, label }: { steps: readonly Step[]; label: string }) {
  const list = useRef<HTMLOListElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lit, setLit] = useState(-1);
  const [held, setHeld] = useState(false);

  /* Hide the cards only once the script is running and motion is allowed, then
     watch the row: it enters once, and leaving the screen stops the cycle. */
  useEffect(() => {
    const node = list.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const watcher = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.25 },
    );
    watcher.observe(node);
    return () => watcher.disconnect();
  }, []);

  /* After the entrance, light the first step, then the next every `DWELL`. */
  useEffect(() => {
    if (!armed || !shown || !visible || held) return;
    const first = lit < 0 ? setTimeout(() => setLit(0), steps.length * STAGGER + 500) : undefined;
    const next = lit >= 0 ? setTimeout(() => setLit((lit + 1) % steps.length), DWELL) : undefined;
    return () => {
      clearTimeout(first);
      clearTimeout(next);
    };
  }, [armed, shown, visible, held, lit, steps.length]);

  const parts = steps.length;

  return (
    <ol
      ref={list}
      aria-label={label}
      className={cx(creative.steps, creative.stepsFive, armed && styles.flow, shown && styles.flowShown)}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cx(creative.step, styles.flowStep, index === lit && styles.flowLit)}
          style={{ "--i": index } as CSSProperties}
          onMouseEnter={() => {
            setHeld(true);
            setLit(index);
          }}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => {
            setHeld(true);
            setLit(index);
          }}
          onBlur={() => setHeld(false)}
        >
          <div className={creative.stepTop}>
            <span className={cx(creative.stepNumber, styles.flowNumber)} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.flowTile}>
              <IconTile icon={step.icon} />
            </span>
          </div>
          <h3 className={creative.stepTitle}>{step.title}</h3>
          <p className={creative.stepText}>{step.text}</p>
          <span className={creative.stepBar} aria-hidden>
            {Array.from({ length: parts }, (_, part) => (
              <span
                key={part}
                className={cx(creative.stepPart, styles.flowPart, part <= index && styles.flowPartOn)}
                style={{ "--p": part } as CSSProperties}
              />
            ))}
          </span>
        </li>
      ))}
    </ol>
  );
}
