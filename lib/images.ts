export type Variant = "runtime" | "authority" | "record" | "night" | "warm";

export type ImageSlotSpec = {
  aspect: string;
  alt: string;
  variant: Variant;
  prompt: string;
};

const BASE_STYLE =
  "Premium editorial 3D render, warm off-white paper background, deep indigo (#162250) and mineral indigo (#2b3f86) accents, soft studio light, subtle film grain, no text, no logos, no people, 16:9";

export const IMAGE_SLOTS = {
  "hero-runtime": {
    aspect: "16 / 9",
    alt: "Abstract render of the Aarvion runtime plane routing agent work into enterprise systems",
    variant: "runtime",
    prompt: `${BASE_STYLE}. A slanted translucent indigo glass plane floating above a pale paper field; glowing thin light traces enter from above, pass through the plane and continue as ordered lines below; small frosted-glass nodes float near the trace lines.`,
  },
  "feature-authority": {
    aspect: "4 / 3",
    alt: "Abstract render of an action held for human review",
    variant: "authority",
    prompt: `${BASE_STYLE}, 4:3. A single amber glass token resting on a paused indigo conveyor of light, a soft halo around it, everything else muted and still.`,
  },
  "feature-record": {
    aspect: "4 / 3",
    alt: "Abstract render of a signed provenance chain",
    variant: "record",
    prompt: `${BASE_STYLE}, 4:3. A chain of small frosted-glass blocks linked by thin green light, each block etched with a faint hash pattern, receding into soft depth of field.`,
  },
  "cta-closing": {
    aspect: "21 / 9",
    alt: "Dark abstract render of indigo light planes",
    variant: "night",
    prompt:
      "Premium 3D render on near-black (#050812) background, layered translucent indigo glass planes lit from below, faint grid on the floor, thin blue-white light traces, cinematic, no text, 21:9.",
  },
  "about-hero": {
    aspect: "16 / 9",
    alt: "Warm abstract render of layered paper and indigo planes",
    variant: "warm",
    prompt: `${BASE_STYLE}. Stacked sheets of warm paper with one indigo sheet slanted between them, soft morning light raking across, minimal and architectural.`,
  },
  "blog-pilot-to-production": {
    aspect: "16 / 9",
    alt: "Abstract render of a prototype path becoming a production line",
    variant: "runtime",
    prompt: `${BASE_STYLE}. A loose tangle of light on the left resolving into one straight indigo rail on the right, passing through a small glass gate.`,
  },
  "blog-pass-park-block": {
    aspect: "16 / 9",
    alt: "Abstract render of three signal states: green, amber, red",
    variant: "authority",
    prompt: `${BASE_STYLE}. Three frosted-glass tokens in a row on an indigo plane — green, amber, red — each casting a soft matching glow.`,
  },
  "blog-routing": {
    aspect: "16 / 9",
    alt: "Abstract render of work routed to frontier, local and sovereign environments",
    variant: "record",
    prompt: `${BASE_STYLE}. One light trace splitting into three destinations: a distant bright orb, a nearby compact cube, and a walled glass enclosure.`,
  },
} satisfies Record<string, ImageSlotSpec>;

export type ImageSlotId = keyof typeof IMAGE_SLOTS;
