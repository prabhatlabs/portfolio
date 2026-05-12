# MDX Blog Implementation Plan

## Overview

A GitHub-hosted MDX blog integrated into a Next.js portfolio site. Posts are fetched on-demand from GitHub using the Contents API, rendered server-side with `next-mdx-remote`, and cached via ISR — giving the speed of static with the flexibility of dynamic publishing.

---

## Architecture at a Glance

```
GitHub Repo (blogs/)
      ↓  GitHub Contents API (server-side, with token)
Next.js App Router
      ↓  next-mdx-remote (MDX → HTML)
ISR Cache (revalidate every N hours)
      ↓
User Browser (SEO-ready HTML)
```

---

## Repository Structure

### Blog Content Repo (can be same or separate from portfolio)

```
blogs/
├── getting-started-with-react.mdx
├── understanding-typescript-generics.mdx
├── my-dev-setup-2025.mdx
└── ...
```

### Each MDX File Structure

```mdx
---
title: "Getting Started with React"
date: "2025-05-01"
description: "A beginner's guide to React fundamentals."
tags: ["react", "javascript", "frontend"]
coverImage: "/images/react-cover.png"   # optional
published: true
---

# Getting Started with React

Your blog content goes here...
```

- **Filename = slug** (e.g., `getting-started-with-react.mdx` → `/blog/getting-started-with-react`)
- `published: false` = draft, skip from listing
- All frontmatter fields drive SEO metadata automatically

---

## Next.js Project Structure

```
my-portfolio/
├── app/
│   ├── blog/
│   │   ├── page.tsx              ← Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          ← Individual blog post page
├── lib/
│   └── github.ts                 ← GitHub API fetch utilities
├── components/
│   └── blog/
│       ├── BlogCard.tsx          ← Card for listing page
│       ├── BlogPost.tsx          ← Post layout + MDX renderer
│       └── MDXComponents.tsx     ← Custom MDX component overrides
└── .env.local
    └── GITHUB_TOKEN=...
    └── GITHUB_REPO=username/blog-repo
    └── GITHUB_BRANCH=main
```

---

## Implementation Steps

### Step 1 — GitHub Contents API Utility (`lib/github.ts`)

Create a utility module with two functions:

**`getAllPosts()`**
- Calls GitHub Contents API to list all files in `blogs/` directory
- Fetches each file's content (base64 decoded)
- Parses frontmatter from each file
- Filters out `published: false` drafts
- Returns sorted array of post metadata (title, slug, date, description, tags)
- This is used by the blog listing page

**`getPostBySlug(slug)`**
- Constructs the filename: `blogs/${slug}.mdx`
- Fetches raw file content via GitHub Contents API
- Returns raw MDX string + parsed frontmatter
- Returns `null` if file not found (triggers 404)

Both functions use:
- `Authorization: Bearer ${GITHUB_TOKEN}` header (server-side only, never exposed to client)
- Base64 decoding of the `content` field returned by GitHub API

---

### Step 2 — Blog Listing Page (`app/blog/page.tsx`)

**Behavior:**
- Calls `getAllPosts()` at request time
- Renders a grid/list of `BlogCard` components
- ISR revalidation: `export const revalidate = 3600` (re-fetches from GitHub every 1 hour)

**SEO:**
- `generateMetadata()` returns static metadata for the listing page
- Title: "Blog | Your Name"
- Description: "Articles about X, Y, Z"

---

### Step 3 — Individual Post Page (`app/blog/[slug]/page.tsx`)

**Behavior:**
- `generateStaticParams()` — optionally pre-render known slugs at build time
- Calls `getPostBySlug(slug)` to fetch MDX content
- Passes content through `next-mdx-remote/rsc` (server component compatible)
- Renders `BlogPost` layout wrapping the MDX output
- ISR revalidation: `export const revalidate = 3600`

**404 Handling:**
- If `getPostBySlug` returns null → `notFound()` from Next.js

**SEO via `generateMetadata()`:**
```
title:        post frontmatter title
description:  post frontmatter description
openGraph:    title, description, coverImage, publishedTime
twitter:      card, title, description, image
```

---

### Step 4 — MDX Rendering (`components/blog/MDXComponents.tsx`)

Override default HTML elements with styled components:

