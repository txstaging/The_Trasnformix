import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { academies, Split, type Photo } from "@/english/components/academies/AcademiesKit";
import { AcademyAction, type Action } from "@/english/components/academies/AcademyAction";
import sector from "@/english/components/sectors/SectorPage.module.css";

/* The V2 sector pages (Figma 4781:5929 القطاع الرياضي): the page banner and
   the photo-and-story sections, built on the academies parts. */

export { sector };

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** The main element's classes: the shared V2 variables plus the sector's own. */
export const sectorPage = cx(academies.page, sector.page);

/** Figma V2/Page Banner (4642:1171): the photo, a brand-blue shade that
    sweeps in towards the copy, then the title word by word, its line and
    the calls. Other V2 pages tune it through a class that sets its
    variables (--banner-pad, --banner-title-*, --banner-text-*). */
export function SectorBanner({ id, image, focus, title, text, actions, className }: {
  id: string;
  image: string;
  /** The photo's object-position, when its subject is not at the centre. */
  focus?: string;
  title: string;
  /** A line of copy, or paragraphs of it. */
  text: ReactNode;
  /** In reading order. */
  actions: readonly Action[];
  className?: string;
}) {
  const words = title.split(" ");
  const rise = (ms: number) => ({ "--rise": `${ms}ms` }) as CSSProperties;
  const textClass = cx(sector.bannerText, academies.heroRise);
  return (
    <section className={cx(sector.banner, className)} aria-labelledby={id}>
      <div className={sector.bannerMedia} aria-hidden>
        <Image
          className={sector.bannerImage}
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          style={focus ? { objectPosition: focus } : undefined}
        />
        <span className={sector.bannerShade} />
      </div>
      <div className={sector.bannerCopy}>
        <h1 id={id} className={sector.bannerTitle}>
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className={academies.heroWord} style={{ "--word": index } as CSSProperties}>
                {word}
              </span>
              {index < words.length - 1 && " "}
            </span>
          ))}
        </h1>
        {typeof text === "string" ? (
          <p className={textClass} style={rise(800)}>
            {text}
          </p>
        ) : (
          <div className={textClass} style={rise(800)}>
            {text}
          </div>
        )}
        <div className={cx(sector.bannerActions, academies.heroRise)} style={rise(1100)}>
          {actions.map((action) => (
            <AcademyAction key={action.label} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}

export type Story = {
  id: string;
  title: string;
  /** The blue line under the title. */
  subtitle?: string;
  /** The first reads in the darker ink, the rest in the secondary grey. */
  paragraphs: readonly string[];
  action?: Action;
  photo: Photo;
  /** Puts the photo on the far (left) side. */
  far?: boolean;
  /** The cream band. */
  tinted?: boolean;
};

/** A section that tells one part of the sector's story beside a photo;
    anything passed as children follows the pair (e.g. a diagram). */
export function SectorStory({ story, children }: { story: Story; children?: ReactNode }) {
  const heading = `${story.id}-heading`;
  return (
    <section
      id={story.id}
      className={cx(academies.section, story.tinted && sector.tinted)}
      aria-labelledby={heading}
    >
      <Split photo={story.photo} far={story.far}>
        <h2 id={heading} className={academies.title}>
          {story.title}
        </h2>
        {story.subtitle && <p className={sector.subtitle}>{story.subtitle}</p>}
        {story.paragraphs.map((paragraph, index) => (
          <p key={paragraph} className={index === 0 ? academies.leadDark : academies.lead}>
            {paragraph}
          </p>
        ))}
        {story.action && (
          <div className={sector.storyAction}>
            <AcademyAction action={{ tone: "link", ...story.action }} />
          </div>
        )}
      </Split>
      {children}
    </section>
  );
}
