import { Container } from "@/components/site/Container";
import { Faq } from "@/components/site/Faq";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { HOME_FAQS } from "@/lib/seo";

export function HomeFaq() {
  return (
    <Section id="faq" labelledBy="faq-title" className="pt-0 sm:pt-0 lg:pt-0">
      <Container className="max-w-4xl">
        <Reveal className="text-center">
          <h2 id="faq-title" className="headline text-balance">
            Questions, answered.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Faq items={HOME_FAQS} className="mt-10" />
        </Reveal>
      </Container>
    </Section>
  );
}
