"use client";

import {
  Bot,
  Check,
  CloudCog,
  Eye,
  LockKeyhole,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  RUNTIME_RUN_ID,
  useRuntimeStory,
  type RuntimeEnvironment,
} from "./RuntimeStory";
import styles from "./runtime-home.module.css";

const environments: Array<{
  id: RuntimeEnvironment;
  label: string;
  note: string;
  icon: typeof Eye;
}> = [
  {
    id: "sandbox",
    label: "Connect",
    note: "Map agents, systems, routes, and authority.",
    icon: Network,
  },
  {
    id: "shadow",
    label: "Shadow",
    note: "Observe decisions without changing production.",
    icon: Eye,
  },
  {
    id: "production",
    label: "Enforce",
    note: "Enforce approved policies after review.",
    icon: ShieldCheck,
  },
];

export function DeploymentStory() {
  const { environment, setEnvironment, route } = useRuntimeStory();
  const index = environments.findIndex((item) => item.id === environment);

  function chooseEnvironment(value: RuntimeEnvironment) {
    setEnvironment(value);
  }

  return (
    <section
      className={`${styles.deploymentStory} ${styles.storyChapter}`}
      data-story-chapter="deployment"
      id="deployment"
    >
      <div className={styles.sectionFrame}>
        <div className={styles.deploymentIntro}>
          <p className={styles.storyChapterLabel}><span>03</span> Deploy</p>
          <h2>Deploy in your cloud. Start in shadow mode.</h2>
          <p>
            Keep agents where they run and deploy Aarvion between them and the
            systems they act on, inside your approved cloud and region. Observe
            decisions in shadow mode first; enforce reviewed policies when you
            are ready.
          </p>
        </div>

        <div className={styles.deploymentConsole}>
          <div className={styles.environmentTabs} role="group" aria-label="Deployment stage">
            {environments.map(({ id, label, icon: Icon }, itemIndex) => (
              <button
                type="button"
                key={id}
                aria-pressed={environment === id}
                className={environment === id ? styles.environmentActive : ""}
                onClick={() => chooseEnvironment(id)}
              >
                <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" size={17} />
                {label}
              </button>
            ))}
          </div>

          <div className={styles.deploymentTopology}>
            <span className={styles.cloudBoundaryLabel}>
              Customer cloud / approved region · {RUNTIME_RUN_ID}
            </span>
            <div className={styles.topologySource}>
              <span><Bot aria-hidden="true" size={17} /> Existing agents</span>
              <span><Workflow aria-hidden="true" size={17} /> A2A workflows</span>
            </div>
            <span className={styles.topologyTrace} aria-hidden="true"><i /></span>
            <div className={styles.topologyRuntime}>
              <CloudCog aria-hidden="true" size={23} />
              <span>Aarvion Runtime</span>
              <small>Customer cloud / VPC</small>
            </div>
            <span className={styles.topologyTrace} aria-hidden="true"><i /></span>
            <div className={styles.topologyBoundary}>
              <LockKeyhole aria-hidden="true" size={20} />
              <span>{environments[index].label} mode</span>
              <small>{environments[index].note}</small>
            </div>
          </div>

          <div className={styles.boundaryRows}>
            <div><span>Eligible route</span><strong>{route[0].toUpperCase() + route.slice(1)}</strong><i><Check size={13} /></i></div>
            <div><span>Delegated authority</span><strong>Read + recommend</strong><i><Check size={13} /></i></div>
            <div><span>Required approver</span><strong>Named owner</strong><i><Check size={13} /></i></div>
            <div><span>Signed record</span><strong>Recorded</strong><i><Check size={13} /></i></div>
          </div>
        </div>
      </div>
    </section>
  );
}
