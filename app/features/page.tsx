import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { DeploymentConsole } from "@/components/evidence/DeploymentConsole";
import { PolicyWorkbench } from "@/components/evidence/PolicyWorkbench";
import { ProvenanceRecord } from "@/components/evidence/ProvenanceRecord";
import { RoutingCanvas } from "@/components/evidence/RoutingCanvas";
import { RuntimeDashboard } from "@/components/evidence/RuntimeDashboard";
import { StoryMotionShell } from "@/components/evidence/StoryMotionShell";
import { Button } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Container } from "@/components/site/Container";
import { Faq } from "@/components/site/Faq";
import { ImageSlot } from "@/components/site/ImageSlot";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { FEATURES, INTEGRATIONS, type FeatureVisual } from "@/lib/features";
import { HOME_FAQS, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { CTA } from "@/lib/site";
import { cn } from "@/lib/cn";

const title = "Features";
const description =
  "Routing, policy, delegated authority, human review, and a signed record — everything Aarvion Runtime does between your agents and your enterprise systems.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/features" },
  openGraph: { title: `${title} · Aarvion`, description, url: `${SITE_URL}/features` },
};

function Visual({ visual }: { visual: FeatureVisual }) {
  switch (visual.kind) {
    case "routing":
      return <RoutingCanvas />;
    case "policy":
      return <PolicyWorkbench />;
    case "deploy":
      return <DeploymentConsole />;
    case "operate":
      return (
        <div className="rounded-lg border border-night-line bg-night-raised p-2 shadow-canvas">
          <RuntimeDashboard />
        </div>
      );
    case "record":
      return (
        <div className="relative overflow-hidden rounded-lg">
          <ImageSlot id="feature-record" sizes="(min-width: 1024px) 640px, 100vw" />
          <div className="absolute inset-x-5 bottom-5 rounded-md bg-night p-3 shadow-canvas">
            <ProvenanceRecord />
          </div>
        </div>
      );
    case "image":
      return (
        <ImageSlot
          id={visual.slot}
          className="rounded-lg border border-line"
          sizes="(min-width: 1024px) 640px, 100vw"
        />
      );
  }
}

export default function FeaturesPage() {
  return (
    <StoryMotionShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
          ]),
        ]}
      />
      <main id="main-content">
        <PageHero
          label="Features"
          title="Everything between your agents and your systems."
          body="Aarvion Runtime sits in the action path. For each workflow step it routes the work, checks policy and delegated authority, parks what needs a human, and signs the record."
        >
          <Button href={CTA.demo.href} size="lg">
            {CTA.demo.label}
            <ArrowRight aria-hidden="true" size={17} />
          </Button>
          <Button href="/pricing" variant="secondary" size="lg">
            See pricing
          </Button>
        </PageHero>

        <nav aria-label="On this page" className="pb-6">
          <Container>
            <ul className="flex flex-wrap justify-center gap-2">
              {FEATURES.map((feature, index) => (
                <li key={feature.id}>
                  <a
                    href={`#${feature.id}`}
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-paper-bright px-3.5 text-[0.82rem] font-semibold text-ink-muted transition-colors hover:border-indigo-line hover:text-ink"
                  >
                    <span className="mono-label text-ink-dim">0{index + 1}</span>
                    {feature.id[0].toUpperCase() + feature.id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>

        <div className="flex flex-col">
          {FEATURES.map((feature, index) => (
            <Section
              key={feature.id}
              id={feature.id}
              labelledBy={`${feature.id}-title`}
              className={cn("py-12 sm:py-16 lg:py-20", index === 0 && "pt-6 sm:pt-8 lg:pt-10")}
            >
              <Container>
                <Reveal>
                  <div
                    className={cn(
                      "grid items-center gap-10 rounded-xl border border-line bg-paper-bright p-7 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12",
                    )}
                  >
                    <div
                      className={cn(
                        "lg:col-span-5",
                        index % 2 === 1 && "lg:order-2 lg:col-start-8",
                      )}
                    >
                      <span className="mono-label text-indigo">0{index + 1}</span>
                      <h2
                        id={`${feature.id}-title`}
                        className="headline mt-3 text-balance"
                      >
                        {feature.title}
                      </h2>
                      <p className="mt-5 text-[1rem] leading-relaxed text-ink-muted">
                        {feature.body}
                      </p>
                      <ul className="mt-7 grid gap-3">
                        {feature.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-[0.95rem] text-ink">
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-mint text-green">
                              <Check aria-hidden="true" size={12} strokeWidth={3} />
                            </span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={cn(
                        "min-w-0 lg:col-span-7",
                        index % 2 === 1 && "lg:order-1 lg:col-start-1",
                      )}
                    >
                      <Visual visual={feature.visual} />
                    </div>
                  </div>
                </Reveal>
              </Container>
            </Section>
          ))}
        </div>

        <Section labelledBy="integrations-title">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 id="integrations-title" className="headline text-balance">
                Works with what you already run.
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
                MCP and OpenClaw are connection modes, not separate products.
                Bring your agents, pick your routes, deploy in your cloud.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {INTEGRATIONS.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-lg border border-line bg-paper-bright p-6 shadow-card"
                  >
                    <h3 className="text-[1rem] font-bold text-ink">{group.title}</h3>
                    <ul className="mt-4 grid gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-[0.9rem] text-ink-muted"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>

        <Section labelledBy="features-faq-title" className="pt-0 sm:pt-0 lg:pt-0">
          <Container className="max-w-4xl">
            <Reveal className="text-center">
              <h2 id="features-faq-title" className="headline text-balance">
                Common questions.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Faq items={HOME_FAQS.slice(0, 4)} group="features-faq" className="mt-10" />
            </Reveal>
          </Container>
        </Section>

        <ClosingCta />
      </main>
    </StoryMotionShell>
  );
}
