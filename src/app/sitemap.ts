import type { MetadataRoute } from "next";
import { getPosts } from "@/content/posts";
import { sceneProjects } from "@/lib/projects";
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
    {
      url: absoluteUrl("/work"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...sceneProjects.map((item) => ({
      url: absoluteUrl(`/projects/${item.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.project.featured ? 0.8 : 0.6,
    })),
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
