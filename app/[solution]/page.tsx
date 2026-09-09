import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/site/Button";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Container } from "@/components/site/Container";
import { Faq } from "@/components/site/Faq";
import { JsonLd } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { SOLUTIONS, getSolution } from "@/lib/solutions";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { CTA } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SOLUTIONS).map((solution) => ({ solution }));
}

type Props = { params: Promise<{ solution: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution } = await params;
  const data = getSolution(solution);
  if (!data) return {};

  const url = `${SITE_URL}/${data.slug}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/${data.slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url,
      siteName: "Aarvion",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { solution } = await params;
  const data = getSolution(solution);
  if (!data) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: data.title, path: `/${data.slug}` },
          ]),
          faqJsonLd(data.faqs),
        ]}
      />
      <main id="main-content">
        <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20">
          <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 h-[30rem]" />
          <Container className="relative max-w-4xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.82rem] text-ink-dim">
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink-muted">{data.title}</span>
            </nav>
            <span className="mono-label animate-rise mt-8 block text-indigo">{data.eyebrow}</span>
            <h1
              className="display-xl animate-rise mt-4 text-balance"
              style={{ animationDelay: "80ms" }}
            >
              {data.h1}
            </h1>
            <p
              className="animate-rise mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-ink-muted"
              style={{ animationDelay: "160ms" }}
            >
              {data.intro}
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Button href={CTA.demo.href} size="lg">
                {CTA.demo.label}
                <ArrowRight aria-hidden="true" size={17} />
              </Button>
              <Button href="/features" variant="secondary" size="lg">
                See how it works
              </Button>
            </div>
          </Container>
        </section>

        <Container className="max-w-4xl">
          <article className="grid gap-12 rounded-xl border border-line bg-paper-bright p-7 shadow-card sm:p-10 lg:p-14">
            {data.sections.map((section) => (
              <Reveal key={section.heading}>
                <section>
                  <h2 className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.85rem]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 grid gap-4 text-[1.02rem] leading-[1.75] text-ink-soft">
                    {section.body.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-[0.98rem] text-ink">
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </article>
        </Container>

        <Section labelledBy="solution-faq-title">
          <Container className="max-w-4xl">
            <Reveal className="text-center">
              <h2 id="solution-faq-title" className="headline text-balance">
                Frequently asked.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Faq items={data.faqs} group="solution-faq" className="mt-10" />
            </Reveal>
          </Container>
        </Section>

        <Section labelledBy="related-title" className="pt-0 sm:pt-0 lg:pt-0">
          <Container className="max-w-4xl">
            <Reveal>
              <h2 id="related-title" className="title">
                Related to {data.title.toLowerCase()}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {data.related.map((slug) => {
                  const related = getSolution(slug);
                  if (!related) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      className="group rounded-lg border border-line bg-paper-bright p-5 shadow-card transition-colors hover:border-indigo-line"
                    >
                      <span className="mono-label text-indigo">{related.eyebrow}</span>
                      <span className="mt-3 block text-[1rem] font-bold text-ink group-hover:text-indigo">
                        {related.title}
                      </span>
                      <span className="mt-2 line-clamp-3 block text-[0.85rem] leading-relaxed text-ink-muted">
                        {related.metaDescription}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </Container>
        </Section>

        <ClosingCta />
      </main>
    </>
  );
}
