import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SectorButton } from "@/components/sections/sectors/SectorButton";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { StepsAccordion } from "./StepsAccordion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "التجارة الإلكترونية والأسواق متعددة البائعين | Transformix",
  description:
    "نطوّر متاجر إلكترونية وأسواقًا رقمية متعددة البائعين، تجمع عمليات البيع وإدارة المنتجات والطلبات والمدفوعات في منصة واحدة.",
};

/* Figma 5226:32488 — five full-width service cards. */
const SERVICES = [
  {
    image: "/images/ecommerce/service-stores-v2.jpg",
    title: "تطوير المتاجر الإلكترونية",
    text: "إنشاء متاجر إلكترونية تشمل عرض المنتجات، وإدارة التصنيفات، وسلة الشراء، والدفع، ومتابعة الطلبات.",
  },
  {
    image: "/images/ecommerce/service-marketplaces-v2.jpg",
    title: "منصات الأسواق متعددة البائعين",
    text: "تطوير منصات تجمع عدة تجار، مع لوحات تحكم لإدارة المتاجر والمنتجات والطلبات والصلاحيات والعمولات وفق نموذج المنصة.",
  },
  {
    image: "/images/ecommerce/service-orders-v2.jpg",
    title: "إدارة الطلبات والمدفوعات",
    text: "تنظيم دورة الطلب من الشراء حتى التنفيذ، وربط بوابات الدفع والخدمات المرتبطة بالمعاملات.",
  },
  {
    image: "/images/ecommerce/service-shipping-v2.jpg",
    title: "الشحن والخدمات اللوجستية",
    text: "تكاملات مع خدمات الشحن والتوصيل، ومتابعة حالات الطلبات، وتنظيم إجراءات التجهيز والتسليم.",
  },
  {
    image: "/images/ecommerce/service-integrations-v2.jpg",
    title: "تكامل الأنظمة التجارية",
    text: "ربط المنصة بأنظمة المخزون والمحاسبة وتخطيط موارد المؤسسات (ERP) لتقليل تكرار البيانات وتحسين متابعة العمليات.",
  },
];

/* The single-brand store sits at the right, the marketplace at the left. */
const MODELS = [
  {
    icon: "/images/ecommerce/icon-cart.svg",
    tag: "شركة واحدة · إدارة موحّدة",
    title: "متجر إلكتروني لعلامتك",
    text: "لبيع منتجات شركتك عبر تجربة تحمل هويتك.",
    points: [
      "كتالوج منتجات وتصنيفات خاص بك",
      "إدارة مركزية للمخزون والطلبات",
      "رحلة شراء ودفع تناسب عملاءك",
    ],
  },
  {
    icon: "/images/ecommerce/icon-building.svg",
    tag: "تجار متعددون · منصة واحدة",
    title: "سوق يجمع عدة بائعين",
    text: "لربط العملاء بتجار متنوعين ضمن سوقك.",
    points: [
      "مساحة مستقلة لكل تاجر ومنتجاته",
      "صلاحيات وعمولات وفق نموذج المنصة",
      "متابعة موحّدة لأداء المتاجر والطلبات",
    ],
    divided: true,
  },
];

/* 01 sits at the right. */
const STEPS = [
  { title: "نفهم نموذج تجارتك", text: "نحدد العملاء والمنتجات واحتياجات التشغيل." },
  { title: "نصمم تجربة الشراء", text: "نرتّب رحلة العميل وإدارة المنصة." },
  { title: "نطوّر ونربط الأنظمة", text: "نبني الحل ونختبر الدفع والشحن والتكاملات." },
  { title: "نطلق ونتابع التطوير", text: "نهيئ فريقك ونتابع فرص التحسين والتوسع." },
];

/** The artboard's arrow-forward icon: dark on the white button, white on blue. */
function ArrowIcon({ dark = false }: { dark?: boolean }) {
  return (
    <Image
      className={styles.buttonIcon}
      src={dark ? "/images/ecommerce/icon-arrow-dark.svg" : "/images/ecommerce/icon-arrow-light.svg"}
      alt=""
      width={20}
      height={20}
    />
  );
}

/** /services/ecommerce (Figma 5226:32488) — e-commerce stores and multi-vendor
    marketplaces. The page's own navbar and footer are the site's. */
