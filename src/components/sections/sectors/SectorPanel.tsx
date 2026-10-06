"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Button8 } from "@/components/ui/Button8";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SectorPanel.module.css";

export type SectorShot = {
  src: string;
  width: number;
  height: number;
  /** The render's box inside the frame, in % of the frame — Figma's crop. */
  crop: { left: number; top: number; width: number; height: number };
};

export type SectorItem = {
  number: string;
  title: string;
  text: string;
  /** Per-row overrides the artboard carries, e.g. the 13px MCR caption. */
  textColor?: string;
  textSize?: number;
  /** The dashboard this row brings up. */
  shot: SectorShot;
};

type SectorPanelProps = {
  id: string;
  /** `industry` — Figma 2813:10158; `cooperatives` — 2819:1959;
      `education` — 2819:2136. */
  variant: "industry" | "cooperatives" | "education";
  eyebrow: string;
  title: string;
  text: string;
  items: SectorItem[];
  cta: { label: string; href?: string };
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const rem = (px: number) => `${px / 10}rem`;

/* How wide the widest crop renders relative to the viewport, for `sizes`. */
const SIZES: Record<SectorPanelProps["variant"], string> = {
  industry: "(max-width: 1024px) 100vw, 44.5vw",
  cooperatives: "(max-width: 1024px) 174vw, 74vw",
  education: "(max-width: 1024px) 282vw, 111vw",
};

/** One sector band: heading, numbered rows and a dashboard. Every row is a
    tab that swaps the dashboard beside it, exactly as the four "Property 1"
    frames of each Figma set draw it. */
export function SectorPanel({
  id,
  variant,
  eyebrow,
  title,
  text,
  items,
  cta,
}: SectorPanelProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const panelId = `${uid}-panel`;
  const tabId = (index: number) => `${uid}-tab-${index}`;

  /* Rows that share a dashboard share one <img>. */
  const shots = [...new Map(items.map((item) => [item.shot.src, item.shot])).values()];
  const activeSrc = items[active].shot.src;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowLeft"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowUp" || event.key === "ArrowRight"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id={id} className={cx(styles.section, styles[variant])}>
      <div className={styles.column}>
        <Reveal className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden />
            {eyebrow}
          </p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
        </Reveal>

        <div
          className={styles.list}
          role="tablist"
          aria-label={title}
          aria-orientation="vertical"
        >
          {items.map((item, index) => (
            <button
              key={item.number}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={panelId}
              tabIndex={index === active ? 0 : -1}
              className={cx(styles.row, index === active && styles.active)}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className={styles.badge} dir="ltr">
                {item.number}
              </span>
              <span className={styles.rowText}>
                <span className={styles.rowTitle}>{item.title}</span>
                <span
                  className={styles.rowCaption}
                  style={{
                    color: item.textColor,
                    fontSize: item.textSize ? rem(item.textSize) : undefined,
                  }}
                >
                  {item.text}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <Button8 href={cta.href} className={styles.cta}>
            {cta.label}
          </Button8>
        </div>
      </div>

      <Reveal className={styles.visualSlot} delay={120}>
        <div
          id={panelId}
          className={styles.frame}
          role="tabpanel"
          aria-labelledby={tabId(active)}
        >
          {shots.map((shot) => (
            <Image
              key={shot.src}
              className={cx(styles.shot, shot.src === activeSrc && styles.shotActive)}
              style={{
                left: `${shot.crop.left}%`,
                top: `${shot.crop.top}%`,
                width: `${shot.crop.width}%`,
                height: `${shot.crop.height}%`,
              }}
              src={shot.src}
              alt={shot.src === activeSrc ? `${title} — ${items[active].title}` : ""}
              aria-hidden={shot.src !== activeSrc}
              width={shot.width}
              height={shot.height}
              quality={90}
              sizes={SIZES[variant]}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
