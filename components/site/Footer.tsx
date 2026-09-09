import Link from "next/link";
import { INCEPTION } from "@/lib/proof";
import { FOOTER_GROUPS, SITE, SOCIALS } from "@/lib/site";
import { LinkedinIcon } from "./LinkedinIcon";
import { Logo } from "./Logo";
import { XIcon } from "./XIcon";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
        <div className="max-w-xs">
          <Link href="/" aria-label="Aarvion home" className="inline-block">
            <Logo size={28} />
          </Link>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">
            {SITE.tagline} Route every step, gate every consequential action,
            keep a signed record of who allowed what.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-paper-bright px-3 py-2 text-[0.78rem] font-semibold text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
            {INCEPTION.label}
          </p>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="mono-label text-ink-dim">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-[0.92rem] text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[0.92rem] text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-[0.82rem] text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aarvion. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.kind}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Aarvion on ${social.label}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-paper-bright text-ink-muted transition-colors hover:border-indigo-line hover:text-ink"
              >
                {social.kind === "linkedin" ? (
                  <LinkedinIcon size={14} />
                ) : (
                  <XIcon size={13} />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
