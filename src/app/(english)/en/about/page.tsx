import type { Metadata } from "next";
import { AboutEcosystem } from "@/english/components/sections/about/AboutEcosystem";
import { AboutPartners } from "@/english/components/sections/about/AboutPartners";
import { AboutProcess } from "@/english/components/sections/about/AboutProcess";
import { AboutStats } from "@/english/components/sections/about/AboutStats";
import { AboutVision } from "@/english/components/sections/about/AboutVision";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { PageHero } from "@/english/components/sections/PageHero";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { alexandria } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "About Us | Transformix",
  description:
    "At Transformix, we believe the best digital solutions start with understanding your business. We bring together business insight, data, creativity, and technology to help companies grow.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${alexandria.variable}`}>
        <PageHero
          title={"Where business meets technology"}
          text={"At Transformix, we believe the best digital solutions start with understanding your business. We bring together business insight, data, creativity, and technology to help companies work more efficiently, make smarter decisions, and achieve sustainable growth."}
          cta={"Start your project with us"}
          height={552}
          textHeight={117}
          mobileTextHeight={130}
          lines={{
            left: {
              src: "/icons/about-hero-lines-left.svg",
              width: 516,
              height: 335,
              top: 0,
            },
            right: {
              src: "/icons/about-hero-lines-right.svg",
              width: 495,
              height: 396,
              top: 156.031,
            },
          }}
        />
        <AboutEcosystem />
        <AboutVision />
        <AboutProcess />
        <AboutStats />
        <AboutPartners />
      </main>
      <Footer />
    </>
  );
}