| MDX Element | Custom Component |
|-------------|-----------------|
| `h1, h2, h3` | Styled headings with anchor links |
| `a` | Opens external links in new tab safely |
| `img` | Next.js `<Image>` with lazy loading |
| `code` | Inline code with syntax highlighting |
| `pre` | Code block with copy button |
| `blockquote` | Styled pull quote |

Use `next-mdx-remote/rsc` for server-side rendering (no client bundle overhead).

Add **Rehype/Remark plugins** for:
- `rehype-pretty-code` — syntax highlighting for code blocks
- `remark-gfm` — GitHub Flavored Markdown (tables, strikethrough, etc.)
- `rehype-slug` — auto-generates IDs on headings
- `rehype-autolink-headings` — clickable anchor links on headings

---

### Step 5 — Sitemap (`app/sitemap.ts`)

- Calls `getAllPosts()` at build/revalidation time
- Returns array of all blog post URLs with `lastModified` from frontmatter date
- Next.js automatically serves this at `/sitemap.xml`
- Submit to Google Search Console after first deploy

---

### Step 6 — RSS Feed (`app/feed.xml/route.ts`)

- API route that generates an XML RSS feed
- Calls `getAllPosts()`, formats each post into RSS item
- Served at `/feed.xml`
- Good for discoverability and reader apps

---

## Caching Strategy

| Page | Revalidation | Reason |
|------|-------------|--------|
| Blog listing | 1 hour | New posts appear within an hour of pushing |
| Blog post | 1 hour | Edits to existing posts propagate quickly |
| Sitemap | 1 hour | Stays in sync with new posts |

**How ISR works here:**
1. First visitor to a post triggers a GitHub API fetch + MDX render
2. Result is cached at the edge
3. Subsequent visitors get the cached version instantly
4. After `revalidate` seconds, next request triggers background re-fetch
5. No rebuild needed — just push to GitHub

---

## Environment Variables

```bash
# .env.local
GITHUB_TOKEN=ghp_xxxxxxxxxxxx      # Personal access token (read:repo scope only)
GITHUB_REPO=yourusername/blog-repo # Repo where MDX files live
GITHUB_BRANCH=main                 # Branch to fetch from
```

**Security notes:**
- Token is only used server-side inside Next.js server components and route handlers
- Never imported in client components
- Add `.env.local` to `.gitignore`
- On Vercel: add these as environment variables in project settings

---

## Publishing Workflow

```
Write post in VS Code (or any editor)
        ↓
Create blogs/your-post-slug.mdx with frontmatter
        ↓
git add . && git commit -m "new post: your title"
        ↓
git push origin main
        ↓
Post is live within 1 hour (ISR revalidation)
        ↓  (optional: force instant)
Hit /api/revalidate?path=/blog/your-post-slug
```

**Optional instant revalidation:**
Create an API route that calls `revalidatePath()` — trigger it manually or via a GitHub webhook after push.

---

## SEO Checklist

- [x] Server-rendered HTML (crawlable by Google)
- [x] `generateMetadata()` per post (title, description, OG tags)
- [x] `/sitemap.xml` auto-generated from post list
- [x] `/feed.xml` RSS feed
- [x] Semantic HTML via custom MDX components
- [x] `rehype-slug` + `rehype-autolink-headings` for anchor links
- [x] Fast load via ISR edge caching
- [x] `canonical` URL in metadata
- [ ] Submit sitemap to Google Search Console (manual step after deploy)
- [ ] Add structured data (JSON-LD) for articles — optional but helpful

---

## Packages to Install

```bash
npm install next-mdx-remote gray-matter
npm install rehype-pretty-code rehype-slug rehype-autolink-headings
npm install remark-gfm
npm install shiki                  # syntax highlighting engine for rehype-pretty-code
```

---

## What You Do NOT Need

- A database
- A CMS subscription
- A separate backend
- Any paid services
- Rebuilding the site to publish

---

## Total Cost

| Service | Cost |
|---------|------|
| GitHub repo | Free |
| Vercel hosting | Free (hobby plan) |
| GitHub Contents API | Free (5000 req/hr authenticated) |
| next-mdx-remote | Free / open source |
| **Total** | **$0/month** |

---

## Summary

Push an MDX file to GitHub → it's live on your blog within an hour, fully SEO-optimized, server-rendered, and cached at the edge. No rebuild, no CMS, no cost.
