import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "./Testimonials.module.css";

/* Where "رؤية جميع الاراء" leads.
   NOTE: the artboard gives it no target — point it at the reviews page or
   profile once there is one. */
const ALL_REVIEWS_HREF = "#";

type Box = { right: number; top: number };

type Review = {
  quote: string;
  name: string;
  /** Second caption line (source or role), where drawn. */
  meta?: { text: string; size: number } & Box;
  /** Card width on the artboard; the three are not the same. */
  width: number;
  radius: number;
  /** Only the right-hand card carries the drop shadow. */
  raised?: boolean;
  stars: { src: string; width: number; height: number } & Box;
  quoteBox: { width: number; height: number; size: number } & Box;
  avatar: { src: string; width: number; height: number; round: boolean } & Box;
  nameBox: Box;
};

/* Figma 2150:25508, right-to-left. Every offset is measured from the card's
   right edge, where the RTL copy is anchored, in artboard px. */
const REVIEWS: Review[] = [
  {
    quote:
      "بصفتي مدربة أسرية معتمدة، كنت أسعى لتعزيز علامتي التجارية الشخصية والتواصل مع المزيد من العائلات التي تحتاج إلى التوجيه. كان العمل مع شركة FUEX Solutions بمثابة نقطة تحول بالنسبة لي. فقد أدى نهجهم الاستراتيجي في التسويق عبر وسائل التواصل الاجتماعي إلى نمو ملحوظ بنسبة %134.5 في عدد متابعي خلال ثلاثة أسابيع فقط",
    name: "د/ ريم بخيت",
    meta: { text: "مستشارة اجتماعية", size: 14, right: 83, top: 289 },
    width: 382,
    radius: 8,
    raised: true,
    stars: { src: "/icons/stars-5-compact.svg", width: 96, height: 16, right: 28, top: 28 },
    quoteBox: { width: 325, height: 134, size: 13, right: 28, top: 78 },
    avatar: { src: "/images/review-reem.png", width: 43, height: 43, round: false, right: 28, top: 267 },
    nameBox: { right: 84, top: 261 },
  },
  {
    quote:
      "يسعنا إلا أن نتقدم بجزيل الشكر لوكالتكم التسويقية على خدماتها المتميزة. لقد ساهمت أفكار فريقكم الإبداعية ونهجهم القائم على البيانات في تحقيق نتائج باهرة في فترة وجيزة. ارتفع تفاعل متابعينا على وسائل التواصل الاجتماعي بشكل ملحوظ، واكتسبت علامتنا التجارية قاعدة جماهيرية وفية.",
    name: "يسرى بوغوس",
    width: 427.84,
    radius: 8.96,
    stars: { src: "/icons/stars-5.svg", width: 107.52, height: 17.92, right: 31.36, top: 31.36 },
    quoteBox: { width: 368, height: 174, size: 14, right: 38.84, top: 87 },
    avatar: { src: "/images/review-yosra.png", width: 47.712, height: 47.712, round: true, right: 31.128, top: 254 },
    nameBox: { right: 82.84, top: 256 },
  },
  {
    quote:
      "لقد فاقت وكالة Fuex توقعاتي بخدماتها المتميزة فريقهم محترف، سريع الاستجابة، ويفهم تماما احتياجات عملائهم. لقد قدموا نتائج عالية الجودة في الوقت المحدد، وكان لإبداعهم وخبرتهم أثر بالغ. أوصي بشدة بوكالة Fuex لكل من يبحث عن حلول تسويقية من الطراز الأول.",
    name: "د/روزانا البخاري",
    meta: { text: "عبر بيكسفورت.", size: 11.3, right: 55, top: 279 },
    width: 427.84,
    radius: 8.96,
    stars: { src: "/icons/stars-5.svg", width: 107.52, height: 17.92, right: 31.36, top: 31.36 },
    quoteBox: { width: 376, height: 174, size: 14, right: 30.92, top: 87 },
    avatar: { src: "/images/review-rozana.png", width: 20, height: 22, round: true, right: 31, top: 254 },
    nameBox: { right: 55, top: 245 },
  },
];

const rem = (px: number) => `${px / 10}rem`;

const at = (prefix: string, box: Box) => ({
  [`--${prefix}-r`]: rem(box.right),
  [`--${prefix}-t`]: rem(box.top),
});

export function Testimonials() {
  return (
    <section
      className={`${styles.section} ${tajawal.variable}`}
      aria-labelledby="reviews-heading"
    >
      <Reveal as="h2" id="reviews-heading" className={styles.title}>
        تجارب حقيقية مع حلول AI تصنع فرقًا
      </Reveal>

      <div className={styles.stage}>
        <div className={styles.plate} aria-hidden />

        <div className={styles.cards}>
          {REVIEWS.map((review, index) => (
            <Reveal
              as="figure"
              key={review.name}
              className={[styles.card, review.raised && styles.raised]
                .filter(Boolean)
                .join(" ")}
              delay={index * 120}
              style={
                {
                  "--card-w": rem(review.width),
                  "--radius": rem(review.radius),
                  ...at("stars", review.stars),
                  "--stars-w": rem(review.stars.width),
                  "--stars-h": rem(review.stars.height),
                  ...at("q", review.quoteBox),
                  "--q-w": rem(review.quoteBox.width),
                  "--q-h": rem(review.quoteBox.height),
                  "--q-size": rem(review.quoteBox.size),
                  ...at("av", review.avatar),
                  "--av-w": rem(review.avatar.width),
                  "--av-h": rem(review.avatar.height),
                  ...at("name", review.nameBox),
                  ...(review.meta && {
                    ...at("meta", review.meta),
                    "--meta-size": rem(review.meta.size),
                  }),
                } as CSSProperties
              }
            >
              <Image
                className={styles.stars}
                src={review.stars.src}
                alt="تقييم 5 من 5"
                width={Math.round(review.stars.width)}
                height={Math.round(review.stars.height)}
              />
              <blockquote className={styles.quote}>
                <p>{review.quote}</p>
              </blockquote>
              <figcaption className={styles.caption}>
                <Image
                  className={[styles.avatar, review.avatar.round && styles.round]
                    .filter(Boolean)
                    .join(" ")}
                  src={review.avatar.src}
                  alt=""
                  width={Math.round(review.avatar.width)}
                  height={Math.round(review.avatar.height)}
                />
                <span className={styles.name}>{review.name}</span>
                {review.meta && (
                  <span className={styles.meta}>{review.meta.text}</span>
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>

        <a className={styles.more} href={ALL_REVIEWS_HREF}>
          رؤية جميع الاراء
        </a>
      </div>
    </section>
  );
}
