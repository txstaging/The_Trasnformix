import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { SectorPanel, type SectorShot } from "@/english/components/sections/sectors/SectorPanel";
import { SectorsCta } from "@/english/components/sections/sectors/SectorsCta";
import { SectorsHero } from "@/english/components/sections/sectors/SectorsHero";
import { SectorsOverview } from "@/english/components/sections/sectors/SectorsOverview";
import { SectorsStats } from "@/english/components/sections/sectors/SectorsStats";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/sectors/page.module.css";

export const metadata: Metadata = {
  title: "Industries | Transformix",
  description:
    "We provide operational systems, digital transformation, and AI solutions tailored to manufacturing, cooperatives, and education and training.",
};

/* Every tablet render is 1536 x 1024. Boxes are design px on the band's frame
   (508 x 813 for الصناعة, 509.64 x 700 and 509.64 x 669 for the others). */
const tablet = (name: string, shot: Omit<SectorShot, "src" | "width" | "height">): SectorShot => ({
  src: `/images/sectors/${name}.png`,
  width: 1536,
  height: 1024,
  ...shot,
});

/* Rows 02–04 are drawn on a 509.64 x 833 frame; their boxes are moved onto
   row 01's frame by the shared centre. */
const INDUSTRY_SHOTS = [
  tablet("industry-1", {
    box: { x: 8.33, y: 222.27, width: 509.63, height: 335.44 },
    crop: { left: -5.87, top: -8.25, width: 111.22, height: 112.65 },
  }),
  tablet("industry-2", {
    box: { x: -0.49, y: 175.22, width: 504, height: 338 },
    crop: { left: -3.93, top: -4.4, width: 107.62, height: 106.96 },
    radius: 25,
    shadow: true,
  }),
  tablet("industry-3", {
    box: { x: 24.51, y: 175.22, width: 455, height: 308 },
    crop: { left: -6.12, top: -6.79, width: 111.43, height: 109.74 },
    radius: 25,
    shadow: true,
  }),
];

/* Rows 02 and 04 share a render, framed differently. */
const COOPERATIVES_SHOTS = [
  tablet("cooperatives-1", {
    box: { x: 0, y: 177.67, width: 509.64, height: 344.67 },
    crop: { left: -5.42, top: -6.62, width: 110.98, height: 109.4 },
  }),
  tablet("cooperatives-2", {
    box: { x: -0.68, y: 179.5, width: 511, height: 341 },
    radius: 24,
  }),
  tablet("cooperatives-3", {
    box: { x: -0.68, y: 184.3, width: 511, height: 341 },
    radius: 24,
  }),
  tablet("cooperatives-2", {
    box: { x: 5.32, y: 189.8, width: 499, height: 332 },
  }),
];

const EDUCATION_SHOTS = [
  tablet("education-1", {
    box: { x: 3.32, y: 184.3, width: 503, height: 336 },
    radius: 19,
  }),
  tablet("education-2", {
    box: { x: 10.64, y: 187, width: 499, height: 332 },
  }),
  tablet("education-3", {
    box: { x: -1.36, y: 159, width: 509, height: 339 },
    radius: 20,
  }),
  tablet("education-4", {
    box: { x: 3.82, y: 181.3, width: 502, height: 334 },
  }),
];

export default function SectorsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${styles.main} ${flow.flow} ${tajawal.variable}`}>
        <SectorsHero />
        <SectorsOverview />

        <SectorPanel
          id="industry"
          variant="industry"
          eyebrow={"Industry 01"}
          title={"Manufacturing"}
          text={"We help manufacturers build connected digital operations, from production monitoring to data analytics and artificial intelligence."}
          items={[
            {
              number: "01",
              title: "Digital transformation for manufacturers",
              text: "Connect systems, data, and workflows.",
              textColor: "#373c48",
              shot: INDUSTRY_SHOTS[0],
            },
            {
              number: "02",
              title: "MCR systems",
              text: "Solutions for operational monitoring and oversight.",
              textSize: 13,
              shot: INDUSTRY_SHOTS[1],
            },
            {
              number: "03",
              title: "Industrial AI",
              text: "Solutions for operational monitoring and oversight.",
              shot: INDUSTRY_SHOTS[2],
            },
            {
              number: "04",
              title: "Factory operations systems",
              text: "Digitize and monitor daily operations.",
              shot: INDUSTRY_SHOTS[2],
            },
          ]}
          cta={{ label: "Explore our systems", href: "https://ai.thetransformix.com/erp" }}
        />

        <SectorPanel
          id="cooperatives"
          variant="cooperatives"
          eyebrow={"Industry 02"}
          title={"Cooperatives"}
          text={"We provide integrated digital solutions that help cooperatives organize their work, strengthen governance and compliance, and manage services and investments through one system."}
          items={[
            {
              number: "01",
              title: "Compliance and governance AI agent",
              text: "An intelligent assistant for accessing policies and requirements.",
              textColor: "var(--text-secondary)",
              shot: COOPERATIVES_SHOTS[0],
            },
            {
              number: "02",
              title: "Projects and investments",
              text: "Manage cooperative projects and track investments and returns.",
              textColor: "var(--text-secondary)",
              shot: COOPERATIVES_SHOTS[1],
            },
            {
              number: "03",
              title: "Mobile application",
              text: "Manage tasks, reports, and approvals from your phone.",
              shot: COOPERATIVES_SHOTS[2],
            },
            {
              number: "04",
              title: "General assemblies and voting",
              text: "Manage meetings, sessions, and secure electronic voting.",
              shot: COOPERATIVES_SHOTS[3],
            },
          ]}
          cta={{ label: "Visit the cooperative" }}
        />

        <SectorPanel
          id="education"
          variant="education"
          eyebrow={"Industry 03"}
          title={"Education and training"}
          text={"We turn knowledge into practical digital learning experiences, from training teams on Odoo to building learning platforms that develop digital skills."}
          items={[
            {
              number: "01",
              title: "Odoo training",
              text: "Practical training for teams and users.",
              textColor: "var(--text-secondary)",
              shot: EDUCATION_SHOTS[0],
            },
            {
              number: "02",
              title: "Digital learning platforms",
              text: "Structured, scalable learning experiences.",
              textColor: "var(--text-secondary)",
              shot: EDUCATION_SHOTS[1],
            },
            {
              number: "03",
              title: "Digital content",
              text: "Turn knowledge into accessible content.",
              shot: EDUCATION_SHOTS[2],
            },
            {
              number: "04",
              title: "Learning experiences",
              text: "Clearer, more engaging learning journeys.",
              shot: EDUCATION_SHOTS[3],
            },
          ]}
          cta={{ label: "Explore our learning platform" }}
        />

        <SectorsStats />
        <SectorsCta />
      </main>
      <Footer />
    </>
  );
}
