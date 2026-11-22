import { photoSrc, photoSrcSet, type Photo } from "@/app/content";

type PictureProps = {
  photo: Photo;
  sizes: string;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
};

export function Picture({ photo, sizes, className, priority = false, decorative = false }: PictureProps) {
  return (
    <img
      src={photoSrc(photo)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={decorative ? "" : photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
