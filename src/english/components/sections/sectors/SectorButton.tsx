"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/english/components/contact/ContactModal";
import styles from "@/english/components/sections/sectors/SectorButton.module.css";

type SectorButtonProps = {
  children: ReactNode;
  /** Without an href the button opens the contact form. */
  href?: string;
  tone?: "solid" | "light";
  className?: string;
};

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
