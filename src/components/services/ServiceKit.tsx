import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceAction } from "./ServiceAction";
import kit from "./ServiceKit.module.css";

/* The pieces the service pages share (Figma 4431:12464 Transformix GBS,
   4431:12992 خدمات Odoo, 4473:8787 علوم البيانات, 4473:9198 السياحة, and
   4365:10797 هندسة البرمجيات where it draws the same parts): the photo hero,
   section introductions, the service rows, the flow diagrams, the blue
   process, the questions and the closing band. */

export { kit };

export type Action = {
  label: string;
  /** Where the call leads; without one it opens the project form. */
  href?: string;
  external?: boolean;
  /** `light` — white pill with a primary rim (the default); `primary` — the
      solid blue pill; `ghost` — a white rim on a dark ground. */
  tone?: "light" | "primary" | "ghost";
};

const TONES = { light: kit.buttonLight, primary: kit.buttonPrimary, ghost: kit.buttonGhost };

export const actionClass = (tone: Action["tone"] = "light") => `${kit.button} ${TONES[tone]}`;

export function ActionButton({ action, className }: { action: Action; className?: string }) {
  return (
    <ServiceAction
      href={action.href}
      external={action.external}
      className={className ? `${actionClass(action.tone)} ${className}` : actionClass(action.tone)}
    >
      {action.label}
    </ServiceAction>
  );
}

const pad = (index: number) => String(index + 1).padStart(2, "0");

