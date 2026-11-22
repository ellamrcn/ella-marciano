import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Grand_Hotel, Kristi, Mansalva, Reenie_Beanie } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], variable: "--font-bodoni" });
const grandHotel = Grand_Hotel({ subsets: ["latin"], weight: "400", variable: "--font-grand-hotel" });
const kristi = Kristi({ subsets: ["latin"], weight: "400", variable: "--font-kristi" });
const mansalva = Mansalva({ subsets: ["latin"], weight: "400", variable: "--font-mansalva" });
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400", variable: "--font-reenie" });

const description =
  "Ella Marciano, photographer and art director. Personal work between fashion editorial and anthropology, and selected clients and publications.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ella-marciano.com"),
  title: { default: "Ella Marciano", template: "%s, Ella Marciano" },
  description,
  openGraph: {
    title: "Ella Marciano",
    description,
    url: "https://ella-marciano.com",
    siteName: "Ella Marciano",
    images: [{ url: "/images/photos/office-6-1100.jpg", width: 1100, height: 734 }],
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
      className={`${bodoni.variable} ${grandHotel.variable} ${kristi.variable} ${mansalva.variable} ${reenie.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
