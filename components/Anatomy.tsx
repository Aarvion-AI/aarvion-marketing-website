"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { AnatomyScene } from "./AnatomyScene";

type Variant = "without" | "with";
type Step = 0 | 1 | 2 | 3;

const STEPS: { variant: Variant; title: string; body: string }[] = [
  {
    variant: "without",
    title: "The agent calls the refund API",
    body:
      "Token is valid. Scope is allowed. The request goes straight through. Nothing in the path knows the rule the agent is about to break.",
  },
  {
    variant: "without",
    title: "The API answers 200 — but the customer is past their window",
    body:
      "No precondition was ever checked. A 30-second reversal becomes a 30-day legal recovery. The agent doesn't even realize anything is wrong.",
  },
  {
    variant: "without",
    title: "Four downstream systems break, silently",
    body:
      "Marketing fires. The BI table drifts. Forty-one finance invoices lose their reference. The ledger debit/credit drifts $58K. Nobody notices for nine days.",
  },
  {
    variant: "without",
    title: "The audit can't be reconstructed",
    body:
      "Four log streams, no cryptographic link between them. Two engineers, fourteen days, one incomplete picture. The regulator stays skeptical.",
  },
  {
    variant: "with",
    title: "The same call enters Aarvion first",
    body:
      "The request is intercepted before it reaches any system of record. Identity, scope, agent, and session are bound to the call.",
  },
  {
    variant: "with",
    title: "Seven primitives are checked against your manifest",
    body:
      "Scope, idempotency, cost, reversibility, cascade, semantic drift, authority. Six pass. One fails — reversibility, because the settlement window closed 2h 14m ago.",
  },
  {
    variant: "with",
    title: "The action is held, not blocked",
    body:
      "A human reviewer is routed in with the full context — including the recovery cost if they approve anyway. Their decision is signed against the rule it crossed.",
  },
  {
    variant: "with",
    title: "A signed record joins the provenance chain",
    body:
      "A 2 KB, hash-chained, externally witnessed entry. Provable to your regulator in 90 seconds. Tamper any field — the chain breaks, mathematically.",
  },
];

export function Anatomy() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const idx = Number(visible[0].target.getAttribute("data-step"));
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

  const variant: Variant = active < 4 ? "without" : "with";
  const stepInVariant = (active % 4) as Step;

  return (
    <section id="anatomy" className="relative border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-cyan font-mono">
            In action
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Same agent. Same request. Two very different outcomes.
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed">
            A claims agent tries to refund a customer who&apos;s already past
            the settlement window. Scroll to watch the request flow through
            Aarvion — and what happens when it doesn&apos;t.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 rounded-md border border-border-strong bg-panel/60 px-3.5 py-1.5 font-mono text-[12px] text-fg-muted">
            <span className="dot bg-cyan pulse-dot" />
            <span className="text-fg">claims.refund.v2</span>
            <span aria-hidden className="text-fg-dim">
              →
            </span>
            <span className="text-fg">POST /v2/claims/refund</span>
            <span className="text-fg-dim">·</span>
            <span>$58,000</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: scrolling steps */}
          <div className="space-y-[44vh] lg:py-[28vh]">
            {STEPS.map((s, i) => (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
                className={`transition-opacity duration-500 ${
                  active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md border font-mono text-[11px] ${
                      s.variant === "with"
                        ? "border-cyan/40 bg-cyan/[0.06] text-cyan"
                        : "border-fg-dim/30 bg-bg-elev text-fg-muted"
                    }`}
                  >
                    {(i % 4) + 1}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] ${
                      s.variant === "with" ? "text-cyan" : "text-fg-muted"
                    }`}
                  >
                    {s.variant === "with" ? (
                      <ShieldCheck size={12} />
                    ) : (
                      <ShieldAlert size={12} />
                    )}
                    {s.variant === "with" ? "With Aarvion" : "Without Aarvion"}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-[26px] font-semibold tracking-tight leading-[1.2] text-fg">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-fg-muted leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right: sticky console */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AnatomyScene step={stepInVariant} variant={variant} />
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.12em] text-fg-dim">
                <span>
                  {variant === "with" ? "with aarvion" : "without aarvion"}
                </span>
                <span className="flex items-center gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-[3px] w-7 rounded-full transition-colors duration-300 ${
                        i === stepInVariant
                          ? variant === "with"
                            ? "bg-cyan"
                            : "bg-fg-muted"
                          : "bg-border-strong"
                      }`}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <AnatomyScene step={stepInVariant} variant={variant} />
          </div>
        </div>
      </div>
    </section>
  );
}
