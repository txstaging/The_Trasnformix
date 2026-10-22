"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { WORK_FILTERS, type WorkFilter } from "@/components/sections/works/projects";
import { Arrow, ease, Reveal } from "./Motion";
import { PageCta, PageIntro } from "./PagePrimitives";
import { V3 } from "./routes";
import styles from "./Experience.module.css";

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
    <PageIntro label="أعمالنا" title="نحوّل تحديات الأعمال إلى حلول رقمية" lead="نجمع بين البيانات، الذكاء الاصطناعي، التصميم وتطوير الأنظمة لبناء حلول تحقق أثرًا حقيقيًا." number="05" />
    <section className={`${styles.wrap} ${styles.worksCollection}`} aria-label="أعمالنا">
      <div className={styles.worksToolbar}><div role="group" aria-label="تصفية الأعمال حسب الخدمة">{WORK_FILTERS.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{item.projects.length.toString().padStart(2, "0")}</span></button>)}</div><label className={styles.workSearch} htmlFor={uid}><span>ابحث عن مشروع</span><input id={uid} type="search" placeholder="ابحث عن مشروع" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
      <p className={styles.resultCount} aria-live="polite">{projects.length} / {WORK_FILTERS[0].projects.length}</p>
      <motion.div layout className={styles.collectionGrid}><AnimatePresence mode="popLayout" initial={false}>{projects.map((project, index) => <motion.article layout key={project.key} className={styles.collectionProject} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.4, ease }}>
        <Link href={`${V3.works}/${project.key}`}><div className={styles.collectionImage}><Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 90vw, 45vw" /><span className={styles.collectionOpen}><Arrow /></span></div><div className={styles.collectionCaption}><div><p>{project.tags[0]?.label}</p><h2 dir="auto">{project.title}</h2></div><span dir="ltr">{String(index + 1).padStart(2, "0")}</span></div><ul>{project.tags.map(tag => <li key={tag.label}>{tag.label}</li>)}</ul></Link>
      </motion.article>)}</AnimatePresence></motion.div>
      {projects.length === 0 && <div className={styles.emptyWorks}><span aria-hidden="true">∅</span><p>{query ? "لا توجد أعمال تطابق بحثك." : "لا توجد أعمال في هذا القسم حاليًا."}</p><button type="button" className={styles.lineLink} onClick={() => { setFilter("all"); setQuery(""); }}>الكل <Arrow /></button></div>}
    </section>
    <PageCta title="من التحدي إلى حل رقمي يقود نموك" text="نتبع منهجية عمل واضحة تنطلق من دراسة واقع أعمالك، وتكتمل بتطوير حلول مرنة وقابلة للتوسع تواكب تطلعاتك المستقبلية." />
  </>;
}

export function ProjectPage({ slug }: { slug: string }) {
  const all = WORK_FILTERS[0].projects;
  const index = all.findIndex(project => project.key === slug);
  const project = all[index];
  const next = all[(index + 1) % all.length];
  return <>
    <header className={`${styles.wrap} ${styles.projectHero}`}><nav className={styles.breadcrumb} aria-label="مسار التنقل"><Link href={V3.home}>الرئيسية</Link><span>/</span><Link href={V3.works}>أعمالنا</Link></nav><Reveal><p className={styles.smallLabel}>{project.tags[0]?.label}</p><h1 dir="auto">{project.title}</h1></Reveal><div className={styles.projectMeta}><ul>{project.tags.map(tag => <li key={tag.label}>{tag.label}</li>)}</ul><span dir="ltr">{String(index + 1).padStart(2, "0")} / {all.length}</span></div></header>
    <figure className={`${styles.wrap} ${styles.caseArtwork}`}><Image src={project.image} alt={project.title} width={1600} height={1200} sizes="95vw" loading="eager" /><figcaption><h2 dir="auto">{project.title}</h2>{project.behanceUrl && <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className={styles.lineLink}>عرض المزيد <Arrow /></a>}</figcaption></figure>
    <nav className={`${styles.wrap} ${styles.projectNavigation}`} aria-label="أعمالنا"><Link href={V3.works} className={styles.lineLink}>أعمالنا <Arrow /></Link><Link href={`${V3.works}/${next.key}`}><span dir="auto">{next.title}</span><Arrow /></Link></nav>
  </>;
}
