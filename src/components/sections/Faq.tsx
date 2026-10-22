"use client";

import Image from "next/image";
import { useState } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Faq.module.css";

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
    question: "هل يمكن أن يحتاج مشروعي أكثر من خدمة؟",
    answer:
      "نعم. كثير من المشاريع تحتاج مزيجًا من التقنية، البيانات، التصميم والأنظمة، لذلك نكوّن الحل حسب احتياج المشروع وليس حسب خدمة واحدة.",
  },
  {
    number: "02",
    question: "كيف أعرف أي حل مناسب لي؟",
    answer:
      "نبدأ بجلسة قصيرة نفهم فيها أهدافك وتحدياتك الحالية، ثم نقترح المسار والخدمات الأنسب لمشروعك قبل أي التزام.",
  },
  {
    number: "03",
    question: "هل تعملون على تطوير أنظمة موجودة بالفعل؟",
    answer:
      "نعم. نراجع الأنظمة القائمة، نحدد فرص التحسين، ونطوّرها أو نربطها بأنظمة أخرى دون الحاجة إلى إعادة البناء من الصفر.",
  },
  {
    number: "04",
    question: "هل تقدمون حلولًا مخصصة؟",
    answer:
      "نعم. نصمم كل حل حول احتياج حقيقي وهدف واضح، سواء كان نظامًا داخليًا، تجربة رقمية أو حلًا مبنيًا على الذكاء الاصطناعي.",
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
              هل لديك تحديات تواجهه اعملك؟ دعنا نساعدك في حلها
            </Reveal>
            <Reveal as="p" className={styles.lead} delay={120}>
              شاركنا التحدي الذي يواجه أعمالك، وسيتولى فريقنا التقني رسم المسار
              الأمثل وتحديد الحلول والأنظمة الأنسب لنمو مشروعك.
            </Reveal>
          </div>
          <Reveal className={styles.actions} delay={240}>
            <PillButton className={styles.primaryAction}>احجز استشارة الان</PillButton>
            <PillButton variant="soft" href="/contact">
              تواصل معنا
            </PillButton>
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
