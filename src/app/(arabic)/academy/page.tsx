import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { AcademyChallenge } from "@/components/sections/academy/AcademyChallenge";
import { AcademyCta } from "@/components/sections/academy/AcademyCta";
import { AcademyCurtain } from "@/components/sections/academy/AcademyCurtain";
import { AcademyHero } from "@/components/sections/academy/AcademyHero";
import { AcademyJourney } from "@/components/sections/academy/AcademyJourney";
import { AcademyPartners } from "@/components/sections/academy/AcademyPartners";
import { AcademySolutions } from "@/components/sections/academy/AcademySolutions";
import { AcademyTracks } from "@/components/sections/academy/AcademyTracks";
import flow from "@/components/ui/SectionFlow.module.css";
import { alexandria, tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "الأكاديمية | Transformix",
  description:
    "تقدم أكاديميات TX تدريباً تطبيقياً على برامج الأعمال والحلول الرقمية والذكاء الاصطناعي، تساعد المؤسسات على تأهيل فرقها والأفراد على اكتساب مهارات العمل.",
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
