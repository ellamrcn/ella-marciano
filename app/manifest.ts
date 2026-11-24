import type { MetadataRoute } from "next";
import { descriptions, siteName, siteTitle } from "@/app/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: siteName,
    description: descriptions.home,
    start_url: "/",
    display: "browser",
    background_color: "#f2b8c9",
    theme_color: "#f2b8c9",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
