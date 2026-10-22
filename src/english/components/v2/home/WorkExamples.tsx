import { contactHref } from "@/english/components/v2/routes";
import { Button } from "@/english/components/v2/ui/Button";
import { Media } from "@/english/components/v2/ui/Media";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/home/WorkExamples.module.css";

const WORKS = [
  {
    title: "Cooperative management platform",
    text: "An experience bringing member data, governance, and investments together in one place.",
    image: "/v2/screens/cooperative-dashboard.png",
  },
  {
    title: "Operational monitoring and control",
    text: "A unified dashboard for monitoring operations, system status, and alerts.",
    image: "/v2/screens/mcr-dashboard.png",
  },
];

/** Two featured interfaces on the home page, each with a request button. */
export function WorkExamples() {
  return (
    <section id="works" className={styles.section}>
      <SectionIntro
        eyebrow={"Our work"}
        title={"Digital solutions, from concept to interface"}
        lead={"Selected interfaces showing our applications in operational monitoring and cooperative management."}
        leadSize={18}
        tight
      />
      <div className={styles.grid}>
        {WORKS.map((work) => (
          <article key={work.title} className={styles.card}>
            <Media src={work.image} alt={work.title} width={568} height={376} fit="contain" />
            <h3 className={styles.title}>{work.title}</h3>
            <p className={styles.text}>{work.text}</p>
            <p className={styles.note}>{"Sample interface from the project materials"}</p>
            <Button href={contactHref()}>{"Request this service"}</Button>
          </article>
        ))}
      </div>
    </section>
  );
}
