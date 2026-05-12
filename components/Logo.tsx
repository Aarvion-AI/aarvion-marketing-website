export function Logo({
  className = "",
  size = 34,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="font-bold uppercase tracking-[0.05em] text-[19px] leading-none">
          Aarvion
        </span>
      )}
    </span>
  );
}

export function LogoMark({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      shapeRendering="geometricPrecision"
    >
      {/* Outer triangle — A silhouette / arrowhead */}
      <path
        d="M 6 58 L 32 4 L 58 58"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        fill="none"
      />

      {/* Inner concentric triangle — parallel frame depth */}
      <path
        d="M 17 54 L 32 22 L 47 54"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        opacity="0.55"
        fill="none"
      />

      {/* Orbit — two crossing swooshes */}
      <path
        d="M 2 26 Q 32 56 62 30"
        stroke="var(--cyan, #22d3ee)"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 2 32 Q 32 8 62 36"
        stroke="var(--cyan, #22d3ee)"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
    </svg>
  );
}
