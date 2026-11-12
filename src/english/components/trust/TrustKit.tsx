import type { ReactNode } from "react";
import { academies } from "@/english/components/academies/AcademiesKit";
import type { Action } from "@/english/components/academies/AcademyAction";
import { SectorBanner } from "@/english/components/sectors/SectorKit";
import { TRUST_NAV, trustHref, type TrustSlug } from "@/english/lib/trustNav";
import trust from "@/english/components/trust/Trust.module.css";

/* The trust and governance pages (lib/trustNav.ts): the V2 page banner, then
   numbered parts, each a title beside its clauses and paragraphs. */

export { trust };

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** The main element's classes: the shared V2 variables plus the trust pages' own. */
export const trustPage = cx(academies.page, trust.page);

export type Clause = {
  title: string;
  paragraphs: readonly string[];
};

export type Part = {
  id: string;
  title: string;
  /** Paragraphs ahead of the clauses; the first reads in the darker ink. */
  intro?: readonly string[];
  clauses?: readonly Clause[];
  /** The cream band. */
  tinted?: boolean;
};

/** The page banner, titled with the page's name; its calls open the other
    two pages, the first as the white button. */
export function TrustBanner({ page, image, focus, compact, text }: {
  page: TrustSlug;
  image: string;
  focus?: string;
  /** The 18/34 copy of أخلاقياتنا rather than the 20/38 of the others. */
  compact?: boolean;
  text: ReactNode;
}) {
  const title = TRUST_NAV.find((entry) => entry.slug === page)!.label;
  const actions: Action[] = TRUST_NAV.filter((entry) => entry.slug !== page).map((entry, index) => ({
    label: entry.label,
    href: trustHref(entry.slug),
    tone: index === 0 ? "inverse" : "outlineInverse",
  }));
  return (
    <SectorBanner
      id={`${page}-banner-heading`}
      className={cx(trust.banner, compact && trust.bannerCompact)}
      image={image}
      focus={focus}
      title={title}
      text={text}
      actions={actions}
    />
  );
}

/** A numbered part: "01" and its title, then the intro and the clauses
    (1.1, 1.2 …). On desktop the title stays in view beside a long part. */
export function TrustPart({ part, index }: { part: Part; index: number }) {
  const number = index + 1;
  const heading = `${part.id}-heading`;
  return (
    <section id={part.id} className={cx(trust.part, part.tinted && trust.tinted)} aria-labelledby={heading}>
      <div className={trust.split}>
        <header className={trust.header}>
          <span className={trust.number} aria-hidden>
            {String(number).padStart(2, "0")}
          </span>
          <h2 id={heading} className={trust.title}>
            {part.title}
          </h2>
        </header>
        <div className={trust.body}>
          {part.intro && (
            <div className={trust.intro}>
              {part.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          {part.clauses && (
            <ol className={trust.clauses}>
              {part.clauses.map((clause, clauseIndex) => (
                <li key={clause.title} className={trust.clause}>
                  <h3 className={trust.clauseHeading}>
                    <span className={trust.clauseNumber}>
                      {number}.{clauseIndex + 1}
                    </span>
                    <span>{clause.title}</span>
                  </h3>
                  {clause.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

export function TrustParts({ parts }: { parts: readonly Part[] }) {
  return parts.map((part, index) => <TrustPart key={part.id} part={part} index={index} />);
}

/** Copy that the stacked banner of tablets and phones leaves out and the page
    opens with instead (Figma 4798:7821): the first paragraph in bold. */
export function TrustLede({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className={trust.lede}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
