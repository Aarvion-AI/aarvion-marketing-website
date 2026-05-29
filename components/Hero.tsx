import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div
        className="absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-cyan/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-panel/60 px-3 py-1 text-xs text-fg-muted">
              <span className="dot bg-cyan pulse-dot" />
              Now onboarding design partners
            </div>
            <h1 className="mt-7 text-balance text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
              Govern every AI agent before it touches production.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-fg-muted leading-relaxed">
              Aarvion sits between your AI agents and your regulated systems.
              You decide what they&apos;re allowed to do. We enforce it on every
              call — and prove it to your business, your engineers, and your
              regulator.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#partnership"
                className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:bg-cyan transition-colors"
              >
                Apply for design partnership
                <span aria-hidden>→</span>
              </a>
              <a
                href="#loop"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-panel px-4 py-2.5 text-sm font-medium text-fg hover:border-cyan/40 transition-colors"
              >
                See the loop
              </a>
            </div>
          </div>
          <div className="relative">
            <HeroVisual className="w-full h-auto" />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-fg-dim">
          <span>Designed against the controls expected by</span>
          <span className="text-fg-muted">SOC 2 Type II</span>
          <span className="text-fg-muted">ISO 27001</span>
          <span className="text-fg-muted">GDPR</span>
          <span className="text-fg-muted">HIPAA</span>
          <span className="text-fg-muted">EU AI Act</span>
          <span className="text-fg-muted">FFIEC</span>
        </div>
      </div>
    </section>
  );
}
