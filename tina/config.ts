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
  build: { outputFolder: "admin", publicFolder: "public" },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || "",
      stopwordLanguages: ["eng"],
      fuzzyEnabled: true,
      fuzzyOptions: { maxDistance: 2, minSimilarity: 0.6, maxTermExpansions: 10, useTranspositions: true },
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
          { type: "string", label: "Title", name: "title", isTitle: true, required: true },
          { type: "string", label: "Slug", name: "slug", description: "URL slug for the article." },
          { type: "string", label: "Meta description", name: "metaDescription", description: "Used for search, excerpts, and Open Graph descriptions." },
          { type: "string", label: "Featured image", name: "featuredImage", description: "Used as the article and Open Graph image." },
          { type: "reference", label: "Author", name: "author", collections: ["authors"], required: true },
          { type: "string", label: "Categories", name: "categories", list: true, description: "Broad categories for the article." },
          { type: "string", label: "Tags", name: "tags", list: true, description: "Specific topics, entities, or keywords associated with the article." },
          { type: "datetime", label: "Publication date", name: "pubDate", required: true, dateFormat: "MMMM DD YYYY", timeFormat: "hh:mm A" },
          { type: "datetime", label: "Updated date", name: "updatedDate", dateFormat: "MMMM DD YYYY", timeFormat: "hh:mm A" },
          { type: "rich-text", label: "Content", name: "body", isBody: true },
        ],
      },
      {
        label: "Authors",
        name: "authors",
        path: "src/content/authors",
        format: "md",
        fields: [
          { type: "string", label: "Username", name: "username", isTitle: true, required: true },
          { type: "string", label: "Name", name: "name", required: true },
          { type: "string", label: "Bio", name: "bio" },
          { type: "string", label: "Profile image", name: "profileImage" },
          { type: "string", label: "Website", name: "website" },
          { type: "string", label: "Social links", name: "socialLinks", list: true },
        ],
      },
      {
        label: "Pages",
        name: "pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          { type: "string", label: "Title", name: "title", isTitle: true, required: true },
          { type: "string", label: "Description", name: "description", required: true, description: "Short description used for search engines and social sharing." },
          { type: "string", label: "SEO title", name: "seoTitle", description: "Optional SEO title. Leave empty to use the page title." },
          { type: "string", label: "SEO description", name: "seoDescription", description: "Optional SEO description. Leave empty to use the page description." },
          { type: "boolean", label: "No index", name: "noIndex", description: "Prevent search engines from indexing this page." },
          { type: "rich-text", label: "Content", name: "body", isBody: true },
        ],
      },
    ],
  },
});

// TinaCloud branch registration marker: keep production branch on main.
