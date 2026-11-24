import type { Metadata } from "next";
import { fashionSeries } from "@/app/content";
import { projectJsonLd, projectMetadata } from "@/app/seo";
import { JsonLd } from "@/components/json-ld";
import { ProjectPage } from "@/app/(sections)/_components/project-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return fashionSeries.projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata(props: PageProps<"/personal/fashion/[project]">): Promise<Metadata> {
  const { project } = await props.params;
  return projectMetadata(fashionSeries, project);
}

export default async function FashionProjectPage(props: PageProps<"/personal/fashion/[project]">) {
  const { project } = await props.params;
  return (
    <>
      <JsonLd data={projectJsonLd(fashionSeries, project)} />
      <ProjectPage series={fashionSeries} slug={project} />
    </>
  );
}
