import Image from "next/image";
import Link from "next/link";
import { tajawal } from "@/lib/fonts";
import { SOCIAL_LINKS } from "@/lib/socialLinks";
import { getFooterColumns } from "@/lib/footerNavigation";
import styles from "./Footer.module.css";

type PhoneLayout = {
  phone?: "hidden" | "last";
};

const COLUMN_WIDTHS = { company: 123, services: 123, sectors: 115, academy: 115 };
const LINK_COLUMNS = getFooterColumns("v1");

type Glyph = { src: string; width: number; height: number };

type ContactRow = PhoneLayout & {
  icon: string;
  mobileIcon: Glyph;
  text: string;
  href?: string;
  muted: boolean;
  plain?: boolean;
};

const PIN: Glyph = { src: "/icons/footer-pin.svg", width: 16, height: 20 };

const CONTACT: ContactRow[] = [
  {
    icon: "/icons/lucide-mail.svg",
    mobileIcon: { src: "/icons/footer-mail.svg", width: 20, height: 16 },
    text: "Info@thetransformix.com",
    href: "mailto:Info@thetransformix.com",
    muted: false,
  },
  {
    icon: "/icons/lucide-phone.svg",
    mobileIcon: { src: "/icons/footer-phone.svg", width: 20, height: 20 },
    text: "+966567623953",
    href: "tel:+966567623953",
    muted: false,
    plain: true,
  },
  {
    icon: "/icons/lucide-map-pin.svg",
    mobileIcon: PIN,
    text: "المملكة العربية السعودية ,جدة",
    muted: true,
  },
  {
    icon: "/icons/lucide-map-pin.svg",
    mobileIcon: PIN,
    text: "الامارات المتحدة,الشارقة",
    muted: true,
    phone: "hidden",
  },
];

/* Right-to-left: the artboard reads Behance, LinkedIn, Instagram, Facebook from
   left to right, so Facebook leads here to land on the right. */
const SOCIAL = [
  { icon: "/icons/social-4.svg", label: "فيسبوك", href: SOCIAL_LINKS.facebook },
  { icon: "/icons/social-3.svg", label: "إنستغرام", href: SOCIAL_LINKS.instagram },
  { icon: "/icons/social-2.svg", label: "لينكدإن", href: SOCIAL_LINKS.linkedin },
  { icon: "/icons/social-1.svg", label: "بيهانس", href: SOCIAL_LINKS.behance },
];

const rem = (px: number) => `${px / 10}rem`;

const phoneClass = (item: PhoneLayout) =>
  item.phone === "hidden"
    ? styles.phoneHidden
    : item.phone === "last"
      ? styles.phoneLast
      : undefined;

export function Footer() {
  return (
    <footer className={`${styles.footer} ${tajawal.variable}`}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandTop}>
            <Link href="/" className={styles.brandHome} aria-label="Transformix — الرئيسية">
              <Image
                className={styles.brandLogo}
                src="/images/logo-wide.png"
                alt=""
                width={208}
                height={70}
              />
            </Link>
            <p className={styles.tagline}> حلول رقمية متكاملة تدعم نمو أعمالك</p>
          </div>

          <div className={styles.social}>
            {SOCIAL.map((item) => (
              <a
                key={item.icon}
                className={styles.socialLink}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <Image src={item.icon} alt="" width={40} height={40} aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.columns}>
            {LINK_COLUMNS.map((column) => (
              <div
                key={column.title}
                className={[styles.column, column.id === "company" && styles.phoneLast]
                  .filter(Boolean)
                  .join(" ")}
                style={{ width: rem(COLUMN_WIDTHS[column.id]) }}
              >
                <p className={styles.columnTitle}><Link href={column.href}>{column.title}</Link></p>
                <ul className={styles.columnList}>
                  {column.links.map((link) => (
                    <li key={link.label} className={link.label.includes("ERP") ? styles.phoneLast : undefined}>
                      <Link
                        dir="auto"
                        className={styles.columnLink}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={`${styles.column} ${styles.contact}`}>
              <p className={styles.columnTitle}><Link href="/contact">تواصل معنا</Link></p>
              {CONTACT.map((row) => {
                const text = (
                  <span
                    dir="auto"
                    className={[styles.contactText, row.muted && styles.contactMuted]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {row.text}
                  </span>
                );

                return (
                  <div
                    key={row.text}
                    className={[styles.contactRow, phoneClass(row)]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <Image
                      className={styles.contactIcon}
                      src={row.icon}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                    />
                    <Image
                      className={styles.contactIconMobile}
                      style={{
                        width: rem(row.mobileIcon.width),
                        height: rem(row.mobileIcon.height),
                      }}
                      src={row.mobileIcon.src}
                      alt=""
                      width={row.mobileIcon.width}
                      height={row.mobileIcon.height}
                      aria-hidden
                    />
                    {row.href ? (
                      <a
                        className={row.plain ? undefined : styles.contactLink}
                        href={row.href}
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.legal}>
            <hr className={styles.rule} />
            <p className={styles.copyright}>
              ©جميع الحقوق محفوظة لشركة Transformix
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
