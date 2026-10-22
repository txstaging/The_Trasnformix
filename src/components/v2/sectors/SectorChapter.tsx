import Image from "next/image";
import type { CSSProperties } from "react";
import { Media } from "@/components/v2/ui/Media";
import styles from "./SectorChapter.module.css";

export type Sector = {
  id: string;
  icon: string;
  title: string;
  lead: string;
  priorities: string[];
  services: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Which side the photo takes on desktop; the chapters alternate. */
  imageSide: "left" | "right";
  /** Design px: the copy column, the gap to the photo, the spacing inside the
      copy and the boxes the two paragraphs wrap in (Figma 3693:66276). */
  layout: { copy: number; gap: number; rhythm: number; leadWidth?: number; servicesWidth?: number };
};

const rem = (px?: number) => (px ? `${px / 10}rem` : undefined);

/** Figma "Sector chapter": a photo beside the sector's priorities and the
    services that serve it, all copy right-aligned. */
export function SectorChapter({ sector }: { sector: Sector }) {
  const { layout, image } = sector;

  return (
    <section
      id={sector.id}
      className={`${styles.chapter} ${sector.imageSide === "right" ? styles.imageRight : ""}`}
      style={
        {
          "--copy-w": rem(layout.copy),
          "--gap": rem(layout.gap),
          "--rhythm": rem(layout.rhythm),
          "--lead-w": rem(layout.leadWidth),
          "--services-w": rem(layout.servicesWidth),
        } as CSSProperties
      }
    >
      <div className={styles.copy}>
        <Image className={styles.icon} src={sector.icon} alt="" width={36} height={36} />
        <h2 className={styles.title}>{sector.title}</h2>
        <p className={styles.lead}>{sector.lead}</p>
        <h3 className={styles.label}>أولويات نبدأ بمناقشتها</h3>
        <ul className={styles.priorities}>
          {sector.priorities.map((priority) => (
            <li key={priority}>— {priority}</li>
          ))}
        </ul>
        <h3 className={styles.label}>كيف تترابط خدماتنا؟</h3>
        <p className={styles.services}>{sector.services}</p>
      </div>
      <Media
        className={styles.image}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        radius={24}
      />
    </section>
  );
}
