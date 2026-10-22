"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

type CountUpProps = {
  to: number;
  /** Milliseconds from 0 to `to`. */
  duration?: number;
  /** Waits this long after the number scrolls into view. */
  delay?: number;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts from 0 up to `to` the first time it scrolls into view. */
export function CountUp({ to, duration = 1800, delay = 0, className }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(() => setValue(to), 0);
      return () => clearTimeout(timer);
    }

    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOutCubic(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [inView, to, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      {value}
    </span>
  );
}
