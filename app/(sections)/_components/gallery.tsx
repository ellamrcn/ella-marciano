import type { CSSProperties } from "react";
import { photoKey, type Photo } from "@/app/content";
import { Picture } from "@/components/picture";

export function Gallery({ photos, label }: { photos: Photo[]; label: string }) {
  return (
    <ul className="tiles tiles--gallery" aria-label={label}>
      {photos.map((photo, index) => (
        <li
          key={photoKey(photo)}
          className="tile"
          style={{ "--ar": (photo.width / photo.height).toFixed(3) } as CSSProperties}
        >
          <Picture photo={photo} sizes="(max-width: 760px) 100vw, 40vw" priority={index < 3} className="tile__image" />
        </li>
      ))}
    </ul>
  );
}
