import type { CSSProperties } from "react";
import Link from "next/link";
import { homeTiles, photoKey } from "@/app/content";
import { Picture } from "@/components/picture";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader home />
      <main className="home">
        <ul className="tiles">
          {homeTiles.map((tile, index) => (
            <li
              key={photoKey(tile.photo)}
              className="tile"
              style={{ "--ar": (tile.photo.width / tile.photo.height).toFixed(3) } as CSSProperties}
            >
              <Link href={tile.href} className="tile__link">
                <Picture
                  photo={tile.photo}
                  sizes="(max-width: 760px) 50vw, 26vw"
                  priority={index < 4}
                  decorative
                  className="tile__image"
                />
                <span className="tile__caption">{tile.caption}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
