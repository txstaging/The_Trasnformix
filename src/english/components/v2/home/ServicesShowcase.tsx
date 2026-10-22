import { V2 } from "@/english/components/v2/routes";
import { getServiceWebsite } from "@/english/lib/serviceNavigation";
import { Button } from "@/english/components/v2/ui/Button";
import { CardGrid, type Feature } from "@/english/components/v2/ui/FeatureCard";
import { SectionIntro } from "@/english/components/v2/ui/SectionIntro";
import styles from "@/english/components/v2/home/ServicesShowcase.module.css";

/* Two rows of two, right to left. Each tile opens the service's website. */
const SERVICE_TILES: Feature[] = [
  {
    icon: "/v2/icons/home-chart-90.svg",
    title: "Data science",
    text: "We turn scattered data into clear metrics that support decisions and reveal opportunities for improvement.",
    href: getServiceWebsite("data"),
    external: true,
  },
  {
    icon: "/v2/icons/home-megaphone-90.svg",
    title: "Creative studio and digital marketing",
    text: "We connect messaging with content and design for a consistent experience across digital channels.",
    href: getServiceWebsite("marketing"),
    external: true,
  },
  {
    icon: "/v2/icons/home-panels-90.svg",
    title: "Web development",
    text: "We build clear, fast Arabic websites that reflect your organization's identity and serve its users.",
    href: getServiceWebsite("web"),
    external: true,
  },
  {
    icon: "/v2/icons/home-workflow-90.svg",
    title: "ERP systems",
    text: "We organize operations and connect departments through a flexible system that supports daily work.",
    href: getServiceWebsite("erp"),
    external: true,
  },
];

/** Figma "Home services" (3693:64551). */
export function ServicesShowcase() {
  return (
    <section className={styles.section}>
      <SectionIntro
        eyebrow={"Our services"}
        title={"Four paths. Connected solutions for your business."}
        lead={"Choose the right starting point, or combine services within a clear scope that fits your organization's needs."}
        leadSize={24}
      />
      <Button href={V2.services} variant="primary-soft" width={196}>
        {" Request this service "}</Button>
      <CardGrid items={SERVICE_TILES} tone="service" columns={2} rowGap={40} />
    </section>
  );
}
