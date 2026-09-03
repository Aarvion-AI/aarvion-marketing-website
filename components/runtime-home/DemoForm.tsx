"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./runtime-home.module.css";

type FormState = "idle" | "loading" | "success" | "error";

export function DemoForm() {
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
      if (!response.ok) throw new Error(result.error || "We couldn’t send your request.");
      form.reset();
      setState("success");
      setMessage("Thanks. We’ll follow up to schedule the demo.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t send your request. Email sales@aarvion.ai instead.",
      );
    }
  }

  return (
    <form id="demo-form" className={styles.demoForm} onSubmit={onSubmit}>
      <div className={styles.formHeading}>
        <span>Book a demo</span>
        <small>Tell us what you run today or want to build.</small>
      </div>
      <div className={styles.formGrid}>
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Work email" name="email" type="email" autoComplete="email" required />
        <Field label="Company" name="company" autoComplete="organization" required />
        <Field label="Role" name="role" autoComplete="organization-title" />
      </div>
      <div className={styles.formField}>
        <label htmlFor="demo-context">What do you want to put into production?</label>
        <textarea
          id="demo-context"
          name="context"
          rows={3}
          required
          placeholder="An existing agent, a workflow, or a Cadre pack or blueprint"
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Sending…" : "Book a demo"}
          <ArrowRight aria-hidden="true" size={17} />
        </button>
        <a href="mailto:sales@aarvion.ai">sales@aarvion.ai</a>
      </div>
      <p
        className={state === "error" ? styles.formError : styles.formMessage}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}

export function DemoDisclosure() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#demo") setOpen(true);
    };

    const openFromDemoLink = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a[href="#demo"]')) {
        setOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    document.addEventListener("click", openFromDemoLink);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
      document.removeEventListener("click", openFromDemoLink);
    };
  }, []);

  if (open) return <DemoForm />;

  return (
    <div className={styles.demoDisclosure}>
      <button
        type="button"
        aria-expanded="false"
        aria-controls="demo-form"
        onClick={() => setOpen(true)}
      >
        Book a demo <ArrowRight aria-hidden="true" size={18} />
      </button>
      <span>Or email <a href="mailto:sales@aarvion.ai">sales@aarvion.ai</a></span>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = `demo-${name}`;
  return (
    <div className={styles.formField}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        autoFocus={name === "name"}
      />
    </div>
  );
}
