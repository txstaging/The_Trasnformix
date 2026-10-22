import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/v4/Works";
import { WORK_FILTERS } from "@/components/sections/works/projects";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return WORK_FILTERS[0].projects.map(project => ({ slug: project.key })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: WORK_FILTERS[0].projects.find(project => project.key === slug)?.title ?? "أعمالنا" };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!WORK_FILTERS[0].projects.some(project => project.key === slug)) notFound();
  return <ProjectPage slug={slug} />;
}
