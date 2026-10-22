import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="wrap">
        <div className="reveal">
          <div className="section-head contact-panel">
            <p className="kicker section-index">06 — Contact</p>
            <h2 id="contact-heading">{site.contact.heading}</h2>
            <p className="section-intro">{site.contact.body}</p>
          </div>
          <div className="contact-links">
            <ExternalLink className="card contact-card" href={site.socials.linkedin} me>
              <span className="kicker">Profile</span>
              <strong>
                LinkedIn <span className="link-arrow" aria-hidden="true">→</span>
              </strong>
            </ExternalLink>
            <ExternalLink className="card contact-card" href={site.socials.github} me>
              <span className="kicker">Code</span>
              <strong>
                GitHub <span className="link-arrow" aria-hidden="true">→</span>
              </strong>
            </ExternalLink>
            {site.email ? (
              <a className="card contact-card" href={`mailto:${site.email}`}>
                <span className="kicker">Email</span>
                <strong>{site.email}</strong>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
