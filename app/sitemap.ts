import type { MetadataRoute } from "next";
import { SITE_URL, SOLUTION_SLUGS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SOLUTION_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
