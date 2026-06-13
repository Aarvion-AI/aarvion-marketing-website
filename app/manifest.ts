import type { MetadataRoute } from "next";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — AI Agent Governance`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#07090d",
    theme_color: "#07090d",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
    ],
  };
}
