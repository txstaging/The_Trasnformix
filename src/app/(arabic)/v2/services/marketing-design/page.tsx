import type { Metadata } from "next";
import { CampaignConcept } from "@/components/v2/services/CampaignConcept";
import { MARKETING_SERVICE } from "@/components/v2/services/content";
import { ServiceDetail } from "@/components/v2/services/ServiceDetail";

export const metadata: Metadata = {
  title: MARKETING_SERVICE.title,
  description: MARKETING_SERVICE.lead,
};

export default function MarketingDesignV2() {
  return <ServiceDetail content={MARKETING_SERVICE} visual={<CampaignConcept />} />;
}
