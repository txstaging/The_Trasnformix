import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage, MobileServicePage } from "@/components/v3/ServicesPages";
import { serviceCatalog, serviceSlugs } from "@/components/v3/service-catalog";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() { return serviceSlugs.map(slug => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceCatalog.find(item => item.slug === slug);
  return { title: `${service?.content.crumb ?? "تطوير تطبيقات الموبايل"} | Transformix`, description: service?.content.lead };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!serviceSlugs.includes(slug)) notFound();
  return slug === "mobile-development" ? <MobileServicePage /> : <ServicePage slug={slug} />;
}
