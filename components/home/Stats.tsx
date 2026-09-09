import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { Stat } from "@/components/site/Stat";
import { BUILDERS, INCEPTION, PROOF_STATS } from "@/lib/proof";

export function Stats() {
  return (
    <Section labelledBy="stats-title">
      <Container>
        <Reveal>
          <div className="rounded-xl border border-line bg-paper-bright p-8 shadow-card sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <h2 id="stats-title" className="headline text-balance">
                  What the runtime guarantees.
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-ink-muted">
                  Built by a team from {BUILDERS.slice(0, -1).join(", ")} and{" "}
                  {BUILDERS.at(-1)}. {INCEPTION.label}.
                </p>
              </div>
              <dl className="grid gap-8 sm:grid-cols-2">
                {PROOF_STATS.map((stat) => (
                  <div key={stat.label}>
                    <Stat value={stat.value} label={stat.label} detail={stat.detail} />
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
