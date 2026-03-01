# Orangecake

A modern, content-driven website starter built with Next.js, featuring visual editing via Stackbit and Git-based content management via Decap CMS. Designed for fast, SEO-friendly static sites with a flexible component-based page builder.

## Features

- **Visual Editing** — Stackbit integration for in-context editing with Netlify Visual Editor
- **Git-based CMS** — Decap CMS for managing content through a familiar Git workflow
- **Flexible Page Builder** — Compose pages from reusable sections (Hero, Features Grid, and more)
- **Blog** — Markdown-powered blog with front matter metadata, featured images, and date organization
- **SEO** — Per-page metadata including meta title, meta description, and Open Graph image
- **Static Generation** — Pages pre-rendered at build time from JSON and Markdown content files
- **TypeScript** — Type definitions included via `@stackbit/types`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | CSS Modules |
| Visual Editor | Stackbit / Netlify Visual Editor |
| CMS | Decap CMS |
| Content Source | Git (`@stackbit/cms-git`) |
| Markdown | react-markdown, gray-matter |
| Deployment | Netlify |

## Project Structure

```
orangecake/
├── content/                  # Content files (managed by CMS or directly)
│   ├── pages/                # Page content (JSON)
│   ├── posts/                # Blog posts (Markdown + frontmatter)
│   └── settings/             # Site-wide settings (JSON)
├── public/
│   └── admin/                # Decap CMS interface
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.js           # Home page
│   │   ├── [slug]/page.js    # Dynamic pages
│   │   └── blog/             # Blog listing and post pages
│   ├── components/           # Reusable React components
│   └── lib/
│       └── api.js            # Content fetching utilities
├── stackbit.config.js        # Stackbit visual editor configuration
├── netlify.toml              # Netlify build and deployment config
└── next.config.mjs           # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd orangecake
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Content Management

### Content Files

All content lives in the `content/` directory and is tracked in Git:

- **Pages** — `content/pages/*.json` — Each file maps to a route by its filename (e.g. `about.json` → `/about`)
- **Posts** — `content/posts/*.md` — Markdown files with YAML frontmatter
- **Settings** — `content/settings/global.json` — Site-wide configuration (site title, navigation, footer)

### Page Sections

Pages are composed from a `sections` array. Supported section types:

| Type | Component | Description |
|---|---|---|
| `hero` | `Hero` | Full-width hero with title and description |
| `features_grid` | `FeaturesGrid` | Grid of feature cards |
| `field_types_demo` | `FieldTypesDemo` | Showcase of all available field types |

### Decap CMS

Access the CMS interface at `/admin/` (requires GitHub authentication). Content changes are committed directly to the repository.

### Stackbit Visual Editor

For visual in-context editing, connect the project to [Netlify Visual Editor](https://www.netlify.com/platform/visual-editor/) and run the Stackbit dev server alongside Next.js.

## Deployment

### Netlify

The project is configured for Netlify deployment out of the box:

1. Connect the repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`

The `netlify.toml` and `@netlify/plugin-nextjs` handle the rest.

### Environment Variables

| Variable | Description |
|---|---|
| *(none required for basic deployment)* | |

If using Auth0 for CMS authentication, see [AUTH0_SETUP.md](./AUTH0_SETUP.md) for required environment variables.

## Content Models

### Page Models

- **`home`** — Landing page with a `sections` array
- **`about`** — Simple page with a Markdown `body` field
- **`flexible_page`** — General-purpose page with a `sections` array
- **`post`** — Blog post with title, date, body, and optional thumbnail

### Shared Object Models

- **`seo`** — `metaTitle`, `metaDescription`, `ogImage`
- **`hero`** — `title`, `description`
- **`features_grid`** — Array of feature cards (`title`, `description`, `icon`)

## License

Private.
