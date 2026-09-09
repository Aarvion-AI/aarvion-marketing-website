import { ArrowRight } from "lucide-react";
import { CTA, SITE } from "@/lib/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

export function ClosingCta({
  title = "Stop running agents on trust.",
  body = "Bring one workflow that needs to reach production. We'll define where each step can run, what the agents may do, and who must approve the rest.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-night text-paper-bright">
            <ImageSlot id="cta-closing" fill className="opacity-80" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,18,0.92)_0%,rgba(5,8,18,0.7)_55%,rgba(5,8,18,0.25)_100%)]"
            />
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-16">
              <div>
                <h2 className="headline max-w-xl text-balance">{title}</h2>
                <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-paper-bright/75">
                  {body}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button href={CTA.demo.href} variant="light" size="lg">
                  {CTA.demo.label}
                  <ArrowRight aria-hidden="true" size={17} />
                </Button>
                <Button
                  href={`mailto:${SITE.salesEmail}`}
                  variant="ghost"
                  size="lg"
                  className="text-paper-bright/85 hover:text-paper-bright"
                >
                  {SITE.salesEmail}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
