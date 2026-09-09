import Image from "next/image";
import { LOGOS } from "@/lib/asset-manifest.generated";
import type { Mark } from "@/lib/proof";
import { cn } from "@/lib/cn";

function Wordmark({ mark }: { mark: Mark }) {
  const src = LOGOS[mark.id];
  if (src) {
    return (
      <Image
        src={src}
        alt={mark.name}
        width={140}
        height={36}
        unoptimized
        className="h-8 w-auto opacity-70 grayscale"
      />
    );
  }
  return (
    <span className="text-[1.35rem] font-bold tracking-[-0.03em] text-ink/65">
      {mark.name}
    </span>
  );
}

export function LogoMarquee({
  marks,
  className,
}: {
  marks: Mark[];
  className?: string;
}) {
  const track = [...marks, ...marks];
  return (
    <div className={cn("marquee", className)}>
      <ul className="marquee-track items-center gap-14 pr-14" aria-label="Companies">
        {track.map((mark, index) => (
          <li
            key={`${mark.id}-${index}`}
            aria-hidden={index >= marks.length ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            <Wordmark mark={mark} />
          </li>
        ))}
      </ul>
    </div>
  );
}
