import { ApplyForm } from "./ApplyForm";

const phases = [
  {
    week: "Week 0–2",
    title: "Selection & scoping",
    body: "Pick one stuck AI initiative. We define one operational surface.",
  },
  {
    week: "Week 2–6",
    title: "Manifest authoring",
    body: "Workshop to map endpoints, regulatory logic, and cascade. You keep the manifest either way.",
  },
  {
    week: "Week 6–10",
    title: "Shadow deployment",
    body: "Aarvion proxy observes real traffic inside your VPC. Zero impact on SLAs.",
  },
  {
    week: "Week 10–13",
    title: "Limited enforcement",
    body: "Bounded subset goes live. Mock regulator query produces a signed PDF in 90 seconds.",
  },
];

export function DesignPartnership() {
  return (
    <section
      id="partnership"
      className="relative border-b border-border/60 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-wider font-mono text-cyan">
              Design partnership
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              90 days. One stuck initiative. Zero lock-in.
            </h2>
            <p className="mt-4 text-fg-muted leading-relaxed">
              We&apos;re onboarding a small cohort of regulated enterprises. You
              bring the AI initiative your CISO won&apos;t sign off on. We
              deploy a proxy around it and prove it&apos;s safe to ship.
            </p>
            <ol className="mt-9 space-y-5">
              {phases.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border-strong bg-bg-elev font-mono text-[11px] text-fg-muted">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="text-fg font-medium">{p.title}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                        {p.week}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-fg-muted leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 rounded-md border border-border bg-panel/60 px-4 py-3 text-sm text-fg-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cyan">
                You keep
              </span>{" "}
              the signed manifest, the latency profile, and a working
              provenance chain — even if we don&apos;t move forward together.
            </div>
          </div>
          <div className="lg:sticky lg:top-24 self-start">
            <ApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
