"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./AcademyCurtain.module.css";

type AcademyCurtainProps = {
  /** The section the band rises over. */
  hero: ReactNode;
  /** The sections that share the #fcfbfa band. */
  children: ReactNode;
};

/** One #fcfbfa band, crowned by the hero's arc, runs under every section in
    `children`. As it scrolls in it rides over the hero: --cover (0..1, on the
    root) goes from 0 while the band is below the fold to 1 once its top edge
    nears the top of the viewport. The hero fades and sinks with it and the
    arc flattens into a straight edge. */
export function AcademyCurtain({ hero, children }: AcademyCurtainProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const band = bandRef.current;
    if (!root || !band) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top } = band.getBoundingClientRect();
      // Starts counting from the fold, or from wherever the band sits at the
      // top of the page when a tall viewport already shows it, so the hero
      // always opens untouched.
      const start = Math.min(window.innerHeight, top + window.scrollY);
      const cover = Math.min(1, Math.max(0, (start - top) / (start * 0.85)));
      root.style.setProperty("--cover", cover.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {hero}
      <div ref={bandRef} className={styles.band}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.arc} src="/icons/academy/hero-wave.svg" alt="" aria-hidden />
        {children}
      </div>
    </div>
  );
}
