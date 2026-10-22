"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useRef, useState } from "react";
import { processSteps } from "@/english/components/v3/content";
import { ease, Reveal } from "@/english/components/v3/Motion";
import styles from "@/english/components/v3/HomeV3.module.css";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 35%", "end 75%"] });
  useMotionValueEvent(scrollYProgress, "change", value => setActive(Math.min(processSteps.length - 1, Math.floor(value * processSteps.length))));

  return (
    <section id="process" ref={ref} className={`${styles.section} ${styles.process}`} aria-labelledby="v3-process-title">
      <div className={styles.sectionKicker}><span>{"Our methodology"}</span><span dir="ltr">03 / 06</span></div>
      <div className={styles.processGrid}>
        <div className={styles.processAside}>
          <Reveal><h2 id="v3-process-title">{"From your challenge to a solution ready to grow"}</h2><p className={styles.sectionLead}>{"Clear steps that start with understanding your business and lead to a scalable solution"}</p></Reveal>
          <div className={styles.processArt} aria-hidden="true">
            <span className={styles.processBigNumber}>{String(active + 1).padStart(2, "0")}</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className={styles.processImage} key={active} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -12 }} transition={{ duration: 0.25, ease }}>
                <Image src={processSteps[active].image} alt="" fill sizes="480px" />
              </motion.div>
            </AnimatePresence>
            <div className={styles.processArtCaption}><span>{processSteps[active].title}</span><span dir="ltr">{String(active + 1).padStart(2, "0")} / 05</span></div>
          </div>
        </div>
        <ol className={styles.processSteps}>
          {processSteps.map((step, index) => <li key={step.title} className={styles.processStep} data-active={active === index}>
            <div className={styles.stepRail} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><motion.div initial={false} animate={{ scaleY: reduced || active >= index ? 1 : 0 }} transition={{ duration: 0.65, ease }} /></div>
            <Reveal><div className={styles.stepCopy}><h3>{step.title}</h3><p>{step.text}</p><ul>{step.bullets.map((bullet, i) => <li key={i}><span aria-hidden="true">↖</span>{bullet}</li>)}</ul><Image className={styles.mobileStepImage} src={step.image} alt={step.alt} width={480} height={320} sizes="(max-width: 640px) 80vw, 320px" /></div></Reveal>
          </li>)}
        </ol>
      </div>
    </section>
  );
}
