# Aarvion marketing website

Marketing site for [aarvion.ai](https://www.aarvion.ai): Next.js 16 (App Router), React 19, Tailwind CSS v4, deployed on AWS Amplify (`amplify.yml`).

## Run locally

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint     # eslint (next build no longer lints)
npm run build && npm run start
```

`predev`/`prebuild` run `scripts/asset-manifest.mjs`, which scans `public/images` and `public/logos` and writes `lib/asset-manifest.generated.ts`. Commit the generated file.

Copy `.env.example` to `.env.local` for the contact form (AWS SES or Resend). Without either, `/api/contact` returns 503 and the form tells the visitor to email sales.

## Structure

| Path | What it is |
|---|---|
| `app/` | Routes: `/`, `/features`, `/pricing`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, four `/[solution]` SEO pages, `/api/contact`, sitemap/robots/OG image |
| `app/globals.css` | The design tokens (colors, radii, shadows, motion) exposed to Tailwind via `@theme inline`, plus a few utilities (`display-xl`, `headline`, `title`, `mono-label`, `container-site`, `.marquee`) |
| `components/site/` | Shared primitives: `Nav`, `Footer`, `Button`, `Section`, `Container`, `BentoCard`, `Faq`, `ClosingCta`, `LogoMarquee`, `ImageSlot`, `Reveal`, `DemoForm`, `PageHero` |
| `components/home/` | Homepage sections |
| `components/evidence/` | The interactive runtime canvases (routing, policy, deployment, decision, provenance, dashboard) and their CSS module |
| `lib/` | Content and config: `site.ts` (nav/footer), `proof.ts` (approved social proof), `features.ts`, `pricing.ts`, `blog.ts`, `solutions.ts`, `seo.ts`, `images.ts` |
| `DESIGN.md` / `PRODUCT.md` | Design system and product positioning rules |

## Images and logos

Every illustrative image on the site is an **image slot** (`lib/images.ts`). Each slot renders `public/images/<slot-id>.{webp,png,jpg}` through `next/image` when the file exists, and otherwise a code-drawn `GenerativeVisual` fallback. To replace a placeholder, drop a file with the slot id into `public/images/` and rebuild — no code changes.

Slot ids and the AI-image prompt written for each are in `lib/images.ts`:

`hero-runtime` (16:9) · `feature-authority` (4:3) · `feature-record` (4:3) · `cta-closing` (21:9) · `about-hero` (16:9) · `blog-pilot-to-production`, `blog-pass-park-block`, `blog-routing` (16:9)

Company marks in the logo marquee (`lib/proof.ts`) render as typographic wordmarks until an SVG named `public/logos/<id>.svg` exists (`fareye`, `adobe`, `esri`, `postman`, `flipkart`, `myntra`, `cleartrip`, `shopsy`, `edgepoint`).

## Motion

Scroll reveals use CSS scroll-driven animations (`animation-timeline: view()`), so they need no JavaScript and browsers without support simply show the content. `prefers-reduced-motion` disables all authored motion.
