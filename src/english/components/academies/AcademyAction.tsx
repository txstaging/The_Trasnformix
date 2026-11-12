"use client";

import Image from "next/image";
import { useContactModal } from "@/english/components/contact/ContactModal";
import styles from "@/english/components/academies/Academies.module.css";

export type Tone = "primary" | "inverse" | "outlineInverse" | "outline" | "link";

export type Action = {
  label: string;
  /** Where the call leads. Without one it opens the project form, or the
      partnership paths when `opens` says so. */
  href?: string;
  opens?: "contact" | "partnerships";
  tone?: Tone;
};

/* The arrow takes the label's colour on each style (Figma 4610:4). */
const ARROWS: Record<Tone, string> = {
  primary: "/icons/academies/arrow-inverse.svg",
  outlineInverse: "/icons/academies/arrow-inverse.svg",
  inverse: "/icons/academies/arrow-dark.svg",
  outline: "/icons/academies/arrow-blue.svg",
  link: "/icons/academies/arrow-blue.svg",
};

/** The V2 button (Figma 4610:43): the label, then the forward arrow. */
export function AcademyAction({ action, className }: { action: Action; className?: string }) {
  const { open, openPartnerships } = useContactModal();
  const tone = action.tone ?? "primary";
  const classes = [styles.button, styles[tone], className].filter(Boolean).join(" ");
  const content = (
    <>
      {action.label}
      <Image className={styles.arrow} src={ARROWS[tone]} alt="" width={20} height={20} aria-hidden />
    </>
  );

  if (action.href) {
    return (
      <a href={action.href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      aria-haspopup="dialog"
      onClick={action.opens === "partnerships" ? openPartnerships : open}
    >
      {content}
    </button>
  );
}
