"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={cn("items-center gap-1", className)}>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href ||
          item.children?.some((child) => pathname === child.href);
        const linkClass = cn(
          "inline-flex h-10 items-center gap-1 rounded-md px-3.5 text-[0.9rem] font-semibold transition-colors",
          active ? "text-ink" : "text-ink-muted hover:text-ink",
        );

        if (!item.children) {
          return (
            <Link key={item.label} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.label} className="group relative">
            <Link href={item.href} className={linkClass} aria-haspopup="true">
              {item.label}
              <ChevronDown
                aria-hidden="true"
                size={15}
                className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid w-[560px] grid-cols-2 gap-1 rounded-lg border border-line bg-paper-bright p-2 shadow-card">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="rounded-md px-3.5 py-3 transition-colors hover:bg-paper"
                  >
                    <span className="block text-[0.9rem] font-semibold text-ink">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="mt-1 block text-[0.8rem] leading-snug text-ink-muted">
                        {child.description}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
