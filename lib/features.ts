import type { ImageSlotId } from "./images";

export type FeatureVisual =
  | { kind: "routing" }
  | { kind: "policy" }
  | { kind: "deploy" }
  | { kind: "operate" }
  | { kind: "record" }
  | { kind: "image"; slot: ImageSlotId };

export type Feature = {
  id: string;
  title: string;
  body: string;
  bullets: string[];
  visual: FeatureVisual;
};

export const FEATURES: Feature[] = [
  {
    id: "routing",
    title: "Route each workflow step to an approved model or environment.",
    body: "Aarvion decides where every step runs: an approved frontier model for complex reasoning, a local model for routine work, or sovereign infrastructure when data must not leave a region. One workflow can span all three, and the choice is recorded.",
    bullets: [
      "Routing rules by task, data classification, and region",
      "Frontier, local, and sovereign execution targets",
      "Works with first-party and third-party agents, studios, APIs, and custom code",
    ],
    visual: { kind: "routing" },
  },
  {
    id: "policy",
    title: "Turn operating policies into rules the runtime enforces.",
    body: "Start from Aarvion templates or bring the documents your teams already follow. Aarvion drafts runtime rules from them; named owners edit, test against shadow traffic, and sign each version before it reaches production.",
    bullets: [
      "Policy templates for common domains and deployment models",
      "Named-owner review and signed versions",
      "Policy version attached to every verdict",
    ],
    visual: { kind: "policy" },
  },
  {
    id: "authority",
    title: "Check delegated authority before the action, not after.",
    body: "Every consequential action is checked against the scope its agent was actually given and the owner who delegated it. Inside scope, it passes. Outside scope, it parks for the named owner or is blocked outright.",
    bullets: [
      "PASS, PARK, and BLOCK verdicts on every consequential action",
      "Approval queues by risk owner, business owner, and operator",
      "Nothing reaches a system of record on the model's say-so",
    ],
    visual: { kind: "image", slot: "feature-authority" },
  },
  {
    id: "record",
    title: "Keep a signed record of every handoff.",
    body: "The runtime writes the route, policy version, authority check, and approval state for each step into a hash-chained record. An audit becomes a query, and a production incident has a trace.",
    bullets: [
      "Tamper-evident provenance across agent-to-agent handoffs",
      "Evidence that maps to SOC 2, ISO 27001, GDPR, and EU AI Act controls",
      "Exportable records for auditors and incident review",
    ],
    visual: { kind: "record" },
  },
  {
    id: "deploy",
    title: "Deploy inside your cloud. Start in shadow mode.",
    body: "Aarvion runs in your VPC and approved region, between your agents and the systems they act on. Connect first, observe decisions in shadow mode with no production impact, then enforce approved policies when you are ready.",
    bullets: [
      "Runs in your VPC; operational data never leaves your environment",
      "Connect, shadow, and enforce stages with no agent code changes",
      "Supports MCP servers, OpenClaw installations, and A2A workflows",
    ],
    visual: { kind: "deploy" },
  },
  {
    id: "operate",
    title: "See what every agent did, why it was allowed, and who approved it.",
    body: "Monitor the connected fleet, follow each workflow's decision trace, clear actions waiting for review, and open the signed record behind any production change — all from one console.",
    bullets: [
      "Fleet, activity, approvals, and provenance views",
      "Decision trace per workflow with the selected route and verdict",
      "Review queue with the attached policy and delegated scope",
    ],
    visual: { kind: "operate" },
  },
];

export const INTEGRATIONS = [
  {
    title: "Agents and workflows",
    items: ["Your existing agents", "Cadre agent packs", "A2A workflows", "Agent studios"],
  },
  {
    title: "Connection modes",
    items: ["MCP servers", "OpenClaw installations", "APIs and custom code", "No SDK required"],
  },
  {
    title: "Execution routes",
    items: ["Frontier models", "Local models", "Sovereign infrastructure", "Model-agnostic"],
  },
  {
    title: "Where it runs",
    items: ["Your VPC", "Your approved region", "Major clouds", "Private infrastructure"],
  },
];
