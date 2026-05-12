"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

type Verdict = "pass" | "held" | "block";
type Status = Verdict | "processing";

type Decision = {
  id: number;
  time: string;
  agent: string;
  action: string;
  rule: string;
  status: Status;
  ms: string;
};

type TraceCheck = {
  k: string;
  v: string;
  state: "ok" | "fail";
};

type Trace = {
  id: string;
  status: Verdict;
  checks: TraceCheck[];
};

const AGENTS = [
  { name: "claims.refund", status: "live" },
  { name: "fraud.scan", status: "live" },
  { name: "billing.copilot", status: "held" },
  { name: "policy.bot", status: "live" },
  { name: "crm.copilot", status: "blocked" },
  { name: "claims.triage", status: "live" },
];

type StreamItem = {
  agent: string;
  action: string;
  rule: string;
  ms: string;
  result: Verdict;
  trace?: Trace;
};

// Curated rolling stream — verdicts pre-set so the demo always shows a mix.
const STREAM: StreamItem[] = [
  { agent: "fraud.scan",     action: "GET /score",       rule: "scope ✓",        ms: "0.8", result: "pass" },
  { agent: "claims.triage",  action: "POST /assign",     rule: "scope ✓",        ms: "1.1", result: "pass" },
  { agent: "policy.bot",     action: "POST /quote",      rule: "scope ✓",        ms: "0.9", result: "pass" },
  {
    agent: "claims.refund",
    action: "POST /refund",
    rule: "settlement_win…",
    ms: "1.4",
    result: "held",
    trace: {
      id: "trc_8j2k4m",
      status: "held",
      checks: [
        { k: "scope",         v: "agent.refund ∈ allowed",          state: "ok" },
        { k: "idempotency",   v: "key present, single-use",          state: "ok" },
        { k: "cost_rate",     v: "$58k ≤ $75k cap",                  state: "ok" },
        { k: "reversibility", v: "settlement_window closed 2h 14m",  state: "fail" },
        { k: "cascade",       v: "blast_radius = 4 systems",          state: "ok" },
      ],
    },
  },
  { agent: "fraud.scan",       action: "POST /flag",        rule: "pattern ✓",     ms: "0.9", result: "pass" },
  { agent: "billing.copilot",  action: "POST /charge",      rule: "idempotency ✓", ms: "1.0", result: "pass" },
  {
    agent: "crm.copilot",
    action: "DELETE /contact",
    rule: "blast_radius>5",
    ms: "0.8",
    result: "block",
    trace: {
      id: "trc_3p9q2v",
      status: "block",
      checks: [
        { k: "scope",         v: "agent.crm ∈ allowed",                state: "ok" },
        { k: "idempotency",   v: "single-use",                          state: "ok" },
        { k: "cost_rate",     v: "n/a",                                 state: "ok" },
        { k: "reversibility", v: "soft_delete window 30d",              state: "ok" },
        { k: "cascade",       v: "blast_radius = 8 systems · cap = 5",  state: "fail" },
      ],
    },
  },
  { agent: "claims.triage",    action: "GET /policies",     rule: "scope ✓",       ms: "0.7", result: "pass" },
  { agent: "policy.bot",       action: "POST /preview",     rule: "semantic ✓",    ms: "1.2", result: "pass" },
  {
    agent: "billing.copilot",
    action: "PUT /grant",
    rule: "approval window",
    ms: "1.1",
    result: "held",
    trace: {
      id: "trc_h7n2k1",
      status: "held",
      checks: [
        { k: "scope",       v: "agent.billing.grant ∈ allowed",  state: "ok" },
        { k: "idempotency", v: "key present",                     state: "ok" },
        { k: "cost_rate",   v: "$3.2k credit",                    state: "ok" },
        { k: "approval",    v: "amount > $1k requires human",     state: "fail" },
        { k: "authority",   v: "narrow(actor.oauth)",             state: "ok" },
      ],
    },
  },
  { agent: "fraud.scan",     action: "POST /flag",   rule: "rate ✓",  ms: "0.8", result: "pass" },
  { agent: "claims.refund",  action: "POST /refund", rule: "scope ✓", ms: "1.3", result: "pass" },
];

const DEFAULT_TRACE: Trace = STREAM.find((s) => s.trace)!.trace!;

