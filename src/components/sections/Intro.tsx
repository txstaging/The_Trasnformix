import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/components/v3/content";
import { tajawal } from "@/lib/fonts";
import styles from "./Intro.module.css";

/** Version 4's editorial introduction, with links kept in version 1. */
export function Intro() {
  return (
    <section id="about" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="intro-title">
      <Reveal as="h2" id="intro-title" className={styles.heading}>
        نقود تحولك الرقمي بحلول تجمع بين <span>ذكاء التحليل</span> وابتكار الحلول
      </Reveal>
      <div className={styles.bottom}>
        <span className={styles.cross} aria-hidden="true">✳</span>
        <Reveal className={styles.copy} delay={120}>
          <p>معنا في Transformix ندمج بين حلول الذكاء الاصطناعي، تطوير البرمجيات، وأنظمة ERP لنلغي الهدر التشغيلي ونمنحك تجارب رقمية تقود نمو شركتك بثقة وبقرارات مبنية على البيانات</p>
          <p>ندرس التحديات المعقدة لتكون فرص نمو حقيقية. نجمع في Transformix بين هندسة البرمجيات، تحليلات البيانات المتقدمة، وحلول الذكاء الاصطناعي والأتمتة لنبني تجارب رقمية فائقة التطور.</p>
          <Link href="/about" className={styles.link}>
            من نحن
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M25 7 7 25M7 7v18h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </Reveal>
      </div>
      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <Reveal as="article" key={stat.title} delay={index * 80}>
            <span className={styles.value} dir="ltr">{stat.value}<sup>+</sup></span>
            <h3>{stat.title}</h3>
            <p>{stat.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
