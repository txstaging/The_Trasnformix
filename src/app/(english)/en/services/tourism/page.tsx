import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { PrefillLink, ServiceRequestForm } from "@/english/components/services/ServiceRequestForm";
import {
  Closing,
  FaqList,
  kit,
  ProcessSteps,
  SectionIntro,
  ServiceHero,
} from "@/english/components/services/ServiceKit";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/services/tourism/page.module.css";

export const metadata: Metadata = {
  title: "Tourism, Hospitality & Heritage | Transformix",
  description:
    "Technology and operations paths for tourism and Umrah companies, activity operators, museums and heritage sites: custom platforms, distribution and booking management, digital documentation and experiences, and analytics that support decisions.",
};

/** The request form further down, which every call on the page drops to. */
const FORM = "tourism-request";
const toForm = `#${FORM}`;

/* Figma 4473:9246 — who the page is for, in reading order; each call picks
   the activity in the form. */
const AUDIENCES = [
  {
    activity: "operators",
    title: "Activity & experience operators and tourism companies",
    text: "List your experiences on the right channels and manage bookings and customers from one clear system: activity distribution and channel management, direct booking, pricing and availability, customer management and sales analysis.",
  },
  {
    activity: "umrah",
    title: "Umrah companies & visitor services",
    text: "Organize customer requests, groups, services and suppliers, and give your team a clearer view of every booking: from the pilgrim's or visitor's journey to payment, follow-up and reporting, in line with regulatory requirements and the project scope.",
  },
  {
    activity: "heritage",
    title: "Museums & heritage sites",
    text: "Turn your collections and historic site into digital assets you can document, present and develop: collection cataloguing and digital documentation, digital imaging of the site, virtual reality, and content access for visitors.",
  },
  {
    activity: "guides",
    title: "Guides & membership bodies",
    text: "Deliver services, procedures and payments for members and guides through one platform: membership portals, services, requests, communication, governance, payments and links with the relevant authorities.",
  },
] as const;

type Solution = {
  slug: string;
  /** Picks the solution area in the form. */
  interest: string;
  /** The icon and kicker over the title; an area can go without them. */
  icon?: { src: string; width: number; height: number };
  label?: string;
  title: string;
  paragraphs: readonly string[];
  /** A pale note under the copy. */
  definition?: string;
  cta: string;
  /** The far panel: a photo, a scope card, or (until its photo is chosen)
      an empty panel — the artboard leaves three of them unfilled. */
  panel:
    | { kind: "photo"; src: string; shade: number }
    | { kind: "scope"; title: string; items: readonly { label: string; text: string }[] }
    | { kind: "blank" };
};

