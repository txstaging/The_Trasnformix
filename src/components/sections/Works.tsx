import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Works.module.css";

type WorkCard = {
  name: string;
  src: string;
  href: string;
  /** Crop of the still inside the 604 x 391 frame, in artboard px. */
  crop: { left: number; top: number; width: number; height: number };
};

type WorkRow = {
  category: string;
  /** Distance from the top of the section on the artboard. */
  top: number;
  cards: WorkCard[];
};

/* Cards are listed right-to-left, matching how they read on the artboard. */
const ROWS: WorkRow[] = [
  {
    category: "الهوية البصرية",
    top: 222,
    cards: [
      {
        name: "د. ريم بخيت",
        src: "/images/work-reem.png",
        href: "/works",
        crop: { left: 0, top: 0, width: 604, height: 494 },
      },
      {
        name: "KUN | كُـنْ",
        src: "/images/work-kun.png",
        href: "/works",
        crop: { left: 1, top: -102, width: 602, height: 493 },
      },
    ],
  },
  {
    category: "التسويق الرقمي",
    top: 744,
    cards: [
      {
        name: "أكاديمية الإلهام الاجتماعي",
        src: "/images/work-ilham.png",
        href: "/works",
        crop: { left: -27, top: 0, width: 631, height: 631 },
      },
      {
        name: "ميرماتس | Mermates",
        src: "/images/work-mermates-marketing.png",
        href: "/works",
        crop: { left: 0, top: -65, width: 604, height: 495 },
      },
    ],
  },
  {
    category: "تطوير المواقع",
    top: 1244,
    cards: [
      {
        name: "رزانا البخاري",
        src: "/images/work-razana.png",
        href: "/works",
        crop: { left: -21, top: -26, width: 625, height: 469 },
      },
      {
        name: "ميرماتس | Mermates",
        src: "/images/work-mermates-web.png",
        href: "/works",
        crop: { left: 0, top: 2, width: 604, height: 494 },
      },
    ],
  },
];

const rem = (px: number) => `${px / 10}rem`;

export function Works() {
  return (
    <section id="works" className={styles.section}>
      <div className={styles.stage}>
        <Reveal as="h2" className={styles.title}>
          أعمال تحكي كيف نفكر
        </Reveal>

        {ROWS.map((row) => (
          <div
            key={row.category}
            className={styles.row}
            style={{ top: rem(row.top) }}
          >
            <div className={styles.rowHead}>
              <h3 className={styles.rowTitle}>{row.category}</h3>
              <ArrowLink href="https://www.behance.net/Futureexperts" size="lg" icon="/icons/arrow-more.svg">
                عرض المزيد
              </ArrowLink>
            </div>

            <div className={styles.cards}>
              {row.cards.map((card, index) => (
                <Reveal
                  key={`${row.category}-${card.name}`}
                  as="a"
                  href={card.href}
                  className={styles.card}
                  delay={index * 140}
                >
                  <Image
                    className={styles.cardImage}
                    src={card.src}
                    alt={card.name}
                    width={card.crop.width}
                    height={card.crop.height}
                    style={{
                      left: rem(card.crop.left),
                      top: rem(card.crop.top),
                      width: rem(card.crop.width),
                      height: rem(card.crop.height),
                    }}
                  />

                  <span className={styles.caption}>
                    <span className={styles.captionRow}>
                      <span dir="auto" className={styles.captionText}>
                        {card.name}
                      </span>
                      <Image
                        className={styles.captionIcon}
                        src="/icons/lucide-external-link.svg"
                        alt=""
                        width={29}
                        height={29}
                        aria-hidden
                      />
                    </span>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
