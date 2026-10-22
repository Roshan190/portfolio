import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteLink } from "@/components/site-link";
import { getPost, posts } from "@/content/posts";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.meta.draft
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = post.Content;

  return (
    <article className="wrap page-block prose-page">
      <p className="kicker">
        <SiteLink href="/blog">Writing</SiteLink>
      </p>
      {post.meta.draft ? (
        <p className="draft-banner" role="note">
          {site.writing.draftNotice}
        </p>
      ) : null}
      <h1>{post.meta.title}</h1>
      <p className="muted">
        <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
      </p>
      <div className="prose">
        <Content />
      </div>
    </article>
  );
}
