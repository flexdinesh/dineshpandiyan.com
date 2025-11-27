# TASK-7: CSS Migration (OKLCH Variables and Base Styles)

## Objective
Migrate existing CSS variables and create minimal hand-rolled CSS for the Hugo site.

## Requirements
- Port OKLCH color variables from existing `theme.css`
- Implement light and dark theme styles
- Add minimal base typography and layout styles
- No CSS framework - hand-rolled only
- Keep it simple and maintainable
- Support syntax highlighting styles

## Current CSS Context
- Existing: `src/styles/theme.css` (OKLCH CSS variables)
- Existing: `src/styles/global.css` (Tailwind 4 imports)
- Theme classes: `.theme-sleek` and `.theme-sleek.dark`

## Deliverables

### 1. Create `assets/css/main.css`

Structure:
```css
/* CSS Variables - Light Theme */
.theme-sleek {
  /* Colors from existing theme.css */
}

/* CSS Variables - Dark Theme */
.theme-sleek.dark {
  /* Colors from existing theme.css */
}

/* Base Styles */
/* Reset and base elements */

/* Typography */
/* Headings, paragraphs, links */

/* Layout */
/* Container, spacing, grid/flex helpers */

/* Components */
/* Header, footer, nav, cards */

/* Code Blocks */
/* Syntax highlighting styles */

/* Utilities */
/* Helper classes */
```

### 2. Port CSS Variables

Copy from `src/styles/theme.css`:
- All `--color-*` variables
- Both `.theme-sleek` (light) and `.theme-sleek.dark` (dark) rules
- Preserve OKLCH color values exactly

Example:
```css
.theme-sleek {
  --color-primary-main: oklch(0.16 0 0);
  --color-text-body: oklch(0.16 0 0);
  --color-bg-body: oklch(1 0 0);
  /* ... all variables */
}

.theme-sleek.dark {
  --color-primary-main: oklch(0.92 0 0);
  --color-text-body: oklch(0.92 0 0);
  --color-bg-body: oklch(0.15 0 0);
  /* ... all variables */
}
```

### 3. Base Typography Styles

Minimal styles for readability:
```css
body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-body);
  background-color: var(--color-bg-body);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--color-text-heading);
  font-weight: 600;
  line-height: 1.3;
  margin: 1.5em 0 0.5em;
}

p {
  margin: 1em 0;
}

a {
  color: var(--color-text-link);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### 4. Layout Styles

Simple container and spacing:
```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

header, footer {
  padding: 2rem 0;
}

main {
  min-height: 60vh;
  padding: 2rem 0;
}
```

### 5. Code Block Styles

For syntax highlighting:
```css
pre {
  background-color: var(--color-bg-code);
  border: 1px solid var(--color-border-code);
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--color-text-code);
}

pre code {
  background: none;
  padding: 0;
}

/* Chroma syntax highlighting classes */
/* Hugo generates these automatically */
```

### 6. Component Styles

Minimal styles for:
- Header navigation
- Footer
- Post cards/list items
- Labels/badges
- Featured indicators
- Theme toggle button

### 7. Remove Tailwind Dependencies

- Don't use Tailwind classes in templates
- Hand-roll all CSS
- Keep specificity low
- Use CSS variables for theming

## Context
- Existing CSS: `src/styles/theme.css` and `src/styles/global.css`
- Currently using Tailwind v4 - migrating away
- OKLCH colors already defined - preserve them
- Theme toggle handled in TASK-3 (baseof.html)

## Acceptance Criteria
- [ ] `assets/css/main.css` created
- [ ] All CSS variables ported from `theme.css`
- [ ] Light theme styles (`.theme-sleek`)
- [ ] Dark theme styles (`.theme-sleek.dark`)
- [ ] Base typography styles
- [ ] Layout styles (container, spacing)
- [ ] Code block styles
- [ ] Component styles (header, footer, nav, cards)
- [ ] Label/badge styles
- [ ] Theme toggle button styles
- [ ] No Tailwind classes used
- [ ] Site renders with proper styling
- [ ] Theme switching works
- [ ] Syntax highlighting styled

## Notes
- Reference existing `theme.css` for color values
- Keep styles minimal - don't over-design
- Test in both light and dark modes
- Ensure legible spacing per requirements
- Hugo's Chroma generates syntax highlighting classes automatically
- Consider responsive design (mobile-friendly)
