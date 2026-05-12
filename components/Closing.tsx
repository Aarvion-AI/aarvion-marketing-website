export function Closing() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-cyan/10 via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-balance text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
          Enterprise AI is ready.
          <br />
          Enterprise infrastructure is not.
          <br />
          <span className="text-cyan">We fix that.</span>
        </h2>
        <div className="mt-9 flex items-center justify-center gap-3">
          <a
            href="#partnership"
            className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:bg-cyan transition-colors"
          >
            Apply for design partnership
            <span aria-hidden>→</span>
          </a>
          <a
            href="mailto:founders@aarvion.ai"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-panel px-4 py-2.5 text-sm font-medium text-fg hover:border-cyan/40 transition-colors"
          >
            founders@aarvion.ai
          </a>
        </div>
      </div>
    </section>
  );
}
