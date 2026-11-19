import { Academies } from "@/english/components/sections/Academies";
import { Clients } from "@/english/components/sections/Clients";
import { CtaChallenge } from "@/english/components/sections/CtaBanner";
import { Faq } from "@/english/components/sections/Faq";
import { Footer } from "@/english/components/sections/Footer";
import { Hero } from "@/english/components/sections/Hero";
import { Industries } from "@/english/components/sections/Industries";
import { Intro } from "@/english/components/sections/Intro";
import { Navbar } from "@/english/components/sections/Navbar";
import { Partners } from "@/english/components/sections/Partners";
import { Products } from "@/english/components/sections/Products";
import { ServicesGrid } from "@/english/components/sections/ServicesGrid";
import { Sustainability } from "@/english/components/sections/Sustainability";
import { Testimonials } from "@/english/components/sections/Testimonials";
import { TxCommunity } from "@/english/components/sections/TxCommunity";
import { Works } from "@/english/components/sections/Works";
import { HomeOpening } from "@/english/components/ui/HomeOpening";
import { HomeSection, HomeTransitions } from "@/english/components/ui/HomeTransitions";
import styles from "@/app/(english)/en/page.module.css";

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
