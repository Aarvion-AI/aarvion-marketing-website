"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/site/Button";

export function HeroCapture() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    router.push(`/contact?email=${encodeURIComponent(email)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="hero-email" className="sr-only">
        Work email
      </label>
      <input
        id="hero-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Enter your work email"
        className="h-[3.25rem] flex-1 rounded-md border border-line bg-panel px-4 text-[0.98rem] text-ink shadow-card outline-none transition-[border-color,box-shadow] placeholder:text-ink-dim focus:border-indigo-line focus:ring-4 focus:ring-indigo-pale"
      />
      <Button type="submit" size="lg">
        Book a demo
        <ArrowRight aria-hidden="true" size={17} />
      </Button>
    </form>
  );
}
