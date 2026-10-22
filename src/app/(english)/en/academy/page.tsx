import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { AcademyChallenge } from "@/english/components/sections/academy/AcademyChallenge";
import { AcademyCta } from "@/english/components/sections/academy/AcademyCta";
import { AcademyCurtain } from "@/english/components/sections/academy/AcademyCurtain";
import { AcademyHero } from "@/english/components/sections/academy/AcademyHero";
import { AcademyJourney } from "@/english/components/sections/academy/AcademyJourney";
import { AcademyPartners } from "@/english/components/sections/academy/AcademyPartners";
import { AcademySolutions } from "@/english/components/sections/academy/AcademySolutions";
import { AcademyTracks } from "@/english/components/sections/academy/AcademyTracks";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { alexandria, tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/academy/page.module.css";

export const metadata: Metadata = {
  title: "Academy | Transformix",
  description:
    "TX Academies provide practical training in business software, digital solutions, and artificial intelligence, helping organizations equip their teams and individuals develop workplace skills.",
};

export default function AcademyPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${styles.main} ${flow.flow} ${tajawal.variable} ${alexandria.variable}`}>
        <AcademyCurtain hero={<AcademyHero />}>
          <AcademyChallenge />
          <AcademyTracks />
        </AcademyCurtain>
        <AcademySolutions />
        <AcademyPartners />
        <AcademyJourney />
        <AcademyCta />
      </main>
      <Footer />
    </>
  );
}
