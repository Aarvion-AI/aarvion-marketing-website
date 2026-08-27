"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { RuntimeStoryProvider } from "./RuntimeStory";
import styles from "./runtime-home.module.css";

export function StoryMotionShell({ children }: { children: ReactNode }) {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const targets = Array.from(
      shell.querySelectorAll<HTMLElement>("[data-evidence]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    shell.dataset.motionReady = "true";

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => {
        target.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.siteShell} ref={shellRef}>
      <RuntimeStoryProvider>{children}</RuntimeStoryProvider>
    </div>
  );
}
