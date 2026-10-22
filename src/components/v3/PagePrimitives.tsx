"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useId, useRef, useState, type ReactNode } from "react";
import { Arrow, ease, Reveal } from "./Motion";
import { V3, contactHref } from "./routes";
import styles from "./Experience.module.css";

export function PageIntro({ label, title, lead, number = "03", children }: {
  label: string; title: string; lead?: string; number?: string; children?: ReactNode;
}) {
  return <header className={`${styles.wrap} ${styles.pageIntro}`}>
    <nav aria-label="مسار التنقل" className={styles.breadcrumb}><Link href={V3.home}>الرئيسية</Link><span aria-hidden="true">/</span><span>{label}</span></nav>
    <div className={styles.pageIntroTitle}><Reveal><h1>{title}</h1></Reveal><span dir="ltr" className={styles.pageIndex} aria-hidden="true">{number}</span></div>
    <div className={styles.pageIntroLead}><span className={styles.introRule} aria-hidden="true" /><Reveal delay={0.1}><p>{lead}</p>{children}</Reveal></div>
  </header>;
}

export function SectionHeading({ label, title, lead }: { label?: string; title: string; lead?: string }) {
  return <Reveal className={styles.sectionHeading}>{label && <p className={styles.smallLabel}>{label}</p>}<h2>{title}</h2>{lead && <p className={styles.headingLead}>{lead}</p>}</Reveal>;
}

export function Photo({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  return <div ref={ref} className={`${styles.photo} ${className}`}><motion.div style={{ y: reduced ? 0 : y }}><Image src={src} alt={alt} fill sizes="(max-width: 800px) 95vw, 65vw" loading={eager ? "eager" : "lazy"} /></motion.div></div>;
}

export type Feature = { title: string; text?: ReactNode; icon?: string };

export function FeatureList({ items, dark = false }: { items: Feature[]; dark?: boolean }) {
  return <div className={`${styles.featureList} ${dark ? styles.featuresDark : ""}`}>{items.map((item, index) => <Reveal key={item.title} delay={index * 0.08}><article><span className={styles.featureIndex} dir="ltr">0{index + 1}</span>{item.icon && <Image src={item.icon} alt="" width={32} height={32} />}<h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div>;
}

export function Journey({ steps, label = "كيف نعمل؟" }: { steps: { title: string; text: string }[]; label?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  return <section ref={ref} className={`${styles.wrap} ${styles.journey}`}>
    <div className={styles.eyebrow}><span>{label}</span><span dir="ltr">FROM INTENT TO IMPACT</span></div>
    <div className={styles.journeyLine} aria-hidden="true"><motion.div style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>
    <ol>{steps.map((step, index) => <li key={step.title}><Reveal delay={index * 0.07}><span className={styles.journeyNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal></li>)}</ol>
  </section>;
}

export function PageFaq({ items }: { items: { question: string; answer: string }[] }) {
  const uid = useId();
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return <section className={`${styles.wrap} ${styles.pageFaq}`}>
    <SectionHeading label="الأسئلة الشائعة" title="إجابات تساعدك على الخطوة التالية." />
    <div>{items.map((faq, index) => <div className={styles.question} key={faq.question}>
      <h3><button type="button" id={`${uid}-q-${index}`} aria-expanded={active === index} aria-controls={`${uid}-a-${index}`} onClick={() => setActive(active === index ? null : index)}><span className={styles.questionIndex}>0{index + 1}</span><span>{faq.question}</span><motion.span aria-hidden="true" animate={{ rotate: active === index ? 45 : 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>+</motion.span></button></h3>
      <motion.div id={`${uid}-a-${index}`} aria-labelledby={`${uid}-q-${index}`} aria-hidden={active !== index} role="region" initial={false} animate={{ height: active === index ? "auto" : 0, opacity: active === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3, ease }}><p>{faq.answer}</p></motion.div>
    </div>)}</div>
  </section>;
}

export function PageCta({ title, text, service }: { title: string; text: string; service?: string }) {
  return <section className={styles.pageCta}><div className={styles.wrap}><Reveal><p className={styles.smallLabel}>لنبدأ معًا</p><h2>{title}</h2><p>{text}</p><Link href={contactHref(service)} className={styles.solidLink}>اطلب استشارة مجانية <Arrow /></Link></Reveal><span aria-hidden="true" className={styles.ctaMark}><Arrow /></span></div></section>;
}
