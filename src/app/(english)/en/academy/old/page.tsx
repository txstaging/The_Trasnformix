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
import styles from "@/app/(english)/en/academy/old/page.module.css";

export const metadata: Metadata = {
  title: "Academy | Transformix",
  description:
    "TX Academies provide practical training in business software, digital solutions, and artificial intelligence, helping organizations equip their teams and individuals develop workplace skills.",
  robots: { index: false, follow: false },
};

/** The first academy design (Figma 3383:8325), kept for reference after the
    page moved to the "الأكاديميات" redesign (Figma 4726:4790). It is served
    by `npm run dev` only: src/proxy.ts hides it in production, like the
    v2–v4 designs. Its sections still live in components/sections/academy. */
export default function AcademyOldPage() {
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
