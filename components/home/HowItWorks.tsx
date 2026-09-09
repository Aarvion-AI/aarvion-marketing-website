import {
  Check,
  Fingerprint,
  GitBranch,
  ShieldCheck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";

const steps: { label: string; note: string; icon: LucideIcon }[] = [
  { label: "Route", note: "Frontier, local, or sovereign", icon: GitBranch },
  { label: "Policy", note: "Check against approved rules", icon: ShieldCheck },
  { label: "Authority", note: "Verify delegated scope", icon: Fingerprint },
  { label: "Review", note: "Park what needs a human", icon: UserRoundCheck },
  { label: "Act", note: "Execute with a signed record", icon: Check },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" className="pt-4 sm:pt-6 lg:pt-8">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="how-title" className="headline text-balance">
            Control every handoff between agents and enterprise systems.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
            At each step, Aarvion chooses where the work runs, checks policy and
            delegated authority, and records the outcome before the workflow
            continues.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ol className="relative mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <span
              aria-hidden="true"
              className="absolute inset-x-[10%] top-[2.65rem] hidden h-px bg-line-strong lg:block"
            />
            {steps.map(({ label, note, icon: Icon }, index) => (
              <li
                key={label}
                className={`relative flex flex-col items-center rounded-lg border border-line bg-paper-bright px-4 py-6 text-center shadow-card ${
                  index === steps.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-md ${
                    index === steps.length - 1
                      ? "bg-indigo-deep text-paper-bright"
                      : "bg-tint-indigo text-indigo"
                  }`}
                >
                  <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                </span>
                <span className="mono-label mt-4 text-ink-dim">0{index + 1}</span>
                <strong className="mt-1 text-[1rem] font-bold text-ink">{label}</strong>
                <span className="mt-1 text-[0.82rem] leading-snug text-ink-muted">{note}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