const SEED_FEED: Decision[] = [
  { id: 1, time: "14:22:05", agent: "crm.copilot",     action: "DELETE /contact", rule: "blast_radius>5",  status: "block", ms: "0.8" },
  { id: 2, time: "14:22:04", agent: "policy.bot",      action: "POST /quote",     rule: "scope ✓",         status: "pass",  ms: "1.2" },
  { id: 3, time: "14:22:04", agent: "billing.copilot", action: "PUT /grant",      rule: "approval window", status: "held",  ms: "1.1" },
  { id: 4, time: "14:22:03", agent: "fraud.scan",      action: "POST /flag",      rule: "pattern ✓",       status: "pass",  ms: "0.9" },
  { id: 5, time: "14:22:03", agent: "claims.refund",   action: "POST /refund",    rule: "scope ✓",         status: "pass",  ms: "1.4" },
];

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
function timeString(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

export function HeroVisual({ className = "" }: { className?: string }) {
  const [feed, setFeed] = useState<Decision[]>(SEED_FEED);
  const [trace, setTrace] = useState<Trace>(DEFAULT_TRACE);
  const [traceFlash, setTraceFlash] = useState(false);
  const [actionsPerSec, setActionsPerSec] = useState(4820);
  const [passed, setPassed] = useState(4805);
  const [held, setHeld] = useState(3);
  const [blocked, setBlocked] = useState(12);
  const cursor = useRef(0);
  const idRef = useRef(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = () => {
      if (cancelled) return;
      const item = STREAM[cursor.current % STREAM.length];
      cursor.current += 1;
      const id = idRef.current++;
      const time = timeString(new Date());

      // Step 1 — prepend as processing
      setFeed((prev) =>
        [
          {
            id,
            time,
            agent: item.agent,
            action: item.action,
            rule: item.rule,
            status: "processing" as Status,
            ms: "—",
          },
          ...prev,
        ].slice(0, 5)
      );

      // Step 2 — resolve verdict ~750ms later
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setFeed((prev) =>
            prev.map((d) =>
              d.id === id ? { ...d, status: item.result, ms: item.ms } : d
            )
          );

          if (item.result === "held") setHeld((v) => v + 1);
          else if (item.result === "block") setBlocked((v) => v + 1);
          else setPassed((v) => v + 1);

          setActionsPerSec((a) => a + 1 + Math.floor(Math.random() * 4));

          if (item.trace) {
            setTrace(item.trace);
            setTraceFlash(true);
            timers.push(setTimeout(() => setTraceFlash(false), 600));
          }
        }, 750)
      );

      // Step 3 — schedule next
      timers.push(setTimeout(tick, 2100 + Math.random() * 700));
    };

    timers.push(setTimeout(tick, 1200));

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-lg border border-border-strong bg-bg-elev/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
        <Header />
        <div className="grid grid-cols-[124px_minmax(0,1fr)] divide-x divide-border/60">
          <AgentRail />
          <div className="divide-y divide-border/60">
            <DecisionFeed feed={feed} />
            <TraceInspector trace={trace} flash={traceFlash} />
          </div>
        </div>
        <Footer
          actionsPerSec={actionsPerSec}
          passed={passed}
          held={held}
          blocked={blocked}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
          }}
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-3xl bg-gradient-to-tr from-cyan/20 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-border/80 bg-bg/70 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        <span className="ml-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
          aarvion.runtime · prod
        </span>
      </div>
      <div className="flex items-center gap-4 font-mono text-[10.5px] text-fg-muted">
        <span className="hidden sm:inline">manifest v17 · git@4f1a9b</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green pulse-dot" />
          live
        </span>
      </div>
    </div>
  );
}

