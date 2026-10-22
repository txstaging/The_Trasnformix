import { Reveal } from "@/english/components/ui/Reveal";
import { StatsPanel, type Stat } from "@/english/components/sections/StatsPanel";
import styles from "@/english/components/sections/about/AboutStats.module.css";

/* Right-to-left order: the 51+ card sits furthest right. The cards are the
   home intro's (StatsPanel); only the copy is the about page's. */
const STATS: Stat[] = [
  {
    value: 51,
    icon: { src: "/icons/stat-projects.svg", width: 54, height: 54 },
    title: "Digital projects and solutions",
    text: "We have delivered digital solutions for brands and companies across different industries and business needs.",
  },
  {
    value: 20,
    icon: { src: "/icons/stat-automation.svg", width: 68, height: 72 },
    title: "AI and automation solutions",
    text: "AI and automation solutions developed to address real business challenges.",
  },
  {
    value: 10,
    icon: { src: "/icons/stat-experience.svg", width: 70, height: 72 },
    title: "Years of experience",
    text: "Experience spanning technology, design, marketing, and business development.",
  },
];

export function AboutStats() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="h2" className={styles.heading}>
          {" Experience that delivers solutions "}</Reveal>

        <StatsPanel stats={STATS} delay={120} />
      </div>
    </section>
  );
}
