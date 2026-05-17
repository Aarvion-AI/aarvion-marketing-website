import { Landmark, ShieldPlus, HeartPulse, Building2, Plane } from "lucide-react";

const SECTORS = [
  { icon: <Landmark size={15} />, label: "Banking" },
  { icon: <ShieldPlus size={15} />, label: "Insurance" },
  { icon: <HeartPulse size={15} />, label: "Healthcare" },
  { icon: <Plane size={15} />, label: "Aviation" },
  { icon: <Building2 size={15} />, label: "Enterprise operations" },
];

export function WhoFor() {
  return (
    <section className="border-b border-border/60 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
              Who it&apos;s for
            </p>
            <p className="mt-2 text-lg text-fg leading-snug">
              Built for teams putting AI agents into production in regulated
              environments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {SECTORS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-panel/50 px-3 py-2 text-sm text-fg-muted"
              >
                <span className="text-cyan">{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
