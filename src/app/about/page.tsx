import type { Metadata } from "next";
import { AboutEcosystem } from "@/components/sections/about/AboutEcosystem";
import { AboutPartners } from "@/components/sections/about/AboutPartners";
import { AboutProcess } from "@/components/sections/about/AboutProcess";
import { AboutStats } from "@/components/sections/about/AboutStats";
import { AboutVision } from "@/components/sections/about/AboutVision";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { alexandria } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "من نحن | Transformix",
  description:
    "في Transformix نؤمن أن أفضل الحلول الرقمية لا تبدأ بالتكنولوجيا، بل بفهم الأعمال. نجمع بين التفكير التجاري، البيانات، الإبداع والتقنية لبناء حلول تساعد الشركات على النمو.",
};

/* Section order follows the artboards top-to-bottom: Figma 2515:53513
   "about page" (1440) and 2515:60113 (375). */
export default function AboutPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={alexandria.variable}>
        <PageHero
          title="نبني عند تقاطع الأعمال والتقنية"
          text="في Transformix نؤمن أن أفضل الحلول الرقمية لا تبدأ بالتكنولوجيا، بل بفهم الأعمال. نجمع بين التفكير التجاري، البيانات، الإبداع والتقنية لبناء حلول تساعد الشركات على العمل بكفاءة أكبر، اتخاذ قرارات أذكى وتحقيق نمو قابل للاستمرار."
          cta="ابدء مشروعك معنا"
          height={552}
          textHeight={117}
          mobileTextHeight={130}
          lines={{
            left: {
              src: "/icons/about-hero-lines-left.svg",
              width: 516,
              height: 335,
              top: 0,
            },
            right: {
              src: "/icons/about-hero-lines-right.svg",
              width: 495,
              height: 396,
              top: 156.031,
            },
          }}
        />
        <AboutEcosystem />
        <AboutVision />
        <AboutProcess />
        <AboutStats />
        <AboutPartners />
      </main>
      <Footer variant="navy" />
    </>
  );
}
