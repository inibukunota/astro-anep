import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const seoFields = {
  title: z.string(),
  description: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  noIndex: z.boolean().optional(),
};

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...seoFields,
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object(seoFields),
});

export const collections = { blog, pages };
