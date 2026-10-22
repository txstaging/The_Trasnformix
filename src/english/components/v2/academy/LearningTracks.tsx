import Image from "next/image";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/academy/LearningTracks.module.css";

/* Right to left as drawn (Figma 3693:66432). The ids are the footer's
   الأكاديمية links. */
const TRACKS = [
  {
    id: "vocational",
    icon: "/v2/icons/briefcase-business.svg",
    audience: "For individuals and teams",
    title: "Vocational training and development",
    text: "Develop workplace skills, from identifying a need to applying knowledge and reviewing progress.",
    topics: [
      "Digital skills in the workplace",
      "Interpreting professional data and reports",
      "Work organization and communication skills",
    ],
  },
  {
    id: "industry",
    icon: "/v2/icons/factory.svg",
    audience: "For operations and management teams",
    title: "Manufacturing",
    text: "Content that connects operations, data, and improvement concepts to the realities of manufacturing.",
    topics: [
      "Operational performance indicator fundamentals",
      "Principles of process and resource organization",
      "Digital transformation in manufacturing",
    ],
  },
  {
    id: "cooperatives",
    icon: "/v2/icons/academy-handshake.svg",
    audience: "For management, members, and teams",
    title: "Saudi cooperatives",
    text: "Develop a practical understanding of cooperative work and tools for organization, communication, and member services.",
    topics: [
      "Principles of cooperative management and governance",
      "Organized member and service data",
      "Communication and content for cooperative initiatives",
    ],
  },
];

/** Figma "Academy fields" (3693:66427): three equal-height track cards. */
export function LearningTracks() {
  return (
    <section className={styles.section}>
      <SectionIntro
        eyebrow={"Academy learning areas"}
        title={"Three areas, with content shaped around your needs."}
        lead={"These topics are suggested paths for discussion and customization, rather than scheduled programs or professional accreditation."}
      />
      <div className={styles.grid}>
        {TRACKS.map((track) => (
          <article key={track.id} id={track.id} className={styles.track}>
            <Image className={styles.icon} src={track.icon} alt="" width={36} height={36} />
            <p className={styles.audience}>{track.audience}</p>
            <h3 className={styles.title}>{track.title}</h3>
            <p className={styles.text}>{track.text}</p>
            <h4 className={styles.label}>{"Topics we can build on"}</h4>
            <ul className={styles.topics}>
              {track.topics.map((topic) => (
                <li key={topic}>— {topic}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