/* Figma 4473:9336 — the five solution areas, the copy on the reading side. */
const SOLUTIONS: readonly Solution[] = [
  {
    slug: "distribution",
    interest: "distribution",
    title: "Bring your activities and experiences closer to the customers ready to book them",
    paragraphs: [
      "OTA Mark is a specialized service for managing the commercial distribution of tourism activities and experiences. It covers setting up and running listings, improving content and visibility, and tracking bookings and performance across the right channels.",
      "The service includes managing pricing and availability, improving photos, descriptions and search keywords, digital campaigns and performance reports, as agreed with each operator.",
    ],
    definition: "A managed distribution service that uses third-party platforms and technologies as the project requires. It is not a Transformix booking platform.",
    cta: "Request a review of your sales channels",
    panel: { kind: "photo", src: "/images/services/tourism/distribution.jpg", shade: 0.29 },
  },
  {
    slug: "platforms",
    interest: "platforms",
    icon: { src: "/icons/services/tech/software.svg", width: 65, height: 49.0007 },
    label: "Tourism platform & app development",
    title: "A booking platform or app designed around how you work",
    paragraphs: [
      "We build tourism platforms and apps for operators, customers and guides around the real user journey, taking into account the roles of staff, suppliers, members and management. We connect direct booking front ends and operator and member portals to payments and external systems.",
      "Custom solutions shaped by your business, not an off-the-shelf SaaS tourism platform.",
    ],
    cta: "Discuss your platform",
    panel: { kind: "photo", src: "/images/services/tourism/booking-platform.jpg", shade: 0.29 },
  },
  {
    slug: "operations",
    interest: "operations",
    icon: { src: "/icons/services/tourism/booking.svg", width: 51, height: 53 },
    label: "Operations, customer & integration management",
    title: "Organize the service journey from request to completion",
    paragraphs: [
      "If your organization runs Umrah programs, visitor services or multi-party bookings, digital operations can be designed around the customer, the employee and the supplier: submitting requests, tracking status, managing services, invoicing, reporting and the integrations you need.",
      "We connect workflows and customer relationship management to your existing systems where it makes sense, in line with regulatory requirements and the project scope. We don't force the experience-distribution sales model on these activities; each has its own journey, channels and requirements.",
    ],
    cta: "Define the operations system you need",
    panel: { kind: "photo", src: "/images/services/tourism/operations.jpg", shade: 0.29 },
  },
  {
    slug: "heritage",
    interest: "heritage",
    icon: { src: "/icons/services/tech/creative.svg", width: 45, height: 54 },
    label: "Museum technology & immersive experiences",
    title: "Document your collections and give the history of your site a digital life",
    paragraphs: [
      "Museums and heritage sites need more than an informational website. We provide digital documentation of collections, digital imaging of buildings and content, and virtual reality experiences and digital presentation of cultural content.",
      "At Bayt Al-Matbouli in Historic Jeddah, the work delivered included digital documentation of museum pieces, imaging of the site, and virtual reality work.",
    ],
    cta: "Discuss documenting your site and collections",
    panel: { kind: "blank" },
  },
  {
    slug: "analytics",
    interest: "analytics",
    icon: { src: "/icons/services/tourism/data.svg", width: 56, height: 52 },
    label: "Tourism analytics & AI",
    title: "Discover what your customer data says about growth opportunities",
    paragraphs: [
      "Booking, subscription and activity data can show how services relate to one another, patterns of demand, and the right opportunities to develop packages and recommendations and make better decisions.",
      "The MerMates Market Basket Analysis study analyzed more than 1,827 registration records across 16 cohorts from 2015 to March 2025, using association rules and market basket analysis. These are case-study figures, not performance indicators for every client.",
    ],
    cta: "Discuss your data analysis",
    panel: {
      kind: "scope",
      title: "From data to insight",
      items: [
        { label: "Inputs", text: "Registration, subscription, booking and actual activity data." },
        { label: "Analysis", text: "Product relationships and patterns of association and repetition, using association rules and market basket analysis." },
        { label: "Outputs", text: "Insights for commercial recommendations, offer and package development, dashboards and smart applications, depending on the data available." },
      ],
    },
  },
];

/* Figma 4473:9489 — the work done, in reading order. */
const PROJECTS = [
  {
    title: "Bayt Al-Matbouli – Historic Jeddah",
    text: "Digital documentation of museum pieces, digital imaging of the site, and virtual reality work: experience turning collections and places into digital assets that can be documented and presented.",
    cta: "Discuss a similar project",
    interest: "heritage",
  },
  {
    title: "The Guide platform for tour guides",
    text: "A delivered project for a cooperative platform specializing in the tour guide sector. It covered platform development and integrations with banks, systems and the relevant authorities, within the project scope.",
    cta: "Discuss a custom platform",
    interest: "platforms",
  },
  {
    title: "MerMates – Market basket analysis",
    text: "Analysis of more than 1,827 registration records across 16 cohorts, from 2015 to March 2025, to uncover relationships between activities and support commercial decisions and recommendations using association rules.",
    cta: "Discuss your data analysis",
    interest: "analytics",
  },
  {
    title: "OTA Mark – Operations & marketing",
    text: "Hands-on operational work in distribution, content, channel management and tourism marketing, including setting up listings and tracking pricing, availability, bookings, visibility and performance reports.",
    cta: "Request a distribution review",
    interest: "distribution",
  },
] as const;

