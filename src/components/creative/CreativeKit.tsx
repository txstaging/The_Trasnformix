import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { academies, IconTile, type Icon } from "@/components/academies/AcademiesKit";
import { Reveal } from "@/components/ui/Reveal";
import creative from "./Creative.module.css";

/* الإبداع والتسويق الرقمي — the hub and its service pages (Figma "Website
   Redesign V2": the hub 4854:7820, تحسين الظهور 4852:7590, تصميم التجربة
   4843:6923, الحملات الإعلانية 4973:8579, إدارة المنصات 4977:8988).

   They are V2 pages, so they take the academies parts (the banner, FAQ,
   split sections and closing card, via components/sectors and
   components/academies) and add what only this section draws: the local nav,
   the sticky scroll reveal, the numbered step cards and the work grid. */

export { creative };
export { CreativeNav } from "./CreativeNav";
export { StickyScrollReveal, type StickyItem } from "./StickyScrollReveal";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** The main element's classes: the shared V2 variables with the sector pages'
    own (Noto Kufi headings, a brand-blue closing title). */
export { sectorPage as creativePage, SectorBanner, SectorStory, type Story } from "@/components/sectors/SectorKit";

/** A section's centred heading (Figma "Section intro"). The title is the
    ink colour, or the brand blue where the artboard draws it so. */
export function CreativeIntro({ id, title, text, blue, dark, narrow }: {
  id: string;
  title: string;
  text?: ReactNode;
  blue?: boolean;
  /** The deep brand blue (#11295c) some artboards give a title. */
  dark?: boolean;
  /** Holds the lead to the artboard's 1083px. */
  narrow?: boolean;
}) {
  return (
    <Reveal className={academies.intro}>
      <h2 id={id} className={cx(academies.title, blue && creative.titleBlue, dark && creative.titleDark)}>
        {title}
      </h2>
      {text && <p className={cx(academies.lead, narrow && academies.leadNarrow)}>{text}</p>}
    </Reveal>
  );
}

export type Step = { icon: Icon; title: string; text: string };

/** The numbered step cards (Figma "Process cards" 4891:8124): the icon tile
    and a faint number, the step and its note, and a four-part bar that fills
    one part further on each card. Three to five steps, side by side on
    desktop, two across on tablets and one on phones; the bar has a part for
    each step where there are five, four otherwise. */
export function ProcessCards({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className={cx(creative.steps, steps.length === 3 && creative.stepsThree, steps.length === 5 && creative.stepsFive)}>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} className={creative.step} delay={(index % 4) * 80}>
          <div className={creative.stepTop}>
            <span className={creative.stepNumber} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <IconTile icon={step.icon} />
          </div>
          <h3 className={creative.stepTitle}>{step.title}</h3>
          <p className={creative.stepText}>{step.text}</p>
          <span className={creative.stepBar} aria-hidden>
            {Array.from({ length: steps.length === 5 ? 5 : 4 }, (_, part) => (
              <span key={part} className={cx(creative.stepPart, part <= index && creative.stepPartOn)} />
            ))}
          </span>
        </Reveal>
      ))}
    </ol>
  );
}

export type Work = {
  title: string;
  /** Where the work leads. */
  href: string;
  /** The cover; a work without one shows a brand-blue block. */
  image?: string;
  alt: string;
  /** The cover's height on the desktop artboard, in px. */
  height: number;
  /** Marks a film, which the block shows with a play mark. */
  video?: boolean;
};

/** The work grid (Figma "Portfolio" 4854:7966): two columns of covers, each
    over its title and a round arrow. In reading order, row by row; the
    columns are 585 and 557px wide on the artboard, a 98px gap between. */
export function WorkGrid({ items }: { items: readonly Work[] }) {
  return (
    <ul className={creative.works}>
      {items.map((work, index) => (
        <Reveal as="li" key={work.title} className={creative.work} delay={(index % 2) * 80}>
          <a href={work.href} className={creative.workLink}>
            <span
              className={cx(creative.workCover, !work.image && creative.workBlank)}
              style={{ "--cover-h": `${work.height / 10}rem` } as CSSProperties}
            >
              {work.image && (
                <Image
                  className={creative.workImage}
                  src={work.image}
                  alt={work.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 585px"
                />
              )}
              {work.video && <span className={creative.workPlay} aria-hidden />}
            </span>
            <span className={creative.workCaption}>
              <span className={creative.workTitle} dir="auto">
                {work.title}
              </span>
              <Image className={creative.workArrow} src="/icons/creative/work-arrow.svg" alt="" width={46} height={46} aria-hidden />
            </span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
