import type { CSSProperties } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AcademyPartners.module.css";

/* Figma 3459:11021 "Frame 11" — 560.953 x 325.965, clipped. Every layer is
   placed in % of that frame so the whole badge scales as one. */
const FRAME_W = 560.953;
const FRAME_H = 325.965;
const ELLIPSE = 115.454;
const TILE = 113.007;

const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / FRAME_W) * 100}%`,
  top: `${(y / FRAME_H) * 100}%`,
  width: `${(w / FRAME_W) * 100}%`,
  height: `${(h / FRAME_H) * 100}%`,
});

type LobeSpec = {
  x: number;
  y: number;
  tone: "blue" | "peach";
  /** The artboard's transform: `flip` mirrors vertically, `spin` turns
      180°, `both` does both. */
  turn?: "flip" | "spin" | "both";
};

/* The lobes, in paint order — blue and peach alternate across the badge. */
const LOBES: LobeSpec[] = [
  { x: 23.66, y: 48.14, tone: "blue" },
  { x: 23.66, y: 172.98, tone: "peach", turn: "flip" },
];

const LOBES_AFTER_TILES: LobeSpec[] = [
  { x: 400.62, y: 47.73, tone: "peach", turn: "both" },
  { x: 149.32, y: 48.14, tone: "peach" },
  { x: 274.97, y: 48.14, tone: "blue", turn: "both" },
];

const LOBES_FRONT: LobeSpec[] = [
  { x: 149.32, y: 172.98, tone: "blue", turn: "spin" },
  { x: 274.97, y: 172.98, tone: "peach", turn: "flip" },
  { x: 400.62, y: 172.98, tone: "blue", turn: "spin" },
];

const TURN: Record<string, CSSProperties> = {
  flip: { scale: "1 -1" },
  spin: { rotate: "180deg" },
  both: { rotate: "180deg", scale: "1 -1" },
};

function Lobe({ lobe }: { lobe: LobeSpec }) {
  return (
    <span
      className={styles.lobe}
      style={{ ...box(lobe.x, lobe.y, ELLIPSE, ELLIPSE), ...(lobe.turn ? TURN[lobe.turn] : null) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/icons/academy/partners-ellipse-${lobe.tone}.svg`} alt="" />
    </span>
  );
}

export function AcademyPartners() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.copy}>
          <h2 className={styles.title}>الشراكات التعليمية والتطبيقية</h2>
          <p className={styles.text}>
            نتعاون مع الجامعات والجمعيات والجهات التعليمية في تصميم برامج ودفعات
            ومشروعات تناسب تخصصات المشاركين ومستوياتهم، وتربط التعلم بتطبيقات
            الأعمال والتكنولوجيا
          </p>
          <PillButton>ناقش احتياجات فريقك</PillButton>
        </Reveal>

        <Reveal className={styles.badge} delay={120}>
          {LOBES.map((lobe) => (
            <Lobe key={`${lobe.x}-${lobe.y}`} lobe={lobe} />
          ))}
          <span className={styles.tile} style={box(87.71, 113.41, TILE, TILE)} />
          <span className={styles.tile} style={box(339.02, 113.41, TILE, TILE)} />
          {LOBES_AFTER_TILES.map((lobe) => (
            <Lobe key={`${lobe.x}-${lobe.y}`} lobe={lobe} />
          ))}
          <span className={styles.tile} style={box(213.37, 116.27, TILE, TILE)} />
          {LOBES_FRONT.map((lobe) => (
            <Lobe key={`${lobe.x}-${lobe.y}`} lobe={lobe} />
          ))}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            style={box(358, 120, 86, 89)}
            src="/images/academy/partner-creativa.png"
            alt="مركز إبداع مصر الرقمية CREATIVA"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            style={box(88, 127, 99, 99)}
            src="/images/academy/partner-bnu.png"
            alt="جامعة بنها الأهلية BNU"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            style={box(233.98, 119.99, 81.943, 57)}
            src="/icons/academy/partners-logo.svg"
            alt="Transformix"
          />
        </Reveal>
      </div>
    </section>
  );
}
