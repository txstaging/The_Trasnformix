import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InsightCard } from "@/components/insights/InsightCard";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import { INSIGHTS, INSIGHTS_LABEL } from "@/lib/insights";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "الرؤى والتحليلات | Transformix",
  description: "مقالات ترانسفورمكس حول نماذج التشغيل وإدارة المعرفة والتحول الرقمي في الصناعة.",
};

/** Figma 4445:14080's layout — the navy hero, then the articles (Figma
    4524:4209, 4524:4220, 4524:4231), each leading to its page. */
export default function InsightsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable}`}>
        <section className={styles.hero} aria-labelledby="insights-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <div className={styles.heroPhoto}>
              <Image
                className={styles.heroImage}
                src="/images/contact/partnerships-hero.jpg"
                alt=""
                fill
                preload
                sizes="(max-width: 900px) 100vw, 67vw"
              />
            </div>
          </div>
          <div className={styles.heroCopy}>
            <Reveal as="h1" id="insights-heading" className={styles.heroTitle}>
              رؤى وتحليلات لقرارات أعمال أوضح
            </Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              مقالات من فريق ترانسفورمكس حول نماذج التشغيل وإدارة المعرفة والتحول الرقمي في الصناعة،
              تساعد الإدارة على قراءة التحديات واختيار أولويات التطوير.
            </Reveal>
            <Reveal className={styles.heroActions} delay={160}>
              <Link href="/contact#request" className={styles.button}>
                ناقش تحديات أعمالك
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.articles} aria-label={INSIGHTS_LABEL}>
          <ul className={styles.grid}>
            {INSIGHTS.map((insight, index) => (
              <Reveal as="li" key={insight.slug} className={styles.item} delay={index * 80}>
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
