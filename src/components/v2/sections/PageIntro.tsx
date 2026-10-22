import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { V2 } from "@/components/v2/routes";
import motion from "@/components/v2/ui/Motion.module.css";
import styles from "./PageIntro.module.css";

export type Crumb = { label: string; href?: string };

type PageIntroProps = {
  /** Trail after الرئيسية; the last crumb is the current page. */
  crumbs?: Crumb[];
  title: ReactNode;
  lead: ReactNode;
  /** Design widths in px. The column is 1240 unless narrowed. */
  width?: number;
  titleWidth?: number;
  leadWidth?: number;
  /** Design px; the about introduction is a 372 high band (3693:64841). */
  minHeight?: number;
  /** A call to action 24px under the lead. */
  action?: ReactNode;
  /** A visual 32px under the introduction. */
  children?: ReactNode;
  /** Service pages fade their whole narrative instead. */
  animate?: boolean;
  /** Keep the introduction beside its visual on wide screens. */
  layout?: "centered" | "split";
};

const rem = (px?: number) => (px ? `${px / 10}rem` : undefined);

/** Figma "Page introduction": breadcrumb, a 48px Bold title and a 20px lead,
    24px apart and centred. */
export function PageIntro({
  crumbs,
  title,
  lead,
  width,
  titleWidth,
  leadWidth,
  minHeight,
  action,
  children,
  animate = true,
  layout = "centered",
}: PageIntroProps) {
  return (
    <header
      className={[styles.hero, layout === "split" && styles.split, animate && motion.fadeIn].filter(Boolean).join(" ")}
      style={
        {
          "--intro-w": rem(width),
          "--title-w": rem(titleWidth),
          "--lead-w": rem(leadWidth),
          "--intro-min-h": rem(minHeight),
        } as CSSProperties
      }
    >
      <div className={styles.intro}>
        <div className={styles.copy}>
          {crumbs && (
            <nav aria-label="مسار التنقل">
              <ol className={styles.crumbs}>
                <li>
                  <Link href={V2.home}>الرئيسية</Link>
                </li>
                {crumbs.map((crumb) => (
                  <li key={crumb.label}>
                    {crumb.href ? (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
      {children}
    </header>
  );
}
