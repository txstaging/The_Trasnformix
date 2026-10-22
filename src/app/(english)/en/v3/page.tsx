import type { Metadata } from "next";
import { HomeV3 } from "@/english/components/v3/HomeV3";

export const metadata: Metadata = {
  title: "Transformix | Your technology partner for business growth",
};

export default function VersionThree() {
  return <HomeV3 />;
}
