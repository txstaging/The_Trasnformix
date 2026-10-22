import { CardGrid, type Feature } from "@/components/v2/ui/FeatureCard";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./TrustPanel.module.css";

const COMMITMENTS: Feature[] = [
  {
    icon: "/v2/icons/home-file-check.svg",
    title: "وضوح من البداية",
    text: "نطاق ومخرجات وحدود مسؤولية مفهومة للطرفين.",
  },
  {
    icon: "/v2/icons/home-shield-check.svg",
    title: "عناية بالمعلومات",
    text: "تحديد صلاحيات الوصول وطريقة تبادل البيانات حسب المشروع.",
  },
  {
    icon: "/v2/icons/home-book-open.svg",
    title: "معرفة تبقى معك",
    text: "توثيق وتدريب يساعدان فريقك على استخدام الحل والاستفادة منه.",
  },
];

/** Figma "Working commitments" (3693:64736): glass cards on the deep blue
    gradient panel. */
export function TrustPanel() {
  return (
    <section className={styles.panel}>
      <SectionIntro eyebrow="أسس التعاون" title="الثقة تُبنى في تفاصيل العمل." tone="inverse" />
      <CardGrid items={COMMITMENTS} tone="glass" />
    </section>
  );
}
