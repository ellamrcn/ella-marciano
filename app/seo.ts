import type { Metadata } from "next";
import {
  anthropologicalSeries,
  clients,
  description as siteDescription,
  email,
  fashionSeries,
  films,
  instagram,
  selfPortrait,
  statement,
  type Series,
} from "@/app/content";

export const siteUrl = "https://ella-marciano.com";
export const siteName = "Ella Marciano";
export const siteTitle = "Ella Marciano, Photographer and Art Director";

const shareImage = { url: "/og.png", width: 1200, height: 630, alt: "Ella Marciano" };

const clip = (text: string, limit = 158) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

const listOf = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] ?? "");

export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title}, ${siteName}` : siteTitle;
  const summary = clip(description);
  return {
    title: title ?? { absolute: siteTitle },
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description: summary,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: summary, images: [shareImage.url] },
  };
}

export const descriptions = {
  home: siteDescription || "Ella Marciano, photographer and art director.",
  fashion: `Fashion editorials by Ella Marciano: ${listOf(fashionSeries.projects.slice(0, 4).map((project) => project.title))} and more. Photography, art direction, casting and creative vision by Ella.`,
  anthropological: `Anthropological Perspectives, documentary portrait series by Ella Marciano: ${listOf(anthropologicalSeries.projects.slice(0, 4).map((project) => project.title))} and more.`,
  videos: `Films directed by Ella Marciano: ${listOf([...new Set(films.map((film) => film.title.replace(/,? Episode\s\d+$/, "").replace(/ #\d+$/, "")))])}.`,
  clients: `Selected clients and publications of Ella Marciano, with her role on each project: ${listOf(clients.map((client) => client.name))}.`,
  about: statement[0] ?? "About Ella Marciano, photographer and art director.",
  contact: `Contact Ella Marciano, photographer and art director, for commissions and collaborations. Email ${email}${instagram.handle ? `, Instagram ${instagram.handle}` : ""}.`,
};

export function projectDescription(series: Series, title: string, photoCount: number) {
  return `${title}, a ${series.label} project by Ella Marciano in ${photoCount} photograph${photoCount === 1 ? "" : "s"}. Photography, art direction, casting and creative vision by Ella Marciano.`;
}

export function projectMetadata(series: Series, slug: string): Metadata {
  const project = series.projects.find((item) => item.slug === slug);
  if (!project) return pageMetadata({ title: series.label, description: descriptions.home, path: series.href });
  const withSection = `${project.title}, ${series.label}`;
  return pageMetadata({
    title: `${withSection}, ${siteName}`.length <= 62 ? withSection : project.title,
    description: projectDescription(series, project.title, project.photos.length),
    path: `${series.href}/${project.slug}`,
  });
}

const absolute = (path: string) => new URL(path, siteUrl).toString();

export function siteJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#ella`,
    name: siteName,
    url: siteUrl,
    jobTitle: ["Photographer", "Art Director"],
    description: descriptions.home,
    email: email ? `mailto:${email}` : undefined,
    sameAs: instagram.url ? [instagram.url] : undefined,
    image: selfPortrait ? absolute(selfPortrait.sources.at(-1)?.src ?? "") : undefined,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: descriptions.home,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#ella` },
      },
    ],
  };
}

export function projectJsonLd(series: Series, slug: string) {
  const project = series.projects.find((item) => item.slug === slug);
  if (!project) return null;
  const url = absolute(`${series.href}/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        url,
        name: project.title,
        description: projectDescription(series, project.title, project.photos.length),
        creator: { "@id": `${siteUrl}/#ella` },
        image: project.photos.map((photo) => ({
          "@type": "ImageObject",
          contentUrl: absolute(photo.sources.at(-1)?.src ?? ""),
          width: photo.width,
          height: photo.height,
          caption: photo.alt,
          creator: { "@id": `${siteUrl}/#ella` },
          creditText: siteName,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
          { "@type": "ListItem", position: 2, name: series.label, item: absolute(series.href) },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
