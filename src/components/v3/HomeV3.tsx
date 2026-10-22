"use client";

import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { faqs, stats } from "./content";
import { Hero, Showreel } from "./Hero";
import { Arrow, ease, Reveal } from "./Motion";
import { Process } from "./Process";
import { ServicesExperience } from "./ServicesExperience";
import { HomeWorkRail, LogoRail, ReviewRail } from "./Rails";
import { HomeChapters } from "./HomeChapters";
import { useOpeningReady } from "./SiteShell";
import { V3 } from "./routes";
import styles from "./HomeV3.module.css";

function ContactButton({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <Link className={`${styles.button} ${inverse ? styles.buttonInverse : ""}`} href={V3.contact}>{children}<Arrow /></Link>;
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const count = useMotionValue(value);
  const rounded = useTransform(count, latest => Math.round(latest));
  useEffect(() => {
    if (!inView || reduced) return;
    const animation = animate(count, [0, value], { duration: 1.5, ease });
    return () => animation.stop();
  }, [inView, count, value, reduced]);
  return <span ref={ref} dir="ltr"><motion.span>{rounded}</motion.span><span className={styles.statPlus}>+</span></span>;
}

function About() {
  return <section id="about" className={styles.section} aria-labelledby="v3-about-title">
    <div className={styles.sectionKicker}><span>من نحن</span><span dir="ltr">01 / 06</span></div>
    <div className={styles.aboutHeading}><Reveal><h2 id="v3-about-title">نقود تحولك الرقمي بحلول تجمع بين <span>ذكاء التحليل</span> وابتكار الحلول</h2></Reveal><Reveal delay={0.1}><p className={styles.sectionLead}>ندرس التحديات المعقدة لتكون فرص نمو حقيقية. نجمع في Transformix بين هندسة البرمجيات، تحليلات البيانات المتقدمة، وحلول الذكاء الاصطناعي والأتمتة لنبني تجارب رقمية فائقة التطور.</p></Reveal></div>
    <div className={styles.stats}>{stats.map((stat, index) => <Reveal key={stat.title} delay={index * 0.1} className={styles.stat}>
      <div className={styles.statValue}><Counter value={stat.value} /></div><h3>{stat.title}</h3><p>{stat.text}</p>
    </Reveal>)}</div>
  </section>;
}

function Faq() {
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();
  
  return <section id="faq" className={styles.faq} aria-labelledby="v3-faq-title"><div className={styles.section}>
    <div className={styles.sectionKicker}><span>تواصل معنا</span><span dir="ltr">06 / 06</span></div>
    <div className={styles.faqGrid}><Reveal className={styles.faqCopy}><h2 id="v3-faq-title">هل لديك تحديات تواجهه اعملك؟ دعنا نساعدك في حلها</h2><p>شاركنا التحدي الذي يواجه أعمالك، وسيتولى فريقنا التقني رسم المسار الأمثل وتحديد الحلول والأنظمة الأنسب لنمو مشروعك.</p><div className={styles.faqActions}><ContactButton inverse>احجز استشارة الان</ContactButton><Link className={styles.textLink} href={V3.contact}>تواصل معنا <Arrow /></Link></div></Reveal>
      <div className={styles.faqList}>{faqs.map((faq, index) => <div className={styles.faqItem} key={faq.number} data-open={active === index}>
        <h3><button type="button" id={`v3-faq-${faq.number}`} aria-expanded={active === index} aria-controls={`v3-answer-${faq.number}`} onClick={() => setActive(active === index ? null : index)}><span className={styles.faqNumber}>{faq.number}</span><span>{faq.question}</span><span className={styles.faqPlus} aria-hidden="true"><motion.span animate={{ rotate: active === index ? 45 : 0 }} transition={{ duration: 0.25 }}>+</motion.span></span></button></h3>
        <motion.div id={`v3-answer-${faq.number}`} role="region" aria-labelledby={`v3-faq-${faq.number}`} aria-hidden={active !== index} initial={false} animate={{ height: active === index ? "auto" : 0, opacity: active === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35, ease }} className={styles.faqAnswer}><p>{faq.answer}</p></motion.div>
      </div>)}</div>
    </div>
  </div></section>;
}

function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return <section id="contact" ref={ref} className={styles.cta}><div className={styles.section}><Reveal className={styles.ctaCopy}><h2>من التحدي إلى حل رقمي <span>يقود نموك</span></h2><p>نتبع منهجية عمل واضحة تنطلق من دراسة واقع أعمالك، وتكتمل بتطوير حلول مرنة وقابلة للتوسع تواكب تطلعاتك المستقبلية.</p><ContactButton inverse>احجز استشارتك الان</ContactButton></Reveal><motion.div className={styles.ctaArrow} style={{ rotate: reduced ? 0 : rotate }} aria-hidden="true"><Arrow /></motion.div></div></section>;
}

export function HomeV3() {
  const ready = useOpeningReady();
  return <>
    <Hero ready={ready} />
    <Showreel />
    <LogoRail />
    <About />
    <ServicesExperience />
    <HomeChapters />
    <Process />
    <HomeWorkRail />
    <LogoRail partners />
    <ReviewRail />
    <Faq />
    <Cta />
  </>;
}
