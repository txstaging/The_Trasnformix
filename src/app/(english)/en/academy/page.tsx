import type { Metadata } from "next";
import {
  academies,
  AcademiesHero,
  AcademyRow,
  ClosingCard,
  FeatureCards,
  Outcomes,
  Pillars,
  SectionIntro,
  Split,
  type Academy,
  type Feature,
  type Pillar,
} from "@/english/components/academies/AcademiesKit";
import { AcademyAction } from "@/english/components/academies/AcademyAction";
import { AcademyFaq } from "@/english/components/academies/AcademyFaq";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Academies | Transformix",
  description:
    "We prepare users of digital solutions to perform their roles, and build work teams' ability to apply technology in their day-to-day operations.",
};

const icon = (name: string, size: 26 | 28 = 26) => ({ src: `/icons/academies/${name}.svg`, size });

/* Figma 4726:4809 */
const FEATURES: readonly Feature[] = [
  {
    icon: icon("layers"),
    title: "Implementation experience built into learning",
    text: "We draw on Transformix's experience developing and implementing solutions to design lessons and exercises, linking how technical features work to the procedures and decisions users face in their work.",
  },
  {
    icon: icon("users-sector"),
    title: "Specialized by sector and role",
    text: "Accountants train on their financial tasks, inventory officers on item movements and stocktaking, and service staff on requests and communication. Shared activities bring them together to understand how their transactions affect other departments.",
  },
  {
    icon: icon("grid"),
    title: "Multiple solutions, one connected workflow",
    text: "Programs cover Transformix's own products, Odoo and Zoho, and the sector solutions and smart tools provided to the organization. Training is shaped by the applications and integrations actually in use.",
  },
  {
    icon: icon("shield"),
    title: "Measurable mastery and continuous upskilling",
    text: "Individual tasks and teamwork are assessed, with review points set for each participant. Tracks can be reused to onboard new employees and updated as solutions evolve, within the program's scope.",
  },
  {
    icon: icon("link"),
    title: "A professional connection that lasts beyond the program",
    text: "Graduates join the Transformix community and its alumni network, and qualified graduates get priority consideration for available internships, freelance work and jobs, based on their skills and each opportunity's requirements.",
  },
];

const TRAINING_AREAS = "Training areas:";
const OUTPUT = "Applied outcome:";

/* Figma 4726:4963 — the ids are the navbar's and footer's anchors. */
const ACADEMIES: readonly Academy[] = [
  {
    id: "industry",
    title: "Transformix Industry Academy",
    summary: "Preparing factory teams to use manufacturing, resource and operational applications, and to follow data, reports and smart tools across the factory's workflow.",
    details: [
      { label: "Who it serves:", text: "Production, planning, warehouse, procurement, maintenance, quality and finance teams, along with systems administrators and management." },
      { label: TRAINING_AREAS, text: "Operational transactions, production planning and tracking, using available equipment and sensor data, KPI dashboards, and AI applications tied to the solutions provided." },
      { label: OUTPUT, text: "Carrying out the trainee's assigned tasks within an order, production and delivery cycle, verifying data and reading its effect on reports, in a suitable training environment." },
    ],
    action: { label: "Discuss training for your factory team" },
    photo: {
      src: "/images/academies/industry.jpg",
      alt: "Technicians in safety helmets working on a factory production line",
      height: 520,
    },
  },
  {
    id: "vocational",
    title: "Transformix Vocational Training Academy",
    summary: "Applied tracks for students, graduates, job seekers and professionals, focused on using digital systems and tools in accounting, inventory, sales, services and operations roles.",
    details: [
      { label: TRAINING_AREAS, text: "Business software, data and reporting, running e-commerce and bookings, and using AI and automation in day-to-day tasks, depending on the track." },
      { label: OUTPUT, text: "A portfolio of tasks, a project and an assessment of the skills gained, plus membership of the alumni network and the possibility of nomination for suitable opportunities." },
    ],
    action: { label: "Register your interest in vocational training" },
    photo: {
      src: "/images/academies/vocational.jpg",
      alt: "A trainer explaining a data dashboard to a group of trainees in a meeting room",
      height: 460,
    },
  },
  {
    id: "cooperatives",
    title: "Transformix Cooperatives Academy",
    summary: "It starts with applications built around the needs of Saudi cooperatives. Programs are tailored for the association's current and new staff according to its systems, procedures and type of activity.",
    details: [
      { label: TRAINING_AREAS, text: "Finance and operations, investor records and their rights and obligations under approved documents, shares, communication, ratings and service requests, and using the AI agent to prepare the governance and compliance file. E-commerce or bookings are added depending on the activity." },
      { label: OUTPUT, text: "Completing a transaction or service request, verifying records, approvals and documents, and preparing governance outputs for specialist review." },
    ],
    action: { label: "Discuss a program for your association" },
    photo: {
      src: "/images/academies/cooperatives.jpg",
      alt: "A speaker presenting a business plan to a team around a meeting table",
      height: 500,
    },
  },
];

