"use client";

import { animate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useInView } from "@/lib/useInView";

const wideQuery = "(min-width: 901px)";
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeEnvironment(onChange: () => void) {
  const wide = window.matchMedia(wideQuery);
  const reduced = window.matchMedia(motionQuery);
  wide.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    wide.removeEventListener("change", onChange);
    reduced.removeEventListener("change", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

function getEnvironment() {
  return (window.matchMedia(wideQuery).matches ? 1 : 0)
    | (window.matchMedia(motionQuery).matches ? 2 : 0)
    | (document.visibilityState === "visible" ? 4 : 0);
}

const getServerEnvironment = () => 0;

/** Timed expanding cards, paused while hidden or being read/interacted with. */
export function useProgressCards(count: number, duration = 9) {
  const { ref, inView } = useInView<HTMLOListElement>({
    threshold: 0.25,
    rootMargin: "0px",
    once: false,
  });
  const environment = useSyncExternalStore(subscribeEnvironment, getEnvironment, getServerEnvironment);
  const interactive = Boolean(environment & 1) && !(environment & 2);
  const visible = Boolean(environment & 4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const progress = useMotionValue(0);
  const playing = interactive && visible && inView && !paused && !hovered && !focused;

  useEffect(() => {
    if (!playing || count < 2) return;
    const animation = animate(progress, 1, {
      duration: Math.max(0.05, duration * (1 - progress.get())),
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setActive(current => (current + 1) % count);
      },
    });
    return () => animation.stop();
  }, [active, count, duration, playing, progress]);

  const select = useCallback((index: number) => {
    if (index === active || index < 0 || index >= count) return;
    progress.set(0);
    setActive(index);
  }, [active, count, progress]);

  return { ref, active, select, progress, interactive, paused, setPaused, playing, setHovered, setFocused };
}
