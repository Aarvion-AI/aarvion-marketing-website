import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "paper" | "bright" | "night" | "none";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  bright: "bg-paper-bright text-ink",
  night: "bg-night text-paper-bright",
  none: "",
};

export function Section({
  id,
  tone = "none",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 sm:py-20 lg:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}
