"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./V4.module.css";

export const ease = [0.76, 0, 0.24, 1] as const;

export function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><path d="M25 7 7 25M7 7v18h18" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

/** A long reading plateau keeps text still; movement belongs to the boundaries. */
export function MotionSection({ children, className = "", id, mode = "rise" }: {
  children: ReactNode; className?: string; id?: string; mode?: "rise" | "depth" | "slide" | "mask";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [mode === "depth" ? 30 : 65, 0, 0, -55]);
  const x = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [mode === "slide" ? -55 : 0, 0, 0, mode === "slide" ? 40 : 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.13, 0.9, 1], [0.15, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [mode === "depth" ? 0.94 : 1, 1, 1, mode === "depth" ? 0.97 : 1]);
  const clipPath = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], ["inset(5% 3% 5% 3%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(4% 2% 4% 2%)"]);
  useEffect(() => { const frame = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(frame); }, []);
  const enabled = ready && !reduced;
  return <section ref={ref} id={id} className={`${styles.section} ${className}`} data-v4-section={mode}>
    <motion.div className={styles.sectionBody} style={enabled ? { y, x, opacity, scale, clipPath: mode === "mask" ? clipPath : undefined } : undefined}>
      {children}
    </motion.div>
  </section>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [25, 0], opacity: [0.5, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>;
}

export function Rule() {
  const reduced = useReducedMotion();
  return <motion.div aria-hidden="true" className={styles.rule} initial={false} whileInView={reduced ? undefined : { scaleX: [0, 1] }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />;
}
