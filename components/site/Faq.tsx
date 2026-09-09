import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function Faq({
  items,
  group = "faq",
  className,
}: {
  items: FaqItem[];
  group?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "divide-y divide-line overflow-hidden rounded-lg border border-line bg-paper-bright",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.question} name={group} className="group px-6 sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.02rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink-muted transition-transform duration-200 ease-arrive group-open:rotate-45 group-open:bg-indigo-deep group-open:text-paper-bright"
            >
              <Plus size={15} />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[0.95rem] leading-relaxed text-ink-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
