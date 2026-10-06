import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Partners.module.css";

type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Two logos are cropped inside their frame on the artboard. */
  crop?: { left: string; top: string; width: string; height: string };
};

/* Listed right-to-left: Google Cloud sits at the right edge of the artboard
   and Meta at the left. */
const LOGOS: PartnerLogo[] = [
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
  {
    src: "/logos/partner-gcp.png",
    alt: "Google Cloud",
    width: 102,
    height: 84,
  },
  { src: "/logos/partner-aws.png", alt: "AWS", width: 120, height: 108 },
];

const rem = (px: number) => `${px / 10}rem`;

export function Partners() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.title}>
        موثوقون عبر منصات وشبكات عالمية
      </Reveal>

      <div className={styles.row}>
        {LOGOS.map((logo, index) => (
          <Reveal
            key={logo.src}
            delay={index * 80}
            className={[styles.logo, logo.crop && styles.cropped]
              .filter(Boolean)
              .join(" ")}
            style={{ width: rem(logo.width), height: rem(logo.height) }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              style={logo.crop}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
