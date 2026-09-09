import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  Network,
  PackageOpen,
  ShieldCheck,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { CTA, SITE } from "@/lib/site";

type Path = {
  id: string;
  label: string;
  title: string;
  body: string;
  action: string;
  href: string;
  icon: LucideIcon;
  steps: [string, string, LucideIcon][];
};

const paths: Path[] = [
  {
    id: "bring-your-agents",
    label: "Bring your agents",
    title: "Connect your agent stack",
    body: "Connect your existing agents, studios, MCP servers, OpenClaw installations, and custom workflows without rebuilding them on a new framework.",
    action: CTA.demo.label,
    href: CTA.demo.href,
    icon: Bot,
    steps: [
      ["Connect", "Agents stay where they run", Network],
      ["Observe", "Review decisions in shadow mode", SquareTerminal],
      ["Enforce", "Apply approved policies", ShieldCheck],
    ],
  },
  {
    id: "cadre-packs",
    label: "Start with Cadre",
    title: "Choose a pack or blueprint",
    body: "Deploy a Cadre agent pack, or adapt a blueprint to your systems, handoffs, and operating rules. Cadre is an Aarvion product line, and it runs on the same runtime.",
    action: "Explore Cadre packs",
    href: SITE.cadreUrl,
    icon: PackageOpen,
    steps: [
      ["Choose", "Pack or blueprint", PackageOpen],
      ["Adapt", "Systems, rules, and handoffs", Braces],
      ["Deploy", "Run on Aarvion Runtime", Boxes],
    ],
  },
];

export function OnRamps() {
  return (
    <Section id="cadre" labelledBy="onramps-title" className="pt-0 sm:pt-0 lg:pt-0">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="onramps-title" className="headline text-balance">
            Two ways to start. One runtime.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
            Connect the agents and workflows you already run, or deploy a Cadre
            pack. Either way, routing, policy, authority, and the signed record
            are the same.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {paths.map((path, index) => (
            <Reveal key={path.id} delay={index * 90}>
              <article
                id={path.id}
                className="flex h-full flex-col rounded-lg border border-line bg-paper-bright p-7 shadow-card lg:p-9"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-tint-indigo text-indigo">
                    <path.icon aria-hidden="true" size={20} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="mono-label text-ink-dim">{path.label}</span>
                    <h3 className="title mt-0.5">{path.title}</h3>
                  </div>
                </div>
                <p className="mt-5 text-[0.97rem] leading-relaxed text-ink-muted">{path.body}</p>
                <ol className="mt-7 grid gap-2.5">
                  {path.steps.map(([label, note, Icon], stepIndex) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3"
                    >
                      <span className="mono-label w-6 text-ink-dim">0{stepIndex + 1}</span>
                      <Icon aria-hidden="true" size={17} strokeWidth={1.6} className="text-indigo" />
                      <span className="text-[0.9rem] font-bold text-ink">{label}</span>
                      <span className="ml-auto text-[0.82rem] text-ink-muted">{note}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <Button href={path.href} variant={index === 0 ? "primary" : "secondary"}>
                    {path.action}
                    <ArrowRight aria-hidden="true" size={16} />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-lg bg-indigo-deep px-6 py-5 text-center text-paper-bright sm:flex-row sm:gap-4">
            <span className="inline-flex items-center gap-2 font-bold">
              <ShieldCheck aria-hidden="true" size={18} />
              Aarvion Runtime
            </span>
            <span className="text-[0.9rem] text-paper-bright/70">
              Shared routing, policy, authority, and signed record for both paths.
            </span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