/* Figma 4726:5007 */
const TECHNOLOGY: readonly Feature[] = [
  {
    icon: icon("grid"),
    title: "Business software and sector solutions",
    text: "Training on Transformix's own resource, manufacturing and cooperative systems, and on Odoo, Zoho or other solutions provided to the organization. It covers the procedures, customizations, permissions and reports tied to each role.",
  },
  {
    icon: icon("bot"),
    title: "AI and intelligent agents",
    text: "Using ready-made or custom-built tools, preparing inputs, reviewing outputs and putting them to work. Users learn to handle data within their permissions and to verify results before relying on them.",
  },
  {
    icon: icon("database"),
    title: "Data, integration and automation",
    text: "Understanding how data moves between departments and applications, checking its quality, reading performance indicators, and running automations and following up on exceptions according to each role.",
  },
  {
    icon: icon("cpu"),
    title: "Industrial technology and IoT",
    text: "Using equipment, sensor and device data within integrated systems, where available within the project's scope. Exercises run on a training environment or suitable simulated data, kept separate from actual equipment control.",
  },
  {
    icon: icon("trending-card"),
    title: "Digital transformation management and workplace development",
    text: "Tracks for managers and supervisors covering selecting applications and defining their requirements, assessing readiness, organizing responsibilities, developing the technical infrastructure and work environment, managing change, and linking technology initiatives to the organization's priorities.",
  },
  {
    icon: icon("shield"),
    title: "Quality and governance tied to practice",
    text: "Data quality, process documentation, approval workflows, evidence review, and Quality 5.0 principles in the context of the business. Governance and compliance topics are subject to appropriate specialist review.",
  },
];

/* Figma 4753:6431 */
const LEARNING: readonly Pillar[] = [
  {
    icon: icon("calendar-check", 28),
    title: "Defining tasks and readiness",
    text: "We identify the target applications and roles and the participants' level, and draw up a list of required tasks and how they will be assessed. Shared lessons and dedicated applications are chosen for each group.",
  },
  {
    icon: icon("book", 28),
    title: "Recorded learning and live sessions",
    text: "Lessons, videos and guides to refer back to, with virtual or in-person sessions to practice specific procedures, review exercises and answer questions, according to the training plan.",
  },
  {
    icon: icon("calendar-check", 28),
    title: "Individual tasks and group projects",
    text: "Each participant completes tasks that prove they can perform their role. Group projects bring together the roles that share a workflow, using training data and scenarios drawn from the nature of the business.",
  },
  {
    icon: icon("book", 28),
    title: "Assessment, follow-up and updates",
    text: "We track completion of lessons and assignments, transaction accuracy and adherence to procedures. Group reports show the skills gained and what needs review. Related materials are updated as solutions change, within the agreed follow-up scope.",
  },
];

/* Figma 4726:5236 */
const OUTCOMES = [
  { label: "Clearer job performance:", text: "Employees can complete the tasks defined in the program and demonstrate them in practice." },
  { label: "Connected teams:", text: "Understanding how a transaction affects other roles, and experiencing it in a group activity." },
  { label: "Considered use of smart tools:", text: "Preparing inputs and reviewing outputs before relying on them." },
  { label: "Structured onboarding for new employees:", text: "A known track, a reference guide and clear completion requirements." },
  { label: "Visibility for management:", text: "A report showing the group's completion level, task results and remaining needs." },
] as const;

