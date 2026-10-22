"use client";

import { aboutCopy, academyCopy, sectorsCopy, servicesCopy, contactCopy } from "@/english/components/v3/page-content";
import { services, processSteps } from "@/english/components/v3/content";
import { serviceCatalog } from "@/english/components/v3/service-catalog";
import type { RequestKey } from "@/english/components/v2/routes";
import { Arrow, MotionSection } from "@/english/components/v4/Motion";
import { Button, Cta, Faq, Features, Heading, Intro, Journey, Photo } from "@/english/components/v4/Elements";
import { RouteLink } from "@/english/components/v4/SiteShell";
import { ContactForm } from "@/english/components/v4/ContactForm";
import styles from "@/english/components/v4/V4.module.css";

export function AboutPage() {
  const c = aboutCopy;
  return <>
    <Intro label={"About us"} title={c.intro.title} lead={c.intro.text} number="01" />
    <MotionSection className={`${styles.wrap} ${styles.aboutScene}`} mode="mask"><Photo src="/v2/images/about-collaboration.png" alt={"A team collaborating around a meeting table"} eager /><span aria-hidden="true" dir="ltr">BUSINESS<br />× TECHNOLOGY</span></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.story}`} mode="slide"><Heading label={c.story.eyebrow} title={c.story.title} /><div><p className={styles.largeText}>{c.story.lead}</p><p>{c.story.note}</p></div></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.foundation}`} mode="depth"><Features items={c.foundations} /></MotionSection>
    <MotionSection className={styles.paper} mode="mask"><div className={styles.wrap}><Heading label={c.values.eyebrow} title={c.values.title} /><Features items={c.values.items} /></div></MotionSection>
    <Journey steps={c.steps} /><MotionSection className={styles.wrap} mode="slide"><Heading label={"What we offer"} title={"Your complete technology partner"} /><Features items={c.pillars} /></MotionSection><Cta {...c.cta} />
  </>;
}

export function SectorsPage() {
  const c = sectorsCopy;
  return <><Intro label={"Industries"} {...c.intro} number="04" /><nav className={`${styles.wrap} ${styles.anchorNav}`} aria-label={"Industries"}>{c.sectors.map((sector, i) => <a href={`#${sector.id}`} key={sector.id}><span dir="ltr">0{i + 1}</span>{sector.title}<span>↓</span></a>)}</nav>
    {c.sectors.map((sector, i) => <MotionSection id={sector.id} className={`${styles.wrap} ${styles.sectorChapter}`} mode={i % 2 ? "slide" : "mask"} key={sector.id}><div className={styles.sectorImage}><Photo src={sector.image.src} alt={sector.image.alt} /><span aria-hidden="true" dir="ltr">0{i + 1}</span></div><div className={styles.sectorCopy}><p className={styles.eyebrow}>{"INDUSTRIES / 0"}{i + 1}</p><h2>{sector.title}</h2><p className={styles.largeText}>{sector.lead}</p><ul>{sector.priorities.map(text => <li key={text}>{text}</li>)}</ul><p>{sector.services}</p><Button quiet href={"/en/v4/contact"}>{"Discuss your project with an expert"}</Button></div></MotionSection>)}
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={c.principles.eyebrow} title={c.principles.title} /><Features items={c.principles.items} /></div></MotionSection><Cta {...c.cta} /></>;
}

export function AcademyPage() {
  const c = academyCopy;
  return <><Intro label={"Transformix Academy"} {...c.intro} number="06"><Button href={"/en/v4/contact?service=academy"}>{"Discuss your training needs"}</Button></Intro>
    <MotionSection className={`${styles.wrap} ${styles.academyBanner}`} mode="mask"><Photo src="/v2/images/academy-hero.png" alt={"A training and collaborative learning session"} eager /><span dir="ltr" aria-hidden="true">TX / ACADEMY</span></MotionSection>
    <div className={styles.wrap}>{c.tracks.map((track, i) => <MotionSection id={track.id} className={styles.track} mode="slide" key={track.id}><span className={styles.trackNumber} dir="ltr">0{i + 1}</span><div><p className={styles.eyebrow}>{track.audience}</p><h2>{track.title}</h2><p>{track.text}</p><Button quiet href={"/en/v4/contact?service=academy"}>{"Discuss your training needs"}</Button></div><ul>{track.topics.map(topic => <li key={topic}><span>↗</span>{topic}</li>)}</ul></MotionSection>)}</div>
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={c.modes.eyebrow} title={c.modes.title} /><Features items={c.modes.items} /></div></MotionSection><Journey steps={c.steps} /><Faq items={c.faqs} /><Cta {...c.cta} /></>;
}

