import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { ManufacturingSubnav } from "@/components/sections/manufacturing/ManufacturingSubnav";
import { Navbar } from "@/components/sections/Navbar";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "الصناعة والتصنيع | Transformix",
  description:
    "إدارة أكثر كفاءة للمصنع وقرارات أذكى وقدرة تنافسية أقوى عبر بيانات موثوقة ورؤية متكاملة لسلاسل الإمداد.",
};

const CAPABILITIES = [
  {
    id: "management",
    href: "/manufacturing/management",
    title: "بناء نظام الإدارة والحوكمة",
    text: "تنظيم مسارات العمل، وإعداد إجراءات التشغيل (SOPs)، وضبط المسؤوليات ومتطلبات QHSE قبل رقمنة العمليات.",
  },
  {
    id: "planning",
    href: "/manufacturing/planning",
    title: "إدارة التصنيع وتخطيط المواد",
    text: "ربط خطة الإنتاج بقوائم المواد والمشتريات والمخزون ومراكز العمل والتكاليف داخل نظام Manufacturing/MRP.",
  },
  {
    id: "analytics",
    href: "/manufacturing/analytics",
    title: "الذكاء الاصطناعي والتحليلات",
    text: "تحليل الأداء، وتطوير التنبؤ بالطلب والمواد والتكاليف، ودعم الإدارة بوكلاء متخصصين حسب البيانات والتكاملات.",
  },
  {
    id: "academy",
    href: "/manufacturing/academy",
    title: "الأكاديميات وإدارة المعرفة",
    text: "تأهيل المستخدمين على التكنولوجيا المقدمة، وتوفير أكاديمية باسم المصنع للعاملين، وقياس الاستيعاب والتقدم.",
  },
];

const DELIVERY_OPTIONS = [
  {
    icon: "plus",
    title: "إضافة قدرة محددة",
    excerpt: "إدخال أداة لبناء إجراءات التشغيل أو طبقة ذكاء اصطناعي أو تحليلات بيانات أو أكاديمية تدريب إلى بيئة المصنع الحالية...",
    detail:
      "إدخال أداة لبناء إجراءات التشغيل أو طبقة ذكاء اصطناعي أو تحليلات بيانات أو أكاديمية تدريب إلى بيئة المصنع الحالية، بعد تقييم البيانات والربط والصلاحيات.",
  },
  {
    icon: "sync",
    title: "تطوير نظام قائم",
    excerpt: "الاحتفاظ بنظام ERP أو Manufacturing المستخدم، وتهيئة وظائف إضافية...",
    detail:
      "الاحتفاظ بنظام ERP أو Manufacturing المستخدم، وتهيئة وظائف إضافية أو ربطه بحلول Transformix المختارة دون إعادة بناء كل العمليات من الصفر.",
  },
  {
    icon: "layers",
    title: "تطبيق منظومة أوسع",
    excerpt: "اختيار تطبيقات جاهزة، وتهيئتها وفق إجراءات المصنع، وتطوير وظائف غير متاحة عند الحاجة...",
    detail:
      "اختيار تطبيقات جاهزة، وتهيئتها وفق إجراءات المصنع، وتطوير وظائف غير متاحة عند الحاجة، مع إمكان التوسع على مراحل تتناسب مع الجاهزية والميزانية والأولويات.",
  },
];

