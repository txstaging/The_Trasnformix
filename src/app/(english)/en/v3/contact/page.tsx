import type { Metadata } from "next";
import { ContactPage } from "@/english/components/v3/ContactPage";
import { isRequestKey } from "@/english/components/v2/contact/options";

export const metadata: Metadata = { title: "Contact Us | Transformix" };

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service } = await searchParams;
  return <ContactPage request={isRequestKey(service) ? service : undefined} />;
}
