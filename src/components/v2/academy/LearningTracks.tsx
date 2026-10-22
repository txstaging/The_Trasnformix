import Image from "next/image";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./LearningTracks.module.css";

/* Right to left as drawn (Figma 3693:66432). The ids are the footer's
   الأكاديمية links. */
const TRACKS = [
  {
    id: "vocational",
    icon: "/v2/icons/briefcase-business.svg",
    audience: "للأفراد وفرق العمل",
    title: "التدريب والتأهيل المهني",
    text: "بناء مهارات مرتبطة بممارسة العمل، من فهم الاحتياج إلى تطبيق المعرفة ومراجعة التقدم.",
    topics: [
      "المهارات الرقمية في بيئة العمل",
      "قراءة البيانات والتقارير المهنية",
      "مهارات تنظيم العمل والتواصل",
    ],
  },
  {
    id: "industry",
    icon: "/v2/icons/factory.svg",
    audience: "للفرق التشغيلية والإدارية",
    title: "الصناعة",
    text: "محتوى يربط مفاهيم التشغيل والبيانات والتحسين بواقع المنشأة الصناعية.",
    topics: [
      "أساسيات مؤشرات الأداء التشغيلي",
      "مبادئ تنظيم العمليات والموارد",
      "التحول الرقمي في البيئة الصناعية",
    ],
  },
  {
    id: "cooperatives",
    icon: "/v2/icons/academy-handshake.svg",
    audience: "للإدارات والأعضاء والفرق",
    title: "التعاونيات السعودية",
    text: "تطوير فهم عملي لطبيعة العمل التعاوني وأدوات التنظيم والتواصل وخدمة الأعضاء.",
    topics: [
      "مبادئ الإدارة والحوكمة التعاونية",
      "تنظيم بيانات الأعضاء والخدمات",
      "التواصل والمحتوى للمبادرات التعاونية",
    ],
  },
];

/** Figma "Academy fields" (3693:66427): three equal-height track cards. */
export function LearningTracks() {
  return (
    <section className={styles.section}>
      <SectionIntro
        eyebrow="مجالات الأكاديمية"
        title="ثلاثة مجالات، يتشكل محتواها حول احتياجك."
        lead="الموضوعات التالية مسارات مقترحة للنقاش والتخصيص، وليست إعلانًا عن برامج مجدولة أو اعتماد مهني."
      />
      <div className={styles.grid}>
        {TRACKS.map((track) => (
          <article key={track.id} id={track.id} className={styles.track}>
            <Image className={styles.icon} src={track.icon} alt="" width={36} height={36} />
            <p className={styles.audience}>{track.audience}</p>
            <h3 className={styles.title}>{track.title}</h3>
            <p className={styles.text}>{track.text}</p>
            <h4 className={styles.label}>موضوعات يمكن البناء عليها</h4>
            <ul className={styles.topics}>
              {track.topics.map((topic) => (
                <li key={topic}>— {topic}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
