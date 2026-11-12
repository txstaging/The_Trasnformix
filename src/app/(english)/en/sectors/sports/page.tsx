import type { Metadata } from "next";
import { ClosingCard } from "@/english/components/academies/AcademiesKit";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { sector, SectorBanner, sectorPage, SectorStory, type Story } from "@/english/components/sectors/SectorKit";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Smart Sports Sector | Transformix",
  description:
    "Transformix helps clubs, academies, facilities and investors in the sports sector develop their administrative, operational and digital capabilities, from member experience to smart sports performance.",
};

const photo = (name: string, alt: string, height: number, shade = 0.2) => ({
  src: `/images/sectors/sports/${name}.jpg`,
  alt,
  height,
  shade,
});

/* Figma 4781:5948 – 4781:6062, top to bottom. The photo alternates sides,
   starting on the far (left) one. */
const STORIES: readonly Story[] = [
  {
    id: "sports-technology",
    title: "Sports and technology",
    paragraphs: [
      "The sports industry in the Arab region is seeing growing investment and the development of clubs, academies and facilities, with rising interest in discovering talent and raising the level of competition. Saudi Arabia, Qatar and Morocco stand out among the countries investing in the sector, each according to its own priorities and programs.",
      "With this growth comes a greater need for sports organizations that can develop athletes, manage their resources efficiently, improve the member experience and build sustainable sources of income. Technology opens new ways to achieve this, through digital systems, automation, AI, data science and performance measurement technologies.",
      "Transformix helps sports organizations develop their administrative, operational and digital capabilities in line with their goals and the nature of their activities.",
    ],
    photo: photo("technology", "A coach following an athlete's performance data on a tablet during a gym session", 600, 0.18),
    far: true,
  },
  {
    id: "clubs",
    title: "Clubs and member experience",
    subtitle: "Integrated management and a stronger relationship with members",
    paragraphs: [
      "Developing how sports clubs are managed and run, including memberships, subscriptions, elections, general assemblies, facilities, activities, and financial and operational resources.",
      "Digital platforms improve the member experience in registration, renewals, bookings, events, requests and communication, while strengthening transparency and providing clear reports on the club's work and achievements.",
      "This system also covers managing the club's academies and teams, linking their activities to management, resources and performance indicators.",
    ],
    action: { label: "Improve your club's member experience" },
    photo: photo("clubs", "A receptionist welcoming a member at a sports club", 520, 0.22),
    tinted: true,
  },
  {
    id: "sports-academies",
    title: "The sports academy ecosystem",
    subtitle: "One academy, many parties, one connected experience",
    paragraphs: [
      "An academy can operate within a club, a school or a university, or as an independent investment. In every case, its success depends on the quality of training, the progress of athletes, the trust of parents and the efficiency of management.",
      "Digital platforms organize programs, schedules, attendance, subscriptions and assessments, and connect the academy's management with coaches, athletes and parents. Each party gets the information and services suited to its role, improving communication and the tracking of athletic progress.",
      "This ecosystem lets clubs, schools, universities and investors build better-organized sports programs, widen participation and create additional revenue streams.",
    ],
    action: { label: "Develop your academy's ecosystem" },
    photo: photo("academies", "A coach explaining a plan on a tablet to a group of young players on the pitch", 620),
    far: true,
  },
  {
    id: "performance",
    title: "Smart sports performance",
    subtitle: "Developing athletes with data-driven decisions",
    paragraphs: [
      "Data from training, tests, wearables and sensors helps track performance, training loads, and physical and technical progress, according to the requirements of each sport.",
      "Data science and AI make it possible to build analytics, dashboards and decision-support tools that help coaches and specialists evaluate programs, plan training and follow up on athletes.",
      "Our capabilities include developing applications and analytics and integrating with specialized technologies, without technology replacing sports and medical expertise.",
    ],
    action: { label: "Explore sports performance solutions", href: "/en/services/data-science" },
    photo: photo("performance", "A coach reviewing performance data on a tablet while an athlete trains on the field", 520),
  },
  {
    id: "operations",
    title: "Smart operations",
    subtitle: "Better-organized operations and better-used resources",
    paragraphs: [
      "Integrated systems and automation help manage facilities, bookings, payments, events and resources, while reducing manual work and duplicate data.",
      "Operational and financial reports give management a clearer view of facility use, program demand, and costs and revenues, supporting planning and better services.",
    ],
    action: { label: "Develop your sports operations" },
    photo: photo("operations", "A staff member managing bookings on a tablet inside a sports facility", 440),
    far: true,
  },
  {
    id: "investment",
    title: "Sports investment and economy",
    subtitle: "Growth opportunities beyond subscriptions and traditional activities",
    paragraphs: [
      "Sports investment opportunities are expanding across clubs, academies, facilities, events, sponsorship and commercial partnerships. Succeeding in these ventures requires understanding market needs, developing suitable business models, and tracking performance, returns and risks.",
      "Administrative and digital solutions help assess demand, manage relationships with partners and sponsors, analyze revenues and costs, and develop new services and income streams.",
      "The sports economy connects investors, operators, clubs, academies, athletes, families and partners, supporting sustainable activities and reinvestment in developing talent and services.",
    ],
    action: { label: "Discuss sports investment opportunities" },
    photo: photo("investment", "A business meeting discussing sports investment opportunities", 580, 0.21),
  },
  {
    id: "quality-of-life",
    title: "Sports and quality of life",
    subtitle: "An impact that reaches families and the community",
    paragraphs: [
      "School and community sports programs widen participation in physical activity and encourage families to adopt more active habits and pay more attention to health and nutrition.",
      "Developing clubs, academies and sports programs creates better opportunities to take part, learn and train, and strengthens the community value of investing in sport.",
    ],
    action: { label: "Explore developing sports programs" },
    photo: photo("quality", "A family walking together in a park", 440),
    far: true,
  },
];

