import { email, instagram } from "@/app/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer__line">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={instagram.url} target="_blank" rel="noreferrer">
          {instagram.handle}
        </a>
      </p>
      <p className="site-footer__line site-footer__small">
        <span>© Ella Marciano 2026</span>
      </p>
    </footer>
  );
}
