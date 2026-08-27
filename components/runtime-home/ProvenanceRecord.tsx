"use client";

import { RUNTIME_RUN_ID, useRuntimeStory } from "./RuntimeStory";
import styles from "./runtime-home.module.css";

const routeLabels = {
  frontier: "Frontier",
  local: "Local",
  sovereign: "Sovereign",
} as const;

export function ProvenanceRecord() {
  const { route, verdict } = useRuntimeStory();
  const decisionClass =
    verdict === "PASS"
      ? styles.approved
      : verdict === "PARK"
        ? styles.parked
        : styles.blocked;

  return (
    <div className={styles.provenanceStrip} aria-live="polite" aria-atomic="true">
      <p>Signed record · {RUNTIME_RUN_ID}</p>
      <dl>
        <div><dt>Decision</dt><dd className={decisionClass}>{verdict}</dd></div>
        <div><dt>Route</dt><dd>{routeLabels[route]}</dd></div>
        <div><dt>Policy</dt><dd>Action policy · v14</dd></div>
        <div><dt>Authority</dt><dd>{verdict === "PASS" ? "Verified" : verdict === "PARK" ? "Exceeded" : "Denied"}</dd></div>
        <div><dt>Review</dt><dd>{verdict === "PASS" ? "Not required" : verdict === "PARK" ? "Required" : "Unavailable"}</dd></div>
        <div><dt>Record</dt><dd className={styles.recorded}>Signed</dd></div>
      </dl>
    </div>
  );
}
