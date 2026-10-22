import { site } from "@/content/site";

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <div className="wrap">
        <div className="reveal">
          <div className="section-head">
            <p className="kicker section-index">02 — Experience</p>
            <h2 id="experience-heading">Experience</h2>
          </div>
          <ol className="timeline">
            {site.experience.map((role) => (
              <li
                className={role.current ? "role role-current" : "role"}
                key={`${role.company}-${role.start}`}
              >
                <article className="card role-card">
                  <p className="role-meta kicker">
                    <span>
                      {role.start} – {role.end}
                    </span>
                    {role.location ? <span>{role.location}</span> : null}
                    {role.current ? <span className="badge">Current</span> : null}
                  </p>
                  <h3>{role.title}</h3>
                  <p className="company">{role.company}</p>
                  {role.summary ? <p className="role-summary">{role.summary}</p> : null}
                  {role.bullets && role.bullets.length > 0 ? (
                    <ul className="point-list">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {role.technologies && role.technologies.length > 0 ? (
                    <ul className="chip-row" aria-label={`${role.company} technologies`} style={{ marginTop: "0.9rem" }}>
                      {role.technologies.map((tech) => (
                        <li className="chip" key={tech}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
