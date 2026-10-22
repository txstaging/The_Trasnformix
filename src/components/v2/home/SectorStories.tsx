import Link from "next/link";
import { V2 } from "@/components/v2/routes";
import { Media } from "@/components/v2/ui/Media";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./SectorStories.module.css";

/* Two rows of two, right to left (Figma 3693:64705, 3693:64714). Each story
   opens its chapter on the sectors page. */
const SECTORS = [
  {
    id: "industry",
    title: "قطاع الصناعة",
    text: "رؤية أدق للإنتاج والموارد وسلاسل الإمداد.",
    image: "/v2/images/home-sector-industry.png",
  },
  {
    id: "tourism",
    title: "قطاع السياحة",
    text: "تجارب رقمية تعبّر عن الوجهة وتخدم الزائر.",
    image: "/v2/images/home-sector-tourism.png",
  },
  {
    id: "cooperatives",
    title: "قطاع التعاونيات السعودية",
    text: "أدوات تدعم الحوكمة وخدمة الأعضاء والعمل المشترك.",
    image: "/v2/images/home-sector-cooperatives.png",
  },
  {
    id: "education",
    title: "قطاع التعليم",
    text: "ربط التجربة التعليمية ببيانات وعمليات أوضح.",
    image: "/v2/images/home-sector-education.png",
  },
];

/** Figma "Home sectors" (3693:64700). */
export function SectorStories() {
  return (
    <section className={styles.section}>
      <SectionIntro
        eyebrow="القطاعات"
        title="سياق مختلف، ومنهجية تبدأ بالفهم."
        lead="نكيّف الحلول مع واقع القطاع وطبيعة المستفيدين، بدل إسقاط نموذج واحد على الجميع."
      />
      <div className={styles.grid}>
        {SECTORS.map((sector) => (
          <Link key={sector.id} href={`${V2.sectors}#${sector.id}`} className={styles.story}>
            <Media
              className={styles.image}
              src={sector.image}
              alt=""
              width={608}
              height={280}
              radius={24}
            />
            <h3 className={styles.title}>{sector.title}</h3>
            <p className={styles.text}>{sector.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
