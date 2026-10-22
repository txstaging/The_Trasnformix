"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useId, useState } from "react";
import { WORK_FILTERS, type WorkFilter } from "@/english/components/sections/works/projects";
import { Arrow, ease, Reveal } from "@/english/components/v3/Motion";
import { PageCta, PageIntro } from "@/english/components/v3/PagePrimitives";
import { V3 } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/Experience.module.css";

const normalise = (text: string) => text.toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\u064B-\u0652]/g, "").trim();

export function WorksPage() {
  const [filter, setFilter] = useState<WorkFilter["id"]>("all");
  const [query, setQuery] = useState("");
  const uid = useId();
  const reduced = useReducedMotion();
  const projects = (WORK_FILTERS.find(item => item.id === filter) ?? WORK_FILTERS[0]).projects.filter(project => {
    const value = normalise([project.title, ...project.tags.map(tag => tag.label)].join(" "));
    return normalise(query).split(/\s+/).every(word => value.includes(word));
  });

  return <>
    <PageIntro label={"Our work"} title={"Turning business challenges into digital solutions"} lead={"We combine data, AI, design, and systems development to build solutions that make a real impact."} number="05" />
    <section className={`${styles.wrap} ${styles.worksCollection}`} aria-label={"Our work"}>
      <div className={styles.worksToolbar}><div role="group" aria-label={"Filter projects by service"}>{WORK_FILTERS.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{item.projects.length.toString().padStart(2, "0")}</span></button>)}</div><label className={styles.workSearch} htmlFor={uid}><span>{"Search projects"}</span><input id={uid} type="search" placeholder={"Search projects"} value={query} onChange={event => setQuery(event.target.value)} /></label></div>
      <p className={styles.resultCount} aria-live="polite">{projects.length} / {WORK_FILTERS[0].projects.length}</p>
      <motion.div layout className={styles.collectionGrid}><AnimatePresence mode="popLayout" initial={false}>{projects.map((project, index) => <motion.article layout key={project.key} className={styles.collectionProject} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.4, ease }}>
        <Link href={`${V3.works}/${project.key}`}><div className={styles.collectionImage}><Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 90vw, 45vw" /><span className={styles.collectionOpen}><Arrow /></span></div><div className={styles.collectionCaption}><div><p>{project.tags[0]?.label}</p><h2 dir="auto">{project.title}</h2></div><span dir="ltr">{String(index + 1).padStart(2, "0")}</span></div><ul>{project.tags.map(tag => <li key={tag.label}>{tag.label}</li>)}</ul></Link>
      </motion.article>)}</AnimatePresence></motion.div>
      {projects.length === 0 && <div className={styles.emptyWorks}><span aria-hidden="true">∅</span><p>{query ? "No projects match your search." : "There are no projects in this category yet."}</p><button type="button" className={styles.lineLink} onClick={() => { setFilter("all"); setQuery(""); }}>{"All "}<Arrow /></button></div>}
    </section>
    <PageCta title={"From your challenge to a digital solution that drives growth"} text={"Our process starts with understanding your business and leads to flexible, scalable solutions that support your future ambitions."} />
  </>;
}

export function ProjectPage({ slug }: { slug: string }) {
  const all = WORK_FILTERS[0].projects;
  const index = all.findIndex(project => project.key === slug);
  const project = all[index];
  const next = all[(index + 1) % all.length];
  return <>
    <header className={`${styles.wrap} ${styles.projectHero}`}><nav className={styles.breadcrumb} aria-label={"Breadcrumb navigation"}><Link href={V3.home}>{"Home"}</Link><span>/</span><Link href={V3.works}>{"Our work"}</Link></nav><Reveal><p className={styles.smallLabel}>{project.tags[0]?.label}</p><h1 dir="auto">{project.title}</h1></Reveal><div className={styles.projectMeta}><ul>{project.tags.map(tag => <li key={tag.label}>{tag.label}</li>)}</ul><span dir="ltr">{String(index + 1).padStart(2, "0")} / {all.length}</span></div></header>
    <figure className={`${styles.wrap} ${styles.caseArtwork}`}><Image src={project.image} alt={project.title} width={1600} height={1200} sizes="95vw" loading="eager" /><figcaption><h2 dir="auto">{project.title}</h2>{project.behanceUrl && <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className={styles.lineLink}>{"Show more "}<Arrow /></a>}</figcaption></figure>
    <nav className={`${styles.wrap} ${styles.projectNavigation}`} aria-label={"Our work"}><Link href={V3.works} className={styles.lineLink}>{"Our work "}<Arrow /></Link><Link href={`${V3.works}/${next.key}`}><span dir="auto">{next.title}</span><Arrow /></Link></nav>
  </>;
}
