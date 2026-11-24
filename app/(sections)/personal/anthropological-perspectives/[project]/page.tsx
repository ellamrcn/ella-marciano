import type { Metadata } from "next";
import { anthropologicalSeries } from "@/app/content";
import { projectJsonLd, projectMetadata } from "@/app/seo";
import { JsonLd } from "@/components/json-ld";
import { ProjectPage } from "@/app/(sections)/_components/project-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return anthropologicalSeries.projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata(props: PageProps<"/personal/anthropological-perspectives/[project]">): Promise<Metadata> {
  const { project } = await props.params;
  return projectMetadata(anthropologicalSeries, project);
}

export default async function AnthropologicalPerspectivesProjectPage(props: PageProps<"/personal/anthropological-perspectives/[project]">) {
  const { project } = await props.params;
  return (
    <>
      <JsonLd data={projectJsonLd(anthropologicalSeries, project)} />
      <ProjectPage series={anthropologicalSeries} slug={project} />
    </>
  );
}
