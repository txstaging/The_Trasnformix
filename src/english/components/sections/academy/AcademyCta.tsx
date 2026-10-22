import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/academy/AcademyCta.module.css";

export function AcademyCta() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.card}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{"Identify your needs and choose your learning path"}</h2>
          <p className={styles.text}>
            {" Whether you want to develop your professional skills or prepare your team to work with digital solutions, "}</p>
        </div>

        <div className={styles.actions}>
          <PillButton variant="inverse">{"Discuss your project with us"}</PillButton>
          <PillButton href="#tracks" variant="ghost">
            {" Explore the academy "}</PillButton>
        </div>
      </Reveal>
    </section>
  );
}
