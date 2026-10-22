"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "./Motion";
import styles from "./HomeV3.module.css";

export function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const percent = useTransform(progress, value => String(Math.round(value)).padStart(3, "0"));
  const scale = useTransform(progress, [0, 100], [0, 1]);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const duration = reduced ? 0.25 : 2.1;
    const controls = animate(progress, 100, {
      duration,
      ease: [0.45, 0, 0.2, 1],
      onComplete: () => setLeaving(true),
    });
    return () => controls.stop();
  }, [progress, reduced]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  return (
    <motion.div
      className={styles.intro}
      data-v3-intro=""
      role="status"
      aria-label="THE TRANSFORMIX"
      initial={false}
      animate={leaving ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: reduced ? 0.15 : 0.8, ease }}
      onAnimationComplete={() => {
        if (!leaving) return;
        onComplete();
      }}
    >
      <div className={styles.introCorner} aria-hidden="true"><span>TRANSFORMIX®</span><span>01 — 03</span></div>
      <div className={styles.introWord} dir="ltr" aria-hidden="true">
        {"THE TRANSFORMIX".split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.04, delay: reduced ? 0 : 0.12 + index * 0.075 }}
          >{letter === " " ? "\u00a0" : letter}</motion.span>
        ))}
        {!reduced && <motion.i initial={{ opacity: 1 }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.65, repeat: 3 }} />}
      </div>
      <div className={styles.introBottom} dir="ltr" aria-hidden="true">
        <div className={styles.introTrack}><motion.div style={{ scaleX: scale }} /></div>
        <motion.span>{percent}</motion.span><span>/ 100</span>
      </div>
    </motion.div>
  );
}
