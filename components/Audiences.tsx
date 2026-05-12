"use client";

import { useState } from "react";
import {
  Building2,
  Code2,
  FileCheck2,
  Check,
  Clock,
  GitCommit,
  Hash,
} from "lucide-react";

type AudienceKey = "business" | "engineering" | "auditor";

type Audience = {
  key: AudienceKey;
  tag: string;
  index: string;
  headline: string;
  body: string;
  points: string[];
  artifact: React.ReactNode;
  icon: React.ReactNode;
};

const AUDIENCES: Audience[] = [
  {
    key: "business",
    index: "01",
    tag: "For your business",
    headline:
      "The agent does what your governance says, in real time, at every step.",
    body: "Stuck AI initiatives move out of compliance review and into production. The same rules apply to every agent you ever deploy — internal, vendor, or yet-to-be-built. No more explaining yourself to the board.",
    points: [
      "Move stalled AI initiatives out of review and into production",
      "One policy library that every new agent inherits automatically",
      "Board-ready compliance status at any moment, no scramble",
    ],
    artifact: <BusinessArtifact />,
    icon: <Building2 size={15} />,
  },
  {
    key: "engineering",
    index: "02",
    tag: "For your engineering team",
    headline:
      "Vendor-neutral. Customer-hosted. Sub-5 ms p99. Open formats. No proprietary SDKs.",
    body: "Aarvion is a proxy. It runs inside your VPC, alongside your existing identity and observability stack. Manifests are open YAML in your own Git repository. There is no SDK to integrate, no SaaS to forklift, nothing to forklift later.",
    points: [
      "Drops into your existing identity (Okta), observability (Datadog) and runtime stack",
      "Manifests live in your Git as open JSON / YAML — diff, review, revert",
      "Shadow mode first; bounded enforcement second; full enforcement when you say so",
    ],
    artifact: <EngineeringArtifact />,
    icon: <Code2 size={15} />,
  },
  {
    key: "auditor",
    index: "03",
    tag: "For your auditor",
    headline:
      "Every consequential action signed against your governance, hash-chained, externally witnessed.",
    body: "Aarvion replaces multi-week audit reconstructions with a 90-second query. Each decision links to a human, an approval, a rule version, and a manifest commit. Tamper any field — the chain breaks, mathematically.",
    points: [
      "90-second audit query in place of 14-day reconstruction",
      "Tamper-evident chain — every record signed and externally witnessed",
      "Maps cleanly to SOC 2, ISO 27001, GDPR, EU AI Act, FFIEC requirements",
    ],
    artifact: <AuditorArtifact />,
    icon: <FileCheck2 size={15} />,
  },
];

