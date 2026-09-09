---
name: Aarvion Runtime
description: A warm, rounded product-marketing world that keeps Aarvion's mineral paper and indigo identity while presenting the runtime with the pace of a modern SaaS site.
colors:
  paper: "#f6f3ec"
  paper-bright: "#fbfaf6"
  panel: "#ffffff"
  line: "#e3ded3"
  line-strong: "#cbc5b8"
  ink: "#0a0f18"
  ink-soft: "#3d4350"
  ink-muted: "#535a66"
  ink-dim: "#7a818c"
  night: "#050812"
  night-raised: "#0a0f1d"
  night-panel: "#0d1428"
  indigo: "#2b3f86"
  indigo-deep: "#162250"
  indigo-mid: "#3d53a2"
  indigo-line: "#7385d2"
  indigo-pale: "#dce2ff"
  tint-indigo: "#e6ebff"
  tint-sand: "#f1e8d3"
  tint-mint: "#e2f0e5"
  tint-rose: "#f7e5e0"
  signal-green: "#7fe0a3"
  signal-amber: "#e5bd57"
  signal-blue: "#5b82ff"
  signal-red: "#ff8f86"
  green: "#2f8d50"
  amber: "#b08325"
  red: "#b53838"
typography:
  display-xl:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5.4vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem–1.05rem"
    fontWeight: 400
    lineHeight: 1.7
  mono-label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 600
    letterSpacing: "0.1em"
    textTransform: uppercase
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
shadows:
  card: "0 1px 2px rgba(10,15,24,.04), 0 24px 48px -24px rgba(31,38,55,.18)"
  lift: "0 10px 24px rgba(21,38,96,.16)"
  canvas: "0 18px 36px rgba(0,0,0,.28)"
  board: "0 28px 58px rgba(31,38,55,.12)"
layout:
  max: "1280px"
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  section: "4rem mobile → 7rem desktop"
motion:
  arrive: "cubic-bezier(0.16, 1, 0.3, 1)"
  reveal: "scroll-driven, entry 0%→40% of view()"
  hero: "staggered rise, 720ms"
---

# Design System: Aarvion Runtime

## Direction

**Warm product theatre with Aarvion's identity.** The site keeps the mineral paper field, the indigo operating layer, Manrope, and Geist Mono. It borrows from the best conversion-focused SaaS sites (centered hero, product collage, logo strip, bento features, proof band, FAQ, rounded closing CTA) without becoming a generic template: the product evidence is live, the copy is direct, and dark surfaces are used for operating moments, not decoration.

The signature remains the runtime decision — Route → Policy → Authority → Review → Act — shown as working interface, not screenshots of a dashboard.

## Colors

- **Paper / paper-bright** are the page and card surfaces. **Night** is reserved for the Operate chapter, the closing CTA, the runtime canvases, and the featured pricing tier.
- **Indigo-deep** is the primary action and the plane; **indigo-pale** and the **tint-*** colors give bento cards variety (indigo, sand, mint, rose). Use at most one tinted card per row.
- **Signal** colors (green, amber, blue, red) mean machine state only: PASS, PARK, BLOCK, eligible, queued. On light surfaces use the darker `green`/`amber`/`red`.

**Signal rarity rule.** Never use signal colors as section fills or decoration.

## Typography

Headlines carry the density; body copy carries the explanation. `display-xl` is for the hero and page titles only, centered on marketing pages, left-aligned on article-style pages. `headline` opens each section. `mono-label` is for interface labels, step numbers, table group headers, and card eyebrows that name real state — not for slogans.

## Shape and depth

- Buttons and inputs: 12px. Cards: 20px. Hero collage, closing CTA, pricing tiers, feature panels: 28px. Announcement pill, badges, tags: pill.
- Inside runtime canvases, inner panels use 8px and the canvas itself 12px so evidence reads as denser than the marketing chrome around it.
- Depth is soft and warm (`shadow-card`) on light cards; night canvases use `shadow-canvas`. No glassmorphism, no glow, no gradients as fills except the plane in generative art and the closing CTA scrim.

## Layout and rhythm

One 1280px frame. Sections alternate: centered headline + supporting paragraph, then the evidence (bento, dashboard, table, cards). Light chapters explain; the single night chapter operates. Every page ends with the closing CTA and the shared footer.

Mobile recomposes rather than hides: canvases go single-column, the collage stacks, tables scroll inside their container. The page body must never scroll horizontally.

## Components

- **Nav**: sticky, paper with light blur, Features · Solutions ▾ · Pricing · Blog · About · Contact, Log in, and one primary **Book a demo**.
- **Hero**: announcement pill → display headline → paragraph → email capture that hands off to `/contact?email=` → three trust notes → collage of live canvases over the `hero-runtime` image slot.
- **LogoMarquee**: monochrome typographic wordmarks (or SVGs from `public/logos`) for the approved list in `lib/proof.ts`, in a paused-on-hover marquee.
- **BentoCard**: tone + title + body + evidence. Embed the interactive canvases directly; use image slots where there is no canvas.
- **Faq**: native `<details>` accordion, grouped by `name` so one opens at a time.
- **ClosingCta**: night card over the `cta-closing` slot with a light primary button and the sales email.
- **ImageSlot**: renders `public/images/<id>` when present, otherwise `GenerativeVisual`. Prompts for each slot live in `lib/images.ts`.

## Motion

- Hero elements rise in with a 720ms staggered `animate-rise`.
- Everything below the fold uses `Reveal` — CSS scroll-driven, no JavaScript, 0–40% of the element's entry. Unsupported browsers show content immediately.
- Canvases keep their authored state transitions (220–520ms, arrive curve); routing and deployment states change only on user action.
- `prefers-reduced-motion` removes all of the above.

## Copy and proof

- Direct, natural language. No stacked slogans, no marketing eyebrow labels above headlines.
- Only proof the company has approved: NVIDIA Inception membership, "Used by teams at" FarEye, Adobe, Esri, Postman, customers Flipkart group and EdgePoint, and the builders' backgrounds (Postman, Deloitte, PwC, EY). No invented metrics, percentages, latencies, or certifications anywhere — including feature bullets and FAQ answers.
- Cadre is an Aarvion product line and runs on the same runtime; it never reads as a second company.

## Do / Don't

- **Do** put live product evidence in the first viewport.
- **Do** alternate tinted and bright cards; keep one night chapter.
- **Do** make every page end with a clear route to book a demo.
- **Don't** fabricate customers, numbers, or certifications.
- **Don't** add glow, glass, or blue-gradient fills.
- **Don't** autoplay consequential product state or hide content behind JavaScript-only reveals.
