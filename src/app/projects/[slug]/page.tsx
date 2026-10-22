import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteLink } from "@/components/site-link";
import { getProject, projectPages } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projectPages.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) return { title: "Project" };
  return {
    title: item.project.name,
    description: item.project.summary,
    alternates: { canonical: `/projects/${item.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) notFound();
  const { project } = item;

  return (
    <article className="wrap project-page">
      <p className="kicker">
        <SiteLink href="/#projects">All projects</SiteLink>
      </p>
      <p className="meta-label">{project.featured ? "Featured" : project.context}</p>
      <h1>{project.name}</h1>
      <p className="project-context">{project.context}</p>
      {project.quote ? <blockquote className="project-quote">{project.quote}</blockquote> : null}
      <p className="lede">{project.summary}</p>
      {project.badges?.map((badge) => (
        <p key={badge} className="badge">
          {badge}
        </p>
      ))}
      {project.points.length > 0 ? (
        <section>
          <h2>{project.pointsLabel ?? "What shipped"}</h2>
          <ul>
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {project.stack ? (
        <section>
          <h2>Stack</h2>
          <ul className="chips">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {project.note ? <p className="project-note">{project.note}</p> : null}
      {project.links ? (
        <div className="hero-actions">
          {project.links.map((link) => (
            <a key={link.href} className="btn btn-amber" href={link.href} target="_blank" rel="noopener noreferrer" data-magnetic>
              {link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      ) : null}
      <p className="back-row">
        <SiteLink className="btn btn-ghost" href="/#projects" data-magnetic>
          Back to projects
        </SiteLink>
      </p>
    </article>
  );
}
