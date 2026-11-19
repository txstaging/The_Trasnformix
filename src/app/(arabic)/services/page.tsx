import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { ServicesProcess } from "./ServicesProcess";
import flow from "@/components/ui/SectionFlow.module.css";
import { SERVICES_INTRO } from "@/lib/serviceNavigation";
import { SERVICES_OVERVIEW } from "@/lib/servicesOverview";
import styles from "./page.module.css";

const serviceCards = [
  { label: "الذكاء الاصطناعي والأتمتة الذكية", text: "حلول متكاملة من الوكلاء الأذكياء الجاهزين للتخصيص وحلول ذكاء اصطناعي متخصصة تُطوّر حسب الطلب.", href: "https://ai.thetransformix.com/" },
  { label: "علوم البيانات والذكاء الرقمي", text: "تحويل البيانات المتفرقة إلى مؤشرات واضحة تدعم القرار وتكشف فرص التحسين.", href: "/services/data-science" },
  { label: "هندسة البرمجيات والتطبيقات", text: "نبني تجارب رقمية واضحة وسريعة، ونطوّر حلولًا تلائم طبيعة أعمالك.", href: "/services/software-engineering" },
  { label: "نظام إدارة المؤسسات", text: "نظم العمليات واربط الإدارات في منظومة مرنة تدعم العمل اليومي.", href: "/services/enterprise-systems" },
  { label: "خدمات Odoo", text: "تهيئة وتخصيص منظومة Odoo لتطبيقات الأعمال المختلفة، وفق الاحتياج وطريقة التشغيل المناسبة.", href: "/services/odoo" },
  { label: "التجارة الإلكترونية والأسواق متعددة البائعين", text: "نطوّر متاجر وأسواقًا رقمية متعددة البائعين تجمع إدارة المنتجات والطلبات والمدفوعات والخدمات اللوجستية.", href: "/services/ecommerce" },
  { label: "منصات الحجوزات والخدمات السياحية", text: "نطوّر منصات إلكترونية للحجوزات والمواعيد والخدمات السياحية، تشمل إدارة التوافر والحجز والتأكيد والدفع.", href: "/services/tourism" },
  { label: "الإبداع والتسويق الرقمي متعدد القنوات", text: "إدارة الرسالة بالمحتوى والتصميم، ضمن تجربة متسقة عبر القنوات الرقمية.", href: "/services/creative" },
  { label: "البحث والابتكار", text: "بحث تطبيقي وتجارب تقنية لتطوير منتجات وحلول جديدة، واستكشاف إمكانات التكنولوجيا الناشئة.", href: "/services" },
  { label: "التعهيد التقني وخدمات الأعمال المُدارة", text: "خبرات تقنية وتشغيلية متخصصة تتيح للأعمال سرعة التنفيذ والاستمرارية، دون الحاجة إلى تأسيس فرق داخلية كاملة.", href: "/services/gbs" },
  { label: "الشركات الناشئة", text: "نبني الشركات التقنية مع مؤسسيها بشكل منهجي، من الفكرة والتحقق إلى الإطلاق والتوسع.", href: "/ventures" },
];

export const metadata: Metadata = {
  title: "جميع الخدمات | Transformix",
  description: SERVICES_INTRO.lead,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main}`}>
        <section className={styles.hero} aria-labelledby="services-hero-title">
          <div className={styles.heroContent}>
            <Reveal as="h1" id="services-hero-title">{SERVICES_INTRO.title}</Reveal>
            <Reveal as="p" delay={120}>{SERVICES_INTRO.lead}</Reveal>
            <Reveal delay={240}>
              <PillButton variant="inverse">اطلب استشارة مجانية</PillButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.wrap} aria-labelledby="services-heading">
          <Reveal as="h2" id="services-heading" className={styles.heading}>جميع الخدمات</Reveal>
          <ul className={styles.directory}>
            {serviceCards.map((service, index) => (
              <li key={service.href}>
                <Reveal as="a" href={service.href}
                  className={styles.serviceCard} delay={index * 80}
                  aria-label={service.label}>
                  <span className={styles.number} dir="ltr">0{index + 1}</span>
                  <h3>{service.label}</h3>
                  <p>{service.text}</p>
                  <span className={styles.siteLink}>زيارة الخدمة <span aria-hidden="true">↖</span></span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.guidance} aria-labelledby="services-challenges-heading">
          <div className={styles.wrap}>
            <Reveal as="h2" id="services-challenges-heading" className={styles.heading}>
              {SERVICES_OVERVIEW.challenges.title}
            </Reveal>
            <div className={styles.challengeGrid}>
              {SERVICES_OVERVIEW.challenges.items.map((item, index) => (
                <Reveal as="article" key={item.title} className={styles.challengeCard} delay={index * 80}>
                  <Image src={item.icon} alt="" width={24} height={24} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ServicesProcess />

        <section className={`${styles.wrap} ${styles.faq}`} aria-labelledby="services-faq-heading">
          <Reveal as="h2" id="services-faq-heading" className={styles.heading}>الأسئلة الشائعة</Reveal>
          {SERVICES_OVERVIEW.faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className={`${styles.wrap} ${styles.closing}`} aria-labelledby="services-cta-heading">
          <div className={styles.closingCopy}>
            <Reveal as="h2" id="services-cta-heading">{SERVICES_OVERVIEW.cta.title}</Reveal>
            <Reveal as="p">{SERVICES_OVERVIEW.cta.text}</Reveal>
            <Reveal><PillButton variant="primary" size="compact">اطلب استشارة مجانية</PillButton></Reveal>
          </div>
          <Reveal className={styles.closingImage}>
            <Image src="/images/p17.png" alt="فريق يناقش أولويات مشروع وخطواته" fill sizes="(max-width: 640px) 90vw, 40vw" />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
