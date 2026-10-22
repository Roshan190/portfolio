import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";

export function Header() {
  const projects = site.nav[0];
  const rest = site.nav.slice(1);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <SiteLink href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            RS
          </span>
          <span className="brand-name">{site.name}</span>
        </SiteLink>
        <SiteLink href={projects.href} className="projects-link">
          {projects.label}
        </SiteLink>
        <nav className="nav-desktop" aria-label="Primary">
          {rest.map((item) => (
            <SiteLink key={item.href} href={item.href}>
              {item.label}
            </SiteLink>
          ))}
          <SiteLink href="/">The pier</SiteLink>
        </nav>
        <details className="nav-details">
          <summary className="nav-summary">
            <span className="when-closed">Menu</span>
            <span className="when-open">Close</span>
          </summary>
          <nav className="nav-panel" aria-label="Mobile">
            {site.nav.map((item) => (
              <SiteLink key={item.href} href={item.href}>
                {item.label}
              </SiteLink>
            ))}
            <SiteLink href="/">The pier</SiteLink>
          </nav>
        </details>
      </div>
    </header>
  );
}
