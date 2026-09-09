import { AnnouncementPill } from "@/components/site/AnnouncementPill";
import { Container } from "@/components/site/Container";
import { HeroCapture } from "./HeroCapture";
import { HeroCollage } from "./HeroCollage";

const notes = ["Runs in your VPC", "No SDK required", "Start in shadow mode"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 lg:pt-24" id="top">
      <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 h-[42rem]" />
      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="animate-rise">
            <AnnouncementPill href="/about" badge="New">
              Aarvion joins the NVIDIA Inception Program
            </AnnouncementPill>
          </div>
          <h1
            className="display-xl animate-rise mt-7 max-w-4xl text-balance"
            style={{ animationDelay: "80ms" }}
          >
            The runtime that takes enterprise agents from pilot to production.
          </h1>
          <p
            className="animate-rise mt-6 max-w-2xl text-balance text-[1.08rem] leading-relaxed text-ink-muted sm:text-[1.18rem]"
            style={{ animationDelay: "160ms" }}
          >
            Bring the agents you already use, or start with a Cadre pack. For
            every workflow step, Aarvion picks an approved model or environment,
            checks the action against delegated authority, and writes the
            handoff to a signed record.
          </p>
          <div className="animate-rise mt-9 w-full" style={{ animationDelay: "240ms" }}>
            <HeroCapture />
          </div>
          <ul
            className="animate-rise mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.82rem] font-semibold text-ink-dim"
            style={{ animationDelay: "300ms" }}
          >
            {notes.map((note) => (
              <li key={note} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise mt-14 sm:mt-16" style={{ animationDelay: "380ms" }}>
          <HeroCollage />
        </div>
      </Container>
    </section>
  );
}
