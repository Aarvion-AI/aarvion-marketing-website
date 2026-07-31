import Link from "next/link";
import { Bot, Server, Terminal, Library, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

const PRODUCTS = [
  {
    href: "https://dashboard.aarvion.ai/agents",
    label: "Govern Agent",
    blurb: "Runtime policy on every AI agent action",
    icon: Bot,
  },
  {
    href: "https://dashboard.aarvion.ai/mcp",
    label: "Govern MCP",
    blurb: "Turn any API into a governed MCP server",
    icon: Server,
  },
  {
    href: "https://dashboard.aarvion.ai/openclaw",
    label: "OpenClaw",
    blurb: "Govern local CLI agents with approvals",
    icon: Terminal,
  },
  {
    href: "https://cadreagents.com",
    label: "Cadre",
    blurb: "Governed library of finance AI agents",
    icon: Library,
  },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-fg hover:text-cyan transition-colors">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-fg-muted">
          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="inline-flex items-center gap-1 hover:text-fg transition-colors group-hover:text-fg group-focus-within:text-fg"
            >
              Products
              <span
                aria-hidden
                className="text-fg-dim transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
              >
                ▾
              </span>
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-[680px] pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-border-strong bg-panel/95 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)] backdrop-blur">
                <div className="grid grid-cols-[1fr_240px]">
                  {/* Products grid */}
                  <div className="p-3">
                    <div className="px-2 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                      Products
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <a
                            key={p.href}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item flex gap-3 rounded-lg p-2.5 transition-colors hover:bg-bg-elev"
                          >
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan transition-colors group-hover/item:bg-cyan/20">
                              <Icon size={16} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[13px] font-medium text-fg">
                                {p.label}
                              </span>
                              <span className="mt-0.5 block text-[11.5px] leading-snug text-fg-dim">
                                {p.blurb}
                              </span>
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured rail */}
                  <div className="border-l border-border/60 bg-bg-elev/40 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan">
                      The platform
                    </div>
                    <p className="mt-3 text-[14px] font-medium leading-snug text-fg">
                      One runtime layer between your agents and your systems of
                      record.
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-fg-muted">
                      Enforce policy in under 5&nbsp;ms and prove every action
                      with a signed audit trail.
                    </p>
                    <a
                      href="/#what"
                      className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-cyan hover:gap-2.5 transition-all"
                    >
                      See how it works
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <a
          href="https://dashboard.aarvion.ai/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-panel px-3.5 py-1.5 text-sm font-medium text-fg hover:bg-bg-elev hover:border-cyan/40 transition-colors"
        >
          Login
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
