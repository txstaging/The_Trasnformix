import Link from "next/link";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Intro.module.css";

/** Version 4's editorial introduction, with links kept in version 1. */
export function Intro() {
  return (
    <section id="about" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="intro-title">
      <Reveal as="h2" id="intro-title" className={styles.heading}>
        {" Built on "}<span>{"Technology 5.0"}</span>
      </Reveal>
      <div className={styles.bottom}>
        <span className={styles.cross} aria-hidden="true">✳</span>
        <Reveal className={styles.copy} delay={120}>
          <p>{"Transformix builds its products and its way of working on the principles of Technology 5.0, with a focus on people, innovation, sustainability, resilience and the responsible use of technology, choosing the solutions and technologies that fit each client's requirements."}</p>
          <Link href={"/en/about"} className={styles.link}>
            {" About us "}<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M25 7 7 25M7 7v18h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
