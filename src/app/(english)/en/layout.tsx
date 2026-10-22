import type { Metadata, Viewport } from "next";
import { ContactModalProvider } from "@/english/components/contact/ContactModal";
import { inter } from "@/lib/fonts";
import "@/app/globals.css";
import "@/english/english.css";

export const metadata: Metadata = {
  title: "Transformix | Digital solutions that help your business grow",
  description:
    "We combine data and AI, design, digital experiences, and business systems to turn your challenges into practical solutions that improve efficiency and support growth.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c4499",
};

const SCROLLBAR_PROBE = `(function(){var d=document.documentElement;var s=function(){d.style.setProperty('--sbw',(window.innerWidth-d.clientWidth)+'px')};s();addEventListener('resize',s,{passive:true})})();`;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCROLLBAR_PROBE }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}
