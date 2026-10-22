"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useEffect, useState } from "react";
import { sectorsCopy } from "@/english/components/v3/page-content";
import { Arrow, ease, Reveal } from "@/english/components/v3/Motion";
import { FeatureList, PageCta, PageIntro, SectionHeading } from "@/english/components/v3/PagePrimitives";
import { contactHref } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/Experience.module.css";

export function SectorsPage() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const sectors = sectorsCopy.sectors;
  const current = sectors[active];

  useEffect(() => {
    const sync = () => {
      const index = sectors.findIndex(sector => `#${sector.id}` === window.location.hash);
      if (index >= 0) setActive(index);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", sync); };
  }, [sectors]);

  return <>
    <PageIntro label={"Industries"} {...sectorsCopy.intro} number="04" />
    <section className={styles.sectorExplorer} aria-label={"Industries"}>
      <div className={styles.sectorLandscape}>
        <AnimatePresence initial={false}><motion.div key={current.id} initial={reduced ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}><Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" loading="eager" /></motion.div></AnimatePresence>
        <div className={styles.sectorLandscapeShade} /><div className={`${styles.wrap} ${styles.sectorLandscapeCopy}`}><span dir="ltr" aria-hidden="true">0{active + 1} / 04</span><h2>{current.title}</h2><p>{current.lead}</p></div>
      </div>
      <div className={`${styles.wrap} ${styles.sectorSelector}`} role="group" aria-label={"Choose an industry"}>{sectors.map((sector, index) => <button id={sector.id} key={sector.id} type="button" aria-pressed={active === index} aria-controls="v3-sector-details" onClick={() => { setActive(index); window.history.replaceState(null, "", `#${sector.id}`); }}><span>0{index + 1}</span>{sector.title}<Arrow /></button>)}</div>
      <div id="v3-sector-details" className={`${styles.wrap} ${styles.sectorDetails}`} aria-live="polite">
        <Reveal key={current.id}><div className={styles.sectorDetailsTitle}><Image src={current.icon} alt="" width={42} height={42} /><h2>{current.title}</h2><Link href={contactHref()} className={styles.lineLink}>{"Request this service "}<Arrow /></Link></div>
          <div className={styles.sectorDetailsGrid}><div><h3>{"Industry priorities"}</h3><ol>{current.priorities.map((priority, index) => <li key={priority}><span>0{index + 1}</span>{priority}</li>)}</ol></div><div><h3>{"How can we help?"}</h3><p>{current.services}</p></div></div>
        </Reveal>
      </div>
    </section>
    <section className={`${styles.wrap} ${styles.sectorPrinciples}`}><SectionHeading label={sectorsCopy.principles.eyebrow} title={sectorsCopy.principles.title} /><FeatureList items={sectorsCopy.principles.items} /></section>
    <PageCta {...sectorsCopy.cta} />
  </>;
}
