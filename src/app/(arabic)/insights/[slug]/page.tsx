import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/insights/InsightCard";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import {
  getInsight,
  INSIGHTS,
  INSIGHTS_HREF,
  INSIGHTS_LABEL,
  relatedInsights,
  type InsightSection,
} from "@/lib/insights";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

/* Only the articles in lib/insights.ts exist; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  return insight ? { title: `${insight.title} | Transformix`, description: insight.lead } : {};
}

/** Figma 4524:4592 — a chain of steps in a pale box, an arrow between each. */
function Example({ example }: { example: NonNullable<InsightSection["example"]> }) {
  return (
    <figure className={styles.example}>
      <p className={styles.exampleTitle}>{example.title}</p>
      <ol className={styles.steps}>
        {example.steps.map((step, index) => (
          <li key={step} className={styles.step}>
            <span className={styles.stepBox}>{step}</span>
            {index < example.steps.length - 1 && (
              <Image className={styles.stepArrow} src="/icons/insights/arrow-step.svg" alt="" width={16} height={16} />
            )}
          </li>
        ))}
      </ol>
      <figcaption className={styles.exampleCaption}>{example.caption}</figcaption>
    </figure>
  );
}

function Section({ section }: { section: InsightSection }) {
  const headingId = `${section.id}-heading`;
  return (
    <section id={section.id} className={styles.section} aria-labelledby={headingId}>
      {section.number && (
        <p className={styles.kicker}>
          {section.number} / {section.kicker}
        </p>
      )}
      <h2 id={headingId} className={styles.sectionTitle}>
        {section.title}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
      {section.levels && (
        <ol className={styles.levels}>
          {section.levels.map((level) => (
            <li key={level.title} className={styles.level}>
              <h3 className={styles.levelTitle}>{level.title}</h3>
              <p className={styles.paragraph}>{level.text}</p>
            </li>
          ))}
        </ol>
      )}
      {section.example && <Example example={section.example} />}
    </section>
  );
}

/** Figma 4524:4242 (and 4524:4378, 4524:4515) — one article: the trail, its
    topics, title, lead and cover; the contents beside the text; then the
    other articles. */
export default async function InsightPage({ params }: Props) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();

  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable}`}>
        <section className={styles.header} aria-labelledby="insight-heading">
          <nav className={styles.crumbs} aria-label="مسار التنقل">
            <ol>
              <li>
                <Link href="/">الرئيسية</Link>
              </li>
              <li>الموارد</li>
              <li>
                <Link href={INSIGHTS_HREF}>{INSIGHTS_LABEL}</Link>
              </li>
            </ol>
          </nav>
          <p className={styles.topics}>
            {insight.topics.map((topic, index) => (
              <span key={topic}>
                {index > 0 && <span aria-hidden="true"> / </span>}
                {topic}
              </span>
            ))}
          </p>
          <Reveal as="h1" id="insight-heading" className={styles.title}>
            {insight.title}
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={60}>
            {insight.lead}
          </Reveal>
          {insight.author && <p className={styles.author}>{insight.author}</p>}
          <Reveal className={styles.cover} delay={120}>
            <Image
              className={styles.coverImage}
              src={insight.cover}
              alt=""
              fill
              preload
              sizes="(max-width: 1200px) 100vw, 112rem"
            />
          </Reveal>
        </section>

        <div className={styles.reading}>
          <nav className={styles.toc} aria-labelledby="insight-toc-heading">
            <p id="insight-toc-heading" className={styles.tocTitle}>
              في هذا المقال
            </p>
            <ol className={styles.tocList}>
              {insight.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={styles.tocLink}>
                    {section.number && <span className={styles.tocNumber}>{section.number}</span>}
                    {section.toc ?? section.title}
                  </a>
                </li>
              ))}
            </ol>
            <hr className={styles.rule} />
            <Link href={INSIGHTS_HREF} className={styles.tocBack}>
              {INSIGHTS_LABEL}
            </Link>
          </nav>

          <article className={styles.article} aria-labelledby="insight-heading">
            {insight.intro && (
              <div className={styles.intro}>
                {insight.intro.map((paragraph) => (
                  <p key={paragraph} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {insight.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}

            {insight.takeaway && <p className={styles.takeaway}>{insight.takeaway}</p>}

            <aside className={styles.next} aria-labelledby="insight-next-heading">
              <h2 id="insight-next-heading" className={styles.nextTitle}>
                {insight.next.title}
              </h2>
              {insight.next.actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`${styles.button} ${action.secondary ? styles.buttonSecondary : ""}`}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                >
                  {action.label}
                </Link>
              ))}
            </aside>
          </article>
        </div>

        <section className={styles.related} aria-labelledby="related-heading">
          <h2 id="related-heading" className={styles.relatedTitle}>
            مقالات ذات صلة
          </h2>
          <ul className={styles.relatedGrid}>
            {relatedInsights(insight.slug).map((related, index) => (
              <Reveal as="li" key={related.slug} className={styles.relatedItem} delay={index * 80}>
                <InsightCard insight={related} headingLevel={3} compact />
              </Reveal>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
