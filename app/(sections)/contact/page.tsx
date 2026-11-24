import type { Metadata } from "next";
import { email, instagram } from "@/app/content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="page page--contact">
        <h1 className="page__title hand-marker">
          Contact
          <span className="dollar-mark" aria-hidden="true">
            $
          </span>
        </h1>
        <a href={`mailto:${email}`} className="contact__email">
          {email}
        </a>
        <a href={instagram.url} className="contact__instagram" target="_blank" rel="noreferrer">
          {instagram.handle}
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
