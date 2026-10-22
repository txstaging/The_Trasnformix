"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { serviceCatalog } from "@/english/components/v3/service-catalog";
import { servicesCopy } from "@/english/components/v3/page-content";
import { processSteps, services } from "@/english/components/v3/content";
import { Arrow, ease, Reveal } from "@/english/components/v3/Motion";
import { FeatureList, Journey, PageCta, PageFaq, PageIntro, Photo, SectionHeading } from "@/english/components/v3/PagePrimitives";
import { V3, contactHref } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/Experience.module.css";

export function ServicesPage() {
  const copy = servicesCopy;
  return <>
    <PageIntro label={"Services"} {...copy.intro} number="02" />
    <nav className={`${styles.wrap} ${styles.serviceDirectoryNav}`} aria-label={"Services"}>{serviceCatalog.map((service, index) => <a key={service.slug} href={`#${service.slug}`}><span>0{index + 1}</span>{copy.chapters[index].title}<span>↓</span></a>)}</nav>
    <div className={`${styles.wrap} ${styles.serviceDirectory}`}>{serviceCatalog.map((service, index) => <section key={service.slug} id={service.slug} className={styles.directoryChapter}>
      <Link href={`${V3.services}/${service.slug}`} className={styles.directoryVisual}><Photo src={service.image} alt={copy.chapters[index].title} /><span className={styles.directoryNumber} aria-hidden="true">0{index + 1}</span><span className={styles.directoryOpen}><Arrow /></span></Link>
      <div className={styles.directoryCopy}><Reveal><p className={styles.smallLabel} dir="ltr">{service.label}</p><h2><Link href={`${V3.services}/${service.slug}`}>{copy.chapters[index].title}</Link></h2><p>{copy.chapters[index].text}</p><div className={styles.directoryActions}><Link href={`${V3.services}/${service.slug}`} className={styles.lineLink}>{"Show more "}<Arrow /></Link><Link href={contactHref(service.content.key)} className={styles.lineLink}>{"Request this service "}<Arrow /></Link></div></Reveal><ul>{service.content.scope.items.map(item => <li key={item.title}><span aria-hidden="true">↖</span>{item.title}</li>)}</ul></div>
    </section>)}</div>
    <section className={`${styles.wrap} ${styles.mobileServiceBand}`}><div><span dir="ltr">05 / MOBILE EXPERIENCES</span><h2>{services[3].title}</h2><p>{services[3].text}</p></div><Link href={`${V3.services}/mobile-development`} className={styles.solidLink}>{"Show more "}<Arrow /></Link></section>
    <section className={`${styles.wrap} ${styles.servicesChallenges}`}><SectionHeading label={copy.challenges.eyebrow} title={copy.challenges.title} /><FeatureList items={copy.challenges.items} /></section>
    <Journey steps={copy.steps} /><PageFaq items={copy.faqs} /><PageCta {...copy.cta} />
  </>;
}

function ServiceVisual({ slug }: { slug: string }) {
  const reduced = useReducedMotion();
  const service = serviceCatalog.find(item => item.slug === slug)!;
  if (slug === "marketing-design") return <div className={styles.creativeVisual}>
    <p>{"A clear message. A consistent presence."}</p>
    {["/images/work-reem.png", "/images/work-kun.png", "/images/works/future.png"].map((image, index) => <motion.div key={image} initial={false} whileInView={reduced ? undefined : { y: [40 + index * 10, 0], rotate: [0, (index - 1) * 7] }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: index * 0.1 }}><Image src={image} alt="" fill sizes="(max-width: 640px) 60vw, 360px" /></motion.div>)}
    <span>{"From strategy to content and design"}</span>
  </div>;
  return <div className={`${styles.productVisual} ${slug === "web-development" ? styles.webProduct : ""}`}>
    <div className={styles.productChrome} aria-hidden="true"><span>● ● ●</span><span dir="ltr">THE TRANSFORMIX / {service.label}</span><Arrow /></div>
    <Image src={service.content.screen?.src ?? service.image} alt={service.content.screen?.alt ?? service.content.title} width={1200} height={780} sizes="(max-width: 800px) 95vw, 1000px" loading="eager" />
    {slug === "web-development" && <div className={styles.webProductInset}><Image src="/images/works/belli.png" alt={"Belli"} width={380} height={300} sizes="(max-width: 640px) 38vw, 300px" /></div>}
    {slug === "erp" && <div className={styles.erpConnections} aria-hidden="true"><span>{"Process and requirements analysis"}</span><span>{"Configuration and integration"}</span><span>{"Testing and user enablement"}</span></div>}
  </div>;
}

