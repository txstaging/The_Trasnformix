import { INSIGHTS_HREF, INSIGHTS_LABEL, insightHref } from "@/english/lib/insightsNav";
import { MANUFACTURING_WEBSITE } from "@/english/lib/serviceNavigation";

/* الرؤى والتحليلات — Transformix's articles (Figma 4524:4209, 4524:4220 and
   4524:4231 the cards; 4524:4242, 4524:4378 and 4524:4515 the pages). Each
   entry is a card on /insights and a page beneath it; add one here and both
   appear. */

export { INSIGHTS_HREF, INSIGHTS_LABEL, insightHref };

export type InsightAction = {
  label: string;
  href: string;
  /** Leaves the site, so it opens in a new tab. */
  external?: boolean;
  /** The white, blue-outlined pill (Figma 4365:10855). */
  secondary?: boolean;
};

export type InsightSection = {
  /** The anchor the contents list points at. */
  id: string;
  /** The contents list's name for it; the heading when left out. */
  toc?: string;
  /** The blue kicker over the heading and before its contents entry: "٠١". */
  number?: string;
  /** Printed after the number: "٠١ / رؤية صناعية". */
  kicker?: string;
  title: string;
  paragraphs: readonly string[];
  /** Numbered cards under the paragraphs (Figma 4524:4418). */
  levels?: readonly { title: string; text: string }[];
  /** A pale box drawing a chain of steps, in reading order (Figma 4524:4592). */
  example?: { title: string; steps: readonly string[]; caption: string };
};

export type Insight = {
  slug: string;
  /** The blue label on the card and the related cards. */
  category: string;
  /** The blue line of topics over the page's title. */
  topics: readonly string[];
  title: string;
  /** The card's summary. */
  summary: string;
  /** The page's lead under its title. */
  lead: string;
  author?: string;
  cover: string;
  /** Paragraphs before the first heading. */
  intro?: readonly string[];
  sections: readonly InsightSection[];
  /** The closing pull quote (Figma 4524:4440). */
  takeaway?: string;
  /** The pale call to action that ends the article (Figma 4524:4305). */
  next: { title: string; actions: readonly InsightAction[] };
};

const COVERS = "/images/insights";
const DISCUSS = "/en/contact#request";

