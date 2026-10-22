"use client";

import Link from "next/link";
import { ContactForm } from "./ContactForm";
import type { RequestKey } from "@/components/v2/routes";
import { contactCopy } from "./page-content";
import { Arrow, Reveal } from "./Motion";
import { Journey, PageFaq, PageIntro } from "./PagePrimitives";
import styles from "./Experience.module.css";

export function ContactPage({ request }: { request?: RequestKey }) {
  return <>
    <PageIntro label="تواصل معنا" {...contactCopy.intro} number="06" />
    <section id="request" className={`${styles.wrap} ${styles.contactWorkspace}`} aria-label="نموذج طلب التواصل">
      <aside className={styles.contactAside}><span className={styles.contactAt} aria-hidden="true">@</span><Reveal><p className={styles.smallLabel}>بيانات الشركة</p><h2>تفضّل التواصل مباشرة؟ اختر الطريقة الأنسب لك.</h2><dl><div><dt>البريد الإلكتروني</dt><dd><a href="mailto:Info@thetransformix.com" dir="ltr">Info@thetransformix.com</a></dd></div><div><dt>الهاتف</dt><dd><a href="tel:+966567623953" dir="ltr">+966567623953</a></dd></div><div><dt>مقر الشركة</dt><dd>المملكة العربية السعودية ,جدة</dd></div><div><dt>ساعات العمل</dt><dd>الاحد - للخميس</dd></div></dl><Link href="/v3/services" className={styles.lineLink}>الخدمات <Arrow /></Link></Reveal></aside>
      <ContactForm key={request ?? "default"} defaultRequest={request} />
    </section>
    <Journey steps={contactCopy.steps} label="بعد إرسال الطلب" /><PageFaq items={contactCopy.faqs} />
  </>;
}
