"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CREATIVE_HREF } from "@/lib/creativeNav";
import { AI_SUITE_WEBSITE, EXTRA_SERVICES, getServiceWebsite } from "@/lib/serviceNavigation";
import styles from "./ServicesGrid.module.css";

/* One 16:9 photo per service, from the client's service photo set. Data
   science and marketing have none of their own yet, so they keep the
   earlier data-ai and creative scenes. */
const IMAGES = {
  ai: "/images/services/photos/ai.webp",
  data: "/images/services/photos/data-ai.webp",
  software: "/images/services/photos/software.webp",
  ecommerce: "/images/services/photos/ecommerce.webp",
  reservations: "/images/services/photos/reservations.webp",
  marketing: "/images/services/photos/creative.webp",
  research: "/images/services/photos/research.webp",
  outsourcing: "/images/services/photos/outsourcing.webp",
  consulting: "/images/services/photos/consulting.webp",
};

/* The nine services, in the client's order. A service without an `href`
   shows no button until its page exists. */
const SERVICES: { key: string; title: string; text: string; image: string; cta: string; href?: string }[] = [
  {
    key: "ai",
    title: "الذكاء الاصطناعي والأتمتة الذكية",
    text: "حزمة متكاملة من الوكلاء الأذكياء الجاهزين للتخصيص، وحلول ذكاء اصطناعي متخصصة تُطوّر حسب الطلب، لتلبية احتياجات الأعمال في أتمتة العمليات، وتطوير خدمة العملاء والمبيعات، وتحسين الإنتاجية ودعم القرارات، مع التكامل مع الأنظمة والبيانات الحالية.",
    image: IMAGES.ai,
    cta: "استكشف منظومة الوكلاء الأذكياء",
    href: AI_SUITE_WEBSITE,
  },
  {
    key: "data",
    title: "علوم البيانات والذكاء الرقمي",
    text: "حلول متقدمة لتحليل البيانات والتنقيب عنها، وتطوير نماذج تعلم الآلة والتحليلات التنبؤية وذكاء الأعمال والأسواق. تساعد على اكتشاف الأنماط والفرص، وفهم الأداء، وتحويل البيانات التشغيلية والتجارية إلى رؤى قابلة للتطبيق.",
    image: IMAGES.data,
    cta: "اكتشف حلول البيانات",
    href: "/services/data-science",
  },
  {
    key: "software",
    title: "هندسة البرمجيات والتطبيقات",
    text: "أنظمة مؤسسية ومنصات رقمية وحلول تخطيط موارد المؤسسات وإدارة علاقات العملاء مصممة وفق متطلبات الأعمال، إلى جانب تطوير تطبيقات الهواتف الذكية بنوعيها: التطبيقات الأصلية لنظامَي آيفون وأندرويد، والتطبيقات متعددة المنصات، مع التكامل بين الأنظمة والاهتمام بالأمان والأداء وقابلية التوسع.",
    image: IMAGES.software,
    cta: "استكشف حلول البرمجيات",
  },
  {
    key: "ecommerce",
    title: "التجارة الإلكترونية والأسواق متعددة البائعين",
    text: "نطوّر متاجر إلكترونية وأسواقًا رقمية متعددة البائعين تجمع إدارة المنتجات والتجار والطلبات والمدفوعات والخدمات اللوجستية في تجربة تجارية متكاملة. تساعد هذه الحلول الشركات على توسيع قنوات البيع، وتنظيم العمليات التجارية، وتطوير تجربة الشراء، مع التكامل مع أنظمة المخزون والموارد المؤسسية.",
    image: IMAGES.ecommerce,
    cta: "استكشف حلول التجارة الإلكترونية",
    href: getServiceWebsite("web"),
  },
  {
    key: "reservations",
    title: "منصات الحجوزات والخدمات السياحية",
    text: "نطوّر منصات إلكترونية للحجوزات والمواعيد والخدمات السياحية، تشمل إدارة التوافر والحجز والتأكيد والدفع والتواصل مع العملاء ومقدمي الخدمات. تتيح هذه المنصات تحسين تجربة الحجز، وتوسيع الوصول إلى العملاء، وتنسيق العمليات التشغيلية من خلال مواقع الويب وتطبيقات الهواتف الذكية.",
    image: IMAGES.reservations,
    cta: "استكشف منصات الحجوزات",
    href: "/services/tourism",
  },
  {
    key: "marketing",
    title: "الإبداع والتسويق الرقمي متعدد القنوات",
    text: "هوية تجارية مميزة، ومحتوى إبداعي، وتجارب رقمية متكاملة، مدعومة باستراتيجيات تسويق متعدد القنوات، والحملات الإعلانية المدفوعة، وتحسين محركات البحث، لزيادة الوصول إلى العملاء وتعزيز التفاعل وتحقيق نمو قابل للقياس.",
    image: IMAGES.marketing,
    cta: "اطّلع على خدمات التسويق",
    href: CREATIVE_HREF,
  },
  {
    key: "research",
    title: "البحث والابتكار",
    text: "بحث تطبيقي وتجارب تقنية لتطوير منتجات وحلول جديدة، واستكشاف إمكانات التكنولوجيا الناشئة وتحويلها إلى تطبيقات ذات جدوى تجارية. يشمل ذلك تطوير النماذج الأولية والأدوات الذكية والمنتجات ذات الملكية الفكرية، بالتعاون مع الشركاء التقنيين والبحثيين.",
    image: IMAGES.research,
    cta: "استكشف الابتكار",
  },
  {
    key: "outsourcing",
    title: "التعهيد التقني وخدمات الأعمال المُدارة",
    text: "خبرات تقنية وتشغيلية متخصصة تتيح للأعمال سرعة التنفيذ ومرونة التوسع وتحسين اقتصاديات التشغيل، دون الحاجة إلى تأسيس فرق داخلية كاملة. تشمل الخدمات تشغيل التجارة الإلكترونية والحجوزات الرقمية، والدعم التقني وخدمة العملاء والمحاسبة وإدارة الأنظمة، عبر فرق متخصصة ونماذج تعهيد وخدمات مُدارة تناسب حجم الأعمال واحتياجاتها.",
    image: IMAGES.outsourcing,
    cta: "استكشف خدمات التعهيد",
  },
  {
    key: "consulting",
    title: "الاستشارات وبناء المشروعات",
    text: "استشارات متخصصة في استراتيجيات الأعمال والتحول الرقمي والحوكمة والجودة وتطوير العمليات، إلى جانب تطوير المشروعات والمنتجات والشراكات التقنية والتجارية، وفق أهداف العملاء وفرص السوق والجدوى الاقتصادية. وتشمل خبراتنا الجودة 5.0، وتوظيف البيانات والأتمتة والذكاء الاصطناعي في قياس الأداء والتحسين المستمر والجاهزية المؤسسية.",
    image: IMAGES.consulting,
    cta: "استكشف الاستشارات",
    href: EXTRA_SERVICES.find(service => service.key === "ventures")!.website,
  },
];

