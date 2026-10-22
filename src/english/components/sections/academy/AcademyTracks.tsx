"use client";

import Image from "next/image";
import { useContactModal } from "@/english/components/contact/ContactModal";
import { Reveal } from "@/english/components/ui/Reveal";
import { useStackingCards } from "@/lib/useStackingCards";
import styles from "@/english/components/sections/academy/AcademyTracks.module.css";

type Track = {
  id: string;
  variant: "industry" | "vocational" | "cooperatives";
  title: string;
  text: string;
  visual: { src: string; width: number; height: number; alt: string };
  mark?: boolean;
};

const TRACKS: Track[] = [
  {
    id: "industry",
    variant: "industry",
    title: "TX Manufacturing Academy",
    text: "Programs in factory management systems, manufacturing applications, IoT, software integration, data analytics, and industrial AI. Learning paths are tailored to the industry, equipment, systems in use, and employees' responsibilities.",
    visual: {
      src: "/images/academy/track-dashboard.png",
      width: 970,
      height: 714,
      alt: "Asset monitoring, renewals, and asset management dashboard",
    },
  },
  {
    id: "vocational",
    variant: "vocational",
    title: "TX Vocational Academy",
    text: "Programs for young people, students, graduates, and job seekers covering business applications, data, automation, and AI. Assignments and projects help participants build work they can review and showcase.",
    visual: {
      src: "/images/academy/track-vta.png",
      width: 1548,
      height: 1016,
      alt: "Vocational Training Academy: Odoo, business, data, and AI skills for students",
    },
    mark: true,
  },
  {
    id: "cooperatives",
    variant: "cooperatives",
    title: "TX Cooperatives Academy",
    text: "Training in cooperative management and operations systems, investor and share management, and AI tools that support managers and administrators.",
    visual: {
      src: "/images/academy/track-dashboard.png",
      width: 970,
      height: 714,
      alt: "Asset monitoring, renewals, and asset management dashboard",
    },
  },
];

export function AcademyTracks() {
  const { open } = useContactModal();
  /* Stacking cards: each card pins under the navbar and the next one rides
     up over it. */
  const cardRef = useStackingCards();

  return (
    <section id="tracks" className={styles.section}>
      <Reveal as="h2" className={styles.heading}>
        {" Choose the academy that fits your needs "}</Reveal>

      <div className={styles.list}>
        {TRACKS.map((track, index) => (
          <article
            key={track.id}
            ref={cardRef(index)}
            id={track.id}
            className={`${styles.card} ${styles[track.variant]}`}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>{track.title}</h3>
              {track.mark && (
                <Image
                  className={styles.mark}
                  src="/images/academy/track-star.png"
                  alt=""
                  width={200}
                  height={200}
                  aria-hidden
                />
              )}
            </div>

            <div className={styles.body}>
              <div className={styles.copy}>
                <p className={styles.text}>{track.text}</p>
                <button
                  type="button"
                  className={styles.cta}
                  aria-haspopup="dialog"
                  onClick={open}
                >
                  {" Explore the academy "}{/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.ctaIcon}
                    src="/icons/academy/track-expand.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                  />
                </button>
              </div>

              <div className={styles.visual}>
                <Image
                  src={track.visual.src}
                  alt={track.visual.alt}
                  width={track.visual.width}
                  height={track.visual.height}
                  sizes="(max-width: 1024px) 100vw, 495px"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
