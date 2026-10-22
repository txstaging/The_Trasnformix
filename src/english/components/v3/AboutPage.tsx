"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { aboutCopy } from "@/english/components/v3/page-content";
import { Arrow, Reveal } from "@/english/components/v3/Motion";
import { FeatureList, Journey, PageCta, PageIntro, Photo, SectionHeading } from "@/english/components/v3/PagePrimitives";
import { servicePaths } from "@/english/components/v3/routes";
import { stats } from "@/english/components/v3/content";
import styles from "@/english/components/v3/Experience.module.css";

export function AboutPage() {
  const copy = aboutCopy;
  const reduced = useReducedMotion();
  return <>
    <PageIntro label={"About us"} title={copy.intro.title} lead={copy.intro.text} number="01" />
    <section className={`${styles.wrap} ${styles.aboutStory}`}>
      <Photo src="/v2/images/about-collaboration.png" alt={"Two colleagues reviewing work on a computer in an office"} eager />
      <Reveal className={styles.aboutStoryText}><p className={styles.smallLabel}>{copy.story.eyebrow}</p><h2>{copy.story.title}</h2><p>{copy.story.lead}</p><p>{copy.story.note}</p><div className={styles.crossroads} aria-hidden="true"><span>{"Business"}</span><span>{"Data"}</span><span>{"Creativity"}</span><span>{"Technology"}</span><svg viewBox="0 0 300 140"><motion.path d="M0 1 300 139M0 139 300 1" stroke="currentColor" fill="none" initial={{ pathLength: reduced ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} /></svg><b>TX</b></div></Reveal>
    </section>
    <section className={styles.foundationBand}><div className={styles.wrap}><FeatureList items={copy.foundations} dark /></div></section>
    <section className={`${styles.wrap} ${styles.valuesSection}`}><SectionHeading label={copy.values.eyebrow} title={copy.values.title} /><div className={styles.valueRows}>{copy.values.items.map((value, index) => <Reveal key={value.title}><article><span dir="ltr">0{index + 1}</span><Image src={value.icon} alt="" width={36} height={36} /><h3>{value.title}</h3><p>{value.text}</p></article></Reveal>)}</div></section>
    <section className={`${styles.wrap} ${styles.pillarsSection}`}><SectionHeading title={"Combining expertise to build a complete solution."} /><div className={styles.pillars}>{copy.pillars.map((pillar, index) => <Link key={pillar.title} href={[servicePaths.web, servicePaths.data, servicePaths.erp, servicePaths.marketing][index]}><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.text}</p><Arrow /></Link>)}</div></section>
    <Journey steps={copy.steps} />
    <section className={`${styles.wrap} ${styles.aboutNumbers}`}>{stats.map(stat => <Reveal key={stat.title}><span dir="ltr">{stat.value}<em>+</em></span><h3>{stat.title}</h3><p>{stat.text}</p></Reveal>)}</section>
    <PageCta {...copy.cta} />
  </>;
}
