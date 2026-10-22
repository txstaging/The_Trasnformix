import type { Metadata } from "next";
import { SERVICES_INTRO } from "@/lib/serviceNavigation";
import { SERVICES_OVERVIEW } from "@/lib/servicesOverview";
import { PageBody } from "@/components/v2/layout/PageBody";
import { CardSection } from "@/components/v2/sections/CardSection";
import { CtaBanner } from "@/components/v2/sections/CtaBanner";
import { FaqList } from "@/components/v2/sections/FaqList";
import { PageIntro } from "@/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/components/v2/sections/ProcessSteps";
import { ServiceDirectory } from "@/components/v2/services/ServiceDirectory";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "أربع خدمات تغطي البيانات والحضور الرقمي والتواصل والعمليات. نساعدك على اختيار المسار المناسب، مع إمكانية تكامل الخدمات وفق الأولويات وجاهزية المنشأة.",
};

/** Figma "الخدمات" (3693:64974). */
export default function ServicesV2() {
  return (
    <PageBody gap="lg">
      <PageIntro
        crumbs={[{ label: "الخدمات" }]}
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
