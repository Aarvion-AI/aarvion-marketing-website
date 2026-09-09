import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Container } from "@/components/site/Container";
import { ImageSlot } from "@/components/site/ImageSlot";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { POSTS, formatDate } from "@/lib/blog";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

const title = "Blog";
const description =
  "Notes on taking enterprise agents from pilot to production: routing, policy, delegated authority, human review, and the signed record.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `${title} · Aarvion`, description, url: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <main id="main-content">
        <PageHero
          label="Blog"
          title="Notes from the runtime."
          body="How enterprise agents actually reach production: what the runtime decides, what a human decides, and what gets written down."
        />

        <Section className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-xl border border-line bg-paper-bright shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-indigo-line hover:shadow-board lg:grid-cols-2"
              >
                <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-0">
                  <ImageSlot
                    id={featured.cover}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    eager
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3 text-[0.8rem] text-ink-dim">
                    <span className="rounded-full bg-tint-indigo px-2.5 py-1 font-bold text-indigo">
                      {featured.tag}
                    </span>
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readingMinutes} min read</span>
                  </div>
                  <h2 className="headline mt-5 text-balance">{featured.title}</h2>
                  <p className="mt-4 text-[1rem] leading-relaxed text-ink-muted">
                    {featured.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink group-hover:text-indigo">
                    Read the post
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>

            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {rest.map((post, index) => (
                <li key={post.slug}>
                  <Reveal delay={index * 80}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper-bright shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-indigo-line hover:shadow-board"
                    >
                      <ImageSlot id={post.cover} sizes="(min-width: 768px) 50vw, 100vw" />
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex items-center gap-3 text-[0.8rem] text-ink-dim">
                          <span className="rounded-full bg-tint-indigo px-2.5 py-1 font-bold text-indigo">
                            {post.tag}
                          </span>
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingMinutes} min read</span>
                        </div>
                        <h2 className="title mt-4 text-balance">{post.title}</h2>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                          {post.description}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-ink group-hover:text-indigo">
                          Read the post
                          <ArrowRight
                            aria-hidden="true"
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <ClosingCta />
      </main>
    </>
  );
}
