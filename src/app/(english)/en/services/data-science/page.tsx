import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import {
  Closing,
  FlowDiagram,
  kit,
  ProcessSteps,
  SectionIntro,
  ServiceHero,
  type FlowStep,
} from "@/english/components/services/ServiceKit";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/services/data-science/page.module.css";

export const metadata: Metadata = {
  title: "Data Science & Digital Intelligence | Transformix",
  description:
    "We help organizations put their data to work with operational solutions tied to clear performance indicators: AI-driven automation, forecasting and business intelligence, customer intelligence, and data foundations and governance.",
};

/* Figma 4473:8835 — the team beside the principle it works by. */
const TEAM = {
  title: "Integrated expertise that works with your team",
  text: "Our team brings expertise in data analysis, model development and solution engineering, working alongside the operations specialists inside your organization. We combine business understanding with technical delivery to turn data into solutions people can use every day.",
};

const PRINCIPLE = {
  title: "We measure success by its value to the business",
  text: "Not by technical accuracy alone. We weigh feasibility and operability, how clear the results are to users, and future development needs.",
};

/* Figma 4473:8842, in reading order. */
const VALUE_FLOW = ["Untapped sources and data", "Operational solutions and models", "Measurable decisions and indicators"];

/* Figma 4473:8860 */
const STEPS = [
  {
    title: "Strategic alignment & scoping",
    text: "We define the decision, the performance indicators and who signs off on the results. We review data quality, budget, technical constraints and responsible-use requirements before development begins.",
  },
  {
    title: "Build & deploy to production quality",
    text: "Short development cycles with continuous review. We may use an early Streamlit dashboard to test the data, the analytical logic and the user experience with the team that will use it before final rollout.",
  },
  {
    title: "Measure & improve",
    text: "After launch we track the solution's performance, adoption and real results. We use the RADAR cycle to assess what was achieved, review how the work was done and identify improvements.",
  },
] as const;

/* Figma 4473:8885 — the RADAR loop in two rows, each in reading order. */
const RADAR_FIRST: readonly FlowStep[] = [
  { label: "Results", en: "Results" },
  { label: "Approach", en: "Approach" },
  { label: "Deployment", en: "Deployment" },
];

const RADAR_SECOND: readonly FlowStep[] = [
  { label: "Assess & Synthesize", en: "Assess & Synthesize" },
  { label: "Improvement", en: "Refine" },
];

type Capability = {
  slug: string;
  title: string;
  text: string;
  image: string;
  need: string;
  /** In reading order, two to a row; an odd last one spans the row. */
  scope: readonly { title: string; text: string }[];
  applications: string;
  flow: readonly string[];
  note?: string;
};

/* Figma 4473:8911 — the four capabilities, each with its need, scope,
   applications and flow. */
