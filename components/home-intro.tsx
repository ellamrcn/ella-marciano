"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { introPhotos, photoKey, photoSrc } from "@/app/content";

const spread = (index: number, offset: number, step: number) => (offset + index * step) % 1;

const deal = introPhotos.map((photo, index) => {
  const portrait = photo.height > photo.width;
  const progress = index / (introPhotos.length - 1);
  return {
    photo,
    style: {
      "--x": `${12 + spread(index, 0.5, 0.618034) * 76}%`,
      "--y": `${20 + spread(index, 0.3, 0.414214) * 62}%`,
      "--r": `${(spread(index, 0.15, 0.7548777) - 0.5) * 14}deg`,
      "--w": portrait ? "var(--card-portrait)" : "var(--card-landscape)",
      "--d": `${(2.1 * Math.sqrt(progress)).toFixed(2)}s`,
    } as CSSProperties,
  };
});

export function HomeIntro() {
  const [skipped, setSkipped] = useState(false);

  return (
    <div className="intro" data-skipped={skipped} aria-hidden="true" onClick={() => setSkipped(true)}>
      {deal.map(({ photo, style }, index) => (
        <img
          key={photoKey(photo)}
          src={photoSrc(photo)}
          width={photo.width}
          height={photo.height}
          alt=""
          className="intro__card"
          style={style}
          loading="eager"
          fetchPriority={index < 4 ? "high" : "auto"}
          decoding="async"
        />
      ))}
    </div>
  );
}
