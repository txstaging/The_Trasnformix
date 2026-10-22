"use client";

import Link from "next/link";
import { ContactForm } from "@/english/components/v3/ContactForm";
import type { RequestKey } from "@/english/components/v2/routes";
import { contactCopy } from "@/english/components/v3/page-content";
import { Arrow, Reveal } from "@/english/components/v3/Motion";
import { Journey, PageFaq, PageIntro } from "@/english/components/v3/PagePrimitives";
import styles from "@/english/components/v3/Experience.module.css";

export function ContactPage({ request }: { request?: RequestKey }) {
  return <>
    <PageIntro label={"Contact us"} {...contactCopy.intro} number="06" />
    <section id="request" className={`${styles.wrap} ${styles.contactWorkspace}`} aria-label={"Contact request form"}>
      <aside className={styles.contactAside}><span className={styles.contactAt} aria-hidden="true">@</span><Reveal><p className={styles.smallLabel}>{"Company details"}</p><h2>{"Prefer to contact us directly? Choose the option that suits you."}</h2><dl><div><dt>{"Email"}</dt><dd><a href="mailto:Info@thetransformix.com" dir="ltr">Info@thetransformix.com</a></dd></div><div><dt>{"Phone"}</dt><dd><a href="tel:+966567623953" dir="ltr">+966567623953</a></dd></div><div><dt>{"Our office"}</dt><dd>{"Jeddah, Saudi Arabia"}</dd></div><div><dt>{"Business hours"}</dt><dd>{"Sunday–Thursday"}</dd></div></dl><Link href={"/en/v3/services"} className={styles.lineLink}>{"Services "}<Arrow /></Link></Reveal></aside>
      <ContactForm key={request ?? "default"} defaultRequest={request} />
    </section>
    <Journey steps={contactCopy.steps} label={"After you send your request"} /><PageFaq items={contactCopy.faqs} />
  </>;
}
