import type { Metadata } from "next";
import { anthropologicalSeries } from "@/app/(sections)/data";
import { ProjectPage } from "@/app/(sections)/_components/project-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return anthropologicalSeries.projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata(props: PageProps<"/personal/anthropological-perspectives/[project]">): Promise<Metadata> {
  const { project } = await props.params;
  const match = anthropologicalSeries.projects.find((item) => item.slug === project);
  return { title: match ? `${match.title}, Anthropological Perspectives` : "Anthropological Perspectives" };
}

export default async function AnthropologicalPerspectivesProjectPage(props: PageProps<"/personal/anthropological-perspectives/[project]">) {
  const { project } = await props.params;
  return <ProjectPage series={anthropologicalSeries} slug={project} />;
}
