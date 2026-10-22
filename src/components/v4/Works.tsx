"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { WORK_FILTERS, type WorkFilter } from "@/components/sections/works/projects";
import { Arrow, ease, MotionSection } from "./Motion";
import { Button, Cta, Intro, Photo } from "./Elements";
import { RouteLink } from "./SiteShell";
import styles from "./V4.module.css";

const normalise = (value: string) => value.toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\u064B-\u0652]/g, "").trim();

export function WorksPage() {
  const [filter, setFilter] = useState<WorkFilter["id"]>("all");
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();
  const uid = useId();
  const projects = (WORK_FILTERS.find(item => item.id === filter) ?? WORK_FILTERS[0]).projects.filter(project => normalise(query).split(/\s+/).every(word => normalise([project.title, ...project.tags.map(tag => tag.label)].join(" ")).includes(word)));
  return <><Intro label="أعمالنا" title="نحوّل تحديات الأعمال إلى حلول رقمية" lead="نجمع بين البيانات، الذكاء الاصطناعي، التصميم وتطوير الأنظمة لبناء حلول تحقق أثرًا حقيقيًا." number="03" />
    <MotionSection className={`${styles.wrap} ${styles.catalogue}`} mode="rise"><div className={styles.worksTools}><div role="group" aria-label="تصفية الأعمال حسب الخدمة">{WORK_FILTERS.map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span dir="ltr">{String(item.projects.length).padStart(2, "0")}</span></button>)}</div><label htmlFor={uid}><span>ابحث عن مشروع</span><input id={uid} type="search" placeholder="ابحث عن مشروع" value={query} onChange={event => setQuery(event.target.value)} /></label></div><p className={styles.catalogueCount} aria-live="polite">{projects.length} / {WORK_FILTERS[0].projects.length}</p>
    <motion.div layout className={styles.worksGrid}><AnimatePresence mode="popLayout" initial={false}>{projects.map((project, i) => <motion.article layout key={project.key} initial={reduced ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: reduced ? 0 : 0.5, ease }}><RouteLink href={`/v4/works/${project.key}`}><Photo src={project.image} alt={project.title} /><div className={styles.projectCaption}><span dir="ltr">{String(i + 1).padStart(2, "0")}</span><h2 dir="auto">{project.title}</h2><Arrow /></div><p>{project.tags.map(tag => tag.label).join(" / ")}</p></RouteLink></motion.article>)}</AnimatePresence></motion.div>
    {!projects.length && <div className={styles.empty}><span aria-hidden="true">∅</span><p>{query ? "لا توجد أعمال تطابق بحثك." : "لا توجد أعمال في هذا القسم حاليًا."}</p><button onClick={() => { setFilter("all"); setQuery(""); }}>الكل ↗</button></div>}</MotionSection><Cta /></>;
}

export function ProjectPage({ slug }: { slug: string }) {
  const all = WORK_FILTERS[0].projects;
  const index = all.findIndex(project => project.key === slug);
  const project = all[index];
  const next = all[(index + 1) % all.length];
  return <><Intro label="أعمالنا" title={project.title} lead={project.tags.map(tag => tag.label).join(" / ")} number={`03—${String(index + 1).padStart(2, "0")}`}><Button quiet href="/v4/works">أعمالنا</Button></Intro>
    <MotionSection className={`${styles.wrap} ${styles.case}`} mode="mask"><figure><Image src={project.image} alt={project.title} width={1600} height={1200} sizes="95vw" loading="eager" /><figcaption><h2 dir="auto">{project.title}</h2>{project.behanceUrl && <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer">عرض المزيد <Arrow /></a>}</figcaption></figure></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.nextProject}`} mode="depth"><p className={styles.eyebrow}>المشروع التالي / NEXT</p><RouteLink href={`/v4/works/${next.key}`}><span dir="auto">{next.title}</span><Arrow /><Photo src={next.image} alt={next.title} /></RouteLink></MotionSection></>;
}
