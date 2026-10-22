import { ExternalLink } from "@/components/external-link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          {site.name} · {site.location}
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <ExternalLink href={site.socials.linkedin} me>
            LinkedIn
          </ExternalLink>
          <ExternalLink href={site.socials.github} me>
            GitHub
          </ExternalLink>
          <a href="#top">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
