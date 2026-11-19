import { Academies } from "@/components/sections/Academies";
import { Clients } from "@/components/sections/Clients";
import { CtaChallenge } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Intro } from "@/components/sections/Intro";
import { Navbar } from "@/components/sections/Navbar";
import { Partners } from "@/components/sections/Partners";
import { Products } from "@/components/sections/Products";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Sustainability } from "@/components/sections/Sustainability";
import { Testimonials } from "@/components/sections/Testimonials";
import { TxCommunity } from "@/components/sections/TxCommunity";
import { Works } from "@/components/sections/Works";
import { HomeOpening } from "@/components/ui/HomeOpening";
import { HomeSection, HomeTransitions } from "@/components/ui/HomeTransitions";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeOpening version="v1">
      <Navbar />
      <HomeTransitions className={styles.home}>
        <HomeSection effect="scene">
          <Hero />
          <Clients />
        </HomeSection>
        <HomeSection>
          <Intro />
        </HomeSection>
        <HomeSection>
          <ServicesGrid />
        </HomeSection>
        <HomeSection tone="ice">
          <Products />
        </HomeSection>
        <HomeSection>
          <Partners />
        </HomeSection>
        <HomeSection tone="ice">
          <Academies />
        </HomeSection>
        <HomeSection>
          <Works />
        </HomeSection>
        <HomeSection>
          <Industries />
        </HomeSection>
        <HomeSection>
          <TxCommunity />
        </HomeSection>
        <HomeSection>
          <Sustainability />
        </HomeSection>
        <HomeSection>
          <CtaChallenge />
          <Faq />
          <Testimonials />
        </HomeSection>
      </HomeTransitions>
      <Footer />
    </HomeOpening>
  );
}
