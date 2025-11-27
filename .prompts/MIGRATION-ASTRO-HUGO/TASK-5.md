# TASK-5: Single Page Template for Posts

## Objective
Create `layouts/_default/single.html` template for individual content pages (blog posts, notes with content, etc.).

## Requirements
- Display post title, date, metadata
- Render markdown content with syntax highlighting
- Show labels/tags
- Handle OpenGraph images
- Show canonical URL if present
- Minimal, readable typography
- Support Chroma syntax highlighting

## Template Purpose
Single templates render individual content pages:
- `/blog/post-title/` - individual blog post
- `/notes/note-title/` - note with markdown content
- Any other single content pages

## Deliverables

### 1. Create `layouts/_default/single.html`

Template extends baseof:
```html
{{ define "main" }}
<article class="single-post">
  <header class="post-header">
    <h1>{{ .Title }}</h1>

    <div class="post-meta">
      <time datetime="{{ .Date.Format "2006-01-02" }}">
        {{ .Date.Format "January 2, 2006" }}
      </time>

      {{ if .Params.label }}
        <span class="label label-{{ .Params.label }}">
          {{ .Params.label }}
        </span>
      {{ end }}

      {{ if .Params.featured }}
        <span class="badge-featured">Featured</span>
      {{ end }}
    </div>

    {{ if .Params.description }}
      <p class="post-description">{{ .Params.description }}</p>
    {{ end }}

    {{ if .Params.canonicalUrl }}
      <p class="canonical">
        Originally published at
        <a href="{{ .Params.canonicalUrl }}" rel="canonical">
          {{ .Params.canonicalUrl }}
        </a>
      </p>
    {{ end }}
  </header>

  <div class="post-content">
    {{ .Content }}
  </div>

  <footer class="post-footer">
    <!-- Optional: Back to list link -->
    <a href="{{ .Section | relURL }}">← Back to {{ .Section }}</a>
  </footer>
</article>
{{ end }}
```

### 2. Content Rendering

Hugo renders `.Content` with:
- **Goldmark** markdown processor (configured in hugo.toml)
- **Chroma** syntax highlighting (configured in hugo.toml)
- Automatic code block highlighting

Ensure code blocks render properly:
```markdown
```javascript
const foo = 'bar';
```
```

### 3. Metadata Display

Show all relevant metadata:
- **Title**: H1 heading
- **Date**: Formatted, semantic `<time>` element
- **Label**: Styled badge/chip
- **Featured badge**: If applicable
- **Description**: Lead paragraph if present
- **Canonical URL**: Link to original if cross-posted

### 4. Typography and Spacing

Apply CSS for readability:
- Comfortable line height
- Appropriate font size
- Proper heading hierarchy
- Code block styling
- Image styling
- Link styling

## Context
- Current Astro implementation: `src/layouts/BlogPost.astro`
- 23 blog posts with various frontmatter
- Some have images, code blocks, links
- Some have canonical URLs (cross-posted content)
- Labels: twitter, github, npm, dev.to, medium, youtube, podcast, deprecated, archived, thoughts

## Acceptance Criteria
- [ ] `layouts/_default/single.html` created
- [ ] Template extends baseof (`{{ define "main" }}`)
- [ ] Displays title, date, metadata
- [ ] Renders markdown content (`.Content`)
- [ ] Shows label with appropriate styling
- [ ] Shows featured badge if applicable
- [ ] Shows description if present
- [ ] Shows canonical URL if present
- [ ] Code blocks render with syntax highlighting
- [ ] Images render properly
- [ ] Links work correctly
- [ ] Back to list link included
- [ ] Typography is legible and minimal
- [ ] Renders without errors

## Notes
- Syntax highlighting configured in hugo.toml (TASK-1)
- CSS for code blocks in TASK-7
- Test with blog post that has code blocks
- Ensure responsive images
- Keep design minimal - content is focus
