# TASK-4: List Template for Content Indexes

## Objective
Create `layouts/_default/list.html` template for content listing pages (blog index, notes list, talks list, work list).

## Requirements
- Display all items in section
- Handle both internal and external content
- Show metadata (title, date, label, featured status)
- Link to content (internal) or external URL
- Group or filter by featured status if needed
- Minimal, legible design

## Template Purpose
List templates render:
- `/blog/` - list of all blog posts
- `/notes/` - list of all notes
- `/talks/` - list of all talks
- `/work/` - list of all work items
- Any other section indexes

## Deliverables

### 1. Create `layouts/_default/list.html`

Template extends baseof:
```html
{{ define "main" }}
<div class="list-page">
  <h1>{{ .Title }}</h1>

  {{ if .Content }}
    <div class="section-intro">
      {{ .Content }}
    </div>
  {{ end }}

  <!-- Featured items first (optional) -->
  {{ $featured := where .Pages ".Params.featured" true }}
  {{ if $featured }}
    <section class="featured">
      <h2>Featured</h2>
      {{ range $featured }}
        <!-- Item card -->
      {{ end }}
    </section>
  {{ end }}

  <!-- All items -->
  <section class="items">
    {{ range .Pages }}
      <!-- Item card -->
    {{ end }}
  </section>
</div>
{{ end }}
```

### 2. Item Card Component

For each item, display:
- **Title**: Link to content or external URL
- **Date**: Formatted date
- **Label**: If present (github, twitter, etc.)
- **Description**: If available (params.description)
- **External indicator**: Icon or text if external link

Handle external vs internal:
```html
{{ if .Params.external }}
  <a href="{{ .Params.url }}" target="_blank" rel="noopener">
    {{ .Title }}
  </a>
{{ else }}
  <a href="{{ .Permalink }}">
    {{ .Title }}
  </a>
{{ end }}
```

### 3. Metadata Display

Show relevant metadata:
- **Date**: `{{ .Date.Format "January 2, 2006" }}`
- **Label**: `{{ .Params.label }}` (with styling)
- **Featured**: Badge or indicator

### 4. Sorting and Filtering

- Default sort: By date (newest first)
- Optional: Separate featured section
- Optional: Filter by label/category

## Context
- Current Astro implementation: `src/pages/blog/index.astro`, etc.
- 23 blog posts, 7 notes, 5 talks, 8 work items
- Some content is external (notes, talks, work) - redirect to external URL
- Blog posts can be internal or external
- Featured flag exists on some content

## Acceptance Criteria
- [ ] `layouts/_default/list.html` created
- [ ] Template extends baseof (`{{ define "main" }}`)
- [ ] Lists all pages in section
- [ ] Displays title, date, description
- [ ] Handles external links (target="_blank", rel="noopener")
- [ ] Handles internal links (.Permalink)
- [ ] Shows label if present
- [ ] Optional: Featured section
- [ ] Sorts by date (newest first)
- [ ] Renders without errors on `/blog/`, `/notes/`, etc.
- [ ] Links work correctly (internal and external)

## Notes
- Keep design minimal - typography and spacing priority
- External link indicator helpful for UX
- Consider label styling (colors, badges)
- Test with actual content after creation
