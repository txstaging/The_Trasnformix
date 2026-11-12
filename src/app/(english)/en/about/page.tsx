import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { ServiceAction } from "@/english/components/services/ServiceAction";
import { actionClass, kit } from "@/english/components/services/ServiceKit";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/about/page.module.css";

export const metadata: Metadata = {
  title: "About Us | Transformix",
  description:
    "Transformix is a regional technology company based in the Middle East that applies the Technology 5.0 philosophy to building digital solutions and products for business transformation, through five specialized labs and a presence in Jeddah, Alexandria and Sharjah.",
};

/* Figma 4530:5796 — the introduction under the title. */
const INTRODUCTION = [
  "Our capabilities rest on five specialized labs working together across AI and data science, software engineering, enterprise systems, creative, and R&D and advisory.",
  "We have experience building multilingual digital products in Arabic, English, Urdu and Hindi, with attention to the linguistic and cultural needs of users across the diverse markets we serve.",
  "Our way of working is strengthened by a regional network of specialist experts and technology and commercial partners, bringing in local knowledge and sector expertise and letting us form teams that fit each project's needs.",
];

/* Figma 4529:13317 */
const PHILOSOPHY = [
  "We believe AI opens new ways to reimagine business models and everyday life, and that the real value of technology lies in understanding human needs and caring about the details that improve people's experience and multiply their abilities and creativity, not in replacing them.",
  "We put research, development and continuous innovation at the heart of our work, and adopt organizational excellence models to build resilient, sustainable solutions and businesses to globally competitive standards, with respect for the environment, resources and the rights of future generations.",
  "We invest in people through our academies and professional community, because knowledge and skills are what enable them to lead transformation and help shape the future.",
];

/* Figma 4529:13330 — two columns, the first on the reading side. */
const LABS_INTRO = [
  "Transformix has five specialized labs, each with its own leadership responsible for developing its expertise and capabilities. The labs work as one connected system that goes beyond traditional divisions: teams share knowledge and resources and collaborate on building products and delivering projects as each one requires.",
  "These capabilities are combined with specialist expertise and selected regional partnerships, bringing together technical know-how, sector knowledge and local presence. This model lets the labs lead their work independently or jointly, with flexibility in forming teams, sharing responsibilities and drawing on expertise across projects.",
];

/* Figma 4529:13333 — the five labs in reading order; each icon keeps its
   drawn size in the 32px slot. */
const LABS = [
  {
    title: "AI & Data Science Lab",
    text: "Developing AI applications and intelligent agents, advanced analytics and predictive models, and extracting knowledge from data to support products and decisions.",
    icon: { name: "ai", width: 28.5, height: 28.5 },
  },
  {
    title: "Software Engineering Lab",
    text: "Designing and building digital platforms, web and mobile apps, and engineering software services and system integrations, with close attention to performance and scalability.",
    icon: { name: "software", width: 32.5, height: 24.5004 },
  },
  {
    title: "ERP & Enterprise Systems Lab",
    text: "Developing, implementing and integrating enterprise and CRM systems, and connecting operations, data and applications to fit business requirements.",
    icon: { name: "managed", width: 27.5, height: 27 },
  },
  {
    title: "Creative Lab",
    text: "Developing visual identity, user experience, digital interfaces and creative content that connect design to user needs and business goals.",
    icon: { name: "creative", width: 22.5, height: 27 },
  },
  {
    title: "R&D & Advisory Lab",
    text: "Applied research and exploration of technologies and business models, and advisory on transformation, organizational excellence, governance and Technology 5.0.",
    icon: { name: "research", width: 25.9094, height: 26.5 },
  },
] as const;

/* Figma 4529:13431 */
const EXPERTISE = [
  "Transformix leads its projects and products through its specialized labs, building on its in-house expertise and capabilities and drawing on established regional professional relationships with specialist experts and selected partners.",
  "These relationships add sector knowledge, local expertise and specialist capabilities when the work calls for them, while Transformix keeps the lead on projects and responsibility for integration and delivery quality.",
];

/* Figma 4529:13443 */
const KNOWLEDGE = [
  "We believe developing technology goes hand in hand with developing the people who understand it, put it to use and invent new applications for it. Through the Transformix academies and professional community, we help build skills, pass on practical experience and connect knowledge with career and entrepreneurship opportunities.",
  "We work with universities, educational institutions and specialist communities, take part in technology meetups and events, and offer space for learning, mentoring, hands-on training and talent discovery, helping build a new generation of specialists and innovators.",
];

/* Figma 4529:13458 */
const PRESENCE = [
  "Transformix operates through a regional presence in Jeddah, Alexandria and Sharjah that brings technical, commercial and operational expertise together in one system, with flexibility in forming teams and managing projects around client requirements.",
  "Our work extends to other markets across the Middle East, building on our regional experience and specialist partnerships while keeping consistent standards of delivery, quality and client relationship management.",
];

/* Figma 4529:13461 — in reading order. */
const CITIES = [
  { city: "Jeddah", country: "Saudi Arabia" },
  { city: "Alexandria", country: "Arab Republic of Egypt" },
  { city: "Sharjah", country: "United Arab Emirates" },
] as const;

function Arrow() {
  return (
    <span className={kit.arrow} aria-hidden="true">
      ←
    </span>
  );
}

function Columns({ items }: { items: readonly string[] }) {
  return (
    <Reveal className={styles.columns}>
      {items.map((text) => (
        <p key={text} className={kit.cardText}>
          {text}
        </p>
      ))}
    </Reveal>
  );
}

