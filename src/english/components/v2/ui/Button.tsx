import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "@/english/components/v2/ui/Button.module.css";

type ButtonProps = {
  children: ReactNode;
  /** `primary` — blue pill, white arrow disc (Figma 3709:655).
      `primary-soft` — the same pill with a pale rim and disc (3709:715).
      `inverse` — the white pill of the dark invitation band (3709:727).
      `outline` — white pill, blue label, no disc (3709:707). */
  variant?: "primary" | "primary-soft" | "inverse" | "outline";
  /** `compact` is the 51px pill of the home academy block (3709:723). */
  size?: "default" | "compact";
  /** Design width in px; the artboards use 260 almost everywhere. */
  width?: number;
  /** The 28px arrow glyph of the home invitation band (3709:729). */
  longArrow?: boolean;
  href?: string;
  type?: "submit";
  disabled?: boolean;
  className?: string;
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/** The v2 call to action: a fully rounded pill whose label sits right of a
    28px disc holding a left arrow. Internal paths route through next/link. */
export function Button({
  children,
  variant = "primary",
  size = "default",
  width = 260,
  longArrow = false,
  href,
  type,
  disabled,
  className,
}: ButtonProps) {
  const classes = cx(
    styles.button,
    styles[variant],
    size === "compact" && styles.compact,
    longArrow && styles.longArrow,
    className,
  );
  const style = { "--btn-w": `${width / 10}rem` } as CSSProperties;

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {variant !== "outline" && (
        <span className={styles.disc} aria-hidden>
          <span className={styles.arrow}>←</span>
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <button type={type ?? "button"} className={classes} style={style} disabled={disabled}>
        {content}
      </button>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} style={style}>
      {content}
    </a>
  );
}
