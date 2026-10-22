"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { stats, faqs, reviews, clientLogos, partnerLogos, processSteps } from "@/components/v3/content";
import { sectorsCopy, servicesCopy } from "@/components/v3/page-content";
import { serviceCatalog } from "@/components/v3/service-catalog";
import { WORK_FILTERS } from "@/components/sections/works/projects";
import { Arrow, ease, MotionSection, Reveal, Rule } from "./Motion";
import { Button, Cta, Faq, Features, Heading, Journey, LogoRail, Photo, Showreel } from "./Elements";
import { RouteLink } from "./SiteShell";
import styles from "./V4.module.css";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  return <section ref={ref} className={styles.hero} data-v4-section="hero">
    <Showreel /><div className={styles.heroShade} />
    <motion.div className={`${styles.wrap} ${styles.heroContent}`} style={reduced ? undefined : { y, opacity }}>
      <div className={styles.eyebrow}><span>TRANSFORMIX®</span><span dir="ltr">BUSINESS × TECHNOLOGY</span></div>
      <h1>شريكك التقني<br /><span>لتطوير الأعمال</span><i aria-hidden="true">↙</i></h1>
      <div className={styles.heroBottom}><p>من أتمتة العمليات بالذكاء الاصطناعي إلى المنصات الرقمية المتكاملة</p><Button href="/v4/contact">ناقش مشروعك مع خبير تقني</Button><a href="#v4-manifesto" className={styles.heroScroll} aria-label="استكشف الصفحة">استكشف <span>↓</span></a></div>
    </motion.div><div className={styles.heroIndex} dir="ltr">INDEPENDENT THINKING. CONNECTED SOLUTIONS.</div>
  </section>;
}

