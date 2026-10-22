import { contactHref, type RequestKey } from "@/components/v2/routes";
import { Button } from "@/components/v2/ui/Button";
import styles from "./CtaBanner.module.css";

type CtaBannerProps = {
  title: string;
  text: string;
  /** Preselects the request type on the contact form. */
  service?: RequestKey;
  /** The home band's button carries the longer arrow. */
  longArrow?: boolean;
};

/** Figma "Consultation invitation" (3693:64766): a Foundation/Blue/Darker
    band, 48px padding and 24px corners, closing every page. */
export function CtaBanner({ title, text, service, longArrow }: CtaBannerProps) {
  return (
    <section className={styles.band}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
      <Button variant="inverse" href={contactHref(service)} longArrow={longArrow}>
        اطلب استشارة مجانية
      </Button>
    </section>
  );
}
