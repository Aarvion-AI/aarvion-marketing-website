"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileSignature,
  Sparkles,
  ShieldCheck,
  Link2,
  GitBranch,
  GitCommit,
  Check,
  X,
  Clock,
} from "lucide-react";

type PhaseKey = "define" | "refine" | "enforce" | "evidence";

type Phase = {
  key: PhaseKey;
  index: string;
  tag: string;
  title: string;
  oneLine: string;
  body: string;
  outcome: string;
  icon: React.ReactNode;
  artifact: React.ReactNode;
};

const PHASES: Phase[] = [
  {
    key: "define",
    index: "01",
    tag: "Define",
    title: "Manifest",
    oneLine: "The contract is authored.",
    body: "Aarvion ingests your OpenAPI specs, runbooks, PR history, and operator interviews to draft a manifest. Engineers and compliance review it together. The output is a signed, versioned YAML in your own Git repository.",
    outcome: "Versioned, signed contract",
    icon: <FileSignature size={14} />,
    artifact: <ManifestArtifact />,
  },
  {
    key: "refine",
    index: "02",
    tag: "Refine",
    title: "Trace learning",
    oneLine: "The contract sharpens.",
    body: "Production traffic feeds back into the manifest. Decisions where Aarvion was too strict or too lenient surface for human review. The manifest commits new revisions every cycle — measurable, not vibes.",
    outcome: "Continuously improving",
    icon: <Sparkles size={14} />,
    artifact: <RefineArtifact />,
  },
  {
    key: "enforce",
    index: "03",
    tag: "Enforce",
    title: "Runtime",
    oneLine: "The contract is applied.",
    body: "Every regulated call passes through the proxy. All seven primitives evaluated in-memory, sub-5 ms p99, no network hop. Pass, park for a human, or block — the decision is taken outside the agent's reach.",
    outcome: "Governance at agent speed",
    icon: <ShieldCheck size={14} />,
    artifact: <RuntimeArtifact />,
  },
  {
    key: "evidence",
    index: "04",
    tag: "Evidence",
    title: "Provenance",
    oneLine: "The contract is provable.",
    body: "Every consequential action becomes a 2 KB hash-chained record. Externally witnessed. Bound to the manifest version, the human who approved, and the rule that fired. A 14-day audit becomes a 90-second query.",
    outcome: "Provable on demand",
    icon: <Link2 size={14} />,
    artifact: <ProvenanceArtifact />,
  },
];

export function TheLoop() {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const idx = Number(
            visible[0].target.getAttribute("data-phase")
          );
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    stepRefs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const current = PHASES[active];

  return (
    <section id="loop" className="relative border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
            The loop
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
            Governance, end&nbsp;to&nbsp;end.
            <br />
            <span className="text-fg-muted">One loop. Four phases.</span>
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed max-w-xl">
            Define what&apos;s allowed. Sharpen it on real traffic. Enforce
            it in real time. Prove it to anyone who asks. Then sharpen again.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: scrolling phases */}
          <ol className="space-y-[36vh] lg:py-[26vh]">
            {PHASES.map((p, i) => {
              const isActive = active === i;
              return (
                <li
                  key={p.key}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-phase={i}
                  className={`transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-35"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-md border font-mono text-[11px] ${
                        isActive
                          ? "border-cyan/40 bg-cyan/[0.08] text-cyan"
                          : "border-fg-dim/30 bg-bg-elev text-fg-muted"
                      }`}
                    >
                      {p.index}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                        isActive ? "text-cyan" : "text-fg-dim"
                      }`}
                    >
                      {p.icon}
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-[34px] font-semibold tracking-tight leading-[1.1] text-fg">
                    {p.title}
                  </h3>
                  <p className="mt-2 italic text-fg-dim text-base">
                    {p.oneLine}
                  </p>
                  <p className="mt-4 max-w-md text-fg-muted leading-relaxed">
                    {p.body}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm">
                    <span className={isActive ? "text-cyan" : "text-fg-dim"}>
                      →
                    </span>
                    <span className="text-fg/90 font-medium">{p.outcome}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Right: sticky artifact panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <article
                key={current.key}
                className="rounded-xl border border-border/80 bg-panel/40 overflow-hidden fade-up"
              >
                <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
                  <div className="flex items-center gap-2 text-cyan">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10">
                      {current.icon}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">
                      {current.tag}
                    </span>
                  </div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-dim">
                    {current.index} / 04
                  </span>
                </div>
                <div className="px-6 py-5">{current.artifact}</div>
              </article>

              <div className="mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-fg-dim">
                <span className="flex items-center gap-1">
                  {PHASES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-[3px] w-7 rounded-full transition-colors duration-300 ${
                        i === active ? "bg-cyan" : "bg-border-strong"
                      }`}
                    />
                  ))}
                </span>
                <span className="ml-2">refines back to 01</span>
              </div>
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="lg:hidden">
            <article className="rounded-xl border border-border/80 bg-panel/40 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
                <div className="flex items-center gap-2 text-cyan">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10">
                    {current.icon}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">
                    {current.tag}
                  </span>
                </div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-dim">
                  {current.index} / 04
                </span>
              </div>
              <div className="px-6 py-5">{current.artifact}</div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Artifacts ------------------------------ */

function ArtifactHeader({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
      <span>{label}</span>
      {hint && <span>{hint}</span>}
    </div>
  );
}

