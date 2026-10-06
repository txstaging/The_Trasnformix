import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SectorPanel, type SectorShot } from "@/components/sections/sectors/SectorPanel";
import { SectorsCta } from "@/components/sections/sectors/SectorsCta";
import { SectorsHero } from "@/components/sections/sectors/SectorsHero";
import { SectorsOverview } from "@/components/sections/sectors/SectorsOverview";
import { SectorsStats } from "@/components/sections/sectors/SectorsStats";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "القطاعات | Transformix",
  description:
    "نقدّم منظومات تشغيل وتحول رقمي وذكاء اصطناعي، مصممة لتناسب طبيعة كل صناعة: الصناعة، التعاونيات، والتعليم والتدريب.",
};

/* Crops are Figma's, in % of the frame's inner box. الصناعة's layer is 20px
   taller than its 633 x 813 card and hangs off the top. */
const industryShot = (n: number): SectorShot => ({
  src: `/images/sectors/industry-${n}.png`,
  width: 1089,
  height: 1445,
  crop: { left: -0.81, top: -2.466, width: 101.61, height: 102.466 },
});

const COOPERATIVES_CROP = { left: -33.16, top: 0, width: 174.02, height: 100 };

/* The set reuses its first render for rows 01 and 02 (Figma 2819:1958/1956). */
const COOPERATIVES_INVESTMENTS: SectorShot = {
  src: "/images/sectors/cooperatives-1.png",
  width: 1536,
  height: 1024,
  crop: COOPERATIVES_CROP,
};

const cooperativesShot = (n: number): SectorShot => ({
  src: `/images/sectors/cooperatives-${n}.png`,
  width: 1672,
  height: 941,
  crop: COOPERATIVES_CROP,
});

/* Figma 2819:2136 — each row frames its render differently. */
const EDUCATION_SHOTS: SectorShot[] = [
  {
    src: "/images/sectors/education-1.png",
    width: 1671,
    height: 941,
    crop: { left: -28.25, top: 0.01, width: 210.64, height: 100 },
  },
  {
    src: "/images/sectors/education-2.png",
    width: 1672,
    height: 941,
    crop: { left: -182.19, top: -30.58, width: 282.27, height: 134.01 },
  },
  {
    src: "/images/sectors/education-3.png",
    width: 1672,
    height: 941,
    crop: { left: -42.09, top: -23.2, width: 259.45, height: 123.17 },
  },
  {
    src: "/images/sectors/education-4.png",
    width: 1677,
    height: 938,
    crop: { left: -28.25, top: 0.01, width: 210.64, height: 100 },
  },
];

/* Figma 2789:11500 "القطاعات" (1440), top-to-bottom. The tab states come
   from the component sets 2813:10158 (الصناعة), 2819:1959 (التعاونيات) and
   2819:2136 (التعليم والتدريب). No phone artboard is drawn for this page. */
export default function SectorsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={styles.main}>
        <SectorsHero />
        <SectorsOverview />

        <SectorPanel
          id="industry"
          variant="industry"
          eyebrow="القطاع الأول"
          title="الصناعة"
          text="نساعد المصانع على بناء منظومة تشغيل رقمية مترابطة، من متابعة العمليات والإنتاج إلى البيانات والتحليلات والذكاء الاصطناعي."
          items={[
            {
              number: "01",
              title: "التحول الرقمي للمصانع",
              text: "ربط الأنظمة والبيانات وسير العمل.",
              textColor: "#373c48",
              shot: industryShot(1),
            },
            {
              number: "02",
              title: "انظمة MCR",
              text: "حلول لدعم المتابعة والرقابة التشغيلية.",
              textSize: 13,
              shot: industryShot(2),
            },
            {
              number: "03",
              title: "الذكاء الاصطناعي الصناعي",
              text: "حلول لدعم المتابعة والرقابة التشغيلية.",
              /* Figma 2813:10155 shows the row-01 render here. */
              shot: industryShot(1),
            },
            {
              number: "04",
              title: "أنظمة تشغيل المصانع",
              text: "رقمنة ومتابعة العمليات اليومية.",
              shot: industryShot(4),
            },
          ]}
          cta={{ label: "تعرف علي انظمتنا", href: "https://ai.thetransformix.com/erp" }}
        />

        <SectorPanel
          id="cooperatives"
          variant="cooperatives"
          eyebrow="القطاع الثاني"
          title="التعاونيات"
          text="نقدّم للتعاونيات حلولًا رقمية متكاملة تساعدها على تنظيم أعمالها، تعزيز الحوكمة والامتثال، وإدارة الخدمات والاستثمارات من خلال منظومة واحدة."
          items={[
            {
              number: "01",
              title: "Agent للامتثال والحوكمة",
              text: "مساعد ذكي للوصول إلى السياسات والمتطلبات.",
              textColor: "var(--text-secondary)",
              shot: COOPERATIVES_INVESTMENTS,
            },
            {
              number: "02",
              title: "المشاريع والاستثمارات",
              text: "إدارة مشاريع الجمعية وتتبع الاستثمارات والعوائد",
              textColor: "var(--text-secondary)",
              shot: COOPERATIVES_INVESTMENTS,
            },
            {
              number: "03",
              title: "تطبيق الجوال",
              text: "إدارة متكاملة من الهاتف لكل المهام والتقارير والموافقات",
              shot: cooperativesShot(3),
            },
            {
              number: "04",
              title: "الجمعيات العمومية والتصويت",
              text: "إدارة الاجتماعات والجلسات والتصويت الإلكتروني الآمن",
              shot: cooperativesShot(4),
            },
          ]}
          cta={{ label: "زيارة الجمعية" }}
        />

        <SectorPanel
          id="education"
          variant="education"
          eyebrow="القطاع الثالث"
          title="التعليم والتدريب"
          text="نحوّل المعرفة إلى تجربة تعليمية رقمية عملية، من تدريب الفرق على Odoo إلى بناء منصات تعليمية تساعد المتعلم على تطوير مهاراته الرقمية."
          items={[
            {
              number: "01",
              title: "تدريب Odoo",
              text: "تدريب عملي للفرق والمستخدمين.",
              textColor: "var(--text-secondary)",
              shot: EDUCATION_SHOTS[0],
            },
            {
              number: "02",
              title: "منصات التعليم الرقمي",
              text: "تجارب تعليمية منظمة وقابلة للتوسع.",
              textColor: "var(--text-secondary)",
              shot: EDUCATION_SHOTS[1],
            },
            {
              number: "03",
              title: "المحتوى الرقمي",
              text: "تحويل المعرفة إلى محتوى سهل الاستخدام.",
              shot: EDUCATION_SHOTS[2],
            },
            {
              number: "04",
              title: "تجارب التعلم",
              text: "رحلات تعلم أكثر وضوحًا وتفاعلًا.",
              shot: EDUCATION_SHOTS[3],
            },
          ]}
          cta={{ label: "تعرف علي منصتنا التعليمية" }}
        />

        <SectorsStats />
        <SectorsCta />
      </main>
      <Footer variant="navy" industries />
    </>
  );
}
