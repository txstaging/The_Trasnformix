import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { WorksGallery } from "@/components/sections/works/WorksGallery";

export const metadata: Metadata = {
  title: "أعمالنا | Transformix",
  description:
    "نجمع بين البيانات، الذكاء الاصطناعي، التصميم وتطوير الأنظمة لبناء حلول تحقق أثرًا حقيقيًا — تصفّح مشاريع Transformix حسب الخدمة.",
};

/* Figma 2418:33317 "all categ" (1440), top-to-bottom. No phone artboard is
   drawn for this page; it follows the about page's 375 treatment. */
export default function WorksPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main>
        <PageHero
          title="نحوّل تحديات الأعمال إلى حلول رقمية"
          text="نجمع بين البيانات، الذكاء الاصطناعي، التصميم وتطوير الأنظمة لبناء حلول تحقق أثرًا حقيقيًا."
          cta="تحدث معنا"
          height={391}
          textHeight={50}
          lines={{
            left: {
              src: "/icons/works-hero-lines-left.svg",
              width: 516,
              height: 237,
              top: 0,
            },
            right: {
              src: "/icons/works-hero-lines-right.svg",
              width: 495,
              height: 281,
              top: 110.522,
            },
          }}
        />
        <WorksGallery />
      </main>
      <Footer variant="navy" />
    </>
  );
}
