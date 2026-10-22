"use client";

import Image from "next/image";
import Link from "next/link";
import { academyCopy } from "@/english/components/v3/page-content";
import { Arrow, Reveal } from "@/english/components/v3/Motion";
import { FeatureList, Journey, PageCta, PageFaq, SectionHeading } from "@/english/components/v3/PagePrimitives";
import { V3, contactHref } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/Experience.module.css";

export function AcademyPage() {
  const copy = academyCopy;
  return <>
    <header className={styles.academyHero}>
      <Image src="/v2/images/academy-hero.png" alt={"A trainer explaining a topic on a whiteboard to a team in a training room"} fill sizes="100vw" loading="eager" />
      <div className={styles.academyHeroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label={"Breadcrumb navigation"}><Link href={V3.home}>{"Home"}</Link><span>/</span><span>{"Academy"}</span></nav><span dir="ltr" className={styles.academyWord} aria-hidden="true">TX ACADEMY</span><Reveal><h1>{copy.intro.title}</h1><p>{copy.intro.lead}</p><Link href="#tracks" className={styles.solidLink}>{"Academy learning areas "}<Arrow /></Link></Reveal></div>
    </header>
    <section id="tracks" className={`${styles.wrap} ${styles.tracksSection}`}><SectionHeading label={"Academy learning areas"} title={"Three areas, with content shaped around your needs."} lead={"These topics are suggested paths for discussion and customization, rather than scheduled programs or professional accreditation."} />
      <nav className={styles.trackNav} aria-label={"Academy learning areas"}>{copy.tracks.map((track, index) => <a href={`#${track.id}`} key={track.id}><span>0{index + 1}</span>{track.title}<span>↓</span></a>)}</nav>
      <div className={styles.learningTracks}>{copy.tracks.map((track, index) => <Reveal key={track.id}><article id={track.id} className={styles.learningTrack}><div className={styles.trackNumber} aria-hidden="true">0{index + 1}<Image src={track.icon} alt="" width={52} height={52} /></div><div className={styles.trackMain}><p className={styles.smallLabel}>{track.audience}</p><h2>{track.title}</h2><p>{track.text}</p><Link href={contactHref("academy")} className={styles.lineLink}>{"Request this service "}<Arrow /></Link></div><div className={styles.trackTopics}><h3>{"Topics we can build on"}</h3><ul>{track.topics.map(topic => <li key={topic}><span aria-hidden="true">↖</span>{topic}</li>)}</ul></div></article></Reveal>)}</div>
    </section>
    <section className={styles.learningBand}><div className={styles.wrap}><SectionHeading label={copy.modes.eyebrow} title={copy.modes.title} /><FeatureList items={copy.modes.items} dark /></div></section>
    <Journey steps={copy.steps} label={"The learning journey"} />
    <PageFaq items={copy.faqs} /><PageCta {...copy.cta} />
  </>;
}
