import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Intro.module.css";

type Stat = {
  icon: string;
  /* Vector counters exported from Figma. The artboard wraps each one in a
     negatively-inset box so the stroke bleed sits outside the glyph's nominal
     frame, so these are the *rendered* boxes and match each SVG's own size. */
  number: { src: string; left: number; top: number; width: number; height: number };
  plus: { src: string; left: number; top: number; width: number; height: number };
  title: string;
  text: string;
};

/* Right-to-left order: the 51+ card sits furthest right on the artboard. */
const STATS: Stat[] = [
  {
    icon: "/icons/stat-icon-1.svg",
    number: { src: "/icons/num-51.svg", left: 161, top: 0.55, width: 141, height: 106.445 },
    plus: { src: "/icons/plus.svg", left: 324, top: 35, width: 47, height: 46 },
    title: "مشروع وحل رقمي",
    text: "نفذنا حلولًا رقمية لعلامات وشركات في قطاعات واحتياجات مختلفة.",
  },
  {
    icon: "/icons/stat-icon-2.svg",
    number: { src: "/icons/num-20.svg", left: 158, top: 1, width: 153, height: 111 },
    plus: { src: "/icons/plus.svg", left: 324, top: 35, width: 47, height: 46 },
    title: "حلول AI وAutomation",
    text: "حل بالذكاء الاصطناعي و Automation تم تطويرها لخدمة تحديات حقيقية في الأعمال.",
  },
  {
    icon: "/icons/stat-icon-3.svg",
    number: { src: "/icons/num-10.svg", left: 171.67, top: 0.55, width: 137, height: 106.445 },
    plus: { src: "/icons/plus-2.svg", left: 324.67, top: 35, width: 48, height: 46 },
    title: "سنوات من الخبرة",
    text: "خبرة تجمع بين التقنية، التصميم، التسويق وتطوير الأعمال.",
  },
];

/** Converts an artboard pixel measurement to the project's rem scale. */
const rem = (px: number) => `${px / 10}rem`;

export function Intro() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal as="h2" className={styles.heading}>
            نصنع تجارب رقمية أذكى تدفع الأعمال نحو المستقبل
          </Reveal>

          <Reveal className={styles.lead} delay={120}>
            <p className={styles.leadText}>
              في Transformix نجمع بين التقنية، التصميم، البيانات والذكاء
              الاصطناعي لبناء حلول رقمية متكاملة تساعد الشركات على النمو والعمل
              بكفاءة أكبر. من تطوير التجارب الرقمية إلى أتمتة العمليات وتحويل
              البيانات إلى قرارات، نصمم كل حل حول احتياج حقيقي وهدف واضح.
            </p>
            <div className={styles.leadLink}>
              <ArrowLink href="/about">اعرف أكثر عن Transformix</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className={styles.cards}>
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.title}
              className={styles.card}
              delay={index * 130}
            >
              <Image
                className={styles.cardIcon}
                src={stat.icon}
                alt=""
                width={54}
                height={54}
                aria-hidden
              />

              <div className={styles.cardBody}>
                <div className={styles.figure}>
                  <Image
                    className={styles.figureNumber}
                    style={{
                      left: rem(stat.number.left),
                      top: rem(stat.number.top),
                      width: rem(stat.number.width),
                      height: rem(stat.number.height),
                    }}
                    src={stat.number.src}
                    alt=""
                    width={stat.number.width}
                    height={stat.number.height}
                    aria-hidden
                  />
                  <Image
                    className={styles.figurePlus}
                    style={{
                      left: rem(stat.plus.left),
                      top: rem(stat.plus.top),
                      width: rem(stat.plus.width),
                      height: rem(stat.plus.height),
                    }}
                    src={stat.plus.src}
                    alt=""
                    width={stat.plus.width}
                    height={stat.plus.height}
                    aria-hidden
                  />
                </div>

                <p dir="auto" className={styles.cardTitle}>
                  {stat.title}
                </p>

                <div className={styles.cardTextWrap}>
                  <p dir="auto" className={styles.cardText}>
                    {stat.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
