"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useState } from "react";
import { Reveal } from "@/english/components/ui/Reveal";
import { AI_SUITE_WEBSITE, EXTRA_SERVICES, getServiceWebsite } from "@/english/lib/serviceNavigation";
import styles from "@/english/components/sections/ServicesGrid.module.css";

/* One 16:9 photo per service, from the client's service photo set. Data
   science and marketing have none of their own yet, so they keep the
   earlier data-ai and creative scenes. */
const IMAGES = {
  ai: "/images/services/photos/ai.webp",
  data: "/images/services/photos/data-ai.webp",
  software: "/images/services/photos/software.webp",
  ecommerce: "/images/services/photos/ecommerce.webp",
  reservations: "/images/services/photos/reservations.webp",
  marketing: "/images/services/photos/creative.webp",
  research: "/images/services/photos/research.webp",
  outsourcing: "/images/services/photos/outsourcing.webp",
  consulting: "/images/services/photos/consulting.webp",
};

/* The nine services, in the client's order. A service without an `href`
   shows no button until its page exists. */
const SERVICES: { key: string; title: string; text: string; image: string; cta: string; href?: string }[] = [
  {
    key: "ai",
    title: "AI & Intelligent Automation",
    text: "An integrated suite of ready-to-customise AI agents and specialised AI solutions built to order, covering process automation, customer service and sales, productivity and decision support, with integration into your existing systems and data.",
    image: IMAGES.ai,
    cta: "Explore AI Agents",
    href: AI_SUITE_WEBSITE,
  },
  {
    key: "data",
    title: "Data Science & Digital Intelligence",
    text: "Advanced data analysis and mining, machine learning models, predictive analytics, and business and market intelligence. These solutions help you spot patterns and opportunities, understand performance, and turn operational and commercial data into actionable insight.",
    image: IMAGES.data,
    cta: "Explore data solutions",
    href: "/en/services/data-science",
  },
  {
    key: "software",
    title: "Software Engineering & Applications",
    text: "Enterprise systems, digital platforms, and ERP and CRM solutions designed around your business requirements, alongside native and cross-platform mobile app development for iOS and Android, with system integration and close attention to security, performance and scalability.",
    image: IMAGES.software,
    cta: "Explore Software Solutions",
  },
  {
    key: "ecommerce",
    title: "E-commerce & Multi-Vendor Marketplaces",
    text: "We build online stores and multi-vendor marketplaces that bring products, merchants, orders, payments and logistics together in one integrated commerce experience. These solutions integrate with inventory and ERP systems to help businesses expand their sales channels, organise commercial operations and improve the buying experience.",
    image: IMAGES.ecommerce,
    cta: "Explore E-commerce Solutions",
    href: getServiceWebsite("web"),
  },
  {
    key: "reservations",
    title: "Reservations & Tourism Platforms",
    text: "We build online platforms for reservations, appointments and tourism services, covering availability, booking, confirmation, payment and communication with customers and service providers. They improve the booking experience, widen your reach and coordinate operations across websites and mobile apps.",
    image: IMAGES.reservations,
    cta: "Explore Booking Platforms",
    href: "/en/services/tourism",
  },
  {
    key: "marketing",
    title: "Creative & Omnichannel Digital Marketing",
    text: "A distinctive brand identity, creative content and integrated digital experiences, backed by omnichannel marketing strategies, paid advertising campaigns and search engine optimisation, to reach more customers, deepen engagement and deliver measurable growth.",
    image: IMAGES.marketing,
    cta: "Explore Marketing Services",
    href: getServiceWebsite("marketing"),
  },
  {
    key: "research",
    title: "Research & Innovation",
    text: "Applied research and technical experiments to develop new products and solutions, exploring what emerging technology can do and turning it into commercially viable applications. This includes prototypes, smart tools and proprietary products, built with our technology and research partners.",
    image: IMAGES.research,
    cta: "Explore Innovation",
  },
  {
    key: "outsourcing",
    title: "Technology Outsourcing & Managed Business Services",
    text: "Specialised technical and operational expertise that lets businesses move fast, scale flexibly and run more economically, without building full in-house teams. Services include managing e-commerce operations and digital reservations, technical support, customer service, accounting and systems administration, delivered through dedicated teams and outsourcing and managed-service models tailored to your business.",
    image: IMAGES.outsourcing,
    cta: "Explore Managed Services",
  },
  {
    key: "consulting",
    title: "Consulting & Venture Building",
    text: "Specialised consulting in business strategy, digital transformation, governance, quality and process improvement, alongside the development of ventures, products, technology and commercial partnerships, guided by client goals, market opportunities and economic feasibility. Our expertise includes Quality 5.0 and the use of data, automation and AI for performance measurement, continuous improvement and organisational readiness.",
    image: IMAGES.consulting,
    cta: "Explore Consulting",
    href: EXTRA_SERVICES.find(service => service.key === "ventures")!.website,
  },
];

const number = (index: number) => String(index + 1).padStart(2, "0");
const ease = [0.65, 0, 0.35, 1] as const;

/** The services explorer (Figma 4616:884): the nine services as a numbered
    list, and the one picked opening in the detail panel beside it. */
export function ServicesGrid() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const service = SERVICES[active];
  const external = service.href ? !service.href.startsWith("/") : false;

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title" data-flow="outro">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <h2 id="services-title" className={styles.title}>{"Technology solutions tied to your business goals."}</h2>
          <p className={styles.lead}>{"We design and deliver our solutions around the nature and priorities of each business, with a focus on performance, efficiency and room to grow."}</p>
        </Reveal>

        <div className={styles.explorer}>
          <ol className={styles.list}>
            {SERVICES.map((item, index) => (
              <li key={item.key} className={styles.entry}>
                <button
                  type="button"
                  className={styles.item}
                  data-active={active === index}
                  aria-current={active === index ? "true" : undefined}
                  aria-controls="services-detail"
                  onClick={() => setActive(index)}
                >
                  <span className={styles.number}>{number(index)}</span>
                  <span className={styles.name}>{item.title}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    <Image src="/icons/home/service-arrow-active.svg" alt="" width={20} height={20} />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div id="services-detail" className={styles.panel} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className={styles.detail}
                key={service.key}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.2, ease }}
              >
                <div className={styles.picture}>
                  <Image src={service.image} alt="" fill sizes="(max-width: 1024px) 90vw, 440px" />
                </div>
                <h3 className={styles.detailTitle}>{service.title}</h3>
                <p className={styles.detailText}>{service.text}</p>
                {service.href && (
                  <a
                    href={service.href}
                    className={styles.cta}
                    {...(external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `${service.cta} (opens in a new tab)`,
                        }
                      : {})}
                  >
                    <Image className={styles.ctaArrow} src="/icons/home/arrow-forward-white.svg" alt="" width={20} height={20} aria-hidden />
                    {service.cta}
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
