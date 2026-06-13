import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { AmplitudeAnalytics } from "@/components/AmplitudeAnalytics";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  PRIMARY_KEYWORDS,
  organizationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aarvion — Govern every AI agent before it touches production",
    template: "%s · Aarvion",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: PRIMARY_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Aarvion — Govern every AI agent before it touches production",
    description:
      "Runtime policy enforcement and cryptographic provenance for enterprise AI agents.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarvion — Govern every AI agent before it touches production",
    description:
      "Runtime policy enforcement and cryptographic provenance for enterprise AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AmplitudeAnalytics />
        <JsonLd
          data={[
            organizationJsonLd(),
            websiteJsonLd(),
            softwareApplicationJsonLd(),
          ]}
        />
        {children}
      </body>
    </html>
  );
}
