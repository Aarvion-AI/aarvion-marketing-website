import { ArrowDown, CirclePause } from "lucide-react";
import { DeploymentConsole } from "@/components/evidence/DeploymentConsole";
import { PolicyWorkbench } from "@/components/evidence/PolicyWorkbench";
import { ProvenanceRecord } from "@/components/evidence/ProvenanceRecord";
import { RoutingCanvas } from "@/components/evidence/RoutingCanvas";
import { BentoCard } from "@/components/site/BentoCard";
import { Container } from "@/components/site/Container";
import { ImageSlot } from "@/components/site/ImageSlot";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";

export function FeatureBento() {
  return (
    <Section id="features" labelledBy="features-title" className="pt-0 sm:pt-0 lg:pt-0">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="features-title" className="headline text-balance">
            Everything an agent does in production, decided by the runtime.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
            Not a dashboard bolted on afterwards. Routing, policy, authority,
            review, and the record live in the action path itself.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <BentoCard
              tone="indigo"
              title="Route each step to the right place."
              body="Complex reasoning on an approved frontier model, routine steps locally, restricted data inside sovereign infrastructure. One workflow can span all three."
              className="h-full"
            >
              <RoutingCanvas />
            </BentoCard>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={80}>
            <BentoCard
              tone="sand"
              title="Park what needs a human."
              body="Actions outside delegated authority wait for the named owner. Nothing reaches a system of record on the model's say-so."
              className="h-full"
            >
              <div className="relative">
                <ImageSlot
                  id="feature-authority"
                  className="rounded-md border border-[#e6dcc3]"
                  sizes="(min-width: 1024px) 480px, 100vw"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-md border border-line bg-paper-bright/95 p-3 shadow-card backdrop-blur">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-tint-sand text-amber">
                    <CirclePause aria-hidden="true" size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.82rem] font-bold text-ink">
                      PARK · 04 Act · consequential change
                    </p>
                    <p className="truncate text-[0.74rem] text-ink-muted">
                      Waiting for the risk owner · policy v14 attached
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <BentoCard
              tone="mint"
              title="A signed record of every handoff."
              body="Route, policy version, authority, and approval state — hash-chained, so an audit is a query, not a reconstruction."
              className="h-full"
            >
              <div className="relative overflow-hidden rounded-md">
                <ImageSlot
                  id="feature-record"
                  className="rounded-md"
                  sizes="(min-width: 1024px) 480px, 100vw"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-md bg-night p-3 shadow-canvas">
                  <ProvenanceRecord />
                </div>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={80}>
            <BentoCard
              tone="bright"
              title="Your operating rules become part of the runtime."
              body="Start from Aarvion templates or turn the documents your teams already use into enforceable rules. Named owners test and sign every version."
              className="h-full"
            >
              <PolicyWorkbench />
            </BentoCard>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <BentoCard
              tone="bright"
              title="Deploy in your cloud. Start in shadow mode."
              body="Aarvion sits between your agents and the systems they act on, inside your approved region. Observe decisions first; enforce when you're ready."
              className="h-full"
            >
              <DeploymentConsole />
            </BentoCard>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={80}>
            <BentoCard
              tone="night"
              title="See what every agent did, why it was allowed, and who approved it."
              body="Monitor connected agents, clear actions waiting for review, and open the record behind each production change."
              className="h-full"
            >
              <div className="flex h-full flex-col justify-end">
                <ul className="grid gap-2 text-[0.85rem] text-paper-bright/80">
                  {[
                    ["Fleet", "Every connected agent, MCP server, and OpenClaw install"],
                    ["Activity", "Decision trace per workflow with the selected route"],
                    ["Approvals", "Parked actions by owner, with the attached policy"],
                    ["Provenance", "Signed records you can hand to an auditor"],
                  ].map(([label, note]) => (
                    <li
                      key={label}
                      className="flex items-baseline gap-3 rounded-md border border-night-line bg-night-raised px-3.5 py-2.5"
                    >
                      <span className="mono-label w-20 shrink-0 text-indigo-line">{label}</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#operate"
                  className="mt-6 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-paper-bright hover:text-indigo-pale"
                >
                  See the console
                  <ArrowDown aria-hidden="true" size={16} />
                </a>
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
