import { ORG_LINKEDIN, ORG_X } from "./seo";

export const SITE = {
  name: "Aarvion",
  tagline: "The enterprise agent runtime.",
  salesEmail: "sales@aarvion.ai",
  foundersEmail: "founders@aarvion.ai",
  dashboardUrl: "https://dashboard.aarvion.ai/",
  cadreUrl: "https://cadreagents.com",
};

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavItem = NavLink & { children?: NavLink[] };

export const SOLUTION_LINKS: NavLink[] = [
  {
    label: "AI agent governance",
    href: "/ai-agent-governance",
    description: "Enforce what agents may do before they act.",
  },
  {
    label: "AI agent security",
    href: "/ai-agent-security",
    description: "Stop prompt injection from reaching your systems.",
  },
  {
    label: "AI agent compliance",
    href: "/ai-agent-compliance",
    description: "Evidence for SOC 2, ISO 27001, GDPR and the EU AI Act.",
  },
  {
    label: "AI agent audit trail",
    href: "/ai-agent-audit-trail",
    description: "A signed record of every consequential action.",
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/ai-agent-governance", children: SOLUTION_LINKS },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CTA = {
  demo: { label: "Book a demo", href: "/contact" },
  login: { label: "Log in", href: SITE.dashboardUrl, external: true },
};

export const FOOTER_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Cadre agent packs", href: SITE.cadreUrl, external: true },
      { label: "Dashboard login", href: SITE.dashboardUrl, external: true },
    ],
  },
  { title: "Solutions", links: SOLUTION_LINKS },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: SITE.salesEmail, href: `mailto:${SITE.salesEmail}`, external: true },
    ],
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: ORG_LINKEDIN, kind: "linkedin" as const },
  { label: "X", href: ORG_X, kind: "x" as const },
];
