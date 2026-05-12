"use client";

import { Check, X, Clock, AlertTriangle, Hash, FileText } from "lucide-react";

type Variant = "without" | "with";
type Step = 0 | 1 | 2 | 3;

export function AnatomyScene({ step, variant }: { step: Step; variant: Variant }) {
  return (
    <div className="rounded-xl border border-border/80 bg-bg-elev/80 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]">
      <ConsoleHeader variant={variant} step={step} />
      <div className="divide-y divide-border/60">
        {variant === "with" ? (
          <>
            <RequestPane state={paneState(step, 0)} />
            <ManifestPane state={paneState(step, 1)} step={step} />
            <DecisionPane state={paneState(step, 2)} />
            <ProvenancePane state={paneState(step, 3)} />
          </>
        ) : (
          <>
            <RequestPane state={paneState(step, 0)} />
            <ResponsePane state={paneState(step, 1)} />
            <CascadePane state={paneState(step, 2)} />
            <AuditFragmentsPane state={paneState(step, 3)} />
          </>
        )}
      </div>
    </div>
  );
}

type PaneState = "future" | "active" | "past";
function paneState(step: number, pane: number): PaneState {
  if (pane === step) return "active";
  if (pane < step) return "past";
  return "future";
}

function ConsoleHeader({ variant, step }: { variant: Variant; step: Step }) {
  return (
    <div className="flex items-center justify-between border-b border-border/80 bg-bg/70 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        <span className="ml-3 font-mono text-[10.5px] uppercase tracking-wider text-fg-dim">
          {variant === "with" ? "aarvion.runtime" : "no inspection layer"}
        </span>
      </div>
      <span className="font-mono text-[10.5px] uppercase tracking-wider text-fg-dim">
        request · trc_8j2k4m
      </span>
    </div>
  );
}

