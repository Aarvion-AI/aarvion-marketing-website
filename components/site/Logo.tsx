import Image from "next/image";
import { cn } from "@/lib/cn";

export function LogoMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/aarvion-logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

export function Logo({
  size = 28,
  className = "",
  inverse = false,
}: {
  size?: number;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-bold tracking-[-0.025em]",
        inverse ? "text-paper-bright" : "text-ink",
        className,
      )}
    >
      <LogoMark size={size} className={inverse ? "invert" : ""} />
      <span style={{ fontSize: size * 0.72 }}>Aarvion</span>
    </span>
  );
}
