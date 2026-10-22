import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SOCIAL_LINKS } from "@/lib/socialLinks";
import { WorksCarousel, type WorkCarouselProject } from "./works/WorksCarousel";
import styles from "./Works.module.css";

type WorkRow = {
  category: string;
  cards: Omit<WorkCarouselProject, "category">[];
};

/* Keep the original projects and their artwork crops in category order. */
const ROWS: WorkRow[] = [
  {
    category: "الهوية البصرية",
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
    cards: [
      {
        name: " My Horizon",
        src: "/images/0f005d05928a27d068e368df65b07a5b029fb3eb.jpg",
        href: "/works",
        crop: { left: -27, top: 0, width: 631, height: 631 },
      },
      {
        name: " Chi Academy",
        src: "/images/9f3ec8504138b3df6b6a0816efeda8a71a136318.jpg",
        href: "/works",
        crop: { left: 0, top: -65, width: 604, height: 495 },
      },
    ],
  },
  {
    category: "تطوير المواقع",
    cards: [
      {
        name: "Diomedea",
        src: "/images/32d6b6238ff2978730e869b3ca67b2b8bb4432c1.jpg",
        href: "/works",
        crop: { left: -21, top: -26, width: 625, height: 469 },
      },
      {
        name: "Guide | دليل",
        src: "/images/2837df4cb22aca59a822c310b1a9181cde40ea1f.png",
        href: "/works",
        crop: { left: 0, top: 2, width: 604, height: 494 },
      },
    ],
  },
];

const PROJECTS = ROWS.flatMap(({ category, cards }) =>
  cards.map((card) => ({ ...card, category })),
);

export function Works() {
  return (
    <section
      id="works"
      className={styles.section}
      aria-labelledby="works-title"
    >
      <div className={styles.stage}>
        <Reveal as="h2" id="works-title" className={styles.title}>
          أعمال تحكي كيف نفكر
        </Reveal>

        <WorksCarousel projects={PROJECTS} />

        <ArrowLink
          href={SOCIAL_LINKS.behance}
          size="lg"
          icon="/icons/arrow-more.svg"
          className={styles.more}
        >
          عرض المزيد
        </ArrowLink>
      </div>
    </section>
  );
}