function PaneShell({
  label,
  state,
  badge,
  badgeTone = "neutral",
  children,
}: {
  label: string;
  state: PaneState;
  badge?: string;
  badgeTone?: "neutral" | "ok" | "fail" | "hold";
  children: React.ReactNode;
}) {
  const opacity =
    state === "active" ? "opacity-100" : state === "past" ? "opacity-70" : "opacity-30";
  const tone =
    state === "active"
      ? "border-l-cyan"
      : state === "past"
        ? "border-l-fg-dim/40"
        : "border-l-transparent";
  const toneClass = {
    neutral: "text-fg-muted bg-bg-elev",
    ok: "text-green bg-green/10",
    fail: "text-red bg-red/10",
    hold: "text-amber bg-amber/10",
  }[badgeTone];

  return (
    <div className={`relative border-l-2 ${tone} ${opacity} transition-all duration-500`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-bg/40">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim">
          {label}
        </span>
        {badge && (
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${toneClass}`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

/* ----------------------------- WITH AARVION ----------------------------- */

function RequestPane({ state }: { state: PaneState }) {
  return (
    <PaneShell label="Request" state={state} badge="POST" badgeTone="neutral">
      <div className="font-mono text-[11.5px] leading-relaxed space-y-0.5">
        <Row k="endpoint" v="POST /v2/claims/refund" />
        <Row k="agent" v="claims.refund.v2" />
        <Row k="session" v="ses_8j2k4m9w7p" />
        <Row k="actor" v="anita.patel@acme.com" />
        <div className="mt-2 pt-2 border-t border-border/40 text-fg-muted">
          <span className="text-fg-dim">body</span>
        </div>
        <pre className="text-fg/90 mt-1 whitespace-pre-wrap">{`{
  "policy_id": "PL-887234",
  "amount_usd": 58000,
  "reason": "customer_request",
  "idempotency_key": "f3a9..c821"
}`}</pre>
      </div>
    </PaneShell>
  );
}

const PILLARS = [
  { k: "scope", v: "agent.refund ∈ allowed", state: "ok" as const },
  { k: "idempotency", v: "key present, single-use", state: "ok" as const },
  { k: "cost_rate", v: "$58k ≤ $75k cap", state: "ok" as const },
  {
    k: "reversibility",
    v: "settlement_open · closed 2h 14m ago",
    state: "fail" as const,
  },
  { k: "cascade", v: "blast_radius = 4 systems", state: "ok" as const },
  { k: "semantic", v: "endpoint matches declared effect", state: "ok" as const },
  { k: "authority", v: "narrow(actor.oauth)", state: "ok" as const },
];

function ManifestPane({ state, step }: { state: PaneState; step: Step }) {
  const evaluating = step <= 1;
  return (
    <PaneShell
      label="Manifest · claims-refund.v17.yaml"
      state={state}
      badge={evaluating ? "6 ✓ · 1 ✗" : "evaluated"}
      badgeTone={evaluating ? "hold" : "hold"}
    >
      <div className="grid grid-cols-[110px_1fr_22px] gap-x-3 gap-y-1 font-mono text-[11.5px] leading-relaxed">
        {PILLARS.map((p) => {
          const tone =
            p.state === "ok"
              ? "text-green"
              : p.state === "fail"
                ? "text-red"
                : "text-amber";
          const icon =
            p.state === "ok" ? (
              <Check size={12} className="text-green" />
            ) : p.state === "fail" ? (
              <X size={12} className="text-red" />
            ) : (
              <Clock size={12} className="text-amber" />
            );
          return (
            <div key={p.k} className="contents">
              <span className="text-fg-dim">{p.k}</span>
              <span className={p.state === "fail" ? "text-fg" : "text-fg-muted"}>
                {p.v}
              </span>
              <span className={`justify-self-end ${tone}`}>{icon}</span>
            </div>
          );
        })}
      </div>
    </PaneShell>
  );
}

function DecisionPane({ state }: { state: PaneState }) {
  return (
    <PaneShell
      label="Decision"
      state={state}
      badge="HELD"
      badgeTone="hold"
    >
      <div className="space-y-1.5 font-mono text-[11.5px] leading-relaxed">
        <Row k="status" v="HELD · routed for human approval" tone="amber" />
        <Row k="latency" v="1.4 ms · in-memory radix" />
        <Row k="approver" v="claims.ops.manager" />
        <Row
          k="reason"
          v="reversibility::settlement_window closed 2h 14m before request"
          mono
        />
        <Row k="recovery" v="$1,200 legal cost if approved post-window" />
        <div className="mt-2 pt-2 border-t border-border/40 flex items-center gap-2 text-amber/90">
          <AlertTriangle size={13} />
          <span className="text-[11px] text-amber">
            Action paused. Caller receives 202 Accepted + approval token.
          </span>
        </div>
      </div>
    </PaneShell>
  );
}

function ProvenancePane({ state }: { state: PaneState }) {
  return (
    <PaneShell
      label="Provenance · PRV-4820"
      state={state}
      badge="signed"
      badgeTone="ok"
    >
      <div className="font-mono text-[11.5px] leading-relaxed space-y-1">
        <Row k="record_id" v="PRV-4820" />
        <Row k="prev_hash" v="sha256:7f2b9c1e..ab87" mono />
        <Row k="curr_hash" v="sha256:c3d8a17f..91d2" mono />
        <Row k="manifest" v="claims-refund.v17 · git@4f1a9b" mono />
        <Row k="approved_by" v="meera.joshi@acme · 14:22:14Z" />
        <Row k="witness" v="external-ts.example.com ✓" />
        <div className="mt-2 pt-2 border-t border-border/40 flex items-center gap-2">
          <Hash size={13} className="text-green" />
          <span className="text-[11px] text-green">
            Chain valid · provable in 90s via{" "}
            <span className="text-fg/90">aarvion query</span>
          </span>
        </div>
      </div>
    </PaneShell>
  );
}

/* ----------------------------- WITHOUT AARVION ----------------------------- */

function ResponsePane({ state }: { state: PaneState }) {
  return (
    <PaneShell
      label="Response · API"
      state={state}
      badge="200 OK"
      badgeTone="ok"
    >
      <div className="font-mono text-[11.5px] leading-relaxed space-y-1">
        <Row k="status" v="200 OK · refund.processed" />
        <Row k="latency" v="180 ms" />
        <Row k="amount" v="$58,000 debited from float account" />
        <div className="mt-2 pt-2 border-t border-border/40 flex items-center gap-2">
          <AlertTriangle size={13} className="text-red" />
          <span className="text-[11px] text-red">
            No precondition was ever checked. The settlement window closed 2h 14m ago.
          </span>
        </div>
      </div>
    </PaneShell>
  );
}

const CASCADE = [
  {
    sys: "marketing.webhook",
    effect: "fired refund.event → 200 customer notifications",
    state: "fail" as const,
  },
  {
    sys: "analytics.bi.refunds",
    effect: "row inserted with stale tax classification",
    state: "fail" as const,
  },
  {
    sys: "finance.ar.invoices",
    effect: "41 invoice references now orphaned",
    state: "fail" as const,
  },
  {
    sys: "ledger.gl.recon",
    effect: "debit/credit mismatch · $58k drift",
    state: "fail" as const,
  },
];

function CascadePane({ state }: { state: PaneState }) {
  return (
    <PaneShell
      label="Downstream cascade"
      state={state}
      badge="4 silent faults"
      badgeTone="fail"
    >
      <div className="font-mono text-[11.5px] leading-relaxed space-y-1">
        {CASCADE.map((c) => (
          <div
            key={c.sys}
            className="grid grid-cols-[170px_1fr_18px] gap-x-3 items-baseline"
          >
            <span className="text-fg-muted truncate">{c.sys}</span>
            <span className="text-fg-dim truncate">{c.effect}</span>
            <X size={12} className="text-red/80 justify-self-end" />
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-border/40 text-[11px] text-fg-dim">
          Detected by finance close <span className="text-red">+ 9 days</span>.
          No causal chain linking events.
        </div>
      </div>
    </PaneShell>
  );
}

const LOG_FRAGMENTS = [
  { name: "vendor.refund.log", lines: "2,184", trust: "partial" },
  { name: "api.gateway.log", lines: "11,402", trust: "partial" },
  { name: "db.audit.trail", lines: "873", trust: "partial" },
  { name: "webhook.relay.log", lines: "412", trust: "partial" },
];

function AuditFragmentsPane({ state }: { state: PaneState }) {
  return (
    <PaneShell
      label="Audit reconstruction"
      state={state}
      badge="≈ 14 days"
      badgeTone="fail"
    >
      <div className="font-mono text-[11.5px] leading-relaxed">
        <div className="grid grid-cols-[1fr_60px_80px] gap-x-3 text-[10px] uppercase tracking-wider text-fg-dim border-b border-border/40 pb-1.5 mb-1.5">
          <span>source</span>
          <span className="text-right">lines</span>
          <span className="text-right">trust</span>
        </div>
        {LOG_FRAGMENTS.map((l) => (
          <div
            key={l.name}
            className="grid grid-cols-[1fr_60px_80px] gap-x-3 py-0.5 text-fg-muted"
          >
            <span>
              <FileText
                size={11}
                className="inline mr-1.5 text-fg-dim"
              />
              {l.name}
            </span>
            <span className="text-right text-fg-dim">{l.lines}</span>
            <span className="text-right text-red/80">{l.trust}</span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-border/40 text-[11px] text-fg-dim">
          No cryptographic link between streams.{" "}
          <span className="text-red">Regulator unconvinced.</span>
        </div>
      </div>
    </PaneShell>
  );
}

/* ----------------------------- Row primitive ----------------------------- */

function Row({
  k,
  v,
  tone,
  mono = false,
}: {
  k: string;
  v: string;
  tone?: "amber" | "red" | "green";
  mono?: boolean;
}) {
  const toneClass = tone
    ? {
        amber: "text-amber",
        red: "text-red",
        green: "text-green",
      }[tone]
    : "text-fg/90";
  return (
    <div className="grid grid-cols-[100px_1fr] gap-x-3 items-baseline">
      <span className="text-fg-dim">{k}</span>
      <span className={`${toneClass} ${mono ? "" : ""} truncate`}>{v}</span>
    </div>
  );
}
