"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "./Testimonials.module.css";

type Review = {
  quote: string;
  name: string;
  avatar: { src: string; size: number; round: boolean };
};

const REVIEWS: Review[] = [
  {
    quote:
      "يسعنا إلا أن نتقدم بجزيل الشكر لوكالتكم التسويقية على خدماتها المتميزة. لقد ساهمت أفكار فريقكم الإبداعية ونهجهم القائم على البيانات في تحقيق نتائج باهرة في فترة وجيزة. ارتفع تفاعل متابعينا على وسائل التواصل الاجتماعي بشكل ملحوظ، واكتسبت علامتنا التجارية قاعدة جماهيرية وفية.",
    name: "يسرى بوغوس",
    avatar: { src: "/images/review-yosra.png", size: 47.712, round: true },
  },
  {
    quote:
      "بصفتي مدربة أسرية معتمدة، كنت أسعى لتعزيز علامتي التجارية الشخصية والتواصل مع المزيد من العائلات التي تحتاج إلى التوجيه. كان العمل مع شركة FUEX Solutions بمثابة نقطة تحول بالنسبة لي. فقد أدى نهجهم الاستراتيجي في التسويق عبر وسائل التواصل الاجتماعي إلى نمو ملحوظ بنسبة %134.5 في عدد متابعي خلال ثلاثة أسابيع فقط",
    name: "د/ ريم بخيت",
    avatar: { src: "/images/review-reem.png", size: 43, round: false },
  },
  {
    quote:
      "لقد فاقت وكالة Fuex توقعاتي بخدماتها المتميزة فريقهم محترف، سريع الاستجابة، ويفهم تماما احتياجات عملائهم. لقد قدموا نتائج عالية الجودة في الوقت المحدد، وكان لإبداعهم وخبرتهم أثر بالغ. أوصي بشدة بوكالة Fuex لكل من يبحث عن حلول تسويقية من الطراز الأول.",
    name: "د/روزانا البخاري",
    avatar: { src: "/images/review-rozana.png", size: 43, round: true },
  },
];

const COUNT = REVIEWS.length;
/* Three copies let the neighbours peek in on both sides and let the loop wrap
   without a visible jump. */
const SLIDES = [...REVIEWS, ...REVIEWS, ...REVIEWS];
/** How long each review stays centred before the next one slides in. */
const DISPLAY_MS = 4000;
const SLIDE_MS = 700;

const rem = (px: number) => `${px / 10}rem`;

/* Compact reviews stay centered, with neighbouring cards peeking in. */
export function Testimonials() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState({ viewport: 960, slide: 720, gap: 24 });
  const [position, setPosition] = useState(COUNT);
  const [animated, setAnimated] = useState(false);

  const activeIndex = position % COUNT;
  const step = metrics.slide + metrics.gap;
  const offset = (metrics.viewport - metrics.slide) / 2;

  const goTo = (target: number) => {
    setAnimated(true);
    setPosition(target);
  };

  /* Track the real card and gap sizes — they follow the rem scale. */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => {
      const slide = slideRef.current;
      const track = slide?.parentElement;
      if (!slide || !track) return;
      setMetrics({
        viewport: viewport.clientWidth,
        slide: slide.offsetWidth,
        gap: parseFloat(getComputedStyle(track).columnGap) || 0,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const normalized = COUNT + (position % COUNT);

    // After sliding into an outer copy, jump back to the middle copy unseen.
    if (normalized !== position) {
      const settle = setTimeout(() => {
        setAnimated(false);
        setPosition(normalized);
      }, SLIDE_MS);
      return () => clearTimeout(settle);
    }

    // Each review stays on screen for DISPLAY_MS once it has slid into place.
    const next = setTimeout(
      () => {
        setAnimated(true);
        setPosition(normalized + 1);
      },
      (animated ? SLIDE_MS : 0) + DISPLAY_MS,
    );
    return () => clearTimeout(next);
  }, [position, animated]);

  return (
    <section
      className={`${styles.section} ${tajawal.variable}`}
      aria-labelledby="reviews-heading"
    >
      <Reveal as="h2" id="reviews-heading" className={styles.title}>
        ما يقوله شركاؤنا وعملاؤنا
      </Reveal>

      <Reveal className={styles.carousel} delay={120}>
        <div ref={viewportRef} className={styles.viewport}>
          {/* Center the active card using the measured card width and gap. */}
          <div
            className={styles.track}
            style={{
              transform: `translateX(${position * step - offset}px)`,
              transition: animated
                ? `transform ${SLIDE_MS}ms var(--ease-in-out)`
                : "none",
            }}
          >
            {SLIDES.map((review, index) => (
              <figure
                key={index}
                ref={index === 0 ? slideRef : undefined}
                className={[styles.card, index === position && styles.cardActive]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={index !== position}
              >
                <div className={styles.cardHead}>
                  <figcaption className={styles.author}>
                    <Image
                      className={[styles.avatar, review.avatar.round && styles.round]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ width: rem(review.avatar.size), height: rem(review.avatar.size) }}
                      src={review.avatar.src}
                      alt=""
                      width={96}
                      height={96}
                    />
                    <span className={styles.name}>{review.name}</span>
                  </figcaption>
                  <Image
                    className={styles.stars}
                    src="/icons/stars-5-large.svg"
                    alt="تقييم 5 من 5"
                    width={162}
                    height={27}
                  />
                </div>
                <blockquote className={styles.quote}>
                  <p>{review.quote}</p>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>

        <div className={styles.dots}>
          {REVIEWS.map((review, index) => (
            <button
              key={review.name}
              type="button"
              className={[styles.dot, activeIndex === index && styles.dotActive]
                .filter(Boolean)
                .join(" ")}
              aria-label={`رأي ${review.name}`}
              aria-current={activeIndex === index}
              onClick={() => goTo(COUNT + index)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
