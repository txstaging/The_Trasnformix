import { PageHero } from "@/components/sections/PageHero";
import { WorksGallery } from "./WorksGallery";

/** The same portfolio introduction, filters, search, and projects in versions 1 and 2. */
export function WorksPageContent() {
  return (
    <>
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
    </>
  );
}
