"use client";

import { motion, MotionConfig, useScroll } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BrandIntro } from "@/english/components/v3/BrandIntro";
import { Footer } from "@/english/components/v3/Footer";
import { Navbar } from "@/english/components/v3/Navbar";
import { ease } from "@/english/components/v3/Motion";
import styles from "@/english/components/v3/HomeV3.module.css";

const OpeningContext = createContext(true);
export const useOpeningReady = () => useContext(OpeningContext);

function SiteFrame({ children, home }: { children: ReactNode; home: boolean }) {
  const [intro, setIntro] = useState<"pending" | "loading" | "done">(home ? "pending" : "done");
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!home) return;
    // Each home entry owns a fresh opening, including a return from an inner page.
    const frame = requestAnimationFrame(() => setIntro("loading"));
    const replay = (event: PageTransitionEvent) => { if (event.persisted) setIntro("loading"); };
    window.addEventListener("pageshow", replay);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pageshow", replay); };
  }, [home]);

  return <OpeningContext.Provider value={intro === "done"}>
    <div id="v3-top" className={styles.page} data-intro-state={intro}>
      {intro === "loading" && <BrandIntro onComplete={() => setIntro("done")} />}
      <div inert={intro === "loading"}>
        <a className={styles.skipLink} href="#v3-main">{"Skip to content"}</a>
        <motion.div className={styles.readingProgress} style={{ scaleX: scrollYProgress }} aria-hidden="true" />
        <Navbar />
        <motion.main id="v3-main" initial={false}
          animate={home || reduced ? undefined : { opacity: [0.7, 1], y: [16, 0] }}
          transition={{ duration: 0.6, ease }}>
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  </OpeningContext.Provider>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <MotionConfig reducedMotion="user"><SiteFrame key={pathname} home={pathname === "/en/v3"}>{children}</SiteFrame></MotionConfig>;
}
