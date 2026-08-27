import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
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

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aarvion — The enterprise agent runtime",
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
    title: "Aarvion — The enterprise agent runtime",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarvion — The enterprise agent runtime",
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <template
          data-direction-contract="aarvion-runtime-plane"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Aarvion turns a fragmented agent estate into one controllable runtime across every consequential handoff.
OWN-WORLD: A slanted mineral-indigo runtime plane sits between agents above and enterprise systems below.
STORY: Bring your agents or start with Cadre; route each step across frontier, local, or sovereign execution; check policy and delegated authority; review when required; preserve the record.
FIRST VIEWPORT: Warm mineral field, left-aligned enterprise promise, live source map, and a full-width runtime plane already making an illustrative decision.
FORM: seed key 8749a56a; position 4 — layered infrastructural plane, dense operating interface, abrupt light-to-dark chapter breaks.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
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
