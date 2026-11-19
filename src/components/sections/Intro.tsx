import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "./Intro.module.css";

/** Version 4's editorial introduction, with links kept in version 1. */
export function Intro() {
  return (
    <section id="about" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="intro-title">
      <Reveal as="h2" id="intro-title" className={styles.heading}>
        نعمل وفق <span>تكنولوجيا الجيل الخامس</span>
      </Reveal>
      <div className={styles.bottom}>
        <span className={styles.cross} aria-hidden="true">✳</span>
        <Reveal className={styles.copy} delay={120}>
          <p>تعتمد ترانسفورمكس مبادئ تكنولوجيا الجيل الخامس في تطوير منتجاتها وطريقة عملها، بالتركيز على الإنسان والابتكار والاستدامة والمرونة والتوظيف المسؤول للتكنولوجيا، مع اختيار الحلول والتقنيات المناسبة لمتطلبات كل عميل.</p>
          <Link href="/about" className={styles.link}>
            من نحن
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M25 7 7 25M7 7v18h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
