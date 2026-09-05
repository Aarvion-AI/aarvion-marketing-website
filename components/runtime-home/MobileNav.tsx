"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./runtime-home.module.css";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div className={styles.mobileNav}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation">
          <a href="#runtime" onClick={close}>Runtime</a>
          <a href="#routing" onClick={close}>Routing</a>
          <a href="#deployment" onClick={close}>Deployment</a>
          <a href="#product" onClick={close}>Product</a>
          <a href="#cadre" onClick={close}>Cadre</a>
          <a href="https://dashboard.aarvion.ai/" target="_blank" rel="noreferrer" onClick={close}>Log in</a>
          <a className={styles.mobileDemo} href="#demo" onClick={close}>Book a demo</a>
        </nav>
      )}
    </div>
  );
}
