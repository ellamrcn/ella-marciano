import type { Metadata } from "next";
import { fashionSeries } from "@/app/content";
import { ProjectIndex } from "@/app/(sections)/_components/project-index";

export const metadata: Metadata = { title: "Fashion" };

export default function FashionPage() {
  return <ProjectIndex series={fashionSeries} />;
}
