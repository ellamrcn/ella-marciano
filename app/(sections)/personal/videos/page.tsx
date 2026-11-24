import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { filmEmbed, films, videosCredit } from "@/app/content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Videos" };

export default function VideosPage() {
  return (
    <>
      <SiteHeader />
      <main className="page page--videos">
        <h1 className="page__title hand-marker">Videos</h1>
        {videosCredit ? <p className="page__lede">{videosCredit}</p> : null}
        <ol className="programme">
          {films.map((film, index) => (
            <li key={film.url} className="programme__film">
              <div className="programme__screen" style={{ "--aspect": film.aspect } as CSSProperties}>
                <iframe
                  src={filmEmbed(film)}
                  title={film.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <h2 className="programme__title">{film.title}</h2>
              <p className="programme__about">
                {film.subject}
                <span className="programme__place">{film.place}</span>
              </p>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
