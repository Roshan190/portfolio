import type { ComponentType } from "react";
import Placeholder, {
  meta as placeholderMeta,
} from "./posts/placeholder-draft.mdx";

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  draft: boolean;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  Content: ComponentType;
};

export const posts: Post[] = [
  {
    slug: "placeholder-draft",
    meta: placeholderMeta,
    Content: Placeholder,
  },
];

export function getPosts(): Post[] {
  return [...posts].sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
