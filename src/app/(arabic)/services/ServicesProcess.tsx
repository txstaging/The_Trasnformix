"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ServicesProcess.module.css";

const steps = [
  {
    title: "جلسة الاستكشاف",
    text: "نبدأ بجلسات استكشافية متعمقة لفهم أهداف مشروعك، وتحديات العمل الحالية، وسير العمليات التشغيلية؛ لبناء رؤية واضحة ودقيقة قبل اقتراح أي حل تقني.",
    image: "/images/p16.jpg",
    alt: "جلسة عمل لاستكشاف احتياجات المشروع",
  },
  {
    title: "تقييم الجاهزية",
    text: "نراجع البيانات والأنظمة والموارد المتاحة، ونقيّم جاهزية المؤسسة لتنفيذ الحلول التقنية وتكاملها مع أسلوب العمل الحالي.",
    image: "/images/p10.png",
    alt: "تقييم أداء الأعمال والبيانات",
  },
  {
    title: "تصميم النطاق",
    text: "نحدد نطاق العمل والمخرجات والأولويات، ونرتب المتطلبات في مسار واضح قابل للتنفيذ والقياس.",
    image: "/images/p11.jpg",
    alt: "فريق يناقش نطاق المشروع ومتطلباته",
  },
  {
    title: "خطة تنفيذ",
    text: "نتفق على المراحل والمراجعات وآلية التسليم، مع خطة تراعي مواردك وأولوياتك وتدعم استمرارية العمل.",
    image: "/images/p15.jpg",
    alt: "مختصون يعملون على تنفيذ حل تقني",
  },
];

export function ServicesProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const columns = steps.map((_, index) => index === activeStep ? "2.8fr" : "0.72fr").join(" ");

  return (
    <section className={styles.section} aria-labelledby="services-process-heading" dir="rtl">
      <div className={styles.intro}>
        <Reveal as="span" className={styles.eyebrow}>كيف نعمل معك؟</Reveal>
        <Reveal as="h2" id="services-process-heading">من فهم التحدي إلى خطة واضحة</Reveal>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "استئناف الحركة" : "إيقاف مؤقت"}
        </button>
      </div>

      <div className={styles.timeline} style={{ "--step-columns": columns } as CSSProperties}>
        {steps.map((step, index) => {
          const active = index === activeStep;
          return (
            <button
              className={`${styles.step} ${active ? styles.active : ""}`}
              key={step.title}
              type="button"
              aria-current={active ? "step" : undefined}
              aria-label={`${String(index + 1).padStart(2, "0")}: ${step.title}`}
              onClick={() => setActiveStep(index)}
            >
              <span className={styles.number} dir="ltr">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.title}>{step.title}</span>
              <span key={active ? `active-${index}` : `idle-${index}`} className={`${styles.detail} ${active ? styles.detailVisible : ""}`}>
                <span className={styles.description}>{step.text}</span>
                <span className={styles.imageWrap}>
                  <Image key={active ? step.image : `${step.image}-idle`} src={step.image} alt={step.alt} fill sizes="(max-width: 700px) 90vw, 55vw" />
                </span>
              </span>
              <span className={styles.progress} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
