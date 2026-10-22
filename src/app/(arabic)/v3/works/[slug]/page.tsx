import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORK_FILTERS } from "@/components/sections/works/projects";
import { ProjectPage } from "@/components/v3/WorksPages";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() { return WORK_FILTERS[0].projects.map(project => ({ slug: project.key })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = WORK_FILTERS[0].projects.find(item => item.key === slug);
  return { title: `${project?.title ?? "أعمالنا"} | Transformix` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!WORK_FILTERS[0].projects.some(project => project.key === slug)) notFound();
  return <ProjectPage slug={slug} />;
}
