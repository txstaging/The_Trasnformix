import { AllInOne } from "@/components/sections/AllInOne";
import { Clients } from "@/components/sections/Clients";
import { CtaChallenge, CtaStart } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Navbar } from "@/components/sections/Navbar";
import { Partners } from "@/components/sections/Partners";
import { Process } from "@/components/sections/Process";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";

/* Section order follows the artboard top-to-bottom (Figma node 2096:4497). */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Clients />
        <AllInOne />
        <ServicesTabs />
        <CtaStart />
        <Process />
        <Works />
        <Faq />
        <Partners />
        <CtaChallenge />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
