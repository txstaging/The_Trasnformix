import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import styles from "./ClosingSection.module.css";

export function ClosingSection() {
  return (
    <section className={styles.section} aria-labelledby="erp-closing-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>ترانسفورمكس | شريك التحول الرقمي المؤسسي</p>
        <h2 id="erp-closing-title">التشريعات المحلية أولًا. وأفضل الممارسات العالمية دائمًا.</h2>
        <p className={styles.description}>
          نعمل من خلال حضورنا الإقليمي وترتيباتنا التعاقدية والتشغيلية وفق ظروف كل سوق، ونراجع متطلبات الخصوصية والأمن والاستضافة والتكاملات بحسب بلد المشروع، ونقدم الأنظمة الجاهزة والحلول المستقلة، ومنها منتجنا المؤسسي TX ERP.
        </p>
        <div className={styles.actions}>
          <PillButton className={styles.contactButton}>تحدث مع خبراء ERP</PillButton>
          <PillButton className={styles.assessmentButton} href="#form-title" variant="outline">ابدأ التقييم</PillButton>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <Image src="/images/p14.jpg" alt="مبانٍ حديثة ترمز إلى الأعمال والتحول الرقمي المؤسسي" fill sizes="(max-width: 760px) 100vw, 400px" />
      </div>
    </section>
  );
}
