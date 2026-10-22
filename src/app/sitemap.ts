import type { MetadataRoute } from "next";
import { getPosts } from "@/content/posts";
import { absoluteUrl } from "@/lib/url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-10-22";
  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  for (const post of getPosts()) {
    if (post.meta.draft) continue;
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.meta.date,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}
