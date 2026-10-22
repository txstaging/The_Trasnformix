"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";
import { useInView } from "@/lib/useInView";

type RevealProps<T extends ElementType> = {
  /** Milliseconds to stagger this item behind its neighbours. */
  delay?: number;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal<T extends ElementType = "div">({
  delay = 0,
  as,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      style={{ ...(style as CSSProperties), "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
