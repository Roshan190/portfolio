# Roshan Shikhare — portfolio

Personal site for recruiters and hiring managers. Next.js App Router, TypeScript, and Tailwind CSS, built as a static export. GitHub Actions publishes it to GitHub Pages at [https://roshan190.github.io/portfolio/](https://roshan190.github.io/portfolio/).

The homepage is the recruiter page: hero, about, experience, projects, skills, writing, and contact. Project write-ups live at `/projects/[slug]`. `/work` is a static redirect back to `/`. Desktop screens with a fine pointer load smooth scrolling and motion from `public/enhance.js`. Reduced motion and smaller screens keep native scrolling.

## Edit content

Public copy lives in [`src/content/site.ts`](src/content/site.ts). That includes the headline, about text, experience, projects, skills, and contact links.

Blog posts are the exception: add an `.mdx` file in `src/content/posts`, export a `meta` object (`title`, `description`, `date`, `draft`), and register it in [`src/content/posts.ts`](src/content/posts.ts).

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

`npm run build` writes the static site to `out/` and then removes the Next.js client runtime from the HTML. Pages are server-rendered HTML and CSS. The mobile menu uses a small inline script, and desktop motion is a separate file, so the site does not need the framework bundle. `next start` does not serve an export. After a build, use any static file server against `out/`.

## Environment

Copy `.env.example` if you want to override the defaults.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origin used for canonical, Open Graph, sitemap, and JSON-LD. |
| `NEXT_PUBLIC_BASE_PATH` | Subpath such as `/portfolio` for a GitHub Pages project site. Leave empty when the site is served from the domain root. |

Both are read at build time. The Pages workflow sets them to `https://roshan190.github.io/portfolio` and `/portfolio`. There is no custom domain.

## GitHub Pages

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs on pushes to `main` and, until that lands, on `cursor/portfolio-site-259e`. It builds the static export and deploys with `actions/upload-pages-artifact` and `actions/deploy-pages`.

The artifact root is `out/`. GitHub Pages serves that root at `/portfolio/`, and `NEXT_PUBLIC_BASE_PATH` prefixes links and assets to match. `public/.nojekyll` is copied into the export so paths under `_next/` are not dropped.

Pages must use the GitHub Actions source. The `github-pages` environment must allow both `main` and `cursor/portfolio-site-259e` until the preview branch is no longer needed.

## Placeholders

- `resumeUrl` in `src/content/site.ts` — hosted resume PDF. The button stays hidden while this is empty.
- `email` in `src/content/site.ts` — optional. Hidden while empty.
- Bajaj Finserv role — one public sentence for now. A comment in `src/content/site.ts` marks where Roshan will add details later.
- `src/content/posts/placeholder-draft.mdx` — scaffold draft, not a published article. It is `noindex`.
- `NEXT_PUBLIC_SITE_URL` — the Pages workflow sets the public origin. A local build without it still falls back to `http://localhost:3000`.

## Privacy

Do not commit a resume PDF. The source résumé includes a phone number. Do not add a phone number to the site. The build runs `scripts/check-privacy.mjs`, which fails if a 10-digit phone number appears in the source, or if an email appears while `email` is empty.
