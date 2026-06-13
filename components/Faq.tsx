import type { Faq as FaqItem } from "@/lib/seo";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
            Frequently asked
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
            AI agent governance, answered.
          </h2>
        </div>

        <dl className="mt-12 divide-y divide-border/60 border-y border-border/60">
          {items.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="text-lg font-medium text-fg tracking-tight">
                {item.question}
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
