# bukunota.my

Personal website, writing platform, and technical sandbox for **bukunota.my**.

The project is built to keep the publishing workflow simple and cloud-based:

**TinaCMS → GitHub → Cloudflare → bukunota.my**

## Stack

- **Astro** — website framework
- **Markdown / MDX** — content
- **TinaCMS** — web-based content management
- **TinaCloud** — CMS schema and branch integration
- **GitHub** — source code and content
- **Cloudflare** — production hosting and deployment
- **TypeScript** — project tooling

Production site: **https://bukunota.my**

Repository: **https://github.com/inibukunota/astro-anep**

## Project structure

- `src/pages/` — site routes
- `src/components/` — reusable Astro components
- `src/layouts/` — page layouts
- `src/content/blog/` — Markdown/MDX articles
- `src/content.config.ts` — Astro content schema
- `tina/config.ts` — TinaCMS schema and configuration
- `tina/tina-lock.json` — generated TinaCMS schema lock file
- `public/` — static assets
- `.github/workflows/` — GitHub Actions automation

## Content management

TinaCMS is available at:

**https://bukunota.my/admin**

The current `blog` collection supports:

- Title
- Description
- Publication date
- Updated date
- Hero image
- Rich-text article body

TinaCMS writes content back to the GitHub repository, where Cloudflare can build and deploy the updated site.

## Development history

### 9 November 2026 — TinaCMS integration completed

The initial development phase focused on turning the Astro site into a manageable cloud-based publishing platform.

#### Completed

- Established the Astro website and GitHub repository.
- Connected the production site to Cloudflare.
- Connected the project to the `bukunota.my` domain.
- Installed and configured TinaCMS.
- Created a TinaCMS `blog` collection.
- Configured the TinaCMS schema for article metadata and rich-text content.
- Configured the production branch around `main`.
- Added the required TinaCMS environment variables to the Cloudflare deployment.
- Investigated and resolved the TinaCloud branch indexing problem.
- Identified that `tina/tina-lock.json` was required for TinaCloud to detect the schema and index the repository.
- Added GitHub Actions automation to generate and commit the Tina lock file.
- Verified that `tina/tina-lock.json` was successfully generated and committed to `main`.
- Verified that the TinaCMS admin interface is working.
- Verified that content can now be inserted through TinaCMS.
- Removed obsolete CMS/Tina placeholder files and duplicate lockfile workflows during repository housekeeping.

### Current milestone

**TinaCMS is operational.**

The remaining end-to-end verification is to confirm the full publishing path:

**TinaCMS → GitHub commit → Cloudflare build → live article on bukunota.my**

## Planned next phases

### 1. Publishing workflow verification

Create a real test article in TinaCMS and confirm that it reaches GitHub, triggers the Cloudflare deployment, and appears correctly on the live website.

### 2. Website layout

Finalise a consistent layout across the site:

- 1000px overall page width
- Approximately 720px reading width
- Header and navigation
- Homepage
- Article pages
- Responsive behaviour
- Typography and spacing

### 3. Content structure

Consider adding:

- Categories
- Tags
- Author information
- Featured images
- Related articles
- Publication and updated dates

### 4. SEO and technical metadata

Review and implement:

- Page titles
- Meta descriptions
- Canonical URLs
- Open Graph metadata
- Social metadata
- Sitemap
- Robots.txt
- RSS
- Internal linking
- Crawlability and indexability

### 5. Structured data

Implement appropriate Schema.org structured data, including where relevant:

- `WebSite`
- `Person` or `Organization`
- `Blog`
- `BlogPosting` / `Article`
- `BreadcrumbList`

### 6. Performance

Review:

- Core Web Vitals
- Image optimisation
- HTML structure
- Mobile performance
- Cloudflare deployment configuration

### 7. Editorial workflow

Build a repeatable workflow:

**Research → Write → Edit → Publish → Index → Measure → Optimise**

## Repository housekeeping notes

The repository previously contained temporary files and duplicate GitHub Actions workflows created while troubleshooting TinaCMS and package lockfiles. These were cleaned up on **9 November 2026**.

The active TinaCMS automation is now:

`.github/workflows/generate-tina-lock.yml`

The generated:

`tina/tina-lock.json`

is intentionally committed to the repository because TinaCloud requires it for schema and branch indexing.

## Status

**Phase 1: Foundation + CMS — COMPLETE**

**Phase 2: Publishing verification — NEXT**

**Phase 3: Layout + SEO + structured data — PLANNED**
