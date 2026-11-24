import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="lost">
        <p className="lost__mark" aria-hidden="true">
          $
        </p>
        <h1 className="lost__title">This page left the table</h1>
        <Link href="/" className="lost__link">
          Back to the work
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