const number = (index: number) => String(index + 1).padStart(2, "0");
const ease = [0.65, 0, 0.35, 1] as const;

/** The services explorer (Figma 4616:884): the nine services as a numbered
    list, and the one picked opening in the detail panel beside it. */
export function ServicesGrid() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const service = SERVICES[active];
  const external = service.href ? !service.href.startsWith("/") : false;

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title" data-flow="outro">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <h2 id="services-title" className={styles.title}>حلول تقنية ترتبط بأهداف أعمالك.</h2>
          <p className={styles.lead}>نصمّم وننفّذ حلولنا وفق طبيعة كل نشاط وأولوياته، مع التركيز على الأداء والكفاءة والقدرة على النمو.</p>
        </Reveal>

        <div className={styles.explorer}>
          <ol className={styles.list}>
            {SERVICES.map((item, index) => (
              <li key={item.key} className={styles.entry}>
                <button
                  type="button"
                  className={styles.item}
                  data-active={active === index}
                  aria-current={active === index ? "true" : undefined}
                  aria-controls="services-detail"
                  onClick={() => setActive(index)}
                >
                  <span className={styles.number}>{number(index)}</span>
                  <span className={styles.name}>{item.title}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    <Image src="/icons/home/service-arrow-active.svg" alt="" width={20} height={20} />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div id="services-detail" className={styles.panel} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className={styles.detail}
                key={service.key}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.2, ease }}
              >
                <div className={styles.picture}>
                  <Image src={service.image} alt="" fill sizes="(max-width: 1024px) 90vw, 440px" />
                </div>
                <h3 className={styles.detailTitle}>{service.title}</h3>
                <p className={styles.detailText}>{service.text}</p>
                {service.href && (
                  <a
                    href={service.href}
                    className={styles.cta}
                    {...(external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `${service.cta} (يفتح في علامة تبويب جديدة)`,
                        }
                      : {})}
                  >
                    <Image className={styles.ctaArrow} src="/icons/home/arrow-forward-white.svg" alt="" width={20} height={20} aria-hidden />
                    {service.cta}
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
