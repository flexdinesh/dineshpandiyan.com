import { z } from "zod";

export const label = z.optional(
  z.enum([
    "twitter",
    "github",
    "npm",
    "dev.to",
    "medium",
    "youtube",
    "podcast",
    "deprecated",
    "archived",
  ])
);

const baseSchema = z.object({
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  label,
});

/*
  Blog posts could be of two types —
  1. The posts you write in markdown files in content/blog/*.md
  2. External posts in other websites

  That's why we the frontmatter schema for blog posts is one of the two possible types.
  If you don't want to link posts written in external websites, you could
  just export blogMarkdown as your blog schema.
*/
export const blog = z.discriminatedUnion("external", [
  // markdown
  baseSchema.extend({
    external: z.literal(false),
    description: z.optional(z.string()),
    ogImagePath: z.optional(z.string()),
    canonicalUrl: z.optional(z.string()),
  }),
  // external link
  baseSchema.extend({
    external: z.literal(true),
    url: z.string({
      required_error:
        "external is true but url is missing. url must be set for posts marked as external.",
      invalid_type_error: "external should be string.",
    }),
  }),
]);

export const work = baseSchema.extend({
  external: z.literal(true).default(true),
  url: z.string(),
});

export const notes = z.discriminatedUnion("external", [
  // markdown
  baseSchema.extend({
    external: z.literal(false),
  }),
  // external link
  baseSchema.extend({
    external: z.literal(true),
    url: z.string({
      required_error:
        "external is true but url is missing. url must be set for notes marked as external.",
      invalid_type_error: "external should be string.",
    }),
  }),
]);

export const talk = z.discriminatedUnion("external", [
  // markdown
  baseSchema.extend({
    external: z.literal(false),
  }),
  // external link
  baseSchema.extend({
    external: z.literal(true),
    url: z.string({
      required_error:
        "external is true but url is missing. url must be set for talks marked as external.",
      invalid_type_error: "external should be string.",
    }),
  }),
]);
