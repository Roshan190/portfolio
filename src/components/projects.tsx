import { ExternalLink } from "@/components/external-link";
import { site, type Project } from "@/content/site";

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <p className="kicker card-context">{project.context}</p>
      <h3 className={project.featured ? "project-title" : undefined}>{project.name}</h3>
      {project.quote ? (
        <blockquote>
          <p>{project.quote}</p>
        </blockquote>
      ) : null}
      <p>{project.summary}</p>
      {project.pointsLabel ? <p className="kicker stack-label">{project.pointsLabel}</p> : null}
      <ul className="point-list">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {project.stack && project.stack.length > 0 ? (
        <>
          <p className="kicker stack-label">Stack</p>
          <ul className="chip-row" aria-label={`${project.name} stack`}>
            {project.stack.map((item) => (
              <li className="chip" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {project.links && project.links.length > 0 ? (
        <div className="card-links">
          {project.links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label} <span className="link-arrow" aria-hidden="true">→</span>
            </ExternalLink>
          ))}
        </div>
      ) : null}
      {project.note ? <p className="note">{project.note}</p> : null}
    </>
  );
}

export function Projects() {
  const featured = site.projects.filter((project) => project.featured);
  const rest = site.projects.filter((project) => !project.featured);

  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="wrap">
        <div className="reveal">
          <div className="section-head">
            <p className="kicker section-index">03 — Work</p>
            <h2 id="projects-heading">Selected work</h2>
          </div>
          <div className="project-stack">
            {featured.map((project) => (
              <article className="card project-featured" key={project.name}>
                <div className="badge-row">
                  <span className="badge">Featured</span>
                  {project.badges?.map((badge) => (
                    <span className="badge badge-line" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="project-featured-grid">
                  <div>
                    <p className="kicker card-context">{project.context}</p>
                    <h3 className="project-title">{project.name}</h3>
                    {project.quote ? (
                      <blockquote>
                        <p>{project.quote}</p>
                      </blockquote>
                    ) : null}
                    <p>{project.summary}</p>
                    {project.links && project.links.length > 0 ? (
                      <div className="card-links">
                        {project.links.map((link) => (
                          <ExternalLink className="btn btn-ink" key={link.href} href={link.href}>
                            {link.label}
                            <span className="link-arrow" aria-hidden="true">
                              →
                            </span>
                          </ExternalLink>
                        ))}
                      </div>
                    ) : null}
                    {project.note ? <p className="note">{project.note}</p> : null}
                  </div>
                  <div>
                    {project.pointsLabel ? (
                      <p className="kicker stack-label">{project.pointsLabel}</p>
                    ) : null}
                    <ul className="point-list">
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {project.stack && project.stack.length > 0 ? (
                      <>
                        <p className="kicker stack-label">Stack</p>
                        <ul className="chip-row" aria-label={`${project.name} stack`}>
                          {project.stack.map((item) => (
                            <li className="chip" key={item}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="project-grid">
            {rest.map((project) => (
              <article className="card project-card" key={project.name}>
                <ProjectBody project={project} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
