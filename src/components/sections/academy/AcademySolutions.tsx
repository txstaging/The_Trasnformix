import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AcademySolutions.module.css";

type Feature = {
  title: string;
  text: string;
  icon: { src: string; width: number; height: number; box: [number, number] };
  /** The first two rows centre the glyph on the copy; the rest top-align it. */
  centered?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: "استخدام الأنظمة وإدارتها",
    text: "تعلّم استخدام الأنظمة الرقمية وإدارتها بكفاءة لتنفيذ المهام اليومية.",
    icon: { src: "solutions-system", width: 43.0669, height: 39.3794, box: [45, 45] },
    centered: true,
  },
  {
    title: "وربط التطبيقات والأجهزة",
    text: "تعرّف على كيفية ربط التطبيقات والأجهزة وتكاملها لدعم سير العمل.",
    icon: { src: "solutions-app", width: 45, height: 46, box: [45, 46] },
    centered: true,
  },
  {
    title: "أتمتة الإجراءات",
    text: "تعلّم أتمتة الإجراءات المتكررة وتحسين كفاءة تنفيذ المهام.",
    icon: { src: "solutions-automation", width: 48, height: 48, box: [48, 48] },
  },
  {
    title: "تحليل البيانات",
    text: "اكتسب مهارات تحليل البيانات والاستفادة منها في واتخاذ القرارات.",
    icon: { src: "solutions-analysis", width: 48, height: 42, box: [48, 42] },
  },
  {
    title: "إدارة التحول والجودة",
    text: "تعرّف على أساليب إدارة التحول وتحسين الجودة وتطوير إجراءات العمل.",
    icon: { src: "solutions-quality", width: 45.3458, height: 36.1117, box: [49, 49] },
  },
];

const rem = (px: number) => `${px / 10}rem`;

export function AcademySolutions() {
  return (
    <section className={styles.section}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.waveBack} src="/icons/academy/solutions-wave-2.svg" alt="" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.waveFront} src="/icons/academy/solutions-wave-1.svg" alt="" aria-hidden />

      <div className={styles.grid}>
        <Reveal className={styles.intro}>
          <h2 className={styles.title}>حلول متعددة وتدريب مرتبط بما تستخدمه</h2>
          <p className={styles.text}>
            يشمل التدريب حلول Transformix الخاصة، وتطبيقات إدارة الأعمال مثل Odoo
            وZoho وغيرها، ومنظومات الذكاء الاصطناعي الجاهزة أو المصممة للمؤسسة،
            والحلول المخصصة المقدمة بعلامتها التجارية.
          </p>
          <div className={styles.action}>
            <PillButton href="#tracks">استكشف الاكاديمية</PillButton>
          </div>
        </Reveal>

        <ul className={styles.features}>
          {FEATURES.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.title}
              className={`${styles.feature} ${feature.centered ? styles.centered : ""}`}
              delay={index * 90}
            >
              <span
                className={styles.icon}
                style={{ width: rem(feature.icon.box[0]), height: rem(feature.icon.box[1]) }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/academy/${feature.icon.src}.svg`}
                  alt=""
                  width={feature.icon.width}
                  height={feature.icon.height}
                  style={{ width: rem(feature.icon.width), height: rem(feature.icon.height) }}
                />
              </span>
              <div className={styles.featureCopy}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
