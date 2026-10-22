"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useRef, useState } from "react";
import { Reveal, ease } from "@/english/components/v3/Motion";
import { tajawal } from "@/lib/fonts";
import { SERVICE_CATEGORIES, getServiceWebsite } from "@/english/lib/serviceNavigation";
import styles from "@/english/components/sections/ServicesGrid.module.css";

const creativeService = SERVICE_CATEGORIES.find(service => service.key === "marketing")!;

// Preserve version 1's five services and their existing destinations.
const SERVICES = [
  {
    key: "data",
    title: "Data and artificial intelligence",
    text: "We turn your business data into clear insights that reveal growth opportunities and support decision-making.",
    image: "/images/services/provided/dashboard.webp",
    href: getServiceWebsite("data"),
  },
  {
    key: "web",
    title: "Website and e-commerce development",
    text: "Professional, flexible websites and online stores that are easy to manage, reflect your identity, and support business growth.",
    image: "/images/services/refined/web.webp",
    href: getServiceWebsite("web"),
  },
  {
    key: "erp",
    title: "ERP systems and business automation",
    text: "We connect your departments through an integrated ERP system designed around your operational needs.",
    image: "/images/services/refined/erp.webp",
    href: getServiceWebsite("erp"),
  },
  {
    key: "mobile",
    title: "Mobile app development",
    text: "We develop iOS and Android applications with smooth user experiences and custom features that serve your business and customers.",
    image: "/images/services/provided/mobile-app.webp",
    href: undefined,
  },
  {
    key: "marketing",
    title: "Creative studio",
    text: creativeService.text,
    image: "/images/work-kun.png",
    href: creativeService.website,
  },
];

const number = (index: number) => String(index + 1).padStart(2, "0");

/** Version 3's process layout, presenting version 1's service content. */
export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 35%", "end 75%"] });

  useMotionValueEvent(scrollYProgress, "change", value => {
    setActive(Math.max(0, Math.min(SERVICES.length - 1, Math.floor(value * SERVICES.length))));
  });

  return (
    <section id="services" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="services-title" data-flow="outro">
      <Reveal className={styles.head}>
        <h2 id="services-title">{"Your complete technology partner"}</h2>
        <p className={styles.lead}>{"We shape your idea and support you through implementation."}</p>
      </Reveal>
      <div ref={ref} className={styles.layout}>
        <div className={styles.aside}>
          <div className={styles.art} aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className={styles.image}
                key={active}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{ duration: reduced ? 0 : 0.25, ease }}
              >
                <Image src={SERVICES[active].image} alt="" fill sizes="(max-width: 1200px) 40vw, 540px" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <ol className={styles.list}>
          {SERVICES.map((service, index) => (
            <li key={service.key} className={styles.item} data-active={active === index}>
              <div className={styles.rail} aria-hidden="true">
                <span>{number(index)}</span>
                <motion.div initial={false} animate={{ scaleY: reduced || active >= index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.65, ease }} />
              </div>
              <Reveal>
                <div className={styles.copy}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  {service.href && (
                    <a href={service.href} className={styles.link} target="_blank" rel="noopener noreferrer"
                      aria-label={`${service.title} (opens in a new tab)`}>
                      {" Show more "}<span aria-hidden="true">↖</span>
                    </a>
                  )}
                  <Image className={styles.mobileImage} src={service.image} alt={service.title} width={480} height={320}
                    sizes="(max-width: 640px) 80vw, 320px" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
