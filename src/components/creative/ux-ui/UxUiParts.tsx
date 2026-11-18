import Image from "next/image";
import type { ReactNode } from "react";
import { IconTile, type Icon } from "@/components/academies/AcademiesKit";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./UxUi.module.css";

/* تصميم تجربة المستخدم والواجهات الرقمية — the parts only this page draws
   (Figma 4843:6923): the three capability cards, the 3x2 experiences grid, the
   tinted callout and the 2x2 collaboration cards. Breakpoints match the
   academies: 1024 and 640. */

export type Pillar = { icon: string; title: string; chips: readonly string[] };

/** Three cards, each an outlined numeral and a round blue icon over a title
    and its pill tags (Figma "Pillars" 4845:7043). */
export function CapabilityCards({ items }: { items: readonly Pillar[] }) {
  return (
    <ol className={styles.pillars}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.pillar} delay={index * 80}>
          <div className={styles.pillarHead}>
            <span className={styles.circle} aria-hidden>
              <Image src={item.icon} alt="" width={24} height={24} />
            </span>
            <span className={styles.numeral} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className={styles.pillarTitle}>{item.title}</h3>
          <ul className={styles.chips}>
            {item.chips.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}

export type Experience = { icon: Icon; title: string; text: string };

/** Three across, two rows: an icon tile, the title and a line of copy. */
export function ExperienceGrid({ items }: { items: readonly Experience[] }) {
  return (
    <ul className={styles.experiences}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.experience} delay={(index % 3) * 80}>
          <IconTile icon={item.icon} />
          <h3 className={styles.experienceTitle}>{item.title}</h3>
          <p className={styles.experienceText}>{item.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/** A tinted note with a brand-blue rule on its start edge (Figma V2/Callout). */
export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className={styles.callout}>
      <p className={styles.calloutLabel}>{label}</p>
      <p className={styles.calloutText}>{children}</p>
    </aside>
  );
}

export type Engagement = { icon: string; title: string; text: string; image: string; alt: string };

/** Four horizontal cards, two across: an outlined numeral and icon, the title
    and its copy beside a photo (Figma "Engagement grid 2x2" 4846:7237). */
export function EngagementCards({ items }: { items: readonly Engagement[] }) {
  return (
    <ol className={styles.engagements}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.engagement} delay={(index % 2) * 80}>
          <div className={styles.engagementText}>
            <div className={styles.engagementHead}>
              <span className={styles.engagementIcon} aria-hidden>
                <Image src={item.icon} alt="" width={24} height={24} />
              </span>
              <span className={styles.numeral} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className={styles.engagementTitle}>{item.title}</h3>
            <p className={styles.engagementCopy}>{item.text}</p>
          </div>
          <div className={styles.engagementMedia}>
            <Image className={styles.engagementImage} src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 220px" />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
