"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModal";
import styles from "./SectorButton.module.css";

type SectorButtonProps = {
  children: ReactNode;
  /** Without an href the button opens the contact form. */
  href?: string;
  /** `solid` is the #1d4fb7 "Link" of Figma 2789:11514; `light` is the white
      one on the closing banner (Figma 2789:11797). */
  tone?: "solid" | "light";
  className?: string;
};

/** The square-cornered CTA that the القطاعات artboard repeats five times. */
export function SectorButton({
  children,
  href,
  tone = "solid",
  className,
}: SectorButtonProps) {
  const { open } = useContactModal();
  const classes = [styles.root, styles[tone], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} aria-haspopup="dialog" onClick={open}>
      {children}
    </button>
  );
}
