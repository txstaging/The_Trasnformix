import { Clients } from "@/components/sections/Clients";
import { CtaChallenge } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Navbar } from "@/components/sections/Navbar";
import { Partners } from "@/components/sections/Partners";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";
import { HomeOpening } from "@/components/ui/HomeOpening";
import flow from "@/components/ui/SectionFlow.module.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeOpening version="v1">
      <Navbar />
      <main className={`${flow.flow} ${styles.home}`} tabIndex={-1}>
        <Hero />
        <Clients />
        <Intro />
        <ServicesGrid />
        <Process />
        <Works />
        <Partners />
        <CtaChallenge />
        <Faq />
        <Testimonials />
      </main>
      <Footer />
    </HomeOpening>
  );
}
