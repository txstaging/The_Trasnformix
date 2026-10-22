"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./HomeOpening.module.css";

type Version = "v1" | "v2";

function Opening({ version, onComplete }: { version: Version; onComplete: () => void }) {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const scale = useTransform(progress, [0, 100], [0, 1]);
  const percent = useTransform(progress, value => `${Math.round(value)}%`);
  const [leaving, setLeaving] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controls = animate(progress, 100, {
      duration: reduced ? 0.2 : 1.8,
      ease: [0.45, 0, 0.2, 1],
      onComplete: () => setLeaving(true),
    });
    const fallback = window.setTimeout(onComplete, 5000);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
      if (event.key === "Tab") {
        event.preventDefault();
        overlayRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      controls.stop();
      window.clearTimeout(fallback);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, progress, reduced]);

  return (
    <motion.div
      ref={overlayRef}
      className={`${styles.overlay} ${styles[version]}`}
      data-home-opening={version}
      role="status"
      aria-label="مرحبًا بك في Transformix"
      initial={false}
      animate={leaving
        ? reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
        : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: reduced ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => { if (leaving) onComplete(); }}
    >
      <div className={styles.orbit} aria-hidden="true" />
      <div className={styles.top} aria-hidden="true">
        <span dir="ltr">THE TRANSFORMIX</span>
        <span>حلول رقمية متكاملة</span>
      </div>

      <div className={styles.stage}>
        <motion.div className={styles.logo}
          initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.6 }}>
          <Image src={version === "v1" ? "/images/logo-wide.png" : "/v2/brand/logo.png"}
            alt="" width={240} height={80} sizes="220px" preload />
        </motion.div>
        <div className={styles.wordClip} aria-hidden="true">
          <motion.p className={styles.word} dir="ltr"
            initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}>
            TRANSFORMIX<span>®</span>
          </motion.p>
        </div>
        <motion.p className={styles.tagline} aria-hidden="true"
          initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.5 }}>
          شريكك التقني لتطوير الأعمال
        </motion.p>
        <div className={styles.progress} aria-hidden="true">
          <div className={styles.track}><motion.div style={{ scaleX: scale }} /></div>
          <motion.span dir="ltr">{percent}</motion.span>
        </div>
      </div>

      <button type="button" className={styles.skip} data-opening-skip onClick={onComplete}>
        تخطي المقدمة <span aria-hidden="true">←</span>
      </button>
    </motion.div>
  );
}

function OpeningFrame({ version, play, children }: { version: Version; play: boolean; children: ReactNode }) {
  const [phase, setPhase] = useState<"pending" | "playing" | "done">(play ? "pending" : "done");
  const contentRef = useRef<HTMLDivElement>(null);
  const complete = useCallback(() => {
    const restoreFocus = !!document.activeElement?.closest("[data-home-opening]");
    setPhase("done");
    if (restoreFocus) {
      requestAnimationFrame(() => {
        contentRef.current?.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
      });
    }
  }, []);

  useEffect(() => {
    if (!play) return;
    const frame = requestAnimationFrame(() => setPhase("playing"));
    const replay = (event: PageTransitionEvent) => {
      if (event.persisted) setPhase("playing");
    };
    window.addEventListener("pageshow", replay);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", replay);
    };
  }, [play]);

  return (
    <div data-opening-state={phase}>
      {phase === "playing" && <Opening version={version} onComplete={complete} />}
      <div ref={contentRef} data-home-content inert={phase === "playing"}>{children}</div>
    </div>
  );
}

export function HomeOpening({ version, children }: { version: Version; children: ReactNode }) {
  const pathname = usePathname();
  return <OpeningFrame key={pathname} version={version} play={pathname === (version === "v1" ? "/" : "/v2")}>
    {children}
  </OpeningFrame>;
}