export const INSIGHTS: readonly Insight[] = [
  {
    slug: "outsourcing-shared-services",
    category: "Global Business Services",
    topics: ["Outsourcing", "Shared Services", "Business Agility"],
    title: "Outsourcing and shared services: redesigning operating costs and strengthening business agility",
    summary:
      "Cutting costs is no longer the whole question; what matters is the ability to redeploy resources and scale teams up or down. How do you design a more flexible operating model?",
    lead: "How organizations are redistributing talent and costs, and using technology and AI to build a more flexible, more competitive operating model.",
    author: "By Dr. Islam Gad",
    cover: `${COVERS}/outsourcing-shared-services.jpg`,
    sections: [
      {
        id: "operating-model",
        toc: "Operating model flexibility",
        title: "Operating model flexibility: why fixed cost structures fail in a crisis",
        paragraphs: [
          "As organizations revisit their budgets and investment priorities, the flexibility of an operating model now matters as much as its efficiency. The COVID-19 pandemic, the war in Ukraine, disruptions to trade and energy, and regional tensions have followed one another, reminding companies that stable supply chains and costs are never guaranteed.",
          "The question is no longer cutting expenses alone, but the ability to redeploy resources, scale teams up or down, and retain talent without committing to fixed structures that are hard to change when markets shift. The question facing management today: does the current operating model suit a world where costs, skills and demand change at an accelerating pace?",
        ],
      },
      {
        id: "distributed-teams",
        toc: "Geographic distribution of teams",
        title: "Distributing teams geographically: a competitive edge that goes beyond lower salaries",
        paragraphs: [
          "Competition sometimes starts with where a team sits. For decades, American and European companies have relied on operations and technology service centers in Eastern Europe, India and Egypt. A company headquartered in New York does not have to keep all its developers and support teams in Manhattan; leadership and client-facing roles can stay local while the rest of the services are spread across other locations.",
          "The same logic applies to Riyadh and Abu Dhabi. Choosing an alternative operating city affects salaries, housing and transport allowances, office rents, hiring costs and the availability of talent. Locations such as Al Jumum or the cities of Asir in Saudi Arabia, and Al Dhaid, Khor Fakkan or Kalba in the UAE, can be studied, provided the infrastructure, skills and regulatory requirements are a good fit, and full compliance with local data protection laws (such as Saudi Arabia's Personal Data Protection Law, PDPL) is ensured.",
        ],
      },
      {
        id: "continuity-compliance",
        toc: "Service continuity and compliance",
        title: "Service continuity and compliance in managing distributed teams",
        paragraphs: [
          "Two organizations may compete for the same client, yet one carries the cost of fixed central teams while the other runs distributed teams, shared services and adjustable contracts. The difference shows in its ability to price, scale and absorb swings in demand, not in salaries alone.",
          "The advantage lies not only in moving jobs to a cheaper location, but in designing a better way to access talent and keep services running, while managing cultural differences effectively and keeping communication between distributed teams smooth so operations are not disrupted.",
        ],
      },
      {
        id: "outsourcing-gbs",
        toc: "Outsourcing, shared services and GBS",
        title: "Outsourcing, shared services and GBS: what is the difference?",
        paragraphs: [
          "Outsourcing means entrusting a function or service to a specialist provider, within a defined scope, set of responsibilities and performance levels. Shared services pool capabilities to serve several units or companies instead of duplicating functions within each. Global Business Services (GBS) is a broader model that brings together the organization's own teams, shared services and external partners across different locations, under unified management of performance, quality and governance.",
          "In Deloitte's 2025 global business services survey, about half of the respondents reported savings of more than 20% from GBS models. The figure applies to those respondents and is no guarantee of savings for any given company, but it reflects the potential that well-designed, well-managed services offer.",
        ],
      },
      {
        id: "operating-models",
        toc: "Models for companies and enterprises",
        title: "Tailoring operating models: scalable solutions for companies and large enterprises",
        paragraphs: [
          "Small companies: specialist skills without a full department. A small company may need ERP and CRM support, upkeep for its online store, and cybersecurity and development expertise, but it does not need all of these roles full time. It can engage a part-time technology manager, development or systems administration hours, and technical support on a monthly plan or on demand. A good institutional provider adds value beyond supplying people: documented knowledge, cover for absences, and clear escalation paths and service levels, instead of relying on one person to run a core function, while sparing the company the hidden costs of managing vendors and continually onboarding individuals.",
          "Large companies: cost flexibility and operational continuity. Larger organizations can keep leadership and sensitive functions close to headquarters while distributing software development, enterprise systems operations, technical support, administrative and accounting services, and the running of e-commerce and booking platforms across multi-site teams. Service agreements can turn part of fixed expenses into a cost tied to usage, but this requires clear contracts for scaling up, scaling down, transition and exit, backed by strict service level agreements (SLAs) and measurable, trackable key performance indicators (KPIs). Flexibility is not a marketing claim; it is a property that has to be built into the operating model and the contract itself.",
        ],
      },
      {
        id: "ai-productivity",
        toc: "Technology and AI",
        title: "Raising productivity with AI: the technical engine behind successful managed services",
        paragraphs: [
          "Technology and AI are changing the productivity equation. Cloud systems, ERP and CRM platforms, and collaboration and project management tools connect distributed teams in a single environment, with permissions, data and performance indicators that can be tracked. AI tools support customer service, knowledge management, data analysis, reporting and the automation of repetitive procedures. The choice of location then depends on the value of what a team delivers, not on the number of office seats. The model's success still depends on data protection, governance, training people and measuring actual results.",
        ],
      },
      {
        id: "transformix-locations",
        toc: "Jeddah, Sharjah and Alexandria",
        title: "Transformix's approach to building talent: Jeddah, Sharjah and Alexandria",
        paragraphs: [
          "Why did Transformix choose Jeddah, Sharjah and Alexandria? Its presence in the three cities reflects an operating approach that avoids confining delivery teams to the highest-cost capitals, while keeping a commercial presence close to clients in capitals and major markets as needed.",
          "This distribution lets the company build capabilities in more than one market and balance cost against access to talent and business continuity. The three cities offer a university environment rich in the disciplines it needs: King Abdulaziz University and the University of Jeddah in Jeddah, the American University of Sharjah in Sharjah, and Alexandria University and the Arab Academy in Alexandria. This diversity is a base for attracting and training graduates and building teams in software, systems, data, cybersecurity and business services. Proximity to universities should not be taken to mean existing hiring partnerships with them; rather, it opens practical opportunities to build recruitment and professional development pathways.",
          "Transformix provides operations and support for e-commerce and bookings and for multi-platform ERP and CRM systems, as well as software development, accounting and administrative services, specialist teams and managed services. These services can be designed as shared models for small companies, or as dedicated and hybrid teams for large enterprises. Competitiveness today is also shaped by how a team is built, where it operates, and how knowledge, technology and cost are managed across it.",
          "Talk with the Transformix team about developing your operating model and making use of shared services, multi-site teams, technology and AI.",
        ],
      },
    ],
    next: {
      title: "Develop an operating model that fits your business",
      actions: [{ label: "Discuss developing your operating model", href: DISCUSS }],
    },
  },
  {
    slug: "organizational-knowledge",
    category: "Digital Transformation",
    topics: ["Digital Transformation", "Organizational Learning", "Knowledge Management"],
    title: "Employees change… how does your organization keep its knowledge and grow it?",
    summary:
      "As employees and systems change, technology supports the continuity of knowledge within the organization. Learn the role of internal learning in understanding the work, mastering it, and preparing employees to teach their colleagues.",
    lead: "The role of technology and AI in passing on expertise and reshaping learning in organizations",
    cover: `${COVERS}/organizational-knowledge.jpg`,
    intro: [
      "An organization's expertise grows with every project, experience and improvement. Part of it may fade when an employee leaves, moves to a new role, or when the tools the team uses change. An organization needs a way to preserve this knowledge and let others learn it and build on it.",
      "With remote work, distributed teams and system updates, it matters more than ever to have a reference employees can turn to wherever they work. They learn and apply their core tasks, while their colleagues are freed to focus on guidance and reviewing results instead of repeating the same explanations.",
    ],
    sections: [
      {
        id: "keeping-knowledge",
        title: "Preserving and teaching knowledge",
        paragraphs: [
          "Knowledge management systems help organize operating procedures, policies, specifications and user guides, keep their approved versions, and make them available to authorized people.",
          "Learning technologies and AI make it possible to turn these materials and this expertise into reusable learning programs. Content can be organized by role, with exercises and assessments, progress tracking, and programs that are updated whenever the work changes.",
        ],
      },
      {
        id: "three-levels",
        toc: "Three levels of capability",
        title: "Three levels of building capability within the organization",
        paragraphs: [],
        levels: [
          {
            title: "1. Understanding the principles",
            text: "Employees learn the logic of the work, the purpose of each procedure and the responsibilities that come with it, gaining knowledge they can build on even when the tools or the work environment change.",
          },
          {
            title: "2. Mastering execution",
            text: "They practice their tasks using the organization's actual systems, settings, permissions and procedures, and are assessed on how they apply them and on the required outcome.",
          },
          {
            title: "3. Qualifying as an internal trainer",
            text: "Suitable employees are prepared to document their expertise, build programs tied to clear outcomes, teach their colleagues and assess how they apply what they learn. This capability keeps knowledge alive and growing within the organization.",
          },
        ],
      },
      {
        id: "ai-expertise",
        toc: "AI and spreading expertise",
        title: "AI helps expertise spread",
        paragraphs: [
          "Smart tools can help specialists organize their expertise, transcribe their explanations, and draft curricula, learning materials, activities and assessments. Learning platforms bring these materials together in paths suited to each role and trainee level.",
          "Review and approval by a specialist remain part of the process, with due care for the privacy of the organization's information. The team also needs to learn how to define outcomes, design the program and use the tools to achieve them.",
        ],
      },
      {
        id: "questions-practice",
        toc: "Questions and practice",
        title: "Knowledge evolves through questions and practice",
        paragraphs: [
          "Recurring questions and mistakes made in practice reveal needs worth attention. An employee may need a clearer explanation or an extra exercise, and the procedure itself may need review.",
          "When a system or a way of working changes, the related materials are updated and the update goes to the people it concerns. This is how the learning reference grows with the organization and stays connected to what happens inside it.",
        ],
      },
      {
        id: "internal-learning",
        toc: "Internal learning and digital transformation",
        title: "Internal learning as part of digital transformation",
        paragraphs: [
          "Transformix supports this approach by training users on digital solutions and enabling organizations' teams to build and run their own internal programs.",
          "Employees learn the core functions of the technology, then how to use it within the solutions and configurations delivered to their organization. Those responsible for training are prepared to build curricula around practice, use AI to develop materials, and track and update learning.",
          "Clients can make use of the Transformix academies. When they acquire the learning application, the agreed training materials for the delivered solutions are transferred to it, joining the organization's own programs in its learning environment and serving both current employees and those who join later.",
        ],
      },
    ],
    takeaway:
      "A learning organization builds its employees' ability to understand and execute, and grows within its team the ability to teach others. Expertise then becomes something that can be shared and developed as people and work change.",
    next: {
      title: "Build knowledge that lasts and grows",
      actions: [{ label: "Discuss building an internal learning environment for your organization", href: DISCUSS }],
    },
  },
  {
    slug: "factory-competitiveness",
    category: "Industry & Technology",
    topics: ["Manufacturing", "Management & Quality Systems", "Industrial Digital Transformation"],
    title: "Is product quality enough to keep a factory competitive?",
    summary:
      "Product quality is an important asset, but competitiveness also covers the efficiency of management, operations and knowledge. Learn the role of ERP, automation and data in improving factory performance.",
    lead: "The role of management and quality systems, ERP, industrial automation and the Internet of Things in improving industrial performance",
    cover: `${COVERS}/factory-competitiveness.jpg`,
    intro: [
      "A factory may have excellent technical expertise and a high-quality product, yet still lose part of its competitiveness to another factory that produces at a similar level but runs its operations more efficiently.",
      "This gap is not always about newer machines or more advanced manufacturing technology. The difference may lie in the management style, the accuracy of planning, how quickly information can be reached, and whether departments work within a connected system rather than making separate decisions.",
      "This becomes clear when a factory manages to deliver the same product at a more competitive cost, with more reliable delivery dates, or with a greater ability to respond to changing demand, without necessarily having more experience in the industry itself.",
    ],
    sections: [
      {
        id: "industrial-expertise",
        number: "01",
        kicker: "Industrial insight",
        toc: "Industrial expertise",
        title: "Industrial expertise is an important asset, but it is not the only factor",
        paragraphs: [
          "The technical knowledge built up inside factories is hard to replace. The expertise of engineers and technicians, knowledge of material properties, machine calibration and control over the stages of production are all essential to product quality.",
          "But this expertise works within a wider system that includes planning, purchasing, inventory, operations, maintenance, quality, sales and distribution.",
          "Imagine two factories making a product to the same specifications. The first has a highly experienced technical team, but relies on separate records across warehouses, production and purchasing, and needs manual follow-up to know the status of work orders and the materials required. The second has organized its procedures and connected its data, so management can see production needs, material availability, order status and operating rates more consistently.",
          "This organization may give the second factory a better ability to plan, deliver and control costs. Over time, these operational advantages can turn into a commercial edge, even if the first factory's manufacturing expertise is every bit as strong.",
          "This is where management efficiency and technology become part of a factory's competitiveness, alongside quality and technical expertise.",
        ],
      },
      {
        id: "management-quality",
        number: "02",
        kicker: "Industrial insight",
        toc: "Management and quality system",
        title: "Why does industrial development start with the management and quality system?",
        paragraphs: [
          "Before choosing software, a facility needs clarity on how it runs its operations: How are purchase requests approved? Who is responsible for production planning? How are issued materials recorded? How are inspection results documented? When are nonconformities dealt with? And what information does management need to review performance?",
          "These are not administrative details separate from manufacturing; they are the rules that govern how departments work together and define responsibilities, controls and follow-up mechanisms.",
          "Quality management systems, documented procedures, defined permissions, risk management and performance measurement are the foundation of any serious industrial digital transformation project. This stage matters even more when implementing ERP systems, because software translates work procedures into permissions, approval workflows, transactions and data.",
          "If operations are unclear, implementation may simply carry the existing complexity into the digital system. A good system starts with understanding the facility and its operations, then choosing the right technologies to put what has been organized into practice.",
        ],
      },
      {
        id: "erp",
        number: "03",
        kicker: "Industrial insight",
        toc: "Connecting operations through ERP",
        title: "The role of ERP in connecting factory operations",
        paragraphs: [
          "Enterprise resource planning (ERP) systems help manage the information and transactions tied to a factory's activities within a connected digital environment.",
          "When a production plan is approved, the system can, depending on the modules implemented and how they are configured, determine material requirements, track available inventory, link purchasing needs to work orders, and record production stages and the financial transactions tied to them.",
          "Management uses this information to follow operating costs, order status and resource consumption, and to identify points that need follow-up or improvement. But choosing an ERP is not the end of a digital transformation project; results depend on the quality of procedures and data, how well the system suits the type of manufacturing, and how consistently staff use it.",
          "That is why not every factory needs the same software configuration. A make-to-order facility has different priorities from a plant running continuous or batch production, and the modules, procedures and integrations it needs differ with them.",
        ],
      },
      {
        id: "automation",
        number: "04",
        kicker: "Industrial insight",
        toc: "Industrial automation",
        title: "Industrial automation: the value lies in operation and monitoring",
        paragraphs: [
          "Automation is a broad field covering the use of control systems, equipment and applications to carry out or monitor operations, or to reduce manual intervention in them.",
          "A facility may already have machines running with varying degrees of automation, while the information about their operation, faults and downtime stays separate from the management system.",
          "This is an opportunity to get more out of existing equipment, without assuming that modernization always means replacing production lines. The feasibility of collecting some operating data and connecting it to software systems can be studied, giving management a more accurate view of the condition and use of its equipment.",
          "The priority remains defining the information needed and the decision it will support, before choosing connectivity hardware or starting to collect data.",
        ],
      },
      {
        id: "industrial-iot",
        number: "05",
        kicker: "Industrial insight",
        toc: "Industrial Internet of Things",
        title: "Can older machines be connected to software using Industrial IoT?",
        paragraphs: [
          "Yes, in a number of cases, and it can make economic and operational sense, but it is not a general solution that works for every machine.",
          "Industrial Internet of Things (Industrial IoT, or IIoT) technologies make it possible to collect data from equipment in several ways, such as sensing devices, sensors, communication modules and industrial gateways (IoT Gateways).",
          "On some machines, existing communication ports or control systems can be used. In other cases, adding sensors or an IoT Box can be considered to collect specific measurements without replacing the whole machine.",
          "For example, it may be possible to monitor whether a machine is running or stopped, count operating cycles, or measure vibration, temperature or energy consumption, depending on the nature of the equipment and the sensors suited to it. The data is then passed, through suitable interfaces and integrations, to monitoring and analytics applications or management systems.",
          "The value is not in installing an IoT device as such, but in using the resulting information to understand equipment performance, analyze the causes of downtime, improve planning and monitoring, and explore condition-based maintenance.",
          "Any connectivity project requires checking the machine's technical compatibility, the accuracy of the measurements, operational safety and the security of industrial networks. Collecting data does not automatically mean being able to control equipment remotely or predict failures.",
        ],
        example: {
          title: "Illustrative example: connecting equipment to management data",
          steps: ["Industrial machine", "Sensors or data ports", "IoT Gateway / Box", "Monitoring and analytics software"],
          caption: "A conceptual path that depends on each machine's connectivity, safety and compatibility. It does not describe an integration delivered at any particular factory.",
        },
      },
      {
        id: "industrial-data",
        number: "06",
        kicker: "Industrial insight",
        toc: "The value of industrial data",
        title: "What value can industrial data deliver?",
        paragraphs: [
          "Once operating data is reliable and organized, it can be used for practical decisions. Knowing when equipment is down, for example, helps tell stoppages caused by faults apart from those linked to material shortages or changes to work orders.",
          "Linking inventory data to production plans can help improve the timing of purchases and reduce the risk of running short of materials. Documenting inspection results and nonconformities also provides information that can be used to analyze the causes of quality problems and decide on improvement actions.",
          "Not all of these uses require AI. Much of the value starts with clear indicators, accurate data and dashboards suited to management's needs.",
          "Advanced analytics and AI add further capabilities when there is enough data and the right infrastructure, such as detecting patterns, studying changes and forecasting some operational trends.",
        ],
      },
      {
        id: "people-knowledge",
        number: "07",
        kicker: "Industrial insight",
        toc: "People and knowledge",
        title: "People and knowledge are part of competitiveness",
        paragraphs: [
          "Investment in systems and equipment does not deliver its full value in isolation from the people who run operations and use the technology.",
          "Management and users need to know how to operate the systems, while workers on production lines and in warehousing, quality and maintenance need training tied to their tasks and actual work procedures.",
          "There are two different levels of learning: an academy offered by the solution provider to prepare the facility's teams to use the systems and manage the transformation, and an internal academy through which the factory can organize the training of its staff and workers in operating, safety and quality procedures and the knowledge specific to its business.",
          "Digital learning environments make it possible to organize and update this knowledge, deliver training materials suited to each role, and track program completion and assessment results. Smart tools can help explain content, build assessments and identify knowledge gaps that call for additional training.",
          "Knowledge management thus becomes part of operational continuity and of developing the team's skills, especially when expanding or introducing new equipment and systems.",
        ],
      },
      {
        id: "priorities",
        number: "08",
        kicker: "Industrial insight",
        toc: "Development priorities",
        title: "How does management set development priorities?",
        paragraphs: [
          "No single list of technologies suits every factory. A good decision depends on understanding the facility's reality, the nature of its operations and its commercial priorities.",
          "In one factory the priority may be organizing quality procedures and production management; in another, improving inventory and warehouse management; while a third may gain most from collecting machine data and analyzing downtime.",
          "What matters is that investment decisions rest on a clear assessment of management systems, the readiness of operations and data, the expected cost, and the operational value that can be measured.",
          "Industrial competitiveness covers both the quality of what a factory produces and the efficiency with which it manages its resources, operations, knowledge and technology. The opportunity for growth may already be inside the factory: in organizing its operations, making deeper use of its data, and getting more from the equipment and systems it already owns.",
        ],
      },
      {
        id: "about-transformix",
        toc: "About Transformix and the TX-IME ecosystem",
        title: "About Transformix",
        paragraphs: [
          "Transformix develops and integrates digital and intelligent solutions for businesses, including operations and quality management systems, analytics, AI and training, with a focus on tailoring solutions to each organization's needs.",
          "The TX-IME | Intelligent Manufacturing Ecosystem offers a framework for building the right capabilities for industrial facilities, starting with organizing management and quality systems and extending to factory operations, data and workforce development.",
        ],
      },
    ],
    next: {
      title: "Start from your factory's priorities",
      actions: [
        { label: "Discuss digital transformation priorities for your factory", href: DISCUSS },
        { label: "Explore the TX-IME intelligent manufacturing ecosystem", href: MANUFACTURING_WEBSITE, external: true, secondary: true },
      ],
    },
  },
];

export const getInsight = (slug: string) => INSIGHTS.find((insight) => insight.slug === slug);

/** The other articles, in the list's order, for the foot of a page. */
export const relatedInsights = (slug: string) => INSIGHTS.filter((insight) => insight.slug !== slug);
