import Link from "next/link";
import { Reveal } from "@/english/components/ui/Reveal";
import { stats } from "@/english/components/v3/content";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Intro.module.css";

/** Version 4's editorial introduction, with links kept in version 1. */
export function Intro() {
  return (
    <section id="about" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="intro-title">
      <Reveal as="h2" id="intro-title" className={styles.heading}>
        {" Driving your digital transformation through "}<span>{"insightful analysis"}</span> {" and innovative solutions "}</Reveal>
      <div className={styles.bottom}>
        <span className={styles.cross} aria-hidden="true">✳</span>
        <Reveal className={styles.copy} delay={120}>
          <p>{"At Transformix, we combine AI solutions, software development, and ERP systems to reduce operational waste and build digital experiences that support confident, data-informed growth."}</p>
          <p>{"We study complex challenges to uncover real opportunities for growth. At Transformix, we combine software engineering, advanced data analytics, AI, and automation to build sophisticated digital experiences."}</p>
          <Link href={"/en/about"} className={styles.link}>
            {" About us "}<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
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
