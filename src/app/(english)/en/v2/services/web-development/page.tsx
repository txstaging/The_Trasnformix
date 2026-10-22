import type { Metadata } from "next";
import { WEB_SERVICE } from "@/english/components/v2/services/content";
import { ServiceDetail } from "@/english/components/v2/services/ServiceDetail";

export const metadata: Metadata = {
  title: WEB_SERVICE.crumb,
  description: WEB_SERVICE.lead,
};

export default function WebDevelopmentV2() {
  return <ServiceDetail content={WEB_SERVICE} />;
}
