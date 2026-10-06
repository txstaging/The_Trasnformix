import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Clients.module.css";

type ClientLogo = {
  src: string;
  alt: string;
  /** Frame the logo occupies on the artboard. */
  width: number;
  height: number;
  /** Width of the cell that frame sits in. */
  cell: number;
  /** The artboard crops one logo inside its frame. */
  cropped?: boolean;
};

const LOGOS: ClientLogo[] = [
  { src: "/logos/client-1.png", alt: "عميل", width: 150, height: 64, cell: 341 },
  { src: "/logos/client-2.png", alt: "عميل", width: 120, height: 43, cell: 311 },
  { src: "/logos/client-3.png", alt: "عميل", width: 85, height: 74, cell: 288 },
  { src: "/logos/client-4.png", alt: "عميل", width: 179, height: 55, cell: 288 },
  {
    src: "/logos/client-5.png",
    alt: "عميل",
    width: 139,
    height: 78,
    cell: 334.8,
    cropped: true,
  },
  { src: "/logos/client-6.png", alt: "عميل", width: 66, height: 66, cell: 302 },
  { src: "/logos/client-7.png", alt: "عميل", width: 70, height: 70, cell: 288 },
];

const rem = (px: number) => `${px / 10}rem`;

/* One set of logos is ~2153px wide. Four sets keep the strip full across the
   whole cycle on any viewport, and the -25% keyframe lands on an identical
   frame so the loop has no visible seam. */
const RAIL_COPIES = 4;

export function Clients() {
  const rail = Array.from({ length: RAIL_COPIES }, () => LOGOS).flat();

  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        شركات و ثقت بنا
      </Reveal>

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
                <Image
                  src={logo.src}
                  alt={index < LOGOS.length ? logo.alt : ""}
                  width={logo.width}
                  height={logo.height}
                  aria-hidden={index >= LOGOS.length}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
