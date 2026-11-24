import Link from "next/link";
import type { Series } from "@/app/content";
import { Gallery } from "@/app/(sections)/_components/gallery";
import { Cutout } from "@/components/ornaments";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function ProjectPage({ series, slug }: { series: Series; slug: string }) {
  const index = series.projects.findIndex((project) => project.slug === slug);
  const project = series.projects[index];
  const next = series.projects[(index + 1) % series.projects.length];

  return (
    <>
      <SiteHeader />
      <main className="page">
        <Link href={series.href} className="page__back hand-marker">
          {series.label}
        </Link>
        <h1 className="page__title hand-marker">{project.title}</h1>
        <Gallery photos={project.photos} label={project.title} />
        <p className="project-next">
          <span>Next project</span>
          <Link href={`${series.href}/${next.slug}`} className="project-next__link hand-marker">
            {next.title}
          </Link>
          <Cutout name="heels" className="project-next__heels" />
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
