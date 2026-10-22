import Link from "next/link";
import type { CSSProperties } from "react";
import { SERVICE_CATEGORIES } from "@/english/lib/serviceNavigation";
import { contactHref, serviceHref, type ServiceKey } from "@/english/components/v2/routes";
import { Button } from "@/english/components/v2/ui/Button";
import styles from "@/english/components/v2/services/ServiceDirectory.module.css";

/* Figma 3783:7982 — 01 and 02 on the first row, 03 and 04 below, numbered
   right to left. `textWidth` is the box each description wraps in. */
const TEXT_WIDTHS: Record<ServiceKey, number> = { data: 533, web: 529, marketing: 496, erp: 412 };
const CHAPTERS = SERVICE_CATEGORIES.map(service => ({
  ...service,
  title: service.label,
  textWidth: TEXT_WIDTHS[service.key],
}));

/** The four "Service overview — centered" cards. The title opens the
    service page; the button opens the contact form for that service. */
export function ServiceDirectory() {
  return (
    <section className={styles.grid} aria-label={"Services"}>
      {CHAPTERS.map((chapter, index) => (
        <article key={chapter.key} className={styles.card}>
          <p className={styles.number}>{String(index + 1).padStart(2, "0")}</p>
          <h2 className={styles.title}>
            <Link href={serviceHref(chapter.key)} className={styles.titleLink}>
              {chapter.title}
            </Link>
          </h2>
          <p
            className={styles.text}
            style={{ "--text-w": `${chapter.textWidth / 10}rem` } as CSSProperties}
          >
            {chapter.text}
          </p>
          <Button href={contactHref(chapter.key)}>{"Request this service"}</Button>
        </article>
      ))}
    </section>
  );
}
