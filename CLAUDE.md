# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A bilingual (es/en) website for JUCUM Leticia (YWAM Leticia), Amazonas, Colombia. It is also the developer's portfolio project (GitHub: JohanBarrios26). The functional spec is `ESPECIFICACIÓN DEL SITIO WEB.docx`, which is gitignored because it is a client-internal document. Read it before building a section. It defines sections, data models, palette, fonts, SEO, analytics event names and the phased build order. The site will be edited by non-technical people, so all editable content must come from the content layer (and later a CMS), never from hardcoded page text.

Stack: **Astro 7 static output**, plain CSS, no UI or animation libraries. The CMS will be **Sanity** (phase 3, not connected yet). Hosting: a **Vercel** preview for the client (`vercel.json` sends `noindex`), and **Cloudflare Pages** for production once the client buys a domain (`public/_headers`).

**Code comments are written in Spanish on purpose.** The developer asked for them so they can maintain the code. Keep new comments in Spanish, and keep the file-header style: what the file does and how to modify it.

## Commands

```bash
npm run dev      # http://localhost:4321
npm run build    # static build to dist/
npm run check    # astro check (types + .astro diagnostics)
```

There is no test suite. Verify changes with `npm run check && npm run build`. The dev machine has about 6 GB of RAM and is often nearly full. If check or build dies with "heap out of memory" or "memory allocation failed", prefix the command with `NODE_OPTIONS=--max-old-space-size=3072` and stop the dev server first.

## Architecture

- **Content layer:** `src/lib/content/index.ts` is the only way pages read editable data (`getHome`, `getMinistries`, `getSchools`, `getGallery`, `getStories`, `getJoinPaths`, `getSiteSettings`...). Today it reads `seed.ts`. In phase 3 only the getter bodies change to query Sanity. Raw shapes use `Localized<T>` (`{ es, en? }`) and resolve with a fallback to Spanish. Getters also filter by `active`/`publishable` and authorization flags (spec §31–32) and sort by `order`.
- **Never invent content** (spec §35). Unconfirmed values are `null` and render `<PendingContent>`, which is hidden when `PUBLIC_SHOW_PENDING=false`. Photos in `src/assets/temporal/` are temporary (taken from the developer's earlier Vercel version) and flagged `temporary: true`.
- **i18n uses localized slugs**, so every URL comes from `src/i18n/routes.ts` (`routes`, `ministryAlternates`, `schoolAlternates`, `joinPathUrl`). Every page passes `alternates` to `BaseLayout`, which drives hreflang, canonical and the language switcher. Fixed UI strings live in `src/i18n/ui.ts`; `en` is typed against `es`, so missing keys fail type-check.
- **Pages are thin:** `src/pages/**` only pick a view from `src/views/` and a locale. Dynamic `[slug].astro` pages use `getStaticPaths` over `get*Slugs()`. The home page is composed of section components in `src/components/home/`.
- **Images** always go through `src/components/ui/SmartImage.astro` (`<Picture>` with AVIF/WebP). Pass `priority` only for the above-the-fold image. Keep source photos at or below about 2400px, since huge originals exhaust memory during the build.
- **Animations:** add `data-reveal` (plus an optional `--reveal-delay`) for reveal-on-scroll; see `global.css` §5 and `src/scripts/reveal.ts`. Content is only hidden when `html.js` is set. Scroll-linked effects use CSS `animation-timeline: view()` inside `@supports`. Every effect must respect `prefers-reduced-motion`. `BaseLayout`'s `headerOverlay` makes the header transparent over a full-bleed hero. Don't put `backdrop-filter` or `transform` on the header itself, because it would break the fixed mobile menu.
- **Styling:** tokens are in `src/styles/tokens.css`, and component styles are scoped. River Blue `#00ADEF` fails contrast as text on light backgrounds, so use it only as a background with Night text, or as text on dark backgrounds.
- **Analytics hooks:** links carry `data-event="<name>"` using the spec §33 names. Wiring comes in phase 5.

## Client requirements not in the spec

- Each school has `contacts`: the people in charge of that specific school, each with their own WhatsApp, email and phone. They render on the school page.
- Contact-form recipients and CMS admin emails are recorded in the project memory. They must never appear in frontend code.
