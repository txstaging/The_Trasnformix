import Image from "next/image";
import type { ReactNode } from "react";
import { AcademyAction, type Action } from "@/components/academies/AcademyAction";
import { sectorPage } from "@/components/sectors/SectorKit";
import { academies } from "@/components/academies/AcademiesKit";
import { Reveal } from "@/components/ui/Reveal";
import labs from "./Labs.module.css";

/* مختبراتنا — the labs page (Figma "Website Redesign V2", مختبراتنا — Our
   Labs, Desktop 1440, 5019:9353). It is a V2 page: the banner, buttons,
   sticky scroll reveal and split rows come from the sector and academies
   parts; this file holds what only this page draws — the labs ecosystem
   (the flexibility card and the team card with its four lab tiles), the lab
   headers and the ecosystem band.

   Every list is in reading order: on the RTL page the first item sits on the
   right, as the artboard draws it. */

export { labs };

/** The main element's classes: the V2 sector page plus this page's tokens. */
export const labsPage = `${sectorPage} ${labs.page}`;

const ICON = "/icons/labs/";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export type LabTile = { number: string; title: string; icon: string; href: string };

export type Ecosystem = {
  flexibility: {
    title: string;
    items: readonly { icon: string; text: string }[];
    note: string;
    values: readonly string[];
  };
  team: {
    label: string;
    count: string;
    text: string;
  };
  tiles: readonly LabTile[];
};

/** The labs ecosystem (Figma "Labs ecosystem" 5049:10184): the team card on
    the reading side — how many labs there are, how they work together and a
    tile for each, linking down to its section — beside the brand-blue card
    on the flexibility the model gives. */
export function LabsEcosystem({ ecosystem, label }: { ecosystem: Ecosystem; label: string }) {
  const { flexibility, team, tiles } = ecosystem;
  return (
    <div className={labs.bento}>
      <Reveal className={labs.team}>
        <p className={labs.stat}>
          <span className={labs.statLabel}>{team.label}</span>
          <span className={labs.statNumber}>{team.count}</span>
        </p>
        <p className={labs.teamText}>{team.text}</p>
        <ul className={labs.tiles} aria-label={label}>
          {tiles.map((tile) => (
            <li key={tile.href} className={labs.tile}>
              <a href={tile.href} className={labs.tileLink} aria-label={`${tile.number} ${tile.title}`}>
                <span className={labs.tileIcon} aria-hidden>
                  <Image src={tile.icon} alt="" width={22} height={22} />
                </span>
                <span className={labs.tileText}>
                  <span className={labs.tileNumber} aria-hidden>
                    {tile.number}
                  </span>
                  <span className={labs.tileTitle}>{tile.title}</span>
                </span>
                <Image className={labs.tileArrow} src={`${ICON}arrow-forward.svg`} alt="" width={18} height={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className={labs.flexCard} delay={80}>
        <Image className={labs.glow} src={`${ICON}glow.svg`} alt="" width={480} height={480} aria-hidden />
        <h3 className={labs.flexTitle}>{flexibility.title}</h3>
        <ul className={labs.flexItems}>
          {flexibility.items.map((item) => (
            <li key={item.text} className={labs.flexItem}>
              <span className={labs.discOnBlue} aria-hidden>
                <Image src={item.icon} alt="" width={20} height={20} />
              </span>
              {item.text}
            </li>
          ))}
        </ul>
        <p className={labs.flexNote}>{flexibility.note}</p>
        <ul className={labs.values}>
          {flexibility.values.map((value) => (
            <li key={value} className={labs.value}>
              {value}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/** A lab's heading block (Figma "Lab header"): its name in the brand blue,
    then the lead paragraphs passed as children. `wide` is the 32px the first
    lab leaves between the two; the others keep 14px. */
export function LabHeader({ id, title, wide, children }: { id: string; title: string; wide?: boolean; children?: ReactNode }) {
  return (
    <Reveal className={cx(labs.labHead, wide && labs.labHeadWide)}>
      <h2 id={id} className={cx(academies.title, labs.titleBlue)}>
        {title}
      </h2>
      {children && <div className={labs.labLead}>{children}</div>}
    </Reveal>
  );
}

/** The band closing a lab (Figma "Ecosystem band" 5019:9569): how the lab
    works with the others, on the cream card with a link mark. */
export function EcosystemBand({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return (
    <Reveal className={labs.band}>
      <span className={labs.bandIcon} aria-hidden>
        <Image src={`${ICON}band-link.svg`} alt="" width={26} height={26} />
      </span>
      <div className={labs.bandText}>
        <h3 className={labs.bandTitle}>{title}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Reveal>
  );
}

/** A lab's calls, in reading order: the first is the filled one. */
export function LabActions({ actions }: { actions: readonly Action[] }) {
  return (
    <Reveal className={labs.actions}>
      {actions.map((action) => (
        <AcademyAction key={action.label} action={action} />
      ))}
    </Reveal>
  );
}
