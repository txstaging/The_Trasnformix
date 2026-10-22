import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { ProductShowcase } from "@/components/sections/products/ProductShowcase";
import { ProductsCta } from "@/components/sections/products/ProductsCta";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "المنتجات | Transformix",
  description:
    "نطوّر في Transformix منتجات وحلولًا رقمية تجمع بين التقنية وفهم الأعمال، من المنصات المتخصصة إلى حلول الذكاء الاصطناعي، بهدف تبسيط العمليات، تحسين التجربة ودعم النمو.",
};

/** Figma 3817:42120 — the products page. */
export default function ProductsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${tajawal.variable}`}>
        <PageHero
          title="منتجات رقمية بنيناها لتحديات أعمال حقيقية"
          text="نطوّر في Transformix منتجات وحلولًا رقمية تجمع بين التقنية وفهم الأعمال، من المنصات المتخصصة إلى حلول الذكاء الاصطناعي، بهدف تبسيط العمليات، تحسين التجربة ودعم النمو."
          cta="احجز استشارة الان"
          height={552}
          tuck={117}
          copy={{ left: 323, top: 214, width: 865 }}
          titleWeight={700}
          textHeight={81}
          ctaClassName={styles.heroCta}
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
        <ProductShowcase />
        <ProductsCta />
      </main>
      <Footer />
    </>
  );
}
