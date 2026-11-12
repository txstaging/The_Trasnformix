import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { TrustBanner, trustPage, TrustParts, type Part } from "@/english/components/trust/TrustKit";
import flow from "@/english/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "Our Ethics | Transformix",
  description:
    "Integrity in decisions and responsibility in practice: how Transformix chooses technologies and projects, respects privacy and values, and deals honestly with clients and partners.",
};

/* Figma 4796:6223 – 4796:6300, top to bottom. */
const PARTS: readonly Part[] = [
  {
    id: "responsible-technology",
    title: "Technology and Responsible Choices",
    tinted: true,
    clauses: [
      {
        title: "The Dark Side of Technology",
        paragraphs: [
          "Technologies designed to serve people can become tools that harm them when used for fraud, deception, unlawful surveillance or invasion of privacy. These concerns matter more as artificial intelligence grows in its ability to analyze, automate and influence decisions.",
          "That is why we look at the purpose for which technology is used and its potential effects, not only at its technical capabilities or commercial viability.",
        ],
      },
      {
        title: "Choosing Projects Responsibly",
        paragraphs: [
          "When choosing our projects and partnerships, we consider whether the activities involved are consistent with the laws and the religious and cultural values of the communities we work in. This also shapes the media and marketing content we produce, which respects each community's privacy and cultural standards.",
          "We also take sustainability and operational resilience into account, supporting the responsible use of resources and business continuity.",
          "We may decline to take part in projects that conflict with our ethical principles or with legal and professional requirements, taking into account the nature and circumstances of each project.",
        ],
      },
      {
        title: "Respecting Values and Beliefs",
        paragraphs: [
          "We work in communities with diverse beliefs, traditions and cultures, and we treat this diversity as an essential part of understanding the people and the market we serve.",
          "We respect religious and cultural values in our professional relationships and in the design of our solutions, respecting individuals' privacy and different backgrounds and upholding fair professional standards in our dealings with everyone.",
          "These principles go hand in hand with honesty in our dealings, keeping our promises, and taking care not to harm others or abuse their trust.",
        ],
      },
      {
        title: "The Client Is a Partner in the Decision",
        paragraphs: [
          "We believe that choosing the right technology is a shared decision, based on an understanding of the client's business and priorities and of the risks they can manage.",
          "That is why we explain the available alternatives, with their advantages and limitations, whether the question is hosting the system on the client's premises or in the cloud, the level of control over data, or the options for integration, operation and cost.",
          "We give our professional recommendations and explain the implications of each option, so the client can make an informed decision. We respect their choices within legal limits and essential security requirements, and make clear the cases in which we cannot agree to implement an option that crosses these limits.",
        ],
      },
      {
        title: "Data Privacy and User Rights",
        paragraphs: [
          "We respect information privacy and the rights of data subjects when designing and using solutions, by defining the data required, the purposes of processing it, who may access it and how long it is kept.",
          "The details of these practices and the technical options are set out on the Data Sovereignty and Privacy page.",
        ],
      },
    ],
  },
  {
    id: "integrity",
    title: "Honesty and Professional Integrity",
    clauses: [
      {
        title: "Clear Commitments",
        paragraphs: [
          "We make sure our proposals reflect our actual capabilities, and that the scope of work, deliverables, responsibilities and the assumptions that affect delivery are clear to everyone involved.",
          "We handle changes and technical and operational risks through professional communication, explaining the alternatives and their possible effects before the related decisions are made.",
        ],
      },
      {
        title: "Integrity and Conflicts of Interest",
        paragraphs: [
          "We are objective in our professional and business decisions, and we reject bribery and any practice that unlawfully influences the independence of a decision.",
          "We handle conflicts of interest, gifts and commercial benefits through disclosure and appropriate assessment, preserving the integrity of our relationships with employees, clients, partners and suppliers.",
        ],
      },
    ],
  },
  {
    id: "respect",
    title: "People and Respect",
    clauses: [
      {
        title: "Respect and Fairness",
        paragraphs: [
          "Our working relationships rest on mutual respect and fairness, with regard for equal opportunity, individual dignity and differences in experience and background.",
          "We do not accept discrimination, harassment, abuse or the misuse of authority in professional relationships, and we foster an environment that encourages cooperation and responsible feedback.",
        ],
      },
    ],
  },
  {
    id: "accountability",
    title: "Accountability and Responsible Conduct",
    intro: [
      "Responsibility does not end when a decision is made or a system is delivered. When a problem arises that affects the service, information or the client's interests, transparency, prompt assessment, communication and professional handling become part of our responsibilities.",
      "Where a security incident is involved, we notify the parties concerned without undue delay, based on the initial assessment and on legal and contractual requirements, and coordinate the appropriate measures to address the incident and limit its effects.",
      "We learn from feedback, incidents and reviews to improve our practices, decisions and procedures, defining responsibilities according to the nature of each case.",
    ],
  },
];

/** Figma 4796:6202 — أخلاقياتنا (mobile 4798:6787). */
export default function EthicsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${trustPage}`}>
        <TrustBanner
          page="ethics"
          image="/images/trust/ethics.jpg"
          focus="50% 0%"
          compact
          text={"Integrity in decisions. Responsibility in practice. In the age of artificial intelligence, technology can have a wide impact on people's lives and on how organizations work, while the risks of its misuse in fraud, cyberattacks and privacy violations keep growing. That is why we believe ethical responsibility begins with the decisions made about technology, before it is built or put into operation."}
        />
        <TrustParts parts={PARTS} />
      </main>
      <Footer />
    </>
  );
}