/* Figma 4781:5989, in reading order. */
const OPERATORS = ["Club", "School", "University", "Investor"] as const;
const ROLES = [
  { title: "Coaches", text: "Training and assessment" },
  { title: "Athletes", text: "Activities and progress" },
  { title: "Parents", text: "Follow-up and communication" },
] as const;

/** Who runs a sports academy, what it holds together, and whom it serves. */
function OperatingModel() {
  return (
    <Reveal as="figure" className={sector.model} aria-labelledby="sports-model-heading">
      <h3 id="sports-model-heading" className={sector.modelTitle}>
        {" The sports academy operating model "}</h3>
      <ul className={sector.modelRow}>
        {OPERATORS.map((operator) => (
          <li key={operator} className={sector.modelNode}>
            <span className={sector.modelNodeTitle}>{operator}</span>
          </li>
        ))}
      </ul>
      <span className={sector.modelArrow} aria-hidden>
        ↓
      </span>
      <div className={sector.modelCore}>
        <p className={sector.modelCoreTitle}>{"The sports academy"}</p>
        <p className={sector.modelCoreText}>{"Programs · Training · Subscriptions · Assessments · Communication"}</p>
      </div>
      <span className={sector.modelArrow} aria-hidden>
        ↓
      </span>
      <ul className={`${sector.modelRow} ${sector.modelRoles}`}>
        {ROLES.map((role) => (
          <li key={role.title} className={sector.modelNode}>
            <span className={sector.modelNodeTitle}>{role.title}</span>
            <span className={sector.modelNodeText}>{role.text}</span>
          </li>
        ))}
      </ul>
      <figcaption className={sector.modelNote}>
        {" A conceptual model showing the operating bodies and the beneficiaries, not the specification of a ready-made product. "}</figcaption>
    </Reveal>
  );
}

/** Figma 4781:5929 — القطاع الرياضي (tablet 4782:6068, mobile 4782:6388). */
export default function SportsSectorPage() {
  const [technology, clubs, academy, ...rest] = STORIES;
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${sectorPage} ${tajawal.variable}`}>
        <SectorBanner
          id="sports-banner-heading"
          image="/images/sectors/sports/banner.jpg"
          title={"The Sports Sector"}
          text={"A more competitive and sustainable sports industry"}
          actions={[
            { label: "Discuss your sports project", tone: "inverse" },
            { label: "Explore development areas", href: "#sports-technology", tone: "outlineInverse" },
          ]}
        />

        <SectorStory story={technology} />
        <SectorStory story={clubs} />
        <SectorStory story={academy}>
          <OperatingModel />
        </SectorStory>
        {rest.map((story) => (
          <SectorStory key={story.id} story={story} />
        ))}

        <ClosingCard
          id="sports-closing-heading"
          title={"Let's develop your sports project"}
          text={"Whether you run a club or an academy, develop a sports activity within a school or university, or invest in a sports facility or project, we help you identify development opportunities and choose the administrative and technical capabilities that fit your goals."}
          actions={[
            { label: "Discuss your project with us" },
            { label: "Contact our team", href: "/en/contact", tone: "outline" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
