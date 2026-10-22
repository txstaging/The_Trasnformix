import type { Metadata } from "next";
import { Footer } from "@/components/v2/layout/Footer";
import { Navbar } from "@/components/v2/layout/Navbar";
import { HomeOpening } from "@/components/ui/HomeOpening";
import shell from "@/components/v2/layout/Shell.module.css";
import motion from "@/components/v2/ui/Motion.module.css";

/* The second design (Figma "transformix-2", section 3800:4253). Everything it
   renders lives under components/v2 and public/v2, so either design can be
   removed without touching the other. */

export const metadata: Metadata = {
  title: {
    default: "Transformix | نحو أعمال أكثر وضوحًا، وأثرٍ يدوم",
    template: "%s | Transformix",
  },
  description:
    "نربط فهم الأعمال بالتقنية، لنساعد منشأتك على قراءة بياناتها، وتطوير حضورها الرقمي، وتنظيم عملياتها بخطوات عملية ومدروسة.",
};

export default function V2Layout({ children }: LayoutProps<"/v2">) {
  return (
    <div className={shell.root}>
      <HomeOpening version="v2">
        <Navbar />
        <main className={motion.flow} tabIndex={-1}>{children}</main>
        <Footer />
      </HomeOpening>
    </div>
  );
}
