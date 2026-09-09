import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/site/JsonLd";
import { DEFAULT_DESCRIPTION, HOME_FAQS, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The enterprise agent runtime",
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[faqJsonLd(HOME_FAQS)]} />
      <HomePage />
    </>
  );
}
