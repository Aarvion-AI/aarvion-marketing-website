import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { DemoForm } from "@/components/site/DemoForm";
import { JsonLd } from "@/components/site/JsonLd";
import { LinkedinIcon } from "@/components/site/LinkedinIcon";
import { XIcon } from "@/components/site/XIcon";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, SOCIALS } from "@/lib/site";

const title = "Book a demo";
const description =
  "Bring one workflow that needs to reach production. We'll define where each step can run, what the agents may do, and who must approve the rest.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} · Aarvion`, description, url: `${SITE_URL}/contact` },
};

const steps = [
  {
    title: "A 30-minute scoping call",
    body: "Walk us through the workflow, the agents involved, and the systems they act on.",
  },
  {
    title: "A demo on your scenario",
    body: "We show routing, policy, authority, review, and the signed record against your use case.",
  },
  {
    title: "A pilot plan",
    body: "Where each step can run, what the agents may do, who approves the rest, and how shadow mode starts.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <main id="main-content" className="relative overflow-hidden">
        <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 h-[32rem]" />
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="mono-label animate-rise text-indigo">Contact</span>
              <h1
                className="headline animate-rise mt-4 text-balance"
                style={{ animationDelay: "80ms" }}
              >
                Start with one workflow that needs to reach production.
              </h1>
              <p
                className="animate-rise mt-5 text-[1.05rem] leading-relaxed text-ink-muted"
                style={{ animationDelay: "160ms" }}
              >
                Bring a workflow you already run, or start with a Cadre pack or
                blueprint. Here is what happens after you write to us.
              </p>

              <ol className="animate-rise mt-9 grid gap-4" style={{ animationDelay: "240ms" }}>
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-lg border border-line bg-paper-bright p-5 shadow-card"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-tint-indigo font-mono text-[0.75rem] font-bold text-indigo">
                      0{index + 1}
                    </span>
                    <div>
                      <h2 className="text-[0.98rem] font-bold text-ink">{step.title}</h2>
                      <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div
                className="animate-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.92rem]"
                style={{ animationDelay: "320ms" }}
              >
                <a
                  href={`mailto:${SITE.salesEmail}`}
                  className="font-semibold text-ink hover:text-indigo"
                >
                  {SITE.salesEmail}
                </a>
                <a
                  href={`mailto:${SITE.foundersEmail}`}
                  className="font-semibold text-ink hover:text-indigo"
                >
                  {SITE.foundersEmail}
                </a>
                <span className="flex items-center gap-2">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.kind}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Aarvion on ${social.label}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-paper-bright text-ink-muted transition-colors hover:border-indigo-line hover:text-ink"
                    >
                      {social.kind === "linkedin" ? (
                        <LinkedinIcon size={14} />
                      ) : (
                        <XIcon size={13} />
                      )}
                    </a>
                  ))}
                </span>
              </div>
            </div>

            <div className="animate-rise lg:col-span-7" style={{ animationDelay: "200ms" }}>
              <DemoForm defaultEmail={email ?? ""} />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
