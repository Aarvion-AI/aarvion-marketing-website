import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { SITE_URL, SOLUTION_SLUGS } from "@/lib/seo";

const PAGES = ["features", "pricing", "about", "blog", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...PAGES.map((page) => ({
      url: `${SITE_URL}/${page}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SOLUTION_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
