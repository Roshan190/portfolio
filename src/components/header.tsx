import { SiteLink } from "@/components/site-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="stripe" aria-hidden="true" />
      <div className="wrap header-inner">
        <SiteLink href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            RS
          </span>
          <span className="brand-name">{site.name}</span>
        </SiteLink>
        <nav className="nav-desktop" aria-label="Primary">
          {site.nav.map((item) => (
            <SiteLink key={item.href} href={item.href}>
              {item.label}
            </SiteLink>
          ))}
        </nav>
        <div className="header-tools">
          <ThemeToggle />
          <details className="nav-details">
            <summary className="nav-summary">
              <span className="when-closed">Menu</span>
              <span className="when-open">Close</span>
            </summary>
            <nav className="nav-panel" aria-label="Mobile">
              <div className="wrap nav-panel-inner">
                {site.nav.map((item) => (
                  <SiteLink key={item.href} href={item.href}>
                    {item.label}
                  </SiteLink>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
