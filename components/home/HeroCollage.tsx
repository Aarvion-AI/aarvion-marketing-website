import { CirclePause, CircleX, Check } from "lucide-react";
import { ProvenanceRecord } from "@/components/evidence/ProvenanceRecord";
import { RuntimeDecision } from "@/components/evidence/RuntimeDecision";
import { ImageSlot } from "@/components/site/ImageSlot";

const queue = [
  {
    step: "03 · Transfer",
    note: "Export outside approved region",
    verdict: "BLOCK",
    owner: "Policy · data boundary",
    icon: CircleX,
    tone: "text-red",
  },
  {
    step: "04 · Act",
    note: "Consequential system change",
    verdict: "PARK",
    owner: "Risk owner reviewing",
    icon: CirclePause,
    tone: "text-amber",
  },
  {
    step: "02 · Reason",
    note: "Frontier route approved",
    verdict: "PASS",
    owner: "Authority verified",
    icon: Check,
    tone: "text-green",
  },
];

export function HeroCollage() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-paper-bright shadow-board">
      <ImageSlot id="hero-runtime" fill eager sizes="(min-width: 1280px) 1280px, 100vw" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,250,246,0.35)_0%,rgba(251,250,246,0)_40%,rgba(251,250,246,0.1)_100%)]"
      />

      <div className="relative px-4 pb-4 pt-10 sm:px-10 sm:pb-10 sm:pt-14 lg:px-16 lg:pb-14 lg:pt-16">
        <div className="mx-auto max-w-3xl lg:max-w-[52rem]">
          <RuntimeDecision />
        </div>

        <div className="mt-4 grid gap-4 lg:hidden">
          <div className="rounded-md bg-night p-3">
            <ProvenanceRecord />
          </div>
          <ReviewQueue />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="pointer-events-auto absolute bottom-10 left-8 w-[21rem] -rotate-3 rounded-md bg-night p-3 shadow-canvas xl:left-12">
          <ProvenanceRecord />
        </div>
        <div className="pointer-events-auto absolute bottom-12 right-8 w-[17rem] rotate-2 xl:right-12">
          <ReviewQueue />
        </div>
      </div>
    </div>
  );
}

function ReviewQueue() {
  return (
    <div className="rounded-md border border-line bg-paper-bright p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="mono-label text-ink-dim">Review queue</span>
        <span className="rounded-full bg-tint-sand px-2 py-0.5 text-[0.68rem] font-bold text-amber">
          1 waiting
        </span>
      </div>
      <ul className="mt-3 divide-y divide-line">
        {queue.map(({ step, note, verdict, owner, icon: Icon, tone }) => (
          <li key={step} className="flex items-start gap-3 py-2.5">
            <Icon aria-hidden="true" size={15} className={`mt-0.5 shrink-0 ${tone}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.78rem] font-semibold text-ink">{step}</span>
                <span className={`font-mono text-[0.62rem] font-semibold ${tone}`}>
                  {verdict}
                </span>
              </div>
              <p className="truncate text-[0.72rem] text-ink-muted">{note}</p>
              <p className="text-[0.66rem] text-ink-dim">{owner}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
