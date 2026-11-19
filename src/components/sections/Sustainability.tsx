import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { communityHref } from "@/lib/communityNav";
import styles from "./Sustainability.module.css";

type Panel = {
  key: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: string;
  /** The artboard indents the sustainability link by its button padding. */
  indented?: boolean;
};

/* Figma 4620:960 — the impact panels. Sustainability opens at the reading
   start, the community responsibility panel beside it. */
const PANELS: Panel[] = [
  {
    key: "sustainability",
    title: "الاستدامة",
    text: "نعمل على ترسيخ الاستدامة ضمن تطوير أعمال ترانسفورمكس وتشغيلها، مع الاهتمام بكفاءة الموارد والمرونة المؤسسية ومتابعة مؤشرات الأداء. ونُوظّف كذلك قدراتنا في البيانات والأنظمة والأتمتة لمساعدة المؤسسات على جمع بيانات الاستدامة وتحليلها، وبناء لوحات المؤشرات، ودعم إعداد تقارير الاستدامة وفق نطاق العمل ومتطلبات الإفصاح.",
    cta: "استكشف حلول الاستدامة",
    href: communityHref("impact"),
    icon: "/icons/home/csr-leaf.svg",
    indented: true,
  },
  {
    key: "csr",
    title: "المسؤولية المجتمعية",
    text: "نسهم في إتاحة التكنولوجيا والمعرفة عبر المبادرات المجتمعية والتعليمية والشراكات، بما يشمل أنشطة TX Community وTX Talks وTech for Good. وفي المبادرات البيئية السابقة، ساهمت ترانسفورمكس في الموقع والتسجيل ومنصة التعلم ولوحة المتابعة للشباب المشاركين في تدريب ومحاكاة تعليمية لحماية البيئة البحرية؛ دون تنفيذ زراعة مرجان فعلية.",
    cta: "استكشف مبادرات المسؤولية المجتمعية",
    href: communityHref("impact"),
    icon: "/icons/home/csr-heart.svg",
  },
];

/** Sustainability and social responsibility (Figma 4620:959): two panels of
    equal weight, each with its icon, a title, its copy and one link. */
export function Sustainability() {
  return (
    <section id="sustainability" className={styles.section} aria-label="الاستدامة والمسؤولية المجتمعية">
      <div className={styles.inner}>
        {PANELS.map((panel, index) => (
          <Reveal key={panel.key} as="article" className={styles.panel} delay={index * 120}>
            <div className={styles.tile} aria-hidden="true">
              <Image src={panel.icon} alt="" width={30} height={30} />
            </div>
            <h2 className={styles.title}>{panel.title}</h2>
            <p className={styles.text}>{panel.text}</p>
            <a href={panel.href} className={panel.indented ? `${styles.link} ${styles.indented}` : styles.link}>
              {panel.cta}
              <Image className={styles.arrow} src="/icons/home/arrow-forward.svg" alt="" width={20} height={20} aria-hidden />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
