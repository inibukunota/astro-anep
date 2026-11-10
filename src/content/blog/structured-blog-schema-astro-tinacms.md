---
title: "Building a Structured Blog With Astro and TinaCMS"
slug: "structured-blog-schema-astro-tinacms"
metaDescription: "How Bukunota.my uses Astro, TinaCMS, structured content, SEO metadata, JSON-LD and RSS to build a scalable blog publishing workflow."
featuredImage: "/blog-placeholder-3.jpg"
author: "hanif"
categories:
  - Web Development
  - SEO
tags:
  - Astro
  - TinaCMS
  - SEO
  - Cloudflare
  - Blog Schema
  - Structured Data
pubDate: "Nov 10 2026"
---

## Building a Structured Blog With Astro and TinaCMS

Bukunota.my is being rebuilt around a structured content workflow using **Astro and TinaCMS**, with SEO and machine-readable content treated as part of the publishing system rather than added later.

The goal is simple: make every blog post easy to manage in TinaCMS while giving Astro everything it needs to generate consistent SEO metadata, social previews and structured data.

### A structured blog schema

The new TinaCMS blog model includes the core fields needed for publishing:

- Title
- Slug
- Meta description
- Featured image
- Author
- Categories
- Tags
- Published date
- Updated date
- Body content

The **meta description is also used as the excerpt**, keeping the editorial workflow simple and avoiding duplicate fields.

Authors are managed as a separate collection. This allows multiple writers to share a central author profile containing information such as name, username, biography and profile image.

### SEO and structured data

The existing SEO system has been aligned with the new content structure.

Open Graph data now uses the blog title, meta description and featured image, while the canonical URL is generated from the post slug.

The site also generates **BlogPosting JSON-LD** from the structured content, including the title, description, author, image, publication date and relevant taxonomy data.

This means editors only need to maintain the content once. Astro can then reuse that information across different parts of the site.

### Fixing the deployment workflow

The schema migration also exposed several deployment issues.

Existing posts initially referenced authors using a collection-prefixed path instead of the author entry ID. The references were corrected to use the author ID directly.

The RSS feed also needed to be updated because the new schema no longer exposed the fields expected by the existing feed configuration. The feed now explicitly maps each post's title, description, publication date and URL.

After these changes, the Cloudflare deployment completed successfully.

### The new publishing flow

The resulting architecture is:

**TinaCMS → Structured Blog Content → Astro Content Collections → SEO/OG/JSON-LD → RSS → Cloudflare**

This creates a cleaner foundation for Bukunota.my, while making future improvements to SEO, author pages, taxonomy, internal linking and automated publishing easier to implement.
