import { DATA_SERVICE, WEB_SERVICE, MARKETING_SERVICE, ERP_SERVICE } from "@/components/v2/services/content";

export const serviceCatalog = [
  { slug: "data-analytics", label: "DATA & AI", content: DATA_SERVICE, image: "/v2/screens/mcr-dashboard.png" },
  { slug: "web-development", label: "WEB EXPERIENCES", content: WEB_SERVICE, image: "/images/works/belli.png" },
  { slug: "marketing-design", label: "CREATIVE STUDIO", content: MARKETING_SERVICE, image: "/images/work-kun.png" },
  { slug: "erp", label: "ERP & AUTOMATION", content: ERP_SERVICE, image: "/images/services-erp-apps.jpg" },
];

export const serviceSlugs = [...serviceCatalog.map(service => service.slug), "mobile-development"];
