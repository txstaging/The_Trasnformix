import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Clients.module.css";

type ClientLogo = {
  src: string;
  width: number;
  height: number;
  /** A box that shows only part of its picture (Figma's cropped fills). */
  crop?: { left: number; top: number; width: number; height: number };
};

/* Figma 5204:24106 — the sixteen black logos, in the strip's order, each in
   its own box (design px). */
const LOGOS: ClientLogo[] = [
  { src: "/logos/home/image215.png", width: 125, height: 68, crop: { left: -1.6, top: -0.39, width: 101.6, height: 117.14 } },
  { src: "/logos/home/image211.png", width: 93, height: 92 },
  { src: "/logos/home/image208.png", width: 35, height: 72 },
  { src: "/logos/home/image207.png", width: 161, height: 56 },
  { src: "/logos/home/image214.png", width: 72, height: 72 },
  { src: "/logos/home/image212.png", width: 138, height: 65 },
  { src: "/logos/home/image206.png", width: 74, height: 72 },
  { src: "/logos/home/image202.png", width: 129, height: 92 },
  { src: "/logos/home/image205.png", width: 185, height: 49 },
  { src: "/logos/home/image203.png", width: 187, height: 102 },
  { src: "/logos/home/image209.png", width: 118, height: 72 },
  { src: "/logos/home/image204.png", width: 100, height: 80, crop: { left: 0, top: 5.08, width: 100, height: 89.84 } },
  { src: "/logos/home/image210.png", width: 194, height: 68 },
  { src: "/logos/home/xprt21.png", width: 79, height: 72 },
  { src: "/logos/home/escavida021.png", width: 61, height: 72 },
  { src: "/logos/home/fexpert21.png", width: 167, height: 54 },
  /* The earlier strip's seven logos, kept at their old sizes. */
  { src: "/logos/home/old-1.png", width: 193, height: 81 },
  { src: "/logos/home/old-2.png", width: 173, height: 62 },
  { src: "/logos/home/old-3.png", width: 99, height: 85 },
  { src: "/logos/home/old-4.png", width: 215, height: 66 },
  { src: "/logos/home/old-5.png", width: 122, height: 69, crop: { left: -0.27, top: -16.67, width: 100.54, height: 133.33 } },
  { src: "/logos/home/old-6.png", width: 74, height: 74 },
  { src: "/logos/home/old-7.png", width: 62, height: 63 },
];

const rem = (px: number) => `${px / 10}rem`;

/* One set of logos is ~4500px wide. Three sets keep the strip full across the
   whole cycle on any viewport, and the -33.333% keyframe lands on an
   identical frame so the loop has no visible seam. */
const RAIL_COPIES = 3;

export function Clients() {
  const rail = Array.from({ length: RAIL_COPIES }, () => LOGOS).flat();

  return (
    <section className={styles.section} aria-labelledby="clients-title">
      <Reveal className={styles.head}>
        <h2 id="clients-title" className={styles.title}>
          يثق بنا رواد الأعمال والشركات
        </h2>
      </Reveal>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {rail.map((logo, index) => {
            const original = index < LOGOS.length;
            return (
              <div
                key={`${logo.src}-${index}`}
                className={styles.logo}
                style={
                  {
                    "--logo-w": rem(logo.width),
                    "--logo-h": rem(logo.height),
                  } as CSSProperties
                }
              >
                {/* Eager and served as-is (the files are already sized for the strip): the copies that slide in from off-screen must already
                    be decoded, or they would cross the strip as blank cells. */}
                <Image
                  src={logo.src}
                  alt={original ? "شعار عميل" : ""}
                  width={logo.width * 2}
                  height={logo.height * 2}
                  loading="eager"
                  unoptimized
                  aria-hidden={!original}
                  className={logo.crop ? styles.cropped : undefined}
                  style={
                    logo.crop
                      ? {
                          left: `${logo.crop.left}%`,
                          top: `${logo.crop.top}%`,
                          width: `${logo.crop.width}%`,
                          height: `${logo.crop.height}%`,
                        }
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