export default function EcommercePage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main}`}>
        <section className={styles.hero} aria-labelledby="ecommerce-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              className={styles.heroImage}
              src="/images/ecommerce/banner-v2.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroCopy}>
            <Reveal as="h1" id="ecommerce-heading" className={styles.heroTitle}>
              منصات تجارة إلكترونية متكاملة
            </Reveal>
            <Reveal as="p" className={styles.heroText} delay={60}>
              نطوّر متاجر إلكترونية وأسواقًا رقمية متعددة البائعين، تجمع عمليات البيع وإدارة
              المنتجات والطلبات والمدفوعات في منصة واحدة.
            </Reveal>
            <Reveal className={styles.heroActions} delay={120}>
              <SectorButton href="#services" tone="light" className={styles.heroButton}>
                استكشف حلول التجارة الإلكترونية
                <ArrowIcon dark />
              </SectorButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.intro} aria-labelledby="ecommerce-intro-heading">
          <div className={styles.introCopy}>
            <Reveal as="h2" id="ecommerce-intro-heading" className={styles.introTitle}>
              تجربة تسوّق أسهل.
              <br />
              عمليات أكثر ترابطًا.
            </Reveal>
            <Reveal as="p" className={styles.introText} delay={80}>
              نصمم الحلول وفق نموذج العمل، سواء لمتجر تابع لشركة واحدة أو سوق يضم عددًا من
              التجار، مع الاهتمام بتجربة العملاء وسهولة إدارة العمليات.
            </Reveal>
          </div>
          <Reveal className={styles.introVisual} delay={80}>
            <Image
              className={styles.introImage}
              src="/images/ecommerce/overview-v2.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 540px"
            />
          </Reveal>
        </section>

        <section id="services" className={styles.services} aria-labelledby="ecommerce-services-heading">
          <div className={styles.inner}>
            <Reveal as="h2" id="ecommerce-services-heading" className={styles.title}>
              كل ما تحتاجه تجارتك، في منصة واحدة
            </Reveal>
            <ul className={styles.serviceGrid}>
              {SERVICES.map((service) => (
                <Reveal as="li" key={service.title} className={styles.service}>
                  <div className={styles.serviceBody}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceText}>{service.text}</p>
                    <SectorButton className={styles.serviceButton}>
                      تعرّف على الخدمة
                      <ArrowIcon />
                    </SectorButton>
                  </div>
                  <div className={styles.serviceMedia}>
                    <Image
                      className={styles.serviceImage}
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 600px"
                    />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.models} aria-labelledby="ecommerce-models-heading">
          <div className={styles.inner}>
            <Reveal as="h2" id="ecommerce-models-heading" className={styles.title}>
              أي نموذج يناسب تجارتك؟
            </Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              نبدأ من طريقة عملك، ثم نبني المنصة التي تدعمها.
            </Reveal>
            <ul className={styles.modelGrid}>
              {MODELS.map((model, index) => (
                <Reveal as="li" key={model.title} className={styles.model} delay={index * 90}>
                  <div className={styles.modelHead}>
                    <span className={styles.modelIcon}>
                      <Image src={model.icon} alt="" width={26} height={26} />
                    </span>
                    <p className={styles.modelTag}>{model.tag}</p>
                  </div>
                  <h3 className={styles.modelTitle}>{model.title}</h3>
                  <p className={styles.modelText}>{model.text}</p>
                  <hr className={`${styles.modelDivider} ${model.divided ? styles.modelDividerShown : ""}`} />
                  <ul className={styles.modelPoints}>
                    {model.points.map((point) => (
                      <li key={point}>
                        <Image src="/images/ecommerce/icon-check.svg" alt="" width={26} height={26} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="ecommerce-process-heading">
          <div className={styles.processInner}>
            <Reveal as="h2" id="ecommerce-process-heading" className={styles.title}>
              من الفكرة إلى الإطلاق
            </Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              خطوات واضحة لبناء منصة تناسب تشغيلك اليوم، وتدعم نموك غدًا.
            </Reveal>
            <StepsAccordion steps={STEPS} image="/images/ecommerce/service-stores-v2.jpg" />
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="ecommerce-cta-heading">
          <Reveal className={styles.ctaCard}>
            <div className={styles.ctaCopy}>
              <h2 id="ecommerce-cta-heading" className={styles.ctaTitle}>
                حلول تناسب نموذج تجارتك
              </h2>
              <p className={styles.ctaText}>
                سواء كنت تطلق متجرًا جديدًا أو تبني سوقًا متعدد البائعين، نطوّر المنصة وفق
                احتياجات التشغيل والتوسع.
              </p>
              <SectorButton className={styles.ctaButton}>
                استكشف حلول التجارة الإلكترونية
                <ArrowIcon />
              </SectorButton>
            </div>
            <div className={styles.ctaMedia}>
              <Image
                className={styles.ctaImage}
                src="/images/ecommerce/service-marketplaces-v2.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
              />
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