/** The designer's photo beside a section's copy, as tall as the copy runs. */
function Photo({ src }: { src: string }) {
  return (
    <Reveal className={styles.panel} delay={80} aria-hidden="true">
      <Image className={styles.panelImage} src={src} alt="" fill sizes="(max-width: 900px) 100vw, 525px" />
    </Reveal>
  );
}

/** Figma 4529:13270 — من نحن. */
export default function AboutPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${styles.main} ${tajawal.variable} ${jakarta.variable}`}>
        <section className={styles.hero} aria-labelledby="about-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image className={styles.heroImage} src="/images/about/hero.jpg" alt="" fill preload sizes="100vw" />
          </div>
          <div className={styles.heroCopy}>
            <Reveal as="h1" id="about-heading" className={styles.heroTitle}>
              {" About us "}</Reveal>
            <Reveal as="p" className={styles.heroLead} delay={60}>
              {" Transformix is a regional technology company based in the Middle East. We apply the Technology 5.0 philosophy to building digital solutions and products that support business transformation, combining human-centered innovation, artificial intelligence, sustainability and resilience. "}</Reveal>
            {INTRODUCTION.map((text, index) => (
              <Reveal as="p" key={text} className={styles.heroText} delay={120 + index * 40}>
                {text}
              </Reveal>
            ))}
            <Reveal className={styles.heroActions} delay={280}>
              <Link href={"/en/services"} className={actionClass("primary")}>
                {" Explore our services "}</Link>
              <Link href={"/en/contact"} className={actionClass()}>
                {" Contact us "}</Link>
            </Reveal>
          </div>
        </section>

        <section className={`${kit.section} ${styles.pale}`} aria-labelledby="about-philosophy-heading">
          <div className={styles.split}>
            <Reveal className={styles.splitCopy}>
              <h2 id="about-philosophy-heading" className={kit.title}>
                {" Our philosophy "}</h2>
              {PHILOSOPHY.map((text) => (
                <p key={text} className={kit.cardText}>
                  {text}
                </p>
              ))}
            </Reveal>
            <Photo src="/images/about/philosophy.jpg" />
          </div>
        </section>

        <section id="labs" className={`${kit.section} ${styles.anchor}`} aria-labelledby="about-labs-heading">
          <Reveal as="h2" id="about-labs-heading" className={kit.title}>
            {" Our labs "}</Reveal>
          <Columns items={LABS_INTRO} />
          <ul className={styles.labs}>
            {LABS.map((lab, index) => (
              <Reveal as="li" key={lab.title} className={styles.lab} delay={(index % 2) * 80}>
                <div className={styles.labCard}>
                  <span className={styles.labIcon} aria-hidden="true">
                    <Image
                      src={`/icons/about/${lab.icon.name}.svg`}
                      alt=""
                      width={lab.icon.width}
                      height={lab.icon.height}
                    />
                  </span>
                  <h3 className={kit.cardTitle}>{lab.title}</h3>
                  <p className={kit.cardText}>{lab.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Link href={"/en/works"} className={`${kit.cardLink} ${styles.more}`}>
              {" Explore case studies and insights "}<Arrow />
            </Link>
          </Reveal>
        </section>

        <section className={`${kit.section} ${styles.pale}`} aria-labelledby="about-expertise-heading">
          <div className={`${styles.split} ${styles.splitWide}`}>
            <Reveal className={styles.splitCopy}>
              <h2 id="about-expertise-heading" className={kit.title}>
                {" Our extended expertise "}</h2>
              {EXPERTISE.map((text) => (
                <p key={text} className={kit.cardText}>
                  {text}
                </p>
              ))}
              <Link href={"/en/careers"} className={`${kit.cardLink} ${styles.more}`}>
                {" Join our experts "}<Arrow />
              </Link>
            </Reveal>
            <Photo src="/images/about/expertise.jpg" />
          </div>
        </section>

        <section className={kit.section} aria-labelledby="about-knowledge-heading">
          <Reveal as="h2" id="about-knowledge-heading" className={kit.title}>
            {" Knowledge & community "}</Reveal>
          <Columns items={KNOWLEDGE} />
          <Reveal className={styles.actions}>
            <Link href={"/en/academy"} className={actionClass("primary")}>
              {" Explore the academy "}</Link>
            <Link href={"/en/community"} className={actionClass()}>
              {" Join our community "}</Link>
          </Reveal>
        </section>

        <section className={`${kit.section} ${styles.pale}`} aria-labelledby="about-presence-heading">
          <Reveal as="h2" id="about-presence-heading" className={kit.title}>
            {" Our presence "}</Reveal>
          <Columns items={PRESENCE} />
          <ul className={styles.cities}>
            {CITIES.map((city, index) => (
              <Reveal as="li" key={city.city} className={styles.city} delay={index * 60}>
                <Image src="/icons/about/map-pin.svg" alt="" width={28} height={28} aria-hidden="true" />
                <h3 className={kit.cardTitle}>{city.city}</h3>
                <p className={styles.country}>{city.country}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.section} ${styles.next}`} aria-labelledby="about-next-heading">
          <Reveal as="h2" id="about-next-heading" className={`${kit.title} ${styles.nextTitle}`}>
            {" Let's shape what's next "}</Reveal>
          <Reveal as="p" className={styles.nextText} delay={60}>
            {" We look forward to working with organizations, companies and entrepreneurs to build digital solutions and products that combine innovation, technical expertise and business understanding. "}</Reveal>
          <Reveal className={styles.actions} delay={120}>
            <ServiceAction className={actionClass()}>{"Discuss your project with us"}</ServiceAction>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
