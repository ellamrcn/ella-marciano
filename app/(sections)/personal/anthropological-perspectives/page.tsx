import type { Metadata } from "next";
import { anthropologicalSeries } from "@/app/content";
import { ProjectIndex } from "@/app/(sections)/_components/project-index";

export const metadata: Metadata = { title: "Anthropological Perspectives" };

export default function AnthropologicalPerspectivesPage() {
  return <ProjectIndex series={anthropologicalSeries} />;
}
