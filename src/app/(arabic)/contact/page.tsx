import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import flow from "@/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "تواصل معنا | Transformix",
  description:
    "كل فكرة كبيرة تبدأ بحوار. شاركنا احتياجك، ولنكتشف معًا الخطوة التالية — راسلنا أو تواصل مع Transformix مباشرة.",
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
