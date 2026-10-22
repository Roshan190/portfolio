import { SiteLink } from "@/components/site-link";
import { getPosts } from "@/content/posts";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

export function WritingPreview() {
  const posts = getPosts();

  return (
    <section className="section" id="writing" aria-labelledby="writing-heading">
      <div className="wrap">
        <div className="reveal">
          <div className="section-head">
            <p className="kicker section-index">05 — Writing</p>
            <h2 id="writing-heading">{site.writing.heading}</h2>
            <p className="section-intro">{site.writing.intro}</p>
          </div>
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="card post-card">
                  {post.meta.draft ? <p className="badge">Placeholder draft</p> : null}
                  <h3>
                    <SiteLink href={`/blog/${post.slug}`}>{post.meta.title}</SiteLink>
                  </h3>
                  <p className="muted">
                    <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                  </p>
                  <p>{post.meta.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
