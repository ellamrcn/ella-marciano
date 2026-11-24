import type { MetadataRoute } from "next";
import { anthropologicalSeries, fashionSeries } from "@/app/content";
import { siteUrl } from "@/app/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });
  const projects = [fashionSeries, anthropologicalSeries].flatMap((series) =>
    series.projects.map((project) => page(`${series.href}/${project.slug}`, 0.6)),
  );
  return [
    page("/", 1),
    page(fashionSeries.href, 0.9),
    page(anthropologicalSeries.href, 0.9),
    page("/personal/videos", 0.8),
    page("/clients", 0.9),
    page("/me", 0.8),
    page("/contact", 0.7),
    ...projects,
  ];
}
