import { contactHref } from "@/components/v2/routes";
import { Button } from "@/components/v2/ui/Button";
import { Media } from "@/components/v2/ui/Media";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./WorkExamples.module.css";

const WORKS = [
  {
    title: "منصة إدارة التعاونيات",
    text: "تجربة تجمع بيانات الأعضاء والحوكمة والاستثمارات في مكان واحد.",
    image: "/v2/screens/cooperative-dashboard.png",
  },
  {
    title: "مراقبة العمليات والتحكم",
    text: "لوحة موحّدة لمتابعة التشغيل وحالة الأنظمة والتنبيهات.",
    image: "/v2/screens/mcr-dashboard.png",
  },
];

/** Two featured interfaces on the home page, each with a request button. */
export function WorkExamples() {
  return (
    <section id="works" className={styles.section}>
      <SectionIntro
        eyebrow="أعمالنا"
        title="حلول رقمية، من الفكرة إلى الواجهة"
        lead="نماذج من الواجهات المرفقة توضح تطبيقاتنا في مراقبة العمليات وإدارة التعاونيات."
        leadSize={18}
        tight
      />
      <div className={styles.grid}>
        {WORKS.map((work) => (
          <article key={work.title} className={styles.card}>
            <Media src={work.image} alt={work.title} width={568} height={376} fit="contain" />
            <h3 className={styles.title}>{work.title}</h3>
            <p className={styles.text}>{work.text}</p>
            <p className={styles.note}>نموذج واجهة من المواد المرفقة</p>
            <Button href={contactHref()}>اطلب الخدمة</Button>
          </article>
        ))}
      </div>
    </section>
  );
}
