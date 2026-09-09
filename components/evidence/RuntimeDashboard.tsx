import {
  Bot,
  Boxes,
  Fingerprint,
  ShieldCheck,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/site/Logo";
import { RUNTIME_RUN_ID } from "./RuntimeStory";
import styles from "./evidence.module.css";

const dashboardNav: { label: string; icon: LucideIcon }[] = [
  { label: "Overview", icon: Boxes },
  { label: "Fleet", icon: Bot },
  { label: "Policies", icon: ShieldCheck },
  { label: "Routing", icon: Waypoints },
  { label: "Activity", icon: Workflow },
  { label: "Provenance", icon: Fingerprint },
];

const trace = [
  ["01", "Classify", "Local", "PASS"],
  ["02", "Reason", "Frontier", "PASS"],
  ["03", "Transfer", "Sovereign", "BLOCK"],
  ["04", "Act", "Local", "PARK"],
];

export function RuntimeDashboard() {
  return (
    <figure className={styles.dashboardShell} id="decision-run">
      <figcaption className={styles.srOnly}>
        Illustrative Aarvion decision trace with example data
      </figcaption>
      <div className={styles.dashboardSidebar} aria-hidden="true">
        <div className={styles.dashboardBrand}>
          <LogoMark size={20} className={styles.inverseMark} />
          <span>Aarvion</span>
        </div>
        {dashboardNav.map(({ label, icon: Icon }) => (
          <div className={label === "Activity" ? styles.dashboardNavActive : ""} key={label}>
            <Icon aria-hidden="true" size={14} strokeWidth={1.5} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className={styles.dashboardMain}>
        <div className={styles.dashboardTopline}>
          <span>{RUNTIME_RUN_ID} · Production workflow</span>
          <span>Policy v14 · signed</span>
        </div>
        <div className={styles.decisionWorkspace}>
          <div className={styles.decisionTracePanel}>
            <div className={styles.panelHeading}>
              <span>Decision trace</span>
              <small>One workflow · four route decisions</small>
            </div>
            {trace.map(([index, step, route, verdict]) => (
              <div className={styles.decisionTraceRow} key={step}>
                <small>{index}</small>
                <span>{step}</span>
                <strong>{route}</strong>
                <em className={styles[`trace${verdict}`]}>{verdict}</em>
              </div>
            ))}
          </div>
          <div className={styles.decisionInspector}>
            <div className={styles.panelHeading}>
              <span>03 · Transfer</span>
              <small>Restricted export attempt</small>
            </div>
            <div className={styles.inspectorVerdict}>
              <span>BLOCK</span>
              <p>Requested destination falls outside the approved region.</p>
            </div>
            <dl>
              <div><dt>Selected route</dt><dd>Sovereign</dd></div>
              <div><dt>Policy</dt><dd>Data boundary · v14</dd></div>
              <div><dt>Authority</dt><dd>No external export</dd></div>
              <div><dt>Approval owner</dt><dd>Not applicable — action blocked</dd></div>
            </dl>
          </div>
        </div>
        <div className={styles.dashboardRecord}>
          <span>{RUNTIME_RUN_ID}</span>
          <div><small>Decision</small><strong>BLOCK</strong></div>
          <div><small>Route</small><strong>Sovereign</strong></div>
          <div><small>Authority</small><strong>Denied</strong></div>
          <div><small>Record</small><strong>Signed</strong></div>
        </div>
      </div>
    </figure>
  );
}
