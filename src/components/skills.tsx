import { site } from "@/content/site";

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="wrap">
        <div className="reveal">
          <div className="section-head">
            <p className="kicker section-index">04 — Skills</p>
            <h2 id="skills-heading">Skills</h2>
          </div>
          <div className="skill-grid">
            {site.skillGroups.map((group) => (
              <article className="card skill-group" key={group.name}>
                <h3>{group.name}</h3>
                <ul className="chip-row" aria-label={group.name}>
                  {group.items.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
