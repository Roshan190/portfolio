/** Absolute origin and optional subpath. Safe to import from next.config. */

export function getBasePath(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (!raw || raw === "/") return "";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = raw && raw.length > 0 ? raw : "http://localhost:3000";
  return url.replace(/\/$/, "");
}

/** Public site root. Includes the base path once, even if the site URL already ends with it. */
export function getPublicRoot(): string {
  const site = getSiteUrl();
  const prefix = getBasePath();
  if (!prefix || site.endsWith(prefix)) return site;
  return `${site}${prefix}`;
}

export function absoluteUrl(path: string): string {
  const base = getPublicRoot();
  if (path === "/" || path === "") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
