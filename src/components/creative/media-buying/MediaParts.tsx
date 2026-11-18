import Image from "next/image";
import { IconTile, type Icon } from "@/components/academies/AcademiesKit";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./MediaBuying.module.css";

export type Platform = { icon: string; title: string; text: string };

/** The platforms (Figma 4989:9381): the list, one platform to a row with its
    round icon, beside a tall photo. In reading order the list comes first, so
    on the RTL page it sits on the right and the photo on the left. */
export function PlatformsLayout({ platforms, image, alt }: {
  platforms: readonly Platform[];
  image: string;
  alt: string;
}) {
  return (
    <div className={styles.platforms}>
      <ul className={styles.platformList}>
        {platforms.map((platform, index) => (
          <Reveal as="li" key={platform.title} className={styles.platform} delay={(index % 4) * 60}>
            <span className={styles.platformIcon} aria-hidden>
              <Image src={platform.icon} alt="" width={22} height={22} />
            </span>
            <div className={styles.platformCopy}>
              <h3 className={styles.platformTitle}>{platform.title}</h3>
              <p className={styles.platformText}>{platform.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal className={styles.platformPhoto} delay={80}>
        <Image className={styles.platformImage} src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 480px" />
      </Reveal>
    </div>
  );
}

export type Goal = { icon: Icon; title: string; text: string };

/** "حملات تناسب ما تريد تحقيقه" (Figma 4973:9160): five cards, three over two,
    the second row centred. */
export function GoalCards({ goals }: { goals: readonly Goal[] }) {
  return (
    <ul className={styles.goals}>
      {goals.map((goal, index) => (
        <Reveal as="li" key={goal.title} className={styles.goal} delay={(index % 3) * 80}>
          <IconTile icon={goal.icon} />
          <h3 className={styles.goalTitle}>{goal.title}</h3>
          <p className={styles.goalText}>{goal.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export type Engagement = { icon: string; title: string; text: string; image: string; alt: string };

/** "طرق التعاون" (Figma 4973:8718): a 2 × 2 grid of cards, each a photo, a
    faint outlined number, the round icon, the way of working and a line on it. */
export function EngagementGrid({ items }: { items: readonly Engagement[] }) {
  return (
    <ol className={styles.engagements}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.engagement} delay={(index % 2) * 80}>
          <div className={styles.engagementBody}>
            <div className={styles.engagementHead}>
              <span className={styles.engagementIcon} aria-hidden>
                <Image src={item.icon} alt="" width={24} height={24} />
              </span>
              <span className={styles.engagementNumber} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className={styles.engagementTitle}>{item.title}</h3>
            <p className={styles.engagementText}>{item.text}</p>
          </div>
          <div className={styles.engagementPhoto}>
            <Image className={styles.engagementImage} src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 220px" />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