/* Figma 4473:9563 */
const STEPS = [
  { title: "Discuss the activity and goal", text: "The organization sets out its type of work, the goal and the systems or channels it uses today." },
  { title: "Define the solution and deliverables", text: "We define the development or operations required, the integrations, priorities and evaluation measures." },
  { title: "Delivery & follow-up", text: "Delivery, operation and improvement under a clear agreement suited to the service and the project." },
] as const;

/* Figma 4473:9593 */
const QUESTIONS = [
  {
    question: "Is OTA Mark a Transformix booking platform?",
    answer: "No. OTA Mark is a specialized service for managing the commercial distribution of tourism activities and experiences, covering setting up and running listings, improving content and visibility, and tracking bookings and performance. It uses third-party platforms and technologies as the project requires.",
  },
  {
    question: "Do you work with Umrah companies that need an operations system rather than tourism marketing?",
    answer: "Custom digital operations can be designed to manage customers, groups, services, suppliers, payments, follow-up, reporting and integrations, in line with regulatory requirements and the project scope. We don't impose the experience-distribution sales model on this kind of activity.",
  },
  {
    question: "Do you have an off-the-shelf SaaS tourism product?",
    answer: "The solutions shown here are custom platforms and apps built around your business, user journey, roles and required integrations, not a ready-made subscription tourism platform.",
  },
  {
    question: "Which projects reflect your museum experience?",
    answer: "Bayt Al-Matbouli – Historic Jeddah, where the work delivered included digital documentation of museum pieces, digital imaging of the site, and virtual reality work.",
  },
] as const;

const pad = (index: number) => String(index + 1).padStart(2, "0");

function Arrow() {
  return (
    <span className={kit.arrow} aria-hidden="true">
      ←
    </span>
  );
}

