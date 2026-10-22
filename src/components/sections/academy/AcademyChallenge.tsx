import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollTilt } from "@/components/ui/ScrollTilt";
import styles from "./AcademyChallenge.module.css";

const rem = (px: number) => `${px / 10}rem`;

type Box = { x: number; y: number; w: number; h: number };

/** A layer the artboard rotates inside its bounding box. `flip` mirrors it
    vertically first (Tailwind's -scale-y-100), as Figma draws it. */
type Turned = Box & {
  src: string;
  innerW: number;
  innerH: number;
  rotate: number;
  flip?: boolean;
};

const boxStyle = ({ x, y, w, h }: Box) =>
  ({
    "--x": rem(x),
    "--y": rem(y),
    "--w": rem(w),
    "--h": rem(h),
  }) as CSSProperties;

const CURVES: Turned[] = [
  { src: "curve-1", x: 1038.2, y: 350.71, w: 165.461, h: 144.907, innerW: 98.002, innerH: 137.771, rotate: 113.56, flip: true },
  { src: "curve-2", x: 901.78, y: 689.32, w: 171.223, h: 149.952, innerW: 101.415, innerH: 142.568, rotate: 113.56, flip: true },
  { src: "curve-3", x: 220.3, y: 447.38, w: 163.422, h: 130.001, innerW: 104.063, innerH: 146.292, rotate: 79.03 },
];

const dashes = (x: number, y: number, set: "a" | "b", rotate: number): Turned[] => {
  const offsets =
    set === "a"
      ? [
          { dx: 0, dy: 0, w: 23.137, h: 23.706 },
          { dx: 3.72, dy: 21.08, w: 32.728, h: 32.829 },
          { dx: 8.62, dy: 53.66, w: 32.98, h: 32.602 },
        ]
      : [
          { dx: 0, dy: 0, w: 14.937, h: 26.213 },
          { dx: 12.86, dy: 17.12, w: 27.792, h: 29.797 },
          { dx: 29.79, dy: 46.08, w: 32.553, h: 25.059 },
        ];
  const inner = [
    { innerW: 8.231, innerH: 24.901 },
    { innerW: 21.702, innerH: 24.667 },
    { innerW: 28.734, innerH: 17.653 },
  ];
  return offsets.map((o, i) => ({
    src: `spark-${set}${i + 1}`,
    x: x + o.dx,
    y: y + o.dy,
    w: o.w,
    h: o.h,
    ...inner[i],
    rotate,
    flip: true,
  }));
};

const SPARKS: Turned[] = [
  ...dashes(1323, 566, "a", 43.62),
  ...dashes(279.35, 555, "b", 16.43),
  ...dashes(970.84, 789, "b", 16.43),
];

const PILLS: (Box & { label: string; pillW: number; rotate: number })[] = [
  { label: "تبسيط المهام، وتقليل الأخطاء", x: 1082.68, y: 486, w: 261.457, h: 173.944, pillW: 261.256, rotate: 26.83 },
  { label: "وتطوير كفاءة فرق العمل", x: 91.51, y: 586.93, w: 216.128, h: 64.102, pillW: 215.744, rotate: -0.35 },
  { label: "تمكين الفرق من استخدام الأنظمة بكفاءة", x: 647.65, y: 820.93, w: 351.482, h: 64.939, pillW: 351.1, rotate: -0.35 },
];

function TurnedLayer({ layer }: { layer: Turned }) {
  return (
    <span className={styles.turned} style={boxStyle(layer)} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/academy/${layer.src}.svg`}
        alt=""
        style={{
          width: rem(layer.innerW),
          height: rem(layer.innerH),
          rotate: `${layer.rotate}deg`,
          scale: layer.flip ? "1 -1" : undefined,
        }}
      />
    </span>
  );
}

export function AcademyChallenge() {
  return (
    <section className={styles.section}>
      <div className={styles.stage}>
        <div className={styles.copy}>
          <Reveal as="h2" className={styles.title}>
            عندما تتطور التكنولوجيا، يحتاج فريقك إلى مهارات تواكبها
          </Reveal>
          <Reveal as="p" className={styles.text} delay={120}>
            قد تمتلك المؤسسة برامج متقدمة، لكن تظل بعض المهام خارج النظام، وتتكرر
            الأخطاء، أو تعتمد المعرفة على موظف واحد، دون الاستفادة الكاملة من أدوات
            الذكاء الاصطناعي.
          </Reveal>
        </div>

        <Reveal className={styles.dashboard} delay={160}>
          <ScrollTilt className={styles.tilt}>
            <Image
              src="/images/academy/dashboard.png"
              alt="لوحة تحكم نظام إدارة التعاونيات"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </ScrollTilt>
        </Reveal>

        {CURVES.map((layer) => (
          <TurnedLayer key={layer.src} layer={layer} />
        ))}
        {SPARKS.map((layer) => (
          <TurnedLayer key={`${layer.src}-${layer.x}`} layer={layer} />
        ))}

        <ul className={styles.pills}>
          {PILLS.map((pill, index) => (
            <Reveal
              as="li"
              key={pill.label}
              className={styles.pillBox}
              delay={240 + index * 100}
              style={boxStyle(pill)}
            >
              <span
                className={styles.pill}
                style={
                  {
                    "--pill-w": rem(pill.pillW),
                    "--pill-rotate": `${pill.rotate}deg`,
                  } as CSSProperties
                }
              >
                {pill.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
