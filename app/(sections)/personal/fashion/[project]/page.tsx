import type { Metadata } from "next";
import { fashionSeries } from "@/app/content";
import { ProjectPage } from "@/app/(sections)/_components/project-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return fashionSeries.projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata(props: PageProps<"/personal/fashion/[project]">): Promise<Metadata> {
  const { project } = await props.params;
  const match = fashionSeries.projects.find((item) => item.slug === project);
  return { title: match ? `${match.title}, Fashion` : "Fashion" };
}

export default async function FashionProjectPage(props: PageProps<"/personal/fashion/[project]">) {
  const { project } = await props.params;
  return <ProjectPage series={fashionSeries} slug={project} />;
}
