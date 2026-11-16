import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ManufacturingSubnav } from "@/components/sections/manufacturing/ManufacturingSubnav";
import { Navbar } from "@/components/sections/Navbar";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "الأكاديميات وإدارة المعرفة وتحليلات التعلم | Transformix",
  description:
    "مرجع دائم لتكنولوجيا المصنع، وأكاديمية داخلية باسم المصنع، وقياس لنتائج التعلم.",
};

export default function ManufacturingAcademyPage() {
  return (
    <>
      <Navbar variant="slim" />
      <ManufacturingSubnav active="academy" />
      <main>
        <section className={`${styles.hero} ${styles.academyHero}`} aria-labelledby="academy-title">
          <div className={`${styles.heroContent} ${styles.academyContent}`}>
            <h1 id="academy-title">الأكاديميات وإدارة المعرفة وتحليلات التعلم</h1>
            <p>مرجع دائم للتكنولوجيا، وأكاديمية باسم المصنع، وقياس حقيقي لنتائج التعلم.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/contact">
                ناقش أولويات التطوير في مصنعك <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.academyOverview} aria-labelledby="academy-overview-title">
          <div className={styles.academyOverviewInner}>
            <div className={styles.academyOverviewCopy}>
              <h2 id="academy-overview-title">أكاديمية Transformix | مرجع التكنولوجيا للعميل</h2>
              <p>
                يحصل العميل على مساحة تعليمية مخصصة للأنظمة والتطبيقات التي قدمتها Transformix، تضم أدلة الاستخدام والمحتوى والتحديثات التدريبية. يستطيع الموظف الجديد البدء منها، ويعود إليها من تغير دوره أو ترقّى أو احتاج إلى تدريب إضافي، دون انتظار دورة جديدة في كل مرة.
              </p>
            </div>
            <div className={styles.academyOverviewImage} role="img" aria-label="مساحة تعليمية رقمية مخصصة لتطبيقات المصنع" />
          </div>
        </section>

        <section className={styles.academyFactory} aria-labelledby="academy-factory-title">
          <div className={styles.academyFactoryInner}>
            <div className={styles.academyFactoryCopy}>
              <h2 id="academy-factory-title">أكاديمية المصنع | التدريب الداخلي باسمه وهويته</h2>
              <p>
                يستخدم المصنع أكاديميته الخاصة لتنظيم مواد السلامة والصيانة وتشغيل المعدات وSOPs والجودة والتدريب الفني للعاملين والمشرفين، بما يضمن استمرار نقل المعرفة المؤسسية بين الأفراد والورديات والإدارات.
              </p>
            </div>
            <div className={styles.academyFactoryImage} role="img" aria-label="عاملون يتدربون داخل مصنع" />
          </div>
        </section>

        <section className={styles.learningAnalytics} aria-labelledby="learning-analytics-title">
          <div className={styles.learningAnalyticsInner}>
            <h2 id="learning-analytics-title">طبقة ذكاء اصطناعي وتحليلات تعلم</h2>
            <p>
              تدعم بيئة التعلم الشرح والتقييمات التفاعلية ومتابعة إكمال البرامج ونتائج الاختبارات ومؤشرات الإتقان والفجوات التدريبية. وتساعد لوحات المتابعة الإدارة في تحديد من يحتاج إلى تدريب إضافي، مع عدم اعتبار مجرد إكمال المحتوى دليلًا كافيًا على الفهم العملي. تُحدَّد تفاصيل هذه الوظائف والتقارير بحسب منصة التعلم المطبقة والتكاملات المتاحة. ولا نعرض الذكاء الاصطناعي باعتباره حكمًا نهائيًا على قدرات العاملين، بل أداة مساعدة تعتمد على أدلة التقييم.
            </p>
          </div>
        </section>

        <section className={styles.closingCta} aria-labelledby="academy-cta-title">
          <div className={styles.closingCtaCard}>
            <h2 id="academy-cta-title">ناقش أولويات التطوير في مصنعك</h2>
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
