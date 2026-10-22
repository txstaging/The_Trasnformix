import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Clients.module.css";

type ClientLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  cell: number;
  cropped?: boolean;
};

/* Figma 3648:7057 — logo boxes and the width of the cell each one sits in. */
const LOGOS: ClientLogo[] = [
  { src: "/logos/client-1.png", alt: "عميل", width: 193, height: 81, cell: 384 },
  { src: "/logos/client-2.png", alt: "عميل", width: 173, height: 62, cell: 364 },
  { src: "/logos/client-3.png", alt: "عميل", width: 99, height: 85, cell: 290 },
  { src: "/logos/client-4.png", alt: "عميل", width: 215, height: 66, cell: 288 },
  {
    src: "/logos/client-5.png",
    alt: "عميل",
    width: 122,
    height: 69,
    cell: 317.8,
    cropped: true,
  },
  { src: "/logos/client-6.png", alt: "عميل", width: 74, height: 74, cell: 309 },
  { src: "/logos/client-7.png", alt: "عميل", width: 62, height: 63, cell: 288 },
];

const rem = (px: number) => `${px / 10}rem`;

/* One set of logos is ~2243px wide. Four sets keep the strip full across the
   whole cycle on any viewport, and the -25% keyframe lands on an identical
   frame so the loop has no visible seam. */
const RAIL_COPIES = 4;

export function Clients() {
  const rail = Array.from({ length: RAIL_COPIES }, () => LOGOS).flat();

  return (
    <section className={styles.section} aria-labelledby="clients-title">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {rail.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className={styles.cell}
              style={{ "--cell": rem(logo.cell) } as CSSProperties}
            >
              <div
                className={[styles.logo, logo.cropped && styles.cropped]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  {
                    "--logo-w": rem(logo.width),
                    "--logo-h": rem(logo.height),
                  } as CSSProperties
                }
              >
                {/* Eager: the copies that slide in from off-screen must already
                    be decoded, or they would cross the strip as blank cells. */}
                <Image
                  src={logo.src}
                  alt={index < LOGOS.length ? logo.alt : ""}
                  width={logo.width * 2}
                  height={logo.height * 2}
                  loading="eager"
                  aria-hidden={index >= LOGOS.length}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Figma 3648:7009 — the title card sits over the right end of the rail. */}
      <div className={styles.frame}>
        <Reveal className={styles.card}>
          <h2 id="clients-title" className={styles.title}>
            يثق بنا رواد الأعمال والشركات
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
