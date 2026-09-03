---
name: Aarvion Runtime
description: A mineral, infrastructural product world that makes consequential agent decisions visible.
colors:
  paper: "#f6f3ec"
  paper-bright: "#fbfaf6"
  mist: "#dfe2e6"
  ink: "#0a0f18"
  ink-muted: "#535a66"
  night: "#050812"
  runtime-indigo: "#2b3f86"
  runtime-indigo-deep: "#162250"
  runtime-indigo-line: "#7385d2"
  runtime-indigo-pale: "#dce2ff"
  signal-green: "#7fe0a3"
  signal-amber: "#e5bd57"
  signal-red: "#ff8f86"
  signal-blue: "#5b82ff"
  focus: "#7d95ff"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.1rem, 3.55vw, 4rem)"
    fontWeight: 690
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3vw, 2.95rem)"
    fontWeight: 690
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 690
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.96rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  mono-label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.62rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  square: "0"
  micro: "2px"
  panel: "3px"
  control: "4px"
  field: "5px"
  feature: "10px"
  pill: "999px"
spacing:
  2xs: "0.35rem"
  xs: "0.55rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.4rem"
  xl: "2rem"
  2xl: "3.5rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.runtime-indigo-deep}"
    textColor: "{colors.paper-bright}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.75rem 1.15rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.runtime-indigo}"
    textColor: "{colors.paper-bright}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.75rem 1.15rem"
    height: "44px"
  button-light:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.85rem 1.15rem"
    height: "58px"
  field-dark:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper-bright}"
    typography: "{typography.label}"
    rounded: "{rounded.field}"
    padding: "0.75rem"
    height: "44px"
  canvas-dark:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper-bright}"
    rounded: "{rounded.panel}"
    padding: "0.9rem"
  source-node:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.7rem 0.85rem"
    height: "47px"
---

# Design System: Aarvion Runtime

## Overview

**Creative North Star: "The Runtime Plane"**

Aarvion is presented as infrastructure made visible: a warm mineral field is interrupted by a slanted indigo plane that carries a workflow from its starting point through the runtime and into approved routes and enterprise systems. The world is operational, assured, and dense without becoming militaristic. It borrows the precision of a control room and the tactility of technical equipment, then softens both with paper-toned chapters and unusually direct product language.

The direction contract is stable: the runtime plane is the ownable visual signature; product evidence appears in the first viewport; light explanation chapters alternate with near-black operating chapters; interfaces are rendered as credible working surfaces, not glossy dashboard screenshots. Cadre enters as a source flowing into the same runtime, never as a competing brand world.

The homepage story follows the action path. Sources and Cadre enter the runtime in the hero; every action crosses Route, Policy, Authority, Review, and Act; the page then demonstrates conditional routing, policy activation, customer-cloud deployment, runtime operations, the two adoption paths, and a single-workflow demo close. The illustrative `RUN-0427` identifier carries one workflow through routing, policy, deployment, operations, and the signed record with the complete PASS, PARK, and BLOCK verdict vocabulary.

**Key Characteristics:**

- A slanted mineral-indigo plane as the recurring infrastructural silhouette.
- Warm paper fields, abrupt night chapters, and dense in-product evidence.
- Compact labels, precise hairlines, and restrained status color.
- User-driven state changes that explain routing, authority, review, and shared provenance.
- Square controls and small-radius canvases that feel technical, not generic SaaS-soft.

**The One Runtime Rule.** Existing agents and Cadre may have different entry points, but both must visually resolve into the same Aarvion runtime, policy, authority, and record system.

## Colors

The palette moves between warm mineral neutrals and a deep indigo operating layer; green, amber, and blue are reserved for runtime state rather than decoration.

### Primary

- **Mineral Runtime Indigo** (`runtime-indigo`): the slanted runtime plane, selected control surfaces, and the brand's most ownable infrastructural field.
- **Deep Runtime Indigo** (`runtime-indigo-deep`): primary actions, runtime cards, active routes, and high-contrast technical surfaces.
- **Runtime Trace** (`runtime-indigo-line`): connector lines, active borders, and the thin traces that make handoffs legible.
- **Pale Runtime Wash** (`runtime-indigo-pale`): light-state hover feedback and soft indigo relief on pale surfaces.

