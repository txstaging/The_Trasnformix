import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { WorksPageContent } from "@/english/components/sections/works/WorksPageContent";
import flow from "@/english/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "Our Work | Transformix",
  description:
    "We combine data, AI, design, and system development to build solutions with real impact. Explore Transformix projects by service.",
};

export default function WorksPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={flow.flow}>
        <WorksPageContent />
      </main>
      <Footer />
    </>
  );
}
