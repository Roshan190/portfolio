import { SiteLink } from "@/components/site-link";
import { site } from "@/content/site";

export function Header() {
  const desktop = site.nav.filter((item) => item.label !== "Projects");

  return (
    <header className="site-header" id="top">
      <div className="wrap header-inner">
        <SiteLink href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            RS
          </span>
          <span className="brand-name">{site.name}</span>
        </SiteLink>
        <SiteLink href="/#projects" className="projects-link">
          Projects
        </SiteLink>
        <nav className="nav-desktop" aria-label="Primary">
          {desktop.map((item) => (
            <SiteLink key={item.href} href={item.href}>
              {item.label}
            </SiteLink>
          ))}
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
          </nav>
        </details>
      </div>
    </header>
  );
}
