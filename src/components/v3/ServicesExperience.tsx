"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { DATA_SERVICE, WEB_SERVICE, MARKETING_SERVICE, ERP_SERVICE } from "@/components/v2/services/content";
import { services } from "./content";
import { Arrow, ease, Reveal } from "./Motion";
import { servicePaths, V3 } from "./routes";
import styles from "./Experience.module.css";

export const serviceStories = [
  { key: "data", title: services[0].title, lead: services[0].text, detail: DATA_SERVICE, href: servicePaths.data, image: "/v2/screens/mcr-dashboard.png", label: "DATA & INTELLIGENCE" },
  { key: "web", title: services[1].title, lead: services[1].text, detail: WEB_SERVICE, href: servicePaths.web, image: "/images/works/belli.png", label: "DIGITAL EXPERIENCES" },
  { key: "erp", title: services[2].title, lead: services[2].text, detail: ERP_SERVICE, href: servicePaths.erp, image: "/images/services-erp-apps.jpg", label: "CONNECTED OPERATIONS" },
  { key: "marketing", title: MARKETING_SERVICE.title, lead: MARKETING_SERVICE.lead, detail: MARKETING_SERVICE, href: servicePaths.marketing, image: "/images/work-kun.png", label: "BRAND & COMMUNICATION" },
];

export function ServicesExperience() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = serviceStories[active];

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % serviceStories.length;
    else if (event.key === "ArrowUp") next = (index + serviceStories.length - 1) % serviceStories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = serviceStories.length - 1;
    else return;
    event.preventDefault(); setActive(next); refs.current[next]?.focus();
  };

  return <section id="services" className={styles.serviceExperience} aria-labelledby="v3-services-title">
    <div className={styles.wrap}>
      <div className={styles.eyebrow}><span>الخدمات</span><span dir="ltr">ONE PARTNER. CONNECTED POSSIBILITIES.</span></div>
      <div className={styles.serviceExperienceHead}><Reveal><h2 id="v3-services-title">شريكك التقني<br /><em>الشامل</em><span className={styles.titlePeriod}>.</span></h2></Reveal><div><p>نبدء من الفكرة و صولاً إلى التنفيذ.</p><Link href={V3.services} className={styles.lineLink}>الخدمات <Arrow /></Link></div></div>
      <div className={styles.serviceTheater}>
        <div className={styles.serviceTabs} role="tablist" aria-label="الخدمات" aria-orientation="vertical">
          {serviceStories.map((service, index) => <button key={service.key} ref={el => { refs.current[index] = el; }}
            type="button" role="tab" id={`service-tab-${service.key}`} aria-controls="service-story" aria-selected={active === index}
            tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
            {active === index && <motion.span className={styles.serviceTabActive} layoutId="v3-service-tab" transition={{ duration: reduced ? 0 : 0.4, ease }} />}
            <span className={styles.serviceTabNumber}>0{index + 1}</span><span>{service.title}</span><Arrow />
          </button>)}
          <div className={styles.serviceMobileNote}><span>05</span><div><h3>{services[3].title}</h3><p>{services[3].text}</p><Link href={`${V3.services}/mobile-development`}>اطلب الخدمة <Arrow /></Link></div></div>
        </div>
        <div role="tabpanel" id="service-story" aria-labelledby={`service-tab-${current.key}`} tabIndex={0} className={styles.serviceStory}>
          <AnimatePresence mode="wait" initial={false}><motion.div key={current.key} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -12 }} transition={{ duration: 0.25, ease }}>
            <div className={styles.serviceStoryTop}><span dir="ltr">{current.label}</span><span dir="ltr">0{active + 1} / 04</span></div>
            <div className={styles.serviceStoryMedia}><Image src={current.image} alt={current.title} fill sizes="(max-width: 800px) 90vw, 640px" /></div>
            <div className={styles.serviceStoryCopy}><p>{current.lead}</p><Link href={current.href} aria-label={`${current.title} — عرض المزيد`}><Arrow /></Link></div>
            <div className={styles.serviceCapabilities}>{current.detail.scope.items.map((feature, index) => <div key={feature.title}><span>0{index + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></div>)}</div>
          </motion.div></AnimatePresence>
        </div>
      </div>
    </div>
  </section>;
}
