import { CardGrid, type Feature, type FeatureCardTone } from "@/components/v2/ui/FeatureCard";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./CardSection.module.css";

type CardSectionProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  items: Feature[];
  tone?: FeatureCardTone;
  /** The small print under the cards (Figma 3693:65366). */
  footnote?: string;
  id?: string;
};

/** Figma "Offerings" with its introduction — the intro, then a row of cards
    32px below. Most v2 sections are one of these. */
export function CardSection({ eyebrow, title, lead, items, tone, footnote, id }: CardSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <SectionIntro eyebrow={eyebrow} title={title} lead={lead} />
      <CardGrid items={items} tone={tone} />
      {footnote && <p className={styles.footnote}>{footnote}</p>}
    </section>
  );
}

/** The small print every service page sets under its outcome cards. */
export const OUTCOMES_FOOTNOTE =
  "تُراجع النتائج المستهدفة ومؤشرات متابعتها عند تحديد النطاق؛ ولا تمثل ضمانًا لنتائج تجارية محددة.";
