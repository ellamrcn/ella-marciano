export function Logo({ size = "large" }: { size?: "large" | "small" }) {
  return (
    <img
      src="/images/objects/wordmark.png"
      width={761}
      height={472}
      alt="Ella Marciano"
      className={`logo logo--${size}`}
      decoding="async"
    />
  );
}
