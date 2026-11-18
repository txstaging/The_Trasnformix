import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PillButton } from "@/components/ui/PillButton";
import { jakarta, tajawal } from "@/lib/fonts";
import { AssessmentWizard } from "./AssessmentWizard";
import { GuideSection } from "./GuideSection";
import { ClosingSection } from "./ClosingSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "أنظمة إدارة المؤسسات | Transformix",
  description:
    "افهم متطلبات أعمالك، وقيّم جاهزية مؤسستك، وحدد النهج المناسب قبل تنفيذ نظام تخطيط موارد المؤسسة.",
};

const assessmentSteps = [
  {
    title: "افهم متطلبات أعمالك",
    text: "حدد ما تتوقع الإدارة تغييره أو تحسينه، مثل دقة المخزون وسرعة الإقفال المالي وتحسين التقارير، وصِغه بطريقة قابلة للتحقق.",
    image: "/images/p13.jpg",
    alt: "فريق يناقش متطلبات العمل أمام نظام رقمي",
    icon: "bulb",
  },
  {
    title: "حدد الفجوات التشغيلية والتقنية",
    text: "راجع الإجراءات والأنظمة السابقة وجودة البيانات، وحدد الفجوات بين وظائف النظام والإجراءات المستهدفة.",
    image: "/images/p12.jpg",
    alt: "مراجعة مؤشرات الأعمال والبيانات",
    icon: "chart",
  },
  {
    title: "اختر نهج التنفيذ المناسب",
    text: "قارن البدائل وفق القدرة الوظيفية والتكلفة والبيانات والمخاطر والجدول الزمني، قبل الالتزام بمنتج أو نموذج تشغيل.",
    image: "/images/p11.jpg",
    alt: "فريق يراجع نظامًا لتخطيط موارد المؤسسة",
    icon: "layers",
  },
] as const;

const processSteps = [
  {
    title: "أكمل التقييم",
    text: "أجب عن أسئلة الاستبيان في أربع خطوات، دون الحاجة إلى رفع قواعد بيانات تشغيل حقيقية أو كلمات مرور.",
  },
  {
    title: "استلم دليل التنفيذ",
    text: "يصلك الدليل المرجعي لتنفيذ أنظمة تخطيط موارد المؤسسة على بريدك الإلكتروني للعمل.",
  },
  {
    title: "تواصل مع خبرائنا",
    text: "نراجع إجاباتك ونوثق المتطلبات والفجوات والافتراضات، ثم نناقش معك البدائل المرشحة.",
  },
] as const;

function StepIcon({ name }: { name: (typeof assessmentSteps)[number]["icon"] }) {
  if (name === "bulb") {
    return <><path d="M9 18h6M10 22h4" /><path d="M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.2 1.5-1.3 2.5h-4.4c-.1-1-.5-1.9-1.3-2.5Z" /></>;
  }
  if (name === "chart") {
    return <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /><path d="M16 7h3v3" /></>;
  }
  return <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>;
}

export default function EnterpriseSystemsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${styles.main} ${jakarta.variable} ${tajawal.variable}`}>
        <section className={styles.hero} aria-labelledby="enterprise-systems-title">
          <div className={styles.content}>
            <h1 id="enterprise-systems-title">
              اتخذ قرار ERP الصحيح لأعمالك.
            </h1>
            <p className={styles.lead}>
              افهم متطلبات أعمالك، وقيّم جاهزية مؤسستك، وحدد النهج المناسب قبل
              تنفيذ نظام تخطيط موارد المؤسسة.
            </p>
            <p className={styles.supporting}>
              أكمل تقييمًا منظمًا صُمم للقيادات التنفيذية وأصحاب القرار.
            </p>
            <div className={styles.actions}>
              <PillButton variant="inverse">ابدأ تقييم ERP</PillButton>
            </div>
          </div>
        </section>
        <section className={styles.assessment} aria-labelledby="assessment-title">
          <div className={styles.assessmentIntro}>
            <h2 id="assessment-title">قبل تنفيذ ERP، افهم ما تحتاجه أعمالك فعلًا.</h2>
            <p>
              يساعدك التقييم على تحويل عبارة «نريد نظام ERP» إلى أهداف واضحة ونطاق
              موثق ومعايير قرار قابلة للتحقق.
            </p>
          </div>
          <div className={styles.steps}>
            {assessmentSteps.map((step) => (
              <article className={styles.step} key={step.title}>
                <div className={styles.stepMedia}>
                  <Image src={step.image} alt={step.alt} fill sizes="(max-width: 760px) 100vw, 378px" />
                  <span className={styles.stepIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <StepIcon name={step.icon} />
                    </svg>
                  </span>
                </div>
                <div className={styles.stepCopy}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processIntro}>
            <h2 id="process-title">كيف يعمل التقييم؟</h2>
            <p>ثلاث خطوات واضحة من الإجابة عن الأسئلة إلى مناقشة البدائل مع خبرائنا.</p>
          </div>
          <ol className={styles.processSteps}>
            {processSteps.map((step, index) => (
              <li className={styles.processCard} key={step.title}>
                <span className={styles.processNumber} dir="ltr">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className={styles.progress} aria-hidden="true">
                  {[0, 1, 2].map((bar) => (
                    <i className={bar <= index ? styles.progressActive : undefined} key={bar} />
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.formSection} aria-labelledby="form-title">
          <div className={styles.formIntro}>
            <span className={styles.formBadge}><span aria-hidden="true">▦</span> أربع خطوات ومراجعة</span>
            <h2 id="form-title">استبيان تقييم احتياجات العميل</h2>
            <p>أجب عن الأسئلة في أربع خطوات، ثم راجع إجاباتك وأرسلها. لا يلزم قراءة الدليل كاملًا قبل تعبئة الاستبيان.</p>
          </div>
          <AssessmentWizard />
        </section>
        <GuideSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
