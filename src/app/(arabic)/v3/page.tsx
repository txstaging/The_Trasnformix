import type { Metadata } from "next";
import { HomeV3 } from "@/components/v3/HomeV3";

export const metadata: Metadata = {
  title: "Transformix | شريكك التقني لتطوير الأعمال",
};

export default function VersionThree() {
  return <HomeV3 />;
}