/* Figma 4726:5272 */
const ALUMNI: readonly Pillar[] = [
  {
    icon: icon("users", 28),
    title: "A professional community that continues after training",
    text: "Graduates join the Transformix community and stay informed about meetups, experience-sharing workshops and announced opportunities. Project showcase activities let them highlight their skills and meet specialists and people interested in their fields.",
  },
  {
    icon: icon("book", 28),
    title: "A reviewable portfolio of skills and work",
    text: "The graduate's file includes the tasks and projects they completed and their assessment results. With their consent, it is used to consider opportunities that match their level, specialization and readiness for work.",
  },
  {
    icon: icon("trending", 28),
    title: "Priority for nomination based on merit",
    text: "Qualified graduates get priority review of their files for opportunities that match their skills, and nomination for an interview or task test when they fit. The final selection depends on the opportunity's requirements, the assessment and whether the need exists.",
  },
];

/* Figma 4726:5296 */
const OPPORTUNITIES: readonly Feature[] = [
  {
    icon: icon("graduation"),
    title: "Internships",
    text: "Opportunities with defined tasks and supervision, when available, to gain experience in documentation, testing user procedures, preparing data and supporting solution operations.",
  },
  {
    icon: icon("briefcase"),
    title: "Freelance work and project collaboration",
    text: "Paid tasks under agreement, such as preparing product catalogs, organizing data, producing specific reports or explainer materials, and running digital work that suits the collaborator's skills.",
  },
  {
    icon: icon("employment"),
    title: "Employment and professional nomination",
    text: "Considering qualified graduates for Transformix vacancies, and the possibility of nominating them for client or partner requests when available and with their consent.",
  },
];

/* Figma 4726:5391 — the answers are the collapsed items' own text. */
const QUESTIONS = [
  {
    question: "Are the programs for users or developers?",
    answer: "The core programs focus on solution users in accounting, sales, warehousing, production, services, operations and management roles. Any specialized track in implementing or developing systems is described separately.",
  },
  {
    question: "Do I need to be an IT specialist?",
    answer: "Requirements vary by program. Usage tracks are aimed at employees and people with job-related specializations, and each program's page states the prior knowledge needed before registering.",
  },
  {
    question: "Is the training limited to Odoo?",
    answer: "It covers Transformix's own products, Odoo and Zoho, sector applications and AI tools, depending on the track or the solutions provided to the organization.",
  },
  {
    question: "Can a program be tailored for each factory or association?",
    answer: "Yes. We identify the systems, roles and procedures, then combine shared lessons and dedicated materials into suitable tracks, with live sessions and applications within the program's scope.",
  },
  {
    question: "Is the training based on a real project?",
    answer: "Programs use scenarios and tasks drawn from the nature of real projects and solutions. Taking part in an actual client project is a separate opportunity, after selection and once supervision, permissions and the necessary approvals are set.",
  },
  {
    question: "How are trainees assessed?",
    answer: "By completing the learning requirements, carrying out individual tasks, taking part in group activities and passing the set assessment. Each program states what participants must complete.",
  },
  {
    question: "Can new employees be trained later?",
    answer: "Suitable tracks can be used to onboard and follow up with them, according to the access period, seats and service scope agreed with the organization.",
  },
  {
    question: "What does graduate priority for job opportunities mean?",
    answer: "Priority consideration of qualified graduates' files for suitable opportunities, followed by nomination based on skills, assessment and need. Priority does not mean automatic acceptance or guaranteed employment.",
  },
  {
    question: "Are there certificates?",
    answer: "Each program's page states the type of completion certificate or proof of skills available and the conditions for obtaining it. Any external accreditation is named, with the issuing body and its scope, when available and documented.",
  },
] as const;

