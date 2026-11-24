import siteContent from "@/app/site-content.json";

export type PhotoSource = { src: string; width: number };

export type Photo = {
  width: number;
  height: number;
  alt: string;
  sources: PhotoSource[];
};

export type Project = { slug: string; title: string; photos: Photo[] };

export type Series = { label: string; href: string; projects: Project[] };

export type Publication = {
  title: string;
  url?: string;
  role?: string;
  credit?: string;
  date?: string;
  images: Photo[];
};

export type Client = { name: string; role: string; images: Photo[]; publications: Publication[] };

export type Film = { title: string; subject: string; place: string; url: string; aspect: string };

type SiteContent = {
  settings: {
    email: string;
    instagram: { handle: string; url: string };
    personalCredit: string;
    videosCredit: string;
    description: string;
    about: string[];
    portrait: Photo | null;
    introPhotos: Photo[];
  };
  fashion: Project[];
  anthropological: Project[];
  films: Film[];
  clients: Client[];
};

const content = siteContent as SiteContent;

export function photoSrc(item: Photo) {
  return item.sources[0].src;
}

export function photoSrcSet(item: Photo) {
  return item.sources.map((source) => `${source.src} ${source.width}w`).join(", ");
}

export const photoKey = (item: Photo) => item.sources[0].src;

export const { email, instagram, personalCredit, videosCredit, description, introPhotos } = content.settings;

export const statement = content.settings.about;

export const selfPortrait = content.settings.portrait;

export const clients = content.clients;

export const films = content.films;

export function filmEmbed(film: Film) {
  const youtube = film.url.match(/(?:[?&]v=|youtu\.be\/)([\w-]+)/);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0`;
  const vimeo = film.url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1&title=0&byline=0&portrait=0`;
  return film.url;
}

export type NavLink = { label: string; href: string };

export const fashionSeries: Series = {
  label: "Fashion",
  href: "/personal/fashion",
  projects: content.fashion,
};

export const anthropologicalSeries: Series = {
  label: "Anthropological Perspectives",
  href: "/personal/anthropological-perspectives",
  projects: content.anthropological,
};

export const personalCategories: NavLink[] = [
  { label: fashionSeries.label, href: fashionSeries.href },
  { label: anthropologicalSeries.label, href: anthropologicalSeries.href },
  { label: "Videos", href: "/personal/videos" },
];

export const sectionLinks = {
  clients: { label: "Selected Clients & Publications", href: "/clients" },
  me: { label: "About Me", href: "/me" },
  contact: { label: "Contact", href: "/contact" },
} satisfies Record<string, NavLink>;
