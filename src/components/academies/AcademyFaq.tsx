"use client";

import Image from "next/image";
import { useId, useState } from "react";
import styles from "./Academies.module.css";

type Question = { question: string; answer: string };

/** The questions (Figma 4726:5394): one open at a time, the first open on
    arrival as the artboard draws it. */
export function AcademyFaq({ items }: { items: readonly Question[] }) {
  const base = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className={styles.faq}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const button = `${base}-q${index}`;
        const panel = `${base}-a${index}`;
        return (
          <li key={item.question} className={open ? `${styles.faqItem} ${styles.faqOpen}` : styles.faqItem}>
            <h3>
              <button
                type="button"
                id={button}
                className={styles.faqButton}
                aria-expanded={open}
                aria-controls={panel}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className={styles.faqQuestion}>{item.question}</span>
                <span className={styles.faqToggle} aria-hidden>
                  <Image
                    src={open ? "/icons/academies/minus.svg" : "/icons/academies/plus.svg"}
                    alt=""
                    width={18}
                    height={18}
                  />
                </span>
              </button>
            </h3>
            <div id={panel} className={styles.faqPanel} role="region" aria-labelledby={button} inert={!open}>
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