/** Figma 4726:4790 — الأكاديميات. The first design is kept at /academy/old. */
export default function AcademyPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${academies.page} ${tajawal.variable}`}>
        <AcademiesHero
          id="academies-hero-heading"
          title={"Digital Transformation and AI Academies"}
          paragraphs={[
            "We prepare users of digital solutions to perform their roles, and build work teams' ability to apply technology in their day-to-day operations.",
            "Specialized training programs that combine business software, data and AI with an understanding of procedures and responsibilities. Programs for organizations are designed around the solutions provided to them, while vocational programs let individuals build practical skills and projects that can be assessed and showcased.",
          ]}
          actions={[
            { label: "Explore the academies", href: "#academies", tone: "inverse" },
            { label: "Request a program for your team", tone: "outlineInverse" },
          ]}
        />

        <section className={academies.section} aria-labelledby="academies-features-heading">
          <SectionIntro id="academies-features-heading" title={"Training tied to business solutions and users' tasks"} />
          <FeatureCards items={FEATURES} layout="carousel" />
        </section>

        <section
          id="academies"
          className={`${academies.section} ${academies.academies}`}
          aria-labelledby="academies-list-heading"
        >
          <SectionIntro
            id="academies-list-heading"
            title={"Specialized academies for different sectors and roles"}
            text={"Our academies share a common foundation in digital transformation and AI, and tailor the applications, exercises and outcomes to each audience."}
          />
          <div className={academies.academyRows}>
            {ACADEMIES.map((academy, index) => (
              <AcademyRow key={academy.id} academy={academy} far={index % 2 === 0} />
            ))}
          </div>
        </section>

        <section className={academies.section} aria-labelledby="academies-technology-heading">
          <SectionIntro
            id="academies-technology-heading"
            title={"Technology and AI at the heart of training"}
            text={
              <>
                {"Users' tasks and the scope of the solutions determine what participants learn, while management and quality knowledge supports their ability to run systems and improve procedures."}{" "}
                <strong>{"A technical scope that fits your organization"}</strong>{" "}
                {"A program may combine ready-made solutions with others custom-built or delivered under the organization's own brand. Lessons are chosen according to actual use, and the training level is set before starting."}
              </>
            }
            narrow
          />
          <FeatureCards items={TECHNOLOGY} layout="carousel" />
        </section>

        <section className={academies.section} aria-labelledby="academies-learning-heading">
          <SectionIntro id="academies-learning-heading" title={"A program for your organization, a track for every role"} />
          <Pillars items={LEARNING} layout="learning" />
        </section>

        <section className={academies.section} aria-labelledby="academies-outcomes-heading">
          <Split
            far
            photo={{
              src: "/images/academies/outcomes.jpg",
              alt: "A manager studying a business performance dashboard on a large screen",
              height: 518,
              shade: 0,
              focus: "30% 50%",
            }}
          >
            <h2 id="academies-outcomes-heading" className={academies.title}>
              {" The training outcomes we work on with you "}</h2>
            <Outcomes items={OUTCOMES} />
          </Split>
        </section>

        <section className={academies.section} aria-labelledby="academies-alumni-heading">
          <SectionIntro
            id="academies-alumni-heading"
            title={"The Transformix alumni network and career opportunities"}
            text={"The alumni network connects learning with professional networking and collaboration opportunities, and gives qualified graduates priority consideration for opportunities available at Transformix."}
          />
          <Pillars items={ALUMNI} layout="alumni" />
          <FeatureCards items={OPPORTUNITIES} layout="stack" minHeight={281} />
          <Reveal className={academies.sectionAction}>
            <AcademyAction action={{ label: "Register your interest in our training programs" }} />
          </Reveal>
        </section>

        <section className={academies.section} aria-labelledby="academies-faq-heading">
          <SectionIntro id="academies-faq-heading" title={"Frequently asked questions"} start />
          <Reveal>
            <AcademyFaq items={QUESTIONS} />
          </Reveal>
        </section>

        <section className={academies.section} aria-labelledby="academies-partners-heading">
          <Split
            photo={{
              src: "/images/academies/partnerships.jpg",
              alt: "A hand reviewing printed reports and charts on a work desk",
              height: 373,
            }}
            className={academies.partnerCopy}
          >
            <h2 id="academies-partners-heading" className={academies.title}>
              {" Partnerships that connect education with practice "}</h2>
            <p className={academies.leadDark}>
              {" We welcome collaboration with universities, professional bodies and companies to develop workshops, training tracks and educational projects tied to business applications. Each collaboration has its audience, outcomes, participants' roles and assessment method defined. "}</p>
            <div className={academies.splitAction}>
              <AcademyAction action={{ label: "Discuss an educational partnership", opens: "partnerships" }} />
            </div>
          </Split>
        </section>

        <ClosingCard
          id="academies-closing-heading"
          title={"Discuss a program that fits your team or your career path"}
          text={"For organizations: tell us about your activity, the solutions you use and the roles that need training. For individuals: tell us the field you want to work in and your level of experience, so we can choose the right track when it becomes available."}
          actions={[
            { label: "Request a program for your team" },
            { label: "Register your interest in vocational training", tone: "outline" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
