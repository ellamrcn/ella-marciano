import { photos, type Photo } from "@/app/content";
import { archive, archiveCaptioned } from "@/app/archive";

export type Project = { slug: string; title: string; photos: Photo[] };

export type Series = { label: string; href: string; projects: Project[] };

const projectTitle = (caption: string) => caption.split(", ")[0].replace(/^Behind The Curtains$/, "Behind The Curtain");

const slugify = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function groupProjects(items: { caption: string; photo: Photo }[]): Project[] {
  const projects = new Map<string, Project>();
  for (const { caption, photo } of items) {
    const title = projectTitle(caption);
    const slug = slugify(title);
    const existing = projects.get(slug);
    if (existing) existing.photos.push(photo);
    else projects.set(slug, { slug, title, photos: [photo] });
  }
  return [...projects.values()];
}

export const fashionSeries: Series = {
  label: "Fashion",
  href: "/personal/fashion",
  projects: groupProjects(archiveCaptioned("fashion")),
};

export const anthropologicalSeries: Series = {
  label: "Anthropological Perspectives",
  href: "/personal/anthropological-perspectives",
  projects: [
    { slug: "two-lives-one-man", title: "Two Lives, One Man", photos: [photos.elvisBack, photos.elvisChest] },
    ...groupProjects(archiveCaptioned("anthropological")),
  ],
};

export const selfPortrait: Photo | undefined = archive("self")[0];

export type Publication = {
  title: string;
  url?: string;
  role?: string;
  credit?: string;
  date?: string;
  images?: Photo[];
};

export type Client = {
  name: string;
  role: string;
  images?: Photo[];
  publications: Publication[];
};

export const clients: Client[] = [
  {
    name: "Playboy",
    role: "Art Director, Photographer, Producer",
    images: archive("playboy"),
    publications: [
      {
        title: "La Vie Est Belle: Meet Photographer Ella Marciano",
        url: "https://www.playboy.com/read/influencer-features/la-vie-est-belle-meet-photographer-ella-marciano",
      },
      { title: "Ella and Naya’s Playboy Peach Pie Will Have You Drooling" },
    ],
  },
  {
    name: "Office Magazine",
    role: "Editor-at-Large",
    publications: [
      {
        title: "Iris Law",
        url: "https://officemagazine.net/iris-law-0",
        role: "Associate Creative Director",
        credit: "Photography by Zoey Grossman",
        date: "Issue 23, November 2026",
        images: [photos.officeCover, photos.velvetStairs],
      },
      {
        title: "Issue 23",
        role: "Creative Director and Producer",
        images: [photos.featherShowgirl, photos.pinkShowgirl, photos.saluteShowgirl],
      },
      {
        title: "To Love is To Share, story for The Love Issue #22",
        url: "https://officemagazine.net/love-share",
        role: "Creative Director and Producer",
        images: [photos.closeKiss, photos.leopardBed, photos.lollipop],
      },
      {
        title: "Two Lives, One Man",
        url: "https://officemagazine.net/two-lives-one-man",
        role: "Words and Photography",
        date: "October 2026",
      },
      {
        title: "The Inside View",
        url: "https://officemagazine.net/inside-view",
        role: "Direction, Interview and Words",
        credit: "Photography by Aimie",
        date: "October 2026",
      },
      {
        title: "Stu Mead: the aesthetics of innocence and the viewer who can no longer look away",
        url: "https://officemagazine.net/stu-mead-aesthetics-innocence-and-viewer-who-can-no-longer-look-away",
      },
    ],
  },
  {
    name: "Vogue France",
    role: "Fashion Assistant and Assistant to the Head of Editorial Content",
    publications: [
      {
        title: "Gisele Bündchen est notre ultime muse bien-être en cover du Vogue France de juin-juillet 2025",
        url: "https://www.vogue.fr/article/gisele-bundchen-bien-etre-cover-vogue-france-juin-juillet-2025",
      },
      {
        title: "Imaan Hammam est la muse wellness de notre nouvelle cover digitale",
        url: "https://www.vogue.fr/article/imaan-hammam-wellness-cover-digitale-juin-juillet",
      },
      {
        title: "5 questions à Gisele Bündchen qui entame une nouvelle phase de sa vie, plus libre",
        url: "https://www.vogue.fr/article/interview-gisele-bundchen-nouvelle-vie-plus-libre-juin-juillet-2025-vogue-france",
      },
    ],
  },
  {
    name: "Interview Magazine",
    role: "Production Manager",
    publications: [
      {
        title: "Marlon Wayans Tells Channing Tatum How He’s Upending Hollywood’s Hierarchy",
        url: "https://www.interviewmagazine.com/film/marlon-wayans-tells-channing-tatum-how-hes-upending-hollywoods-hierarchy",
      },
    ],
  },
  {
    name: "V Magazine",
    role: "Production and Styling Assistant",
    publications: [
      {
        title: "Rock On: Prada Reaches New Heights This Spring",
        url: "https://vmagazine.com/article/rock-on-prada-to-new-heights/",
      },
    ],
  },
];

export type Film = {
  title: string;
  subject: string;
  place: string;
  url: string;
  aspect?: string;
};

export function filmEmbed(film: Film) {
  const youtube = film.url.match(/[?&]v=([\w-]+)/);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0`;
  const vimeo = film.url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1&title=0&byline=0&portrait=0`;
  return film.url;
}

export const films: Film[] = [
  {
    title: "The Simple Life",
    subject: "Interview with Ben, farmer from the Amish Community",
    place: "Lancaster County, Pennsylvania",
    url: "https://vimeo.com/1058245760",
  },
  {
    title: "Red Light District #1",
    subject: "Interview with Karin, a former nurse who now works as an escort in brothels",
    place: "Amsterdam, The Netherlands",
    url: "https://vimeo.com/1058324582",
  },
  {
    title: "Red Light District #2",
    subject: "Interview with Paola, a transgender woman from Cuba who works in the Red Light District",
    place: "Amsterdam, The Netherlands",
    url: "https://vimeo.com/1058325988",
  },
  {
    title: "Under The Queens, Episode\u00a01",
    subject: "Louisiana Voodoo with Mambo Sallie Ann Glassman",
    place: "New Orleans, Louisiana",
    url: "https://www.youtube.com/watch?v=eDgL28jn38o",
  },
  {
    title: "Under The Queens, Episode\u00a02",
    subject: "Louisiana Voodoo with Mambo Miriam Chamani",
    place: "New Orleans, Louisiana",
    url: "https://www.youtube.com/watch?v=HFz9ToS03tw",
  },
  {
    title: "Under The Queens",
    subject: "Louisiana Voodoo, told by three New Orleans priestesses",
    place: "New Orleans, Louisiana",
    url: "https://www.youtube.com/watch?v=jn5_DQllpK0",
    aspect: "4 / 3",
  },
];

export const statement = [
  "What began in 2022 as a documentary challenging stereotypes of sex workers has since blossomed into the creation of my own world, inspired by the fearless women of my hometown; and the ambivalence between a culture of excess and deeply rooted Puritan values in the United States.",
  "I am drawn to blending an anthropological approach with an aesthetic that celebrates the often-overlooked beauty of marginalised voices, while drawing inspiration from the timeless elegance of fashion editorials.",
  "This is essentially the vision and sensibility that inform all of my projects.",
];