### Tertiary

- **Verified Green** (`signal-green`): PASS, Approved, Signed, connected, and complete states on dark surfaces.
- **Human Review Amber** (`signal-amber`): PARK, approval, escalation, and human-in-the-loop states.
- **Blocked Action Red** (`signal-red`): BLOCK, denied authority, and actions the runtime must refuse rather than queue for review.
- **Route Blue** (`signal-blue`): queued or eligible route states that are informative but not yet successful.
- **Focus Blue** (`focus`): the keyboard focus outline across both light and dark chapters.

### Neutral

- **Mineral Paper** (`paper`): the default site background and broad explanatory chapters.
- **Bright Paper** (`paper-bright`): source cards, light product cards, and light-on-dark calls to action.
- **Deployment Mist** (`mist`): a cooler operational chapter that separates deployment from the warmer policy and adoption sections.
- **Operational Ink** (`ink`): primary text and the near-black anchor for light chapters.
- **Muted Ink** (`ink-muted`): explanatory body copy on light surfaces.
- **Runtime Night** (`night`): chapter-scale product stages, the closing conversion area, and the footer.

**The Signal Rarity Rule.** Green, amber, and blue communicate machine state only. Never use them as broad section fills or decorative gradients.

**The Chapter Contrast Rule.** Light chapters explain; dark chapters operate. Maintain the abrupt transition instead of blending every section into the same mid-tone.

## Typography

**Display Font:** Manrope (with `ui-sans-serif`, `system-ui`, and `sans-serif` fallbacks)
**Body Font:** Manrope (with the same system fallbacks)
**Label/Mono Font:** Geist Mono (with `ui-monospace` and `monospace` fallbacks)

**Character:** Manrope supplies blunt, legible confidence with tightly set headlines and unshowy body copy. Geist Mono is documentary: it labels states, versions, routes, and provenance without turning the whole interface into developer tooling.

### Hierarchy

- **Display** (690, fluid 3.1–4rem, line-height 1): hero promise only; keep the line breaks purposeful and the measure under roughly 930px.
- **Headline** (690, fluid 2.25–2.95rem, line-height 1.02): major chapter claims; use close tracking and short, declarative phrasing.
- **Title** (690, 1.45rem, line-height 1.2): product-card or switching-panel titles.
- **Body** (400, 0.96rem, line-height 1.7): explanatory chapter copy; keep the measure near 520–650px.
- **Label** (700, 0.78rem): actions, navigation emphasis, and compact control titles.
- **Mono Label** (650, 0.62rem, 0.1em tracking, uppercase): true interface and data labels such as statuses, field names, version strings, routes, and provenance keys.

**The Documentary Mono Rule.** Use mono only for metadata, interface labels, and machine-readable concepts. Marketing eyebrow labels are omitted; headlines, paragraphs, and calls to action remain Manrope.

**The Tight Claim Rule.** Major headlines carry the density; body copy carries the explanation. Do not inflate both at once.

## Layout

The desktop system uses one fluid content frame capped at 1360px, with gutters that scale from 1.15rem on mobile to 5.5rem on wide screens. Navigation, hero copy, both on-ramps, runtime evidence, and every chapter use the same frame. Major sections use 3.2–5.25rem vertical padding. The hero remains deliberately layered rather than becoming a conventional two-column block: copy sits left, both ways to start bridge the seam into the full-width runtime plane, the Aarvion Runtime dominates the plane, and approved models, agents, and tools resolve immediately to its right.

### Story Structure

1. Compact navigation with one dominant **Book a demo** action.
2. First-viewport promise plus both ways to start, the runtime decision, approved routes, enterprise systems, and shared PASS/PARK/BLOCK provenance.
3. The invariant action path: Route → Policy → Authority → Review → Act.
4. A single sticky focus cue crossfades from Route to Policy to Deploy to Operate while the active swimlane reaches full clarity and the other chapter surfaces remain softly veiled; the primary site navigation remains the only full-width sticky bar.
5. Interactive evidence chapters for routing, policy, deployment, and runtime operations.
6. The two on-ramps—existing agents and Cadre—resolving into one runtime.
7. A single-workflow conversion close and restrained footer.

