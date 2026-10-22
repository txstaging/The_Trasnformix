import type { Metadata } from "next";
import { Footer } from "@/english/components/v2/layout/Footer";
import { Navbar } from "@/english/components/v2/layout/Navbar";
import { HomeOpening } from "@/english/components/ui/HomeOpening";
import shell from "@/english/components/v2/layout/Shell.module.css";
import motion from "@/english/components/v2/ui/Motion.module.css";

/* The second design (Figma "transformix-2", section 3800:4253). Everything it
   renders lives under components/v2 and public/v2, so either design can be
   removed without touching the other. */

export const metadata: Metadata = {
  title: {
    default: "Transformix | Clearer business direction. Lasting impact.",
    template: "%s | Transformix",
  },
  description:
    "We connect business understanding with technology to help your organization interpret its data, improve its digital presence, and organize operations through practical, considered steps.",
};

export default function V2Layout({ children }: LayoutProps<"/en/v2">) {
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
