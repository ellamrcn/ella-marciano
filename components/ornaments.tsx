import type { CSSProperties } from "react";

type OrnamentProps = { className?: string; style?: CSSProperties };

export function ArrowOut({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`arrow-out ${className ?? ""}`}>
      <path d="M5 19C9 15 14 10 18.5 5.5M9 5.2c3.4.4 6.6.3 9.6-.2-.6 3-.6 6.2-.2 9.6" />
    </svg>
  );
}

const cutouts = {
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
