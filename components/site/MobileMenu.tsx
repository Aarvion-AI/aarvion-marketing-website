"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CTA, NAV_ITEMS } from "@/lib/site";
import { Button } from "./Button";

export function MobileMenu() {
  // Menu is open only for the path it was opened on, so navigation closes it without an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const open = openedOn === pathname;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenedOn(null);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpenedOn(open ? null : pathname)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-paper-bright text-ink"
      >
        {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
      </button>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-var(--nav-height))] overflow-y-auto border-b border-line bg-paper-bright px-(--layout-gutter) py-4 shadow-card"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-line last:border-0">
                <Link
                  href={item.href}
                  className="flex h-12 items-center text-[1rem] font-semibold text-ink"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-3 flex flex-col gap-1 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="flex h-10 items-center text-[0.92rem] text-ink-muted"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <Button href={CTA.demo.href} size="lg">
              {CTA.demo.label}
            </Button>
            <Button href={CTA.login.href} variant="secondary" size="lg">
              {CTA.login.label}
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
