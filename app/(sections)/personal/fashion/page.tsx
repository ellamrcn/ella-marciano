import type { Metadata } from "next";
import { descriptions, pageMetadata } from "@/app/seo";
import { fashionSeries } from "@/app/content";
import { ProjectIndex } from "@/app/(sections)/_components/project-index";

export const metadata: Metadata = pageMetadata({ title: "Fashion", description: descriptions.fashion, path: "/personal/fashion" });

export default function FashionPage() {
  return <ProjectIndex series={fashionSeries} />;
}
