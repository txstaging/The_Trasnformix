import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ManufacturingSubnav } from "@/components/sections/manufacturing/ManufacturingSubnav";
import { Navbar } from "@/components/sections/Navbar";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "الذكاء الاصطناعي والتحليلات | Transformix",
  description:
    "تحليلات وتنبؤات صناعية تربط بيانات الإنتاج والمخزون والتكاليف والمبيعات لدعم قرارات المصنع.",
};

const AI_CAPABILITIES = [
  {
    icon: "trend",
    title: "التنبؤ بالطلب واحتياجات المواد",
    text: "يمكن تطوير نماذج تستفيد من الطلبات السابقة والموسمية ومعدلات الاستهلاك ومهل التوريد لتقدير الطلب والمواد المطلوبة، ومساعدة فرق التخطيط والمشتريات على مراجعة السيناريوهات قبل اعتماد خطة الإنتاج. تعتمد موثوقية التوقعات على البيانات المتاحة والتحقق من أداء النماذج.",
  },
  {
    icon: "globe",
    title: "وكيل الأخبار والأسواق ومخاطر الإمداد",
    text: "يتابع مصادر الأخبار الاقتصادية والتجارية ومعلومات الأسواق والموردين التي تحددها المنشأة، وينظم المستجدات المرتبطة بالمواد والطاقة والنقل والقيود التجارية والأحداث الجيوسياسية. ويربط المعلومات ذات الصلة بأصناف أو أسواق أو موردين محددين، ليعرض للإدارة تنبيهات مفسّرة بمصادرها وتاريخها؛ فلا تتحول الأخبار العامة إلى إنذارات غير قابلة للتحقق.",
  },
  {
    icon: "database",
    title: "وكيل البيانات والأداء التشغيلي",
    text: "يساعد الفرق على الاستعلام عن مؤشرات الإنتاج والمخزون والمبيعات والتكاليف بلغة طبيعية، ومقارنة الفترات والمصانع أو خطوط العمل، واستخراج تقارير تبيّن أسباب التغيرات المحتملة ضمن البيانات المتاحة. ويقتصر وصوله إلى المعلومات على الصلاحيات المعتمدة.",
  },
  {
    icon: "cart",
    title: "وكيل المشتريات والموردين",
    text: "يمكنه تجميع بيانات عروض الأسعار ومهل التوريد وسجل التعامل مع الموردين، وتحليل الاختلافات في التكلفة والتوافر، وعرض بدائل تستحق المراجعة. وتبقى قرارات اختيار المورد والشراء والتعاقد بيد المسؤولين المخولين.",
  },
  {
    icon: "chart",
    title: "وكيل التكاليف والسيناريوهات الإدارية",
    text: "يساعد في تقييم أثر تغير أسعار المواد أو الشحن أو الطاقة على تكلفة المنتج وهوامش الربح، ومقارنة بدائل الإنتاج أو إعادة الجدولة أو الشراء. ويمكن تقديم النتائج في ملخص إداري يوضح الافتراضات ومصادر البيانات والمخاطر، دون تقديم تقديرات غير مدعومة بوصفها نتائج مؤكدة.",
  },
  {
    icon: "chat",
    title: "وكلاء التواصل والمعرفة المؤسسية",
    text: "يمكن توظيف قدرات التواصل لمساندة فرق خدمة العملاء والمبيعات في متابعة الاستفسارات والطلبات، وقدرات البحث المعرفي للوصول إلى إجراءات المصنع ودلائل التشغيل والمستندات المصرح بها. ويُحدد لكل وكيل نطاق معرفي وصلاحيات وتكاملات واضحة.",
  },
];

