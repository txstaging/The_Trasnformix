import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ContactSection.module.css";

const DETAILS = [
  {
    icon: "/icons/contact/mail.svg",
    label: "البريد الإلكتروني",
    value: "Info@thetransformix.com",
    href: "mailto:Info@thetransformix.com",
  },
  {
    icon: "/icons/contact/phone.svg",
    label: "الهاتف",
    value: "+966567623953",
    href: "tel:+966567623953",
    ltr: true,
  },
  {
    icon: "/icons/contact/map-pin.svg",
    label: "مقر الشركة",
    value: "المملكة العربية السعودية ,جدة",
    address: true,
  },
  {
    icon: "/icons/contact/clock.svg",
    label: "ساعات العمل",
    value: "الاحد - للخميس",
    small: true,
  },
];

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/** The company card on the right, the message form on the left. */
export function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.info}>
          <div className={styles.intro}>
            <h2 className={styles.title}>بيانات الشركة</h2>
            <p className={styles.lead}>تفضّل التواصل مباشرة؟ اختر الطريقة الأنسب لك.</p>
          </div>

          <span className={styles.divider} aria-hidden />

          <ul className={styles.list}>
            {DETAILS.map((item) => (
              <li key={item.label} className={styles.item}>
                <span className={styles.icon} aria-hidden>
                  <Image src={item.icon} alt="" width={21} height={21} />
                </span>
                <span className={styles.details}>
                  <span className={styles.label}>{item.label}</span>
                  {item.href ? (
                    <a
                      className={styles.value}
                      href={item.href}
                      dir={item.ltr ? "ltr" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      className={cx(
                        styles.value,
                        item.address && styles.address,
                        item.small && styles.small,
                      )}
                    >
                      {item.value}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.formSlot} delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
