import type { ReactNode } from "react";

export function ExternalLink({
  href,
  className,
  children,
  me = false,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  me?: boolean;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel={me ? "me noopener noreferrer" : "noopener noreferrer"}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
