---
title: How I Set Up Cloudinary Image Hosting for TinaCMS
slug: cloudinary-image-hosting-tinacms
metaDescription: 'A simple guide to connecting Cloudinary with TinaCMS on an Astro website, including the API setup, Cloudflare environment variables and routing fix.'
featuredImage: 'https://res.cloudinary.com/h2xupm4j/image/upload/v1794319863/cld-sample-3.jpg'
author: hanif
categories:
  - Web Development
tags:
  - Cloudinary
  - TinaCMS
  - Astro
  - Cloudflare
  - Image Hosting
pubDate: 2026-11-10T00:00:00.000Z
updatedDate: 2026-11-10T00:00:00.000Z
---

I wanted to improve how images are managed on **bukunota.my** without adding unnecessary weight to the website. Since the site is built with **Astro and TinaCMS**, I decided to use **Cloudinary** as the image hosting platform.

The idea is simple. Instead of storing uploaded images directly in the website repository, TinaCMS sends them to Cloudinary. The website then uses the Cloudinary image URL when displaying the image.

The setup sounds straightforward, but connecting **TinaCMS with Cloudinary on Astro** required some additional work.

The main challenge was that TinaCMS needs a media provider that can communicate with a backend API. Cloudinary also requires its API credentials to remain private, so the Cloudinary API secret cannot be exposed in the browser.

I created a custom media integration that connects TinaCMS to an **Astro API endpoint**. The endpoint handles image uploads and communicates with Cloudinary securely. The Cloudinary credentials are stored as environment variables on the Cloudflare deployment instead of inside the website code.

There was also a routing issue during the first implementation. The upload and media listing functions worked, but the delete function could not correctly identify the image because the Astro API route was not configured as a dynamic route. This caused TinaCMS to display a generic **"Error fetching media"** message.

The fix was to move the delete function into a dynamic Astro route while keeping the existing media API intact.

After redeploying the site, TinaCMS was able to connect to Cloudinary successfully. Images can now be uploaded through the familiar TinaCMS interface while the actual files are stored on Cloudinary.

For a small website like bukunota.my, this creates a cleaner **image hosting workflow** without requiring me to manually manage image files inside GitHub. More importantly, the public website does not need to change its existing design or content workflow.
