import { useId } from "react";
import type { Variant } from "@/lib/images";
import { cn } from "@/lib/cn";

const palettes: Record<
  Variant,
  { bg: [string, string]; plane: [string, string]; trace: string; glow: string; grid: string }
> = {
  runtime: {
    bg: ["#fbfaf6", "#e6ebff"],
    plane: ["#2b3f86", "#162250"],
    trace: "#7385d2",
    glow: "#5b82ff",
    grid: "rgba(43,63,134,0.14)",
  },
  authority: {
    bg: ["#fbfaf6", "#f1e8d3"],
    plane: ["#2b3f86", "#162250"],
    trace: "#e5bd57",
    glow: "#e5bd57",
    grid: "rgba(43,63,134,0.12)",
  },
  record: {
    bg: ["#fbfaf6", "#e2f0e5"],
    plane: ["#2b3f86", "#162250"],
    trace: "#7fe0a3",
    glow: "#7fe0a3",
    grid: "rgba(43,63,134,0.12)",
  },
  night: {
    bg: ["#0a0f1d", "#050812"],
    plane: ["#3d53a2", "#162250"],
    trace: "#7385d2",
    glow: "#5b82ff",
    grid: "rgba(115,133,210,0.16)",
  },
  warm: {
    bg: ["#fbfaf6", "#f1e8d3"],
    plane: ["#2b3f86", "#162250"],
    trace: "#dce2ff",
    glow: "#7385d2",
    grid: "rgba(43,63,134,0.1)",
  },
};

export function GenerativeVisual({
  variant = "runtime",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const p = palettes[variant];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg[0]} />
          <stop offset="1" stopColor={p.bg[1]} />
        </linearGradient>
        <linearGradient id={`${id}-plane`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.plane[0]} />
          <stop offset="1" stopColor={p.plane[1]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke={p.grid} strokeWidth="1" />
        </pattern>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id}-bg)`} />
      <rect width="1600" height="900" fill={`url(#${id}-grid)`} />

      <circle cx="1180" cy="260" r="360" fill={`url(#${id}-glow)`} />
      <circle cx="420" cy="720" r="300" fill={`url(#${id}-glow)`} opacity="0.6" />

      <polygon
        points="0,560 1600,380 1600,900 0,900"
        fill={`url(#${id}-plane)`}
        opacity="0.96"
      />
      <polygon
        points="0,600 1600,420 1600,470 0,650"
        fill={p.trace}
        opacity="0.18"
        filter={`url(#${id}-blur)`}
      />
      <polyline
        points="0,596 1600,416"
        fill="none"
        stroke={p.trace}
        strokeWidth="2"
        opacity="0.9"
      />

      <g stroke={p.trace} strokeWidth="1.5" opacity="0.7" fill="none">
        <path d="M300 120 V 520" />
        <path d="M760 60 V 470" />
        <path d="M1240 140 V 420" />
      </g>
      <g fill={p.bg[0]} stroke={p.trace} strokeWidth="2">
        <rect x="256" y="76" width="88" height="44" rx="10" />
        <rect x="716" y="16" width="88" height="44" rx="10" />
        <rect x="1196" y="96" width="88" height="44" rx="10" />
      </g>
      <g fill={p.trace}>
        <circle cx="300" cy="521" r="6" />
        <circle cx="760" cy="471" r="6" />
        <circle cx="1240" cy="421" r="6" />
      </g>

      <g stroke={p.trace} strokeWidth="1.5" opacity="0.55" fill="none">
        <path d="M300 640 V 820" />
        <path d="M760 590 V 800" />
        <path d="M1240 540 V 760" />
      </g>
      <g fill="none" stroke={p.trace} strokeWidth="2" opacity="0.85">
        <rect x="248" y="820" width="104" height="40" rx="8" />
        <rect x="708" y="800" width="104" height="40" rx="8" />
        <rect x="1188" y="760" width="104" height="40" rx="8" />
      </g>
    </svg>
  );
}
