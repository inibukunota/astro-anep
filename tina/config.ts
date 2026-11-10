import { defineConfig } from "tinacms";

const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.GITHUB_REF_NAME ||
  process.env.GITHUB_HEAD_REF ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "design/homepage-schema";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || "",
      stopwordLanguages: ["eng"],
      fuzzyEnabled: true,
      fuzzyOptions: {
        maxDistance: 2,
        minSimilarity: 0.6,
        maxTermExpansions: 10,
        useTranspositions: true,
      },
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  schema: {
    collections: [
      {
        label: "Blog",
        name: "blog",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Slug",
            name: "slug",
            description: "URL slug for the article. Leave empty to use the filename as the slug.",
          },
          {
            type: "string",
            label: "Meta description",
            name: "metaDescription",
            description: "Used as the search description, article excerpt, and Open Graph description.",
          },
          {
            type: "string",
            label: "Featured image",
            name: "featuredImage",
            description: "Path or URL for the article's featured image. Used for the article image and Open Graph image.",
          },
          {
            type: "string",
            label: "Author",
            name: "author",
            description: "Article author name.",
          },
          {
            type: "string",
            label: "Categories",
            name: "categories",
            list: true,
            description: "Broad categories for the article.",
          },
          {
            type: "string",
            label: "Tags",
            name: "tags",
            list: true,
            description: "Specific topics, entities, or keywords associated with the article.",
          },
          {
            type: "datetime",
            label: "Publication date",
            name: "pubDate",
            required: true,
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
          },
          {
            type: "datetime",
            label: "Updated date",
            name: "updatedDate",
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
          },
          {
            type: "string",
            label: "Description (legacy)",
            name: "description",
            description: "Legacy field kept for existing posts. New posts should use Meta description.",
            ui: {
              component: "hidden",
            },
          },
          {
            type: "string",
            label: "Hero image (legacy)",
            name: "heroImage",
            description: "Legacy field kept for existing posts. New posts should use Featured image.",
            ui: {
              component: "hidden",
            },
          },
          {
            type: "string",
            label: "SEO title",
            name: "seoTitle",
            description: "Optional SEO title. Leave empty to use the article title.",
          },
          {
            type: "string",
            label: "SEO description",
            name: "seoDescription",
            description: "Legacy SEO description. Open Graph metadata now uses Meta description.",
          },
          {
            type: "boolean",
            label: "No index",
            name: "noIndex",
            description: "Prevent search engines from indexing this article.",
          },
          {
            type: "rich-text",
            label: "Content",
            name: "body",
            isBody: true,
          },
        ],
      },
      {
        label: "Pages",
        name: "pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            required: true,
            description: "Short description used for search engines and social sharing.",
          },
          {
            type: "string",
            label: "SEO title",
            name: "seoTitle",
            description: "Optional SEO title. Leave empty to use the page title.",
          },
          {
            type: "string",
            label: "SEO description",
            name: "seoDescription",
            description: "Optional SEO description. Leave empty to use the page description.",
          },
          {
            type: "boolean",
            label: "No index",
            name: "noIndex",
            description: "Prevent search engines from indexing this page.",
          },
          {
            type: "rich-text",
            label: "Content",
            name: "body",
            isBody: true,
          },
        ],
      },
    ],
  },
});

// TinaCloud branch registration marker: keep production branch on main.
