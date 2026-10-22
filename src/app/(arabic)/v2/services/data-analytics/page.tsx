import type { Metadata } from "next";
import { DATA_SERVICE } from "@/components/v2/services/content";
import { ServiceDetail } from "@/components/v2/services/ServiceDetail";

export const metadata: Metadata = {
  title: DATA_SERVICE.title,
  description: DATA_SERVICE.lead,
};

export default function DataAnalyticsV2() {
  return <ServiceDetail content={DATA_SERVICE} />;
}
