import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Container } from "@/components/site/Container";
import { ImageSlot } from "@/components/site/ImageSlot";
import { JsonLd } from "@/components/site/JsonLd";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { BUILDERS, CUSTOMERS, INCEPTION, TEAMS } from "@/lib/proof";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { CTA, SITE } from "@/lib/site";

const title = "About";
const description =
  "Aarvion builds the enterprise agent runtime: routing, policy, delegated authority, human review, and a signed record between agents and the systems they act on.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} · Aarvion`, description, url: `${SITE_URL}/about` },
};

const principles = [
  {
    title: "Two on-ramps, one runtime",
    body: "Bring the agents you already run or start with a Cadre pack. Both resolve into the same routing, policy, authority, and record.",
  },
  {
    title: "Governance in the action path",
    body: "A verdict produced before the action reaches a system is governance. A verdict derived from logs afterwards is forensics.",
  },
  {
    title: "Your cloud, your data",
    body: "Aarvion runs inside your VPC and approved region. Operational data does not leave your environment.",
  },
  {
    title: "Named owners, signed decisions",
    body: "Policies are edited, tested, and signed by people with authority. Every verdict carries the version that produced it.",
  },
  {
    title: "Direct language",
    body: "We describe what the runtime does and does not do. No inflated claims, no invented metrics.",
  },
  {
    title: "Production is the goal",
    body: "A pilot proves capability. We measure ourselves on workflows that reach production and stay there.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <main id="main-content">
        <PageHero
          label="About Aarvion"
          title="We build the runtime enterprise agents run on."
          body="Agents can already do the work. What they lack is a place where routing, policy, delegated authority, and the record are decided — before the action reaches a system that matters. That is what Aarvion is."
        >
          <Button href={CTA.demo.href} size="lg">
            {CTA.demo.label}
            <ArrowRight aria-hidden="true" size={17} />
          </Button>
        </PageHero>

        <Section className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <Reveal>
              <ImageSlot
                id="about-hero"
                className="rounded-xl border border-line shadow-board"
                sizes="(min-width: 1280px) 1280px, 100vw"
                eager
              />
            </Reveal>
          </Container>
        </Section>

        <Section labelledBy="story-title" className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <h2 id="story-title" className="headline text-balance">
                  From pilot to production is the whole company.
                </h2>
              </Reveal>
              <Reveal className="lg:col-span-7" delay={80}>
                <div className="grid gap-5 text-[1.02rem] leading-relaxed text-ink-muted">
                  <p>
                    Every enterprise we talk to has agent pilots that work and
                    rollouts that stall. The blocker is rarely the model. It is
                    that nobody can say, for a given action, which system the
                    agent was allowed to touch, whose authority it acted under,
                    and what to show an auditor afterwards.
                  </p>
                  <p>
                    Aarvion Runtime answers those questions in the action path.
                    For each workflow step it routes the work to an approved
                    model or environment, checks the action against policy and
                    delegated authority, parks what needs a human, and writes a
                    signed record. Cadre, our agent-pack line, gives teams a
                    second way in: deployable agents and blueprints that run on
                    the same runtime.
                  </p>
                  <p>
                    We built it for the people who own the consequences:
                    technology and AI leaders, platform engineers, risk and
                    security owners, and the operators and auditors who need to
                    understand how an agent reached a decision.
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section tone="bright" labelledBy="team-title">
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              <Reveal>
                <div className="h-full rounded-lg border border-line bg-paper p-7 shadow-card">
                  <span className="mono-label text-ink-dim">Built by</span>
                  <h2 id="team-title" className="title mt-3">
                    A team from {BUILDERS.slice(0, -1).join(", ")} and {BUILDERS.at(-1)}.
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    Product and platform engineering from Postman; risk,
                    controls, and audit experience from Deloitte, PwC, and EY.
                    The two halves of the problem, in one room.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="h-full rounded-lg border border-line bg-paper p-7 shadow-card">
                  <span className="mono-label text-ink-dim">Program</span>
                  <h2 className="title mt-3">{INCEPTION.label}.</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    Aarvion is a member of NVIDIA Inception, the program for
                    startups building on accelerated computing and AI.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="h-full rounded-lg border border-line bg-paper p-7 shadow-card">
                  <span className="mono-label text-ink-dim">Customers</span>
                  <h2 className="title mt-3">
                    {CUSTOMERS[0].name} and {CUSTOMERS.at(-1)?.name}.
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    Aarvion runs across the Flipkart group, including{" "}
                    {CUSTOMERS.slice(1, -1)
                      .map((c) => c.name)
                      .join(", ")}
                    , and at EdgePoint. Teams at{" "}
                    {TEAMS.map((t) => t.name).join(", ")} use it as well.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <LogoMarquee marks={[...CUSTOMERS, ...TEAMS]} className="mt-12" />
            </Reveal>
          </Container>
        </Section>

        <Section labelledBy="principles-title">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 id="principles-title" className="headline text-balance">
                How we work.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {principles.map((principle, index) => (
                  <li
                    key={principle.title}
                    className="rounded-lg border border-line bg-paper-bright p-7 shadow-card"
                  >
                    <span className="mono-label text-indigo">0{index + 1}</span>
                    <h3 className="mt-3 text-[1.05rem] font-bold text-ink">{principle.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">
                      {principle.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        <ClosingCta
          title="Talk to the people who built it."
          body={`Book a demo or write to ${SITE.foundersEmail}. We read every message.`}
        />
      </main>
    </>
  );
}
