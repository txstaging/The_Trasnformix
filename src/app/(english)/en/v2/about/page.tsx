import type { Metadata } from "next";
import { PageBody } from "@/english/components/v2/layout/PageBody";
import { CardSection } from "@/english/components/v2/sections/CardSection";
import { CtaBanner } from "@/english/components/v2/sections/CtaBanner";
import { PageIntro } from "@/english/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/english/components/v2/sections/ProcessSteps";
import { SplitFeature } from "@/english/components/v2/sections/SplitFeature";
import { CardGrid } from "@/english/components/v2/ui/FeatureCard";
import { Media } from "@/english/components/v2/ui/Media";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Transformix is a consulting and digital services company that combines an understanding of business models with digital solution design. We start with your organization's current situation to identify what needs to improve and how to deliver it.",
};

/** Figma "من نحن" (3693:64812). */
export default function AboutV2() {
  return (
    <PageBody>
      <PageIntro
        title={"Bringing business ambition closer to what technology can achieve."}
        lead={"Transformix is a consulting and digital services company that combines an understanding of business models with digital solution design. We start with your organization's current situation to identify what needs to improve and how to deliver it."}
        titleWidth={734}
        leadWidth={786}
        minHeight={372}
      />

      <SplitFeature
        eyebrow={"Our starting point"}
        title={"Technology is the means. Business value is the foundation."}
        lead={"Development starts with understanding who will use a solution, which problem it addresses, and how it fits into daily work, before selecting a platform or tool."}
        note={"We connect analysis, consulting, design, and delivery. Every output has a defined purpose, and every stage includes a review to guide the next decision."}
        copyWidth={610}
        media={
          <Media
            src="/v2/images/about-collaboration.png"
            alt={"Two colleagues reviewing work on a computer in an office"}
            width={600}
            height={460}
            radius={24}
          />
        }
      />

      <CardGrid
        tone="gradient"
        items={[
          {
            icon: "/v2/icons/about-telescope.svg",
            title: "Our vision",
            text: "Digital solutions that are closely aligned with organizational needs, clear to understand, and easy to use.",
          },
          {
            icon: "/v2/icons/about-compass.svg",
            title: "Our mission",
            text: "Helping organizations turn business challenges into practical improvements across data, experience, and operations.",
          },
          {
            icon: "/v2/icons/about-route.svg",
            title: "Our approach",
            text: "Listen to the context, set priorities, and deliver in stages while transferring knowledge to your team.",
          },
        ]}
      />

      <CardSection
        eyebrow={"Values that guide our work"}
        title={"Principles reflected in how we collaborate every day."}
        items={[
          {
            icon: "/v2/icons/about-scan-line.svg",
            title: "Clarity",
            text: "Accessible language, clear expectations, and outputs you can review.",
          },
          {
            icon: "/v2/icons/about-shield-check.svg",
            title: "Responsibility",
            text: "Decisions grounded in the agreed scope and available information.",
          },
          {
            icon: "/v2/icons/about-handshake.svg",
            title: "Partnership",
            text: "Working with your team and building on its knowledge of the business.",
          },
          {
            icon: "/v2/icons/refresh-cw.svg",
            title: "Improvement",
            text: "Reviewing what we learn and improving the solution through feedback.",
          },
        ]}
      />

      <ProcessSteps
        bordered
        steps={[
          { title: "We listen", text: "We gather perspectives and understand users' needs." },
          { title: "We analyze", text: "We review the current situation and identify the underlying challenge." },
          { title: "We collaborate", text: "We shape the solution and review priorities with your team." },
          { title: "We empower", text: "We provide the knowledge and tools needed to keep the work moving." },
        ]}
      />

      <CtaBanner
        title={"Let us understand your organization."}
        text={"An initial conversation to understand your priorities and determine whether our services fit your needs."}
      />
    </PageBody>
  );
}
