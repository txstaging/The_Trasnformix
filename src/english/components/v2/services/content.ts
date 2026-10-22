import type { ServiceKey } from "@/english/components/v2/routes";
import type { Faq } from "@/english/components/v2/sections/FaqList";
import type { Step } from "@/english/components/v2/sections/ProcessSteps";
import type { Feature, FeatureCardTone } from "@/english/components/v2/ui/FeatureCard";

/** Everything a v2 service page says. The four artboards share one layout
    (Figma "Service narrative"), so each page is this data plus, where the
    artboard has one, a bespoke visual. Card lists run right to left. */
export type ServiceContent = {
  key: ServiceKey;
  /** The last breadcrumb. */
  crumb: string;
  title: string;
  lead: string;
  /** A supplied interface under the introduction, 1040 x 686. */
  screen?: { src: string; alt: string; caption?: string };
  context: string;
  /** The marketing artboard opens its context card with the paragraph. */
  contextTextFirst?: boolean;
  scope: { title: string; tone: FeatureCardTone; items: Feature[] };
  outcomes: { tone: FeatureCardTone; items: Feature[]; footnote: boolean };
  process: { variant: "timeline" | "ruled"; steps: Step[] };
  readiness: string;
  faqs: Faq[];
  cta: { title: string; text: string };
};

const CTA_TEXT =
  "Tell us about your challenge and current systems or tools so we can discuss the scope and next step.";

const icon = (name: string) => `/en/v2/icons/${name}.svg`;

/** Figma "تحليل البيانات" (3693:65211). */
export const DATA_SERVICE: ServiceContent = {
  key: "data",
  crumb: "Data analytics",
  title: "Data science and artificial intelligence",
  lead: "We help you organize data and understand the story behind the numbers, from defining the question and reviewing sources to building metrics and dashboards that support decisions.",
  screen: { src: "/v2/screens/mcr-dashboard.png", alt: "MCR Systems dashboard for operational monitoring" },
  context:
    "Conflicting reports and scattered files make it difficult to agree on one picture. We review sources, definitions, and context before designing any metric.",
  scope: {
    title: "Data analytics scope",
    tone: "gradient-deep",
    items: [
      {
        icon: icon("data-database"),
        title: "Data preparation",
        text: "Identify sources, review quality, address duplicates, and standardize definitions before use.",
      },
      {
        icon: icon("data-chart"),
        title: "Analytics and dashboards",
        text: "Exploratory analysis and dashboards for management and teams, with a clear definition for every metric.",
      },
      {
        icon: icon("data-scan-search"),
        title: "Advanced analytics",
        text: "Explore patterns, scenarios, and forecasting opportunities when the data's nature and quality support them.",
      },
    ],
  },
  outcomes: {
    tone: "neutral",
    footnote: true,
    items: [
      {
        icon: icon("messages-square"),
        title: "A shared language for performance",
        text: "Consistent definitions that reduce differences in how departments interpret metrics.",
      },
      {
        icon: icon("target"),
        title: "Clear priorities",
        text: "Identify questions and gaps that deserve further investigation.",
      },
      {
        icon: icon("refresh-cw"),
        title: "Reporting that can be maintained",
        text: "Organize updates and documentation to suit the available sources.",
      },
    ],
  },
  process: {
    variant: "timeline",
    steps: [
      { title: "Define the questions", text: "We identify the decisions to support and the intended users." },
      { title: "Review the data", text: "We examine sources, quality, permissions, and integration options." },
      { title: "Analyze and build", text: "We design metrics and visualizations and review them with stakeholders." },
      { title: "Validate and enable", text: "We check calculations and document definitions and update procedures." },
    ],
  },
  readiness:
    "Suitable data samples for review, a list of current reports, priority business questions, and a contact who understands the data's context.",
  faqs: [
    {
      question: "Can you work with Excel files alone?",
      answer:
        "We can assess the files as a starting point. The solution is defined after reviewing their structure, volume, quality, and update process.",
    },
    {
      question: "Is advanced analytics suitable for all data?",
      answer:
        "Not necessarily. We first assess the volume, history, and accuracy of the data. Improving basic reporting may be the most appropriate next step.",
    },
  ],
  cta: { title: "Let us start with the question your data needs to answer.", text: CTA_TEXT },
};

