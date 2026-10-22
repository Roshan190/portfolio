import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          {site.name} · {site.location}
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <a href={site.socials.linkedin} target="_blank" rel="me noopener noreferrer">
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={site.socials.github} target="_blank" rel="me noopener noreferrer">
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <SiteLink href="/work">Projects</SiteLink>
          <a href="#top">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
