import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ManufacturingSubnav } from "@/components/sections/manufacturing/ManufacturingSubnav";
import { Navbar } from "@/components/sections/Navbar";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "إدارة التصنيع وتخطيط الاحتياجات من المواد | Transformix",
  description:
    "اربط طلب العملاء بخطط الإنتاج وقوائم المواد والمشتريات والمخزون ومراكز العمل والتكاليف عبر تطبيقات Manufacturing/MRP.",
};

const CYCLE_CAPABILITIES = [
  {
    icon: "calendar",
    title: "التخطيط والطلب",
    text: "إعداد خطط الإنتاج والكميات والمواعيد وفق الطلبات والأولويات والقدرة التشغيلية والموارد المتاحة.",
  },
  {
    icon: "layers",
    title: "قوائم المواد واحتياجات التصنيع",
    text: "تعريف قوائم المواد (BOM) ومكوناتها، وربطها بالأرصدة والمشتريات لتحديد المواد المطلوبة ونقاط النقص المحتملة.",
  },
  {
    icon: "factory",
    title: "أوامر التصنيع ومراكز العمل",
    text: "تنظيم أوامر الإنتاج ومراحل التشغيل ومراكز العمل، ومتابعة الكميات والوقت والحالة التشغيلية وفق إمكانات النظام المختار.",
  },
  {
    icon: "truck",
    title: "المخزون والمشتريات واللوجستيات",
    text: "ربط الاستلام والصرف والتحويل والتوريد بالاحتياجات الفعلية للإنتاج، مع إمكان الاستفادة من TX Logistics عند الحاجة إلى عمليات مستودعات أكثر تخصصًا.",
  },
  {
    icon: "chart",
    title: "التكاليف وتقارير التنفيذ",
    text: "تحليل تكلفة المواد والعمليات والموارد وتتبع البيانات التشغيلية والمالية المرتبطة بالإنتاج بحسب إعدادات النظام والتكاملات المتاحة.",
  },
  {
    icon: "quality",
    title: "جودة التصنيع والصيانة",
    text: "تنظيم نقاط الفحص ونتائج الجودة وأوامر الصيانة عندما تتوافر الوظائف المناسبة ضمن نظام التصنيع أو عبر تطبيقات متكاملة معه.",
  },
];

export default function ManufacturingPlanningPage() {
  return (
    <>
      <Navbar variant="slim" />
      <ManufacturingSubnav active="planning" />
      <main>
        <section className={`${styles.hero} ${styles.planningHero}`} aria-labelledby="planning-title">
          <div className={`${styles.heroContent} ${styles.planningContent}`}>
            <h1 id="planning-title">إدارة التصنيع وتخطيط الاحتياجات من المواد</h1>
            <p className={styles.planningLead}>خطط الإنتاج والمواد والتكاليف في دورة عمل مترابطة.</p>
            <p>
              تساعدك تطبيقات إدارة التصنيع وتخطيط الاحتياجات من المواد (Manufacturing/MRP) على تنظيم علاقة طلب العملاء بخطط الإنتاج وقوائم المواد والمشتريات والمخزون ومراكز العمل والتكاليف. وتتصل هذه الوظائف بتطبيقات إدارة موارد المؤسسة بحسب ما يحتاجه مصنعك من بيانات مبيعات وحسابات وموارد أخرى.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/contact">
                ناقش أولويات التطوير في مصنعك <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.planningPaths} aria-labelledby="planning-paths-title">
          <div className={styles.planningPathsInner}>
            <h2 id="planning-paths-title">
              تستطيع تطوير بيئة التصنيع في مصنعك عبر مسارين، بحسب الأنظمة التي تستخدمها بالفعل والعمليات المطلوب تشغيلها.
            </h2>
            <div className={styles.planningPathsGrid}>
              <article className={styles.planningPathCard}>
                <span className={styles.planningPathIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 21V5h18v16H3ZM7 17v-4m5 4V9m5 8v-6M1 21h22" /></svg>
                </span>
                <h3>المسار الأول: TX Manufacturing.</h3>
                <p className={styles.planningPathExcerpt}>
                  اختيار وحدات إدارة التصنيع وتخطيط المواد المتاحة، وتهيئتها وفق مراحل الإنتاج، مع تطوير الوظائف الخاصة عند الحاجة.
                </p>
                <details className={styles.planningPathDetails}>
                  <summary>قراءة المزيد</summary>
                  <p>
                    اختيار وحدات إدارة التصنيع وتخطيط المواد المتاحة، وتهيئتها وفق مراحل الإنتاج، مع تطوير الوظائف الخاصة عند الحاجة.
                  </p>
                </details>
              </article>
              <article className={styles.planningPathCard}>
                <span className={styles.planningPathIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M10 13.5 14 9.5m-7.5 7.5-2 2a4.24 4.24 0 0 1-6-6l5-5a4.24 4.24 0 0 1 6 0m2-2 2-2a4.24 4.24 0 0 1 6 6l-5 5a4.24 4.24 0 0 1-6 0" transform="translate(2 0)" /></svg>
                </span>
                <h3>المسار الثاني: التكامل مع أنظمة المصنع القائمة.</h3>
                <p className={styles.planningPathExcerpt}>
                  الاحتفاظ بنظام التصنيع أو تخطيط موارد المؤسسات المستخدم، مثل Odoo أو غيره، وربطه بالقدرات المطلوبة للتحليلات أو إدارة المستودعات أو بيانات المعدات، إذا سمحت واجهات النظام والأجهزة بذلك.
                </p>
                <details className={styles.planningPathDetails}>
                  <summary>قراءة المزيد</summary>
                  <p>
                    الاحتفاظ بنظام التصنيع أو تخطيط موارد المؤسسات المستخدم، مثل Odoo أو غيره، وربطه بالقدرات المطلوبة للتحليلات أو إدارة المستودعات أو بيانات المعدات، إذا سمحت واجهات النظام والأجهزة بذلك.
                  </p>
                </details>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.manufacturingCycle} aria-labelledby="manufacturing-cycle-title">
          <div className={styles.manufacturingCycleInner}>
            <h2 id="manufacturing-cycle-title">إدارة دورة التصنيع</h2>
            <div className={styles.manufacturingCycleGrid}>
              {CYCLE_CAPABILITIES.map((item) => (
                <article className={styles.cycleCard} key={item.title}>
                  <span className={styles.cycleIcon} aria-hidden="true">
                    {item.icon === "calendar" && <svg viewBox="0 0 24 24"><path d="M5 3v3m14-3v3M4 8h16M4 5h16v16H4zM8 12h3v3H8z" /></svg>}
                    {item.icon === "layers" && <svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></svg>}
                    {item.icon === "factory" && <svg viewBox="0 0 24 24"><path d="M3 21V5h18v16H3ZM7 17v-4m5 4V9m5 8v-6M1 21h22" /></svg>}
                    {item.icon === "truck" && <svg viewBox="0 0 24 24"><path d="M2 5h13v13H2zM15 10h4l3 3v5h-7zM6.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm11 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></svg>}
                    {item.icon === "chart" && <svg viewBox="0 0 24 24"><path d="M4 20V4m0 16h17M8 16v-4m5 4V7m5 9V9" /></svg>}
                    {item.icon === "quality" && <svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Zm-3 9 2 2 4-4" /></svg>}
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

        <section className={styles.closingCta} aria-labelledby="planning-cta-title">
          <div className={styles.closingCtaCard}>
            <h2 id="planning-cta-title">ناقش أولويات التطوير في مصنعك</h2>
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
