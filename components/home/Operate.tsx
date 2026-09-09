import { RuntimeDashboard } from "@/components/evidence/RuntimeDashboard";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";

const notes = [
  {
    title: "Approved routes",
    body: "Aarvion selects an approved model or agent for each workflow step.",
    tone: "bg-signal-green",
  },
  {
    title: "Delegated authority",
    body: "Aarvion checks the action against its delegated scope and owner.",
    tone: "bg-signal-blue",
  },
  {
    title: "Human review",
    body: "Actions outside delegated authority wait for the designated approver.",
    tone: "bg-signal-amber",
  },
  {
    title: "Signed record",
    body: "The runtime signs a record of the route, policy, authority, and approval state.",
    tone: "bg-signal-slate",
  },
];

export function Operate() {
  return (
    <Section id="operate" tone="night" labelledBy="operate-title">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <h2 id="operate-title" className="headline max-w-xl text-balance">
            One console for every agent, decision, and approval.
          </h2>
          <p className="max-w-lg text-[1.05rem] leading-relaxed text-paper-bright/70 lg:justify-self-end">
            The same runtime that gates the action shows you the trace: which
            route was chosen, which policy version applied, who had authority,
            and who approved the rest.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={100}>
          <div className="rounded-xl border border-night-line bg-night-raised p-2 shadow-canvas sm:p-3">
            <RuntimeDashboard />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {notes.map((note) => (
              <li key={note.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${note.tone}`}
                />
                <div>
                  <h3 className="text-[0.98rem] font-bold">{note.title}</h3>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-paper-bright/65">
                    {note.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
