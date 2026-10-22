import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { getBasePath, getSiteUrl } from "@/lib/url";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "600", "700"],
});

const base = getBasePath();
const bootScript = `(function(){document.addEventListener("click",function(event){var target=event.target;if(!target||!target.closest)return;var link=target.closest(".nav-panel a");if(!link)return;var details=link.closest("details");if(details)details.open=false;});if(!window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches)return;var script=document.createElement("script");script.type="module";script.src=${JSON.stringify(`${base}/enhance.js`)};document.body.appendChild(script);})();`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.socials.linkedin }],
  creator: site.name,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: `${getBasePath()}/icon`,
    apple: `${getBasePath()}/apple-icon`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} data-base={base}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </body>
    </html>
  );
}
