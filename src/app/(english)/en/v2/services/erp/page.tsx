import type { Metadata } from "next";
import { ERP_SERVICE } from "@/english/components/v2/services/content";
import { ProductionPlanning } from "@/english/components/v2/services/ProductionPlanning";
import { ServiceDetail } from "@/english/components/v2/services/ServiceDetail";

export const metadata: Metadata = {
  title: ERP_SERVICE.crumb,
  description: ERP_SERVICE.lead,
};

export default function ErpV2() {
  return <ServiceDetail content={ERP_SERVICE} afterContext={<ProductionPlanning />} />;
}
