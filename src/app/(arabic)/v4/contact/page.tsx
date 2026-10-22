import { ContactPage } from "@/components/v4/Pages";
import { isRequestKey } from "@/components/v2/contact/options";
export const metadata = { title: "تواصل معنا" };
export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service } = await searchParams;
  return <ContactPage defaultRequest={isRequestKey(service) ? service : undefined} />;
}
