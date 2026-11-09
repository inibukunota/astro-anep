---
title: "Adding a Machine-Readable Layer"
description: "How BUKUNOTA added llms.txt and an AI catalog so machine readers and AI agents can discover the site's resources more easily."
pubDate: 2026-11-09
updatedDate: 2026-11-09
---

PageSpeed Insights flagged two new issues on BUKUNOTA: the site did not have a properly structured `llms.txt` file, and its `ai-catalog.json` endpoint was returning HTML instead of a valid JSON manifest.

Nothing was broken for a normal visitor. The pages still loaded, the sitemap worked, and the site's existing SEO metadata and structured data were in place. The warning was about something different: making the site easier for machines to understand and discover.

## Why add another layer?

The web is increasingly being read by more than search engine crawlers.

AI systems, autonomous agents and other machine readers need simple ways to understand what a website is, where its important resources are, and whether a published machine-readable document follows an expected format.

The `llms.txt` convention provides a small Markdown document for this purpose. It gives a machine reader a concise description of the site and links to useful resources.

The AI catalog serves a different purpose. The Agentic Resource Discovery specification defines a JSON manifest that can describe agentic resources such as MCP servers, agents and skills. BUKUNOTA does not currently publish any of those resources, but exposing a valid empty catalog establishes the correct machine-readable endpoint without inventing capabilities that do not exist.

This is not a replacement for conventional SEO. Canonical URLs, metadata, structured data, sitemaps and robots directives still serve their existing purposes. The machine-readable layer simply adds another way for automated systems to understand the site.

## How it was added

The first step was to create `/llms.txt` as a normal Markdown file.

It contains a short description of BUKUNOTA followed by links to the main pages and machine-readable resources:

- Home
- Blog
- About
- RSS
- Sitemap

The file starts with an H1 heading, which is one of the basic requirements checked by the PageSpeed audit.

The second step was to create `/ai-catalog.json` as valid JSON rather than allowing the request to fall through to Astro's HTML page.

The manifest follows the ARD 1.0 schema and identifies BUKUNOTA as the host. Its `entries` array is intentionally empty because there are currently no MCP servers, agents or skills to advertise.

The same manifest is also available at `/.well-known/ai-catalog.json`, the standard discovery location used by the specification.

## A small change with a bigger idea

The actual implementation is small. There is no new JavaScript, no database and no client-side code.

The interesting part is the separation of audiences.

The normal website is designed for people. The sitemap and structured data help search engines. The new `llms.txt` and AI catalog provide additional context for machine readers and agentic systems.

It is another example of treating a website as more than a collection of HTML pages. A good site should be understandable to the different systems that consume it, while keeping the human-facing experience simple.

For BUKUNOTA, the machine-readable layer is deliberately minimal. There is no reason to publish information that does not exist just to satisfy an audit. The goal is to make the site discoverable and interpretable, not to manufacture capabilities for the sake of a checklist.