function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return <MotionSection className={`${styles.wrap} ${styles.homeServices}`} mode="slide"><Heading label="ما نقدمه" title="شريكك التقني الشامل" lead="نبدء من الفكرة و صولاً إلى التنفيذ." number="02" />
    <div className={styles.servicesStage}><div className={styles.servicePreview} aria-hidden="true"><AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease }}><Photo src={serviceCatalog[active].image} alt="" contain /><span dir="ltr">{serviceCatalog[active].label}</span></motion.div></AnimatePresence></div>
    <div className={styles.serviceRows}>{serviceCatalog.map((service, i) => <Reveal key={service.slug}><RouteLink href={`/v4/services/${service.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} data-active={active === i}><span dir="ltr">0{i + 1}</span><div><h3>{servicesCopy.chapters[i].title}</h3><p>{servicesCopy.chapters[i].text}</p></div><Arrow /></RouteLink></Reveal>)}<RouteLink href="/v4/services/mobile-development" onMouseEnter={() => setActive(1)}><span dir="ltr">05</span><div><h3>تطوير تطبيقات الموبايل</h3><p>نطوّر تطبيقات iOS وAndroid بتجارب استخدام سلسة، ووظائف مخصصة تلبي احتياجات أعمالك وعملائك.</p></div><Arrow /></RouteLink></div></div>
  </MotionSection>;
}

export function Home() {
  const [review, setReview] = useState(0);
  const reduced = useReducedMotion();
  const featured = WORK_FILTERS[0].projects.filter(p => ["reem", "belli", "kuni"].includes(p.key));
  return <>
    <Hero />
    <LogoRail items={clientLogos} title="يثق بنا رواد الأعمال والشركات" />
    <MotionSection id="v4-manifesto" className={`${styles.wrap} ${styles.manifesto}`} mode="rise"><div className={styles.eyebrow}><span>من نحن</span><span dir="ltr">01 / THE POINT OF VIEW</span></div><h2>نقود تحولك الرقمي بحلول تجمع بين <span>ذكاء التحليل</span> وابتكار الحلول</h2><div className={styles.manifestoBottom}><span className={styles.cross} aria-hidden="true">✳</span><div><p>معنا في Transformix ندمج بين حلول الذكاء الاصطناعي، تطوير البرمجيات، وأنظمة ERP لنلغي الهدر التشغيلي ونمنحك تجارب رقمية تقود نمو شركتك بثقة وبقرارات مبنية على البيانات</p><p>ندرس التحديات المعقدة لتكون فرص نمو حقيقية. نجمع في Transformix بين هندسة البرمجيات، تحليلات البيانات المتقدمة، وحلول الذكاء الاصطناعي والأتمتة لنبني تجارب رقمية فائقة التطور.</p><Button quiet href="/v4/about">من نحن</Button></div></div><div className={styles.stats}>{stats.map(stat => <Reveal key={stat.title}><article><span dir="ltr">{stat.value}<sup>+</sup></span><h3>{stat.title}</h3><p>{stat.text}</p></article></Reveal>)}</div></MotionSection>
    <Services />
    <MotionSection className={styles.workFeature} mode="mask"><div className={styles.wrap}><div className={styles.sectionTop}><Heading label="أعمال مختارة" title="أعمال تحكي كيف نفكر" number="03" /><Button quiet href="/v4/works">عرض سابقة الاعمال</Button></div><div className={styles.featuredWorks}>{featured.map((project, i) => <Reveal key={project.key} className={styles.featuredProject}><RouteLink href={`/v4/works/${project.key}`}><Photo src={project.image} alt={project.title} /><div className={styles.projectCaption}><span dir="ltr">0{i + 1}</span><h3 dir="auto">{project.title}</h3><Arrow /></div><p>{project.tags.map(tag => tag.label).join(" / ")}</p></RouteLink></Reveal>)}</div></div></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.connections}`} mode="depth"><Heading label={servicesCopy.challenges.eyebrow} title={servicesCopy.challenges.title} /><p className={styles.lead}>اختر نقطة البداية المناسبة، أو اجمع أكثر من مسار ضمن نطاق واضح يراعي احتياج منشأتك.</p><Features items={servicesCopy.challenges.items} /></MotionSection>
    <Journey steps={processSteps} />
    <MotionSection className={`${styles.wrap} ${styles.homeSectors}`} mode="mask"><div className={styles.sectionTop}><Heading label="القطاعات" title="سياق مختلف، ومنهجية تبدأ بالفهم." /><Button quiet href="/v4/sectors">القطاعات</Button></div><div className={styles.sectorStrip}>{sectorsCopy.sectors.map((sector, i) => <RouteLink href={`/v4/sectors#${sector.id}`} key={sector.id}><Photo src={sector.image.src} alt={sector.image.alt} /><div><span dir="ltr">0{i + 1}</span><h3>{sector.title}</h3><Arrow /></div></RouteLink>)}</div></MotionSection>
    <MotionSection className={styles.academyHome} mode="depth"><Photo src="/v2/images/home-academy.png" alt="جلسة تدريبية لفريق عمل حول طاولة اجتماعات" /><div className={styles.wrap}><p className={styles.eyebrow}>أكاديمية ترانسفورمكس</p><h2>نبني المعرفة التي<br /><span>تتحول إلى ممارسة.</span></h2><p>مسارات معرفية وتطبيقية في التدريب والتأهيل المهني، والصناعة، والتعاونيات السعودية؛ تربط الاحتياج التعلمي بواقع العمل.</p><Button href="/v4/academy">الأكاديمية</Button></div></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.reviews}`} mode="rise"><div className={styles.sectionTop}><Heading label="شهادات" title="ما يقوله شركاؤنا وعملاؤنا" /><span className={styles.quoteMark} aria-hidden="true">“</span></div><AnimatePresence mode="wait" initial={false}><motion.figure key={review} initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}><blockquote>{reviews[review].quote}</blockquote><figcaption>{reviews[review].name}</figcaption></motion.figure></AnimatePresence><div className={styles.reviewControls}><span dir="ltr">0{review + 1} / 0{reviews.length}</span><div><button onClick={() => setReview((review - 1 + reviews.length) % reviews.length)} aria-label="الشهادة السابقة">→</button><button onClick={() => setReview((review + 1) % reviews.length)} aria-label="الشهادة التالية">←</button></div></div><Rule /></MotionSection>
    <LogoRail items={partnerLogos} title="موثوقون عبر منصات وشبكات عالمية" />
    <Faq items={faqs} /><Cta />
  </>;
}
