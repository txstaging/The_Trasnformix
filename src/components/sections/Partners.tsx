import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Partners.module.css";

type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop?: { left: string; top: string; width: string; height: string };
};

/* Listed right-to-left (Figma 3532:37289): Google Cloud sits at the right
   edge of the artboard, then AWS, Zoho, Odoo, NVIDIA and Meta at the left. */
const LOGOS: PartnerLogo[] = [
  {
    src: "/logos/partner-gcp.png",
    alt: "Google Cloud",
    width: 102,
    height: 84,
  },
  { src: "/logos/partner-aws.png", alt: "AWS", width: 120, height: 108 },
  { src: "/logos/partner-4.png", alt: "Zoho", width: 150, height: 84 },
  { src: "/logos/partner-odoo.png", alt: "Odoo", width: 150, height: 48 },
  {
    src: "/logos/partner-nvidia.png",
    alt: "NVIDIA",
    width: 150,
    height: 40,
    crop: {
      left: "-14.86%",
      top: "-96.52%",
      width: "127.97%",
      height: "300%",
    },
  },
  {
    src: "/logos/partner-meta.png",
    alt: "Meta",
    width: 150,
    height: 46,
    crop: { left: "0", top: "-112.2%", width: "100%", height: "325.2%" },
  },
];

const rem = (px: number) => `${px / 10}rem`;

/* Same marquee as the clients rail: one set is ~1540px wide, so four sets keep
   the strip full on any viewport and the -25% keyframe loops without a seam. */
const RAIL_COPIES = 4;

export function Partners() {
  const rail = Array.from({ length: RAIL_COPIES }, () => LOGOS).flat();

  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        موثوقون عبر منصات وشبكات عالمية
      </Reveal>

      <Reveal className={styles.viewport} delay={120}>
        <div className={styles.track}>
          {rail.map((logo, index) => (
            <div key={`${logo.src}-${index}`} className={styles.cell}>
              <div
                className={[styles.logo, logo.crop && styles.cropped]
                  .filter(Boolean)
                  .join(" ")}
                style={{ width: rem(logo.width), height: rem(logo.height) }}
              >
                {/* Eager: the copies that slide in from off-screen must already
                    be decoded, or they would cross the strip as blank cells. */}
                <Image
                  src={logo.src}
                  alt={index < LOGOS.length ? logo.alt : ""}
                  width={logo.width}
                  height={logo.height}
                  style={logo.crop}
                  loading="eager"
                  aria-hidden={index >= LOGOS.length}
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
