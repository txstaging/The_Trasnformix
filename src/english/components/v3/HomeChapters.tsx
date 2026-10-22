"use client";

import Image from "next/image";
import Link from "next/link";
import { sectorsCopy, servicesCopy } from "@/english/components/v3/page-content";
import { Arrow, Reveal } from "@/english/components/v3/Motion";
import { V3, contactHref } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/Experience.module.css";

export function HomeChapters() {
  return <>
    <section className={`${styles.wrap} ${styles.integration}`}>
      <div className={styles.eyebrow}><span>{servicesCopy.challenges.eyebrow}</span><span dir="ltr">THE RIGHT CONNECTION</span></div>
      <div className={styles.integrationIntro}><Reveal><h2>{servicesCopy.challenges.title}</h2></Reveal><p>{"Choose the right starting point, or combine services within a clear scope that fits your organization's needs."}</p></div>
      <div className={styles.challengeGrid}>{servicesCopy.challenges.items.map((item, index) => <Reveal key={item.title} delay={index * 0.1}><Link href={contactHref(["data", "web", "erp"][index])}><span className={styles.challengeNumber}>0{index + 1}</span><Image src={item.icon} alt="" width={40} height={40} /><h3>{item.title}</h3><p>{item.text}</p><Arrow /></Link></Reveal>)}</div>
    </section>
    <section className={styles.sectorRibbon}>
      <div className={styles.wrap}><div className={styles.sectionHead}><Reveal><h2>{"Different contexts,"}<br /><em>{"an approach that starts with understanding."}</em></h2></Reveal><Link href={V3.sectors} className={styles.lineLink}>{"Industries "}<Arrow /></Link></div>
        <div className={styles.sectorTiles}>{sectorsCopy.sectors.map((sector, index) => <Link href={`${V3.sectors}#${sector.id}`} key={sector.id}><div><Image src={sector.image.src} alt={sector.image.alt} fill sizes="(max-width: 640px) 45vw, 24vw" /></div><span className={styles.sectorTileIndex}>0{index + 1}</span><h3>{sector.title}</h3><Arrow /></Link>)}</div>
      </div>
    </section>
    <section className={`${styles.wrap} ${styles.academyTeaser}`}>
      <Reveal className={styles.academyTeaserCopy}><p className={styles.smallLabel}>{"Transformix Academy"}</p><h2>{"Building knowledge"}<br /><em>{"you can put into practice."}</em></h2><p>{"Practical learning paths in vocational training, manufacturing, and Saudi cooperatives, connecting learning needs with real work."}</p><Link href={V3.academy} className={styles.solidLink}>{"Academy "}<Arrow /></Link></Reveal>
      <div className={styles.academyTeaserImage}><Image src="/v2/images/home-academy.png" alt={"A team training session around a meeting table"} fill sizes="(max-width: 800px) 90vw, 600px" /><span aria-hidden="true">TX<br />ACADEMY</span></div>
    </section>
  </>;
}
