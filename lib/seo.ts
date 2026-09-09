export const SITE_URL = "https://www.aarvion.ai";
export const SITE_NAME = "Aarvion";
export const ORG_LINKEDIN =
  "https://www.linkedin.com/company/aarvion-ai-private-limited/";
export const ORG_X = "https://twitter.com/AarvionA11452";

export const DEFAULT_DESCRIPTION =
  "Run your agents or start with a Cadre pack. Aarvion routes each workflow step, checks delegated authority, and records the decision across handoffs.";

export const PRIMARY_KEYWORDS = [
  "enterprise agent runtime",
  "AI agent routing",
  "sovereign AI routing",
  "local AI models",
  "frontier AI models",
  "AI agent deployment",
  "AI agent governance",
  "AI agent security",
  "runtime policy enforcement",
  "AI agent authorization",
  "AI agent audit trail",
  "AI agent compliance",
  "agentic AI governance",
  "AI guardrails",
  "cryptographic provenance",
  "enterprise AI agents",
  "AI agent observability",
  "LLM security proxy",
  "EU AI Act compliance",
  "prompt injection protection",
];

export const SOLUTION_SLUGS = [
  "ai-agent-governance",
  "ai-agent-security",
  "ai-agent-compliance",
  "ai-agent-audit-trail",
] as const;

export type Faq = { question: string; answer: string };

export const HOME_FAQS: Faq[] = [
  {
    question: "What is AI agent governance?",
    answer:
      "AI agent governance is the practice of enforcing what an autonomous AI agent is allowed to do before it acts on your production systems, recording an auditable trail of every decision. Aarvion delivers this as a runtime: every consequential action is routed, checked against your policy and delegated authority, passed, parked for review, or blocked, and signed into a tamper-evident provenance chain.",
  },
  {
    question: "How does Aarvion stop a prompt injection from reaching my systems?",
    answer:
      "Aarvion sits between your agents and your enterprise systems. Even if the LLM is jailbroken, the gateway is not: the action still has to pass your deterministic policy before it touches a CRM, ERP, payment, or claims system. The model can be fooled — the authorization layer cannot.",
  },
  {
    question: "Do I need to change my agent code or add an SDK?",
    answer:
      "No. Aarvion sits between your agents and your systems, not inside your agent code. It runs inside your own VPC and your agents route their calls through it. It works with any agent — internal copilots, vendor agents, MCP servers, OpenClaw installations, OpenAI, or Anthropic — with no model lock-in.",
  },
  {
    question: "How does Aarvion help with SOC 2, ISO 27001, GDPR, and the EU AI Act?",
    answer:
      "Every consequential action is signed against your governance and hash-chained. Instead of reconstructing what an agent did from scattered logs, you query the signed record and export evidence that maps to SOC 2, ISO 27001, GDPR, EU AI Act, and FFIEC requirements.",
  },
  {
    question: "Where does Aarvion run and does my data leave my environment?",
    answer:
      "Aarvion is deployed inside your own cloud as a proxy in your VPC. Operational data never leaves your environment. Policy manifests live in your own Git repository as open YAML you own, version, and review like any other code.",
  },
  {
    question: "Does the policy check slow my agents down?",
    answer:
      "Policy evaluation is deterministic and sits in the hot path of agent traffic, so it is designed not to become a bottleneck. You can start in shadow mode with zero production impact, then promote to bounded enforcement when you are ready.",
  },
];

function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data);
}

export function organizationJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: DEFAULT_DESCRIPTION,
    email: "founders@aarvion.ai",
    sameAs: [ORG_LINKEDIN, ORG_X],
  });
}

export function websiteJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  });
}

export function softwareApplicationJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} — Enterprise Agent Runtime`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud and private infrastructure",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  });
}

export function faqJsonLd(faqs: Faq[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  });
}
