import type { Metadata } from "next";
import Link from "next/link";
import { email } from "@/app/content";
import { Logo } from "@/components/logo";
import { Cutout } from "@/components/ornaments";

export const metadata: Metadata = { title: "Soon" };

export default function NotFound() {
  return (
    <main className="soon">
      <Link href="/" className="soon__home" aria-label="Ella Marciano, home">
        <Logo size="small" />
      </Link>
      <h1 className="soon__title hand-brush">Soon</h1>
      <p className="soon__text">This page is still being finished.</p>
      <p className="soon__links">
        <Link href="/" className="hand-pen">
          Back to the homepage
        </Link>
        <a href={`mailto:${email}`} className="hand-script">
          {email}
        </a>
      </p>
      <Cutout name="hundred" className="soon__bill" eager />
    </main>
  );
}
