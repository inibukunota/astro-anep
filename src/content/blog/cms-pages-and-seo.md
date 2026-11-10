---
title: "CMS, Pages and SEO"
slug: "cms-pages-and-seo"
metaDescription: "Expanding the site with a cleaner CMS structure, standalone pages, SEO controls and connected structured data."
featuredImage: ""
author: "authors/hanif"
categories: []
tags: []
pubDate: 2026-11-09T10:00:00+08:00
updatedDate: 2026-11-09T10:30:00+08:00
---

The site structure was expanded beyond the initial TinaCMS blog setup.

The TinaCMS collection previously labelled “Notes” has been renamed to **Blog**, while keeping the existing `src/content/blog/` structure intact. A separate **Pages** collection was also added for standalone pages such as About, Contact and future static content. The About page has been moved into the CMS and is now rendered through a dynamic Astro route.

SEO work was also added across the site. Blog posts and pages now support optional SEO titles, SEO descriptions and `noindex` controls. The site generates canonical URLs, robots directives, Open Graph metadata, Twitter cards and article publication/update dates.

Structured data was expanded into a connected JSON-LD graph covering the site owner, website, webpages, profile pages, blog posts, breadcrumbs and blog listings. The blog archive now uses `CollectionPage` and `ItemList`, while individual articles use `BlogPosting`.

The goal is to establish a clean separation between editorial content and standalone pages while giving every page a consistent SEO foundation.

Next: verify the production build and publishing workflow, then move on to the site's visual layout and finalise the 1000px page width and reading-width system.
