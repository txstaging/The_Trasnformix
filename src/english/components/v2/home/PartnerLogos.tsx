import { Media, type Crop } from "@/english/components/v2/ui/Media";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/home/PartnerLogos.module.css";

type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
  crop?: Crop;
};

/* Right to left as drawn (Figma 3751:9119); each logo keeps its frame size
   and, for NVIDIA and Meta, the crop that trims the export's margins. */
const PARTNERS: Partner[] = [
  { name: "Google Cloud", src: "/v2/partners/google-cloud.png", width: 102, height: 84 },
  { name: "AWS", src: "/v2/partners/aws.png", width: 120, height: 108 },
  { name: "Zoho", src: "/v2/partners/zoho.png", width: 150, height: 84 },
  { name: "Odoo", src: "/v2/partners/odoo.png", width: 150, height: 48 },
  {
    name: "NVIDIA",
    src: "/v2/partners/nvidia.png",
    width: 150,
    height: 40,
    crop: { left: -14.86, top: -96.52, width: 127.97, height: 300 },
  },
  {
    name: "Meta",
    src: "/v2/partners/meta.png",
    width: 150,
    height: 46,
    crop: { left: 0, top: -112.2, width: 100, height: 325.2 },
  },
];

/** Figma "Company partners" (3709:756). */
export function PartnerLogos() {
  return (
    <section className={styles.section}>
      <SectionIntro eyebrow={"Partners"} title={"Our partners in success"} tight />
      <ul className={styles.row}>
        {PARTNERS.map((partner) => (
          <li key={partner.name}>
            <Media
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              crop={partner.crop}
              sizes={`${partner.width * 2}px`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
