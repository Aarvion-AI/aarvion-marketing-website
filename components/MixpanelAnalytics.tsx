"use client";

import { useEffect } from "react";
import { initMixpanel, track } from "@/lib/analytics";

export function MixpanelAnalytics() {
  useEffect(() => {
    initMixpanel();

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLElement>("[data-cta]");
      if (!link) return;
      track("cta_clicked", {
        cta: link.dataset.cta,
        href: link.getAttribute("href"),
        page: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
