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
            label: "Description",
            name: "description",
            required: true,
            description: "Short search and social description. Aim for a clear, useful summary.",
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
            description: "Optional SEO description. Leave empty to use the article description.",
          },
          {
            type: "boolean",
            label: "No index",
            name: "noIndex",
            description: "Prevent search engines from indexing this article.",
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
            label: "Hero image",
            name: "heroImage",
            description: "Path or URL for the article hero image.",
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