export function ServicesPage() {
  const c = servicesCopy;
  return <><Intro label={"Our services"} {...c.intro} number="02" /><div className={styles.wrap}>{serviceCatalog.map((service, i) => <MotionSection id={service.slug} className={styles.directoryChapter} mode={i % 2 ? "slide" : "mask"} key={service.slug}><div className={styles.directoryTitle}><span dir="ltr">0{i + 1} / {service.label}</span><h2><RouteLink href={`/en/v4/services/${service.slug}`}>{c.chapters[i].title}<Arrow /></RouteLink></h2></div><div className={styles.directoryBody}><RouteLink href={`/en/v4/services/${service.slug}`} aria-label={c.chapters[i].title}><Photo src={service.image} alt={c.chapters[i].title} contain /></RouteLink><div><p className={styles.largeText}>{c.chapters[i].text}</p><ul>{service.content.scope.items.map(item => <li key={item.title}>{item.title}</li>)}</ul><Button href={`/en/v4/services/${service.slug}`}>{"Show more"}</Button><Button quiet href={`/en/v4/contact?service=${service.content.key}`}>{"Request this service"}</Button></div></div></MotionSection>)}</div>
    <MotionSection className={`${styles.wrap} ${styles.mobileBand}`} mode="slide"><span dir="ltr">05 / iOS & ANDROID</span><h2>{services[3].title}</h2><p>{services[3].text}</p><Button href={"/en/v4/services/mobile-development"}>{"Show more"}</Button></MotionSection>
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={c.challenges.eyebrow} title={c.challenges.title} /><Features items={c.challenges.items} /></div></MotionSection><Journey steps={c.steps} /><Faq items={c.faqs} /><Cta {...c.cta} /></>;
}

export function ServicePage({ slug }: { slug: string }) {
  const service = serviceCatalog.find(item => item.slug === slug)!;
  const c = service.content;
  return <><Intro label={c.crumb} title={c.title} lead={c.lead} number={`02—0${serviceCatalog.indexOf(service) + 1}`}><Button href={`/en/v4/contact?service=${c.key}`}>{"Get a free consultation"}</Button></Intro>
    <MotionSection className={`${styles.wrap} ${styles.serviceCanvas}`} mode="mask"><div className={styles.canvasMeta} dir="ltr"><span>TRANSFORMIX / {service.label}</span><span>↗</span></div><Photo src={c.screen?.src ?? service.image} alt={c.screen?.alt ?? c.title} contain eager />{c.screen?.caption && <p>{c.screen.caption}</p>}</MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.story}`} mode="slide"><Heading label={"Where do we begin?"} title={"Understand the problem before choosing the tool."} /><p className={styles.largeText}>{c.context}</p></MotionSection>
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={"What do we provide?"} title={c.scope.title} lead={"The final scope depends on your needs and readiness, and may include the following areas."} /><Features items={c.scope.items} /></div></MotionSection>
    <MotionSection className={styles.wrap} mode="slide"><Heading label={"Intended value"} title={"Outputs connected to your business needs."} /><Features items={c.outcomes.items} />{c.outcomes.footnote && <p className={styles.note}>{"Target outcomes and tracking metrics are reviewed when defining the scope. They do not guarantee specific commercial results."}</p>}</MotionSection><Journey steps={c.process.steps} />
    <MotionSection className={`${styles.wrap} ${styles.readiness}`} mode="mask"><span aria-hidden="true">↗</span><div><h2>{"What do we need to get started?"}</h2><p>{c.readiness}</p><p>{"Access permissions and information-sharing arrangements are defined before accessing any data or systems."}</p><Button quiet href={`/en/v4/contact?service=${c.key}`}>{"Request this service"}</Button></div></MotionSection>
    <Faq items={c.faqs} /><Cta {...c.cta} service={c.key} /><MotionSection className={`${styles.wrap} ${styles.related}`} mode="rise"><p className={styles.eyebrow}>{"Other services"}</p>{serviceCatalog.filter(item => item.slug !== slug).map(item => <RouteLink key={item.slug} href={`/en/v4/services/${item.slug}`}>{item.content.crumb}<Arrow /></RouteLink>)}</MotionSection></>;
}

export function MobileServicePage() {
  return <><Intro label={"Services"} title={services[3].title} lead={services[3].text} number="02—05"><Button href={"/en/v4/contact?service=help"}>{"Request this service"}</Button></Intro><MotionSection className={`${styles.wrap} ${styles.mobileCanvas}`} mode="depth"><span dir="ltr">iOS<br />& Android</span><div><Photo src="/images/works/belli.png" alt={"Digital experience"} /></div></MotionSection><Journey steps={processSteps} /><Cta /></>;
}

export function ContactPage({ defaultRequest }: { defaultRequest?: RequestKey }) {
  const c = contactCopy;
  return <><Intro label={"Contact us"} {...c.intro} number="07" /><MotionSection className={`${styles.wrap} ${styles.contactWorkspace}`} mode="depth"><aside><p className={styles.eyebrow}>{"Let us build the next step."}</p><h2>{"Facing a business challenge? Let us help you solve it."}</h2><p>{"Tell us about your business challenge. Our technical team will help map the right approach and identify the solutions and systems that support your project's growth."}</p><a dir="ltr" href="mailto:Info@thetransformix.com">Info@thetransformix.com <Arrow /></a><span className={styles.cross} aria-hidden="true">✳</span></aside><ContactForm key={defaultRequest ?? "default"} defaultRequest={defaultRequest} /></MotionSection><Journey steps={c.steps} /><Faq items={c.faqs} /></>;
}
