import Image from "next/image";
import Link from "next/link";
import { insightHref, type Insight } from "@/english/lib/insights";
import styles from "@/english/components/insights/InsightCard.module.css";

type Props = {
  insight: Insight;
  /** h2 on the list, h3 under a page's own headings. */
  headingLevel?: 2 | 3;
  /** The related cards keep shorter titles and summaries (Figma 4524:4312). */
  compact?: boolean;
};

/** Figma 4524:4209 — an article's card: its cover, its field in blue, the
    title and summary over a hairline, then the way in. */
export function InsightCard({ insight, headingLevel = 2, compact = false }: Props) {
  const href = insightHref(insight.slug);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const titleId = `insight-${insight.slug}${compact ? "-related" : ""}`;

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`} aria-labelledby={titleId}>
      <Link href={href} className={styles.cover} tabIndex={-1} aria-hidden="true">
        <Image
          className={styles.image}
          src={insight.cover}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 37rem"
        />
      </Link>
      <p className={styles.category}>{insight.category}</p>
      <div className={styles.body}>
        <Heading id={titleId} className={styles.title}>
          <Link href={href}>{insight.title}</Link>
        </Heading>
        <p className={styles.summary}>{insight.summary}</p>
        <hr className={styles.rule} />
        <Link href={href} className={styles.more} aria-describedby={titleId}>
          {" Read the article "}<Image className={styles.arrow} src="/icons/insights/arrow-read.svg" alt="" width={24} height={24} />
        </Link>
      </div>
    </article>
  );
}