/** Figma "تطوير المواقع" (3693:65475). */
export const WEB_SERVICE: ServiceContent = {
  key: "web",
  crumb: "Web development",
  title: "A website that reflects your identity and serves your visitors.",
  lead: "We design and develop structured Arabic websites that combine clear content, ease of use, and technical flexibility for a consistent experience across devices.",
  screen: {
    src: "/v2/screens/cooperative-dashboard.png",
    alt: "Cooperative management platform interface",
    caption: "Sample interface from the project materials. Final features depend on the agreed scope.",
  },
  context:
    "A website can contain plenty of information yet leave visitors' questions unanswered. We review the user journey and content structure to determine what should appear, when, and how.",
  scope: {
    title: "Web development scope",
    tone: "neutral",
    items: [
      {
        icon: icon("web-mouse-pointer"),
        title: "Experience and content",
        text: "Needs research, information architecture, user journeys, and prototypes of the core pages.",
      },
      {
        icon: icon("web-panels"),
        title: "Design and development",
        text: "Responsive interfaces, consistent components, and development suited to the website's requirements, including right-to-left layouts where needed.",
      },
      {
        icon: icon("web-settings"),
        title: "Management and integration",
        text: "Content management, forms, and connections to required systems, with clearly defined permissions and boundaries.",
      },
    ],
  },
  outcomes: {
    tone: "gradient",
    footnote: true,
    items: [
      {
        icon: icon("web-route"),
        title: "An easier visitor journey",
        text: "Clear information and routes to the right service.",
      },
      {
        icon: icon("web-file-pen"),
        title: "More flexible management",
        text: "Content organized so your team can update it within its permissions.",
      },
      {
        icon: icon("web-code-xml"),
        title: "A considered technical foundation",
        text: "Defined requirements for performance, accessibility, and future maintenance.",
      },
    ],
  },
  process: {
    variant: "timeline",
    steps: [
      { title: "Discovery and structure", text: "We understand your audience and goals, then organize the sitemap and content." },
      { title: "Experience design", text: "We review prototypes, interfaces, and user journeys." },
      { title: "Development and testing", text: "We build the pages and test devices, forms, and content." },
      { title: "Launch and handover", text: "We review launch readiness and provide guidance for your team." },
    ],
  },
  readiness:
    "Available brand assets and content, website objectives, a list of required functions, and a contact who can approve content and design.",
  faqs: [
    {
      question: "Do you support Arabic and English websites?",
      answer:
        "Both languages can be included in the scope, with content structure, reading direction, and translation management considered from the start.",
    },
    {
      question: "What about hosting and maintenance?",
      answer:
        "These requirements are discussed separately in the proposal, including responsibilities, updates, and the extent of support.",
    },
  ],
  cta: { title: "Let us build a digital experience that represents your organization.", text: CTA_TEXT },
};

/** Figma "التسويق والتصميم الإلكتروني" (3693:65692). Its visual is the
    campaign concept card (services/CampaignConcept). */
