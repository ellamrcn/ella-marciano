import type { Metadata } from "next";
import { selfPortrait, statement } from "@/app/(sections)/data";
import { Picture } from "@/components/picture";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Me" };

export default function MePage() {
  return (
    <>
      <SiteHeader />
      <main className="page page--me">
        <h1 className="page__title hand-marker">Me</h1>
        {selfPortrait ? (
          <figure className="me__portrait">
            <Picture photo={selfPortrait} sizes="(max-width: 760px) 100vw, 42vw" priority />
          </figure>
        ) : null}
        <div className="me__text">
          {statement.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
