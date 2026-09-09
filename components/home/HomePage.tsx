import { StoryMotionShell } from "@/components/evidence/StoryMotionShell";
import { ClosingCta } from "@/components/site/ClosingCta";
import { FeatureBento } from "./FeatureBento";
import { Hero } from "./Hero";
import { HomeFaq } from "./HomeFaq";
import { HowItWorks } from "./HowItWorks";
import { OnRamps } from "./OnRamps";
import { Operate } from "./Operate";
import { ProofBar } from "./ProofBar";
import { Stats } from "./Stats";

export function HomePage() {
  return (
    <StoryMotionShell>
      <main id="main-content">
        <Hero />
        <ProofBar />
        <HowItWorks />
        <FeatureBento />
        <Operate />
        <Stats />
        <OnRamps />
        <HomeFaq />
        <ClosingCta />
      </main>
    </StoryMotionShell>
  );
}
