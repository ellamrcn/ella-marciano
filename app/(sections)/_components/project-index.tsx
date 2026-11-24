import type { CSSProperties } from "react";
import Link from "next/link";
import type { Series } from "@/app/(sections)/data";
import { Picture } from "@/components/picture";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function ProjectIndex({ series }: { series: Series }) {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <h1 className="page__title hand-marker">{series.label}</h1>
        <p className="page__lede">
          Photography, art direction, casting and creative vision by Ella Marciano, on every project on this page.
        </p>
        <ul className="tiles">
          {series.projects.map((project, index) => {
            const cover = project.photos[0];
            return (
              <li
                key={project.slug}
                className="tile"
                style={{ "--ar": (cover.width / cover.height).toFixed(3) } as CSSProperties}
              >
                <Link href={`${series.href}/${project.slug}`} className="tile__link">
                  <Picture
                    photo={cover}
                    sizes="(max-width: 760px) 50vw, 26vw"
                    priority={index < 4}
                    decorative
                    className="tile__image"
                  />
                  <span className="tile__caption">{project.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
