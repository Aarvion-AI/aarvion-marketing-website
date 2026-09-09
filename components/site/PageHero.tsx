import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function PageHero({
  label,
  title,
  body,
  children,
  align = "center",
}: {
  label?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-14 lg:pt-24">
      <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 h-[32rem]" />
      <Container className="relative">
        <div
          className={cn(
            "flex flex-col",
            centered ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl items-start",
          )}
        >
          {label && <span className="mono-label animate-rise text-indigo">{label}</span>}
          <h1
            className="display-xl animate-rise mt-4 text-balance"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>
          {body && (
            <p
              className="animate-rise mt-6 max-w-2xl text-balance text-[1.08rem] leading-relaxed text-ink-muted sm:text-[1.15rem]"
              style={{ animationDelay: "160ms" }}
            >
              {body}
            </p>
          )}
          {children && (
            <div
              className={cn("animate-rise mt-9 flex flex-wrap gap-3", centered && "justify-center")}
              style={{ animationDelay: "240ms" }}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
