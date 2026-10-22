import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AcademyCta.module.css";

export function AcademyCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.card}>
        <div className={styles.copy}>
          <h2 className={styles.title}>حدّد احتياجك، واختر مسارك التدريبي</h2>
          <p className={styles.text}>
            سواء كنت تبحث عن تطوير مهاراتك المهنية أو ترغب في تأهيل فريقك على
            الحلول الرقمية،
          </p>
        </div>

        <div className={styles.actions}>
          <PillButton variant="inverse">ناقش المشروع معنا</PillButton>
          <PillButton href="#tracks" variant="ghost">
            استكشف الاكاديمية
          </PillButton>
        </div>
      </Reveal>
    </section>
  );
}