function AgentRail() {
  return (
    <div className="py-2">
      <div className="px-3.5 pb-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-dim">
        agents · 6
      </div>
      {AGENTS.map((a) => (
        <div
          key={a.name}
          className="px-3.5 py-1.5 flex items-center gap-2 font-mono text-[11px]"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
              a.status === "live"
                ? "bg-green pulse-dot"
                : a.status === "held"
                  ? "bg-amber"
                  : "bg-red"
            }`}
          />
          <span className="text-fg/90 truncate">{a.name}</span>
        </div>
      ))}
    </div>
  );
}

function DecisionFeed({ feed }: { feed: Decision[] }) {
  return (
    <div>
      <div className="grid grid-cols-[62px_1fr_98px_56px_44px] gap-2 px-4 pt-2 pb-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-dim border-b border-border/60">
        <span>time</span>
        <span>agent · action</span>
        <span>rule</span>
        <span className="text-right">verdict</span>
        <span className="text-right">ms</span>
      </div>
      <div className="px-4 py-1.5">
        {feed.map((d) => (
          <Row key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
}

function Row({ d }: { d: Decision }) {
  const tone =
    d.status === "pass"
      ? "text-green"
      : d.status === "held"
        ? "text-amber"
        : d.status === "block"
          ? "text-red"
          : "text-fg-dim";
  const label =
    d.status === "pass"
      ? "PASS"
      : d.status === "held"
        ? "HELD"
        : d.status === "block"
          ? "BLOCK"
          : "•••";
  const isProcessing = d.status === "processing";
  return (
    <div
      className={`grid grid-cols-[62px_1fr_98px_56px_44px] gap-2 py-[5px] border-b border-border/40 last:border-b-0 font-mono text-[11px] hero-row ${
        isProcessing ? "hero-row-processing" : ""
      }`}
      data-status={d.status}
    >
      <span className="text-fg-dim">{d.time}</span>
      <span className="text-fg/90 truncate">
        <span className="text-fg-muted">{d.agent}</span>
        <span className="text-fg-dim mx-1.5">·</span>
        {d.action}
      </span>
      <span
        className={`truncate ${
          isProcessing ? "text-fg-muted hero-shimmer" : "text-fg-muted"
        }`}
      >
        {d.rule}
      </span>
      <span
        className={`text-right font-medium ${tone} ${
          isProcessing ? "hero-dots" : ""
        }`}
      >
        {label}
      </span>
      <span className="text-right text-fg-dim">{d.ms}</span>
    </div>
  );
}

function TraceInspector({
  trace,
  flash,
}: {
  trace: Trace;
  flash: boolean;
}) {
  const statusLabel =
    trace.status === "held" ? "HELD" : trace.status === "block" ? "BLOCK" : "PASS";
  const statusTone =
    trace.status === "held"
      ? "text-amber"
      : trace.status === "block"
        ? "text-red"
        : "text-green";
  return (
    <div
      className={`px-4 py-3 bg-bg/40 transition-colors duration-500 ${
        flash ? "bg-amber/[0.06]" : ""
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-dim mb-2">
        <span>
          active trace ·{" "}
          <span className="text-fg-muted normal-case tracking-normal">
            {trace.id}
          </span>
        </span>
        <span className={statusTone}>{statusLabel}</span>
      </div>
      <div
        key={trace.id}
        className="grid grid-cols-[100px_1fr_18px] gap-x-2.5 gap-y-0.5 font-mono text-[10.5px] fade-up"
      >
        {trace.checks.map((c) => {
          const tone = c.state === "ok" ? "text-green" : "text-red";
          const Icon = c.state === "ok" ? Check : X;
          return (
            <div key={c.k} className="contents">
              <span className="text-fg-dim">{c.k}</span>
              <span
                className={
                  c.state === "fail" ? "text-fg" : "text-fg-muted truncate"
                }
              >
                {c.v}
              </span>
              <span className={`justify-self-end ${tone}`}>
                <Icon size={11} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Footer({
  actionsPerSec,
  passed,
  held,
  blocked,
}: {
  actionsPerSec: number;
  passed: number;
  held: number;
  blocked: number;
}) {
  return (
    <div className="flex items-center justify-between border-t border-border/80 bg-bg/60 px-4 py-2.5 font-mono text-[10.5px] text-fg-muted">
      <span>
        <span className="text-fg tabular-nums">
          {actionsPerSec.toLocaleString()}
        </span>
        <span className="text-fg-dim ml-1">actions/s</span>
      </span>
      <span className="hidden sm:inline tabular-nums">
        passed <span className="text-fg">{passed.toLocaleString()}</span>
        <span className="text-fg-dim mx-1">·</span>
        held <span className="text-fg">{held}</span>
        <span className="text-fg-dim mx-1">·</span>
        blocked <span className="text-fg">{blocked}</span>
      </span>
      <span className="text-fg-dim">
        p99 <span className="text-fg">4.2 ms</span>
      </span>
    </div>
  );
}
