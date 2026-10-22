import { CardGrid, type Feature } from "@/english/components/v2/ui/FeatureCard";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/home/TrustPanel.module.css";

const COMMITMENTS: Feature[] = [
  {
    icon: "/v2/icons/home-file-check.svg",
    title: "Clarity from the start",
    text: "Scope, outputs, and responsibilities understood by both sides.",
  },
  {
    icon: "/v2/icons/home-shield-check.svg",
    title: "Care for your information",
    text: "Access permissions and data-sharing arrangements defined for each project.",
  },
  {
    icon: "/v2/icons/home-book-open.svg",
    title: "Knowledge that stays with you",
    text: "Documentation and training that help your team use the solution effectively.",
  },
];

/** Figma "Working commitments" (3693:64736): glass cards on the deep blue
    gradient panel. */
export function TrustPanel() {
  return (
    <section className={styles.panel}>
      <SectionIntro eyebrow={"The foundations of collaboration"} title={"Trust is built through the details of our work."} tone="inverse" />
      <CardGrid items={COMMITMENTS} tone="glass" />
    </section>
  );
}
