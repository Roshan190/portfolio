import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";
import { getPosts } from "@/content/posts";
import { formatDate } from "@/lib/format";
import { projectSlug } from "@/lib/projects";

const posts = getPosts();

export function WorkView() {
  return (
    <div className="work" id="top">
      <section className="hero wrap">
        <p className="kicker">{site.location}</p>
        <h1>{site.name}</h1>
        <p className="lede">{site.headline}</p>
        <p className="hero-availability">{site.availability}</p>
        <div className="hero-actions">
          <SiteLink className="btn btn-amber" href="/work#projects" data-magnetic>
            Projects
          </SiteLink>
          <SiteLink className="btn btn-ghost" href="/" data-magnetic>
            Enter the pier
          </SiteLink>
          {site.resumeUrl ? (
            <a className="btn btn-ghost" href={site.resumeUrl} data-magnetic>
              Resume
            </a>
          ) : null}
        </div>
      </section>

      <section className="band wrap" id="about">
        <div className="section-head reveal">
          <p className="kicker">About</p>
          <h2>From the brief through to production.</h2>
        </div>
        <div className="about-grid">
          <div className="reveal">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="aside-card reveal" data-tilt>
            <p className="meta-label">Education</p>
            <p className="aside-title">{site.education.degree}</p>
            <p>
              {site.education.school}
              <br />
              {site.education.dates}
              <br />
              {site.education.score}
            </p>
            <p className="meta-label">Certification</p>
            <p>{site.certification.display}</p>
          </aside>
        </div>
      </section>

      <section className="band wrap" id="experience">
        <div className="section-head reveal">
          <p className="kicker">Experience</p>
          <h2>Where the work has been.</h2>
        </div>
        <ol className="timeline">
          {site.experience.map((role) => (
            <li key={`${role.company}-${role.start}`} className="reveal">
              <p className="timeline-when">
                {role.start} – {role.end}
                {role.location ? ` · ${role.location}` : ""}
              </p>
              <h3>{role.title}</h3>
              <p className="timeline-company">{role.company}</p>
              {role.summary ? <p>{role.summary}</p> : null}
              {role.bullets ? (
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {role.technologies ? (
                <ul className="chips" aria-label={`${role.company} technologies`}>
                  {role.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="band wrap" id="projects">
        <div className="section-head reveal">
          <p className="kicker">Projects</p>
          <h2>The work, without the pier.</h2>
        </div>
        <div className="project-list">
          {site.projects.map((project) => {
            const slug = projectSlug(project.name);
            return (
              <article
                key={project.name}
                className={`project-row reveal${project.featured ? " is-featured" : ""}`}
                data-tilt
              >
                <div>
                  <p className="meta-label">{project.featured ? "Featured" : "Project"}</p>
                  <h3>
                    <SiteLink href={`/projects/${slug}`}>{project.name}</SiteLink>
                  </h3>
                  <p className="project-context">{project.context}</p>
                </div>
                <div>
                  <p className="meta-label">Outcome</p>
                  <p>{project.summary}</p>
                  {project.stack ? (
                    <ul className="chips" aria-label={`${project.name} stack`}>
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="band wrap" id="skills">
        <div className="section-head reveal">
          <p className="kicker">Skills</p>
          <h2>Tools that show up in the work.</h2>
        </div>
        <div className="skill-grid">
          {site.skillGroups.map((group) => (
            <article key={group.name} className="skill-card reveal" data-tilt>
              <h3>{group.name}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="band wrap" id="writing">
        <div className="section-head reveal">
          <p className="kicker">Writing</p>
          <h2>{site.writing.heading}</h2>
        </div>
        <p className="section-intro reveal">{site.writing.intro}</p>
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="reveal">
              <article className="post-card" data-tilt>
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
      </section>

      <section className="band wrap" id="contact">
        <div className="section-head reveal">
          <p className="kicker">Contact</p>
          <h2>{site.contact.heading}</h2>
        </div>
        <p className="section-intro reveal">{site.contact.body}</p>
        <div className="hero-actions reveal">
          <a className="btn btn-amber" href={site.socials.linkedin} target="_blank" rel="me noopener noreferrer" data-magnetic>
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="btn btn-ghost" href={site.socials.github} target="_blank" rel="me noopener noreferrer" data-magnetic>
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {site.email ? (
            <a className="btn btn-ghost" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
