import { ContactPage } from "@/english/components/v4/Pages";
import { isRequestKey } from "@/english/components/v2/contact/options";
export const metadata = { title: "Contact us" };
export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service } = await searchParams;
  return <ContactPage defaultRequest={isRequestKey(service) ? service : undefined} />;
}
