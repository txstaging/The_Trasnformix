import { V2 } from "@/components/v2/routes";
import { getServiceWebsite } from "@/lib/serviceNavigation";
import { Button } from "@/components/v2/ui/Button";
import { CardGrid, type Feature } from "@/components/v2/ui/FeatureCard";
import { SectionIntro } from "@/components/v2/ui/SectionIntro";
import styles from "./ServicesShowcase.module.css";

/* Two rows of two, right to left. Each tile opens the service's website. */
const SERVICE_TILES: Feature[] = [
  {
    icon: "/v2/icons/home-chart-90.svg",
    title: "علوم البيانات",
    text: "نحوّل البيانات المتفرقة إلى مؤشرات واضحة تدعم القرار وتكشف فرص التحسين.",
    href: getServiceWebsite("data"),
    external: true,
  },
  {
    icon: "/v2/icons/home-megaphone-90.svg",
    title: "استديو الإبداع والتسويق الرقمي",
    text: "نربط الرسالة بالمحتوى والتصميم، ضمن تجربة متسقة عبر القنوات الرقمية.",
    href: getServiceWebsite("marketing"),
    external: true,
  },
  {
    icon: "/v2/icons/home-panels-90.svg",
    title: "تطوير المواقع",
    text: "نبني تجارب عربية واضحة وسريعة، تعكس هوية المنشأة وتخدم مستخدميها.",
    href: getServiceWebsite("web"),
    external: true,
  },
  {
    icon: "/v2/icons/home-workflow-90.svg",
    title: "أنظمة ERP",
    text: "ننظم العمليات ونربط الإدارات في منظومة مرنة تدعم العمل اليومي.",
    href: getServiceWebsite("erp"),
    external: true,
  },
];

/** Figma "Home services" (3693:64551). */
export function ServicesShowcase() {
  return (
    <section className={styles.section}>
      <SectionIntro
        eyebrow="خدماتنا"
        title="أربعة مسارات. حلول متكاملة لأعمالك."
        lead="اختر نقطة البداية المناسبة، أو اجمع أكثر من مسار ضمن نطاق واضح يراعي احتياج منشأتك."
        leadSize={24}
      />
      <Button href={V2.services} variant="primary-soft" width={196}>
        اطلب الخدمة
      </Button>
      <CardGrid items={SERVICE_TILES} tone="service" columns={2} rowGap={40} />
    </section>
  );
}
