"use client";

import { aboutCopy, academyCopy, sectorsCopy, servicesCopy, contactCopy } from "@/components/v3/page-content";
import { services, processSteps } from "@/components/v3/content";
import { serviceCatalog } from "@/components/v3/service-catalog";
import type { RequestKey } from "@/components/v2/routes";
import { Arrow, MotionSection, Reveal } from "./Motion";
import { Button, Cta, Faq, Features, Heading, Intro, Journey, Photo } from "./Elements";
import { RouteLink } from "./SiteShell";
import { ContactForm } from "./ContactForm";
import styles from "./V4.module.css";

export function AboutPage() {
  const c = aboutCopy;
  return <>
    <Intro label="من نحن" title={c.intro.title} lead={c.intro.text} number="01" />
    <MotionSection className={`${styles.wrap} ${styles.aboutScene}`} mode="mask"><Photo src="/v2/images/about-collaboration.png" alt="فريق عمل يتعاون حول طاولة اجتماعات" eager /><span aria-hidden="true" dir="ltr">BUSINESS<br />× TECHNOLOGY</span></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.story}`} mode="slide"><Heading label={c.story.eyebrow} title={c.story.title} /><div><p className={styles.largeText}>{c.story.lead}</p><p>{c.story.note}</p></div></MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.foundation}`} mode="depth"><Features items={c.foundations} /></MotionSection>
    <MotionSection className={styles.paper} mode="mask"><div className={styles.wrap}><Heading label={c.values.eyebrow} title={c.values.title} /><Features items={c.values.items} /></div></MotionSection>
    <Journey steps={c.steps} /><MotionSection className={styles.wrap} mode="slide"><Heading label="ما نقدمه" title="شريكك التقني الشامل" /><Features items={c.pillars} /></MotionSection><Cta {...c.cta} />
  </>;
}

export function SectorsPage() {
  const c = sectorsCopy;
  return <><Intro label="القطاعات" {...c.intro} number="04" /><nav className={`${styles.wrap} ${styles.anchorNav}`} aria-label="القطاعات">{c.sectors.map((sector, i) => <a href={`#${sector.id}`} key={sector.id}><span dir="ltr">0{i + 1}</span>{sector.title}<span>↓</span></a>)}</nav>
    {c.sectors.map((sector, i) => <MotionSection id={sector.id} className={`${styles.wrap} ${styles.sectorChapter}`} mode={i % 2 ? "slide" : "mask"} key={sector.id}><div className={styles.sectorImage}><Photo src={sector.image.src} alt={sector.image.alt} /><span aria-hidden="true" dir="ltr">0{i + 1}</span></div><div className={styles.sectorCopy}><p className={styles.eyebrow}>القطاعات / 0{i + 1}</p><h2>{sector.title}</h2><p className={styles.largeText}>{sector.lead}</p><ul>{sector.priorities.map(text => <li key={text}>{text}</li>)}</ul><p>{sector.services}</p><Button quiet href="/v4/contact">ناقش مشروعك مع خبير تقني</Button></div></MotionSection>)}
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={c.principles.eyebrow} title={c.principles.title} /><Features items={c.principles.items} /></div></MotionSection><Cta {...c.cta} /></>;
}

export function AcademyPage() {
  const c = academyCopy;
  return <><Intro label="أكاديمية ترانسفورمكس" {...c.intro} number="06"><Button href="/v4/contact?service=academy">ناقش احتياجك التدريبي</Button></Intro>
    <MotionSection className={`${styles.wrap} ${styles.academyBanner}`} mode="mask"><Photo src="/v2/images/academy-hero.png" alt="جلسة تدريبية وتعلم مشترك" eager /><span dir="ltr" aria-hidden="true">TX / ACADEMY</span></MotionSection>
    <div className={styles.wrap}>{c.tracks.map((track, i) => <MotionSection id={track.id} className={styles.track} mode="slide" key={track.id}><span className={styles.trackNumber} dir="ltr">0{i + 1}</span><div><p className={styles.eyebrow}>{track.audience}</p><h2>{track.title}</h2><p>{track.text}</p><Button quiet href="/v4/contact?service=academy">ناقش احتياجك التدريبي</Button></div><ul>{track.topics.map(topic => <li key={topic}><span>↗</span>{topic}</li>)}</ul></MotionSection>)}</div>
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={c.modes.eyebrow} title={c.modes.title} /><Features items={c.modes.items} /></div></MotionSection><Journey steps={c.steps} /><Faq items={c.faqs} /><Cta {...c.cta} /></>;
}

