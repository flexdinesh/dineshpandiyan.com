# TASK-2: Content Frontmatter Analysis and Migration Strategy

## Objective
Analyze existing content frontmatter and create migration strategy for Hugo compatibility.

## Requirements
- Understand current frontmatter schema across all content types
- Identify Hugo compatibility issues
- Create mapping strategy for custom fields
- Document frontmatter updates needed

## Current Content Types
Based on exploration:
1. **Blog posts** (23 files in `content/blog/`)
2. **Notes** (7 files in `content/notes/`)
3. **Talks** (5 files in `content/talks/`)
4. **Work** (8 files in `content/work/`)

## Existing Frontmatter Fields

### Common Fields
- `title` (string, required)
- `date` (YYYY-MM-DD format, required)
- `draft` (boolean, default: false)
- `featured` (boolean, default: false)
- `label` (enum: twitter, github, npm, dev.to, medium, youtube, podcast, deprecated, archived, thoughts)

### Blog-Specific
- `external` (boolean - false for markdown, true for external links)
- `description` (optional string)
- `ogImagePath` (optional string, for open graph)
- `canonicalUrl` (optional string)
- `url` (required if external: true)

### Notes/Talks/Work
- `external` (boolean)
- `url` (required if external: true)

## Tasks

### 1. Verify Hugo Reserved Fields
Check which fields are Hugo-reserved:
- `title` ✓ (reserved)
- `date` ✓ (reserved)
- `draft` ✓ (reserved)
- Others need to be under `params:`

### 2. Create Migration Mapping

Document field mappings:
```yaml
# Hugo-compatible frontmatter structure
---
title: "Post Title"           # reserved, keep top-level
date: 2025-04-22              # reserved, keep top-level
draft: false                  # reserved, keep top-level

# Custom fields under params
params:
  featured: true
  external: false
  label: "twitter"
  description: "Post description"
  ogImagePath: "/images/blog/post.jpg"
  canonicalUrl: "https://example.com"
  url: "https://external.com"  # for external links
---
```

### 3. Sample Content Files
Read and analyze 2-3 files from each content type:
- 1 internal blog post
- 1 external blog post
- 1 note (internal vs external)
- 1 talk
- 1 work item

### 4. Create Migration Script (Optional)
If many files need updates, create simple script to:
- Move custom fields under `params:`
- Keep Hugo reserved fields top-level
- Preserve all content

## Deliverables

### 1. Documentation: `FRONTMATTER-MAPPING.md`
Create file documenting:
- Current frontmatter structure
- Hugo-compatible structure
- Field-by-field mapping
- Example before/after

### 2. Migration Plan
Document approach:
- Which files need updates
- Automated vs manual migration
- Testing strategy

### 3. Sample Migrated Files (if applicable)
If creating migration script, include samples of migrated frontmatter.

## Acceptance Criteria
- [ ] All content types analyzed
- [ ] Hugo reserved fields identified
- [ ] Custom field mapping documented
- [ ] `FRONTMATTER-MAPPING.md` created
- [ ] Migration approach decided (manual vs script)
- [ ] Sample migrated frontmatter validated

## Notes
- Hugo may accept some custom fields at top-level, but best practice is `params:`
- External link handling is critical - document clearly
- Consider backward compatibility if needed
