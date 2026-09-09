import type { MetadataRoute } from "next";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Enterprise Agent Runtime`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#f6f3ec",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