export default function ManufacturingAnalyticsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <ManufacturingSubnav active="analytics" />
      <main>
        <section className={`${styles.hero} ${styles.analyticsHero}`} aria-labelledby="analytics-title">
          <div className={`${styles.heroContent} ${styles.analyticsContent}`}>
            <h1 id="analytics-title">الذكاء الاصطناعي والتنبؤات ودعم القرارات</h1>
            <p>
              عندما تتوافر بيانات الإنتاج والمخزون والتكاليف والمبيعات، تستطيع إدارة المصنع بناء تحليلات تفسّر الأداء وتكشف الانحرافات وتقدّر الاحتياجات المستقبلية. ويمكن توسيع هذه الرؤية بمعلومات الأسواق والموردين والأخبار ذات التأثير على سلسلة الإمداد. وتستفيد TX Manufacturing من قدرات حزمة الذكاء الاصطناعي الموجودة لدى Transformix في التحليل والبحث المعرفي والتواصل، مع تهيئتها وربطها بحسب بيانات المنشأة.
            </p>
          </div>
        </section>

        <section className={styles.manufacturingCycle} aria-label="وكلاء الذكاء الاصطناعي والتحليلات">
          <div className={styles.manufacturingCycleInner}>
            <div className={styles.manufacturingCycleGrid}>
              {AI_CAPABILITIES.map((item) => (
                <article className={styles.cycleCard} key={item.title}>
                  <span className={styles.cycleIcon} aria-hidden="true">
                    {item.icon === "trend" && <svg viewBox="0 0 24 24"><path d="m3 17 6-6 4 4 8-9m-6 0h6v6" /></svg>}
                    {item.icon === "globe" && <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" /></svg>}
                    {item.icon === "database" && <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>}
                    {item.icon === "cart" && <svg viewBox="0 0 24 24"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6M10 21h.01M18 21h.01" /></svg>}
                    {item.icon === "chart" && <svg viewBox="0 0 24 24"><path d="M4 20V4m0 16h17M8 16v-4m5 4V7m5 9V9" /></svg>}
                    {item.icon === "chat" && <svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" /></svg>}
                  </span>
                  <h3>{item.title}</h3>
                  <p className={styles.cycleExcerpt}>{item.text}</p>
                  <details className={styles.cycleDetails}>
                    <summary>قراءة المزيد</summary>
                    <p>{item.text}</p>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.analyticsOrchestration} aria-labelledby="orchestration-title">
          <div className={styles.analyticsOrchestrationInner}>
            <div className={styles.analyticsOrchestrationCopy}>
              <h2 id="orchestration-title">تنسيق الوكلاء ودعم الإدارة</h2>
              <p>
                يمكن تصميم سير عمل تتعاون فيه قدرات الأخبار والتنبؤ والبيانات والمشتريات والتكاليف حول حدث واحد، مثل تعطل مورد رئيسي أو ارتفاع سعر مادة خام. تجمع الأدوات المعلومات، وتقارن السيناريوهات، وتعرض توصيات قابلة للمراجعة قبل اتخاذ القرار. <strong>هذه التدفقات الصناعية المتخصصة تتطلب تهيئة وتكاملًا واختبارًا</strong>؛ بينما نستفيد أولًا من قدرات التحليل والمعرفة والتواصل الموجودة بالفعل في الحزمة.
              </p>
            </div>
            <div className={styles.analyticsOrchestrationImage} role="img" aria-label="واجهة رقمية لمتابعة مؤشرات العمل من الحاسوب والهاتف" />
          </div>

          <aside className={styles.analyticsCallout}>
            <h3>يمكنك استخدام هذه الطبقة دون تغيير نظام التصنيع.</h3>
            <p>
              إذا كان النظام الحالي يدير الإنتاج جيدًا، يمكن ربط البيانات المتاحة بتحليلات أو وكلاء متخصصين وفق متطلبات الاتصال والخصوصية والصلاحيات، دون تركيب MRP جديد أو استبدال التطبيقات القائمة.
            </p>
          </aside>
        </section>

        <section className={styles.equipmentIntegration} aria-labelledby="equipment-integration-title">
          <div className={styles.equipmentIntegrationInner}>
            <div className={styles.equipmentIntegrationCopy}>
              <h2 id="equipment-integration-title">تكامل أنظمة التصنيع مع المعدات والآلات</h2>
              <p>
                يمكن للمصنع الذي يستخدم TX Manufacturing، أو أي نظام تصنيع آخر مثل Odoo، دراسة ربط بيانات التشغيل بمعدات الإنتاج والمستشعرات والبوابات الصناعية عند توفر واجهات الاتصال الملائمة. وقد يشمل ذلك تسجيل القراءات وحالة المعدات وبيانات الفحص والإنتاج، وربطها بالتقارير أو أدوات التحليل.
              </p>
              <p>
                يعتمد نطاق التكامل على نوع النظام وإصداره وبروتوكولات المعدات والتطبيقات الوسيطة والأمن السيبراني والسلامة الصناعية. ويختلف جمع البيانات ومراقبة التشغيل عن التحكم بالآلات والروبوتات؛ لذلك يُدرس كل استخدام فنيًا قبل اعتماده، بما في ذلك معدات المصانع القديمة.
              </p>
            </div>
            <div className={styles.equipmentIntegrationImage} role="img" aria-label="معدات وروبوتات صناعية داخل مصنع حديث" />
          </div>
        </section>

        <section className={styles.closingCta} aria-labelledby="analytics-cta-title">
          <div className={styles.closingCtaCard}>
            <h2 id="analytics-cta-title">ناقش أولويات التطوير في مصنعك</h2>
            <p>
              ابدأ بالمجال الذي سيضيف قيمة واضحة لعملياتك. يمكن لفريق Transformix دراسة نظام الإدارة والتصنيع والبيانات والتدريب، ثم اقتراح تكوين يتوافق مع ما تستخدمه بالفعل.
            </p>
            <div className={styles.closingActions}>
              <Link className={styles.closingPrimary} href="/contact">
                اطلب جلسة استكشافية <span aria-hidden="true">←</span>
              </Link>
              <Link className={styles.closingSecondary} href="/contact">
                اطلب عرضًا توضيحيًا <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
