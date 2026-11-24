import type { Metadata } from "next";
import { photoKey, type Photo } from "@/app/content";
import { clients, type Publication } from "@/app/content";
import { ArrowOut } from "@/components/ornaments";
import { Picture } from "@/components/picture";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Selected Clients & Publications" };

export default function ClientsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page page--clients">
        <h1 className="page__title hand-marker">
          Selected Clients &amp; Publications
        </h1>
        {clients.map((client) => (
          <article key={client.name} className="client">
            <header className="client__head">
              <h2 className="client__name">{client.name}</h2>
              <p className="client__role">
                <span className="role-label hand-marker">Ella&rsquo;s role</span>
                {client.role}
              </p>
              {client.images?.length ? <Snapshots images={client.images} /> : null}
            </header>
            <ol className="ledger">
              {client.publications.map((publication) => (
                <PublicationEntry key={publication.title} publication={publication} />
              ))}
            </ol>
          </article>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}

function Snapshots({ images, url }: { images: Photo[]; url?: string }) {
  const pictures = images.map((image) => (
    <Picture key={photoKey(image)} photo={image} sizes="(max-width: 760px) 44vw, 14vw" className="entry__image" />
  ));
  if (!url) {
    return (
      <div className="entry__images">
        {pictures}
      </div>
    );
  }
  return (
    <a href={url} className="entry__images" target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
      {pictures}
    </a>
  );
}

function PublicationTitle({ publication }: { publication: Publication }) {
  if (!publication.url) return <>{publication.title}</>;
  return (
    <a href={publication.url} target="_blank" rel="noreferrer">
      {publication.title}
      <ArrowOut />
    </a>
  );
}

function PublicationEntry({ publication }: { publication: Publication }) {
  const images = publication.images ?? [];
  const details = [publication.credit, publication.date].filter(Boolean).join(", ");
  return (
    <li className={`entry${images.length ? " entry--featured" : ""}`}>
      {images.length ? <Snapshots images={images} url={publication.url} /> : null}
      <div className="entry__text">
        <h3 className="entry__title">
          <PublicationTitle publication={publication} />
        </h3>
        {publication.role ? (
          <p className="entry__role">
            <span className="role-label hand-marker">Ella&rsquo;s role</span>
            {publication.role}
          </p>
        ) : null}
        {details ? <p className="entry__details">{details}</p> : null}
      </div>
    </li>
  );
}
