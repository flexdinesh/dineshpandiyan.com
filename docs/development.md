# Development Guide

## Prerequisites

- Hugo Extended v0.152+ ([installation guide](https://gohugo.io/installation/))

## Development Server

Start local dev server with live reload:

```bash
hugo server
```

Server runs at `http://localhost:1313/`

### Options

```bash
# Custom port
hugo server --port 8080

# Bind to all interfaces (for network access)
hugo server --bind 0.0.0.0

# Disable fast render (full rebuilds on change)
hugo server --disableFastRender

# Include draft content
hugo server --buildDrafts
```

## Build

Generate static site to `public/`:

```bash
hugo
```

### Clean Build

Remove old files before building:

```bash
hugo --cleanDestinationDir
```

### Build Options

```bash
# Production build (minified)
hugo --minify

# Include drafts
hugo --buildDrafts

# Custom destination
hugo --destination dist/
```

## Project Structure

```
.
├── assets/          # CSS files (Hugo pipeline)
├── content/         # Markdown content
│   ├── blog/
│   ├── notes/
│   ├── talks/
│   └── work/
├── layouts/         # HTML templates
│   ├── _default/
│   └── index.html
├── static/          # Static files (copied as-is)
└── hugo.toml        # Site configuration
```

## Content Guidelines

### Frontmatter

Hugo reserved fields (top-level):
- `title` - required
- `date` - required (format: `2024-01-15`)
- `draft` - boolean
- `description` - string

Custom fields (under `params:`):
- `featured` - boolean
- `external` - boolean (for external links)
- `url` - string (external URL, only with `external: true`)
- `label` - enum (twitter, github, npm, dev.to, medium, youtube, podcast, deprecated, archived, thoughts)
- `ogImagePath` - string

### Example Frontmatter

Internal post:
```yaml
---
title: "My Blog Post"
date: 2024-01-15
description: "Post description"
params:
  featured: true
  label: "thoughts"
---
```

External link:
```yaml
---
title: "My External Article"
date: 2024-01-15
params:
  external: true
  url: "https://dev.to/user/article"
  label: "dev.to"
---
```

## Theme Switching

Light/dark theme toggle uses vanilla JS + localStorage. No dependencies.

Implementation:
- FOUC prevention in `<head>`
- Toggle button in header
- Persists preference across sessions
- Falls back to system preference

## RSS & Sitemap

Auto-generated on build:
- `/feed.xml` - full site feed
- `/blog/feed.xml` - blog posts only
- `/notes/feed.xml` - notes only
- `/sitemap.xml` - all pages

## Syntax Highlighting

Uses Hugo's built-in Chroma:
- Style: monokai
- Line numbers enabled
- Configured in `hugo.toml`

Supported languages: JavaScript, TypeScript, Go, Python, Rust, HTML, CSS, Bash, etc.
