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
    layout.tsx          # Root layout — fonts, theme init script
    page.tsx            # Home page (mounts Portfolio component)
    globals.css         # Design system — tokens, sections, animations
    experience/
      page.tsx          # Full work & education history (static)
      experience.css    # Page-scoped styles
  components/
    portfolio.tsx       # Main portfolio component (all sections)
    reading-progress.tsx
    tweaks-panel.tsx    # Dev-only utility (not rendered in production)
public/
  CNAME                 # romainjouffret.com
  theme-init.js         # Anti-FOUC theme detection script
  uploads/              # Resume PDFs
.github/
  workflows/
    deploy.yml          # Build → upload artifact → deploy to Pages
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main portfolio — Nav, Hero, About, Skills, Work, Contact |
| `/experience` | Full work and education history with reading progress bar |

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

1. Checks out the repo and installs Node 20
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

- **Dark / light theme** — persisted in `localStorage`, detected on first visit from `prefers-color-scheme`; anti-FOUC via a blocking inline script (`public/theme-init.js`)
- **Live clock** — shows current time in LAX and NYC in the navigation bar
- **Scroll reveals** — sections animate in via `IntersectionObserver`
- **Parallax** — hero section and project preview cards respond to scroll position
- **Crosshair cursor** — custom SVG cursor that tracks mouse position
- **Responsive** — fluid gutters via `clamp()`, mobile-first layout
