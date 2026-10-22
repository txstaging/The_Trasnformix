import { Reveal } from "@/components/ui/Reveal";
import { StatsPanel, type Stat } from "../StatsPanel";
import styles from "./AboutStats.module.css";

/* Right-to-left order: the 51+ card sits furthest right. The cards are the
   home intro's (StatsPanel); only the copy is the about page's. */
const STATS: Stat[] = [
  {
    value: 51,
    icon: { src: "/icons/stat-projects.svg", width: 54, height: 54 },
    title: "مشروع وحل رقمي",
    text: "نفذنا حلولًا رقمية لعلامات وشركات في قطاعات واحتياجات مختلفة.",
  },
  {
    value: 20,
    icon: { src: "/icons/stat-automation.svg", width: 68, height: 72 },
    title: "حلول AI وAutomation",
    text: "حل بالذكاء الاصطناعي و Automation تم تطويرها لخدمة تحديات حقيقية في الأعمال.",
  },
  {
    value: 10,
    icon: { src: "/icons/stat-experience.svg", width: 70, height: 72 },
    title: "سنوات من الخبرة",
    text: "خبرة تجمع بين التقنية، التصميم، التسويق وتطوير الأعمال.",
  },
];

export function AboutStats() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="h2" className={styles.heading}>
          خبرة تُترجم إلى حلول
        </Reveal>

        <StatsPanel stats={STATS} delay={120} />
      </div>
    </section>
  );
}
