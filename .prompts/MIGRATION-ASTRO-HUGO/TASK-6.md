# TASK-6: Home Page Template

## Objective
Create `layouts/index.html` template for the site homepage/landing page.

## Requirements
- Welcome/intro section
- Featured content from all sections
- Links to main sections (blog, notes, talks, work)
- Minimal, clean design
- Highlight recent or featured posts

## Template Purpose
The home template renders the root `/` page - the site's landing page.

## Deliverables

### 1. Create `layouts/index.html`

Template extends baseof:
```html
{{ define "main" }}
<div class="home-page">
  <!-- Hero/Intro Section -->
  <section class="intro">
    <h1>{{ .Site.Title }}</h1>
    {{ if .Content }}
      {{ .Content }}
    {{ end }}
  </section>

  <!-- Featured Content -->
  <section class="featured-content">
    <h2>Featured</h2>

    <!-- Get featured posts from all sections -->
    {{ $featured := where .Site.RegularPages ".Params.featured" true }}
    {{ range first 5 $featured }}
      <article class="featured-item">
        <h3>
          {{ if .Params.external }}
            <a href="{{ .Params.url }}" target="_blank" rel="noopener">
              {{ .Title }}
            </a>
          {{ else }}
            <a href="{{ .Permalink }}">{{ .Title }}</a>
          {{ end }}
        </h3>

        <div class="meta">
          <time datetime="{{ .Date.Format "2006-01-02" }}">
            {{ .Date.Format "Jan 2, 2006" }}
          </time>
          <span class="section">{{ .Section }}</span>
          {{ if .Params.label }}
            <span class="label">{{ .Params.label }}</span>
          {{ end }}
        </div>

        {{ if .Params.description }}
          <p>{{ .Params.description }}</p>
        {{ end }}
      </article>
    {{ end }}
  </section>

  <!-- Recent Posts by Section -->
  <section class="recent-posts">
    <h2>Recent</h2>

    {{ range first 5 .Site.RegularPages }}
      <article class="recent-item">
        <!-- Similar to featured item -->
      </article>
    {{ end }}
  </section>

  <!-- Section Links -->
  <section class="sections">
    <nav class="section-nav">
      <a href="/blog/">Blog</a>
      <a href="/notes/">Notes</a>
      <a href="/talks/">Talks</a>
      <a href="/work/">Work</a>
    </nav>
  </section>
</div>
{{ end }}
```

### 2. Content Organization

**Featured Section**:
- Query all pages with `featured: true`
- Show 3-5 most recent featured items
- Mix from all sections

**Recent Section**:
- Show 5-10 most recent posts across all sections
- Or recent per section

**Section Links**:
- Clear navigation to main content areas
- Can be cards or simple links

### 3. Home Page Content

Option 1: Create `content/_index.md`:
```markdown
---
title: "Your Name"
---

Brief intro about yourself and the site.
```

Option 2: Hardcode intro in template

### 4. Layout Options

Choose layout approach:
- Single column with featured then recent
- Grid layout with cards
- Minimal list with links
- Hero section with prominent intro

Keep it simple and minimal per requirements.

## Context
- Current Astro implementation: `src/pages/index.astro`
- Site has blog, notes, talks, work sections
- Some content is featured
- User prefers minimal design

## Acceptance Criteria
- [ ] `layouts/index.html` created
- [ ] Template extends baseof (`{{ define "main" }}`)
- [ ] Shows site title/intro
- [ ] Displays featured content (3-5 items)
- [ ] Shows recent posts or per-section recent
- [ ] Links to main sections (blog, notes, talks, work)
- [ ] Handles external links properly
- [ ] Displays metadata (date, section, label)
- [ ] Design is minimal and legible
- [ ] Renders without errors
- [ ] Homepage loads at `/`

## Notes
- Can create `content/_index.md` for intro content
- Featured query: `.Site.RegularPages` with filter
- Keep design simple - prioritize content discovery
- Test that featured posts show correctly
- Ensure external links work
