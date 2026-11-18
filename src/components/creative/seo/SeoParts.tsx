import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SeoParts.module.css";

export type JourneyStep = { icon: string; label: string };

/** The customer journey (Figma 4936:8566): four label cards, each beside a
    round icon on a rail; the last one is filled brand blue. */
export function JourneyCard({ steps }: { steps: readonly JourneyStep[] }) {
  return (
    <Reveal as="ol" className={styles.journey}>
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.label} className={styles.journeyStep}>
            <span className={styles.rail} aria-hidden>
              <span className={last ? `${styles.railIcon} ${styles.railIconOn}` : styles.railIcon}>
                <Image src={step.icon} alt="" width={24} height={24} />
              </span>
              {!last && <span className={styles.railLine} />}
            </span>
            <span className={last ? `${styles.journeyLabel} ${styles.journeyLabelOn}` : styles.journeyLabel}>
              {step.label}
            </span>
          </li>
        );
      })}
    </Reveal>
  );
}

export type Engagement = {
  title: string;
  text: string;
  icon: string;
  image: string;
  alt: string;
};

/** The engagement models (Figma 4934:8564): a 2×2 grid of horizontal cards,
    the photo on the near side, the outlined number and the icon tile above
    the title and its note. */
export function EngagementGrid({ items }: { items: readonly Engagement[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.card} delay={(index % 2) * 80}>
          <div className={styles.cardPhoto}>
            <Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 220px" />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden>
                <Image src={item.icon} alt="" width={24} height={24} />
              </span>
              <span className={styles.cardNumber} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** The "why" split: two paragraphs beside the journey card (on the far side). */
export function WhySplit({ lead, text, journey }: { lead: string; text: string; journey: ReactNode }) {
  return (
    <div className={styles.why}>
      <Reveal className={styles.whyCopy}>
        <p className={styles.whyLead}>{lead}</p>
        <p className={styles.whyText}>{text}</p>
      </Reveal>
      {journey}
    </div>
  );
}
