import type { Metadata } from "next";
import { RuntimeHome } from "@/components/runtime-home/RuntimeHome";

export const metadata: Metadata = {
  title: "The enterprise agent runtime",
  description:
    "Run your agents or start with a Cadre pack. Aarvion routes each workflow step, checks delegated authority, and records the decision across handoffs.",
};

export default function Home() {
  return <RuntimeHome />;
}
