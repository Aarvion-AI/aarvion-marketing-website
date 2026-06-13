import Link from "next/link";
import { LinkedinIcon } from "./LinkedinIcon";
import { XIcon } from "./XIcon";
import { Logo } from "./Logo";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/aarvion-ai-private-limited/";
const X_URL = "https://twitter.com/AarvionA11452";

const SOLUTION_LINKS = [
  { href: "/ai-agent-governance", label: "AI agent governance" },
  { href: "/ai-agent-security", label: "AI agent security" },
  { href: "/ai-agent-compliance", label: "AI agent compliance" },
  { href: "/ai-agent-audit-trail", label: "AI agent audit trail" },
];

export function Footer() {
  return (
    <footer className="py-12">
      <nav
        aria-label="Solutions"
        className="mx-auto mb-10 flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 text-sm text-fg-muted"
      >
        {SOLUTION_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="hover:text-cyan transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 border-t border-border/40 pt-8">
        <Logo className="text-fg-muted" />
        <div className="flex items-center gap-6 text-sm text-fg-muted">
          <a
            href="mailto:sales@aarvion.ai"
            className="hover:text-fg transition-colors"
          >
            sales@aarvion.ai
          </a>
          <a
            href="mailto:founders@aarvion.ai"
            className="hover:text-fg transition-colors"
          >
            founders@aarvion.ai
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aarvion on LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border-strong bg-panel/40 text-fg-muted hover:text-cyan hover:border-cyan/40 transition-colors"
          >
            <LinkedinIcon size={14} />
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aarvion on X"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border-strong bg-panel/40 text-fg-muted hover:text-cyan hover:border-cyan/40 transition-colors"
          >
            <XIcon size={13} />
          </a>
        </div>
        <p className="text-xs text-fg-dim">
          © {new Date().getFullYear()} Aarvion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
