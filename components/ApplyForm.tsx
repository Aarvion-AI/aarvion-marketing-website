"use client";

import { useState } from "react";

type State = "idle" | "loading" | "ok" | "error";

export function ApplyForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setState("ok");
      setMessage("Got it. We'll be in touch within two business days.");
      form.reset();
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Email sales@aarvion.ai."
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border/80 bg-panel/40 p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company" name="company" required />
        <Field label="Role" name="role" placeholder="CIO, Head of AI, etc." />
      </div>
      <div className="mt-4">
        <label className="block text-xs uppercase tracking-wider font-mono text-fg-dim">
          The agent or workflow you&apos;re trying to unblock
        </label>
        <textarea
          name="context"
          rows={3}
          required
          placeholder="One sentence is fine — e.g. underwriting copilot stuck in compliance review since March."
          className="mt-2 w-full rounded-md border border-border bg-bg-elev px-3 py-2 text-sm text-fg placeholder:text-fg-dim focus:border-cyan/60 focus:outline-none focus:ring-1 focus:ring-cyan/40"
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:bg-cyan disabled:opacity-60 transition-colors"
        >
          {state === "loading" ? "Sending…" : "Apply for design partnership"}
          <span aria-hidden>→</span>
        </button>
        <p className="text-xs text-fg-dim">
          Or email{" "}
          <a
            href="mailto:sales@aarvion.ai"
            className="text-fg hover:text-cyan transition-colors"
          >
            sales@aarvion.ai
          </a>{" "}
          directly.
        </p>
      </div>
      {state === "ok" && (
        <p className="mt-4 text-sm text-green">{message}</p>
      )}
      {state === "error" && (
        <p className="mt-4 text-sm text-red">{message}</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-mono text-fg-dim">
        {label}
        {required && <span className="text-red/80 ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-border bg-bg-elev px-3 py-2 text-sm text-fg placeholder:text-fg-dim focus:border-cyan/60 focus:outline-none focus:ring-1 focus:ring-cyan/40"
      />
    </div>
  );
}
