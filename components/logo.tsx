import type { CSSProperties } from "react";

const heartPath =
  "M80 99C58 84 2 62 1 33 0.3 12 18 1 40 1 58 1 72 8 80 19 88 8 102 1 120 1 142 1 159.7 12 159 33 158 62 102 84 80 99Z";

const depthLayers = Array.from({ length: 8 }, (_, index) => index + 1);

function Heart({ className, layer }: { className: string; layer?: number }) {
  return (
    <svg
      className={className}
      style={layer ? ({ "--layer": layer } as CSSProperties) : undefined}
      viewBox="-4 -4 168 108"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={heartPath} />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <span className="logo__spin">
        {depthLayers.map((layer) => (
          <Heart key={layer} className="logo__heart logo__heart--depth" layer={layer} />
        ))}
        <Heart className="logo__heart logo__heart--back" />
        <Heart className="logo__heart logo__heart--front" />
        <span className="logo__name">Ella Marciano</span>
        <span className="logo__name logo__name--back" aria-hidden="true">
          Ella Marciano
        </span>
      </span>
    </span>
  );
}
