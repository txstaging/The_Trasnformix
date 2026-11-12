import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { TrustBanner, trustPage, TrustParts, type Part } from "@/english/components/trust/TrustKit";
import flow from "@/english/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "Code of Professional Conduct | Transformix",
  description:
    "The Code of Professional Conduct sets out the responsibilities of employees, management and collaborators in carrying out work, handling information and systems, and complying with applicable policies and requirements.",
};

/* Figma 4796:6403, its two parts top to bottom. */
const PARTS: readonly Part[] = [
  {
    id: "staff",
    title: "Employees and Management",
    clauses: [
      {
        title: "Compliance with Regulations and Policies",
        paragraphs: [
          "Employees, management and collaborators comply with the regulations and instructions that apply within the scope of their work, and with the corporate policies and client requirements relevant to their tasks, in accordance with the applicable agreements.",
          "The regulatory requirements of each project depend on the country, the sector and the nature of the service. Whenever requirements conflict or are unclear, the responsible specialists are consulted before taking any action that could affect compliance.",
        ],
      },
      {
        title: "Information Confidentiality and Access Rights",
        paragraphs: [
          "Employees and collaborators honor their confidentiality undertakings, and company or client data is used only for authorized professional purposes.",
          "Access rights are granted according to roles and the actual needs of the work, following the approved controls for sharing information and using devices and communication tools.",
        ],
      },
      {
        title: "Professional Use of Technology and AI",
        paragraphs: [
          "Applications, technical tools and AI services are used within approved permissions and purposes, with due regard for data confidentiality, intellectual property rights and the terms of use of external services.",
          "Client data is not used in external tools or services, including AI models, beyond the authorization and requirements defined for the project.",
        ],
      },
      {
        title: "Security Awareness and Reporting",
        paragraphs: [
          "Information protection is supported by awareness of the risks of phishing, social engineering and impersonation, and of how to handle unusual requests or attempts to obtain information or access without authorization.",
          "Employees and collaborators are expected to report suspicious incidents and activities through the designated channels, so they can be assessed and handled according to their nature.",
        ],
      },
      {
        title: "Professional Responsibilities and Protection of Resources",
        paragraphs: [
          "Systems, devices, resources and information provided for work are used responsibly and within the limits of each person's tasks and permissions, protecting the assets of the company and its clients and the materials and rights made available during projects.",
          "Cases that require approval or further assessment are referred to the responsible managers.",
        ],
      },
      {
        title: "Reporting and Accountability",
        paragraphs: [
          "Violations and concerns relating to professional conduct or breaches of policy are reviewed under the appropriate internal procedures, respecting confidentiality, fairness and the rights of the parties concerned.",
          "Corrective or administrative measures are decided according to the nature of the incident, the responsibilities of the parties and the applicable legal requirements.",
        ],
      },
      {
        title: "Professional Dealings with Clients",
        paragraphs: [
          "Client relationships are managed through designated contacts and clear communication channels, respecting the authority to represent and approve, following up on deliverables and feedback, and escalating matters that call for further decisions.",
        ],
      },
    ],
  },
  {
    id: "partners",
    title: "Partners and Suppliers",
    intro: [
      "Transformix relies on its in-house capabilities, bringing in specialist partners and suppliers when a project calls for additional expertise or services. These relationships are managed to keep responsibilities clear and delivery quality high, with Transformix remaining responsible for managing the project and coordinating between the parties within the scope of the contract.",
    ],
    clauses: [
      {
        title: "Selecting and Qualifying Partners",
        paragraphs: [
          "When selecting partners and suppliers, we consider their professional competence, relevant experience and operational capacity, and how well their services fit the project's technical and regulatory requirements.",
          "Depending on the service, the assessment includes verifying licenses, local capabilities, specialist expertise and the relevant professional controls.",
        ],
      },
      {
        title: "Defining Roles and Responsibilities",
        paragraphs: [
          "The roles of partners and suppliers and the limits of their involvement in the work are defined, including technical and operational responsibilities, the scope of services, and coordination and escalation arrangements.",
          "We distinguish between services delivered directly by Transformix teams and those delivered with specialist providers, so it is clear who is responsible for each part of the work.",
        ],
      },
      {
        title: "Monitoring Performance and Service Quality",
        paragraphs: [
          "Services provided by partners are monitored against the agreed requirements and service levels, with feedback that affects delivery reviewed and the appropriate remedial actions coordinated.",
          "The results of the collaboration and its performance are taken into account when deciding whether to continue or expand the relationship.",
        ],
      },
    ],
  },
];

/** Figma 4796:6403 — مدونة السلوك المهني (mobile 4798:7308). */
export default function CodeOfConductPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${trustPage}`}>
        <TrustBanner
          page="code-of-conduct"
          image="/images/trust/conduct.jpg"
          focus="50% 0%"
          text={"The Code of Professional Conduct sets out the responsibilities of employees, management and collaborators in carrying out work, handling information and systems, and complying with applicable policies and requirements. It takes into account the nature of each role and the different regulatory and operational environments of the projects we deliver."}
        />
        <TrustParts parts={PARTS} />
      </main>
      <Footer />
    </>
  );
}
