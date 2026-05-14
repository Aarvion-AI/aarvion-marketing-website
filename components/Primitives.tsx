"use client";

import { useEffect, useRef, useState } from "react";
import {
  Undo2,
  Network,
  Repeat,
  Gauge,
  Shuffle,
  GitBranch,
  KeyRound,
  AlertTriangle,
  Check,
  Clock,
  X,
} from "lucide-react";

type Primitive = {
  index: string;
  name: string;
  oneLine: string;
  failure: string;
  example: { headline: string; detail: string };
  manifestLabel: string;
  manifest: string;
  outcome: { label: "PASS" | "HOLD" | "BLOCK"; text: string };
  icon: React.ReactNode;
};

const PRIMITIVES: Primitive[] = [
  {
    index: "01",
    name: "Reversibility",
    oneLine: "Some actions can't be undone in seconds.",
    failure:
      "API specs don't say whether an action is reversible, in what window, or at what cost. Agents act as if everything is reversible — and most things aren't.",
    example: {
      headline: "Payments agent · 47 wires processed post-Fed cutoff",
      detail:
        "A 30-second reversal becomes a 30-day legal recovery. $1,200 in fees per wire. The agent reports success and moves on.",
    },
    manifestLabel: "manifest · reversibility",
    manifest: `reversibility:
  reversible_until: settlement_window_end
  cost_after_window:
    type: external_recovery
    sla_days: 30
  on_violation: hold`,
    outcome: {
      label: "HOLD",
      text: "Aarvion blocks the call past the window and routes to a human approver with the recovery cost visible.",
    },
    icon: <Undo2 size={15} />,
  },
  {
    index: "02",
    name: "Cascade",
    oneLine: "One call quietly triggers many others.",
    failure:
      "A single endpoint silently fires webhooks, breaks BI tables, and orphans finance records. The agent sees one 200 OK — the business sees four downstream incidents.",
    example: {
      headline: "CRM agent · 230 contacts deleted",
      detail:
        "Marketing webhooks fire to 200 customers. BI table drifts. 41 finance invoices lose their reference. Nobody connects the dots for 9 days.",
    },
    manifestLabel: "manifest · cascade",
    manifest: `cascade:
  blast_max: 3 systems
  edges:
    - marketing.automation: webhook_emit
    - finance.ar:          invoice_reference
    - analytics.bi:        row_insert
  policy:
    pre_call: blast_radius_preview`,
    outcome: {
      label: "BLOCK",
      text: "Aarvion previews the blast radius before the agent fires. Calls exceeding the declared limit are blocked and returned to the caller with context.",
    },
    icon: <Network size={15} />,
  },
  {
    index: "03",
    name: "Idempotency",
    oneLine: "Retries that look harmless double-charge.",
    failure:
      "A retry mechanism that's safe for reads is catastrophic for mutations. Without a single-use key on every state-changing call, duplicates pile up silently.",
    example: {
      headline: "Payments retry · fired 3 times",
      detail:
        "Customer charged $9,000 instead of $3,000. Two refunds reconciled four weeks later. Trust gone.",
    },
    manifestLabel: "manifest · idempotency",
    manifest: `idempotency:
  required: true
  key_header: X-Idempotency-Key
  key_lifetime: 24h
  on_duplicate: return_cached_result
applies_to:
  methods: [POST, PUT, PATCH, DELETE]`,
    outcome: {
      label: "BLOCK",
      text: "Aarvion rejects any mutation without a unique key. Duplicates return the cached prior result — never re-execute.",
    },
    icon: <Repeat size={15} />,
  },
  {
    index: "04",
    name: "Cost & rate",
    oneLine: "Agents don't know their economic cost.",
    failure:
      "An agent has no awareness of how much its calls cost. It will happily blow past a monthly budget on a single workflow, then keep going.",
    example: {
      headline: "Enrichment agent · 200K backfills past free tier",
      detail:
        "Agent unaware of pricing. $22,500 bill on a $5,000 budget. Finance discovers it in next-month invoicing.",
    },
    manifestLabel: "manifest · cost_rate",
    manifest: `cost_model:
  per_call_usd: 0.10
  free_tier_per_month: 50000
budget_caps:
  per_session_usd: 250
  per_month_usd: 5000
policy:
  pre_batch: est_cost < session_cap
  on_violation: hold`,
    outcome: {
      label: "HOLD",
      text: "Aarvion estimates the cost of a batch before it runs. If predicted spend exceeds the cap, the action holds until a human approves the overage.",
    },
    icon: <Gauge size={15} />,
  },
  {
    index: "05",
    name: "Semantic drift",
    oneLine: "Endpoint names lie.",
    failure:
      "An endpoint named /preview actually reserves inventory. The API spec says one thing; the implementation does another. Agents trust the name.",
    example: {
      headline: "Sales agent · /preview reserves inventory",
      detail:
        "340 quotes silently locked up $3.2M in warehouse stock. Discovered when ops noticed shipping delays a week later.",
    },
    manifestLabel: "manifest · semantic",
    manifest: `category:
  declared:   read_only_preview
  actual:     side_effecting
  when:       pricing_tier == 'custom'
side_effects:
  - inventory.reservation
on_mismatch: hold`,
    outcome: {
      label: "HOLD",
      text: "Aarvion declares the real effect of every endpoint, not the apparent one. Calls whose name disagrees with their behavior route for review.",
    },
    icon: <Shuffle size={15} />,
  },
  {
    index: "06",
    name: "State coupling",
    oneLine: "Some actions are only safe in specific states.",
    failure:
      "Order of operations matters. Refunding a subscription before canceling dunning means collections call customers about money you already returned.",
    example: {
      headline: "Billing agent · refund in past_due state",
      detail:
        "Subscription refunded while dunning still active. Customers received collections threats the next day. Support tickets and chargebacks followed.",
    },
    manifestLabel: "manifest · preconditions",
    manifest: `preconditions:
  state_specific_rules:
    active:
      allowed: true
    past_due:
      required_first: cancel_dunning
    canceled:
      allowed: false`,
    outcome: {
      label: "HOLD",
      text: "Aarvion holds the action until the precondition is met, or routes the state mismatch to a human resolver.",
    },
    icon: <GitBranch size={15} />,
  },
  {
    index: "07",
    name: "Authority scope",
    oneLine: "Agents inherit too much credential.",
    failure:
      "An agent given a human's OAuth token receives the human's full authority — including things the task doesn't need. Credential authority is not contextual authority.",
    example: {
      headline: "Code agent · inherited eng-manager admin token",
      detail:
        "At 3 AM the agent merged 47 PRs across 38 repos. The actor wasn't online. Recovery: full audit, multi-day rollback, security review.",
    },
    manifestLabel: "manifest · authority",
    manifest: `agent_scope:
  inherits_from: actor.oauth_scope
  must_be_narrower: true
  must_match_task: true
pattern_constraints:
  actor_recently_active: required
  business_hours: prefer`,
    outcome: {
      label: "BLOCK",
      text: "Aarvion narrows every agent token to the minimum scope the task actually requires, then verifies the actor was recently active.",
    },
    icon: <KeyRound size={15} />,
  },
];

