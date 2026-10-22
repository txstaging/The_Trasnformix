"use client";

import { useEffect, useRef } from "react";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Stacking cards: each card pins (CSS `position: sticky`) and the next one
 * rides up over it. Writes two 0..1 custom properties on every card for the
 * stylesheet to animate with — `--in` eases a card up as it rises from the
 * bottom of the viewport, `--out` shrinks and fades it as the next card
 * covers it. Only runs from 1025px up and without reduced motion.
 *
 * Returns a ref factory: `ref={cardRef(index)}`.
 */
export function useStackingCards() {
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = cards.current.filter((card): card is HTMLElement => !!card);
    const desktop = window.matchMedia("(min-width: 1025px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches || reduced.matches) {
        nodes.forEach((card) => {
          card.style.removeProperty("--in");
          card.style.removeProperty("--out");
        });
        return;
      }
      const vh = window.innerHeight;
      nodes.forEach((card, index) => {
        const stickTop = parseFloat(getComputedStyle(card).top) || 0;
        const { top } = card.getBoundingClientRect();
        card.style.setProperty("--in", clamp01((vh - top) / (vh - stickTop)).toFixed(3));

        const next = nodes[index + 1];
        const out = next
          ? clamp01(1 - (next.getBoundingClientRect().top - stickTop) / card.offsetHeight)
          : 0;
        card.style.setProperty("--out", out.toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (index: number) => (node: HTMLElement | null) => {
    cards.current[index] = node;
  };
}
