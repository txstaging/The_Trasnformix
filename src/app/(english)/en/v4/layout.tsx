import type { Metadata } from "next";
import { tajawal } from "@/lib/fonts";
import { SiteShell } from "@/english/components/v4/SiteShell";

export const metadata: Metadata = { title: { default: "Transformix — Your technology partner for business growth", template: "%s | Transformix" }, description: "From AI-powered process automation to integrated digital platforms" };

export default function VersionFourLayout({ children }: { children: React.ReactNode }) {
  return <div className={tajawal.variable}><SiteShell>{children}</SiteShell></div>;
}
