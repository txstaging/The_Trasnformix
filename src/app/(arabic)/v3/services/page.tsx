import type { Metadata } from "next";
import { ServicesPage } from "@/components/v3/ServicesPages";

export const metadata: Metadata = { title: "الخدمات | Transformix" };

export default function Page() { return <ServicesPage />; }