export function Audiences() {
  const [active, setActive] = useState<AudienceKey>("business");
  const current = AUDIENCES.find((a) => a.key === active)!;

  return (
    <section className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
            Who it&apos;s for
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
            One layer. Three answers.
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed">
            Aarvion gives every stakeholder a straight answer to the question
            that&apos;s been blocking your AI rollout.
          </p>
        </div>

        {/* Tab strip */}
        <div className="mt-10 grid gap-px rounded-xl border border-border/80 bg-border/60 overflow-hidden sm:grid-cols-3">
          {AUDIENCES.map((a) => {
            const isActive = a.key === active;
            return (
              <button
                key={a.key}
                onClick={() => setActive(a.key)}
                className={`group flex items-center gap-3 text-left px-5 py-4 transition-colors ${
                  isActive
                    ? "bg-panel/70"
                    : "bg-bg-elev/40 hover:bg-bg-elev/70"
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                    isActive ? "bg-cyan/10 text-cyan" : "bg-bg-elev text-fg-muted"
                  }`}
                >
                  {a.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                    {a.index}
                  </span>
                  <span
                    className={`block text-[14.5px] font-medium ${
                      isActive ? "text-fg" : "text-fg-muted"
                    }`}
                  >
                    {a.tag}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="hidden sm:block h-[3px] w-8 rounded-full bg-cyan self-center"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <article
          key={current.key}
          className="mt-px overflow-hidden rounded-b-xl border-x border-b border-border/80 bg-panel/30 fade-up"
        >
          <div className="grid lg:grid-cols-[1.05fr_1.4fr]">
            {/* Copy */}
            <div className="px-6 sm:px-8 py-8 border-b lg:border-b-0 lg:border-r border-border/70">
              <div className="flex items-center gap-2 text-cyan">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10">
                  {current.icon}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">
                  {current.tag}
                </span>
              </div>
              <h3 className="mt-5 text-[22px] font-semibold tracking-tight leading-snug text-fg">
                {current.headline}
              </h3>
              <p className="mt-4 text-fg-muted leading-relaxed">
                {current.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {current.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-[13.5px] text-fg/90 leading-relaxed"
                  >
                    <Check
                      size={14}
                      className="mt-1 text-cyan flex-shrink-0"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Artifact */}
            <div className="bg-bg-elev/60 px-6 sm:px-8 py-8">
              {current.artifact}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------ Artifacts ------------------------------ */

function ArtifactHeader({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
      <span>{label}</span>
      {hint && <span>{hint}</span>}
    </div>
  );
}

function BusinessArtifact() {
  const initiatives = [
    { name: "Underwriting copilot", state: "live", time: "wk 2", risk: "low" },
    { name: "Claims triage agent", state: "pilot", time: "wk 4", risk: "low" },
    {
      name: "Customer voice (multi-lingual)",
      state: "review",
      time: "wk 1",
      risk: "low",
    },
    { name: "Fraud screening", state: "manifest", time: "wk 1", risk: "med" },
    { name: "Loan adjudication", state: "live", time: "wk 3", risk: "low" },
    {
      name: "Bank-insurer cross-sell",
      state: "live",
      time: "wk 2",
      risk: "low",
    },
  ];
  const stateTone: Record<string, string> = {
    live: "text-green",
    pilot: "text-cyan",
    review: "text-amber",
    manifest: "text-fg-muted",
  };
  return (
    <div>
      <ArtifactHeader label="Board view · AI initiatives" hint="Q3 2026" />
      <div className="rounded-lg border border-border/80 bg-bg/70 overflow-hidden">
        <div className="grid grid-cols-[1fr_82px_60px_56px] gap-3 px-4 py-2 border-b border-border/60 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
          <span>initiative</span>
          <span>state</span>
          <span className="text-right">time</span>
          <span className="text-right">risk</span>
        </div>
        {initiatives.map((it) => (
          <div
            key={it.name}
            className="grid grid-cols-[1fr_82px_60px_56px] gap-3 px-4 py-2 items-baseline font-mono text-[11.5px] border-b border-border/40 last:border-b-0"
          >
            <span className="text-fg/90 truncate">{it.name}</span>
            <span className={stateTone[it.state]}>{it.state}</span>
            <span className="text-right text-fg-muted">{it.time}</span>
            <span
              className={`text-right ${
                it.risk === "low"
                  ? "text-green/90"
                  : it.risk === "med"
                    ? "text-amber"
                    : "text-red"
              }`}
            >
              {it.risk}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Kpi label="In production" value="3" tone="green" />
        <Kpi label="Pending review" value="3" tone="amber" />
        <Kpi label="Board sign-off pending" value="0" tone="green" />
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "amber" | "red";
}) {
  const toneClass = {
    green: "text-green",
    amber: "text-amber",
    red: "text-red",
  }[tone];
  return (
    <div className="rounded-lg border border-border/70 bg-bg/60 px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
        {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold tracking-tight ${toneClass}`}>
        {value}
      </div>
    </div>
  );
}

function EngineeringArtifact() {
  return (
    <div>
      <ArtifactHeader
        label="Deploy · proxy in your VPC"
        hint="terminal"
      />
      <pre className="font-mono text-[11.5px] leading-[1.7] text-fg/90 rounded-lg border border-border/80 bg-bg/70 px-4 py-3 overflow-x-auto">
{`# 1. Deploy the proxy alongside your stack
$ kubectl apply -f aarvion-proxy.yaml
  deployment.apps/aarvion-proxy created  (3 replicas)
  service/aarvion-proxy        exposed  (8443/TCP)

# 2. Point your agents at it
$ export AARVION_PROXY_URL=https://aarvion.svc.cluster.local:8443

# 3. Your manifests live in your own repo
$ git status
  modified:  manifests/claims-refund.yaml
  modified:  manifests/billing-copilot.yaml

# 4. Run in shadow mode first — zero prod impact
$ aarvion shadow --since=24h --diff
  142 decisions evaluated   ·   0 prod impact
   ✓ 134 would-pass
   ⏸  6 would-hold
   ✗ 2 would-block

# 5. Promote bounded subset to enforce
$ aarvion promote --agents claims.refund.v2 --mode enforce`}
      </pre>
      <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] font-mono">
        <Pill label="p99" value="4.2 ms" tone="cyan" />
        <Pill label="payload" value="JSON/YAML" tone="muted" />
        <Pill label="hosting" value="customer VPC" tone="muted" />
      </div>
    </div>
  );
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cyan" | "muted";
}) {
  const toneClass = tone === "cyan" ? "text-cyan" : "text-fg/90";
  return (
    <div className="rounded-md border border-border/70 bg-bg/60 px-3 py-2 flex items-baseline justify-between">
      <span className="text-fg-dim uppercase tracking-[0.14em] text-[10px]">
        {label}
      </span>
      <span className={`text-[12px] ${toneClass}`}>{value}</span>
    </div>
  );
}

function AuditorArtifact() {
  return (
    <div>
      <ArtifactHeader
        label="Regulator query · April 2026"
        hint="aarvion audit"
      />
      <div className="rounded-lg border border-border/80 bg-bg/70 overflow-hidden">
        <pre className="font-mono text-[11.5px] leading-[1.7] text-fg/90 px-4 py-3">
{`$ aarvion audit \\
    --agent claims.refund.v2 \\
    --window 2026-04-01..2026-04-30 \\
    --include-verification \\
    --output pdf

`}<span className="text-green">verified.</span>{`   8,420 records.   `}<span className="text-green">0 mismatches.</span>{`
elapsed: 91.4 s
output:  regulator-pack-2026Q2.pdf  (4.2 MB)`}
        </pre>
        <div className="border-t border-border/60 px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim mb-2">
            pdf contents
          </div>
          <ul className="space-y-1.5 text-[12px] font-mono text-fg-muted">
            <li className="flex items-center gap-2">
              <GitCommit size={11} className="text-cyan" />
              Manifest version history (47 commits, signed)
            </li>
            <li className="flex items-center gap-2">
              <Hash size={11} className="text-cyan" />
              Provenance chain (8,420 records, hash-linked)
            </li>
            <li className="flex items-center gap-2">
              <Check size={11} className="text-green" />
              External witness proofs (timestamped)
            </li>
            <li className="flex items-center gap-2">
              <Clock size={11} className="text-amber" />
              Held decisions (203, with human approver)
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded border border-green/40 bg-green/[0.06] px-3 py-1.5 font-mono text-[11px] text-green">
        <Check size={12} />
        chain valid · external-ts.example.com
      </div>
    </div>
  );
}
