"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModal";
import styles from "./Button8.module.css";

/** The page's contact target: these pills open the form instead of jumping. */
const CONTACT_HREF = "/#contact";

type Button8Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  /** `compact` is the 128.85 x 36 instance the small-screen menu draws. */
  size?: "default" | "compact";
  /** `false` keeps the 218 x 61 geometry below 520px too, for callers that
      scale the whole pill themselves. */
  fluid?: boolean;
};

/** The gradient pill CTA that repeats five times across the page. */
export function Button8({
  children,
  href = CONTACT_HREF,
  className,
  size = "default",
  fluid = true,
}: Button8Props) {
  const { open } = useContactModal();
  const classes = [
    styles.root,
    size === "compact" && styles.compact,
    !fluid && styles.fixed,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const pill = (
    <>
      <span className={styles.pill} aria-hidden />
      <span className={styles.label}>{children}</span>
    </>
  );

  if (href === CONTACT_HREF) {
    return (
      <button type="button" className={classes} aria-haspopup="dialog" onClick={open}>
        {pill}
      </button>
    );
  }

  return (
    <a href={href} className={classes}>
      {pill}
    </a>
  );
}
