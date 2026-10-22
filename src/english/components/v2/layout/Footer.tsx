import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { V2 } from "@/english/components/v2/routes";
import { getFooterColumns } from "@/english/lib/footerNavigation";
import { SOCIAL_LINKS } from "@/lib/socialLinks";
import styles from "@/english/components/v2/layout/Footer.module.css";

type FooterLink = { label: string; href?: string; ltr?: boolean; external?: boolean };
type FooterColumn = { title: string; href: string; width: number; links: FooterLink[] };
const COLUMN_WIDTHS = { company: 110, services: 170, sectors: 140, academy: 140 };

/* Right-to-left reading order: the artboard (Figma 3709:669) runs contact,
   academy, sectors, services, company, identity from left to right. */
const COLUMNS: FooterColumn[] = [
  ...getFooterColumns("v2").map(column => ({ ...column, width: COLUMN_WIDTHS[column.id] })),
  {
    title: "Contact us",
    href: V2.contact,
    width: 260,
    links: [
      { label: "Info@thetransformix.com", href: "mailto:Info@thetransformix.com", ltr: true },
      { label: "+966567623953", href: "tel:+966567623953", ltr: true },
      { label: "Jeddah, Saudi Arabia" },
      { label: "Sharjah, United Arab Emirates" },
    ],
  },
];

/* Facebook leads so it lands on the right. */
const SOCIAL = [
  { icon: "/v2/brand/social-facebook.svg", label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: "/v2/brand/social-instagram.svg", label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: "/v2/brand/social-linkedin.svg", label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: "/v2/brand/social-behance.svg", label: "Behance", href: SOCIAL_LINKS.behance },
];

/** Figma "Site footer" (3709:668). */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.directory}>
        <div className={styles.identity}>
          <Link href={V2.home} className={styles.logo} aria-label="Transformix">
            <Image src="/images/logo-wide.png" alt="" width={230} height={79} />
          </Link>
          <p className={styles.tagline}>{"Integrated digital solutions that support your business growth"}</p>
          <ul className={styles.social}>
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  className={styles.socialLink}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <Image src={item.icon} alt="" width={40} height={40} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <div
            key={column.title}
            className={styles.column}
            style={{ "--col-w": `${column.width / 10}rem` } as CSSProperties}
          >
            <h2 className={styles.title}><Link href={column.href}>{column.title}</Link></h2>
            <ul className={styles.links}>
              {column.links.map((link) => (
                <li key={link.label} dir={link.ltr ? "ltr" : undefined}>
                  {!link.href ? (
                    <span>{link.label}</span>
                  ) : link.href.startsWith("/") ? (
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={styles.link}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.divider} />
      <p className={styles.copyright}>{"© Transformix. All rights reserved."}</p>
    </footer>
  );
}
