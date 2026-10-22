import type { Metadata } from "next";
import { PageBody } from "@/english/components/v2/layout/PageBody";
import { SectorChapter, type Sector } from "@/english/components/v2/sectors/SectorChapter";
import { CardSection } from "@/english/components/v2/sections/CardSection";
import { CtaBanner } from "@/english/components/v2/sections/CtaBanner";
import { PageIntro } from "@/english/components/v2/sections/PageIntro";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "User journeys, workflows, and data sources vary across industries. We begin by understanding those differences, then connect them to the right service and approach.",
};

/* Figma 3693:66276 – 3693:66315, top to bottom. */
const SECTORS: Sector[] = [
  {
    id: "industry",
    icon: "/v2/icons/factory.svg",
    title: "Manufacturing",
    lead: "Connect operations from the factory floor to management decisions, taking production, resources, and supply cycles into account.",
    priorities: [
      "Clear production and quality metrics",
      "Connected inventory, purchasing, and planning",
      "Teams equipped to use digital tools",
    ],
    services:
      "Operational data analysis, ERP assessment, websites showcasing capabilities and products, and training paths relevant to manufacturing.",
    image: { src: "/v2/images/sectors-industry.png", alt: "A factory production line", width: 530, height: 574 },
    imageSide: "left",
    layout: { copy: 655, gap: 32, rhythm: 20, leadWidth: 521, servicesWidth: 539 },
  },
  {
    id: "tourism",
    icon: "/v2/icons/map-pinned.svg",
    title: "Tourism",
    lead: "A digital presence that helps visitors understand and choose their experience, while giving your team a clearer view of the visitor journey.",
    priorities: [
      "Clear presentation of destinations and services",
      "Consistent content across channels",
      "Understanding visitor preferences and sources of demand",
    ],
    services:
      "Websites and digital experiences, campaign content and design, and analysis of inquiries and interest using available data sources.",
    image: { src: "/v2/images/sectors-tourism.png", alt: "Visitors at a tourist destination among mountains", width: 530, height: 500 },
    imageSide: "right",
    layout: { copy: 673, gap: 32, rhythm: 12, leadWidth: 555, servicesWidth: 538 },
  },
  {
    id: "cooperatives",
    icon: "/v2/icons/sectors-handshake.svg",
    title: "Saudi cooperatives",
    lead: "Tools that support collaboration, organize relationships between management and members, and present services and initiatives clearly.",
    priorities: [
      "Organized member and service data",
      "Clear procedures and permissions",
      "Support for communication and internal governance",
    ],
    services:
      "Informational and service portals, membership and activity analytics, operational improvements, and learning programs in cooperative management.",
    image: { src: "/v2/images/sectors-cooperatives.png", alt: "Members of an agricultural cooperative at a plant nursery", width: 530, height: 553 },
    imageSide: "left",
    layout: { copy: 678, gap: 32, rhythm: 20, leadWidth: 526, servicesWidth: 552 },
  },
  {
    id: "education",
    icon: "/v2/icons/graduation-cap.svg",
    title: "Education",
    lead: "Clearer experiences for learners and stakeholders, supported by data that helps explain educational operations and services in context.",
    priorities: [
      "Easier access to information and services",
      "Organized data and management reporting",
      "Building teams' ability to use digital tools",
    ],
    services:
      "Websites for institutions and programs, management dashboards, digital content design, and assessment of process and system integration.",
    image: { src: "/v2/images/sectors-education.png", alt: "Students in a university library", width: 556, height: 556 },
    imageSide: "right",
    layout: { copy: 568, gap: 106, rhythm: 20 },
  },
];

/** Figma "القطاعات" (3693:66230). */
export default function SectorsV2() {
  return (
    <PageBody>
      <PageIntro
        crumbs={[{ label: "Industries" }]}
        title={"Understanding your industry to design a solution that fits."}
        lead={"User journeys, workflows, and data sources vary across industries. We begin by understanding those differences, then connect them to the right service and approach."}
        width={672}
      />

      {SECTORS.map((sector) => (
        <SectorChapter key={sector.id} sector={sector} />
      ))}

      <CardSection
        eyebrow={"One methodology, tailored applications"}
        title={"Our starting point: who will use the solution?"}
        items={[
          {
            icon: "/v2/icons/users-round.svg",
            title: "People",
            text: "Understand members, visitors, learners, or operations teams.",
          },
          {
            icon: "/v2/icons/workflow.svg",
            title: "Workflows",
            text: "Map procedures, handovers, and approvals between stakeholders.",
          },
          {
            icon: "/v2/icons/database.svg",
            title: "Data",
            text: "Identify available information and what needs to improve.",
          },
        ]}
      />

      <CtaBanner
        title={"Let us talk about your industry's challenges."}
        text={"Tell us about your work and the people you serve so we can discuss your needs in the right context."}
      />
    </PageBody>
  );
}
