"use client";

import Image from "next/image";
import { useState } from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/Faq.module.css";

type FaqEntry = {
  number: string;
  question: string;
  answer: string;
};

/* NOTE: only the first item is drawn expanded on the artboard, so it is the
   only one whose answer copy exists in Figma. The remaining three carry
   stand-in answers — replace them with the final copy. */
const ITEMS: FaqEntry[] = [
  {
    number: "01",
    question: "Could my project need more than one service?",
    answer:
      "Yes. Many projects need a combination of technology, data, design, and business systems. We shape the solution around the project's needs.",
  },
  {
    number: "02",
    question: "How do I know which solution is right for me?",
    answer:
      "We start with a short conversation to understand your goals and current challenges, then recommend the right approach and services before you make any commitment.",
  },
  {
    number: "03",
    question: "Do you improve existing systems?",
    answer:
      "Yes. We review existing systems, identify opportunities for improvement, and develop or integrate them with other systems without necessarily rebuilding from scratch.",
  },
  {
    number: "04",
    question: "Do you offer custom solutions?",
    answer:
      "Yes. We design each solution around a real need and a clear goal, whether it is an internal system, a digital experience, or an AI solution.",
  },
];

/* Figma 3652:7475 — the call to action on the right, the questions on the
   left. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.row}>
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <Reveal as="h2" className={styles.title}>
              {" Facing a business challenge? Let us help you solve it. "}</Reveal>
            <Reveal as="p" className={styles.lead} delay={120}>
              {" Tell us about your business challenge. Our technical team will help map the right approach and identify the solutions and systems that support your project's growth. "}</Reveal>
          </div>
          <Reveal className={styles.actions} delay={240}>
            <PillButton className={styles.primaryAction}>{"Book a consultation"}</PillButton>
            <PillButton variant="soft" href={"/en/contact"}>
              {" Contact us "}</PillButton>
          </Reveal>
        </div>

        <div className={styles.list}>
          {ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal
                key={item.number}
                delay={index * 90}
                className={[styles.item, isOpen && styles.itemOpen]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.number}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={styles.questionText}>{item.question}</span>

                  <span className={styles.markerCircle}>
                    <Image
                      className={styles.markerIcon}
                      src={isOpen ? "/icons/faq-minus.svg" : "/icons/faq-plus.svg"}
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.number}`}
                  className={[styles.answer, isOpen && styles.answerOpen]
                    .filter(Boolean)
                    .join(" ")}
                  role="region"
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
