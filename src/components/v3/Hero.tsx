"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { V3 } from "./routes";
import { Arrow, ease } from "./Motion";
import styles from "./HomeV3.module.css";

function Sculpture() {
  return (
    <svg viewBox="0 0 540 540" fill="none" className={styles.sculpture} aria-hidden="true">
      <defs>
        <linearGradient id="v3-metal" x1="90" y1="50" x2="440" y2="490" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" /><stop offset=".28" stopColor="#c1d3f3" /><stop offset=".46" stopColor="#f9fcff" /><stop offset=".61" stopColor="#819cc8" /><stop offset=".8" stopColor="#dce9ff" /><stop offset="1" stopColor="#91a9d0" />
        </linearGradient>
        <linearGradient id="v3-cyan" x1="150" y1="450" x2="460" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1178e5" /><stop offset=".5" stopColor="#00b5df" /><stop offset="1" stopColor="#99f3ff" />
        </linearGradient>
        <linearGradient id="v3-edge" x1="20" y1="20" x2="500" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d5e7ff" /><stop offset="1" stopColor="#536f9c" />
        </linearGradient>
      </defs>
      <path d="m93 140 83-35 286 300-88 36L93 140Z" fill="#051c57" opacity=".18" transform="translate(4 38)" />
      <path d="m77 129 85-35 282 303-86 35L77 129Z" fill="url(#v3-metal)" />
      <path d="m358 432 86-35v30l-86 35L77 159v-30l281 303Z" fill="url(#v3-edge)" />
      <path d="m130 444 70 24L466 162l-14-85-93 16 37 31-266 320Z" fill="#03275a" opacity=".22" transform="translate(-3 24)" />
      <path d="m116 423 70 24L452 141l-14-85-93 16 37 31-266 320Z" fill="url(#v3-cyan)" />
      <path d="m116 423 70 24v25l-70-24v-25Zm70 24 266-306v25L186 472v-25Z" fill="#087fc3" />
      <path d="m116 423 70 24L452 141l-14-85-93 16" stroke="#b7f5ff" strokeWidth="1.5" />
      <path d="m77 129 85-35 132 142" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(x, { stiffness: 90, damping: 24 });
  const rotateX = useSpring(y, { stiffness: 90, damping: 24 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [-8, reduced ? -8 : 5]);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="v3-hero-title">
      <div className={styles.heroTopline}><span>TRANSFORMIX®</span><span dir="ltr">DIGITAL SOLUTION — 03</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <motion.div initial={false} animate={ready && !reduced ? { y: [35, 0], opacity: [0.2, 1] } : {}} transition={{ duration: 1, ease }}>
            <h1 id="v3-hero-title">شريكك التقني<br />لتطوير <span>الأعمال<svg viewBox="0 0 310 15" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M3 11C73 1 215 0 307 8" fill="none" stroke="currentColor" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: ready ? 1 : 0 }} transition={{ delay: 0.5, duration: 0.85, ease }} /></svg></span></h1>
          </motion.div>
          <motion.div initial={false} animate={ready && !reduced ? { y: [24, 0], opacity: [0.2, 1] } : {}} transition={{ delay: 0.15, duration: 1, ease }}>
            <p className={styles.heroSubtitle}>من أتمتة العمليات بالذكاء الاصطناعي إلى المنصات الرقمية المتكاملة</p>
            <p className={styles.heroLead}>معنا في Transformix ندمج بين حلول الذكاء الاصطناعي، تطوير البرمجيات، وأنظمة ERP لنلغي الهدر التشغيلي ونمنحك تجارب رقمية تقود نمو شركتك بثقة وبقرارات مبنية على البيانات</p>
            <div className={styles.heroActions}>
              <Link className={styles.button} href={V3.contact}>ناقش مشروعك مع خبير تقني <Arrow /></Link>
              <Link href={V3.works} className={styles.textLink}>عرض سابقة الاعمال <Arrow /></Link>
            </div>
          </motion.div>
        </div>
        <div className={styles.artStage} onPointerMove={event => {
          if (reduced || event.pointerType !== "mouse") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
          y.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
        }} onPointerLeave={() => { x.set(0); y.set(0); }}>
          <div className={styles.artGrid} aria-hidden="true" />
          <span className={styles.artCoordinate} dir="ltr" aria-hidden="true">[ TX — 003 ]</span>
          <motion.div className={styles.artObject} style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, y: artY, rotate: artRotate }}><Sculpture /></motion.div>
          <div className={styles.artFooter} aria-hidden="true"><span>THE<br /><b>TRANSFORMIX</b></span><svg width="42" height="42" viewBox="0 0 42 42"><path d="M21 1v40M1 21h40" stroke="currentColor" /></svg></div>
        </div>
      </div>
      <div className={styles.heroFoot}><a href="#showreel" aria-label="عرض أعمال Transformix"><span className={styles.scrollArrow} aria-hidden="true">↓</span><span>حلول رقمية متكاملة تدعم نمو أعمالك</span></a><span dir="ltr">01 / 03</span></div>
    </section>
  );
}

export function Showreel() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const clip = useTransform(scrollYProgress, [0, 0.85], ["inset(0 7% 0 7% round 8px)", "inset(0 0% 0 0% round 0px)"]);

  return (
    <section id="showreel" ref={ref} className={styles.showreel} aria-label="عرض أعمال Transformix">
      <motion.div className={styles.film} style={{ clipPath: reduced ? undefined : clip }}>
        <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/images/work-reem.png" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.filmOverlay} />
        <span className={styles.filmLabel} dir="ltr">TRANSFORMIX / SHOWREEL</span>
        <button className={styles.filmControl} type="button" aria-label={playing ? "إيقاف عرض الأعمال مؤقتًا" : "تشغيل عرض الأعمال"} onClick={() => {
          if (!video.current) return;
          if (playing) video.current.pause();
          else void video.current.play().catch(() => setPlaying(false));
        }}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span></button>
        <p>أعمال تحكي كيف نفكر <Arrow /></p>
      </motion.div>
    </section>
  );
}
