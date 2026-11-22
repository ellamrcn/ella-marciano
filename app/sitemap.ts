import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://ella-marciano.com/", changeFrequency: "monthly", priority: 1 }];
}