The hero uses one normal-flow grid at every desktop width; there is no alternate absolute layout above 1200px. At 1080px, the approved-route family moves beneath the runtime as a horizontal strip. At 900px, desktop navigation becomes a menu and chapter grids stack, while dense canvases preserve two-column substructure where space allows. At 760px, both on-ramps recompose into a single-column scene, the sticky focus cue disappears, and each chapter keeps its own static label. At 640px, the complete sequence becomes vertical—on-ramps, runtime, approved routes, systems, signed record—while gutters become 1.15rem, chapter padding becomes 3.2rem, and tap targets stay at least 44px. At 360px, display type steps down again and labels may compact without dropping the runtime story.

**The Dense-to-Legible Rule.** Responsive layouts recompose product canvases; they do not turn them into sparse screenshots. Preserve sources, the runtime decision, the active state, and the provenance outcome before preserving decorative or duplicate detail.

## Elevation & Depth

Depth is structural and selective. The broad world is flat—paper, night, mist, and indigo chapter fields meet through hard edges—and source/on-ramp cards use crisp borders without elevation. Product canvases and the runtime plane carry the limited shadow vocabulary, so evidence feels inserted without turning every component into a floating card.

### Shadow Vocabulary

- **Primary Action Lift** (`0 10px 24px rgba(21, 38, 96, 0.16)`): dark-indigo actions at rest; hover deepens the lift and raises by 1px.
- **Product Canvas** (`0 18px 36px rgba(0, 0, 0, 0.28)`): dark routing, policy, and operational canvases.
- **Feature Board** (`0 28px 58px rgba(31, 38, 55, 0.12)`): large light product boards.
- **Runtime Plane** (`0 -18px 50px rgba(30, 49, 119, 0.15)`): the infrastructural plane entering the scene from below.

**The Flat Chapter Rule.** Elevate evidence, controls, and inserted planes—not entire sections. Chapter backgrounds stay flat so the page retains architectural clarity.

## Shapes

The form language is rectilinear. Primary buttons and source nodes are square; runtime cards use micro-to-control rounding (2–5px); only the largest light routing board reaches a gently curved 10px radius. Circles are reserved for health and compact completion states; the Route → Policy → Authority → Review → Act spine uses rectilinear hardware-like markers. The signature runtime plane uses asymmetric polygon clipping rather than a rounded container.

Borders are precise 1px hairlines, low contrast on pale surfaces and cool indigo-gray on dark surfaces. Connector rails and arrows are thin, visible evidence of flow. Avoid ornamental outlines, thick strokes, and large pill containers; the 999px radius is reserved for dots and circular status marks.

**The Hardware Edge Rule.** Use square corners for actions and source nodes, 2–5px corners for operational canvases, and circles only for state or sequence.

**The Plane Silhouette Rule.** When the runtime plane appears as a chapter-scale motif, keep its asymmetric slant and layered trace line; do not replace it with a rounded hero card.

## Components

The component philosophy is **tactile control surfaces with documentary precision**. Every stateful element should reveal what changed, why it changed, or what the visitor can do next.

### Buttons

- **Shape:** square by default; the form submit may use the control radius.
- **Primary:** deep runtime indigo with bright-paper text, 44px minimum height, compact bold label, and a directional arrow.
- **Hover / Focus:** lift 1px, deepen the shadow, and shift to mineral runtime indigo over 180ms; keyboard focus uses a 2px focus-blue outline with 4px offset.
- **Light conversion:** bright paper on runtime night, 58px high, with a pale-indigo hover and the same restrained 1px lift.
- **Text action:** no container; keep a 44px hit area and translate only the arrow 4px on hover.

### Chips / Tabs

- **Style:** tabs are rectangular segmented controls with 1px dividers; inactive states sit in a muted neutral or transparent dark surface.
- **State:** the selected state changes the full surface, text contrast, and supporting status copy. Use `aria-pressed` and never rely on signal color alone.