const CAPABILITIES: readonly Capability[] = [
  {
    slug: "automation",
    title: "AI-Powered Automation & Efficiency",
    text: "We build automation flows and AI agents that carry out connected tasks across systems, with controls on permissions and monitoring: from document processing and data exchange to handling recurring requests.",
    image: "/images/services/data/capability-1.jpg",
    need: "When data is keyed in by hand again and again, large volumes of messages and documents need processing, a transaction moves between several systems, or response times suffer from too many manual steps.",
    scope: [
      {
        title: "Workflows & integration",
        text: "Process mapping to find the highest-impact automation opportunities, and setting up triggers and data flows between online stores, CRM systems and WhatsApp.",
      },
      {
        title: "Governance & control",
        text: "Service-level agreements, request limits and approval steps for sensitive actions, with timeouts, defined permissions and approval gates before high-impact actions.",
      },
      {
        title: "Enterprise reliability",
        text: "Idempotent processing, retries, dead-letter queues and detailed logging.",
      },
      {
        title: "Agents with approved tools",
        text: "Agents are limited to approved search, CRM and email tools, with every sequence of actions logged. Language models read messages, support tickets and unstructured content and carry out controlled steps.",
      },
      {
        title: "Intelligent document processing",
        text: "Extracting and organizing data from invoices, reports and scanned documents with OCR and intelligent processing.",
      },
    ],
    applications: "AI agents · Chatbots & virtual assistants · Workflow & process automation · Predictive maintenance · Intelligent document processing (IDP)",
    flow: ["Email, documents, CRM & stores", "Agents & controlled integration flows", "Task execution, audit & approval"],
  },
  {
    slug: "predictive",
    title: "Predictive & Business Intelligence",
    text: "We build models that forecast demand, sales, risk and customer behavior, and connect their results to business intelligence dashboards that show the indicators, explain changes and support day-to-day and planning decisions.",
    image: "/images/services/data/capability-2.jpg",
    need: "When figures conflict between reports, demand and inventory shift without reliable forecasts, or dashboards show plenty of data without explaining what is happening.",
    scope: [
      {
        title: "Forecasting & modeling",
        text: "Choosing models for stable time series and for complex, shifting patterns, and building machine learning models for forecasting, customer retention and risk assessment.",
      },
      {
        title: "Forecast accuracy testing",
        text: "Backtesting and rolling cross-validation, measured with WAPE, MAPE and bias.",
      },
      {
        title: "Role-based dashboards & views",
        text: "Interfaces built for the decision at hand: scorecards for leadership, detailed analysis for managers, and operational screens for teams.",
      },
      {
        title: "Explaining change",
        text: "Seasonality analysis and control charts to catch unusual cases, with data visualization and model results told in a way specialists and non-specialists alike can follow.",
      },
      {
        title: "Secure self-service analytics",
        text: "Certified datasets and secure filters that let users explore the data within clear controls.",
      },
    ],
    applications: "Sales & demand forecasting · Predictive analytics · Fraud detection · Churn analysis · Business intelligence (BI) dashboards · Market basket analysis",
    flow: ["Historical & operational data", "Forecasting models & accuracy testing", "Dashboards & operational actions"],
  },
  {
    slug: "customers",
    title: "Personalization & Customer Intelligence",
    text: "We analyze customer data and interactions to build sharper segments, relevant recommendations and offers based on usage and buying patterns. We use opinion and sentiment analysis to understand the customer experience and improve how you communicate.",
    image: "/images/services/data/capability-3.jpg",
    need: "When customer satisfaction results are hard to interpret, the same offers go to every segment, or complaints and feedback pile up across channels without structured analysis.",
    scope: [
      {
        title: "Language processing & sentiment analysis",
        text: "Transformer models that analyze sentiment and topics in reviews, tickets and social platforms.",
      },
      {
        title: "Recommendation systems",
        text: "Recommending products and content based on usage history, behavior and item attributes.",
      },
      {
        title: "Feature engineering & segmentation",
        text: "Combining recency, frequency and monetary value (RFM) with behavioral features, and using clustering to form practical segments by behavior and customer lifetime value (CLV).",
      },
      {
        title: "Activation & impact measurement",
        text: "Sending segments and recommended actions to CRM, ad platforms and products, and estimating who is likely to change behavior because of a given offer to measure the true incremental impact of campaigns.",
      },
    ],
    applications: "Personalized product recommendations · Customer intelligence platforms (CIP) · Customer journey analysis · Customer segmentation · Hyper-personalization · Sentiment analysis",
    flow: ["Interactions, purchases & feedback", "Segmentation, behavior & sentiment analysis", "Multichannel recommendation, personalization & activation"],
  },
  {
    slug: "foundations",
    title: "Data Foundations & Governance",
    text: "We design data architecture that brings information together from across the organization and organizes it for use, covering system integration, data warehouses, and quality, access and governance controls.",
    image: "/images/services/data/capability-4.jpg",
    need: "When data is scattered across systems and departments, teams don't agree on how indicators are defined, or reports run late because data is hard to extract and verify.",
    scope: [
      {
        title: "Modern data warehouses & engineering",
        text: "Scalable central warehouses that store data consistently and efficiently, connecting ERP, CRM, APIs and other sources and organizing them for use.",
      },
      {
        title: "Data processing & lineage",
        text: "Loading data and then transforming it in place (ELT), keeping it traceable and flexible.",
      },
      {
        title: "Shared definitions & ownership",
        text: "Shared indicator definitions, named data owners and quality responsibilities, a business glossary and a data dictionary.",
      },
      {
        title: "Security by design",
        text: "Access control, masking of sensitive data, and compliance controls built into the design across every data layer.",
      },
    ],
    applications: "Master data management (MDM) · Data governance · Data security · Data quality management · Business glossary & data dictionary · Compliance management",
    flow: ["Data sources ERP / CRM / API", "Processing, warehouse, quality & definitions", "Trusted analytics & AI"],
    note: "Governance, access and protection span every layer.",
  },
];

const pad = (index: number) => String(index + 1).padStart(2, "0");

