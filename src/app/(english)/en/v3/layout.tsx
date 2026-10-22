import { SiteShell } from "@/english/components/v3/SiteShell";
import { tajawal } from "@/lib/fonts";

export default function VersionThreeLayout({ children }: { children: React.ReactNode }) {
  return <div className={tajawal.variable}><SiteShell>{children}</SiteShell></div>;
}
