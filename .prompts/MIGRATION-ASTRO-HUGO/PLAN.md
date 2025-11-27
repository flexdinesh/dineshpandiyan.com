# Astro → Hugo Migration Plan

## Overview
Migrate from Astro + Tailwind to vanilla Hugo with hand-rolled CSS. No theme dependencies, minimal complexity, 10-year longevity focus.

## Independent Tasks Status

- [ ] **TASK-1**: Hugo installation and basic config setup
- [ ] **TASK-2**: Content frontmatter analysis and migration strategy
- [ ] **TASK-3**: Base template and HTML skeleton (baseof.html)
- [ ] **TASK-4**: List template for content indexes (list.html)
- [ ] **TASK-5**: Single page template for posts (single.html)
- [ ] **TASK-6**: Home page template (index.html)
- [ ] **TASK-7**: CSS migration (OKLCH variables and base styles)
- [ ] **TASK-8**: Theme toggle JavaScript implementation
- [ ] **TASK-9**: External link redirect handling
- [ ] **TASK-10**: RSS feed and sitemap configuration

## Dependencies
- TASK-1 must complete before all others (setup required)
- TASK-2 should complete early (informs template decisions)
- TASK-3 must complete before TASK-4, TASK-5, TASK-6 (templates extend baseof)
- TASK-7 and TASK-8 can run independently of templates
- TASK-9 depends on TASK-4 and TASK-5 (needs templates)
- TASK-10 depends on TASK-1 (config file)

## Parallel Execution Groups

**Group 1** (Sequential - Foundation):
1. TASK-1 (Hugo setup)
2. TASK-2 (Content analysis)

**Group 2** (After Group 1):
3. TASK-3 (Base template)

**Group 3** (Parallel - After TASK-3):
4. TASK-4 (List template)
5. TASK-5 (Single template)
6. TASK-6 (Home template)
7. TASK-7 (CSS migration)
8. TASK-8 (Theme toggle)
9. TASK-10 (RSS/sitemap config)

**Group 4** (After Group 3):
10. TASK-9 (External link handling - needs templates)

## Success Criteria
- All pages render statically
- Light/dark theme works
- Syntax highlighting functional
- RSS feed generates
- Sitemap auto-generates
- External links redirect properly
- Build output is fully static in public/
