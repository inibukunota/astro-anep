---
title: 'Building a Headless CMS Shouldn’t Be This Hard, But Here We Are'
slug: how-one-trailing-slash-saved-my-tinacms-setup
metaDescription: 'Trying to build a standalone TinaCMS for Motomento, with the CMS running separately from the public website before connecting the two.'
author: src/content/authors/hanif.md
tags:
  - ''
pubDate: 2026-11-12T15:06:00.845Z
updatedDate: 2026-11-12T15:06:13.360Z
---

Today I started trying to build a separate CMS for Motomento.

The plan is to have two separate parts:

```text
cms.motomento.com → Content management
motomento.com     → Public website
```

The CMS will be used to create and manage content, while the actual website will display that content.

The first challenge was getting the CMS to open cleanly at `cms.motomento.com`. TinaCMS normally uses an `/admin` area, but I wanted the CMS to feel like a proper standalone system without requiring users to type `/admin`.

I ran into several problems, including the CMS repeatedly redirecting itself and showing broken URLs. There was also an issue with TinaCMS not recognising its login credentials.

After investigating, I found that the CMS needs to keep its internal `/admin` area, but users can still access it through the main CMS address. I also removed unnecessary preview settings because the CMS itself is not the public website.

The next step is **not finished yet**.

Once this standalone CMS is working properly, the second part of the project will be to connect it to the actual Motomento website.

The bigger goal is:

```text
Write content in TinaCMS
        ↓
Save content to GitHub
        ↓
Motomento website reads the content
        ↓
Content appears on motomento.com
```

So today's work is only **Part 1: getting the CMS running**.

**Part 2 will be connecting the CMS to the target website.**
