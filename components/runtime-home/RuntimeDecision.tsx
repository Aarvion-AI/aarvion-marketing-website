"use client";

import {
  Bot,
  Check,
  Fingerprint,
  GitBranch,
  PackageOpen,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useRuntimeStory, type RuntimeRoute } from "./RuntimeStory";
import styles from "./runtime-home.module.css";

const routeCopy: Record<RuntimeRoute, { label: string; reason: string; state: string }> = {
  frontier: {
    label: "Frontier",
    reason: "Capability requirement met",
    state: "Approved",
  },
  local: {
    label: "Local",
    reason: "System proximity preferred",
    state: "Approved",
  },
  sovereign: {
    label: "Sovereign",
    reason: "Data boundary required",
    state: "Approved",
  },
};

export function RuntimeDecision({ compact = false }: { compact?: boolean }) {
  const { source, setSource, route, setRoute, setVerdict } = useRuntimeStory();
  const selected = routeCopy[route];

  return (
    <figure
      aria-label="Illustrative runtime routing decision"
      className={`${styles.runtimeDecision} ${compact ? styles.compactDecision : ""}`}
    >
      <div className={styles.decisionTopline}>
        <div className={styles.sourceToggle} role="group" aria-label="Agent source">
          <button
            type="button"
            aria-pressed={source === "agents"}
            onClick={() => setSource("agents")}
          >
            <Bot aria-hidden="true" size={15} /> Existing agents
          </button>
          <button
            type="button"
            aria-pressed={source === "cadre"}
            onClick={() => setSource("cadre")}
          >
            <PackageOpen aria-hidden="true" size={15} /> Cadre pack
          </button>
        </div>
        <span className={styles.illustrativeLabel}>Illustrative runtime decision</span>
      </div>

      <div className={styles.decisionGrid}>
        <section>
          <div className={styles.decisionLabel}>
            <GitBranch aria-hidden="true" size={16} /> Route
          </div>
          <p>Select an eligible route</p>
          <div className={styles.routeButtons}>
            {(Object.keys(routeCopy) as RuntimeRoute[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={route === value}
                onClick={() => {
                  setRoute(value);
                  setVerdict("PASS");
                }}
              >
                <span>{routeCopy[value].label}</span>
                <small>{value === route ? "Selected" : "Eligible"}</small>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className={styles.decisionLabel}>
            <ShieldCheck aria-hidden="true" size={16} /> Policy
          </div>
          <p>Check the action against policy</p>
          <ul className={styles.checkList}>
            <li><Check aria-hidden="true" size={13} /> Model route</li>
            <li><Check aria-hidden="true" size={13} /> Data boundary</li>
            <li><Check aria-hidden="true" size={13} /> System access</li>
          </ul>
        </section>

        <section>
          <div className={styles.decisionLabel}>
            <Fingerprint aria-hidden="true" size={16} /> Authority
          </div>
          <p>Check delegated authority</p>
          <div className={styles.authorityBox}>
            <small>Action scope</small>
            <strong>Prepare + recommend</strong>
          </div>
          <span className={styles.statusApproved}>Authority verified</span>
        </section>

        <section>
          <div className={styles.decisionLabel}>
            <UserRoundCheck aria-hidden="true" size={16} /> Approval
          </div>
          <p>Park actions that require human approval</p>
          <div className={styles.approvalRows}>
            <span><i /> Risk owner <small>Reviewing</small></span>
            <span><i /> Business owner <small>Queued</small></span>
            <span><i /> Operator <small>Notified</small></span>
          </div>
        </section>
      </div>

      {!compact && (
        <div className={styles.decisionOutcome}>
          <div>
            <small>Selected route</small>
            <strong>{selected.label}</strong>
          </div>
          <div>
            <small>Reason</small>
            <strong>{selected.reason}</strong>
          </div>
          <div>
            <small>Route status</small>
            <strong>{selected.state}</strong>
          </div>
          <Check aria-hidden="true" size={21} />
        </div>
      )}
    </figure>
  );
}
