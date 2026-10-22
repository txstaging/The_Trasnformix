import Image from "next/image";
import { PillButton } from "@/english/components/ui/PillButton";
import { CompMedia } from "@/english/components/ui/CompMedia";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/CtaBanner.module.css";
import challenge from "@/english/components/sections/CtaChallenge.module.css";

type Ornament = {
  /** Motion composition under public/videos. One film serves all three
      slots; the right-hand one is mirrored in CSS. */
  name: string;
  src: string;
  left?: number;
  right?: number;
  top: number;
  width: number;
  height: number;
};

type CtaBannerProps = {
  id?: string;
  className?: string;
  height: number;
  title: string;
  titleSize: number;
  titleWeight: 500 | 600;
  titleColor: string;
  text: string;
  textSize: number;
  textWidth: number;
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
            <PillButton>{cta}</PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CtaStart() {
  return (
    <CtaBanner
      className={styles.start}
      height={481}
      contentTop={113}
      title={"Not sure where to start?"}
      titleSize={48}
      titleWeight={500}
      titleColor="#000000"
      text={"Start with the challenge you want to solve. We will help you identify the right approach and services for your project."}
      textSize={24}
      textWidth={607}
      copyGap={16}
      cta={"Start your project with us"}
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

type Mockup = {
  src: string;
  width: number;
  height: number;
  /** The artboard's crop of the source image inside its rounded frame. */
  crop?: { left: string; top: string; width: string; height: string };
};

type MockupColumn = {
  left: number;
  top: number;
  width: number;
  direction: "up" | "down";
  /** Seconds for one full loop of the column. */
  duration: number;
  /** The first column hangs its narrower card from the right edge. */
  alignEnd?: boolean;
  items: Mockup[];
};

/* Figma 3614:5489 — three columns of project mockups bleeding off the left
   end of the panel. Each column holds its cards twice and scrolls exactly one
   set per loop, so it keeps moving up or down without ever showing a gap. */
const MOCKUP_COLUMNS: MockupColumn[] = [
  {
    left: -113,
    top: -63,
    width: 259,
    direction: "up",
    duration: 26,
    alignEnd: true,
    items: [
      {
        src: "/images/challenge/mockup-1.png",
        width: 259,
        height: 413,
        crop: { left: "-106.04%", top: "17.03%", width: "348.59%", height: "160.31%" },
      },
      {
        src: "/images/challenge/mockup-6.jpg",
        width: 231,
        height: 193,
        crop: { left: "-163.28%", top: "-16.58%", width: "476%", height: "232.77%" },
      },
    ],
  },
  {
    left: 174,
    top: 1,
    width: 231,
    direction: "down",
    duration: 34,
    items: [
      {
        src: "/images/challenge/mockup-3.jpg",
        width: 231,
        height: 174,
        crop: { left: "-6.1%", top: "-0.19%", width: "112.7%", height: "103.45%" },
      },
      {
        src: "/images/challenge/mockup-5.png",
        width: 231,
        height: 307,
        crop: { left: "-51.22%", top: "-0.32%", width: "156.22%", height: "100%" },
      },
      { src: "/images/challenge/mockup-7.jpg", width: 231, height: 307 },
    ],
  },
  {
    left: 433,
    top: 1,
    width: 231,
    direction: "up",
    duration: 25,
    items: [
      { src: "/images/challenge/mockup-8.png", width: 231, height: 389 },
      {
        src: "/images/challenge/mockup-9.jpg",
        width: 231,
        height: 180,
        crop: { left: "-40.55%", top: "-14.55%", width: "181.24%", height: "109.65%" },
      },
    ],
  },
];

/** Figma 3614:5475 — "من التحدي إلى حل رقمي يقود نموك": a light panel with the
    copy on the right and the moving mockup columns on the left. */
export function CtaChallenge() {
  return (
    <section id="contact" className={`${challenge.section} ${tajawal.variable}`}>
      <Reveal className={challenge.panel}>
        <div className={challenge.content}>
          <div className={challenge.copy}>
            <h2 className={challenge.title}>{"Digital solutions that solve your challenges and drive growth"}</h2>
            <p className={challenge.text}>
              {" Our process starts with understanding your business and leads to flexible, scalable solutions that support your future ambitions. "}</p>
          </div>
          <PillButton className={challenge.cta}>
            {" Book your consultation "}</PillButton>
        </div>

        <div className={challenge.mockups} aria-hidden>
          {MOCKUP_COLUMNS.map((column) => (
            <div
              key={column.left}
              className={challenge.column}
              style={{ left: rem(column.left), top: rem(column.top), width: rem(column.width) }}
            >
              <div
                className={`${challenge.reel} ${
                  column.direction === "up" ? challenge.reelUp : challenge.reelDown
                }`}
                style={{ animationDuration: `${column.duration}s` }}
              >
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className={`${challenge.set} ${column.alignEnd ? challenge.setEnd : ""}`}
                  >
                    {column.items.map((item) => (
                      <div
                        key={item.src}
                        className={challenge.card}
                        style={{ width: rem(item.width), height: rem(item.height) }}
                      >
                        {item.crop ? (
                          <Image
                            className={challenge.cropped}
                            style={item.crop}
                            src={item.src}
                            alt=""
                            width={item.width * 2}
                            height={item.height * 2}
                            loading="eager"
                          />
                        ) : (
                          <Image
                            className={challenge.cover}
                            src={item.src}
                            alt=""
                            fill
                            sizes={`${item.width}px`}
                            loading="eager"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
