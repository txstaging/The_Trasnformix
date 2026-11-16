import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ManufacturingSubnav } from "@/components/sections/manufacturing/ManufacturingSubnav";
import { Navbar } from "@/components/sections/Navbar";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "بناء نظام الإدارة والحوكمة | Transformix",
  description:
    "بناء نظام الإدارة وإجراءات التشغيل القياسية وتنظيم متطلبات الجودة والصحة والسلامة المهنية والبيئة والحوكمة للمصانع.",
};

export default function ManufacturingManagementPage() {
  return (
    <>
      <Navbar variant="slim" />
      <ManufacturingSubnav active="management" />
      <main>
        <section className={`${styles.hero} ${styles.managementHero}`} aria-labelledby="management-title">
          <div className={`${styles.heroContent} ${styles.managementContent}`}>
            <h1 id="management-title">بناء نظام الإدارة وإجراءات التشغيل والحوكمة</h1>
            <p>
              إجراءات واضحة. تشغيل أكثر انضباطًا. موارد تُدار بكفاءة. تتطلب إدارة التصنيع تحديد طريقة العمل بين المشتريات والمخزون والإنتاج والصيانة، وتوزيع المسؤوليات وضبط الإجراءات قبل تشغيلها رقميًا.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/contact">
                طوّر نظام الإدارة وإجراءات التشغيل في مصنعك <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.managementOverview} aria-label="نظام الإدارة وإجراءات التشغيل">
          <div className={styles.managementOverviewInner}>
            <div className={styles.managementOverviewCopy}>
              <p>
                تساعد Transformix مصنعك على بناء وتطوير نظام الإدارة وإجراءات التشغيل القياسية (SOPs)، وتنظيم متطلبات الجودة والصحة والسلامة المهنية والإدارة البيئية (QHSE) والحوكمة، باستخدام أدوات ذكاء اصطناعي متخصصة تستند إلى معايير الإدارة الدولية.
              </p>
              <p>
                تدعم قدرات QX وGX تقييم الإجراءات الحالية، وتحديد الفجوات، وإعداد مسودات إجراءات العمل، وتنظيم المسؤوليات ومتطلبات الرقابة، بما يساعد الإدارة على تحسين العمليات قبل تهيئتها داخل نظام التصنيع.
              </p>
              <p>
                <strong>النتيجة:</strong> نظام عمل أوضح، وفرص للحد من الهدر التشغيلي، ومتابعة أفضل للمخاطر والأداء، مع الاستفادة من الأنظمة الحالية أو تطويرها دون الحاجة إلى استبدالها.
              </p>
            </div>
            <div className={styles.managementOverviewImage} role="img" aria-label="فريق يراجع إجراءات العمل ومتطلبات الإدارة" />
          </div>
        </section>

        <section className={styles.managementInfo} aria-label="توضيح الجودة ومتطلبات QHSE">
          <div className={styles.managementInfoGrid}>
            <article className={styles.managementInfoCard}>
              <h2>ما هو QHSE؟</h2>
              <p>
                Quality, Health, Safety &amp; Environment، أي الجودة والصحة والسلامة المهنية والبيئة. ويشمل تنظيم متطلبات الإدارة المناسبة للمصنع؛ ومن أبرز المراجع ذات الصلة ISO 9001 لنظام إدارة الجودة، وISO 45001 للصحة والسلامة المهنية، وISO 14001 للإدارة البيئية. وتُراعى متطلبات ISO/IEC 27001 لأمن المعلومات في نطاقها المستقل عند الحاجة.
              </p>
            </article>
            <article className={styles.managementInfoCard}>
              <h2>أين تقع جودة المنتج؟</h2>
              <p>
                هذه الطبقة تختص بجودة نظام الإدارة ومسارات العمل، وليست بديلًا عن فحص جودة المواد والمنتجات أثناء التصنيع. ففحوص الإنتاج ونقاط الجودة وتسجيل عدم المطابقة تُعالج داخل نظام التصنيع أو تطبيقاته المتخصصة في الطبقة الثانية.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.closingCta} aria-labelledby="management-cta-title">
          <div className={styles.closingCtaCard}>
            <h2 id="management-cta-title">ناقش أولويات التطوير في مصنعك</h2>
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