function ManifestArtifact() {
  const yaml = `agent: claims.refund.v2
manifest: claims-refund
version: 17
checks:
  scope:         agent.refund
  idempotency:   single-use, required
  cost_rate:
    amount_max:  75000
    currency:    USD
  reversibility:
    must_be:     settlement_open
    on_fail:     hold
  cascade:
    blast_max:   3 systems
  semantic:
    declared_effect: refund_only
  authority:
    inherit_from: actor.oauth
    must_be:      narrow
signed_by: rohit.sadhu@aarvion · 4f1a9b`;
  return (
    <div>
      <ArtifactHeader
        label="claims-refund.v17.yaml"
        hint="git@4f1a9b · signed"
      />
      <pre className="font-mono text-[11.5px] leading-[1.65] text-fg/90 overflow-x-auto max-h-[420px]">
        {yaml.split("\n").map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-fg-dim/60 select-none w-5 text-right">
              {i + 1}
            </span>
            <span>
              {line.split(":").length === 2 && !line.startsWith(" ") ? (
                <>
                  <span className="text-cyan">{line.split(":")[0]}</span>
                  <span className="text-fg-muted">:</span>
                  <span className="text-fg/90">
                    {line.split(":").slice(1).join(":")}
                  </span>
                </>
              ) : (
                line
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function RefineArtifact() {
  const rows = [
    {
      sha: "4f1a9b",
      msg: "loosen amount_max → $75k (was $50k)",
      trace: "+ 14 false holds",
      vote: "approved",
    },
    {
      sha: "a3d219",
      msg: "tighten cascade_max → 3 (was 5)",
      trace: "+ 2 prod incidents avoided",
      vote: "approved",
    },
    {
      sha: "c8e7f4",
      msg: "add semantic check on /preview endpoints",
      trace: "+ 1 silent-inventory bug caught",
      vote: "approved",
    },
    {
      sha: "f0b2cc",
      msg: "narrow authority for billing agents",
      trace: "− 0 false negatives",
      vote: "pending",
    },
  ];
  return (
    <div>
      <ArtifactHeader
        label="Manifest changelog · last 30 days"
        hint="git log --since=30d"
      />
      <div className="font-mono text-[11.5px] leading-relaxed space-y-1.5">
        {rows.map((r) => (
          <div
            key={r.sha}
            className="grid grid-cols-[60px_1fr_140px_70px] gap-3 items-baseline"
          >
            <span className="text-fg-dim flex items-center gap-1.5">
              <GitCommit size={11} />
              {r.sha}
            </span>
            <span className="text-fg/90 truncate">{r.msg}</span>
            <span className="text-cyan/80 truncate">{r.trace}</span>
            <span
              className={`text-right ${
                r.vote === "approved" ? "text-green" : "text-amber"
              }`}
            >
              {r.vote}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-fg-dim">
        <GitBranch size={12} />
        manifest/main · 4 commits this cycle · 1 awaiting review
      </div>
    </div>
  );
}

function RuntimeArtifact() {
  const checks = [
    { k: "scope", v: "agent.refund ∈ allowed", state: "ok" },
    { k: "idempotency", v: "key f3a9..c821 · single-use", state: "ok" },
    { k: "cost_rate", v: "$58k ≤ $75k", state: "ok" },
    {
      k: "reversibility",
      v: "settlement_open · closed 2h 14m ago",
      state: "fail",
    },
    { k: "cascade", v: "4 systems · within blast radius", state: "ok" },
    { k: "semantic", v: "endpoint matches effect", state: "ok" },
    { k: "authority", v: "narrow(anita.patel.oauth)", state: "ok" },
  ] as const;

  return (
    <div>
      <ArtifactHeader
        label="Live decision · POST /v2/claims/refund"
        hint="1.4 ms · trace 8j2k4m"
      />
      <div className="grid grid-cols-[110px_1fr_22px] gap-x-3 gap-y-1 font-mono text-[11.5px] leading-relaxed">
        {checks.map((c) => {
          const tone =
            c.state === "ok"
              ? "text-green"
              : c.state === "fail"
                ? "text-red"
                : "text-amber";
          const Icon =
            c.state === "ok" ? Check : c.state === "fail" ? X : Clock;
          return (
            <div key={c.k} className="contents">
              <span className="text-fg-dim">{c.k}</span>
              <span className={c.state === "fail" ? "text-fg" : "text-fg-muted"}>
                {c.v}
              </span>
              <span className={`justify-self-end ${tone}`}>
                <Icon size={12} />
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded border border-amber/40 bg-amber/[0.07] px-3 py-1.5 font-mono text-[11px]">
        <Clock size={12} className="text-amber" />
        <span className="text-amber uppercase tracking-wider">HELD</span>
        <span className="text-fg-dim">→ claims.ops.manager</span>
      </div>
    </div>
  );
}

function ProvenanceArtifact() {
  const lines = [
    { k: "record_id", v: "PRV-4820" },
    { k: "prev_hash", v: "sha256:7f2b9c1e..ab87" },
    { k: "curr_hash", v: "sha256:c3d8a17f..91d2" },
    { k: "manifest", v: "claims-refund.v17 · git@4f1a9b" },
    { k: "trigger", v: "anita.patel@acme · session ses_8j2k4m" },
    { k: "approver", v: "meera.joshi@acme · 14:22:14Z" },
    { k: "witness", v: "external-ts.example.com (signed)" },
  ];
  return (
    <div>
      <ArtifactHeader
        label="Provenance record · PRV-4820"
        hint="aarvion query --pdf"
      />
      <div className="font-mono text-[11.5px] leading-relaxed grid grid-cols-[100px_1fr] gap-x-3 gap-y-1">
        {lines.map((l) => (
          <div key={l.k} className="contents">
            <span className="text-fg-dim">{l.k}</span>
            <span className="text-fg/90 truncate">{l.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-green font-mono">
        <Check size={12} />
        chain valid · verified in 87.3 s · 142 records, 0 mismatches
      </div>
    </div>
  );
}
