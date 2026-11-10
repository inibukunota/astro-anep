import { glob } from "astro/loaders";
import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";

const seoFields = {
  title: z.string(),
  description: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  noIndex: z.boolean().optional(),
};

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    metaDescription: z.string().optional(),
    featuredImage: z.string().optional(),
    author: reference("authors"),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.md" }),
  schema: z.object({
    username: z.string(),
    name: z.string(),
    bio: z.string().optional(),
    profileImage: z.string().optional(),
    website: z.string().optional(),
    socialLinks: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object(seoFields),
});

export const collections = { blog, authors, pages };