function SolutionPanel({ panel }: { panel: Solution["panel"] }) {
  if (panel.kind === "photo") {
    return (
      <div className={`${styles.panel} ${styles.panelPhoto}`} aria-hidden="true">
        <Image className={styles.panelImage} src={panel.src} alt="" fill sizes="(max-width: 900px) 100vw, 603px" />
        <span className={styles.panelShade} style={{ opacity: panel.shade }} />
      </div>
    );
  }
  if (panel.kind === "scope") {
    return (
      <div className={`${styles.panel} ${styles.panelScope}`}>
        <h4 className={kit.cardTitle}>{panel.title}</h4>
        <dl className={styles.scopeList}>
          {panel.items.map((item) => (
            <div key={item.label} className={styles.scopeItem}>
              <dt className={styles.scopeLabel}>{item.label}</dt>
              <dd className={kit.cardText}>{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  return <div className={`${styles.panel} ${styles.panelBlank}`} aria-hidden="true" />;
}

/** Figma 4473:9198 — السياحة والضيافة والتراث. */
export default function TourismPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="tourism-heading"
          image="/images/services/tourism/hero.jpg"
          title={"Grow your tourism business and improve your customers' and visitors' experience"}
          text={"Whether you run a tourism company, Umrah services, activities and experiences, or a museum or heritage site, we offer technology and operations paths that fit your business: custom platforms, distribution and booking management, digital documentation and experiences, and analytics that support your decisions."}
          actions={[
            { label: "Find the right solution for your business", href: "#tourism-paths" },
            { label: "Contact us", href: toForm },
          ]}
          wide
        />

        <section id="tourism-paths" className={`${kit.section} ${styles.paths}`} aria-labelledby="tourism-paths-heading">
          <SectionIntro
            id="tourism-paths-heading"
            title={"What do you want to develop in your business?"}
            text={"Your organization chooses the operational or commercial outcome it is after, and together we define the right service or development scope, rather than offering one program to every client."}
            center
          />
          <ul className={styles.cards}>
            {AUDIENCES.map((audience, index) => (
              <Reveal as="li" key={audience.activity} className={`${kit.card} ${styles.card}`} delay={(index % 2) * 80}>
                <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={kit.cardTitle}>{audience.title}</h3>
                <p className={kit.cardText}>{audience.text}</p>
                <PrefillLink href={toForm} values={{ activity: audience.activity }} className={kit.cardLink}>
                  {" Start from your organization's needs "}<Arrow />
                </PrefillLink>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.tinted} ${styles.solutionsIntro}`} aria-labelledby="tourism-solutions-heading">
          <SectionIntro
            id="tourism-solutions-heading"
            title={"What do you want to develop in your business?"}
            text={"Your organization chooses the operational or commercial outcome it is after, and together we define the right service or development scope, rather than offering one program to every client."}
            center
          />
        </section>

        {SOLUTIONS.map((solution, index) => {
          const heading = `tourism-${solution.slug}-heading`;
          return (
            <section
              key={solution.slug}
              className={index % 2 ? kit.section : `${kit.section} ${kit.tinted}`}
              aria-labelledby={heading}
            >
              <div className={styles.solution}>
                <Reveal className={styles.solutionCopy}>
                  <div className={styles.solutionIntro}>
                    {solution.icon && (
                      <span className={styles.solutionIcon} aria-hidden="true">
                        <Image src={solution.icon.src} alt="" width={solution.icon.width} height={solution.icon.height} />
                      </span>
                    )}
                    {solution.label && <p className={kit.kicker}>{solution.label}</p>}
                    <h3 id={heading} className={kit.title}>
                      {solution.title}
                    </h3>
                  </div>
                  {solution.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={kit.cardText}>
                      {paragraph}
                    </p>
                  ))}
                  {solution.definition && <p className={styles.definition}>{solution.definition}</p>}
                  <PrefillLink
                    href={toForm}
                    values={{ interest: solution.interest }}
                    className={`${kit.button} ${kit.buttonPrimary}`}
                  >
                    {solution.cta}
                  </PrefillLink>
                </Reveal>
                <Reveal className={styles.solutionPanel} delay={80}>
                  <SolutionPanel panel={solution.panel} />
                </Reveal>
              </div>
            </section>
          );
        })}

        <section className={kit.section} aria-labelledby="tourism-projects-heading">
          <SectionIntro
            id="tourism-projects-heading"
            kicker={"From our work and experience"}
            title={"Delivered work you can rely on to assess our capabilities"}
            text={"Every project has its own scope; we show the kind of work that was delivered, without generalizing case-study data to every client."}
          />
          <ul className={`${styles.cards} ${styles.cardsWide}`}>
            {PROJECTS.map((project, index) => (
              <Reveal as="li" key={project.title} className={`${kit.card} ${styles.card}`} delay={(index % 2) * 80}>
                <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={kit.cardTitle}>{project.title}</h3>
                <p className={kit.cardText}>{project.text}</p>
                <PrefillLink href={toForm} values={{ interest: project.interest }} className={kit.cardLink}>
                  {project.cta}
                  <Arrow />
                </PrefillLink>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="tourism-process-heading">
          <SectionIntro id="tourism-process-heading" title={"A clear path from your need to a deliverable scope of work"} center />
          <ProcessSteps steps={STEPS} roomy />
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="tourism-faq-heading">
          <SectionIntro id="tourism-faq-heading" title={"Questions before the project starts"} center />
          <FaqList items={QUESTIONS} />
        </section>

        <section className={kit.section} aria-labelledby="tourism-request-heading">
          <SectionIntro
            id="tourism-request-heading"
            title={"Tell us what you want to develop in your organization"}
            text={"Tell us your activity and the outcome you're after, so we can discuss a fitting scope instead of sending a generic proposal that ignores how you work."}
            center
          />
          <Reveal>
            <ServiceRequestForm id={FORM} title={"Request details"} form="tourism" path="business" />
          </Reveal>
        </section>

        <Closing
          id="tourism-closing-heading"
          title={"Develop your tourism experience with Transformix"}
          text={"From distribution and operations to custom platforms, digital experiences and analytics, we work out with you the path that fits your business and the needs of your customers and visitors."}
          actions={[{ label: "Discuss your project with us" }]}
        />
      </main>
      <Footer />
    </>
  );
}
