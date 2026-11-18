import Image from "next/image";
import type { ReactNode } from "react";
import { AcademyAction } from "@/components/academies/AcademyAction";
import { ServiceRequestForm } from "@/components/services/ServiceRequestForm";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./SocialMedia.module.css";

/* إدارة منصات التواصل الاجتماعي (Figma 4977:8988): the parts this page draws
   that the hub's kit does not — the overview, the platform and sector cards,
   the "connected services" list, the engagement models and the closing request. */

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export { styles as social };

/** A section on the artboard's 1240px column; `compact` is the 100px rhythm the
    overview and the capabilities use (the others keep 120px). */
export function SocialSection({ id, labelledBy, compact, band, children }: {
  id?: string;
  labelledBy: string;
  compact?: boolean;
  /** `subtle` is the grey band, `card` the cream one. */
  band?: "subtle" | "card";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx(styles.section, compact && styles.compact, band === "subtle" && styles.subtle, band === "card" && styles.cream)}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

/** Figma "Overview — نظرة عامة" 4977:8990: the photo (580 × 294, the brand
    tint rising from its foot) beside the heading and two paragraphs. */
export function Overview({ id, title, lead, body, image, alt }: {
  id: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  alt: string;
}) {
  return (
    <Reveal className={styles.overview}>
      <div className={styles.overviewCopy}>
        <h2 id={id} className={styles.overviewTitle}>
          {title}
        </h2>
        <div className={styles.overviewText}>
          <p className={styles.overviewLead}>{lead}</p>
          <p className={styles.overviewBody}>{body}</p>
        </div>
      </div>
      <div className={styles.overviewMedia}>
        <Image className={styles.coverImage} src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 580px" />
        <span className={styles.overviewTint} aria-hidden />
      </div>
    </Reveal>
  );
}

export type Info = { icon: string; title: string; text: string };

/** The cards of the platforms (Figma 4977:9002, four and three centred) and of
    the sectors (4977:9020, three by two): a 52px tile, the name and a line. */
export function InfoCards({ items, columns }: { items: readonly Info[]; columns: 3 | 4 }) {
  return (
    <ul className={cx(styles.cards, columns === 3 ? styles.cardsThree : styles.cardsFour)}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} className={styles.card} delay={(index % columns) * 80}>
          <span className={styles.tile} aria-hidden>
            <Image src={item.icon} alt="" width={26} height={26} />
          </span>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardText}>{item.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export type Linked = { icon: string; title: string; text: string };

/** Figma "Connected — خدمات إبداعية وتسويقية متكاملة" 4977:9089: the services
    that join the account management, in a ruled list beside a 540 × 560 photo. */
export function Connected({ id, title, lead, items, image, alt, action }: {
  id: string;
  title: string;
  lead: string;
  items: readonly Linked[];
  image: string;
  alt: string;
  action: { label: string; href: string };
}) {
  return (
    <Reveal className={styles.connected}>
      <div className={styles.connectedCopy}>
        <h2 id={id} className={styles.connectedTitle}>
          {title}
        </h2>
        <p className={styles.connectedLead}>{lead}</p>
        <ul className={styles.linked}>
          {items.map((item) => (
            <li key={item.title} className={styles.linkedItem}>
              <span className={styles.linkedIcon} aria-hidden>
                <Image src={item.icon} alt="" width={20} height={20} />
              </span>
              <div className={styles.linkedText}>
                <h3 className={styles.linkedTitle}>{item.title}</h3>
                <p className={styles.linkedNote}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.connectedAction}>
          <AcademyAction action={{ label: action.label, href: action.href }} />
        </div>
      </div>
      <div className={styles.connectedMedia}>
        <Image className={styles.coverImage} src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 540px" />
      </div>
    </Reveal>
  );
}

export type Model = { number: string; icon: string; title: string; text: string; image: string; alt: string };

/** Figma "Engagement grid 2x2" 4977:9099: each model is a white card with its
    photo, an outlined number and a round icon, the name and a note. The
    artboard clips the note at 250px; the cards here grow to show all of it. */
export function Engagement({ items }: { items: readonly Model[] }) {
  return (
    <ul className={styles.models}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.number} className={styles.model} delay={(index % 2) * 80}>
          <div className={styles.modelText}>
            <div className={styles.modelHead}>
              <span className={styles.modelIcon} aria-hidden>
                <Image src={item.icon} alt="" width={24} height={24} />
              </span>
              <span className={styles.modelNumber} aria-hidden>
                {item.number}
              </span>
            </div>
            <h3 className={styles.modelTitle}>{item.title}</h3>
            <p className={styles.modelNote}>{item.text}</p>
          </div>
          <div className={styles.modelMedia}>
            <Image className={styles.coverImage} src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 220px" />
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Figma "Closing — طوّر حضور علامتك التجارية" 4984:9792: the cream card with
    the project form (the creative request, `ServiceRequestForm`) beside the
    call and its note. */
export function RequestClosing({ id, title, paragraphs, actionLabel, actionTone, formId = "social-request", formTitle = "ناقش إدارة حساباتك" }: {
  id: string;
  title: string;
  paragraphs: readonly string[];
  actionLabel: string;
  /** The call's look; the filled button where left out. */
  actionTone?: "outline";
  /** The form's id and its (visually hidden) heading. */
  formId?: string;
  formTitle?: string;
}) {
  return (
    <Reveal className={styles.closing}>
      <div className={styles.closingCopy}>
        <h2 id={id} className={styles.closingTitle}>
          {title}
        </h2>
        <div className={styles.closingText}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.closingActions}>
          <AcademyAction action={{ label: actionLabel, tone: actionTone }} />
        </div>
      </div>
      <div className={styles.closingForm}>
        <ServiceRequestForm id={formId} title={formTitle} form="creative" path="business" />
      </div>
    </Reveal>
  );
}
