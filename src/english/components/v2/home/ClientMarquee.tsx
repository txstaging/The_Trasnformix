import type { CSSProperties } from "react";
import { Media, type Crop } from "@/english/components/v2/ui/Media";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/home/ClientMarquee.module.css";

type Client = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Width of the cell the logo is centred in, design px. */
  cell: number;
  crop?: Crop;
};

/* Figma 3751:9130 — a 2403 wide strip of logo cells clipped to the column.
   Listed right to left; the strip scrolls so every logo passes through. */
const CLIENTS: Client[] = [
  { name: "Client", src: "/v2/clients/emblem-mark.png", width: 70, height: 70, cell: 288 },
  { name: "Barq Rescue Team", src: "/v2/clients/barq.png", width: 84, height: 83, cell: 320 },
  {
    name: "Thermo Integrated",
    src: "/v2/clients/thermo.png",
    width: 184,
    height: 103,
    cell: 379.8,
    crop: { left: -0.27, top: -16.67, width: 100.54, height: 133.33 },
  },
  { name: "Al Mahmal Company", src: "/v2/clients/almahmal.png", width: 277, height: 85, cell: 309 },
  {
    name: "Arab Academy for Science and Technology",
    src: "/v2/clients/arab-academy.png",
    width: 120,
    height: 104,
    cell: 311,
  },
  { name: "IBDL", src: "/v2/clients/ibdl.png", width: 206, height: 73, cell: 397 },
  {
    name: "Tour Guides Cooperative",
    src: "/v2/clients/tour-guides-cooperative.png",
    width: 150,
    height: 64,
    cell: 341,
  },
];

/** Figma "Company clients" (3709:774). */
export function ClientMarquee() {
  const rail = (copy: number) => (
    <ul className={styles.set} aria-hidden={copy > 0 || undefined}>
      {CLIENTS.map((client) => (
        <li
          key={client.src}
          className={styles.cell}
          style={{ "--cell": `${client.cell / 10}rem` } as CSSProperties}
        >
          <Media
            src={client.src}
            alt={copy > 0 ? "" : client.name}
            width={client.width}
            height={client.height}
            crop={client.crop}
            sizes={`${client.width * 2}px`}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.section}>
      <SectionIntro eyebrow={"Our clients"} title={"Clients we are proud to work with"} tight />
      <div className={styles.viewport}>
        <div className={styles.track}>
          {rail(0)}
          {rail(1)}
        </div>
      </div>
    </section>
  );
}
