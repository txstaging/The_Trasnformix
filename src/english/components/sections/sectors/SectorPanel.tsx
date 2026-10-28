"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import { ScrollTilt } from "@/english/components/ui/ScrollTilt";
import styles from "@/english/components/sections/sectors/SectorPanel.module.css";

type Box = { x: number; y: number; width: number; height: number };

export type SectorShot = {
  src: string;
  width: number;
  height: number;
  /** The render's box on the band's frame (FRAME), in design px. */
  box: Box;
  /** The render inside its box, in % of the box — Figma's crop. Without one
      it covers the box. */
  crop?: { left: number; top: number; width: number; height: number };
  radius?: number;
  shadow?: boolean;
};

export type SectorItem = {
  number: string;
  title: string;
  text: string;
  textColor?: string;
  textSize?: number;
  shot: SectorShot;
};

type Variant = "industry" | "cooperatives" | "education";

type SectorPanelProps = {
  id: string;
  variant: Variant;
  eyebrow: string;
  title: string;
  text: string;
  items: SectorItem[];
  cta: { label: string; href?: string; external?: boolean };
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const rem = (px: number) => `${px / 10}rem`;

const pct = (part: number, whole: number) => `${(part / whole) * 100}%`;

/* The visual's frame per band, in design px. */
const FRAME: Record<Variant, { width: number; height: number }> = {
  industry: { width: 508, height: 813 },
  cooperatives: { width: 509.64, height: 700 },
  education: { width: 509.64, height: 669 },
};

/* The widest crop is ~570 design px. */
const SIZES = "(max-width: 1024px) 112vw, (max-width: 1440px) 40vw, 570px";

/** The area every render of a band covers. Phones show only this, so the
    tablet isn't wrapped in the frame's empty space. */
function stageOf(shots: SectorShot[]): Box {
  const x = Math.min(...shots.map((shot) => shot.box.x));
  const y = Math.min(...shots.map((shot) => shot.box.y));
  const right = Math.max(...shots.map((shot) => shot.box.x + shot.box.width));
  const bottom = Math.max(...shots.map((shot) => shot.box.y + shot.box.height));
  return { x, y, width: right - x, height: bottom - y };
}

/** One sector band: heading, numbered rows and a tablet render. Every row is
    a tab that swaps the render beside it. */
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

  const frame = FRAME[variant];
  const stage = stageOf(items.map((item) => item.shot));

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
          <PillButton href={cta.href} external={cta.external} className={styles.cta}>
            {cta.label}
          </PillButton>
        </div>
      </div>

      <Reveal className={styles.visualSlot} delay={120}>
        <div
          id={panelId}
          className={styles.frame}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          style={{ "--frame-ratio": `${frame.width} / ${frame.height}` } as CSSProperties}
        >
          <div
            className={styles.stage}
            style={
              {
                "--stage-x": pct(stage.x, frame.width),
                "--stage-y": pct(stage.y, frame.height),
                "--stage-w": pct(stage.width, frame.width),
                aspectRatio: `${stage.width} / ${stage.height}`,
              } as CSSProperties
            }
          >
            <ScrollTilt className={styles.tilt}>
              {items.map(({ number, shot }, index) => (
                <div
                  key={number}
                  className={cx(
                    styles.shot,
                    shot.shadow && styles.shotShadow,
                    index === active && styles.shotActive,
                  )}
                  style={{
                    left: pct(shot.box.x - stage.x, stage.width),
                    top: pct(shot.box.y - stage.y, stage.height),
                    width: pct(shot.box.width, stage.width),
                    height: pct(shot.box.height, stage.height),
                    borderRadius: shot.radius ? rem(shot.radius) : undefined,
                  }}
                  aria-hidden={index !== active}
                >
                  <Image
                    className={styles.shotImg}
                    style={
                      shot.crop && {
                        left: `${shot.crop.left}%`,
                        top: `${shot.crop.top}%`,
                        width: `${shot.crop.width}%`,
                        height: `${shot.crop.height}%`,
                      }
                    }
                    src={shot.src}
                    alt={index === active ? `${title} — ${items[index].title}` : ""}
                    width={shot.width}
                    height={shot.height}
                    quality={90}
                    sizes={SIZES}
                  />
                </div>
              ))}
            </ScrollTilt>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
