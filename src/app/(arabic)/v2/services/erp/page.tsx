import type { Metadata } from "next";
import { ERP_SERVICE } from "@/components/v2/services/content";
import { ProductionPlanning } from "@/components/v2/services/ProductionPlanning";
import { ServiceDetail } from "@/components/v2/services/ServiceDetail";

export const metadata: Metadata = {
  title: ERP_SERVICE.crumb,
  description: ERP_SERVICE.lead,
};

export default function ErpV2() {
  return <ServiceDetail content={ERP_SERVICE} afterContext={<ProductionPlanning />} />;
}
