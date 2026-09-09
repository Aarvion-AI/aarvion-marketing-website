import { cn } from "@/lib/cn";

export function Stat({
  value,
  label,
  detail,
  className,
}: {
  value: string;
  label: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="text-[2rem] font-bold leading-none tracking-[-0.03em] text-indigo-deep sm:text-[2.4rem]">
        {value}
      </div>
      <div className="mt-3 text-[0.95rem] font-semibold text-ink">{label}</div>
      {detail && (
        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-muted">{detail}</p>
      )}
    </div>
  );
}
