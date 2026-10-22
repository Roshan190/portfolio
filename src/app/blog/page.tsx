import type { Metadata } from "next";
import { SiteLink } from "@/components/site-link";
import { getPosts } from "@/content/posts";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

const posts = getPosts();
const hasPublished = posts.some((post) => !post.meta.draft);

export const metadata: Metadata = {
  title: site.writing.heading,
  description: site.writing.intro,
  robots: hasPublished
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <div className="wrap page-block">
      <p className="kicker">
        <SiteLink href="/">Home</SiteLink>
        {" · "}Notes
      </p>
      <h1>{site.writing.heading}</h1>
      <p className="section-intro">{site.writing.intro}</p>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="card post-card">
              {post.meta.draft ? <p className="badge">Placeholder draft</p> : null}
              <h2>
                <SiteLink href={`/blog/${post.slug}`}>{post.meta.title}</SiteLink>
              </h2>
              <p className="muted">
                <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              </p>
              <p>{post.meta.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
