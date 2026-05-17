import {
  Bot,
  ShieldCheck,
  ScrollText,
  KeyRound,
  FileCheck2,
  Server,
  ArrowDown,
} from "lucide-react";

export function WhatAarvionDoes() {
  return (
    <section
      id="what"
      className="relative border-b border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
            What Aarvion does
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
            It sits between your AI agents and your production systems.
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed">
            Before an agent approves a refund, changes a record, executes a
            workflow, or triggers a payment, Aarvion verifies the action is
            authorized by your policy, records cryptographic provenance, and
            writes an auditable decision trail.
          </p>
        </div>

        {/* Diagram + deployment */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-14 items-start">
          <ArchitectureDiagram />

          <div className="lg:pt-6">
            <h3 className="text-sm font-mono uppercase tracking-[0.14em] text-fg-dim">
              How it deploys
            </h3>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Aarvion is a proxy — not a framework you rebuild around. It runs
              inside your own environment and the agents simply route through
              it.
            </p>
            <ul className="mt-6 space-y-4">
              <DeployFact
                title="A proxy inside your VPC"
                body="Deployed in your own cloud. Operational data never leaves your environment."
              />
              <DeployFact
                title="No SDK, no model lock-in"
                body="Nothing to embed in agent code. Works with any agent — internal, vendor, OpenAI, Anthropic."
              />
              <DeployFact
                title="Policy manifests in your Git"
                body="Your rules are open YAML you own, version, and review like any other code."
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeployFact({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex gap-3.5">
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
      <div>
        <div className="text-[15px] font-medium text-fg">{title}</div>
        <div className="mt-1 text-[13.5px] text-fg-muted leading-relaxed">
          {body}
        </div>
      </div>
    </li>
  );
}

/* --------------------------- Architecture diagram --------------------------- */

function ArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-border/80 bg-panel/40 p-5 sm:p-7">
      {/* Tier 1 — Agents */}
      <Tier
        label="AI agents"
        icon={<Bot size={14} />}
        chips={[
          "Internal copilot",
          "Vendor agent",
          "Claude / GPT",
          "Custom agent",
        ]}
      />

      <Connector label="approve refund · change record · trigger payment" />

      {/* Tier 2 — Aarvion (the highlighted one) */}
      <div className="relative rounded-lg border border-cyan/50 bg-cyan/[0.05] p-4 shadow-[0_0_40px_-16px_rgba(34,211,238,0.55)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan/15 text-cyan">
            <ShieldCheck size={15} />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cyan">
            Aarvion runtime
          </span>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <RuntimeRow icon={<KeyRound size={13} />} label="Policy check" />
          <RuntimeRow icon={<ShieldCheck size={13} />} label="Authorization" />
          <RuntimeRow icon={<ScrollText size={13} />} label="Provenance log" />
          <RuntimeRow icon={<FileCheck2 size={13} />} label="Audit record" />
        </div>
      </div>

      <Connector label="authorized actions only" tone="cyan" />

      {/* Tier 3 — Systems */}
      <Tier
        label="Enterprise systems"
        icon={<Server size={14} />}
        chips={["CRM", "ERP", "Payments", "Claims", "Identity"]}
      />
    </div>
  );
}

function Tier({
  label,
  icon,
  chips,
}: {
  label: string;
  icon: React.ReactNode;
  chips: string[];
}) {
  return (
    <div className="rounded-lg border border-border-strong bg-bg-elev/70 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-bg-elev text-fg-muted">
          {icon}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
          {label}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded border border-border/70 bg-panel/60 px-2 py-1 font-mono text-[11px] text-fg/90"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function RuntimeRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded border border-cyan/20 bg-bg/40 px-2.5 py-2">
      <span className="text-cyan">{icon}</span>
      <span className="text-[12.5px] text-fg/90">{label}</span>
    </div>
  );
}

function Connector({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "cyan";
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 pl-5">
      <div className="flex flex-col items-center">
        <span
          className={`h-5 w-px ${
            tone === "cyan" ? "bg-cyan/60" : "bg-border-strong"
          }`}
        />
        <ArrowDown
          size={13}
          className={tone === "cyan" ? "text-cyan/80" : "text-fg-dim"}
        />
      </div>
      <span
        className={`font-mono text-[10.5px] uppercase tracking-[0.1em] ${
          tone === "cyan" ? "text-cyan/80" : "text-fg-dim"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
