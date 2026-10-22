import type { AnchorHTMLAttributes, ReactNode } from "react";
import { getBasePath } from "@/lib/url";

export function internalHref(path: string): string {
  const base = getBasePath();
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = beforeHash.indexOf("?");
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const normalized =
    pathname === "" || pathname === "/"
      ? "/"
      : pathname.endsWith("/")
        ? pathname
        : `${pathname}/`;

  if (normalized === "/") return `${base}/${query}${hash}`;
  return `${base}${normalized}${query}${hash}`;
}

export function SiteLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a {...rest} className={className} href={internalHref(href)}>
      {children}
    </a>
  );
}
