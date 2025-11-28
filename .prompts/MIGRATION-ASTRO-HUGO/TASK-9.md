# TASK-9: External Link Redirect Handling

## Objective
Implement proper handling for content marked as external links - redirect users to the external URL instead of rendering a page.

## Requirements
- Content with `external: true` should redirect to `url` field
- No intermediate page - direct redirect
- Works for all content types (blog, notes, talks, work)
- Preserve SEO (use proper redirect)
- Fallback if no URL provided

## Current Context
Content types with external links:
- Some blog posts (e.g., cross-posted to Medium)
- Most notes (links to Twitter threads, external articles)
- Most talks (links to slides, videos)
- All work items (links to projects)

Example frontmatter:
```yaml
---
featured: true
external: true
label: twitter
title: "Tailwind is all you need"
date: 2022-09-12
url: https://x.com/dpandiyan/status/1569111431488086017
---
```

## Hugo Redirect Strategies

### Option 1: Meta Refresh in Single Template (Simplest)

Modify `layouts/_default/single.html` to check for external:
```html
{{ define "main" }}
{{ if .Params.external }}
  <meta http-equiv="refresh" content="0; url={{ .Params.url }}">
  <p>Redirecting to <a href="{{ .Params.url }}">{{ .Params.url }}</a>...</p>
  <script>window.location.href = "{{ .Params.url }}";</script>
{{ else }}
  <!-- Normal single page content -->
  <article>...</article>
{{ end }}
{{ end }}
```

### Option 2: Separate Template for External Content

Create `layouts/_default/external.html`:
```html
{{ define "main" }}
<div class="external-redirect">
  <p>Redirecting to external content...</p>
  <p><a href="{{ .Params.url }}">{{ .Params.url }}</a></p>
  <meta http-equiv="refresh" content="0; url={{ .Params.url }}">
  <script>window.location.href = "{{ .Params.url }}";</script>
</div>
{{ end }}
```

Set layout in frontmatter:
```yaml
---
layout: external
external: true
url: https://example.com
---
```

### Option 3: Hugo Aliases (Not Ideal for External)

Hugo aliases are for internal redirects, not external URLs.

## Deliverables

### 1. Choose Strategy
Recommend **Option 1** (check in single.html) - simplest, no frontmatter changes needed.

### 2. Implement in Single Template

Modify `layouts/_default/single.html`:
```html
{{ define "main" }}
{{ if and .Params.external .Params.url }}
  <!-- External redirect -->
  <div class="external-redirect">
    <h1>{{ .Title }}</h1>
    <p>Redirecting to external content...</p>
    <p>
      If you are not redirected automatically,
      <a href="{{ .Params.url }}">click here</a>.
    </p>
  </div>
  <meta http-equiv="refresh" content="0; url={{ .Params.url }}">
  <script>
    window.location.href = "{{ .Params.url }}";
  </script>
{{ else }}
  <!-- Internal content page -->
  <article class="single-post">
    <!-- Normal content rendering -->
  </article>
{{ end }}
{{ end }}
```

### 3. Update List Template (TASK-4)

Ensure list templates link correctly:
```html
{{ if .Params.external }}
  <a href="{{ .Params.url }}" target="_blank" rel="noopener noreferrer">
    {{ .Title }}
  </a>
{{ else }}
  <a href="{{ .Permalink }}">
    {{ .Title }}
  </a>
{{ end }}
```

### 4. Add External Link Indicator

In list template, show indicator for external links:
```html
{{ if .Params.external }}
  <span class="external-icon" aria-label="External link">↗</span>
{{ end }}
```

## SEO Considerations

### Meta Refresh
- `<meta http-equiv="refresh" content="0; url=...">`
- Works for search engines
- Not ideal for SEO (prefer server-side redirects)
- Acceptable for this use case

### JavaScript Fallback
- Immediate redirect for users with JS enabled
- Faster than meta refresh
- Doesn't work for search engine bots (meta refresh does)

### Link Element
- Add canonical link to external URL:
```html
<link rel="canonical" href="{{ .Params.url }}">
```

## Testing Checklist

1. **External blog post**: Redirects to external URL
2. **External note**: Redirects to Twitter/external article
3. **External talk**: Redirects to slides/video
4. **External work**: Redirects to project
5. **Internal content**: Renders normally (no redirect)
6. **Missing URL**: Shows error or fallback (don't redirect)
7. **List pages**: External links have target="_blank"
8. **List pages**: External indicator visible

## Context
- Related to TASK-4 (list template) and TASK-5 (single template)
- Most notes, talks, work items are external
- Some blog posts are external (cross-posts)
- Current Astro implementation handles this in page generation

## Acceptance Criteria
- [ ] Single template checks for `external: true`
- [ ] If external and URL exists, redirect immediately
- [ ] Redirect uses both meta refresh and JavaScript
- [ ] Fallback message with manual link shown
- [ ] Internal content still renders normally
- [ ] List templates link to external URL directly (target="_blank")
- [ ] External link indicator shown in lists
- [ ] Canonical link added for SEO
- [ ] Tested with external blog, note, talk, work items
- [ ] No redirect if `url` is missing (error handling)

## Notes
- Meta refresh + JavaScript provides best compatibility
- List templates should link directly to external URLs (no intermediate page)
- Single page redirect is fallback for direct URL access
- Consider adding `rel="noopener noreferrer"` for security
- Test redirect timing (0 second delay)
