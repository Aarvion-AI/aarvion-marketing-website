import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aarvion.ai"),
  title: {
    default: "Aarvion — Govern every AI agent before it touches production",
    template: "%s · Aarvion",
  },
  description:
    "Aarvion is the runtime proxy between your AI agents and your enterprise systems. Block unsafe actions in <5ms. Hand your regulator a cryptographically signed audit in 90 seconds.",
  openGraph: {
    title: "Aarvion — Govern every AI agent before it touches production",
    description:
      "Runtime policy enforcement and cryptographic provenance for enterprise AI agents.",
    url: "https://www.aarvion.ai",
    siteName: "Aarvion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Aarvion" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
