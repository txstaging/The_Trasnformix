import type { Metadata } from "next";
import { WorksPageContent } from "@/components/sections/works/WorksPageContent";

export const metadata: Metadata = {
  title: "أعمالنا",
  description:
    "نجمع بين البيانات، الذكاء الاصطناعي، التصميم وتطوير الأنظمة لبناء حلول تحقق أثرًا حقيقيًا — تصفّح مشاريع Transformix حسب الخدمة.",
};

export default function WorksV2() {
  return <WorksPageContent />;
}
