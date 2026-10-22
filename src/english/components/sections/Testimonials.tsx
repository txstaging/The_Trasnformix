"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Testimonials.module.css";

type Review = {
  quote: string;
  name: string;
  avatar: { src: string; size: number; round: boolean };
};

const REVIEWS: Review[] = [
  {
    quote:
      "We would like to thank your marketing agency for its outstanding services. Your team's creative ideas and data-driven approach delivered impressive results in a short time. Our social media engagement increased significantly, and our brand gained a loyal audience.",
    name: "Yousra Boghos",
    avatar: { src: "/images/review-yosra.png", size: 47.712, round: true },
  },
  {
    quote:
      "As a certified family coach, I wanted to strengthen my personal brand and connect with more families seeking guidance. Working with FUEX Solutions was a turning point. Their strategic approach to social media marketing helped my follower count grow by 134.5% in just three weeks.",
    name: "Dr. Reem Bakhit",
    avatar: { src: "/images/review-reem.png", size: 43, round: false },
  },
  {
    quote:
      "Fuex exceeded my expectations with its excellent services. The team is professional, responsive, and understands its clients' needs. They delivered high-quality results on time, and their creativity and expertise made a real difference. I highly recommend Fuex to anyone seeking outstanding marketing solutions.",
    name: "Dr. Rozana Al Bukhari",
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
        {" What our partners and clients say "}</Reveal>

      <Reveal className={styles.carousel} delay={120}>
        <div ref={viewportRef} className={styles.viewport}>
          {/* Center the active card using the measured card width and gap. */}
          <div
            className={styles.track}
            style={{
              transform: `translateX(${offset - position * step}px)`,
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
                    alt={"Rated 5 out of 5"}
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
              aria-label={`Review ${review.name}`}
              aria-current={activeIndex === index}
              onClick={() => goTo(COUNT + index)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
