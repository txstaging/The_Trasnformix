import type { ReactNode } from "react";
import styles from "./PageBody.module.css";

type PageBodyProps = {
  children: ReactNode;
  /** Space between sections: 150px on the home and services artboards,
      100px elsewhere. */
  gap?: "md" | "lg";
  /** Space above the first section: 56px under the navbar, or 100px when
      the body follows the home hero. */
  top?: "page" | "section";
  className?: string;
};

/** Figma "Page content": the 1240 wide column every v2 artboard lays its
    sections on, closed by 100px above the footer. */
export function PageBody({ children, gap = "md", top = "page", className }: PageBodyProps) {
  return (
    <div
      className={[
        styles.body,
        gap === "lg" ? styles.gapLg : styles.gapMd,
        top === "section" ? styles.topSection : styles.topPage,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
