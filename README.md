# Romain Jouffret — Portfolio

Personal portfolio website for Romain Jouffret, built with Next.js and deployed to GitHub Pages at [romainjouffret.com](https://romainjouffret.com).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (App Router) |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist Sans & Geist Mono via `next/font` |
| Output | Static export (`output: "export"`) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout — fonts, inline theme init, shared cursor
    page.tsx            # Home page (mounts Portfolio component)
    globals.css         # Design system — tokens, sections, animations
    experience/
      page.tsx          # Full work & education history (static)
      experience.css    # Page-scoped styles
  data/
    profile.ts          # Shared career history, education, and profile links
  components/
    portfolio.tsx       # Main portfolio component (all sections)
    reading-progress.tsx
    crosshair.tsx       # Shared pointer cursor
    tweaks-panel.tsx    # Dev-only utility (not rendered in production)
public/
  CNAME                 # romainjouffret.com
  llms.txt              # Plain-text profile and site summary
  uploads/              # Resume PDFs
.github/
  workflows/
    deploy.yml          # Build → upload artifact → deploy to Pages
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main portfolio — About, Selected work, Experience, Expertise, Contact |
| `/experience` | Full work history, leadership, education, and languages |

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack.

### Build

```bash
npm run build   # Outputs static files to ./out
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Checks out the repo and installs Node 24
2. Runs `npm ci && npm run build` — produces `./out`
3. Uploads `./out` as a GitHub Pages artifact
4. Deploys the artifact to GitHub Pages

The site is served at the custom domain `romainjouffret.com` via the `public/CNAME` file.

## Custom Domain DNS (Squarespace)

To point `romainjouffret.com` to GitHub Pages, configure the following DNS records in Squarespace Domains:

**A records** (apex domain `@`):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME record** (www subdomain):
```
www  →  nahast.github.io
```

DNS propagation can take up to 48 hours. Once active, GitHub Pages will automatically provision an HTTPS certificate via Let's Encrypt.

## Features

- **Dark / light theme** — persisted in `localStorage`, detected on first visit from `prefers-color-scheme`; anti-FOUC via a blocking inline script in `src/app/layout.tsx`
- **Live clock** — shows current time in LAX and NYC in the navigation bar
- **Scroll reveals** — sections animate in via `IntersectionObserver`
- **Parallax** — hero section responds to scroll position
- **Crosshair cursor** — custom SVG cursor that tracks mouse position
- **Responsive** — fluid gutters via `clamp()`, mobile-first layout

## Updating Content

Career facts and shared contact details live in `src/data/profile.ts`. Both pages use this file for role titles, dates, locations, and experience. Homepage introductions, selected work, and expertise summaries live in `src/components/portfolio.tsx`.

The current content is based on `Romain_Jouffret_Resume_v10.pdf`. Its download is served from `public/uploads/`, with the URL set in `profile.resume`. When updating the résumé, update both the shared history and the homepage summaries. Keep project outcomes tied to the source résumé and preserve overlapping role dates.
