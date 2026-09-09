import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Container } from "@/components/site/Container";
import { Faq } from "@/components/site/Faq";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { COMPARISON, PRICING_FAQS, TIERS } from "@/lib/pricing";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

const title = "Pricing";
const description =
  "Start with one workflow under Aarvion Runtime, then scale to your whole agent estate. Pilot, Production, and Enterprise plans, all deployed in your VPC.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title: `${title} · Aarvion`, description, url: `${SITE_URL}/pricing` },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          faqJsonLd(PRICING_FAQS),
        ]}
      />
      <main id="main-content">
        <PageHero
          label="Pricing"
          title="Start with one workflow. Scale to the whole estate."
          body="Every plan runs in your VPC with routing, policy, delegated authority, human review, and a signed record. Pricing is scoped to what runs under the runtime."
        />

        <Section className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <div className="grid gap-5 lg:grid-cols-3">
              {TIERS.map((tier, index) => (
                <Reveal key={tier.id} delay={index * 80}>
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-xl border p-7 shadow-card sm:p-8",
                      tier.featured
                        ? "border-indigo-deep bg-night text-paper-bright"
                        : "border-line bg-paper-bright text-ink",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="title">{tier.name}</h2>
                      {tier.featured && (
                        <span className="rounded-full bg-indigo px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-paper-bright">
                          Most teams
                        </span>
                      )}
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-[1.05rem] font-semibold",
                        tier.featured ? "text-indigo-pale" : "text-indigo-deep",
                      )}
                    >
                      {tier.tagline}
                    </p>
                    <p
                      className={cn(
                        "mt-3 text-[0.92rem] leading-relaxed",
                        tier.featured ? "text-paper-bright/70" : "text-ink-muted",
                      )}
                    >
                      {tier.audience}
                    </p>
                    <div className="mt-6">
                      <Button
                        href="/contact"
                        variant={tier.featured ? "light" : "secondary"}
                        className="w-full"
                      >
                        {tier.cta}
                        <ArrowRight aria-hidden="true" size={16} />
                      </Button>
                    </div>
                    <ul
                      className={cn(
                        "mt-7 grid gap-3 border-t pt-7",
                        tier.featured ? "border-night-line" : "border-line",
                      )}
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[0.92rem]">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              tier.featured
                                ? "bg-indigo text-paper-bright"
                                : "bg-tint-mint text-green",
                            )}
                          >
                            <Check aria-hidden="true" size={12} strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <p className="mt-6 text-center text-[0.88rem] text-ink-dim">
                No self-serve checkout yet. Every plan starts with a scoping call
                so the runtime matches what you actually run.
              </p>
            </Reveal>
          </Container>
        </Section>

        <Section labelledBy="compare-title" className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 id="compare-title" className="headline text-balance">
                Compare plans.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-paper-bright shadow-card">
                <table className="w-full min-w-[720px] border-collapse text-left text-[0.9rem]">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="w-[34%] px-6 py-4 font-semibold text-ink-dim">
                        <span className="mono-label">Capability</span>
                      </th>
                      {TIERS.map((tier) => (
                        <th
                          key={tier.id}
                          scope="col"
                          className="px-6 py-4 text-[1rem] font-bold text-ink"
                        >
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((group) => (
                      <GroupRows key={group.group} group={group.group} rows={group.rows} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </Container>
        </Section>

        <Section labelledBy="pricing-faq-title" className="pt-0 sm:pt-0 lg:pt-0">
          <Container className="max-w-4xl">
            <Reveal className="text-center">
              <h2 id="pricing-faq-title" className="headline text-balance">
                Pricing questions.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Faq items={PRICING_FAQS} group="pricing-faq" className="mt-10" />
            </Reveal>
          </Container>
        </Section>

        <ClosingCta
          title="Not sure which plan fits?"
          body="Tell us what you run today and what needs to reach production. We'll scope the runtime with you."
        />
      </main>
    </>
  );
}

function GroupRows({
  group,
  rows,
}: {
  group: string;
  rows: [string, string, string, string][];
}) {
  return (
    <>
      <tr className="bg-paper">
        <th
          scope="rowgroup"
          colSpan={4}
          className="mono-label px-6 py-3 text-ink-dim"
        >
          {group}
        </th>
      </tr>
      {rows.map(([label, ...values]) => (
        <tr key={label} className="border-t border-line">
          <th scope="row" className="px-6 py-4 font-medium text-ink">
            {label}
          </th>
          {values.map((value, index) => (
            <td key={index} className="px-6 py-4 text-ink-muted">
              {value}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
