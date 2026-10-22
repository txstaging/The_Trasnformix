import type { Metadata } from "next";
import { tajawal } from "@/lib/fonts";
import { SiteShell } from "@/components/v4/SiteShell";

export const metadata: Metadata = { title: { default: "Transformix — شريكك التقني لتطوير الأعمال", template: "%s | Transformix" }, description: "من أتمتة العمليات بالذكاء الاصطناعي إلى المنصات الرقمية المتكاملة" };

export default function VersionFourLayout({ children }: { children: React.ReactNode }) {
  return <div className={tajawal.variable}><SiteShell>{children}</SiteShell></div>;
}
