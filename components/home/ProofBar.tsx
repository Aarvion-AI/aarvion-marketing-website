import { Container } from "@/components/site/Container";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { CUSTOMERS, TEAMS } from "@/lib/proof";

export function ProofBar() {
  return (
    <section className="py-14 sm:py-16" aria-label="Customers">
      <Container>
        <p className="text-center text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-ink-dim">
          Used by teams at
        </p>
        <LogoMarquee marks={[...TEAMS, ...CUSTOMERS]} className="mt-7" />
      </Container>
    </section>
  );
}