/** Figma 4473:8787 — علوم البيانات والذكاء الرقمي. */
export default function DataSciencePage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="data-heading"
          image="/images/services/data/hero.jpg"
          kicker={"Data Science & Digital Intelligence"}
          title={"Beyond models: measurable business value from your data"}
          text={"We help organizations make use of the data already in their systems, even when it is spread across departments or hard to collect and analyze. We build operational solutions tied to clear performance indicators that support decisions based on reliable information."}
          actions={[{ label: "Discuss your data project" }, { label: "Explore our capabilities", href: "#capabilities" }]}
          wide
        />

        <section className={kit.section} aria-labelledby="data-team-heading">
          <SectionIntro
            id="data-team-heading"
            kicker={"The service & the team"}
            title={"We start with the decision, not the technology"}
            text={"We begin by defining the decision your organization needs to support, then choose the right technical solution and measure its results once it is running. That way, data becomes an asset the organization can rely on to run and grow its business."}
          />
          <div className={styles.team}>
            <Reveal className={styles.teamIntro}>
              <h3 className={kit.cardTitle}>{TEAM.title}</h3>
              <p className={kit.cardText}>{TEAM.text}</p>
            </Reveal>
            <Reveal className={styles.principle} delay={80}>
              <h3 className={kit.cardTitle}>{PRINCIPLE.title}</h3>
              <p className={kit.cardText}>{PRINCIPLE.text}</p>
            </Reveal>
          </div>
          <Reveal>
            <FlowDiagram steps={VALUE_FLOW} />
          </Reveal>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="data-framework-heading">
          <SectionIntro
            id="data-framework-heading"
            title={"From a clear goal to a solution that works and keeps improving"}
            text={"Three connected stages: agreeing on a goal and the indicators to measure it, building and running the solution, and finally tracking and improving performance."}
            center
          />
          <ProcessSteps steps={STEPS} roomy />
          <Reveal className={styles.radar}>
            <h3 className={`${kit.cardTitle} ${styles.radarTitle}`}>
              {" A continuous assessment and improvement loop — "}<span lang="en">RADAR</span>
            </h3>
            <FlowDiagram steps={RADAR_FIRST} />
            <span className={styles.radarTurn} aria-hidden="true">
              ↓
            </span>
            <FlowDiagram
              steps={RADAR_SECOND}
              note={"↻ Assessment restarts after each refinement to begin a new loop; we keep reviewing results, approach and deployment."}
            />
          </Reveal>
        </section>

        {CAPABILITIES.map((capability, index) => {
          const heading = `data-${capability.slug}-heading`;
          const scope = `data-${capability.slug}-scope`;
          return (
            <section
              key={capability.slug}
              id={index === 0 ? "capabilities" : undefined}
              className={index % 2 ? `${kit.section} ${kit.tinted}` : kit.section}
              aria-labelledby={heading}
            >
              <div className={styles.overview}>
                <Reveal className={`${kit.card} ${styles.overviewCard}`}>
                  <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                    {pad(index)}
                  </span>
                  <h2 id={heading} className={kit.cardTitle}>
                    {capability.title}
                  </h2>
                  <p className={kit.cardText}>{capability.text}</p>
                  <a href={`#${scope}`} className={kit.cardLink}>
                    {" Technical scope tied to your business needs "}</a>
                </Reveal>
                <Reveal className={styles.overviewMedia} delay={80}>
                  <Image
                    className={styles.overviewImage}
                    src={capability.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 330px"
                  />
                </Reveal>
              </div>

              <Reveal className={styles.need}>
                <p className={styles.label}>{"When does an organization need this service?"}</p>
                <p className={kit.cardText}>{capability.need}</p>
              </Reveal>

              <h3 id={scope} className={`${kit.cardTitle} ${styles.scopeTitle}`}>
                {" Scope of work & capabilities "}</h3>
              <ul className={styles.scope}>
                {capability.scope.map((item, itemIndex) => (
                  <Reveal as="li" key={item.title} className={styles.scopeItem} delay={(itemIndex % 2) * 60}>
                    <h4 className={kit.cardTitle}>{item.title}</h4>
                    <p className={kit.cardText}>{item.text}</p>
                  </Reveal>
                ))}
              </ul>

              <Reveal className={styles.applications}>
                <p className={styles.label}>{"Applications that serve your business"}</p>
                <p className={kit.cardText}>{capability.applications}</p>
              </Reveal>

              <Reveal>
                <FlowDiagram steps={capability.flow} note={capability.note} />
              </Reveal>
            </section>
          );
        })}

        <Closing
          id="data-closing-heading"
          title={"Reliable data, usable analysis"}
          text={"We review your data sources and your teams' needs with you, and identify the priorities that can become a deliverable, measurable project: from building the data foundation and developing analytics to running models and integrating with your existing systems."}
          actions={[{ label: "Discuss your data project" }]}
        />
      </main>
      <Footer />
    </>
  );
}
