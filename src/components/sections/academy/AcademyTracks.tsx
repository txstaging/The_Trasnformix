"use client";

import Image from "next/image";
import { useContactModal } from "@/components/contact/ContactModal";
import { Reveal } from "@/components/ui/Reveal";
import { useStackingCards } from "@/lib/useStackingCards";
import styles from "./AcademyTracks.module.css";

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
    title: "أكاديمية TX للصناعة",
    text: "برامج في أنظمة إدارة المصنع، وتطبيقات التصنيع، وإنترنت الأشياء، وتكامل البرامج، وتحليل البيانات والذكاء الاصطناعي الصناعي. تخصص المسارات وفق الصناعة والتجهيزات والحلول المستخدمة ومسؤوليات العاملين",
    visual: {
      src: "/images/academy/track-dashboard.png",
      width: 970,
      height: 714,
      alt: "لوحة متابعة الأصول والتجديدات وإدارة الأصول",
    },
  },
  {
    id: "vocational",
    variant: "vocational",
    title: "أكاديمية TX للتأهيل المهني",
    text: "برامج للشباب والطلاب والخريجين والباحثين عن عمل جديدين، تشمل تطبيقات الأعمال والبيانات والأئمة والذكاء الاصطناعي، مع مهام ومشروعات تساعد المشاركين على بناء أعمال للتقييم والعرض",
    visual: {
      src: "/images/academy/track-vta.png",
      width: 1548,
      height: 1016,
      alt: "أكاديمية التدريب المهني VTA: مهارات Odoo، الطلاب، الأعمال والبيانات، الذكاء الاصطناعي",
    },
    mark: true,
  },
  {
    id: "cooperatives",
    variant: "cooperatives",
    title: "أكاديمية TX للتعاونيات",
    text: "تدريب على نظام الإدارة والتشغيل وإدارة المستثمرين والأسهم، أداة الذكاء الاصطناعي المساندة للمديرين والمسؤولين، نسخ البرنامج بين الشركاء المشاركين ويطلبون إلغاء اشتراكاتهم",
    visual: {
      src: "/images/academy/track-dashboard.png",
      width: 970,
      height: 714,
      alt: "لوحة متابعة الأصول والتجديدات وإدارة الأصول",
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
        اختر الأكاديمية المطلوبة لاحتياجاتك
      </Reveal>

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
                  استكشف الاكاديمية
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
