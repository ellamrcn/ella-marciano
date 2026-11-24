import type { Metadata } from "next";
import { descriptions, pageMetadata } from "@/app/seo";
import { anthropologicalSeries } from "@/app/content";
import { ProjectIndex } from "@/app/(sections)/_components/project-index";

export const metadata: Metadata = pageMetadata({ title: "Anthropological Perspectives", description: descriptions.anthropological, path: "/personal/anthropological-perspectives" });

export default function AnthropologicalPerspectivesPage() {
  return <ProjectIndex series={anthropologicalSeries} />;
}
