import { ExternalLink } from "@/components/external-link";
import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";

function Marquee() {
  const items = site.skillGroups
    .filter((group) => group.name !== "Ownership & Delivery")
    .flatMap((group) => [...group.items]);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            className={copy === 1 ? "marquee-group marquee-copy" : "marquee-group"}
            key={copy}
          >
            {items.map((item) => (
              <li key={`${copy}-${item}`}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-heading">
        <div className="orb orb-a" aria-hidden="true" />
        <div className="orb orb-b" aria-hidden="true" />
        <div className="orb orb-c" aria-hidden="true" />
        <div className="wrap hero-copy">
          <p className="kicker">{site.location}</p>
          <p className="badge" style={{ marginTop: "0.85rem" }}>
            {site.availability}
          </p>
          <h1 className="hero-title" id="hero-heading">
            <span className="hero-line">Roshan</span>
            <br />
            <span className="marker">Shikhare</span>
          </h1>
          <p className="pitch">{site.headline}</p>
          <div className="actions">
            {site.resumeUrl ? (
              <ExternalLink className="btn btn-lime" href={site.resumeUrl}>
                Resume
              </ExternalLink>
            ) : null}
            <ExternalLink
              className={site.resumeUrl ? "btn btn-ink" : "btn btn-lime"}
              href={site.socials.linkedin}
              me
            >
              LinkedIn
            </ExternalLink>
            <ExternalLink
              className={site.resumeUrl ? "btn btn-line" : "btn btn-ink"}
              href={site.socials.github}
              me
            >
              GitHub
            </ExternalLink>
            <SiteLink className="btn btn-line" href="/#projects">
              Selected work
            </SiteLink>
          </div>
          <dl className="facts">
            <div>
              <dt>Experience</dt>
              <dd>5+ years</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Mumbai</dd>
            </div>
            <div>
              <dt>Current</dt>
              <dd>Bajaj Finserv</dd>
            </div>
          </dl>
        </div>
      </section>
      <Marquee />
    </>
  );
}
