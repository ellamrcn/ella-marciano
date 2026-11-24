import type { Metadata, Viewport } from "next";
import { Mansalva, Newsreader } from "next/font/google";
import { description, introPhotos } from "@/app/content";
import "./globals.css";

const newsreader = Newsreader({ subsets: ["latin"], axes: ["opsz"], variable: "--font-newsreader" });
const mansalva = Mansalva({ subsets: ["latin"], weight: "400", variable: "--font-mansalva" });

const sharePhoto = introPhotos[0];
const shareSource = sharePhoto?.sources.find((source) => source.width >= 1100) ?? sharePhoto?.sources.at(-1);

export const metadata: Metadata = {
  metadataBase: new URL("https://ella-marciano.com"),
  title: { default: "Ella Marciano", template: "%s, Ella Marciano" },
  description,
  openGraph: {
    title: "Ella Marciano",
    description,
    url: "https://ella-marciano.com",
    siteName: "Ella Marciano",
    images:
      sharePhoto && shareSource
        ? [
            {
              url: shareSource.src,
              width: shareSource.width,
              height: Math.round((shareSource.width * sharePhoto.height) / sharePhoto.width),
            },
          ]
        : [],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2b8c9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${mansalva.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
