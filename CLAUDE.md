# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A bilingual (es/en) website for JUCUM Leticia (YWAM Leticia), Amazonas, Colombia. It is also the developer's portfolio project (GitHub: JohanBarrios26). The functional spec is `ESPECIFICACIÓN DEL SITIO WEB.docx`, which is gitignored because it is a client-internal document. Read it before building a section. It defines sections, data models, palette, fonts, SEO, analytics event names and the phased build order. The site will be edited by non-technical people, so all editable content must come from the content layer (backed by Sanity), never from hardcoded page text.

Stack: **Astro 7 static output**, plain CSS, no UI or animation libraries. Content lives in **Sanity** (project `dukpncxs`, dataset `production`, public read). The Studio is in `studio/` (a separate npm package) and is deployed to https://jucum-leticia.sanity.studio. A non-technical editor guide is in `docs/MANUAL-ADMINISTRADORES.md`. Hosting: a **Vercel** preview for the client at https://jucum-leticia-web.vercel.app (`vercel.json` sends `noindex`). It auto-deploys on push to `main`, and a Sanity GROQ webhook ("Vercel: reconstruir sitio") calls a Vercel Deploy Hook on every publish. The hook URL is secret and lives only in Sanity's webhook settings. **Cloudflare Pages** is planned for production once the client buys a domain (`public/_headers`).

**Code comments are written in Spanish on purpose.** The developer asked for them so they can maintain the code. Keep new comments in Spanish, and keep the file-header style: what the file does and how to modify it.

## Commands

```bash
npm run dev      # http://localhost:4321
npm run build    # static build to dist/
npm run check    # astro check (types + .astro diagnostics)
```

