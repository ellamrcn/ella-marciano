import type { Metadata, Viewport } from "next";
import { EB_Garamond, Mansalva } from "next/font/google";
import localFont from "next/font/local";
import { descriptions, siteJsonLd, siteName, siteTitle, siteUrl } from "@/app/seo";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const garamond = EB_Garamond({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-garamond" });
const brush = localFont({ src: "./fonts/brush-script.woff2", variable: "--font-brush", display: "block" });
const mansalva = Mansalva({ subsets: ["latin"], weight: "400", variable: "--font-mansalva" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s, ${siteName}` },
  description: descriptions.home,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    title: siteTitle,
    description: descriptions.home,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: descriptions.home, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${brush.variable} ${mansalva.variable}`}
    >
      <body>
        <JsonLd data={siteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
