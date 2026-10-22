import { Clients } from "@/english/components/sections/Clients";
import { CtaChallenge } from "@/english/components/sections/CtaBanner";
import { Faq } from "@/english/components/sections/Faq";
import { Footer } from "@/english/components/sections/Footer";
import { Hero } from "@/english/components/sections/Hero";
import { Intro } from "@/english/components/sections/Intro";
import { Navbar } from "@/english/components/sections/Navbar";
import { Partners } from "@/english/components/sections/Partners";
import { Process } from "@/english/components/sections/Process";
import { ServicesGrid } from "@/english/components/sections/ServicesGrid";
import { Testimonials } from "@/english/components/sections/Testimonials";
import { Works } from "@/english/components/sections/Works";
import { HomeOpening } from "@/english/components/ui/HomeOpening";
import flow from "@/english/components/ui/SectionFlow.module.css";
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