Studio (run inside `studio/`): `npx sanity dev` (http://localhost:3333), `npx sanity schema validate`, `npx sanity deploy -y`, `npm run backup` (dataset export to `studio/backups/`, gitignored).

There is no test suite. Verify changes with `npm run check && npm run build`; for Studio changes also run `npx tsc --noEmit -p studio` and `npx sanity schema validate`. The dev machine has about 6 GB of RAM and is often nearly full. If check or build dies with "heap out of memory" or "memory allocation failed", prefix the command with `NODE_OPTIONS=--max-old-space-size=3072` and stop the dev server first.

## Architecture

- **Content layer:** `src/lib/content/index.ts` is the only way pages read editable data (`getHome`, `getMinistries`, `getSchools`, `getGallery`, `getStories`, `getJoinPaths`, `getSiteSettings`...). It gets raw data from `src/lib/sanity/fetch.ts`: one GROQ query per build (memoized), mapped to the `*Raw` types in `types.ts`. Raw shapes use `Localized<T>` (`{ es, en? }`), and empty English values fall back to Spanish. Getters also filter by `active`/`publishable` and authorization flags (spec §31–32, including `authorized` on school contacts) and keep the Studio drag order (`orderRank`).
- **Adding a content field** touches four places: the Studio schema (`studio/schemaTypes/`), `types.ts`, the query plus mapping in `sanity/fetch.ts`, and the resolver in `content/index.ts`.
- **Studio gotcha:** Sanity validates schemas in a Node worker that can't load CommonJS packages (it fails with "exports is not defined"). `lexorank`, used by `@sanity/orderable-document-list`, is CommonJS. So schemas use `studio/lib/orderRank.ts` (it lazy-imports lexorank in `initialValue`), and `structure.ts` loads the plugin with a dynamic import inside `.child()`. Never import that plugin statically. Icons are imported per icon (`@sanity/icons/Home`). Don't set `NODE_OPTIONS` heap flags for `sanity deploy`/`schema validate`; they hide the real error behind an OOM.
- **Never invent content** (spec §35). Unconfirmed values are `null` or empty in Sanity and render `<PendingContent>`, which is hidden when `PUBLIC_SHOW_PENDING=false`. Photos flagged `temporary` in Sanity are provisional (taken from the developer's earlier Vercel version).
- **i18n uses localized slugs**, so every URL comes from `src/i18n/routes.ts` (`routes`, `ministryAlternates`, `schoolAlternates`, `joinPathUrl`). Every page passes `alternates` to `BaseLayout`, which drives hreflang, canonical and the language switcher. Fixed UI strings live in `src/i18n/ui.ts`; `en` is typed against `es`, so missing keys fail type-check.
- **Per-ministry/school differentiation:** each item has a `motif` (an animated SVG in `components/ui/Motif.astro`, with names in `motifNames`) and `features`, an ordered array of feature blocks (`audioSamples`, `riverRoute`, `timeline`, `verse`, `video`, `checklist`, `stats`). These are defined in `studio/schemaTypes/objects/features.ts`, mapped in `sanity/fetch.ts` → `toFeatures`, resolved in `content/index.ts` → `resolveFeatures`, and rendered by `components/features/FeatureBlocks.astro` (which picks the surface per type and hides empty blocks unless `showPending`). Audio must never preload: the `<audio>` element is created on the first click. Only `authorized` audio samples render.
- **Pages are thin:** `src/pages/**` only pick a view from `src/views/` and a locale. Dynamic `[slug].astro` pages use `getStaticPaths` over `get*Slugs()`. The home page is composed of section components in `src/components/home/`.
- **Images** always go through `src/components/ui/SmartImage.astro`. Sanity images use CDN URLs with a `?w=…&auto=format` srcset, and the Studio hotspot is applied as `object-position`. Local `ImageMetadata` still uses Astro `<Picture>`. Pass `priority` only for the above-the-fold image.
- **Animations:** add `data-reveal` (plus an optional `--reveal-delay`) for reveal-on-scroll; see `global.css` §5 and `src/scripts/reveal.ts`. Content is only hidden when `html.js` is set. Scroll-linked effects use CSS `animation-timeline: view()` inside `@supports`. Every effect must respect `prefers-reduced-motion`. `BaseLayout`'s `headerOverlay` makes the header transparent over a full-bleed hero. Don't put `backdrop-filter` or `transform` on the header itself, because it would break the fixed mobile menu.
- **Styling:** tokens are in `src/styles/tokens.css`, and component styles are scoped. River Blue `#00ADEF` fails contrast as text on light backgrounds, so use it only as a background with Night text, or as text on dark backgrounds.
- **Analytics:** Umami loads only if `PUBLIC_UMAMI_WEBSITE_ID` is set (see `src/lib/config.ts`). `src/scripts/analytics.ts` tracks clicks on any `[data-event]`, the page-level `pageEvent`/`pageItem` props of `BaseLayout` (`ministry_view`, `program_view`, `person_view`), and `window` `analytics` CustomEvents (the form dispatches `contact_form_submit`). Card clicks use `*_card_click` so they don't collide with page views. To switch provider, change only `send()`.
- **Contact form:** `components/ContactForm.astro` posts to Web3Forms using the public `PUBLIC_WEB3FORMS_KEY`, which never exposes the recipient email. Without a key it renders an "unavailable" notice. The free tier has no CC, so the second recipient gets messages through a Gmail forwarding rule on ywamleticia@gmail.com. Anti-spam is a `botcheck` honeypot plus a 3-second minimum (both fake success). `?motivo=<joinPath key>` preselects the interest. The no-JS fallback redirects to `contactThanks` (noindex, excluded from the sitemap).
- **SEO:** `BaseLayout` emits the canonical, hreflang, OG and Twitter tags. Its default image is the home hero via `ogImageUrl()`; pages pass their own. It also emits JSON-LD: `organizationSchema` (NGO) on the home page and `breadcrumbs` on detail pages.
- **People (team) pages:** `/personas/` and `/personas/[slug]/` only show `authorized` people. `support.enabled` shows an "Apoyar a…" button that links to the person's own donation URL, falling back to WhatsApp. Never render bank details (spec §15.4).

## Client requirements not in the spec

- **Bases** (added at the client's request): a `base` document type, `/bases/` and `/bases/[slug]/` pages (`BasesView`, `BaseView`), `HomeBases` placed after "Sobre JUCUM", and "Bases" added to `mainNav`, so the menu has 7 items and the desktop nav breakpoint is 75rem. JUCUM El Puente is a base, not a school or ministry: it is in the community of Ronda (about 4 h on foot or 2 h by river from Leticia), and EMI and the pastors' seminars take place there. Its old school and ministry documents are hidden (`active: false`), not deleted. Schools can reference a `base`, shown in the school's info list. `BaseAccess.astro` draws the routes (river = wavy blue line, walk = dotted green trail).
- **Closing CTA:** listing pages end with `components/CtaBand.astro`. Don't use a loose heading with a far-away button.
- **Desktop scale:** the client found sections too big on laptops. Big headings in `tokens.css` are capped with `min(…, Nsvh)`, and card and hero heights are kept modest. Check new sections at 1366×768 and 1280×720.

- Each school has `contacts`: the people in charge of that specific school, each with their own WhatsApp, email and phone. They render on the school page.
- Contact-form recipients and CMS admin emails are recorded in the project memory. They must never appear in frontend code.
