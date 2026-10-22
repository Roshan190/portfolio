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

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const prefix = getBasePath();
  if (path === "/" || path === "") return `${base}${prefix}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${normalized}`;
}
