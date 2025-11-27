# TASK-10: RSS Feed and Sitemap Configuration

## Objective
Configure Hugo to generate RSS feeds and sitemap automatically for the site.

## Requirements
- RSS feed for blog posts
- Optional: Separate feeds for notes, talks, work
- Sitemap auto-generated for all pages
- Proper metadata in feeds
- Standard RSS 2.0 format
- Include relevant fields (title, description, date, link)

## Hugo Built-in Features

Hugo automatically generates:
- **RSS feeds**: At section level and site level
- **Sitemap**: For all pages

Just need to configure properly in `hugo.toml`.

## Deliverables

### 1. RSS Configuration in `hugo.toml`

Add to existing config (TASK-1):
```toml
# RSS Feed
[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML", "RSS"]

[outputFormats.RSS]
  mediatype = "application/rss+xml"
  baseName = "feed"  # Generates feed.xml instead of index.xml

# RSS Settings
[params]
  description = "Your site description"
  author = "Your Name"

# Number of items in RSS feed
rssLimit = 20
```

### 2. RSS Feeds Generated

Hugo will create:
- `/feed.xml` - Full site feed (all content)
- `/blog/feed.xml` - Blog posts only
- `/notes/feed.xml` - Notes only
- `/talks/feed.xml` - Talks only
- `/work/feed.xml` - Work items only

### 3. Custom RSS Template (Optional)

If default RSS template doesn't include all fields, create `layouts/_default/rss.xml`:

```xml
{{- printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ .Title }}</title>
    <link>{{ .Permalink }}</link>
    <description>{{ .Site.Params.description }}</description>
    <language>{{ .Site.LanguageCode }}</language>
    <lastBuildDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" }}</lastBuildDate>
    <atom:link href="{{ .Permalink }}" rel="self" type="application/rss+xml" />
    {{ range first .Site.Config.Services.RSS.Limit .Pages }}
    <item>
      <title>{{ .Title }}</title>
      <link>{{ .Permalink }}</link>
      <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" }}</pubDate>
      <guid>{{ .Permalink }}</guid>
      <description>{{ .Description | default .Summary | html }}</description>
      {{ if .Params.label }}
      <category>{{ .Params.label }}</category>
      {{ end }}
    </item>
    {{ end }}
  </channel>
</rss>
```

### 4. Sitemap Configuration

Hugo generates sitemap automatically. Configure in `hugo.toml`:

```toml
# Sitemap
[sitemap]
  changefreq = "monthly"
  filename = "sitemap.xml"
  priority = 0.5
```

Customize per page type if needed:
```toml
[sitemap]
  changefreq = "monthly"
  filename = "sitemap.xml"
  priority = 0.5

# Override for specific sections
[[params.sitemap.sections]]
  section = "blog"
  changefreq = "weekly"
  priority = 0.8
```

### 5. Add RSS Link to Base Template

In `layouts/_default/baseof.html` `<head>`:
```html
{{ range .AlternativeOutputFormats -}}
  <link rel="{{ .Rel }}" type="{{ .MediaType.Type }}" href="{{ .Permalink }}" title="{{ $.Site.Title }}">
{{ end }}
```

Or specifically for RSS:
```html
<link rel="alternate" type="application/rss+xml" href="{{ .Site.BaseURL }}feed.xml" title="{{ .Site.Title }}">
```

### 6. RSS Feed Metadata

Ensure pages have proper metadata for RSS:
- `title` - Used in feed
- `date` - Used for pubDate
- `description` or summary - Used for feed description
- `params.label` - Can be used as category

### 7. External Content Handling

For external content (`external: true`):
- Include in RSS feed
- Link should point to external URL, not site URL

In custom RSS template:
```xml
<link>
  {{ if .Params.external }}
    {{ .Params.url }}
  {{ else }}
    {{ .Permalink }}
  {{ end }}
</link>
```

## Testing Checklist

1. **RSS Feeds Exist**:
   - `/feed.xml` exists
   - `/blog/feed.xml` exists
   - Contains recent posts

2. **RSS Content**:
   - Title, link, description present
   - Date formatted correctly
   - Links work (internal and external)
   - Description includes summary or description field

3. **RSS Validation**:
   - Validate feed at https://validator.w3.org/feed/
   - Check RSS 2.0 compliance

4. **Sitemap**:
   - `/sitemap.xml` exists
   - Contains all pages
   - Priority and changefreq set

5. **Feed Discovery**:
   - RSS link in `<head>` of pages
   - Browsers can auto-detect feed

## Context
- Related to TASK-1 (hugo.toml configuration)
- Related to TASK-3 (baseof.html for RSS link)
- Current Astro site likely has RSS feed
- Check existing feed structure for reference

## Acceptance Criteria
- [ ] RSS configuration added to `hugo.toml`
- [ ] Output formats include RSS for home and sections
- [ ] RSS limit set (e.g., 20 items)
- [ ] Sitemap configuration added
- [ ] Custom RSS template created (if needed)
- [ ] RSS link added to baseof.html `<head>`
- [ ] `/feed.xml` generates successfully
- [ ] Section feeds generate (`/blog/feed.xml`, etc.)
- [ ] `/sitemap.xml` generates successfully
- [ ] RSS feeds include title, link, date, description
- [ ] External content links to external URL in feed
- [ ] RSS feed validates
- [ ] Feed discoverable by browsers/readers

## Notes
- Hugo's default RSS template is usually sufficient
- Custom template needed if you want specific fields (labels, etc.)
- Test RSS feed in feed reader (Feedly, etc.)
- Sitemap automatically submitted to search engines (or submit manually)
- Consider excluding drafts from RSS: Hugo does this by default
