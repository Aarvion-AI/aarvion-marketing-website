import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Threat } from "@/components/Threat";
import { WhatAarvionDoes } from "@/components/WhatAarvionDoes";
import { TheLoop } from "@/components/TheLoop";
import { Anatomy } from "@/components/Anatomy";
import { Audiences } from "@/components/Audiences";
import { Comparison } from "@/components/Comparison";
import { WhoFor } from "@/components/WhoFor";
import { DesignPartnership } from "@/components/DesignPartnership";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { HOME_FAQS, faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Threat />
        <WhatAarvionDoes />
        <TheLoop />
        <Anatomy />
        <Audiences />
        <Comparison />
        <WhoFor />
        <DesignPartnership />
        <Faq items={HOME_FAQS} />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
