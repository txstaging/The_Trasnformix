import Image from "next/image";
import type { ReactNode } from "react";
import { academies } from "@/components/academies/AcademiesKit";
import { AcademyAction, type Action } from "@/components/academies/AcademyAction";
import { Reveal } from "@/components/ui/Reveal";
import hub from "./Hub.module.css";

/* The creative hub's own pieces (Figma 4854:7820): the overview's channel
   orbit, the labs split, the sector cards and the closing card. */

/** The orbit's channels, as the artboard places them (Figma "Channels visual",
    502 × 596): the 76px white discs sit on the 446px ring; x and y are the
    disc's top-left corner on that box. */
const CHANNELS = [
  { name: "megaphone", size: 39, x: 207, y: 17 },
  { name: "message", size: 26, x: 406, y: 135 },
  { name: "globe", size: 40, x: 423, y: 354 },
  { name: "chart", size: 40, x: 207, y: 481 },
  { name: "book", size: 40, x: 9, y: 354 },
  { name: "layers", size: 26, x: 27, y: 135 },
] as const;

/** Rings round the Transformix mark, with six channel icons on the outer one
    (Figma 4854:7842). Decorative. */
export function ChannelsVisual() {
  return (
    <div className={hub.orbit} aria-hidden>
      <Image className={hub.orbitRing} src="/images/creative/hub/ring.png" alt="" width={446} height={446} />
      <Image className={hub.orbitInner} src="/images/creative/hub/inner-ring.svg" alt="" width={307} height={307} />
      <span className={hub.orbitCore}>
        <span className={hub.orbitMark}>
          <Image src="/images/creative/hub/mark.svg" alt="" fill />
        </span>
      </span>
      {CHANNELS.map((channel) => (
        <span key={channel.name} className={hub.channel} style={{ left: `${channel.x / 10}rem`, top: `${channel.y / 10}rem` }}>
          <Image src={`/icons/creative/hub-channel-${channel.name}.svg`} alt="" width={channel.size} height={channel.size} />
        </span>
      ))}
    </div>
  );
}

export type Lab = { label: string; icon: string };

/** The labs beside the copy (Figma "Cross-lab" 4854:7896): the creative lab
    active on a white pill, the three others outlined under it. The tiles are
    in reading order. */
export function LabsSplit({ id, title, text, active, labs }: {
  id: string;
  title: string;
  text: string;
  active: Lab;
  labs: readonly Lab[];
}) {
  return (
    <section className={hub.band} aria-labelledby={id}>
      <div className={hub.split}>
        <Reveal className={hub.splitCopy}>
          <h2 id={id} className={hub.splitTitle}>
            {title}
          </h2>
          <p className={hub.splitText}>{text}</p>
        </Reveal>
        <Reveal className={hub.labs} delay={120}>
          <p className={hub.labActive}>
            <Image src={active.icon} alt="" width={22} height={22} aria-hidden />
            {active.label}
          </p>
          <ul className={hub.labGrid}>
            {labs.map((lab) => (
              <li key={lab.label} className={hub.lab}>
                <Image src={lab.icon} alt="" width={22} height={22} aria-hidden />
                <span>{lab.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export type SectorCard = { label: string; icon: string };

/** The sector cards (Figma "Cards grid" 4854:7925): a 52px tinted icon tile and
    the label on each, three across, in reading order. */
export function SectorCards({ items }: { items: readonly SectorCard[] }) {
  return (
    <ul className={hub.sectors}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.label} className={hub.sector} delay={(index % 3) * 80}>
          <span className={hub.sectorTile}>
            <Image src={item.icon} alt="" width={26} height={26} aria-hidden />
          </span>
          <span className={hub.sectorLabel}>{item.label}</span>
        </Reveal>
      ))}
    </ul>
  );
}

/** The closing card (Figma "Closing" 4854:8109): the copy and its two calls on
    the reading side, the request form on the far one. */
export function HubClosing({ id, title, text, actions, form }: {
  id: string;
  title: string;
  text: string;
  /** In reading order. */
  actions: readonly Action[];
  form: ReactNode;
}) {
  return (
    <section className={`${academies.section} ${academies.closing}`} aria-labelledby={id}>
      <Reveal className={hub.closingCard}>
        <div className={hub.closingCopy}>
          <h2 id={id} className={hub.closingTitle}>
            {title}
          </h2>
          <p className={hub.closingText}>{text}</p>
          <div className={hub.closingActions}>
            {actions.map((action) => (
              <AcademyAction key={action.label} action={action} />
            ))}
          </div>
        </div>
        <div className={hub.formSlot}>{form}</div>
      </Reveal>
    </section>
  );
}

export { hub };
