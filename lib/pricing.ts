import type { Faq } from "./seo";

export type Tier = {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const TIERS: Tier[] = [
  {
    id: "pilot",
    name: "Pilot",
    tagline: "Put one workflow under the runtime.",
    audience: "For teams taking a first agent workflow from pilot toward production.",
    cta: "Start a pilot",
    features: [
      "One production workflow",
      "Connect existing agents or one Cadre pack",
      "Shadow mode and bounded enforcement",
      "Policy templates and named-owner review",
      "Signed record for every handoff",
      "Deployed in your VPC",
    ],
  },
  {
    id: "production",
    name: "Production",
    tagline: "Run your agent estate on one runtime.",
    audience: "For platform and risk teams governing many workflows across business units.",
    cta: "Talk to sales",
    featured: true,
    features: [
      "Unlimited workflows and connected agents",
      "Frontier, local, and sovereign routing rules",
      "Approval queues by owner and role",
      "Provenance exports for audit and incident review",
      "MCP, OpenClaw, and A2A connection modes",
      "Role-based access to the console",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Sovereign deployment and custom terms.",
    audience: "For regulated enterprises with multi-region, sovereign, or bespoke requirements.",
    cta: "Talk to sales",
    features: [
      "Everything in Production",
      "Multi-region and sovereign deployment",
      "Custom policy packs and blueprints with Aarvion's help",
      "Dedicated solutions engineering",
      "Security review and procurement support",
      "Custom SLAs and contract terms",
    ],
  },
];

export const COMPARISON: { group: string; rows: [string, string, string, string][] }[] = [
  {
    group: "Runtime",
    rows: [
      ["Workflows under the runtime", "1", "Unlimited", "Unlimited"],
      ["Execution routes", "Local + one approved model", "Frontier · local · sovereign", "Frontier · local · sovereign"],
      ["Shadow mode", "Included", "Included", "Included"],
      ["PASS · PARK · BLOCK verdicts", "Included", "Included", "Included"],
    ],
  },
  {
    group: "Policy and authority",
    rows: [
      ["Policy templates", "Included", "Included", "Custom packs"],
      ["Named-owner review", "Included", "Included", "Included"],
      ["Approval queues", "Single owner", "By owner and role", "By owner, role, and region"],
    ],
  },
  {
    group: "Deployment and support",
    rows: [
      ["Deployment", "Your VPC", "Your VPC", "Multi-region / sovereign"],
      ["Connection modes", "Agents + MCP", "Agents · MCP · OpenClaw · A2A", "Agents · MCP · OpenClaw · A2A"],
      ["Support", "Email", "Named contact", "Dedicated engineering"],
    ],
  },
];

export const PRICING_FAQS: Faq[] = [
  {
    question: "How is Aarvion priced?",
    answer:
      "Pricing is based on the scope of what runs under the runtime — the number of workflows and connected agents, the routes you need, and the deployment model. We scope it with you during the pilot so there are no surprises when you move to production.",
  },
  {
    question: "What does a pilot involve?",
    answer:
      "You bring one workflow that needs to reach production, or start from a Cadre pack or blueprint. Together we define where each step can run, what the agents may do, and who must approve the rest. Aarvion runs in shadow mode first, then enforces approved policies.",
  },
  {
    question: "Do we need to change our agents?",
    answer:
      "No. Aarvion sits between your agents and the systems they act on. Existing agents, MCP servers, OpenClaw installations, and A2A workflows connect without a rewrite.",
  },
  {
    question: "Where does Aarvion run?",
    answer:
      "Inside your own cloud account and approved region. Operational data does not leave your environment on any tier.",
  },
];
