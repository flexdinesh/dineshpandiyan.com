# Hugo Frontmatter Migration Mapping

## Overview
Migration guide for converting Astro frontmatter to Hugo-compatible format. All custom fields must move under `params:` to avoid conflicts with Hugo reserved fields.

## Hugo Reserved Fields
Per Hugo docs, these fields are reserved and cannot be used as custom fields:
- `aliases`, `build`, `cascade`, `date`, `description`, `draft`, `expiryDate`, `headless`, `isCJKLanguage`, `keywords`, `lastmod`, `layout`, `linkTitle`, `markup`, `menus`, `modified`, `outputs`, `params`, `pubdate`, `publishDate`, `published`, `resources`, `sitemap`, `slug`, `summary`, `title`, `translationKey`, `type`, `unpublishdate`, `url`, `weight`

## Current Content Analysis

### Content Types
- **Blog posts**: 23 files (internal markdown + external links)
- **Notes**: 7 files (internal markdown + external links)
- **Talks**: 7 files (internal markdown + external links)
- **Work**: 9 files (all external links, 1 draft)

### Current Field Usage

**Blog Posts (Internal)**
```yaml
featured: true
external: false
title: "Post Title"
description: "Post description"
date: 2025-04-22
ogImagePath: /images/blog/post.jpg
```

**Blog Posts (External)**
```yaml
external: true
label: deprecated
url: https://example.com
title: "Post Title"
date: 2019-03-23
```

**Notes/Talks/Work (External)**
```yaml
featured: true
external: true
label: github
title: "Title"
date: 2022-07-15
url: https://github.com/user/repo
```

**Talks (Internal)**
```yaml
external: false
title: "Talk Title"
date: 2020-03-02
```

**Work (Draft)**
```yaml
draft: true
title: "Title"
date: 2022-10-09
url: https://github.com/user/repo
```

### Field Summary
**Hugo Reserved (keep top-level):**
- `title` - required
- `date` - required
- `draft` - optional, Hugo reserved
- `description` - optional, Hugo reserved

**Hugo Reserved (special handling):**
- `url` - Hugo reserved for URL overrides, but we use it for external links

**Custom (move to params):**
- `featured` - boolean
- `external` - boolean
- `label` - enum (twitter, github, npm, dev.to, medium, youtube, podcast, deprecated, archived, thoughts)
- `ogImagePath` - string

**Not found in current content:**
- `canonicalUrl` - mentioned in task spec but not used

**Important:** Since `url` is Hugo reserved, external links should use `params.url` to avoid conflicts with Hugo's URL management.

## Migration Mapping

### Before (Current Astro)
```yaml
---
featured: true
external: false
title: "Post Title"
description: "Post description"
date: 2025-04-22
ogImagePath: /images/blog/post.jpg
---
```

### After (Hugo Compatible)
```yaml
---
title: "Post Title"
date: 2025-04-22
description: "Post description"
params:
  featured: true
  external: false
  ogImagePath: /images/blog/post.jpg
---
```

### External Link Example

**Before:**
```yaml
---
featured: true
external: true
label: github
title: "Title"
date: 2022-07-15
url: https://github.com/user/repo
---
```

**After:**
```yaml
---
title: "Title"
date: 2022-07-15
params:
  featured: true
  external: true
  label: github
  url: https://github.com/user/repo
---
```

## Field-by-Field Migration

| Current Field | Hugo Location | Notes |
|--------------|---------------|-------|
| `title` | Top-level (reserved) | No change |
| `date` | Top-level (reserved) | No change |
| `draft` | Top-level (reserved) | No change |
| `description` | Top-level (reserved) | No change (optional) |
| `featured` | `params.featured` | Custom field |
| `external` | `params.external` | Custom field |
| `label` | `params.label` | Custom field |
| `ogImagePath` | `params.ogImagePath` | Custom field |
| `url` | `params.url` | Hugo reserved but used for external links |
| `canonicalUrl` | `params.canonicalUrl` | Custom field (not currently used) |

## Migration Approach

### Manual Migration Required
All 46 content files need frontmatter updates. Distribution:
- 23 blog posts
- 7 notes
- 7 talks
- 9 work items

### Why Manual Over Automated
1. **Small count**: 46 files manageable manually
2. **Variety**: Files have different field combinations
3. **Verification**: Manual review ensures correctness
4. **Simple pattern**: Just move custom fields under `params:`

### Migration Steps
1. For each file, identify Hugo reserved vs custom fields
2. Keep `title`, `date`, `draft`, `description` at top level
3. Move all other fields under `params:` key
4. Preserve field order for consistency
5. Test file renders correctly

## Template Access

### Hugo Templates
Reserved fields: `.Title`, `.Date`, `.Draft`, `.Description`
Custom fields: `.Params.featured`, `.Params.external`, `.Params.label`, etc.

### External Link Handling
```go-html-template
{{ if .Params.external }}
  <a href="{{ .Params.url }}">{{ .Title }}</a>
{{ else }}
  <a href="{{ .RelPermalink }}">{{ .Title }}</a>
{{ end }}
```

## Testing Strategy
1. Migrate 1 file per content type
2. Test with `hugo server`
3. Verify template rendering
4. Check external link redirects
5. Verify featured items display
6. Migrate remaining files
7. Full site build test

## Notes
- Hugo accepts custom fields at top-level but best practice is `params:`
- External link handling critical for notes/talks/work
- `description` is Hugo reserved but optional - can stay top-level
- No backward compatibility needed (fresh migration)
