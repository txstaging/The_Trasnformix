import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { trust, TrustBanner, TrustLede, trustPage, TrustParts, type Part } from "@/english/components/trust/TrustKit";
import flow from "@/english/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "Regulatory Compliance & Standards | Transformix",
  description:
    "Local legislation first, global best practice always: how Transformix takes regulatory requirements and international standards into account when designing and delivering digital systems.",
};

/* The banner's copy after its first line. Desktop keeps it in the banner;
   tablets and phones open the page with it (Figma 4798:7821). */
const LEDE = [
  "Regulatory requirements for digital systems vary with the country, the sector and the nature of the data and services involved. They can shape the choice of technical architecture, hosting locations, access rights, integration between systems, and operation and support arrangements.",
  "At Transformix, we take these considerations into account when studying project requirements and choosing how to deliver, drawing on technical knowledge and international practice while respecting the regulatory frameworks that apply to each case.",
] as const;

/* Figma 4797:6416, its four parts top to bottom. */
const PARTS: readonly Part[] = [
  {
    id: "local-requirements",
    title: "Compliance with Local Requirements",
    intro: [
      "We observe the relevant local legislation and controls when designing and delivering solutions, paying particular attention to requirements on data protection, information security, hosting and cross-border data transfer.",
      "We work with the client and the competent parties to identify the requirements that affect the scope of each project, and make clear what may call for additional technical or contractual arrangements or regulatory reviews.",
      "International practices and standards are used to strengthen the quality and controls of our solutions, with priority given to the legal and regulatory requirements that apply in the market concerned.",
    ],
  },
  {
    id: "sector-requirements",
    title: "Sector Regulatory Requirements",
    intro: [
      "Technical and regulatory requirements differ with the nature of the sector and the sensitivity of the operations and information it handles. That is why, when studying a project, we consider the conditions specific to the client's activity as well as the general requirements that apply in the market.",
      "In the financial, health, education and government sectors and other regulated activities, these conditions may include additional controls for information protection, access management, process documentation, integration with the relevant systems and authorities, and service continuity.",
      "We discuss these requirements with the client and with the relevant advisory or regulatory bodies when needed, to determine their effect on the solution's scope, design and delivery arrangements, distinguishing between Transformix's technical responsibilities and the regulatory obligations that rest with the organization that owns the system.",
    ],
  },
  {
    id: "standards",
    title: "International Standards and Practices",
    intro: [
      "Transformix draws on international frameworks and standards to develop its practices for managing systems, information and risk, in line with the nature of its work and the requirements of its projects. We use these references to support technical and operational decisions, while giving priority to the local legislation and controls that apply.",
    ],
    clauses: [
      {
        title: "Information Security Management",
        paragraphs: [
          "We are guided by the principles of ISO/IEC 27001 in managing information security, with attention to risk assessment, access control, information protection, security awareness and the review of controls for systems and service providers.",
          "Protection measures are set according to the nature of each system and its operating environment, in cooperation with internal teams and specialist service providers, depending on the scope of the project.",
        ],
      },
      {
        title: "Developing Compliance and AI Practices",
        paragraphs: [
          "We continue to study the international frameworks for compliance management and responsible AI, including ISO 37301 for compliance management and ISO/IEC 42001 for AI management systems, to inform the development of our corporate policies and procedures in line with the company's priorities.",
          "Adopting any additional standard is subject to an assessment of its suitability and implementation requirements; studying a standard is not evidence of conformity or of formal certification.",
        ],
      },
      {
        title: "Clarity on Standards and Certifications",
        paragraphs: [
          "We distinguish between applying practices drawn from international standards, implementing a management system that conforms to their requirements, and obtaining certification from an independent body.",
          "We do not present certificates or accreditations in our company profile unless they have actually been issued and are valid, stating their scope and the issuing body where appropriate.",
        ],
      },
    ],
  },
  {
    id: "project-compliance",
    title: "Managing Compliance in Projects",
    intro: [
      "Relevant regulatory requirements are considered when planning and delivering projects, identifying their effect on the scope of work and on technical and operational decisions, in coordination with the client and the competent parties according to the nature of the project.",
    ],
    clauses: [
      {
        title: "Identifying Requirements and Responsibilities",
        paragraphs: [
          "We discuss with the client the regulatory and contractual requirements that affect the project, and define each party's responsibilities for providing the necessary information and approvals, in line with the nature of the solution and the agreed services.",
        ],
      },
      {
        title: "Documenting Decisions and Approvals",
        paragraphs: [
          "Decisions that affect compliance are documented, including options that require client approval or specialist review, according to the size of the project, the nature of its risks and its contractual arrangements.",
        ],
      },
      {
        title: "Reviewing Changes",
        paragraphs: [
          "Material changes to a project's scope or operating environment are reviewed to determine whether they call for updated requirements, controls or responsibilities, with the parties concerned consulted when needed.",
        ],
      },
    ],
  },
];

/** Figma 4797:6416 — الامتثال التنظيمي والمعايير (mobile 4798:7819). */
export default function CompliancePage() {
  const [first, second] = LEDE;
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${trustPage}`}>
        <TrustBanner
          page="compliance"
          image="/images/trust/compliance.jpg"
          text={
            <>
              <p>
                {" Local legislation first. Global best practice, always."}{" "}
                <span className={trust.wide}>{first}</span>
              </p>
              <p className={trust.wide}>{second}</p>
            </>
          }
        />
        <TrustLede paragraphs={LEDE} />
        <TrustParts parts={PARTS} />
      </main>
      <Footer />
    </>
  );
}
