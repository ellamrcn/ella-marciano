import type { CSSProperties } from "react";

type OrnamentProps = { className?: string; style?: CSSProperties };

export function Sparkle({ className, style }: OrnamentProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`sparkle ${className ?? ""}`} style={style}>
      <path d="M10 0c1 7 3 9 10 10-7 1-9 3-10 10C9 13 7 11 0 10c7-1 9-3 10-10Z" />
    </svg>
  );
}

export function ArrowOut({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`arrow-out ${className ?? ""}`}>
      <path d="M5 19C9 15 14 10 18.5 5.5M9 5.2c3.4.4 6.6.3 9.6-.2-.6 3-.6 6.2-.2 9.6" />
    </svg>
  );
}

const cutouts = {
  can: { src: "/images/objects/crushed-can.png", width: 358, height: 640 },
  topper: { src: "/images/objects/cake-topper.png", width: 476, height: 600 },
  pills: { src: "/images/objects/pill-bottle.png", width: 433, height: 600 },
  heels: { src: "/images/objects/red-heels.png", width: 588, height: 820 },
  chip: { src: "/images/objects/casino-chip.png", width: 512, height: 520 },
  dollar: { src: "/images/objects/one-dollar.jpg", width: 1000, height: 427 },
  hundred: { src: "/images/objects/flying-hundred.png", width: 500, height: 449 },
};

export type CutoutName = keyof typeof cutouts;

export function Cutout({
  name,
  className,
  style,
  eager = false,
}: OrnamentProps & { name: CutoutName; eager?: boolean }) {
  const item = cutouts[name];
  return (
    <img
      src={item.src}
      width={item.width}
      height={item.height}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`prop prop--${name} ${className ?? ""}`}
      style={style}
    />
  );
}
