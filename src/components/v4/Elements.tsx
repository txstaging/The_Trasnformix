"use client";

import Image from "next/image";
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Arrow, ease, MotionSection, Reveal, Rule } from "./Motion";
import { RouteLink } from "./SiteShell";
import styles from "./V4.module.css";

export function Button({ children, href, quiet = false }: { children: ReactNode; href: string; quiet?: boolean }) {
  return <RouteLink href={href} className={quiet ? styles.textLink : styles.button}>{children}<Arrow /></RouteLink>;
}

export function Heading({ label, title, lead, number }: { label?: string; title: string; lead?: string; number?: string }) {
  return <div className={styles.heading}><div className={styles.eyebrow}><span>{label}</span>{number && <span dir="ltr">{number} / TRANSFORMIX</span>}</div><Reveal><h2>{title}</h2></Reveal>{lead && <p className={styles.lead}>{lead}</p>}</div>;
}

export function Intro({ label, title, lead, number = "04", children }: { label: string; title: string; lead?: string; number?: string; children?: ReactNode }) {
  return <MotionSection className={`${styles.wrap} ${styles.intro}`} mode="slide"><div className={styles.eyebrow}><RouteLink href="/v4">الرئيسية / {label}</RouteLink><span dir="ltr">TX—{number}</span></div><Reveal><h1>{title}</h1></Reveal><div className={styles.introBottom}><p>{lead}</p>{children ?? <span className={styles.down} aria-hidden="true">↓</span>}</div><Rule /></MotionSection>;
}

export function Photo({ src, alt, className = "", contain = false, eager = false }: { src: string; alt: string; className?: string; contain?: boolean; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return <div ref={ref} className={`${styles.photo} ${className}`}><motion.div style={reduced || contain ? undefined : { y, scale: 1.1 }}><Image src={src} alt={alt} fill sizes="(max-width: 700px) 95vw, 70vw" style={{ objectFit: contain ? "contain" : "cover" }} loading={eager ? "eager" : "lazy"} /></motion.div></div>;
}

export function Features({ items }: { items: { title: string; text?: ReactNode }[] }) {
  return <div className={styles.features}>{items.map((item, i) => <Reveal key={item.title} delay={i % 3 * 0.06}><article><span dir="ltr">{String(i + 1).padStart(2, "0")} ↗</span><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div>;
}

export function Journey({ steps, title = "من التحدي إلى حل جاهز للنمو" }: { steps: { title: string; text: string; bullets?: string[] }[]; title?: string }) {
  return <MotionSection className={`${styles.wrap} ${styles.journey}`} mode="slide"><div className={styles.journeyTitle}><Heading label="كيف نعمل" title={title} /><span className={styles.orbit} aria-hidden="true"><i /><i /><i /></span></div><div className={styles.journeySteps}>{steps.map((step, i) => <Reveal key={step.title}><article><span dir="ltr">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p>{step.bullets && <ul>{step.bullets.map((text, j) => <li key={`${i}-${j}`}>{text}</li>)}</ul>}</div><Rule /></article></Reveal>)}</div></MotionSection>;
}

function Question({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  return <article className={styles.question} data-open={open}><h3><button aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><span dir="ltr">0{index + 1}</span>{question}<span className={styles.plusBox}><motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>+</motion.span></span></button></h3><AnimatePresence initial={false}>{open && <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35, ease }}><p>{answer}</p></motion.div>}</AnimatePresence></article>;
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return <MotionSection className={`${styles.wrap} ${styles.faq}`} mode="rise"><Heading label="أسئلة شائعة" title="إجابات قبل أن نبدأ." /><div>{items.map((item, i) => <Question key={item.question} {...item} index={i} />)}</div></MotionSection>;
}

export function Cta({ title = "من التحدي إلى حل رقمي يقود نموك", text = "نتبع منهجية عمل واضحة تنطلق من دراسة واقع أعمالك، وتكتمل بتطوير حلول مرنة وقابلة للتوسع تواكب تطلعاتك المستقبلية.", service = "help" }: { title?: string; text?: string; service?: string }) {
  return <MotionSection className={styles.cta} mode="mask"><div className={styles.wrap}><span className={styles.eyebrow}>الخطوة التالية / NEXT</span><h2>{title}</h2><div><p>{text}</p><Button href={`/v4/contact?service=${service}`}>احجز استشارتك الان</Button></div><span aria-hidden="true" className={styles.ctaSymbol}>↙</span></div></MotionSection>;
}

export function LogoRail({ items, title }: { items: { src: string; alt: string }[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const width = useRef(0);
  const x = useMotionValue(0);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const element = group.current; if (!element) return;
    const observer = new ResizeObserver(() => { width.current = element.getBoundingClientRect().width; });
    observer.observe(element); return () => observer.disconnect();
  }, []);
  useAnimationFrame((_, delta) => {
    if (reduced || paused || interacting || !inView || !width.current || document.hidden) return;
    x.set((x.get() - Math.min(delta, 64) * 0.035) % width.current);
  });
  return <MotionSection className={styles.logoSection} mode="rise"><div className={`${styles.wrap} ${styles.railHead}`}><p>{title}</p><button onClick={() => { setPaused(!paused); if (paused) setInteracting(false); }} aria-label={paused ? "تشغيل حركة الشعارات" : "إيقاف حركة الشعارات"}>{paused ? "تشغيل ↗" : "إيقاف مؤقت Ⅱ"}</button></div><div ref={ref} className={styles.railViewport} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={() => setInteracting(false)}><motion.div className={styles.railTrack} style={reduced ? undefined : { x }} data-v4-rail>{[0, 1, 2].map(copy => <div key={copy} ref={copy === 0 ? group : undefined} className={styles.railGroup} aria-hidden={copy > 0 || undefined} inert={copy > 0}>{items.map(item => <div className={styles.railLogo} key={item.src}><Image src={item.src} alt={item.alt} width={140} height={60} /></div>)}</div>)}</motion.div></div></MotionSection>;
}

export function Showreel() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  useEffect(() => { if (reduced) ref.current?.pause(); }, [reduced]);
  return <div className={styles.showreel}><video ref={ref} autoPlay muted loop playsInline preload="auto" poster="/v2/images/about-collaboration.png" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="فيلم تعريفي بترانسفورمكس"><source src="/videos/hero.mp4" type="video/mp4" /></video><button className={styles.videoControl} onClick={() => { const video = ref.current; if (!video) return; if (video.paused) void video.play(); else video.pause(); }} aria-label={playing ? "إيقاف الفيديو مؤقتًا" : "تشغيل الفيديو"}>{playing ? "Ⅱ" : "▷"}</button></div>;
}