### Cards / Containers

- **Corner Style:** source cards are square; canvases use 2–5px corners; the exceptional light feature board may use 10px.
- **Background:** paper-bright for sources and adoption steps, near-black or deep indigo for operating surfaces.
- **Shadow Strategy:** small sources remain flat; product canvases use Product Canvas or Feature Board elevation.
- **Border:** one-pixel warm gray on light surfaces and cool indigo-gray on dark surfaces.
- **Internal Padding:** 0.7–1.4rem for compact controls; 0.9–1.8rem for canvases and forms.

### Inputs / Fields

- **Style:** dark navy-black fill, 1px cool border, 5px corner, white value text, and quiet gray labels.
- **Focus:** border shifts to focus blue and the fill lightens; the global focus-visible outline remains available for keyboard navigation.
- **Error / Disabled:** errors use a pale red message; disabled submit actions retain their shape and drop to 55% opacity with a wait cursor.

### Navigation

Desktop navigation is a compact sticky three-column bar: brand left, centered anchors, account and primary conversion right. It is the only full-width element that remains pinned while the product story advances. Links are small Manrope labels with color-only hover. At 900px the anchors become a square 44px menu trigger and a right-aligned pale panel; Escape closes the panel and focus returns to the trigger.

### Runtime Decision Canvas

This is the signature component. It lays Route, Policy, Authority, and Approval in adjacent columns, then resolves a selected route or signed outcome below. Selection uses borders, fill, copy, and icons together. The compact hero variant may omit its topline and outcome row only when enterprise systems and the signed record remain visible nearby. Route choices and workflow steps update the same shared route and verdict state; the record must resolve PASS as verified and not requiring review, PARK as exceeded and requiring review, and BLOCK as denied and unavailable for review.

### Motion Semantics

Motion explains product state without hiding primary content. State transitions use 220ms, layout changes use 380ms, and the arrival curve is `cubic-bezier(0.16, 1, 0.3, 1)`. Both on-ramps and every approved execution target are visible from first paint; the plane rises 16px once, then one outbound trace resolves the models, agents, and tools selected by task, data, and region. As the reader moves through Route → Policy → Deploy → Operate, a surface-matched veil recedes from the active swimlane and returns over the lanes above and below. The content remains present beneath the treatment, and failed scripting leaves every chapter at full clarity.

Routing and deployment states change only after user action. Their frames remain mounted while the active route, workflow trace, deployment-stage indicator, and record fields resolve in place; no whole-panel fade is used. The lower adoption chapter keeps both paths visible simultaneously and fixes Aarvion Runtime beneath them. Reduced-motion mode removes authored animation and smooth scrolling while preserving every final state and interaction.

**The Explicit State Rule.** Route, deployment, and adoption state changes require user action. Never autoplay consequential product states or make primary content wait behind a reveal.

## Do's and Don'ts

### Do:

- **Do** make the runtime plane the bridge between sources and consequential systems.
- **Do** show realistic decisions, statuses, handoffs, and records before explaining feature categories.
- **Do** alternate warm explanatory fields with dark operational chapters to vary pace and density.
- **Do** reserve mono labels and signal colors for evidence, metadata, and state.
- **Do** keep PASS, PARK, and BLOCK synchronized through the routing decision and signed record.
- **Do** keep primary conversion actions visible, square, and at least 44px high.
- **Do** preserve focus, reduced-motion, semantic controls, and legible mobile recomposition.

### Don't:

- **Don't** turn Aarvion into a generic blue-gradient SaaS site or a portfolio of detached governance cards.
- **Don't** make Cadre look like a separate company or a second runtime.
- **Don't** use large pills, oversized soft radii, glassmorphism, or decorative glow as the default component language.
- **Don't** spread green, amber, red, or blue across non-semantic decoration.
- **Don't** add marketing eyebrow labels above chapter headlines; use labels only when they name real interface or data state.
- **Don't** autoplay routing or deployment controls.
- **Don't** simplify mobile by removing the source-to-runtime-to-record story.
- **Don't** add fabricated customer proof, performance claims, certifications, or production metrics to product canvases.