const GETTING_STARTED = [
  {
    number: "1",
    title: "تحديد الأولوية",
    text: "مناقشة العمليات والتكلفة والجودة ومخاطر التوريد والبيانات والتدريب، لتحديد المجال الذي يستحق التطوير أولًا.",
  },
  {
    number: "2",
    title: "مراجعة الأنظمة والإجراءات القائمة",
    text: "تحديد ما يمكن الاحتفاظ به وما يحتاج إلى تهيئة أو ربط أو تطوير، دون افتراض تغيير كل الأنظمة.",
  },
  {
    number: "3",
    title: "عرض القدرات المتاحة",
    text: "استعراض المنتجات الحالية ووظائفها، ثم توضيح التكاملات والوظائف الجديدة التي تتطلب تنفيذًا أو اختبارًا.",
  },
  {
    number: "4",
    title: "اتفاق واضح على نطاق العمل",
    text: "تحديد المكونات المختارة ومصادر البيانات والصلاحيات ومعايير القبول والتدريب والمرحلة الأولى للتطبيق.",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <Navbar variant="slim" />
      <ManufacturingSubnav active="efficiency" />

      <main>
        <section className={styles.hero} id="efficiency" aria-labelledby="hero-title">
          <div className={styles.heroContent}>
            <h1 id="hero-title">إدارة أكثر كفاءة للمصنع. قرارات أذكى. قدرة تنافسية أقوى.</h1>
            <p>
              تتنافس المصانع اليوم عبر سلاسل الإمداد التي تعتمد عليها، وليس عبر خطوط الإنتاج وحدها. تؤثر أسعار المواد والطاقة والنقل، واستقرار الموردين، واضطرابات التجارة والتوترات الجيوسياسية في تكلفة المنتج وتوافره ومواعيد تسليمه. وتزداد أهمية قدرة الإدارة على تقييم البدائل واتخاذ قرارات أسرع تستند إلى بيانات موثوقة.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="#capabilities">
                استكشف قدرات المنظومة <span aria-hidden="true">←</span>
              </Link>
              <Link className={styles.secondaryAction} href="/contact">
                ناقش أولويات التطوير في مصنعك <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.capabilities} id="capabilities" aria-labelledby="capabilities-title">
          <div className={styles.capabilitiesInner}>
            <h2 id="capabilities-title">أربع قدرات، تُختار وفق أولويات مصنعك</h2>
            <div className={styles.capabilitiesIntro}>
              <p>
                يمكن لمصنعك تطوير إجراءات العمل، وتنظيم الإنتاج والمواد، والاستفادة من التنبؤات ووكلاء الذكاء الاصطناعي لدعم القرار، أو توفير تدريب مستمر للعاملين. ولا يتطلب ذلك شراء المنظومة كاملة أو الاستغناء عن الأنظمة الحالية، ما دامت إمكانات الربط والتطبيق متاحة.
              </p>
              <p>
                TX Manufacturing من Transformix منظومة صناعية تجمع أربع قدرات يمكن تطبيقها معًا أو بصورة مستقلة: بناء نظم الإدارة والحوكمة، وإدارة التصنيع وتخطيط الاحتياجات من المواد، والذكاء الاصطناعي والتحليلات، والتدريب وإدارة المعرفة.
              </p>
            </div>

            <div className={styles.capabilityGrid}>
              {CAPABILITIES.map((capability) => (
                <a className={styles.capabilityCard} href={capability.href ?? `#${capability.id}`} key={capability.id}>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                  <span className={styles.cardArrow} aria-hidden="true">←</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.delivery} aria-labelledby="delivery-title">
          <div className={styles.deliveryInner}>
            <h2 id="delivery-title">طوّر ما يحتاجه مصنعك، واحتفظ بما يعمل بالفعل</h2>
            <p className={styles.deliveryIntro}>
              يختلف نطاق التطوير من مصنع إلى آخر. قد يكون نظام التصنيع الحالي مناسبًا، لكن الإدارة تحتاج إلى تحليلات أعمق أو تنبؤات أفضل. وقد تكون الأولوية لتنظيم إجراءات التشغيل قبل أي توسع تقني، أو لتدريب الموظفين على التطبيقات الموجودة. لهذا لا ترتبط الاستفادة من TX Manufacturing باستبدال نظام شامل أو تركيب وحدات جديدة بالضرورة.
            </p>
            <div className={styles.deliveryGrid}>
              {DELIVERY_OPTIONS.map((option) => (
                <article className={styles.deliveryCard} key={option.title}>
                  <span className={styles.deliveryIcon} aria-hidden="true">
                    {option.icon === "plus" && <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>}
                    {option.icon === "sync" && <svg viewBox="0 0 24 24"><path d="M20 7h-5V2M4 17h5v5M5.6 9A7 7 0 0 1 18 6l2 1M4 17l2-1a7 7 0 0 0 12.4-3" /></svg>}
                    {option.icon === "layers" && <svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></svg>}
                  </span>
                  <h3>{option.title}</h3>
                  <p className={styles.deliveryExcerpt}>{option.excerpt}</p>
                  <details className={styles.deliveryDetails}>
                    <summary>قراءة المزيد</summary>
                    <p>{option.detail}</p>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.layers} aria-labelledby="layers-title">
          <div className={styles.layersInner}>
            <div className={styles.layersCopy}>
              <h2 id="layers-title">كيف تعمل الطبقات الأربع معًا؟</h2>
              <p>
                تساعد الطبقة الأولى على ضبط طريقة العمل والمسؤوليات. وتحوّل الطبقة الثانية الإجراءات إلى عمليات تصنيع وتخطيط قابلة للتشغيل والمتابعة. وتضيف الثالثة التحليل والتنبؤ ودعم القرار. وتحافظ الرابعة على المعرفة وتدرب العاملين على النظام والإجراءات. ويمكن البدء بأي قدرة عند توافر أساس مناسب، دون اشتراط تطبيق جميع الطبقات في مشروع واحد.
              </p>
            </div>
            <div
              className={styles.layersImage}
              role="img"
              aria-label="موظف يتعلم عبر منصة تدريب رقمية"
            />
          </div>
        </section>

        <section className={styles.gettingStarted} aria-labelledby="getting-started-title">
          <div className={styles.gettingStartedInner}>
            <h2 id="getting-started-title">كيف نبدأ مع مصنعك؟</h2>
            <div className={styles.stepsGrid}>
              {GETTING_STARTED.map((step) => (
                <article className={styles.stepCard} key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closingCta} aria-labelledby="closing-cta-title">
          <div className={styles.closingCtaCard}>
            <h2 id="closing-cta-title">ناقش أولويات التطوير في مصنعك</h2>
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
