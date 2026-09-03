"use client";

import {
  ArrowRight,
  Bot,
  Check,
  CirclePause,
  CircleX,
  Cloud,
  Database,
  Fingerprint,
  GitBranch,
  Laptop,
  LockKeyhole,
  Orbit,
  Server,
} from "lucide-react";
import { useState, type CSSProperties } from "react";
import {
  RUNTIME_RUN_ID,
  useRuntimeStory,
  type RuntimeRoute,
  type RuntimeVerdict,
} from "./RuntimeStory";
import styles from "./runtime-home.module.css";

const workflowSteps: Array<{
  name: string;
  detail: string;
  route: RuntimeRoute;
  routeLabel: string;
  reason: string;
  authority: string;
  verdict: RuntimeVerdict;
  icon: typeof Bot;
}> = [
  {
    name: "Classify",
    detail: "Low-cost, low-latency step",
    route: "local",
    routeLabel: "Local",
    reason: "Runs near the source system",
    authority: "Read + classify",
    verdict: "PASS",
    icon: Laptop,
  },
  {
    name: "Reason",
    detail: "Complex judgment required",
    route: "frontier",
    routeLabel: "Frontier",
    reason: "Selected model meets the workflow’s capability requirement",
    authority: "Prepare recommendation",
    verdict: "PASS",
    icon: Orbit,
  },
  {
    name: "Transfer",
    detail: "Data export outside the approved region",
    route: "sovereign",
    routeLabel: "Sovereign",
    reason: "Requested destination falls outside the approved region",
    authority: "No external export",
    verdict: "BLOCK",
    icon: LockKeyhole,
  },
  {
    name: "Act",
    detail: "Consequential system change",
    route: "local",
    routeLabel: "Local",
    reason: "Runs near the target system",
    authority: "Human approval required",
    verdict: "PARK",
    icon: Database,
  },
];

const routes: Array<{ id: RuntimeRoute; label: string; icon: typeof Cloud }> = [
  { id: "frontier", label: "Frontier", icon: Cloud },
  { id: "local", label: "Local", icon: Server },
  { id: "sovereign", label: "Sovereign", icon: LockKeyhole },
];

export function ConditionalRouting() {
  const [activeStep, setActiveStep] = useState(0);
  const { setRoute, setVerdict } = useRuntimeStory();
  const step = workflowSteps[activeStep];

  function chooseStep(index: number) {
    setActiveStep(index);
    setRoute(workflowSteps[index].route);
    setVerdict(workflowSteps[index].verdict);
  }

  return (
    <section
      className={`${styles.routingStory} ${styles.storyChapter}`}
      data-story-chapter="routing"
      id="routing"
    >
      <div className={styles.sectionFrame}>
        <div className={styles.routingStoryCopy}>
          <p className={styles.storyChapterLabel}><span>01</span> Route</p>
          <h2>Choose frontier, local, or sovereign execution at each step.</h2>
          <p>
            Use an approved frontier model for complex reasoning, run routine
            steps locally, and keep restricted data inside sovereign
            infrastructure. Aarvion chooses per handoff, so one workflow can
            span all three.
          </p>
        </div>

        <div className={styles.routingCanvas}>
          <div className={styles.routingCanvasTopline}>
            <div>
              <GitBranch aria-hidden="true" size={16} />
              <span>{RUNTIME_RUN_ID} · A2A workflow · 4 steps</span>
            </div>
            <span><i /> Routing policy active</span>
          </div>

          <div
            className={styles.workflowRail}
            aria-label="Workflow steps"
            style={{
              "--active-step": activeStep,
              "--active-progress": activeStep / (workflowSteps.length - 1),
            } as CSSProperties}
          >
            {workflowSteps.map(({ name, detail, icon: Icon }, index) => (
              <button
                className={index === activeStep ? styles.workflowStepActive : ""}
                key={name}
                type="button"
                aria-pressed={index === activeStep}
                onClick={() => chooseStep(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                <strong>{name}</strong>
                <small>{detail}</small>
              </button>
            ))}
          </div>

          <div className={styles.routingResolution} aria-live="polite">
            <div className={styles.routeEligibility}>
              <span className={styles.canvasLabel}>Eligible routes</span>
              {routes.map(({ id, label, icon: Icon }) => (
                <div
                  className={id === step.route ? styles.routeResolved : ""}
                  key={id}
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.5} />
                  <span>{label}</span>
                  <small>{id === step.route ? "Selected" : "Eligible"}</small>
                </div>
              ))}
            </div>

            <div className={styles.routeDecisionCard}>
              <span className={styles.canvasLabel}>Step {activeStep + 1} decision</span>
              <strong>{step.routeLabel}</strong>
              <p>{step.reason}</p>
              <dl>
                <div>
                  <dt>Authority</dt>
                  <dd><Fingerprint aria-hidden="true" size={14} /> {step.authority}</dd>
                </div>
                <div>
                  <dt>Gate</dt>
                  <dd
                    className={
                      step.verdict === "PARK"
                        ? styles.verdictPark
                        : step.verdict === "BLOCK"
                          ? styles.verdictBlock
                          : styles.verdictPass
                    }
                  >
                    {step.verdict === "PARK" ? (
                      <CirclePause aria-hidden="true" size={14} />
                    ) : step.verdict === "BLOCK" ? (
                      <CircleX aria-hidden="true" size={14} />
                    ) : (
                      <Check aria-hidden="true" size={14} />
                    )}
                    {step.verdict}
                  </dd>
                </div>
              </dl>
            </div>

            <div className={styles.handoffRecord}>
              <span className={styles.canvasLabel}>Signed record</span>
              <div>
                <small>From</small>
                <strong>{activeStep === 0 ? "Workflow" : workflowSteps[activeStep - 1].name}</strong>
              </div>
              <ArrowRight aria-hidden="true" size={17} />
              <div>
                <small>To</small>
                <strong>{step.name}</strong>
              </div>
              <p><Check aria-hidden="true" size={13} /> Route, authority, and verdict recorded</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
