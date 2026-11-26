import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const projectId = "2jvwl47f";
const dataset = "production";
const apiVersion = "2025-02-19";
const imageDir = join(process.cwd(), "public/images/cms");
const contentFile = join(process.cwd(), "app/site-content.json");
const widths = [640, 1100, 2000];
const maxWidth = 2200;
const parallelDownloads = 8;

const imageFields = `{ alt, asset->{ _id, url, altText, "width": metadata.dimensions.width, "height": metadata.dimensions.height } }`;

const query = `{
  "settings": *[_id == "settings"][0]{
    email, instagramHandle, instagramUrl, personalCredit, videosCredit, description,
    "about": about[_type == "block"]{ "text": pt::text(@) }.text,
    "portrait": portrait${imageFields},
    "introPhotos": introPhotos[]${imageFields}
  },
  "projects": *[_type == "project" && defined(slug.current)] | order(orderRank) {
    title, "slug": slug.current, category, "photos": photos[]${imageFields}
  },
  "films": *[_type == "film"] | order(orderRank) { title, subject, place, url, aspect },
  "clients": *[_type == "client"] | order(orderRank) {
    name, role, roleBold, "images": images[]${imageFields},
    "publications": publications[]{ title, url, role, credit, date, "images": images[]${imageFields} }
  }
}`;

async function fetchContent() {
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Sanity query failed: ${response.status} ${await response.text()}`);
  return (await response.json()).result;
}

const downloads = new Map();

function toPhoto(image, fallbackAlt) {
  const asset = image?.asset;
  if (!asset?.url) return null;
  const name = asset._id.replace(/^image-/, "").replace(/-\d+x\d+-\w+$/, "");
  const largest = Math.min(asset.width, maxWidth);
  const sizes = [...widths.filter((width) => width < largest), largest];
  const sources = sizes.map((width) => {
    const file = `${name}-${width}.jpg`;
    downloads.set(file, `${asset.url}?w=${width}&fm=jpg&q=82&fit=max`);
    return { src: `/images/cms/${file}`, width };
  });
  return {
    width: asset.width,
    height: asset.height,
    alt: image.alt || asset.altText || fallbackAlt,
    sources,
  };
}

const photoList = (images, fallbackAlt) => (images ?? []).map((image) => toPhoto(image, fallbackAlt)).filter(Boolean);

async function download(file, source) {
  const target = join(imageDir, file);
  if (existsSync(target)) return;
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(source);
    if (response.ok) {
      await writeFile(target, Buffer.from(await response.arrayBuffer()));
      return;
    }
    if (attempt === 3) throw new Error(`Image download failed: ${response.status} ${source}`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
  }
}

async function downloadAll() {
  await mkdir(imageDir, { recursive: true });
  const queue = [...downloads];
  const workers = Array.from({ length: parallelDownloads }, async () => {
    for (let next = queue.shift(); next; next = queue.shift()) await download(...next);
  });
  await Promise.all(workers);
  for (const file of await readdir(imageDir)) {
    if (!downloads.has(file)) await rm(join(imageDir, file));
  }
}

const result = await fetchContent();
const settings = result.settings ?? {};

const toSlug = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uniqueSlugs = (projects) => {
  const taken = new Set();
  return projects.map((project) => {
    const base = toSlug(project.slug) || toSlug(project.title) || "project";
    let slug = base;
    for (let count = 2; taken.has(slug); count += 1) slug = `${base}-${count}`;
    taken.add(slug);
    return { ...project, slug };
  });
};

const projectsIn = (category) =>
  uniqueSlugs(
    result.projects
      .filter((project) => project.category === category)
      .map((project) => ({ slug: project.slug, title: project.title, photos: photoList(project.photos, project.title) }))
      .filter((project) => project.photos.length > 0),
  );

const content = {
  settings: {
    email: settings.email ?? "",
    instagram: { handle: settings.instagramHandle ?? "", url: settings.instagramUrl ?? "" },
    personalCredit: settings.personalCredit ?? "",
    videosCredit: settings.videosCredit ?? "",
    description: settings.description ?? "",
    about: settings.about ?? [],
    portrait: toPhoto(settings.portrait, "Ella Marciano"),
    introPhotos: photoList(settings.introPhotos, "Photograph by Ella Marciano"),
  },
  fashion: projectsIn("fashion"),
  anthropological: projectsIn("anthropological"),
  films: result.films.map((film) => ({
    title: film.title,
    subject: film.subject ?? "",
    place: film.place ?? "",
    url: film.url,
    aspect: film.aspect ?? "16 / 9",
  })),
  clients: result.clients.map((client) => ({
    name: client.name,
    role: client.role,
    roleBold: client.roleBold === true,
    images: photoList(client.images, client.name),
    publications: (client.publications ?? []).map((publication) => ({
      title: publication.title,
      url: publication.url ?? undefined,
      role: publication.role ?? undefined,
      credit: publication.credit ?? undefined,
      date: publication.date ?? undefined,
      images: photoList(publication.images, publication.title),
    })),
  })),
};

await downloadAll();
await writeFile(contentFile, JSON.stringify(content, null, 2) + "\n");
console.log(
  `Synced ${content.fashion.length + content.anthropological.length} projects, ${content.films.length} films, ${content.clients.length} clients, ${downloads.size} images`,
);
