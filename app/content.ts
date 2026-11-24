import { archivePhoto } from "@/app/archive";

export type PhotoSource = { src: string; width: number };

export type Photo = {
  width: number;
  height: number;
  alt: string;
  sources: PhotoSource[];
};

const photo = (slug: string, width: number, height: number, alt: string, widths = [640, 1100, 2200]): Photo => ({
  width,
  height,
  alt,
  sources: widths.map((size) => ({ src: `/images/photos/${slug}-${size}.jpg`, width: size })),
});

export function photoSrc(item: Photo) {
  return item.sources[0].src;
}

export function photoSrcSet(item: Photo) {
  return item.sources.map((source) => `${source.src} ${source.width}w`).join(", ");
}

export const photoKey = (item: Photo) => item.sources[0].src;

export const photos = {
  featherShowgirl: photo("office-6", 2200, 1468, "A showgirl in a red feather headdress laughing, hands on her chest"),
  pinkShowgirl: photo("office-2", 1408, 2200, "A platinum blonde woman in a pink nightgown, hands pressed to her cheeks"),
  saluteShowgirl: photo("office-7", 1506, 2200, "A dancer in a jewelled leotard and plumed hat saluting"),
  lollipop: photo("img-3414", 2200, 1466, "Two women in veils and pink tweed licking lollipops"),
  closeKiss: photo("img-3399", 2200, 1466, "Two women in red lipstick, foreheads touching"),
  leopardBed: photo("img-3389", 1466, 2200, "A man and two women lying across a bed under a leopard print headboard"),
  officeCover: photo("img-4607", 1200, 1600, "Office Magazine cover, a smiling blonde woman with red drop earrings", [640, 1600]),
  velvetStairs: photo("img-4651", 1819, 2200, "A blonde woman in blue velvet lying across green carpeted stairs"),
  elvisBack: photo("01067413", 1650, 2200, "An Elvis tribute performer in a white jumpsuit seen from behind outside a colonnaded house"),
  elvisChest: photo("01067497", 2200, 1648, "Close up of a studded white jumpsuit open over a chest and an ankh pendant"),
};

export const email = "ellamarciano3@gmail.com";
export const instagram = { handle: "@ellmarciano", url: "https://www.instagram.com/ellmarciano/" };

export type NavLink = { label: string; href: string };

export const personalCategories: NavLink[] = [
  { label: "Fashion", href: "/personal/fashion" },
  { label: "Anthropological Perspectives", href: "/personal/anthropological-perspectives" },
  { label: "Videos", href: "/personal/videos" },
];

export const sectionLinks = {
  clients: { label: "Selected Clients & Publications", href: "/clients" },
  me: { label: "Me", href: "/me" },
  contact: { label: "Contact", href: "/contact" },
} satisfies Record<string, NavLink>;

export type Tile = { photo: Photo; caption: string; href: string };

export const homeTiles: Tile[] = [
  { photo: photos.officeCover, caption: "Office Magazine, Iris Law", href: "/clients" },
  { photo: archivePhoto("px-15"), caption: "Fashion", href: "/personal/fashion" },
  { photo: photos.featherShowgirl, caption: "Office Magazine, Issue 23", href: "/clients" },
  { photo: photos.elvisBack, caption: "Anthropological Perspectives", href: "/personal/anthropological-perspectives" },
  { photo: archivePhoto("px-08"), caption: "Playboy", href: "/clients" },
  { photo: photos.closeKiss, caption: "Office Magazine, The Love Issue", href: "/clients" },
  { photo: archivePhoto("px-24"), caption: "Videos, The Simple Life", href: "/personal/videos" },
  { photo: archivePhoto("px-47"), caption: "Me", href: "/me" },
  { photo: archivePhoto("px-03"), caption: "Fashion", href: "/personal/fashion" },
  { photo: archivePhoto("px-11"), caption: "Anthropological Perspectives", href: "/personal/anthropological-perspectives" },
  { photo: photos.velvetStairs, caption: "Office Magazine, Iris Law", href: "/clients" },
  { photo: archivePhoto("px-45"), caption: "Anthropological Perspectives", href: "/personal/anthropological-perspectives" },
  { photo: archivePhoto("px-23"), caption: "Fashion", href: "/personal/fashion" },
  { photo: photos.pinkShowgirl, caption: "Office Magazine, Issue 23", href: "/clients" },
  { photo: archivePhoto("px-12"), caption: "Playboy", href: "/clients" },
  { photo: photos.lollipop, caption: "Office Magazine, The Love Issue", href: "/clients" },
];

export const introPhotos: Photo[] = [
  photos.featherShowgirl,
  archivePhoto("px-15"),
  photos.officeCover,
  photos.elvisBack,
  archivePhoto("px-03"),
  photos.closeKiss,
  archivePhoto("px-45"),
  photos.pinkShowgirl,
  archivePhoto("px-23"),
  archivePhoto("px-11"),
  photos.velvetStairs,
  archivePhoto("px-47"),
  archivePhoto("px-24"),
  photos.saluteShowgirl,
  archivePhoto("px-09"),
  photos.lollipop,
  archivePhoto("px-30"),
  archivePhoto("px-49"),
];