export function ServicePage({ slug }: { slug: string }) {
  const service = serviceCatalog.find(item => item.slug === slug)!;
  const content = service.content;
  return <div className={styles.serviceDetail} data-service={content.key}>
    <PageIntro label={content.crumb} title={content.title} lead={content.lead} number={`0${serviceCatalog.indexOf(service) + 1}`}><Link href={contactHref(content.key)} className={styles.solidLink}>{"Get a free consultation "}<Arrow /></Link></PageIntro>
    <section className={`${styles.wrap} ${styles.serviceVisualStage}`} aria-label={content.title}><ServiceVisual slug={slug} />{content.screen?.caption && <p className={styles.visualCaption}>{content.screen.caption}</p>}{slug === "marketing-design" && <p className={styles.visualCaption}>{"An illustrative visual direction for a digital campaign."}</p>}</section>
    <section className={`${styles.wrap} ${styles.contextSection}`}><SectionHeading label={"Where do we begin?"} title={"Understand the problem before choosing the tool."} /><Reveal><p>{content.context}</p></Reveal></section>
    <section className={`${styles.wrap} ${styles.scopeSection}`}><SectionHeading label={"What do we provide?"} title={content.scope.title} lead={"The final scope depends on your needs and readiness, and may include the following areas."} /><div className={styles.scopeRows}>{content.scope.items.map((item, index) => <Reveal key={item.title}><article><span dir="ltr">0{index + 1}</span><Image src={item.icon!} alt="" width={45} height={45} /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div></section>
    <section className={styles.outcomesBand}><div className={styles.wrap}><SectionHeading label={"Intended value"} title={"Outputs connected to your business needs."} /><FeatureList items={content.outcomes.items} dark />{content.outcomes.footnote && <p className={styles.visualCaption}>{"Target outcomes and tracking metrics are reviewed when defining the scope. They do not guarantee specific commercial results."}</p>}</div></section>
    <Journey steps={content.process.steps} />
    <section className={`${styles.wrap} ${styles.readiness}`}><span aria-hidden="true">↗</span><div><h2>{"What do we need to get started?"}</h2><p>{content.readiness}</p><p>{"Access permissions and information-sharing arrangements are defined before accessing any data or systems."}</p></div><Link href={contactHref(content.key)} className={styles.lineLink}>{"Request this service "}<Arrow /></Link></section>
    <PageFaq items={content.faqs} /><PageCta {...content.cta} service={content.key} />
    <nav className={`${styles.wrap} ${styles.relatedServices}`} aria-label={"Services"}>{serviceCatalog.filter(item => item.slug !== slug).map(item => <Link href={`${V3.services}/${item.slug}`} key={item.slug}>{item.content.crumb}<Arrow /></Link>)}</nav>
  </div>;
}

export function MobileServicePage() {
  return <>
    <PageIntro label={"Services"} title={services[3].title} lead={services[3].text} number="05"><Link href={contactHref("help")} className={styles.solidLink}>{"Request this service "}<Arrow /></Link></PageIntro>
    <div className={`${styles.wrap} ${styles.mobileDevelopmentVisual}`}><div className={styles.phoneFrame}><Image src="/images/works/belli.png" alt={"Digital experience"} fill sizes="300px" /></div><span dir="ltr" aria-hidden="true">iOS<br />& Android</span></div>
    <Journey steps={processSteps} /><PageCta title={"From your challenge to a digital solution that drives growth"} text={"Our process starts with understanding your business and leads to flexible, scalable solutions that support your future ambitions."} service="help" />
  </>;
}