export function ServicesPage() {
  const c = servicesCopy;
  return <><Intro label="خدماتنا" {...c.intro} number="02" /><div className={styles.wrap}>{serviceCatalog.map((service, i) => <MotionSection id={service.slug} className={styles.directoryChapter} mode={i % 2 ? "slide" : "mask"} key={service.slug}><div className={styles.directoryTitle}><span dir="ltr">0{i + 1} / {service.label}</span><h2><RouteLink href={`/v4/services/${service.slug}`}>{c.chapters[i].title}<Arrow /></RouteLink></h2></div><div className={styles.directoryBody}><RouteLink href={`/v4/services/${service.slug}`} aria-label={c.chapters[i].title}><Photo src={service.image} alt={c.chapters[i].title} contain /></RouteLink><div><p className={styles.largeText}>{c.chapters[i].text}</p><ul>{service.content.scope.items.map(item => <li key={item.title}>{item.title}</li>)}</ul><Button href={`/v4/services/${service.slug}`}>عرض المزيد</Button><Button quiet href={`/v4/contact?service=${service.content.key}`}>اطلب الخدمة</Button></div></div></MotionSection>)}</div>
    <MotionSection className={`${styles.wrap} ${styles.mobileBand}`} mode="slide"><span dir="ltr">05 / iOS & ANDROID</span><h2>{services[3].title}</h2><p>{services[3].text}</p><Button href="/v4/services/mobile-development">عرض المزيد</Button></MotionSection>
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label={c.challenges.eyebrow} title={c.challenges.title} /><Features items={c.challenges.items} /></div></MotionSection><Journey steps={c.steps} /><Faq items={c.faqs} /><Cta {...c.cta} /></>;
}

export function ServicePage({ slug }: { slug: string }) {
  const service = serviceCatalog.find(item => item.slug === slug)!;
  const c = service.content;
  return <><Intro label={c.crumb} title={c.title} lead={c.lead} number={`02—0${serviceCatalog.indexOf(service) + 1}`}><Button href={`/v4/contact?service=${c.key}`}>اطلب استشارة مجانية</Button></Intro>
    <MotionSection className={`${styles.wrap} ${styles.serviceCanvas}`} mode="mask"><div className={styles.canvasMeta} dir="ltr"><span>TRANSFORMIX / {service.label}</span><span>↗</span></div><Photo src={c.screen?.src ?? service.image} alt={c.screen?.alt ?? c.title} contain eager />{c.screen?.caption && <p>{c.screen.caption}</p>}</MotionSection>
    <MotionSection className={`${styles.wrap} ${styles.story}`} mode="slide"><Heading label="من أين نبدأ؟" title="نفهم المشكلة قبل اختيار الأداة." /><p className={styles.largeText}>{c.context}</p></MotionSection>
    <MotionSection className={styles.paper} mode="depth"><div className={styles.wrap}><Heading label="ماذا نقدم؟" title={c.scope.title} lead="يُحدد نطاق العمل النهائي وفق الاحتياج والجاهزية، وقد يشمل المسارات التالية." /><Features items={c.scope.items} /></div></MotionSection>
    <MotionSection className={styles.wrap} mode="slide"><Heading label="القيمة المستهدفة" title="مخرجات ترتبط بما يحتاجه العمل." /><Features items={c.outcomes.items} />{c.outcomes.footnote && <p className={styles.note}>تُراجع النتائج المستهدفة ومؤشرات متابعتها عند تحديد النطاق؛ ولا تمثل ضمانًا لنتائج تجارية محددة.</p>}</MotionSection><Journey steps={c.process.steps} />
    <MotionSection className={`${styles.wrap} ${styles.readiness}`} mode="mask"><span aria-hidden="true">↗</span><div><h2>ما الذي نحتاجه للبدء؟</h2><p>{c.readiness}</p><p>تُحدد الصلاحيات وآلية مشاركة المعلومات قبل الوصول إلى أي بيانات أو أنظمة.</p><Button quiet href={`/v4/contact?service=${c.key}`}>اطلب الخدمة</Button></div></MotionSection>
    <Faq items={c.faqs} /><Cta {...c.cta} service={c.key} /><MotionSection className={`${styles.wrap} ${styles.related}`} mode="rise"><p className={styles.eyebrow}>خدمات أخرى</p>{serviceCatalog.filter(item => item.slug !== slug).map(item => <RouteLink key={item.slug} href={`/v4/services/${item.slug}`}>{item.content.crumb}<Arrow /></RouteLink>)}</MotionSection></>;
}

export function MobileServicePage() {
  return <><Intro label="الخدمات" title={services[3].title} lead={services[3].text} number="02—05"><Button href="/v4/contact?service=help">اطلب الخدمة</Button></Intro><MotionSection className={`${styles.wrap} ${styles.mobileCanvas}`} mode="depth"><span dir="ltr">iOS<br />& Android</span><div><Photo src="/images/works/belli.png" alt="تجربة رقمية" /></div></MotionSection><Journey steps={processSteps} /><Cta /></>;
}

export function ContactPage({ defaultRequest }: { defaultRequest?: RequestKey }) {
  const c = contactCopy;
  return <><Intro label="تواصل معنا" {...c.intro} number="07" /><MotionSection className={`${styles.wrap} ${styles.contactWorkspace}`} mode="depth"><aside><p className={styles.eyebrow}>لنبنِ الخطوة التالية.</p><h2>هل لديك تحديات تواجهه اعملك؟ دعنا نساعدك في حلها</h2><p>شاركنا التحدي الذي يواجه أعمالك، وسيتولى فريقنا التقني رسم المسار الأمثل وتحديد الحلول والأنظمة الأنسب لنمو مشروعك.</p><a dir="ltr" href="mailto:Info@thetransformix.com">Info@thetransformix.com <Arrow /></a><span className={styles.cross} aria-hidden="true">✳</span></aside><ContactForm key={defaultRequest ?? "default"} defaultRequest={defaultRequest} /></MotionSection><Journey steps={c.steps} /><Faq items={c.faqs} /></>;
}
