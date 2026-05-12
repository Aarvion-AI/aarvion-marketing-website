import { UserCheck, Activity, ShieldCheck } from "lucide-react";

type Layer = {
  index: string;
  category: string;
  representative: string;
  question: string;
  body: string;
  icon: React.ReactNode;
  primary?: boolean;
};

const LAYERS: Layer[] = [
  {
    index: "01",
    category: "Identity",
    representative: "Okta",
    question: "Who is the agent?",
    body: "Every modern enterprise already trusts a layer that proves the identity of a human or a service. Without it, you can't even start.",
    icon: <UserCheck size={16} />,
  },
  {
    index: "02",
    category: "Observability",
    representative: "Datadog",
    question: "How fast is it running?",
    body: "And every modern enterprise already trusts a layer that tells you how the system is performing. Without it, you can't operate at scale.",
    icon: <Activity size={16} />,
  },
  {
    index: "03",
    category: "Authority & Provenance",
    representative: "Aarvion",
    question: "What was decided · why · by whose authority?",
    body: "The AI era needs a third foundational layer. One that proves not just who the agent is, or how fast it ran, but what it was allowed to do, what it actually did, and on what authority. Aarvion is that layer.",
    icon: <ShieldCheck size={16} />,
    primary: true,
  },
];

export function Comparison() {
  return (
    <section id="compare" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
            Where Aarvion fits
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
            The missing layer in your enterprise stack.
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed">
            You wouldn&apos;t run production without Identity. You wouldn&apos;t
            run production without Observability. As AI agents enter your
            systems of record, there&apos;s a third layer that becomes just as
            non-negotiable.
          </p>
        </div>

        <div className="mt-14">
          <div className="rounded-xl border border-border/80 bg-panel/30 overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/70 bg-bg/40 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="dot bg-cyan pulse-dot" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
                  Enterprise stack · foundational layers
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-[10.5px] text-fg-dim">
                3 layers · 1 new
              </span>
            </div>

            <ul>
              {LAYERS.map((l, i) => (
                <LayerRow
                  key={l.index}
                  layer={l}
                  isLast={i === LAYERS.length - 1}
                />
              ))}
            </ul>
          </div>

          <div className="mt-6 max-w-3xl text-[13px] text-fg-dim leading-relaxed">
            Identity and observability became non-negotiable when SaaS scaled.
            Authority and provenance become non-negotiable when AI agents start
            taking action inside your systems of record. Aarvion is built for
            that moment.
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerRow({ layer, isLast }: { layer: Layer; isLast: boolean }) {
  const primary = !!layer.primary;
  return (
    <li
      className={`relative grid grid-cols-[80px_minmax(0,1.05fr)_minmax(0,1.6fr)] items-stretch ${
        isLast ? "" : "border-b border-border/40"
      } ${primary ? "bg-cyan/[0.04]" : ""}`}
    >
      {primary && (
        <span
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-md bg-cyan"
          aria-hidden
        />
      )}

      {/* Index */}
      <div className="px-6 py-7 flex items-start gap-2 border-r border-border/40">
        <span
          className={`font-mono text-[10.5px] tracking-[0.14em] ${
            primary ? "text-cyan" : "text-fg-dim"
          }`}
        >
          {layer.index}
        </span>
      </div>

      {/* Category + representative */}
      <div className="px-6 py-7 border-r border-border/40">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
              primary ? "bg-cyan/10 text-cyan" : "bg-bg-elev text-fg-muted"
            }`}
          >
            {layer.icon}
          </span>
          <span
            className={`font-mono text-[10.5px] uppercase tracking-[0.14em] ${
              primary ? "text-cyan" : "text-fg-dim"
            }`}
          >
            {layer.category}
          </span>
        </div>
        <div className="mt-5">
          <div
            className={`text-2xl font-semibold tracking-tight ${
              primary ? "text-fg" : "text-fg/90"
            }`}
          >
            {layer.representative}
          </div>
          <div
            className={`mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
              primary ? "text-cyan/80" : "text-fg-dim"
            }`}
          >
            {primary ? "the new foundational layer" : "category leader"}
          </div>
        </div>
      </div>

      {/* Question + body */}
      <div className="px-6 py-7">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
          Answers the question
        </div>
        <p
          className={`mt-2 text-lg leading-snug ${
            primary ? "text-cyan" : "text-fg/90"
          }`}
        >
          “{layer.question}”
        </p>
        <p
          className={`mt-4 text-[13.5px] leading-relaxed ${
            primary ? "text-fg-muted" : "text-fg-muted"
          }`}
        >
          {layer.body}
        </p>
      </div>
    </li>
  );
}
