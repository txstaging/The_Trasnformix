import Image from "next/image";
import { Reveal } from "@/english/components/ui/Reveal";
import { communityHref } from "@/english/lib/communityNav";
import styles from "@/english/components/sections/Sustainability.module.css";

type Panel = {
  key: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: string;
  /** The artboard indents the sustainability link by its button padding. */
  indented?: boolean;
};

/* Figma 4620:960 — the impact panels. Sustainability opens at the reading
   start, the community responsibility panel beside it. */
const PANELS: Panel[] = [
  {
    key: "sustainability",
    title: "Sustainability",
    text: "We work to embed sustainability in how Transformix develops and runs its business, with attention to resource efficiency, organisational resilience and performance indicators. We also apply our data, systems and automation capabilities to help organisations collect and analyse sustainability data, build indicator dashboards and support sustainability reporting within the scope of work and disclosure requirements.",
    cta: "Explore sustainability solutions",
    href: communityHref("impact"),
    icon: "/icons/home/csr-leaf.svg",
    indented: true,
  },
  {
    key: "csr",
    title: "Social Responsibility",
    text: "We help make technology and knowledge accessible through community and educational initiatives and partnerships, including TX Community, TX Talks and Tech for Good. In earlier environmental initiatives, Transformix contributed the venue, registration, learning platform and tracking dashboard for young participants in a training and educational simulation on protecting the marine environment, without carrying out any actual coral planting.",
    cta: "Explore social responsibility initiatives",
    href: communityHref("impact"),
    icon: "/icons/home/csr-heart.svg",
  },
];

/** Sustainability and social responsibility (Figma 4620:959): two panels of
    equal weight, each with its icon, a title, its copy and one link. */
export function Sustainability() {
  return (
    <section id="sustainability" className={styles.section} aria-label="Sustainability & Social Responsibility">
      <div className={styles.inner}>
        {PANELS.map((panel, index) => (
          <Reveal key={panel.key} as="article" className={styles.panel} delay={index * 120}>
            <div className={styles.tile} aria-hidden="true">
              <Image src={panel.icon} alt="" width={30} height={30} />
            </div>
            <h2 className={styles.title}>{panel.title}</h2>
            <p className={styles.text}>{panel.text}</p>
            <a href={panel.href} className={panel.indented ? `${styles.link} ${styles.indented}` : styles.link}>
              {panel.cta}
              <Image className={styles.arrow} src="/icons/home/arrow-forward.svg" alt="" width={20} height={20} aria-hidden />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