/** The 1440 × 600 hero: a photo on the far side darkening into the copy. */
export function ServiceHero({ id, image, eyebrow, kicker, title, text, actions, labels, wide }: {
  id: string;
  image: string;
  /** A Latin label over the title. */
  eyebrow?: string;
  /** An Arabic label over the title, set in Tajawal. */
  kicker?: string;
  title: string;
  text: string;
  /** In reading order, the first beside the edge. */
  actions: readonly Action[];
  /** A Latin line of keywords under the calls. */
  labels?: string;
  /** The copy runs 720px wide rather than 692. */
  wide?: boolean;
}) {
  return (
    <section className={kit.hero} aria-labelledby={id}>
      <div className={kit.heroMedia} aria-hidden="true">
        <div className={kit.heroPhoto}>
          <Image className={kit.heroImage} src={image} alt="" fill preload sizes="(max-width: 900px) 100vw, 67vw" />
        </div>
      </div>
      <div className={wide ? `${kit.heroCopy} ${kit.heroCopyWide}` : kit.heroCopy}>
        {kicker && (
          <Reveal as="p" className={kit.heroKicker}>
            {kicker}
          </Reveal>
        )}
        {eyebrow && (
          <Reveal as="p" className={kit.heroEyebrow} lang="en">
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h1" id={id} className={kit.heroTitle} delay={60}>
          {title}
        </Reveal>
        <Reveal as="p" className={kit.heroText} delay={120}>
          {text}
        </Reveal>
        <Reveal className={kit.heroActions} delay={180}>
          {actions.map((action) => (
            <ActionButton key={action.label} action={action} />
          ))}
        </Reveal>
        {labels && (
          <Reveal as="p" className={kit.heroLabels} lang="en" delay={240}>
            {labels}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** A section's heading block: an optional label, the title and its lead. */
export function SectionIntro({ id, eyebrow, kicker, title, text, center, children }: {
  id: string;
  /** A Latin label over the title. */
  eyebrow?: string;
  /** An Arabic label over the title, set in Tajawal. */
  kicker?: string;
  title: string;
  text?: ReactNode;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <Reveal className={center ? `${kit.intro} ${kit.introCenter}` : kit.intro}>
      {eyebrow && (
        <p className={kit.eyebrow} lang="en">
          {eyebrow}
        </p>
      )}
      {kicker && <p className={kit.kicker}>{kicker}</p>}
      <h2 id={id} className={kit.title}>
        {title}
      </h2>
      {text && <div className={kit.lead}>{text}</div>}
      {children}
    </Reveal>
  );
}

export type Detail = {
  title: string;
  text: string;
  /** The row's photo; without one the panel stays a pale blue block. */
  image?: string;
  /** How dark the photo's veil is, 0–1. */
  shade?: number;
  /** The panel's height on the artboard, in px. */
  height?: number;
};

/** The service rows (Figma 4431:12577): the scope beside a 330px photo
    panel, on a cream 24px-radius card. */
export function DetailList({ items }: { items: readonly Detail[] }) {
  return (
    <ul className={kit.details}>
      {items.map((item) => (
        <Reveal as="li" key={item.title} className={kit.detail}>
          <div className={kit.detailCopy}>
            <h3 className={kit.cardTitle}>{item.title}</h3>
            <p className={kit.cardText}>{item.text}</p>
          </div>
          <div
            className={item.image ? kit.detailMedia : `${kit.detailMedia} ${kit.detailBlank}`}
            style={{
              "--panel-h": `${(item.height ?? 238) / 10}rem`,
              "--shade": item.shade ?? 0,
            } as CSSProperties}
            aria-hidden="true"
          >
            {item.image && (
              <Image className={kit.detailImage} src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 330px" />
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export type FlowStep = string | {
  label: string;
  /** A Latin line under the label. */
  en: string;
};

/** The concept boxes joined by arrows (Figma "Editable flow diagram",
    4473:8842), in reading order: each after the first is led in by an
    arrow, and an optional line runs under the row. */
export function FlowDiagram({ steps, note, className }: {
  steps: readonly FlowStep[];
  note?: string;
  className?: string;
}) {
  return (
    <div className={className ? `${kit.flow} ${className}` : kit.flow}>
      <ol className={kit.flowSteps}>
        {steps.map((step, index) => {
          const label = typeof step === "string" ? step : step.label;
          /* On the English site the label is already the Latin line. */
          const en = typeof step === "string" || step.en === label ? null : step.en;
          return (
            <li key={label} className={kit.flowUnit}>
              {index > 0 && (
                <span className={`${kit.flowArrow} ${kit.arrow}`} aria-hidden="true">
                  ←
                </span>
              )}
              <span className={kit.flowConcept}>
                {label}
                {en && <span lang="en">{en}</span>}
              </span>
            </li>
          );
        })}
      </ol>
      {note && <p className={kit.flowNote}>{note}</p>}
    </div>
  );
}

/** The blue delivery steps (Figma 3503:34000), right to left. */
export function ProcessSteps({ steps, tall, roomy }: {
  steps: readonly { title: string; text: string }[];
  /** The Odoo artboard draws the steps 310px tall rather than 255. */
  tall?: boolean;
  /** Three wide steps, 360px tall on a 24px inset (Figma 4473:8860). */
  roomy?: boolean;
}) {
  const variant = tall ? kit.processTall : roomy ? kit.processRoomy : null;
  return (
    <ol className={variant ? `${kit.process} ${variant}` : kit.process}>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.title} className={kit.step} delay={index * 60}>
          <span className={kit.stepNumber} aria-hidden="true">
            {pad(index)} —
          </span>
          <h3 className={kit.stepTitle}>{step.title}</h3>
          <p className={kit.stepText}>{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** The questions, each answered in full on a white card. */
export function FaqList({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <ul className={kit.faq}>
      {items.map((item) => (
        <Reveal as="li" key={item.question} className={kit.faqItem}>
          <h3 className={kit.faqQuestion}>{item.question}</h3>
          <p className={kit.faqAnswer}>{item.answer}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/** The dark closing band: a Latin label, the call and up to two pills. */
export function Closing({ id, eyebrow, title, text, actions, className }: {
  id: string;
  eyebrow?: string;
  title: string;
  text: string;
  actions: readonly Action[];
  className?: string;
}) {
  return (
    <section className={className ? `${kit.closing} ${className}` : kit.closing} aria-labelledby={id}>
      <Reveal className={kit.closingCopy}>
        {eyebrow && (
          <p className={kit.closingEyebrow} lang="en">
            {eyebrow}
          </p>
        )}
        <h2 id={id} className={kit.closingTitle}>
          {title}
        </h2>
        <p className={kit.closingText}>{text}</p>
      </Reveal>
      <Reveal className={kit.closingActions} delay={120}>
        {actions.map((action) => (
          <ActionButton key={action.label} action={action} />
        ))}
      </Reveal>
    </section>
  );
}