export function Primitives() {
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
            visible[0].target.getAttribute("data-primitive")
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

  const current = PRIMITIVES[active];

  return (
    <section className="relative border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
            What every phase governs
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
            Seven failure modes that quietly break AI in production.
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed max-w-xl">
            Each one needs its own check, encoded in your manifest. An API
            gateway can&apos;t catch them. A model guardrail can&apos;t catch
            them. A log can only describe them, after the damage.
          </p>
        </div>
      </div>

      {/* ============ DESKTOP: scroll-driven 2-column ============ */}
      <div className="hidden lg:block mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: scrolling primitives */}
          <ol className="space-y-[34vh] lg:py-[26vh]">
            {PRIMITIVES.map((p, i) => {
              const isActive = active === i;
              return (
                <li
                  key={p.index}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-primitive={i}
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
                      className={`inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                        isActive ? "text-cyan" : "text-fg-dim"
                      }`}
                    >
                      {p.icon}
                      Primitive
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-[34px] font-semibold tracking-tight leading-[1.1] text-fg">
                    {p.name}
                  </h3>
                  <p className="mt-2 italic text-fg-dim text-base">
                    {p.oneLine}
                  </p>
                  <p className="mt-4 max-w-md text-fg-muted leading-relaxed">
                    {p.failure}
                  </p>
                  <div className="mt-5 max-w-md rounded-lg border border-red/20 bg-red/[0.04] px-4 py-3">
                    <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.14em] text-red/90">
                      <AlertTriangle size={11} />
                      Real failure
                    </div>
                    <p className="mt-2 text-[13.5px] font-medium text-fg">
                      {p.example.headline}
                    </p>
                    <p className="mt-1 text-[12.5px] text-fg-muted leading-relaxed">
                      {p.example.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Right: sticky artifact panel */}
          <div>
            <div className="sticky top-24">
              <article
                key={current.index}
                className="rounded-xl border border-border/80 bg-panel/40 overflow-hidden fade-up"
              >
                <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
                  <div className="flex items-center gap-2 text-cyan">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10">
                      {current.icon}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">
                      Primitive · {current.index}
                    </span>
                  </div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-dim">
                    {current.index} / 07
                  </span>
                </div>
                <div className="px-6 py-5 border-b border-border/70">
                  <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                    <span>{current.manifestLabel}</span>
                    <span>yaml</span>
                  </div>
                  <pre className="font-mono text-[11.5px] leading-[1.65] text-fg/90 overflow-x-auto">
                    {current.manifest.split("\n").map((line, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-fg-dim/60 select-none w-5 text-right">
                          {i + 1}
                        </span>
                        <span>
                          <ManifestLine line={line} />
                        </span>
                      </div>
                    ))}
                  </pre>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <OutcomeBadge label={current.outcome.label} />
                    <p className="text-[13.5px] text-fg-muted leading-relaxed flex-1">
                      {current.outcome.text}
                    </p>
                  </div>
                </div>
              </article>

              <div className="mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-fg-dim">
                <span className="flex items-center gap-1">
                  {PRIMITIVES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-[3px] w-5 rounded-full transition-colors duration-300 ${
                        i === active ? "bg-cyan" : "bg-border-strong"
                      }`}
                    />
                  ))}
                </span>
                <span className="ml-2">
                  {current.index} of 07 · {current.name.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============ MOBILE: all primitives stacked inline with their artifacts ============ */}
      <div className="lg:hidden mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-5">
        {PRIMITIVES.map((p) => (
          <article
            key={p.index}
            className="rounded-xl border border-border/80 bg-panel/40 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 sm:px-5 py-3">
              <div className="flex items-center gap-2 text-cyan">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10">
                  {p.icon}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]">
                  Primitive · {p.index}
                </span>
              </div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-dim">
                {p.index} / 07
              </span>
            </div>

            <div className="px-4 sm:px-5 py-5">
              <h3 className="text-2xl font-semibold tracking-tight text-fg leading-tight">
                {p.name}
              </h3>
              <p className="mt-1.5 italic text-fg-dim text-sm">{p.oneLine}</p>
              <p className="mt-3 text-fg-muted leading-relaxed text-[14.5px]">
                {p.failure}
              </p>

              <div className="mt-4 rounded-lg border border-red/20 bg-red/[0.04] px-3.5 py-3">
                <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.14em] text-red/90">
                  <AlertTriangle size={11} />
                  Real failure
                </div>
                <p className="mt-2 text-[13.5px] font-medium text-fg">
                  {p.example.headline}
                </p>
                <p className="mt-1 text-[12.5px] text-fg-muted leading-relaxed">
                  {p.example.detail}
                </p>
              </div>
            </div>

            <div className="border-t border-border/60 bg-bg-elev/40 px-4 sm:px-5 py-4">
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                <span className="truncate">{p.manifestLabel}</span>
                <span>yaml</span>
              </div>
              <pre className="font-mono text-[11px] leading-[1.65] text-fg/90 overflow-x-auto">
                {p.manifest.split("\n").map((line, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="text-fg-dim/60 select-none w-4 text-right">
                      {i + 1}
                    </span>
                    <span>
                      <ManifestLine line={line} />
                    </span>
                  </div>
                ))}
              </pre>
            </div>

            <div className="border-t border-border/60 px-4 sm:px-5 py-4">
              <div className="flex items-start gap-3">
                <OutcomeBadge label={p.outcome.label} />
                <p className="text-[13px] text-fg-muted leading-relaxed flex-1">
                  {p.outcome.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ManifestLine({ line }: { line: string }) {
  const colonIdx = line.indexOf(":");
  if (colonIdx === -1 || line.trim().startsWith("#")) {
    return <span className="text-fg-muted">{line}</span>;
  }
  const indent = line.match(/^\s*/)?.[0] ?? "";
  const key = line.slice(indent.length, colonIdx);
  const rest = line.slice(colonIdx);
  return (
    <>
      <span>{indent}</span>
      <span className="text-cyan">{key}</span>
      <span className="text-fg-muted">{rest}</span>
    </>
  );
}

function OutcomeBadge({ label }: { label: "PASS" | "HOLD" | "BLOCK" }) {
  const styles = {
    PASS: { Icon: Check, tone: "text-green border-green/40 bg-green/[0.07]" },
    HOLD: { Icon: Clock, tone: "text-amber border-amber/40 bg-amber/[0.07]" },
    BLOCK: { Icon: X, tone: "text-red border-red/40 bg-red/[0.07]" },
  }[label];
  const Icon = styles.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${styles.tone}`}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}
