"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationFrame, useInView, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { WORK_FILTERS } from "@/english/components/sections/works/projects";
import { clientLogos, partnerLogos, reviews } from "@/english/components/v3/content";
import { Arrow, Reveal } from "@/english/components/v3/Motion";
import { V3 } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/Experience.module.css";

export function InfiniteRail({ children, label, speed = 38, className = "" }: {
  children: ReactNode; label: string; speed?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLDivElement>(null);
  const extent = useRef(0);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const visible = useInView(ref, { margin: "100px" });
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    if (!first.current) return;
    const measure = () => { extent.current = first.current?.offsetWidth ?? 0; };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(first.current);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || paused || interacting || !visible || !extent.current) return;
    const next = -x.get() + Math.min(delta, 64) * speed / 1000;
    x.set(-(next % extent.current));
  });

  return <div ref={ref} className={`${styles.rail} ${className}`} aria-label={label}
    data-infinite-rail="" data-paused={Boolean(reduced || paused || interacting)}
    onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)}
    onFocusCapture={() => setInteracting(true)} onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) setInteracting(false);
    }}>
    <div className={styles.railViewport}>
      <motion.div className={styles.railTrack} style={{ x: reduced ? 0 : x }}>
        <div ref={first} className={styles.railSet}>{children}</div>
        {[1, 2].map(copy => <div className={styles.railSet} key={copy} aria-hidden="true" inert>{children}</div>)}
      </motion.div>
    </div>
    {!reduced && <button className={styles.railPause} type="button" aria-label={paused ? "Play animation" : "Pause animation"} aria-pressed={paused} onClick={() => { setPaused(!paused); if (paused) setInteracting(false); }}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>}
  </div>;
}

export function LogoRail({ partners = false }: { partners?: boolean }) {
  const logos = partners ? partnerLogos : clientLogos;
  const title = partners ? "Trusted across global platforms and networks" : "Trusted by entrepreneurs and businesses";
  return <section className={styles.logoSection} aria-label={title}>
    <h2>{title}</h2>
    <InfiniteRail label={title} speed={partners ? 25 : 32} className={styles.logoRail}>
      {logos.map(logo => <div key={logo.src} className={styles.logoCell}><Image src={logo.src} alt={logo.alt} width={160} height={80} sizes="160px" /></div>)}
    </InfiniteRail>
  </section>;
}

export function HomeWorkRail() {
  const projects = WORK_FILTERS[0].projects;
  return <section id="works" className={styles.homeWorks} aria-labelledby="v3-works-title">
    <div className={styles.wrap}><div className={styles.eyebrow}><span>{"Our work"}</span><span dir="ltr">SELECTED WORK / 03</span></div>
      <div className={styles.sectionHead}><Reveal><h2 id="v3-works-title">{"Work that shows"}<br /><em>{"how we think"}</em></h2></Reveal><Link href={V3.works} className={styles.lineLink}>{"Show more "}<Arrow /></Link></div>
    </div>
    <InfiniteRail label={"Work that shows how we think"} speed={44} className={styles.workRail}>
      {projects.map((project, index) => <Link href={`${V3.works}/${project.key}`} key={project.key} className={styles.railProject}>
        <div className={styles.railProjectImage}><Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 82vw, 520px" /><span><Arrow /></span></div>
        <div className={styles.railProjectCaption}><div><p>{project.tags[0]?.label}</p><h3 dir="auto">{project.title}</h3></div><span dir="ltr">{String(index + 1).padStart(2, "0")}</span></div>
      </Link>)}
    </InfiniteRail>
  </section>;
}

export function ReviewRail() {
  return <section className={styles.reviewSection} aria-labelledby="v3-reviews-title">
    <div className={styles.wrap}><div className={styles.eyebrow}><span>{"What our partners and clients say"}</span><span dir="ltr">IN THEIR WORDS</span></div><Reveal><h2 id="v3-reviews-title">{"What our partners and clients say"}</h2></Reveal></div>
    <InfiniteRail label={"Client feedback"} speed={22} className={styles.reviewRail}>
      {reviews.map(review => <figure key={review.name} className={styles.reviewRailCard} dir={"ltr"}><div className={styles.reviewRailHead}><span aria-hidden="true">“</span><Image src="/icons/stars-5-large.svg" alt={"Rated 5 out of 5"} width={120} height={20} /></div><blockquote><p>{review.quote}</p></blockquote><figcaption><Image src={review.avatar.src} alt="" width={48} height={48} /><span>{review.name}</span></figcaption></figure>)}
    </InfiniteRail>
  </section>;
}
