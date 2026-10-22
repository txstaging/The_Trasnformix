"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";
import { Reveal } from "@/english/components/ui/Reveal";
import { processSteps } from "@/english/components/v3/content";
import { tajawal } from "@/lib/fonts";
import { useProgressCards } from "@/lib/useProgressCards";
import styles from "@/english/components/sections/Process.module.css";

const number = (index: number) => String(index + 1).padStart(2, "0");

const processArtwork = [
  { src: "/images/process/generated/discovery.webp", alt: "A blue magnifying glass over research cards and business workflows" },
  { src: "/images/process/generated/analysis.webp", alt: "Three-dimensional bar and donut charts representing analysis and assessment" },
  { src: "/images/process/generated/planning.webp", alt: "A three-dimensional roadmap with connected milestones and a checklist" },
  { src: "/images/process/generated/development.webp", alt: "A three-dimensional software interface with a code symbol and connected modules" },
  { src: "/images/process/generated/launch.webp", alt: "A three-dimensional rocket beside a checklist representing testing and launch" },
];

/** The Progress Cards interaction, adapted to the existing five-stage process. */
export function Process() {
  const { ref, active, select, progress, interactive, paused, setPaused, playing, setHovered, setFocused } = useProgressCards(processSteps.length);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl = getComputedStyle(event.currentTarget).direction !== "ltr";
    let next: number;
    if (event.key === "ArrowLeft") next = (index + (rtl ? 1 : -1) + processSteps.length) % processSteps.length;
    else if (event.key === "ArrowRight") next = (index + (rtl ? -1 : 1) + processSteps.length) % processSteps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = processSteps.length - 1;
    else return;
    event.preventDefault();
    select(next);
    triggers.current[next]?.focus();
  };

  return (
    <section id="process" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="process-heading" data-flow="outro">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal as="h2" id="process-heading" className={styles.title}>{"We solve your challenges with solutions built to grow"}</Reveal>
          <Reveal as="p" className={styles.subtitle} delay={120}>{"Clear steps that start with understanding your business and lead to a scalable solution"}</Reveal>
        </div>

        <div className={styles.playback}>
          <button type="button" className={styles.pause} data-progress-toggle aria-pressed={paused}
            aria-label={paused ? "Resume automatic progress" : "Pause automatic progress"}
            onClick={() => setPaused(value => !value)}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {paused
                ? <path d="m7 4 9 6-9 6V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                : <path d="M7 4v12M13 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
            </svg>
            <span>{paused ? "Resume" : "Pause"}</span>
          </button>
        </div>

        <ol ref={ref} className={styles.list} data-progress-cards data-playing={playing}
          onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
          }}>
          {processSteps.map((step, index) => {
            const image = processArtwork[index] ?? { src: step.image, alt: step.alt };
            const expanded = !interactive || active === index;
            const headingId = `process-step-${index + 1}`;
            const detailId = `process-detail-${index + 1}`;
            const heading = <>
              <span className={styles.number} dir="ltr">{number(index)}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </>;

            return (
              <li key={step.title} className={styles.card} data-active={active === index}>
                <div className={styles.rail} aria-hidden="true">
                  <motion.span style={{ scaleY: active === index ? progress : 0 }} />
                </div>
                <h3 id={headingId} className={styles.stepHeading}>
                  {interactive
                    ? <button type="button" className={styles.trigger} data-process-step={index}
                        ref={element => { triggers.current[index] = element; }}
                        aria-expanded={active === index} aria-controls={detailId}
                        onClick={() => select(index)} onKeyDown={event => navigate(event, index)}>
                        {heading}
                      </button>
                    : <div className={styles.trigger}>{heading}</div>}
                </h3>
                <div id={detailId} className={styles.details} role="region" aria-labelledby={headingId}
                  inert={!expanded} aria-hidden={!expanded || undefined}>
                  <div className={styles.detailsInner}>
                    <p className={styles.stepText}>{step.text}</p>
                    <div className={styles.visual}>
                      <Image src={image.src} alt={image.alt} fill
                        sizes="(max-width: 640px) 85vw, (max-width: 900px) 75vw, 650px" />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
