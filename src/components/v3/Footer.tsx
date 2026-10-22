"use client";

import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/socialLinks";
import { getFooterColumns } from "@/lib/footerNavigation";
import { Arrow } from "./Motion";
import styles from "./HomeV3.module.css";

const footerColumns = getFooterColumns("v3");

export function Footer() {
  return <footer className={styles.footer}><div className={styles.section}>
    <div className={styles.footerTop}><a href="/v3"><Image src="/images/logo-wide.png" alt="Transformix" width={200} height={67} /></a><p>حلول رقمية متكاملة تدعم نمو أعمالك</p><a href={SOCIAL_LINKS.behance} target="_blank" rel="noopener noreferrer" aria-label="بيهانس"><Arrow /></a></div>
    <div className={styles.footerGrid}>
      {footerColumns.map(column => <div key={column.id}>
        <p className={styles.footerTitle}><Link href={column.href}>{column.title}</Link></p>
        <ul>{column.links.map(link => <li key={link.label}>
          {link.external || link.href.includes("#") ? (
            <a href={link.href} target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}>{link.label}</a>
          ) : <Link href={link.href}>{link.label}</Link>}
        </li>)}</ul>
      </div>)}
      <div className={styles.footerContact}>
        <p className={styles.footerTitle}><Link href="/v3/contact">تواصل معنا</Link></p>
        <a href="mailto:Info@thetransformix.com" dir="ltr">Info@thetransformix.com</a>
        <a href="tel:+966567623953" dir="ltr">+966567623953</a>
        <p>المملكة العربية السعودية ,جدة</p><p>الامارات المتحدة,الشارقة</p>
      </div>
    </div>
    <div className={styles.footerWord} dir="ltr" aria-hidden="true">TRANSFORMIX<span>↗</span></div>
    <div className={styles.footerBottom}><p>©جميع الحقوق محفوظة لشركة Transformix</p><a href="#v3-top" aria-label="العودة إلى الأعلى">↑</a><span dir="ltr">THE TRANSFORMIX®</span></div>
  </div></footer>;
}
