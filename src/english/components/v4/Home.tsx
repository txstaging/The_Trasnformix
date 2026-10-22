"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useRef, useState } from "react";
import { stats, faqs, reviews, clientLogos, partnerLogos, processSteps } from "@/english/components/v3/content";
import { sectorsCopy, servicesCopy } from "@/english/components/v3/page-content";
import { serviceCatalog } from "@/english/components/v3/service-catalog";
import { WORK_FILTERS } from "@/english/components/sections/works/projects";
import { Arrow, ease, MotionSection, Reveal, Rule } from "@/english/components/v4/Motion";
import { Button, Cta, Faq, Features, Heading, Journey, LogoRail, Photo, Showreel } from "@/english/components/v4/Elements";
import { RouteLink } from "@/english/components/v4/SiteShell";
import styles from "@/english/components/v4/V4.module.css";

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
      <h1>{"Your technology partner"}<br /><span>{"for business growth"}</span><i aria-hidden="true">↙</i></h1>
      <div className={styles.heroBottom}><p>{"From AI-powered process automation to integrated digital platforms"}</p><Button href={"/en/v4/contact"}>{"Discuss your project with an expert"}</Button><a href="#v4-manifesto" className={styles.heroScroll} aria-label={"Explore the page"}>{"Explore "}<span>↓</span></a></div>
    </motion.div><div className={styles.heroIndex} dir="ltr">INDEPENDENT THINKING. CONNECTED SOLUTIONS.</div>
  </section>;
}

function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return <MotionSection className={`${styles.wrap} ${styles.homeServices}`} mode="slide"><Heading label={"What we offer"} title={"Your complete technology partner"} lead={"From the first idea to implementation."} number="02" />
    <div className={styles.servicesStage}><div className={styles.servicePreview} aria-hidden="true"><AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease }}><Photo src={serviceCatalog[active].image} alt="" contain /><span dir="ltr">{serviceCatalog[active].label}</span></motion.div></AnimatePresence></div>
    <div className={styles.serviceRows}>{serviceCatalog.map((service, i) => <Reveal key={service.slug}><RouteLink href={`/en/v4/services/${service.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} data-active={active === i}><span dir="ltr">0{i + 1}</span><div><h3>{servicesCopy.chapters[i].title}</h3><p>{servicesCopy.chapters[i].text}</p></div><Arrow /></RouteLink></Reveal>)}<RouteLink href={"/en/v4/services/mobile-development"} onMouseEnter={() => setActive(1)}><span dir="ltr">05</span><div><h3>{"Mobile app development"}</h3><p>{"We develop iOS and Android applications with smooth user experiences and custom features that serve your business and customers."}</p></div><Arrow /></RouteLink></div></div>
  </MotionSection>;
}

export function Home() {
  const [review, setReview] = useState(0);
  const reduced = useReducedMotion();
  const featured = WORK_FILTERS[0].projects.filter(p => ["reem", "belli", "kuni"].includes(p.key));
  return <>
    <Hero />
    <LogoRail items={clientLogos} title={"Trusted by entrepreneurs and businesses"} />
    <MotionSection id="v4-manifesto" className={`${styles.wrap} ${styles.manifesto}`} mode="rise"><div className={styles.eyebrow}><span>{"About us"}</span><span dir="ltr">01 / THE POINT OF VIEW</span></div><h2>{"Driving your digital transformation through "}<span>{"insightful analysis"}</span> {" and innovative solutions"}</h2><div className={styles.manifestoBottom}><span className={styles.cross} aria-hidden="true">✳</span><div><p>{"At Transformix, we combine AI solutions, software development, and ERP systems to reduce operational waste and build digital experiences that support confident, data-informed growth."}</p><p>{"We study complex challenges to uncover real opportunities for growth. At Transformix, we combine software engineering, advanced data analytics, AI, and automation to build sophisticated digital experiences."}</p><Button quiet href={"/en/v4/about"}>{"About us"}</Button></div></div><div className={styles.stats}>{stats.map(stat => <Reveal key={stat.title}><article><span dir="ltr">{stat.value}<sup>+</sup></span><h3>{stat.title}</h3><p>{stat.text}</p></article></Reveal>)}</div></MotionSection>
    <Services />
    <MotionSection className={styles.workFeature} mode="mask"><div className={styles.wrap}><div className={styles.sectionTop}><Heading label={"Selected work"} title={"Work that shows how we think"} number="03" /><Button quiet href={"/en/v4/works"}>{"View our work"}</Button></div><div className={styles.featuredWorks}>{featured.map((project, i) => <Reveal key={project.key} className={styles.featuredProject}><RouteLink href={`/en/v4/works/${project.key}`}><Photo src={project.image} alt={project.title} /><div className={styles.projectCaption}><span dir="ltr">0{i + 1}</span><h3 dir="auto">{project.title}</h3><Arrow /></div><p>{project.tags.map(tag => tag.label).join(" / ")}</p></RouteLink></Reveal>)}</div></div></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.connections}`} mode="depth"><Heading label={servicesCopy.challenges.eyebrow} title={servicesCopy.challenges.title} /><p className={styles.lead}>{"Choose the right starting point, or combine services within a clear scope that fits your organization's needs."}</p><Features items={servicesCopy.challenges.items} /></MotionSection>
    <Journey steps={processSteps} />
    <MotionSection className={`${styles.wrap} ${styles.homeSectors}`} mode="mask"><div className={styles.sectionTop}><Heading label={"Industries"} title={"Different contexts. An approach that starts with understanding."} /><Button quiet href={"/en/v4/sectors"}>{"Industries"}</Button></div><div className={styles.sectorStrip}>{sectorsCopy.sectors.map((sector, i) => <RouteLink href={`/en/v4/sectors#${sector.id}`} key={sector.id}><Photo src={sector.image.src} alt={sector.image.alt} /><div><span dir="ltr">0{i + 1}</span><h3>{sector.title}</h3><Arrow /></div></RouteLink>)}</div></MotionSection>
    <MotionSection className={styles.academyHome} mode="depth"><Photo src="/v2/images/home-academy.png" alt={"A team training session around a meeting table"} /><div className={styles.wrap}><p className={styles.eyebrow}>{"Transformix Academy"}</p><h2>{"Building knowledge"}<br /><span>{"you can put into practice."}</span></h2><p>{"Practical learning paths in vocational training, manufacturing, and Saudi cooperatives, connecting learning needs with real work."}</p><Button href={"/en/v4/academy"}>{"Academy"}</Button></div></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.reviews}`} mode="rise"><div className={styles.sectionTop}><Heading label={"Testimonials"} title={"What our partners and clients say"} /><span className={styles.quoteMark} aria-hidden="true">“</span></div><AnimatePresence mode="wait" initial={false}><motion.figure key={review} initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}><blockquote>{reviews[review].quote}</blockquote><figcaption>{reviews[review].name}</figcaption></motion.figure></AnimatePresence><div className={styles.reviewControls}><span dir="ltr">0{review + 1} / 0{reviews.length}</span><div><button onClick={() => setReview((review - 1 + reviews.length) % reviews.length)} aria-label={"Previous testimonial"}>→</button><button onClick={() => setReview((review + 1) % reviews.length)} aria-label={"Next testimonial"}>←</button></div></div><Rule /></MotionSection>
    <LogoRail items={partnerLogos} title={"Trusted across global platforms and networks"} />
    <Faq items={faqs} /><Cta />
  </>;
}
