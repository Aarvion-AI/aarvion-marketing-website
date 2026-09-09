import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function AnnouncementPill({
  href,
  badge,
  children,
}: {
  href: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-paper-bright py-1.5 pl-1.5 pr-4 text-[0.85rem] font-medium text-ink-soft shadow-card transition-colors hover:border-indigo-line"
    >
      <span className="rounded-full bg-tint-mint px-2.5 py-1 text-[0.72rem] font-bold text-green">
        {badge}
      </span>
      <span className="truncate">{children}</span>
      <ArrowRight
        aria-hidden="true"
        size={14}
        className="shrink-0 text-ink-dim transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
