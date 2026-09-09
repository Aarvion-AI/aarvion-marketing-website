import {
  BookOpenCheck,
  Check,
  FileText,
  GitCommitHorizontal,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import type { CSSProperties } from "react";
import { RUNTIME_RUN_ID } from "./RuntimeStory";
import styles from "./evidence.module.css";

const policyStages = [
  {
    label: "Start",
    title: "Aarvion policy templates",
    body: "Prebuilt rules for your domain and deployment model.",
    icon: BookOpenCheck,
  },
  {
    label: "Draft",
    title: "Existing operating policies",
    body: "Aarvion turns your current documents into draft runtime rules.",
    icon: FileText,
  },
  {
    label: "Approve",
    title: "Named-owner review",
    body: "Owners edit, test, and sign every rule before enforcement.",
    icon: PenLine,
  },
  {
    label: "Run",
    title: "Approved version",
    body: "The runtime applies it and attaches the version to each verdict.",
    icon: GitCommitHorizontal,
  },
];

export function PolicyWorkbench() {
  return (
    <div className={styles.policyWorkbench} data-evidence>
      <div className={styles.policySources}>
        {policyStages.map(({ label, title, body, icon: Icon }, index) => (
          <article key={title} style={{ "--policy-index": index } as CSSProperties}>
            <span>{label}</span>
            <Icon aria-hidden="true" size={19} strokeWidth={1.5} />
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.policyEditor}>
        <div className={styles.policyEditorTopline}>
          <div>
            <ShieldCheck aria-hidden="true" size={17} />
            <span>{RUNTIME_RUN_ID} · production policy · v14</span>
          </div>
          <span><i /> Signed</span>
        </div>
        <div className={styles.policyRule}>
          <span>WHEN</span>
          <strong>action exceeds delegated authority</strong>
          <span>THEN</span>
          <strong className={styles.parkRule}>PARK for the named owner</strong>
        </div>
        <div className={styles.policyChecks}>
          <span><Check aria-hidden="true" size={14} /> Tested against shadow traffic</span>
          <span><Check aria-hidden="true" size={14} /> Approved by policy owner</span>
          <span><Check aria-hidden="true" size={14} /> Policy version attached to each verdict</span>
        </div>
      </div>
    </div>
  );
}
