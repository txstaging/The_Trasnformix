"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Brand.module.css";

/** Figma "Tabs Showcase" 5046:10025: the numbered deliverables in a ruled list
    beside a photo. The list is in reading order, so 01 is on the right; the
    chosen row takes the brand tint and its arrow.

    The artboard draws one photo for the whole showcase, so choosing a row
    moves the highlight only. */
export function BrandDeliverables({ items, image, alt, label }: {
  items: readonly string[];
  image: string;
  alt: string;
  /** Names the list for assistive technology. */
  label: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.showcase}>
      <ul className={styles.deliverables} aria-label={label}>
        {items.map((item, index) => {
          const on = index === active;
          return (
            <li key={item} className={styles.deliverableItem}>
              <button
                type="button"
                className={on ? `${styles.deliverable} ${styles.deliverableOn}` : styles.deliverable}
                aria-current={on ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <span className={styles.deliverableNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.deliverableText}>{item}</span>
                <Image className={styles.deliverableArrow} src="/icons/labs/arrow-forward.svg" alt="" width={18} height={18} aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.preview}>
        <div className={styles.previewImage}>
          <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 490px" />
        </div>
      </div>
    </div>
  );
}
