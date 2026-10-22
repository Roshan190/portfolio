import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";
import { getPosts } from "@/content/posts";
import { formatDate } from "@/lib/format";
import { projectSlug } from "@/lib/projects";

const posts = getPosts();
const published = posts.filter((post) => !post.meta.draft);
const currentRole = site.experience.find((role) => "current" in role && role.current);
const earlierRoles = site.experience.filter((role) => !("current" in role && role.current));
const featured = site.projects.find((project) => project.featured) ?? site.projects[0];
const formNinja = site.projects.find((project) => project.name === "Form Ninja");

const highlightStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Expo",
  "Supabase",
  "Tailwind",
] as const;

const otherSkills = site.skillGroups
  .filter((group) => group.name !== "Ownership & Delivery")
  .flatMap((group) => group.items)
  .filter((item) => !highlightStack.includes(item as (typeof highlightStack)[number]));

const ownership = site.skillGroups.find((group) => group.name === "Ownership & Delivery");

export function WorkView() {
  return (
    <div className="work">
      <section className="hero wrap">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">{site.location}</p>
          <h1>{site.name}</h1>
          <p className="hero-role">Senior Software Engineer, 5+ years</p>
          <p className="lede stagger-line">
            {site.headline.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="word">
                {word}
              </span>
            ))}
          </p>
          <div className="hero-actions">
            <SiteLink className="btn btn-amber" href="/#projects" data-magnetic>
              Projects
            </SiteLink>
            <a className="btn btn-ghost" href={site.socials.linkedin} target="_blank" rel="me noopener noreferrer" data-magnetic>
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="btn btn-ghost" href={site.socials.github} target="_blank" rel="me noopener noreferrer" data-magnetic>
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {site.resumeUrl ? (
              <a className="btn btn-ghost" href={site.resumeUrl} data-magnetic>
                Resume
              </a>
            ) : null}
          </div>
        </div>
        <div className="phone-stage">
          <div className="phone" aria-hidden="true">
            <div className="phone-screen">
              <div className="phone-notch" />
              <p className="phone-app">HealthShield</p>
              <p className="phone-quote">{featured.quote}</p>
              <div className="phone-stats">
                <div className="phone-stat">
                  <span>Vitals</span>
                  <svg viewBox="0 0 80 28" className="spark" focusable="false">
                    <polyline points="0,18 12,18 18,8 26,22 34,12 46,16 58,6 80,14" />
                  </svg>
                </div>
                <div className="phone-stat">
                  <span>Medications</span>
                  <svg viewBox="0 0 80 28" className="spark" focusable="false">
                    <polyline points="0,20 16,16 28,18 40,10 54,14 68,8 80,12" />
                  </svg>
                </div>
              </div>
              <div className="phone-sos">SOS</div>
              <div className="phone-policy">
                <span>Policy</span>
                <small>Policy PDF</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bento wrap" aria-label="Highlights">
        {currentRole ? (
          <article className="bento-tile tile-role reveal">
            <p className="meta-label">Current role</p>
            <h2>{currentRole.company}</h2>
            <p className="tile-title">{currentRole.title}</p>
            <p className="muted">
              {currentRole.start} – {currentRole.end}
            </p>
            {currentRole.summary ? <p>{currentRole.summary}</p> : null}
          </article>
        ) : null}

        <SiteLink href={`/projects/${projectSlug(featured.name)}`} className="bento-tile tile-featured reveal">
          <p className="meta-label">Featured project</p>
          <h2>{featured.name}</h2>
          <p className="project-context">{featured.context}</p>
          {featured.quote ? <p className="tile-quote">{featured.quote}</p> : null}
          <p>{featured.summary}</p>
          {featured.badges?.map((badge) => (
            <p key={badge} className="badge">
              {badge}
            </p>
          ))}
          <p className="tile-more">View project</p>
        </SiteLink>

        <article className="bento-tile tile-experience reveal">
          <p className="meta-label">Experience</p>
          <ul className="snapshot">
            {earlierRoles.map((role) => (
              <li key={role.company}>
                <strong>{role.company}</strong>
                <span>
                  {role.title}
                  <br />
                  {role.start} – {role.end}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-tile tile-stack reveal" id="skills">
          <p className="meta-label">Tech stack</p>
          <ul className="chips">
            {highlightStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {otherSkills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {ownership ? <p className="muted tile-note">{ownership.items.join(" · ")}</p> : null}
        </article>

        {formNinja ? (
          <article className="bento-tile tile-form reveal">
            <p className="meta-label">Open source</p>
            <h2>
              <SiteLink href={`/projects/${projectSlug(formNinja.name)}`}>{formNinja.name}</SiteLink>
            </h2>
            <p>{formNinja.summary}</p>
            {formNinja.links ? (
              <p className="tile-links">
                {formNinja.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </p>
            ) : null}
          </article>
        ) : null}

        <article className="bento-tile tile-location reveal">
          <p className="meta-label">Location</p>
          <h2>{site.location}</h2>
        </article>

        <article className="bento-tile tile-edu reveal">
          <p className="meta-label">Education</p>
          <h2>{site.education.degree}</h2>
          <p>
            {site.education.school}
            <br />
            {site.education.dates} · {site.education.score}
          </p>
          <p className="meta-label">Certification</p>
          <p>{site.certification.display}</p>
        </article>

        <article className="bento-tile tile-writing reveal" id={published.length > 0 ? undefined : "writing"}>
          <p className="meta-label">Writing</p>
          {published.length > 0 ? (
            <h2>
              <SiteLink href="/#writing">{site.writing.heading}</SiteLink>
            </h2>
          ) : (
            <>
              <h2>Coming soon</h2>
              <p className="muted">Longer notes will live here.</p>
            </>
          )}
        </article>

        <article className="bento-tile tile-contact reveal" id="contact">
          <p className="meta-label">Contact</p>
          <h2>{site.contact.heading}</h2>
          <p className="tile-links">
            <a href={site.socials.linkedin} target="_blank" rel="me noopener noreferrer">
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={site.socials.github} target="_blank" rel="me noopener noreferrer">
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : null}
          </p>
        </article>
      </section>

      <section className="band wrap" id="about">
        <div className="section-head reveal">
          <p className="kicker">About</p>
          <h2>From the brief through to production.</h2>
        </div>
        <div className="about-grid">
          {site.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="reveal">
              {paragraph}
            </p>
          ))}
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
          <h2>Selected work.</h2>
        </div>
        <div className="project-grid">
          {site.projects.map((project) => {
            const slug = projectSlug(project.name);
            return (
              <article
                key={project.name}
                className={`project-card reveal${project.featured ? " is-featured" : ""}`}
                data-tilt
              >
                <p className="meta-label">{project.featured ? "Featured" : project.context}</p>
                <h3>
                  <SiteLink href={`/projects/${slug}`}>{project.name}</SiteLink>
                </h3>
                <p className="project-context">{project.context}</p>
                <p>{project.summary}</p>
                {project.stack ? (
                  <ul className="chips" aria-label={`${project.name} stack`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      {published.length > 0 ? (
        <section className="band wrap" id="writing">
          <div className="section-head reveal">
            <p className="kicker">Writing</p>
            <h2>{site.writing.heading}</h2>
          </div>
          <p className="section-intro reveal">{site.writing.intro}</p>
          <ul className="post-list">
            {published.map((post) => (
              <li key={post.slug} className="reveal">
                <article className="post-card" data-tilt>
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
      ) : null}
    </div>
  );
}
