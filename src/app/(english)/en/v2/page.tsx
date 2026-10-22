import { ClientMarquee } from "@/english/components/v2/home/ClientMarquee";
import { HomeHero } from "@/english/components/v2/home/HomeHero";
import { PartnerLogos } from "@/english/components/v2/home/PartnerLogos";
import { SectorStories } from "@/english/components/v2/home/SectorStories";
import { ServicesShowcase } from "@/english/components/v2/home/ServicesShowcase";
import { TrustPanel } from "@/english/components/v2/home/TrustPanel";
import { WorkExamples } from "@/english/components/v2/home/WorkExamples";
import { PageBody } from "@/english/components/v2/layout/PageBody";
import { contactHref } from "@/english/components/v2/routes";
import { CardSection } from "@/english/components/v2/sections/CardSection";
import { CtaBanner } from "@/english/components/v2/sections/CtaBanner";
import { FaqList } from "@/english/components/v2/sections/FaqList";
import { ProcessSteps } from "@/english/components/v2/sections/ProcessSteps";
import { SplitFeature } from "@/english/components/v2/sections/SplitFeature";
import { Button } from "@/english/components/v2/ui/Button";
import { Media } from "@/english/components/v2/ui/Media";

/** Figma "الرئيسية" (3693:64469) — الرئيسية 2. */
export default function HomeV2() {
  return (
    <>
      <HomeHero />
      <PageBody gap="lg" top="section">
        <CardSection
          eyebrow={"We start with the right question"}
          title={"What does your business need to move forward with confidence?"}
          lead={"Your challenge may be scattered data, an unclear digital experience, or processes that consume your team's time. We start by understanding the full picture before recommending tools."}
          tone="blue"
          items={[
            {
              icon: "/v2/icons/home-scan-search.svg",
              title: "Understand before solving",
              text: "We listen to stakeholders and understand actual priorities and constraints.",
            },
            {
              icon: "/v2/icons/home-network.svg",
              title: "Connected thinking",
              text: "We treat data, experience, and operations as one connected system.",
            },
            {
              icon: "/v2/icons/home-list-checks.svg",
              title: "Delivery you can track",
              text: "We define outputs, responsibilities, and review points from the start.",
            },
          ]}
        />

        <ServicesShowcase />
        <WorkExamples />
        <PartnerLogos />

        <SplitFeature
          eyebrow={"When data becomes clear"}
          title={"More than another dashboard: clearer questions and better decisions."}
          lead={"We connect each metric to its purpose, review its source, and put it in business context. Analysis becomes a tool for discussion between management and teams, with meaning beyond the numbers on the screen."}
          note={"The scope of analysis and update frequency depend on data readiness and existing systems."}
          action={
            <Button href={contactHref("data")} variant="primary-soft">
              {" Request this service "}</Button>
          }
          copyWidth={632}
          media={
            <Media
              src="/v2/screens/mcr-dashboard.png"
              alt={"MCR Systems dashboard for operational monitoring"}
              width={576}
              height={394}
              crop={{ left: -4.27, top: -2.77, width: 108.54, height: 105.54 }}
            />
          }
        />

        <ProcessSteps
          badge="large"
          steps={[
            { title: "Understand the context", text: "We explore the challenge, stakeholders, and existing systems." },
            { title: "Set the direction", text: "We prioritize and define a scope with outputs you can review." },
            { title: "Build and test", text: "We develop the solution in stages and review the experience with your team." },
            { title: "Deliver and enable", text: "We document the work and help transfer knowledge to users." },
          ]}
        />

        <ClientMarquee />
        <SectorStories />

        <SplitFeature
          eyebrow={"Transformix Academy"}
          title={"Building knowledge you can put into practice."}
          lead={"Practical learning paths in vocational training, manufacturing, and Saudi cooperatives, connecting learning needs with real work."}
          note={"Each journey starts with identifying the audience, then selecting the right content, learning format, and outcomes."}
          action={
            <Button href={contactHref("academy")} size="compact" width={170}>
              {" Request this service "}</Button>
          }
          copyWidth={548}
          media={
            <Media
              src="/v2/images/home-academy.png"
              alt={"A team training session around a meeting table"}
              width={654}
              height={470}
              radius={24}
            />
          }
        />

        <TrustPanel />

        <FaqList
          inset
          items={[
            {
              question: "How do I choose the right service for my organization?",
              answer:
                "Start by describing your challenge and desired outcome. We discuss your current situation and help define the right path and scope before work begins.",
            },
            {
              question: "Can a project include more than one service?",
              answer:
                "Yes. We can explore connections between services, such as linking a website to marketing content or connecting operational data to ERP systems, within an agreed scope.",
            },
            {
              question: "Are solutions ready-made or tailored to our needs?",
              answer:
                "We assess the options against your organization's situation. The right approach may involve configuring existing tools, developing a custom solution, or combining both.",
            },
          ]}
        />

        <CtaBanner
          title={"Let us start with the challenge on your mind."}
          text={"Tell us about your organization and priorities so we can agree on the next step and scope of work."}
          longArrow
        />
      </PageBody>
    </>
  );
}
