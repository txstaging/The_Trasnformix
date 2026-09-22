import Image from "next/image";
import Link from "next/link";
import { tajawal } from "@/lib/fonts";
import styles from "./Footer.module.css";

/* The 375 navy artboard (Figma 2524:3054) carries a shorter footer: no UAE
   address and no استديو الابداع, with ERP listed last. Those entries are
   flagged here and only dropped by the navy phone layout. */
type PhoneLayout = {
  phone?: "hidden" | "last";
};

type FooterLink = PhoneLayout & {
  label: string;
  href: string;
};

type LinkColumn = PhoneLayout & {
  title: string;
  width: number;
  links: FooterLink[];
};

/* Right-to-left order, so "الشركة" sits furthest right as on the artboard. */
const COLUMNS: LinkColumn[] = [
  {
    title: "الشركة",
    width: 123,
    links: [
      { label: "من نحن", href: "/about" },
      { label: "اعمالنا", href: "/works" },
      { label: "المدونة", href: "#" },
    ],
  },
  {
    title: "الخدمات",
    width: 123,
    links: [
      { label: "علوم البيانات", href: "#" },
      { label: "الذكاء الاصطناعي", href: "#" },
      { label: "استديو الابداع", href: "#", phone: "hidden" },
      { label: "انظمة ERP ", href: "#", phone: "last" },
      { label: "تطوير المواقع", href: "#" },
    ],
  },
];

type Glyph = { src: string; width: number; height: number };

type ContactRow = PhoneLayout & {
  icon: string;
  /** The 375 navy footer (Figma 2524:3054) draws its own, smaller glyphs. */
  mobileIcon: Glyph;
  text: string;
  href?: string;
  muted: boolean;
  /** Artboard underlines the email only. */
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
  { icon: "/icons/social-4.svg", label: "فيسبوك" },
  { icon: "/icons/social-3.svg", label: "إنستغرام" },
  { icon: "/icons/social-2.svg", label: "لينكدإن" },
  { icon: "/icons/social-1.svg", label: "بيهانس" },
];

const rem = (px: number) => `${px / 10}rem`;

const phoneClass = (item: PhoneLayout) =>
  item.phone === "hidden"
    ? styles.phoneHidden
    : item.phone === "last"
      ? styles.phoneLast
      : undefined;

type FooterProps = {
  /** `navy` is the footer of the about artboards — Figma 2515:60030 (1440)
      and 2524:3054 (375): a #0a1836 ground with the all-white lockup, and on
      phones a single stacked column set in Tajawal. */
  variant?: "default" | "navy";
};

export function Footer({ variant = "default" }: FooterProps) {
  const navy = variant === "navy";

  return (
    <footer
      className={[styles.footer, navy && styles.navy, navy && tajawal.variable]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandTop}>
            <Image
              className={styles.brandLogo}
              src={navy ? "/icons/logo-footer-light.svg" : "/icons/logo-footer.svg"}
              alt="Transformix"
              width={173}
              height={111}
            />
            {navy && (
              <Image
                className={styles.brandLogoMobile}
                src="/icons/logo-footer-mobile.svg"
                alt="Transformix"
                width={140}
                height={90}
              />
            )}
            <p className={styles.tagline}> حلول رقمية متكاملة تدعم نمو أعمالك</p>
          </div>

          <div className={styles.social}>
            {SOCIAL.map((item) => (
              <a
                key={item.icon}
                className={styles.socialLink}
                href="#"
                aria-label={item.label}
              >
                <Image src={item.icon} alt="" width={40} height={40} aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.columns}>
            {COLUMNS.map((column) => (
              <div
                key={column.title}
                className={[styles.column, phoneClass(column)]
                  .filter(Boolean)
                  .join(" ")}
                style={{ width: rem(column.width) }}
              >
                <p className={styles.columnTitle}>{column.title}</p>
                <ul className={styles.columnList}>
                  {column.links.map((link) => (
                    <li key={link.label} className={phoneClass(link)}>
                      <Link
                        dir="auto"
                        className={styles.columnLink}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={`${styles.column} ${styles.contact}`}>
              <p className={styles.columnTitle}>تواصل معنا</p>
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
                    {navy && (
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
                    )}
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
