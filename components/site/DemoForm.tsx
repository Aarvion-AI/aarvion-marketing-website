"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-md border border-line bg-panel px-3.5 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-dim focus:border-indigo-line focus:ring-4 focus:ring-indigo-pale";

export function DemoForm({
  defaultEmail = "",
  className,
}: {
  defaultEmail?: string;
  className?: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We couldn't send your request.");
      form.reset();
      setState("success");
      setMessage("Thanks. We'll follow up within one business day to schedule the demo.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : `We couldn't send your request. Email ${SITE.salesEmail} instead.`,
      );
    }
  }

  return (
    <form
      id="demo-form"
      onSubmit={onSubmit}
      className={cn(
        "rounded-lg border border-line bg-paper-bright p-6 shadow-card sm:p-8",
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={defaultEmail}
        />
        <Field label="Company" name="company" autoComplete="organization" required />
        <Field label="Role" name="role" autoComplete="organization-title" />
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="demo-context" className="text-[0.85rem] font-semibold text-ink-soft">
          What do you want to put into production?
        </label>
        <textarea
          id="demo-context"
          name="context"
          rows={4}
          required
          placeholder="An existing agent, a workflow, or a Cadre pack or blueprint"
          className={cn(fieldClass, "h-auto resize-y py-3")}
        />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={state === "loading"}>
          {state === "loading" ? "Sending…" : "Book a demo"}
          <ArrowRight aria-hidden="true" size={17} />
        </Button>
        <a
          href={`mailto:${SITE.salesEmail}`}
          className="text-[0.9rem] font-semibold text-ink-muted hover:text-ink"
        >
          Or email {SITE.salesEmail}
        </a>
      </div>
      <p
        aria-live="polite"
        className={cn(
          "mt-4 min-h-6 text-[0.88rem]",
          state === "error" ? "text-red" : "text-green",
        )}
      >
        {message}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const id = `demo-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.85rem] font-semibold text-ink-soft">
        {label}
        {required && (
          <span aria-hidden="true" className="text-ink-dim">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        className={fieldClass}
      />
    </div>
  );
}
