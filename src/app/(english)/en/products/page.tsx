import type { Metadata } from "next";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { PageHero } from "@/english/components/sections/PageHero";
import { ProductShowcase } from "@/english/components/sections/products/ProductShowcase";
import { ProductsCta } from "@/english/components/sections/products/ProductsCta";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/products/page.module.css";

export const metadata: Metadata = {
  title: "Products | Transformix",
  description:
    "At Transformix, we develop digital products and solutions that combine technology with business insight. From specialized platforms to AI solutions, we simplify operations, improve experiences, and support growth.",
};

/** Figma 3817:42120 — the products page. */
export default function ProductsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${tajawal.variable}`}>
        <PageHero
          title={"Digital products built for real business challenges"}
          text={"At Transformix, we develop digital products and solutions that combine technology with business insight. From specialized platforms to AI solutions, we simplify operations, improve experiences, and support growth."}
          cta={"Book a consultation"}
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
