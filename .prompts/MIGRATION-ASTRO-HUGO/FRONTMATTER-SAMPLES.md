# Frontmatter Migration Samples

## Sample 1: Internal Blog Post (Full Content)

### Before (Astro)
```yaml
---
featured: true
external: false
title: Hot Swapping Nuphy Switches with Gateron Blue Switches
description: I swapped the NuPhy Gateron Lemon switches in my NuPhy Halo75 v2 keyboard with Gateron G Pro 2.0 Blue switches
date: 2025-04-22
ogImagePath: /images/blog/nuphy-switches/1.jpeg
---
```

### After (Hugo)
```yaml
---
title: Hot Swapping Nuphy Switches with Gateron Blue Switches
date: 2025-04-22
description: I swapped the NuPhy Gateron Lemon switches in my NuPhy Halo75 v2 keyboard with Gateron G Pro 2.0 Blue switches
params:
  featured: true
  external: false
  ogImagePath: /images/blog/nuphy-switches/1.jpeg
---
```

## Sample 2: External Blog Post (Link Only)

### Before (Astro)
```yaml
---
external: true
label: deprecated
url: https://dev.to/flexdinesh/react-hooks-test-custom-hooks-with-enzyme-40ib
title: "React Hooks: Test custom hooks with Enzyme"
date: 2019-03-23
---
```

### After (Hugo)
```yaml
---
title: "React Hooks: Test custom hooks with Enzyme"
date: 2019-03-23
params:
  external: true
  label: deprecated
  url: https://dev.to/flexdinesh/react-hooks-test-custom-hooks-with-enzyme-40ib
---
```

## Sample 3: Featured External Note

### Before (Astro)
```yaml
---
featured: true
external: true
label: twitter
title: "Tailwind is all you need to build modern web applications"
date: 2022-09-12
url: https://twitter.com/flexdinesh/status/1569111431488086017
---
```

### After (Hugo)
```yaml
---
title: "Tailwind is all you need to build modern web applications"
date: 2022-09-12
params:
  featured: true
  external: true
  label: twitter
  url: https://twitter.com/flexdinesh/status/1569111431488086017
---
```

## Sample 4: Internal Talk

### Before (Astro)
```yaml
---
external: false
title: "React Sydney: Progressive SSR and progressive hydration with React"
date: 2020-03-02
---
```

### After (Hugo)
```yaml
---
title: "React Sydney: Progressive SSR and progressive hydration with React"
date: 2020-03-02
params:
  external: false
---
```

## Sample 5: Work Item (External)

### Before (Astro)
```yaml
---
label: github
title: "typy"
date: 2018-04-04
url: https://github.com/flexdinesh/typy
---
```

### After (Hugo)
```yaml
---
title: "typy"
date: 2018-04-04
params:
  label: github
  url: https://github.com/flexdinesh/typy
---
```

## Sample 6: Draft Work Item

### Before (Astro)
```yaml
---
draft: true
title: DRAFT Code cheatsheet
date: 2022-10-09
url: https://github.com/flexdinesh/code-cheatsheet
---
```

### After (Hugo)
```yaml
---
title: DRAFT Code cheatsheet
date: 2022-10-09
draft: true
params:
  url: https://github.com/flexdinesh/code-cheatsheet
---
```

## Migration Pattern Summary

**Top-level (Hugo reserved):**
- `title`
- `date`
- `draft` (if present)
- `description` (if present)

**Under params:**
- `featured`
- `external`
- `label`
- `ogImagePath`
- `url`
- Any future custom fields

## Template Usage Examples

### List Template (blog index)
```go-html-template
{{ range .Pages }}
  <article>
    <h2>
      {{ if .Params.external }}
        <a href="{{ .Params.url }}" target="_blank">{{ .Title }}</a>
      {{ else }}
        <a href="{{ .RelPermalink }}">{{ .Title }}</a>
      {{ end }}
    </h2>
    <time>{{ .Date.Format "2006-01-02" }}</time>
    {{ with .Description }}
      <p>{{ . }}</p>
    {{ end }}
    {{ if .Params.featured }}
      <span class="badge">Featured</span>
    {{ end }}
    {{ with .Params.label }}
      <span class="label">{{ . }}</span>
    {{ end }}
  </article>
{{ end }}
```

### Single Template (blog post)
```go-html-template
<article>
  <header>
    <h1>{{ .Title }}</h1>
    <time>{{ .Date.Format "January 2, 2006" }}</time>
    {{ with .Params.label }}
      <span class="label">{{ . }}</span>
    {{ end }}
  </header>

  {{ with .Params.ogImagePath }}
    <meta property="og:image" content="{{ . | absURL }}" />
  {{ end }}

  {{ .Content }}
</article>
```

### Home Page (featured items)
```go-html-template
<section>
  <h2>Featured</h2>
  {{ range where .Site.RegularPages "Params.featured" true }}
    <article>
      <h3>
        {{ if .Params.external }}
          <a href="{{ .Params.url }}">{{ .Title }}</a>
        {{ else }}
          <a href="{{ .RelPermalink }}">{{ .Title }}</a>
        {{ end }}
      </h3>
    </article>
  {{ end }}
</section>
```
