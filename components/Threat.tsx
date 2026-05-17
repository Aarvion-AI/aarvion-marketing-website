export function Threat() {
  return (
    <section className="relative border-b border-border/60 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan/[0.06] to-transparent blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
          Why this matters
        </p>

        <div className="mt-7 space-y-6">
          <p className="text-2xl sm:text-[30px] font-semibold tracking-tight leading-[1.35] text-fg text-balance">
            Your AI agents are taking autonomous actions on your internal
            systems — based on input from external users you don&apos;t trust.
          </p>
          <p className="text-lg sm:text-xl leading-[1.6] text-fg-muted">
            Today, the only thing standing between a prompt injection and a
            real-money transaction is the LLM&apos;s good behavior.
          </p>
          <p className="text-lg sm:text-xl leading-[1.6] text-fg-muted">
            We make that deterministic. Every action the agent takes is
            authorized by your policy, in real time,{" "}
            <span className="text-fg">before it touches your systems</span>.
            The audit log proves what was allowed — and what was blocked.
          </p>
        </div>

        {/* Punchline */}
        <div className="mt-12 flex items-stretch gap-5">
          <span
            className="w-[3px] shrink-0 rounded-full bg-cyan"
            aria-hidden
          />
          <p className="text-[26px] sm:text-[34px] font-semibold tracking-tight leading-[1.2]">
            <span className="text-fg-muted">The LLM can be jailbroken.</span>
            <br />
            <span className="text-cyan">The gateway cannot.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
