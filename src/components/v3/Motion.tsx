"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

// Animate a whole Arabic line so joined letterforms remain intact.
export function Reveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [26, 0], opacity: [0.3, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 18 6 6m0 0v11M6 6h11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
