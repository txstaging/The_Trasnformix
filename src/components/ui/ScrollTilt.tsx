"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ScrollTiltProps = {
  /** Lean, in degrees, while the element sits at the bottom of the viewport. */
  maxTilt?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Leans its children back from the top edge (hinged at the bottom) and
    straightens them as they scroll up towards the middle of the viewport. */
export function ScrollTilt({ maxTilt = 35, className, style, children }: ScrollTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // Measure the untransformed parent so the tilt does not feed back into itself.
      const { top, height } = (node.parentElement ?? node).getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top edge enters at the bottom of the viewport,
      // 1 once the element's centre reaches the viewport's centre.
      const start = vh;
      const end = vh / 2 - height / 2;
      const progress = Math.min(1, Math.max(0, (start - top) / (start - end)));
      node.style.setProperty("--tilt", `${(1 - progress) * maxTilt}deg`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: "perspective(120rem) rotateX(var(--tilt, 0deg))",
        transformOrigin: "50% 100%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
