import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SectorPanel, type SectorShot } from "@/components/sections/sectors/SectorPanel";
import { SectorsCta } from "@/components/sections/sectors/SectorsCta";
import { SectorsHero } from "@/components/sections/sectors/SectorsHero";
import { SectorsOverview } from "@/components/sections/sectors/SectorsOverview";
import { SectorsStats } from "@/components/sections/sectors/SectorsStats";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "القطاعات | Transformix",
  description:
    "نقدّم منظومات تشغيل وتحول رقمي وذكاء اصطناعي، مصممة لتناسب طبيعة كل صناعة: الصناعة، التعاونيات، والتعليم والتدريب.",
};

/* Every tablet render is 1536 x 1024. Boxes are design px on the band's frame
   (508 x 813 for الصناعة, 509.64 x 700 and 509.64 x 669 for the others). */
const tablet = (name: string, shot: Omit<SectorShot, "src" | "width" | "height">): SectorShot => ({
  src: `/images/sectors/${name}.png`,
  width: 1536,
  height: 1024,
  ...shot,
});

/* Rows 02–04 are drawn on a 509.64 x 833 frame; their boxes are moved onto
   row 01's frame by the shared centre. */
const INDUSTRY_SHOTS = [
  tablet("industry-1", {
    box: { x: 8.33, y: 222.27, width: 509.63, height: 335.44 },
    crop: { left: -5.87, top: -8.25, width: 111.22, height: 112.65 },
  }),
  tablet("industry-2", {
    box: { x: -0.49, y: 175.22, width: 504, height: 338 },
    crop: { left: -3.93, top: -4.4, width: 107.62, height: 106.96 },
    radius: 25,
    shadow: true,
  }),
  tablet("industry-3", {
    box: { x: 24.51, y: 175.22, width: 455, height: 308 },
    crop: { left: -6.12, top: -6.79, width: 111.43, height: 109.74 },
    radius: 25,
    shadow: true,
  }),
];

/* Rows 02 and 04 share a render, framed differently. */
const COOPERATIVES_SHOTS = [
  tablet("cooperatives-1", {
    box: { x: 0, y: 177.67, width: 509.64, height: 344.67 },
    crop: { left: -5.42, top: -6.62, width: 110.98, height: 109.4 },
  }),
  tablet("cooperatives-2", {
    box: { x: -0.68, y: 179.5, width: 511, height: 341 },
    radius: 24,
  }),
  tablet("cooperatives-3", {
    box: { x: -0.68, y: 184.3, width: 511, height: 341 },
    radius: 24,
  }),
  tablet("cooperatives-2", {
    box: { x: 5.32, y: 189.8, width: 499, height: 332 },
  }),
];

const EDUCATION_SHOTS = [
  tablet("education-1", {
    box: { x: 3.32, y: 184.3, width: 503, height: 336 },
    radius: 19,
  }),
  tablet("education-2", {
    box: { x: 10.64, y: 187, width: 499, height: 332 },
  }),
  tablet("education-3", {
    box: { x: -1.36, y: 159, width: 509, height: 339 },
    radius: 20,
  }),
  tablet("education-4", {
    box: { x: 3.82, y: 181.3, width: 502, height: 334 },
  }),
];

export default function SectorsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${styles.main} ${flow.flow} ${tajawal.variable}`}>
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
              shot: INDUSTRY_SHOTS[0],
            },
            {
              number: "02",
              title: "انظمة MCR",
              text: "حلول لدعم المتابعة والرقابة التشغيلية.",
              textSize: 13,
              shot: INDUSTRY_SHOTS[1],
            },
            {
              number: "03",
              title: "الذكاء الاصطناعي الصناعي",
              text: "حلول لدعم المتابعة والرقابة التشغيلية.",
              shot: INDUSTRY_SHOTS[2],
            },
            {
              number: "04",
              title: "أنظمة تشغيل المصانع",
              text: "رقمنة ومتابعة العمليات اليومية.",
              shot: INDUSTRY_SHOTS[2],
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
              shot: COOPERATIVES_SHOTS[0],
            },
            {
              number: "02",
              title: "المشاريع والاستثمارات",
              text: "إدارة مشاريع الجمعية وتتبع الاستثمارات والعوائد",
              textColor: "var(--text-secondary)",
              shot: COOPERATIVES_SHOTS[1],
            },
            {
              number: "03",
              title: "تطبيق الجوال",
              text: "إدارة متكاملة من الهاتف لكل المهام والتقارير والموافقات",
              shot: COOPERATIVES_SHOTS[2],
            },
            {
              number: "04",
              title: "الجمعيات العمومية والتصويت",
              text: "إدارة الاجتماعات والجلسات والتصويت الإلكتروني الآمن",
              shot: COOPERATIVES_SHOTS[3],
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
      <Footer />
    </>
  );
}
