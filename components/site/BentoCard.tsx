import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "bright" | "indigo" | "sand" | "mint" | "rose" | "night";

const tones: Record<Tone, string> = {
  bright: "border-line bg-paper-bright text-ink",
  indigo: "border-indigo-pale bg-tint-indigo text-ink",
  sand: "border-[#e6dcc3] bg-tint-sand text-ink",
  mint: "border-[#cfe3d4] bg-tint-mint text-ink",
  rose: "border-[#ecd6cf] bg-tint-rose text-ink",
  night: "border-night-line bg-night text-paper-bright",
};

export function BentoCard({
  tone = "bright",
  title,
  body,
  children,
  className,
  bodyClassName,
}: {
  tone?: Tone;
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border p-7 shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-board lg:p-9",
        tones[tone],
        className,
      )}
    >
      <div>
        <h3 className="title">{title}</h3>
        <p
          className={cn(
            "mt-3 max-w-md text-[0.97rem] leading-relaxed",
            tone === "night" ? "text-paper-bright/70" : "text-ink-muted",
            bodyClassName,
          )}
        >
          {body}
        </p>
      </div>
      {children && <div className="mt-8 flex-1">{children}</div>}
    </article>
  );
}