export const MARKETING_SERVICE: ServiceContent = {
  key: "marketing",
  crumb: "Digital marketing and design",
  title: "Creative studio and digital marketing",
  lead: "We bring marketing planning, content, and digital design together to create consistent communication that reflects your organization's identity and speaks to its audience.",
  context:
    "When the message changes from channel to channel, brand identity becomes unclear. We begin by defining the audience, value, and voice, then translate them into practical content and design.",
  contextTextFirst: true,
  scope: {
    title: "Digital marketing and design scope",
    tone: "neutral",
    items: [
      {
        icon: icon("messages-square"),
        title: "Strategy and content",
        text: "Define audiences and messages, select channels, and develop a content plan aligned with communication goals.",
      },
      {
        icon: icon("marketing-pen-tool"),
        title: "Digital design",
        text: "Visual direction, digital templates, and campaign materials consistent with your brand and each channel.",
      },
      {
        icon: icon("marketing-megaphone"),
        title: "Campaigns and improvement",
        text: "Develop campaign concepts and tracking metrics, then review results to guide improvements.",
      },
    ],
  },
  outcomes: {
    tone: "neutral",
    footnote: true,
    items: [
      {
        icon: icon("marketing-palette"),
        title: "A consistent identity",
        text: "Shared messaging and visual guidelines that help teams produce cohesive content.",
      },
      {
        icon: icon("target"),
        title: "Content with a purpose",
        text: "Connect each piece of content to its audience and stage in the service discovery journey.",
      },
      {
        icon: icon("marketing-chart"),
        title: "Clearer measurement",
        text: "Define appropriate metrics for each goal and channel before delivery.",
      },
    ],
  },
  process: {
    variant: "ruled",
    steps: [
      { title: "Understand the brand", text: "We review your identity, audience, messages, and current presence." },
      { title: "Set the direction", text: "We define the communication plan and propose a creative direction." },
      { title: "Produce and review", text: "We design materials and write content through clear approval cycles." },
      { title: "Monitor and improve", text: "We interpret performance metrics and recommend content improvements." },
    ],
  },
  readiness:
    "Brand assets, service and audience descriptions, channel access when needed, and a process for approving content and materials.",
  faqs: [
    {
      question: "Are marketing and design separate services?",
      answer:
        "They are offered here as one integrated service. The scope defines the planning, content, design, and delivery your project needs.",
    },
    {
      question: "Does the service include advertising budgets?",
      answer:
        "Campaign management and advertising budgets are agreed explicitly. They are not automatically included in content and design work.",
    },
  ],
  cta: { title: "Let us give your message a consistent direction.", text: CTA_TEXT },
};

/** Figma "أنظمة ERP" (3693:65892). Its production-planning example sits
    after the context card (services/ProductionPlanning). */
export const ERP_SERVICE: ServiceContent = {
  key: "erp",
  crumb: "ERP systems",
  title: "Connected operations. A clearer view of your organization.",
  lead: "We help you assess and configure enterprise resource planning systems, connecting processes and data across departments and reducing fragmented work through an operating model that fits your organization.",
  screen: {
    src: "/v2/screens/mcr-dashboard.png",
    alt: "MCR Systems dashboard for operational monitoring",
    caption: "Sample interface from the project materials. Final features depend on the agreed scope.",
  },
  context:
    "Repeated data entry and scattered files can hide the underlying problem. We review workflows, roles, and approvals before selecting or configuring a system.",
  scope: {
    title: "ERP systems scope",
    tone: "neutral",
    items: [
      {
        icon: icon("erp-git-branch"),
        title: "Process and requirements analysis",
        text: "Document workflows, identify gaps, and define requirements to assess possible solutions.",
      },
      {
        icon: icon("workflow"),
        title: "Configuration and integration",
        text: "Configure modules and permissions, and assess integrations and data migration according to the project scope.",
      },
      {
        icon: icon("users-round"),
        title: "Testing and user enablement",
        text: "Acceptance testing scenarios, operating guides, and training relevant to users' roles.",
      },
    ],
  },
  outcomes: {
    tone: "neutral",
    footnote: false,
    items: [
      {
        icon: icon("database"),
        title: "More consistent data",
        text: "Define shared sources and responsibilities for entering and reviewing data.",
      },
      {
        icon: icon("erp-list-checks"),
        title: "Clearer procedures",
        text: "Approval workflows and permissions that help coordinate work across departments.",
      },
      {
        icon: icon("erp-layout-dashboard"),
        title: "Connected reporting",
        text: "Reports that bring operational context together instead of relying on separate files.",
      },
    ],
  },
  process: {
    variant: "ruled",
    steps: [
      { title: "Assess the current situation", text: "We review procedures, systems, and operational challenges." },
      { title: "Design the solution", text: "We define modules, roles, gaps, and the migration plan." },
      { title: "Configure and test", text: "We prepare the system and test processes and data with users." },
      { title: "Launch and enable", text: "We organize the transition and document operations and support needs." },
    ],
  },
  readiness:
    "Process owners from the relevant departments, descriptions of current procedures, data samples, and a list of related systems and integrations.",
  faqs: [
    {
      question: "Do we need to replace our entire current system?",
      answer:
        "Not necessarily. We start by assessing what can be improved or connected and what requires replacement, considering the impact of transition on operations.",
    },
    {
      question: "Are licenses and ongoing support included?",
      answer: "Licensing, hosting, and support are defined separately according to the selected product and each party's responsibilities.",
    },
  ],
  cta: { title: "Let us make your processes work as one system.", text: CTA_TEXT },
};
