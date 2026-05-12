import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TheLoop } from "@/components/TheLoop";
import { Primitives } from "@/components/Primitives";
import { Anatomy } from "@/components/Anatomy";
import { Audiences } from "@/components/Audiences";
import { Comparison } from "@/components/Comparison";
import { DesignPartnership } from "@/components/DesignPartnership";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TheLoop />
        <Primitives />
        <Anatomy />
        <Audiences />
        <Comparison />
        <DesignPartnership />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
