import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { WorksPageContent } from "@/components/sections/works/WorksPageContent";
import flow from "@/components/ui/SectionFlow.module.css";

export const metadata: Metadata = {
  title: "أعمالنا | Transformix",
  description:
    "نجمع بين البيانات، الذكاء الاصطناعي، التصميم وتطوير الأنظمة لبناء حلول تحقق أثرًا حقيقيًا — تصفّح مشاريع Transformix حسب الخدمة.",
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
