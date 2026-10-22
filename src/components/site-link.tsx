import type { ReactNode } from "react";
import { getBasePath } from "@/lib/url";

export function internalHref(path: string): string {
  const base = getBasePath();
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const pathname = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const normalized =
    pathname === "" || pathname === "/"
      ? "/"
      : pathname.endsWith("/")
        ? pathname
        : `${pathname}/`;

  if (normalized === "/") return `${base}/${hash}`;
  return `${base}${normalized}${hash}`;
}

export function SiteLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={internalHref(href)}>
      {children}
    </a>
  );
}
