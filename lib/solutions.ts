import type { Faq } from "@/lib/seo";

export type SolutionSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Solution = {
  slug: string;
  eyebrow: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: SolutionSection[];
  faqs: Faq[];
  related: string[];
};

export const SOLUTIONS: Record<string, Solution> = {
  "ai-agent-governance": {
    slug: "ai-agent-governance",
    eyebrow: "AI agent governance",
    title: "AI Agent Governance",
    h1: "AI agent governance for the enterprise",
    metaTitle:
      "AI Agent Governance — Enforce Policy on Every Agent Action | Aarvion",
    metaDescription:
      "AI agent governance enforces what your autonomous agents are allowed to do before they act. Aarvion authorizes or blocks every action in under 5ms and signs an auditable trail.",
    keywords: [
      "AI agent governance",
      "agentic AI governance",
      "AI agent policy enforcement",
      "AI agent authorization",
      "enterprise AI governance",
      "AI governance platform",
    ],
    intro:
      "AI agent governance is the discipline of deciding what an autonomous AI agent is allowed to do — and enforcing it on every single action before it reaches your production systems. Aarvion delivers governance as a runtime proxy: deterministic policy on the hot path, not a checklist after the incident.",
    sections: [
      {
        heading: "Why AI agent governance can't be a document",
        body: [
          "Most AI governance today lives in policy documents and review meetings. But an agent doesn't read your policy PDF — it takes actions, fast, based on input from users you don't fully trust. The only thing standing between a prompt injection and a real-money transaction is the model's good behavior.",
          "Aarvion makes governance executable. Every consequential action an agent attempts is checked against your policy in real time. The model can be jailbroken; the gateway cannot.",
        ],
      },
      {
        heading: "Governance that runs on every action",
        body: [
          "Before an agent approves a refund, changes a record, executes a workflow, or triggers a payment, Aarvion verifies the action is authorized by your policy, records cryptographic provenance, and writes an auditable decision trail.",
        ],
        bullets: [
          "Policy check and authorization on the hot path at sub-5ms p99",
          "Works with any agent — internal copilots, vendor agents, OpenAI, Anthropic — with no SDK or model lock-in",
          "Policy manifests are open YAML in your own Git repository: diff, review, and revert like any other code",
          "Start in shadow mode with zero production impact, then promote to bounded enforcement when you're ready",
        ],
      },
      {
        heading: "A foundational layer, alongside identity and observability",
        body: [
          "Identity answers \"who is the agent?\" Observability answers \"how is it performing?\" Governance answers a third question that becomes non-negotiable the moment agents act inside your systems of record: what was it allowed to do, what did it actually do, and on whose authority?",
          "Aarvion is that authority and provenance layer — built to drop in next to the identity and observability tools you already run.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is AI agent governance?",
        answer:
          "AI agent governance is enforcing what an autonomous AI agent is allowed to do before it acts on production systems, with an auditable record of every decision. Aarvion enforces this at runtime as a proxy, authorizing or blocking each action in under 5ms.",
      },
      {
        question: "How is runtime governance different from prompt guardrails?",
        answer:
          "Prompt guardrails try to steer the model's output. Runtime governance sits outside the model and deterministically authorizes the action itself — so even a jailbroken model cannot perform an action your policy forbids.",
      },
    ],
    related: ["ai-agent-security", "ai-agent-compliance", "ai-agent-audit-trail"],
  },

  "ai-agent-security": {
    slug: "ai-agent-security",
    eyebrow: "AI agent security",
    title: "AI Agent Security",
    h1: "AI agent security with a runtime authorization proxy",
    metaTitle:
      "AI Agent Security — Stop Prompt Injection at the Action Layer | Aarvion",
    metaDescription:
      "Secure enterprise AI agents with a runtime proxy that authorizes every action. Block prompt injection and unsafe calls before they reach your systems — in under 5ms.",
    keywords: [
      "AI agent security",
      "LLM security proxy",
      "prompt injection protection",
      "AI agent guardrails",
      "secure AI agents enterprise",
      "agent runtime security",
    ],
    intro:
      "AI agent security is about controlling what an agent can do, not just what it says. Aarvion is a runtime proxy that sits between your agents and your enterprise systems and authorizes every consequential action — so an exploited model never becomes an exploited system.",
    sections: [
      {
        heading: "The LLM can be jailbroken. The gateway cannot.",
        body: [
          "Your AI agents take autonomous actions on internal systems based on input from external users you don't trust. Today the only thing between a prompt injection and a real-money transaction is the LLM's good behavior. That is not a security control.",
          "Aarvion makes the decision deterministic. Every action is authorized by your policy, in real time, before it touches your systems. The audit log proves what was allowed and what was blocked.",
        ],
      },
      {
        heading: "Defense at the action layer, inside your VPC",
        body: [
          "Aarvion is deployed as a proxy in your own cloud. Operational data never leaves your environment, and agents simply route their calls through it.",
        ],
        bullets: [
          "Deterministic authorization on every CRM, ERP, payment, claims, and identity call",
          "No SDK to embed and no model lock-in — secure any agent the same way",
          "Sub-5ms p99 so enforcement lives in the hot path without slowing agents down",
          "Shadow mode first to observe real traffic with zero production impact",
        ],
      },
      {
        heading: "Every block is provable",
        body: [
          "Security that can't be proven doesn't survive an incident review. Each decision Aarvion makes is signed against your governance and hash-chained, so you can show exactly which actions were blocked, when, and under which rule version.",
        ],
      },
    ],
    faqs: [
      {
        question: "How does Aarvion prevent prompt injection from causing harm?",
        answer:
          "Aarvion authorizes the action, not the prompt. Even if a prompt injection jailbreaks the model, the resulting action must still pass your deterministic policy at the proxy before it can touch a real system.",
      },
      {
        question: "Does securing agents this way slow them down?",
        answer:
          "No. Policy enforcement runs at sub-5ms p99, so it sits in the hot path of agent traffic without becoming a bottleneck.",
      },
    ],
    related: ["ai-agent-governance", "ai-agent-compliance", "ai-agent-audit-trail"],
  },

  "ai-agent-compliance": {
    slug: "ai-agent-compliance",
    eyebrow: "AI agent compliance",
    title: "AI Agent Compliance",
    h1: "AI agent compliance for regulated enterprises",
    metaTitle:
      "AI Agent Compliance — SOC 2, ISO 27001, GDPR, EU AI Act | Aarvion",
    metaDescription:
      "Ship AI agents in regulated environments. Aarvion maps every agent action to SOC 2, ISO 27001, GDPR, EU AI Act, and FFIEC requirements with a signed, audit-ready trail.",
    keywords: [
      "AI agent compliance",
      "EU AI Act compliance",
      "SOC 2 AI agents",
      "ISO 27001 AI governance",
      "GDPR AI compliance",
      "regulated AI deployment",
    ],
    intro:
      "AI agent compliance means proving — not asserting — that your agents operate within the rules. Aarvion turns compliance into an artifact: every consequential action is enforced against your governance and recorded in a form that maps cleanly to the controls your auditor expects.",
    sections: [
      {
        heading: "Move stuck AI initiatives out of review and into production",
        body: [
          "Regulated AI initiatives stall in compliance review because no one can guarantee what the agent will actually do. Aarvion changes the answer: the agent does what your governance says, in real time, at every step.",
          "The same policy library applies to every agent you ever deploy — internal, vendor, or yet-to-be-built — so board-ready compliance status is available at any moment, with no scramble.",
        ],
      },
      {
        heading: "Designed against the controls you're measured on",
        body: [
          "Aarvion is built around the frameworks regulated enterprises answer to, so evidence lines up with the controls auditors actually test.",
        ],
        bullets: [
          "SOC 2 Type II",
          "ISO 27001",
          "GDPR",
          "HIPAA",
          "EU AI Act",
          "FFIEC",
        ],
      },
      {
        heading: "Compliance evidence that generates itself",
        body: [
          "Each decision links to a human, an approval, a rule version, and a manifest commit. A multi-week audit reconstruction becomes a 90-second query that produces a signed PDF — externally witnessed and tamper-evident.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which frameworks does Aarvion support?",
        answer:
          "Aarvion is designed against the controls expected by SOC 2 Type II, ISO 27001, GDPR, HIPAA, the EU AI Act, and FFIEC, and maps each agent decision to those requirements.",
      },
      {
        question: "How long does an audit take with Aarvion?",
        answer:
          "A regulator query that used to take weeks of reconstruction becomes a 90-second query that produces a signed, externally witnessed PDF.",
      },
    ],
    related: ["ai-agent-governance", "ai-agent-audit-trail", "ai-agent-security"],
  },

  "ai-agent-audit-trail": {
    slug: "ai-agent-audit-trail",
    eyebrow: "AI agent audit trail",
    title: "AI Agent Audit Trail",
    h1: "Cryptographic audit trail and provenance for AI agents",
    metaTitle:
      "AI Agent Audit Trail — Cryptographic Provenance in 90 Seconds | Aarvion",
    metaDescription:
      "Give every AI agent action a tamper-evident, hash-chained audit trail. Aarvion turns a 14-day audit reconstruction into a 90-second signed query.",
    keywords: [
      "AI agent audit trail",
      "cryptographic provenance",
      "AI audit log",
      "tamper-evident audit AI",
      "AI decision provenance",
      "hash-chained audit",
    ],
    intro:
      "An AI agent audit trail records what each agent did, why, and on whose authority — in a form no one can quietly edit later. Aarvion signs every consequential action against your governance and hash-chains it, so your audit is a mathematical proof, not a best-effort log.",
    sections: [
      {
        heading: "From 14-day reconstruction to 90-second query",
        body: [
          "Reconstructing what an AI agent did across logs, tickets, and approvals can take weeks. Aarvion replaces that with a single query: filter by agent and time window, and get a signed PDF in about 90 seconds.",
          "Each record links to a human, an approval, a rule version, and a manifest commit — so the story of every decision is already assembled.",
        ],
      },
      {
        heading: "Tamper-evident by construction",
        body: [
          "Every record is signed and externally witnessed, and the chain is hash-linked. Tamper with any field and the chain breaks, mathematically — there's no silent edit.",
        ],
        bullets: [
          "Manifest version history, signed commit by commit",
          "Provenance chain across thousands of records, hash-linked",
          "External witness proofs with trusted timestamps",
          "Held decisions captured with their human approver",
        ],
      },
      {
        heading: "An audit your business, engineers, and regulator all trust",
        body: [
          "Because provenance is captured at the moment of the action — not reconstructed afterwards — the same trail satisfies an internal incident review, an engineering postmortem, and an external regulator query without extra work.",
        ],
      },
    ],
    faqs: [
      {
        question: "What makes the audit trail tamper-evident?",
        answer:
          "Records are signed, hash-chained, and externally witnessed. Changing any field breaks the cryptographic chain, so tampering is detectable rather than hidden.",
      },
      {
        question: "What's in the audit output?",
        answer:
          "A signed PDF containing the manifest version history, the hash-linked provenance chain, external witness proofs, and held decisions with their human approvers.",
      },
    ],
    related: ["ai-agent-compliance", "ai-agent-governance", "ai-agent-security"],
  },
};

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS[slug];
}
