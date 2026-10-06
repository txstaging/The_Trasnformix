import { Button8 } from "@/components/ui/Button8";
import { CompMedia } from "@/components/ui/CompMedia";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./CtaBanner.module.css";

type Ornament = {
  /** Motion composition under public/videos. One film serves all three
      slots; the right-hand one is mirrored in CSS. */
  name: string;
  /** Exported still, used as its poster. */
  src: string;
  left?: number;
  right?: number;
  top: number;
  width: number;
  height: number;
};

type CtaBannerProps = {
  id?: string;
  /** Extra class on the band, for per-banner tweaks. */
  className?: string;
  /** Artboard height of the whole band. */
  height: number;
  title: string;
  titleSize: number;
  titleWeight: 500 | 600;
  titleColor: string;
  text: string;
  textSize: number;
  /** Artboard width of the paragraph line box. */
  textWidth: number;
  /** Vertical gap between heading and paragraph on the artboard. */
  copyGap: number;
  contentTop: number;
  ornaments: { right: Ornament; left: Ornament };
  cta: string;
};

const rem = (px: number) => `${px / 10}rem`;

export function CtaBanner({
  id,
  className,
  height,
  title,
  titleSize,
  titleWeight,
  titleColor,
  text,
  textSize,
  textWidth,
  copyGap,
  contentTop,
  ornaments,
  cta,
}: CtaBannerProps) {
  return (
    <section
      id={id}
      className={className ? `${styles.section} ${className}` : styles.section}
      style={{ height: rem(height) }}
    >
      <div className={styles.stage}>
        <div
          className={`${styles.ornament} ${styles.ornamentRight}`}
          style={{
            left: rem(ornaments.right.left ?? 0),
            top: rem(ornaments.right.top),
            width: rem(ornaments.right.width),
            height: rem(ornaments.right.height),
          }}
        >
          <CompMedia
            name={ornaments.right.name}
            poster={ornaments.right.src}
            width={ornaments.right.width}
            height={ornaments.right.height}
          />
        </div>

        <div
          className={`${styles.ornament} ${styles.ornamentLeft}`}
          style={{
            left: rem(ornaments.left.left ?? 0),
            top: rem(ornaments.left.top),
            width: rem(ornaments.left.width),
            height: rem(ornaments.left.height),
          }}
        >
          <CompMedia
            name={ornaments.left.name}
            poster={ornaments.left.src}
            width={ornaments.left.width}
            height={ornaments.left.height}
          />
        </div>

        <div className={styles.content} style={{ top: rem(contentTop) }}>
          <div className={styles.copy} style={{ gap: rem(copyGap) }}>
            <Reveal
              as="h2"
              className={styles.title}
              style={{
                fontSize: rem(titleSize),
                fontWeight: titleWeight,
                color: titleColor,
              }}
            >
              {title}
            </Reveal>
            <Reveal
              as="p"
              className={styles.text}
              delay={120}
              style={{ fontSize: rem(textSize), width: rem(textWidth) }}
            >
              {text}
            </Reveal>
          </div>

          <Reveal delay={240}>
            <Button8>{cta}</Button8>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Figma 2096:4689 — the mid-page "not sure where to start" band. */
export function CtaStart() {
  return (
    <CtaBanner
      className={styles.start}
      height={481}
      contentTop={113}
      title="مش متأكد من أين تبدأ؟"
      titleSize={48}
      titleWeight={500}
      titleColor="#000000"
      text="ابدأ بالتحدي الذي تريد حله، وسنساعدك على تحديد المسار والخدمات الأنسب لمشروعك."
      textSize={24}
      textWidth={607}
      copyGap={16}
      cta="ابدء مشروعك معنا"
      ornaments={{
        right: {
          name: "ornament",
          src: "/images/comp-4-right.png",
          left: 988,
          top: 32,
          width: 452,
          height: 295,
        },
        left: {
          name: "ornament",
          src: "/images/comp-4-left.png",
          left: 0,
          top: 32,
          width: 439,
          height: 287,
        },
      }}
    />
  );
}

/** Figma 2096:4847 — the closing "got a challenge?" band. */
export function CtaChallenge() {
  return (
    <CtaBanner
      id="contact"
      height={527}
      contentTop={122}
      title="عندك تحدٍ؟ نبني الحل حوله"
      titleSize={40}
      titleWeight={600}
      titleColor="var(--primary)"
      text="سواء كنت تحتاج إلى بيانات وذكاء اصطناعي، تجربة رقمية، هوية إبداعية أو نظام أعمال متكامل، نساعدك على اختيار الطريق المناسب وتنفيذه من الفكرة حتى التشغيل والنمو."
      textSize={24}
      textWidth={1023}
      copyGap={44}
      cta="ابدء مشروعك معنا"
      ornaments={{
        right: {
          name: "ornament",
          src: "/images/comp-4-right.png",
          left: 980,
          top: 45,
          width: 459,
          height: 299,
        },
        left: {
          name: "ornament",
          src: "/images/comp-4-left-2.png",
          left: 0,
          top: 45,
          width: 447,
          height: 299,
        },
      }}
    />
  );
}
