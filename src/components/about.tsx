import { site } from "@/content/site";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="wrap">
        <div className="reveal">
          <div className="section-head">
            <p className="kicker section-index">01 — About</p>
            <h2 id="about-heading">About</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              {site.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <article className="card education-card">
              <h3>Education</h3>
              <p className="edu-degree">{site.education.degree}</p>
              <p>{site.education.school}</p>
              <p className="muted">{site.education.dates}</p>
              <p>{site.education.score}</p>
              <h3 className="cert-label">Certification</h3>
              <p>{site.certification.display}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
