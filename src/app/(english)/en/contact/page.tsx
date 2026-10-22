import type { Metadata } from "next";
import { ContactHero } from "@/english/components/sections/contact/ContactHero";
import { ContactSection } from "@/english/components/sections/contact/ContactSection";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import flow from "@/english/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Transformix",
  description:
    "Every great idea starts with a conversation. Tell us what you need, and let us explore the next step together. Send us a message or contact Transformix directly.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={flow.flow}>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
