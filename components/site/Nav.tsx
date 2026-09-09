"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTA } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-line shadow-[0_1px_0_0_rgba(10,15,24,0.06),0_12px_24px_-16px_rgba(10,15,24,0.16)]" : "border-transparent",
      )}
    >
      <div className="container-site relative flex h-(--nav-height) items-center justify-between gap-6">
        <Link href="/" aria-label="Aarvion home" className="shrink-0">
          <Logo size={28} />
        </Link>

        <NavLinks className="hidden lg:flex" />

        <div className="hidden items-center gap-1 lg:flex">
          <Button href={CTA.login.href} variant="ghost" size="sm">
            {CTA.login.label}
          </Button>
          <Button href={CTA.demo.href} size="sm">
            {CTA.demo.label}
            <ArrowRight aria-hidden="true" size={16} />
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
