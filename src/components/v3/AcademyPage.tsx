"use client";

import Image from "next/image";
import Link from "next/link";
import { academyCopy } from "./page-content";
import { Arrow, Reveal } from "./Motion";
import { FeatureList, Journey, PageCta, PageFaq, SectionHeading } from "./PagePrimitives";
import { V3, contactHref } from "./routes";
import styles from "./Experience.module.css";

export function AcademyPage() {
  const copy = academyCopy;
  return <>
    <header className={styles.academyHero}>
      <Image src="/v2/images/academy-hero.png" alt="مدرب يشرح على لوح أبيض لفريق في قاعة تدريب" fill sizes="100vw" loading="eager" />
      <div className={styles.academyHeroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="مسار التنقل"><Link href={V3.home}>الرئيسية</Link><span>/</span><span>الأكاديمية</span></nav><span dir="ltr" className={styles.academyWord} aria-hidden="true">TX ACADEMY</span><Reveal><h1>{copy.intro.title}</h1><p>{copy.intro.lead}</p><Link href="#tracks" className={styles.solidLink}>مجالات الأكاديمية <Arrow /></Link></Reveal></div>
    </header>
    <section id="tracks" className={`${styles.wrap} ${styles.tracksSection}`}><SectionHeading label="مجالات الأكاديمية" title="ثلاثة مجالات، يتشكل محتواها حول احتياجك." lead="الموضوعات التالية مسارات مقترحة للنقاش والتخصيص، وليست إعلانًا عن برامج مجدولة أو اعتماد مهني." />
      <nav className={styles.trackNav} aria-label="مجالات الأكاديمية">{copy.tracks.map((track, index) => <a href={`#${track.id}`} key={track.id}><span>0{index + 1}</span>{track.title}<span>↓</span></a>)}</nav>
      <div className={styles.learningTracks}>{copy.tracks.map((track, index) => <Reveal key={track.id}><article id={track.id} className={styles.learningTrack}><div className={styles.trackNumber} aria-hidden="true">0{index + 1}<Image src={track.icon} alt="" width={52} height={52} /></div><div className={styles.trackMain}><p className={styles.smallLabel}>{track.audience}</p><h2>{track.title}</h2><p>{track.text}</p><Link href={contactHref("academy")} className={styles.lineLink}>اطلب الخدمة <Arrow /></Link></div><div className={styles.trackTopics}><h3>موضوعات يمكن البناء عليها</h3><ul>{track.topics.map(topic => <li key={topic}><span aria-hidden="true">↖</span>{topic}</li>)}</ul></div></article></Reveal>)}</div>
    </section>
    <section className={styles.learningBand}><div className={styles.wrap}><SectionHeading label={copy.modes.eyebrow} title={copy.modes.title} /><FeatureList items={copy.modes.items} dark /></div></section>
    <Journey steps={copy.steps} label="رحلة التعلم" />
    <PageFaq items={copy.faqs} /><PageCta {...copy.cta} />
  </>;
}
