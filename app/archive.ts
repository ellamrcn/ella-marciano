import type { Photo } from "@/app/content";

type ArchiveCategory = "fashion" | "anthropological" | "playboy" | "self" | "unsorted";

type ArchiveEntry = { id: string; width: number; height: number; caption: string; category: ArchiveCategory };

const entries: ArchiveEntry[] = [
  { id: "px-02", width: 2000, height: 1333, caption: "Behind The Curtains, Paris, 2024", category: "anthropological" },
  { id: "px-03", width: 1500, height: 1200, caption: "Holy Days, Paris, 2023", category: "fashion" },
  { id: "px-04", width: 2000, height: 1500, caption: "Léo & Lulu, Adult Movie Actors, Paris, 2025", category: "anthropological" },
  { id: "px-05", width: 2000, height: 1500, caption: "Léo & Lulu, Adult Movie Actors, Paris, 2025", category: "anthropological" },
  { id: "px-06", width: 2000, height: 1500, caption: "Trapped in an American fever dream, Los Angeles, CA, 2025", category: "anthropological" },
  { id: "px-07", width: 2000, height: 1500, caption: "Summer Heat Wave, Los Angeles CA, 2025", category: "fashion" },
  { id: "px-08", width: 2000, height: 3000, caption: "For Playboy, Paris, 2024", category: "playboy" },
  { id: "px-09", width: 2000, height: 1125, caption: "Ivy League Boy, Paris, 2026", category: "fashion" },
  { id: "px-10", width: 2000, height: 2666, caption: "Hungover Portrait, Paris, 2024", category: "fashion" },
  { id: "px-11", width: 1365, height: 2048, caption: "Portrait of a Sex Worker, Paris, 2023", category: "anthropological" },
  { id: "px-12", width: 2000, height: 3001, caption: "For Playboy, Paris, 2024", category: "playboy" },
  { id: "px-13", width: 2000, height: 1500, caption: "Girls From My Hometown, Marseille, 2024", category: "anthropological" },
  { id: "px-14", width: 2000, height: 1500, caption: "Untitled, Paris, 2023", category: "fashion" },
  { id: "px-15", width: 2000, height: 1500, caption: "Teenage Fever, Paris, 2025", category: "fashion" },
  { id: "px-16", width: 2000, height: 1500, caption: "Valérie, Marseille, 2025", category: "anthropological" },
  { id: "px-17", width: 2000, height: 1500, caption: "The Show Died Tonight, Paris, 2025", category: "fashion" },
  { id: "px-18", width: 2000, height: 2667, caption: "Somewhere in California, Los Angeles CA, 2026", category: "anthropological" },
  { id: "px-19", width: 2000, height: 2500, caption: "Hungover Portrait, Paris, 2024", category: "fashion" },
  { id: "px-20", width: 2000, height: 1500, caption: "Freedom & Unity, Paris, 2023", category: "fashion" },
  { id: "px-21", width: 2000, height: 1333, caption: "Behind The Curtain, Paris, 2024", category: "anthropological" },
  { id: "px-22", width: 2000, height: 1500, caption: "Just Married, Paris, 2023", category: "anthropological" },
  { id: "px-23", width: 1727, height: 2585, caption: "Italian Dinner, Paris, 2024", category: "fashion" },
  { id: "px-24", width: 2000, height: 1335, caption: "The Simple Life, Lancaster PA, 2024", category: "anthropological" },
  { id: "px-25", width: 2000, height: 1333, caption: "Behind The Curtain, Paris, 2024", category: "anthropological" },
  { id: "px-26", width: 2000, height: 1500, caption: "Cigarette Break, Los Angeles CA, 2025", category: "anthropological" },
  { id: "px-27", width: 2000, height: 2666, caption: "Summer Heat Wave, Los Angeles CA, 2025", category: "fashion" },
  { id: "px-28", width: 1200, height: 1500, caption: "Holy Days, Paris, 2023", category: "fashion" },
  { id: "px-29", width: 1752, height: 2624, caption: "Italian Dinner, Paris, 2024", category: "fashion" },
  { id: "px-30", width: 1674, height: 2507, caption: "Her and The City, New York, 2024", category: "fashion" },
  { id: "px-31", width: 2000, height: 1457, caption: "Served Well Hot, Self Portrait, Marseille, 2022", category: "fashion" },
  { id: "px-32", width: 2000, height: 1333, caption: "Getting ready to meet your man, Paris, 2024", category: "fashion" },
  { id: "px-33", width: 1365, height: 2048, caption: "Portrait of a Sex Worker, Paris, 2023", category: "anthropological" },
  { id: "px-34", width: 2000, height: 1333, caption: "La Confusion : l'âge adulte, Paris, 2023", category: "fashion" },
  { id: "px-35", width: 2000, height: 1500, caption: "Like Mother Like Daughter, Marseille, 2023", category: "anthropological" },
  { id: "px-36", width: 2000, height: 1333, caption: "For Playboy, Paris, 2024", category: "playboy" },
  { id: "px-37", width: 1365, height: 2048, caption: "Portrait of a Sex Worker, Paris, 2023", category: "anthropological" },
  { id: "px-38", width: 2000, height: 1500, caption: "Midnight Whispers, Crestline CA, 2025", category: "fashion" },
  { id: "px-39", width: 2000, height: 1500, caption: "The Mask, Paris, 2023", category: "fashion" },
  { id: "px-40", width: 2000, height: 1333, caption: "Getting ready to meet your man, Paris, 2024", category: "fashion" },
  { id: "px-41", width: 2000, height: 1333, caption: "For Playboy, Paris, 2024", category: "playboy" },
  { id: "px-42", width: 1466, height: 2195, caption: "Her and The City, New York, 2024", category: "fashion" },
  { id: "px-43", width: 2000, height: 1500, caption: "Untitled, Paris, 2023", category: "fashion" },
  { id: "px-44", width: 2000, height: 1501, caption: "Untitled, Paris, 2023", category: "fashion" },
  { id: "px-45", width: 2000, height: 1500, caption: "Lé Girls, Phoenix AZ, 2025", category: "anthropological" },
  { id: "px-46", width: 2000, height: 2500, caption: "Hungover Portrait, Paris, 2024", category: "fashion" },
  { id: "px-47", width: 2000, height: 1600, caption: "A tribute to les Cagoles, Self Portrait, Paris, 2024", category: "self" },
  { id: "px-48", width: 2000, height: 1499, caption: "Watch Out, Marseille, 2023", category: "anthropological" },
  { id: "px-49", width: 2000, height: 1500, caption: "Flex Appeal, Los Angeles CA, 2025", category: "anthropological" },
  { id: "px-50", width: 2000, height: 1500, caption: "For Susu Gili, Los Angeles CA, 2026", category: "unsorted" },
  { id: "px-51", width: 2000, height: 1620, caption: "Mafalda, Paris, 2023", category: "anthropological" },
  { id: "px-52", width: 2000, height: 669, caption: "SEX, Marseille, 2024", category: "fashion" },
  { id: "px-53", width: 2000, height: 1500, caption: "Lauren Powers, Orange County CA, 2025", category: "anthropological" },
];

const toPhoto = (entry: ArchiveEntry): Photo => ({
  width: entry.width,
  height: entry.height,
  alt: entry.caption,
  sources: [
    { src: `/images/archive/${entry.id}-640.jpg`, width: 640 },
    { src: `/images/archive/${entry.id}-1100.jpg`, width: 1100 },
    ...(entry.width > 1100 ? [{ src: `/images/archive/${entry.id}-2000.jpg`, width: entry.width }] : []),
  ],
});

export const archive = (category: ArchiveCategory) => entries.filter((entry) => entry.category === category).map(toPhoto);

export const archiveCaptioned = (category: ArchiveCategory) =>
  entries.filter((entry) => entry.category === category).map((entry) => ({ caption: entry.caption, photo: toPhoto(entry) }));

export const archivePhoto = (id: string) => {
  const entry = entries.find((item) => item.id === id);
  if (!entry) throw new Error(`Unknown archive photo ${id}`);
  return toPhoto(entry);
};
