import type { Metadata } from "next";
import { SERVICES_INTRO } from "@/english/lib/serviceNavigation";
import { SERVICES_OVERVIEW } from "@/english/lib/servicesOverview";
import { PageBody } from "@/english/components/v2/layout/PageBody";
import { CardSection } from "@/english/components/v2/sections/CardSection";
import { CtaBanner } from "@/english/components/v2/sections/CtaBanner";
import { FaqList } from "@/english/components/v2/sections/FaqList";
import { PageIntro } from "@/english/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/english/components/v2/sections/ProcessSteps";
import { ServiceDirectory } from "@/english/components/v2/services/ServiceDirectory";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four services covering data, digital presence, communication, and operations. We help you choose the right path, with services that can work together according to your priorities and readiness.",
};

/** Figma "الخدمات" (3693:64974). */
export default function ServicesV2() {
  return (
    <PageBody gap="lg">
      <PageIntro
        crumbs={[{ label: "Services" }]}
        {...SERVICES_INTRO}
      />

      <ServiceDirectory />

      <CardSection {...SERVICES_OVERVIEW.challenges} />

      <ProcessSteps steps={SERVICES_OVERVIEW.steps} />

      <FaqList items={SERVICES_OVERVIEW.faqs} />

      <CtaBanner
        {...SERVICES_OVERVIEW.cta}
        service="help"
      />
    </PageBody>
  );
}
