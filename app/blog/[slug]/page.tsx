import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Container } from "@/components/site/Container";
import { ImageSlot } from "@/components/site/ImageSlot";
import { JsonLd } from "@/components/site/JsonLd";
import { POSTS, formatDate, getPost } from "@/lib/blog";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = POSTS.findIndex((item) => item.slug === post.slug);
  const next = POSTS[(index + 1) % POSTS.length];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            url: `${SITE_URL}/blog/${post.slug}`,
            author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          }),
        ]}
      />
      <main id="main-content">
        <article>
          <header className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20">
            <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 h-[28rem]" />
            <Container className="relative max-w-4xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-ink-muted hover:text-ink"
              >
                <ArrowLeft aria-hidden="true" size={15} />
                All posts
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.82rem] text-ink-dim">
                <span className="rounded-full bg-tint-indigo px-2.5 py-1 font-bold text-indigo">
                  {post.tag}
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h1 className="display-xl mt-5 text-balance">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-[1.12rem] leading-relaxed text-ink-muted">
                {post.description}
              </p>
            </Container>
            <Container className="relative mt-10 max-w-5xl">
              <ImageSlot
                id={post.cover}
                className="rounded-xl border border-line shadow-board"
                sizes="(min-width: 1024px) 1024px, 100vw"
                eager
              />
            </Container>
          </header>

          <Container className="max-w-3xl py-12 sm:py-16">
            <div className="grid gap-10">
              {post.sections.map((section, sectionIndex) => (
                <section key={sectionIndex}>
                  {section.heading && (
                    <h2 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-ink">
                      {section.heading}
                    </h2>
                  )}
                  <div className="mt-4 grid gap-5 text-[1.05rem] leading-[1.75] text-ink-soft">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 border-t border-line pt-8">
              <span className="mono-label text-ink-dim">Next post</span>
              <Link
                href={`/blog/${next.slug}`}
                className="group mt-3 flex items-center justify-between gap-6 rounded-lg border border-line bg-paper-bright p-6 shadow-card transition-colors hover:border-indigo-line"
              >
                <span className="text-[1.05rem] font-bold text-ink">{next.title}</span>
                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Container>
        </article>

        <ClosingCta />
      </main>
    </>
  );
}
