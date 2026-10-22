import type { Metadata } from "next";
import { SiteLink } from "@/components/site-link";
import { getBasePath } from "@/lib/url";

const target = `${getBasePath()}/`;

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function WorkRedirect() {
  const script = `(function(){var base=document.documentElement.getAttribute("data-base")||"";location.replace(base+"/"+(location.hash||""));})();`;

  return (
    <section className="wrap page-block">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <h1>This page has moved</h1>
      <p>
        <SiteLink href="/">Continue to the homepage</SiteLink>
      </p>
    </section>
  );
}
