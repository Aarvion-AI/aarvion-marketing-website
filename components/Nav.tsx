import Link from "next/link";
import { LinkedinIcon } from "./LinkedinIcon";
import { XIcon } from "./XIcon";
import { Logo } from "./Logo";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/aarvion-ai-private-limited/";
const X_URL = "https://twitter.com/AarvionA11452";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-fg hover:text-cyan transition-colors">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-fg-muted">
          <a href="/#loop" className="hover:text-fg transition-colors">
            The loop
          </a>
          <a href="/#anatomy" className="hover:text-fg transition-colors">
            In action
          </a>
          <a href="/#compare" className="hover:text-fg transition-colors">
            Why Aarvion
          </a>
          <a href="/#partnership" className="hover:text-fg transition-colors">
            Design partnership
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aarvion on LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border-strong bg-panel text-fg-muted hover:text-cyan hover:border-cyan/40 transition-colors"
          >
            <LinkedinIcon size={14} />
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aarvion on X"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border-strong bg-panel text-fg-muted hover:text-cyan hover:border-cyan/40 transition-colors"
          >
            <XIcon size={13} />
          </a>
          <a
            href="/#partnership"
            className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-panel px-3.5 py-1.5 text-sm font-medium text-fg hover:bg-bg-elev hover:border-cyan/40 transition-colors"
          >
            Get early access
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
