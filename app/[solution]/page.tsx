import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SOLUTIONS, getSolution } from "@/lib/solutions";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

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
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
          <div
            className="absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-cyan/10 via-transparent to-transparent blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-16 sm:pt-20">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-fg-dim"
            >
              <Link href="/" className="hover:text-fg transition-colors">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span className="text-fg-muted">{data.title}</span>
            </nav>
            <p className="mt-8 text-xs uppercase tracking-[0.12em] font-mono text-cyan">
              {data.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
              {data.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted leading-relaxed">
              {data.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/#partnership"
                className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:bg-cyan transition-colors"
              >
                Apply for design partnership
                <span aria-hidden>→</span>
              </a>
              <a
                href="/#what"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-panel px-4 py-2.5 text-sm font-medium text-fg hover:border-cyan/40 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="space-y-16">
            {data.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((p, i) => (
                    <p
                      key={i}
                      className="text-[16px] leading-relaxed text-fg-muted"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] text-fg/90">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>

        <Faq items={data.faqs} />

        <section className="border-b border-border/60 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs uppercase tracking-[0.12em] font-mono text-cyan">
              Keep exploring
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              Related to {data.title.toLowerCase()}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {data.related.map((slug) => {
                const r = getSolution(slug);
                if (!r) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="group rounded-xl border border-border/80 bg-panel/40 p-5 transition-colors hover:border-cyan/40"
                  >
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cyan">
                      {r.eyebrow}
                    </div>
                    <div className="mt-3 text-[15px] font-medium text-fg group-hover:text-cyan transition-colors">
                      {r.title}
                    </div>
                    <div className="mt-2 text-[13px] text-fg-muted leading-relaxed line-clamp-3">
                      {r.metaDescription}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
