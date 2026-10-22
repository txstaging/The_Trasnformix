import type { Metadata } from "next";
import { ContactPage } from "@/components/v3/ContactPage";
import { isRequestKey } from "@/components/v2/contact/options";

export const metadata: Metadata = { title: "تواصل معنا | Transformix" };

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service } = await searchParams;
  return <ContactPage request={isRequestKey(service) ? service : undefined} />;
}
