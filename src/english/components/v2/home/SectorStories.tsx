import Link from "next/link";
import { V2 } from "@/english/components/v2/routes";
import { Media } from "@/english/components/v2/ui/Media";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import { MANUFACTURING_WEBSITE } from "@/english/lib/serviceNavigation";
import styles from "@/english/components/v2/home/SectorStories.module.css";

/* Two rows of two, right to left (Figma 3693:64705, 3693:64714). Each story
   opens its chapter on the sectors page, unless it names its own site. */
const SECTORS = [
  {
    id: "industry",
    title: "Manufacturing",
    text: "Clearer insight into production, resources, and supply chains.",
    image: "/v2/images/home-sector-industry.png",
    href: MANUFACTURING_WEBSITE,
  },
  {
    id: "tourism",
    title: "Tourism",
    text: "Digital experiences that reflect the destination and serve visitors.",
    image: "/v2/images/home-sector-tourism.png",
  },
  {
    id: "cooperatives",
    title: "Saudi cooperatives",
    text: "Tools that support governance, member services, and collaboration.",
    image: "/v2/images/home-sector-cooperatives.png",
  },
  {
    id: "education",
    title: "Education",
    text: "Connecting learning experiences with clearer data and operations.",
    image: "/v2/images/home-sector-education.png",
  },
];

/** Figma "Home sectors" (3693:64700). */
export function SectorStories() {
  return (
    <section className={styles.section}>
      <SectionIntro
        eyebrow={"Industries"}
        title={"Different contexts. An approach that starts with understanding."}
        lead={"We adapt solutions to each industry's realities and the people it serves."}
      />
      <div className={styles.grid}>
        {SECTORS.map((sector) => (
          <Link
            key={sector.id}
            href={sector.href ?? `${V2.sectors}#${sector.id}`}
            target={sector.href ? "_blank" : undefined}
            rel={sector.href ? "noopener noreferrer" : undefined}
            className={styles.story}
          >
            <Media
              className={styles.image}
              src={sector.image}
              alt=""
              width={608}
              height={280}
              radius={24}
            />
            <h3 className={styles.title}>{sector.title}</h3>
            <p className={styles.text}>{sector.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
