import Image from "next/image";
import { AcademyAction } from "@/components/academies/AcademyAction";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ServiceCards.module.css";

export type ServiceCard = {
  title: string;
  text: string;
  image: string;
  actionLabel: string;
};

/** Figma 5246:22399: one white card per service, the photo on the left and the
    title, a short note and the call to action on the right. */
export function ServiceCards({ items, label }: { items: readonly ServiceCard[]; label: string }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item.title}>
          <Reveal className={styles.card}>
            <div className={styles.media}>
              <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 100vw, 600px" className={styles.photo} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              <AcademyAction action={{ label: item.actionLabel }} className={styles.action} />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
