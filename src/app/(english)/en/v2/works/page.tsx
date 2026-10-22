import type { Metadata } from "next";
import { WorksPageContent } from "@/english/components/sections/works/WorksPageContent";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "We combine data, AI, design, and system development to build solutions with real impact. Explore Transformix projects by service.",
};

export default function WorksV2() {
  return <WorksPageContent />;
}
