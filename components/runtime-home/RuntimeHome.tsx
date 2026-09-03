import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  Check,
  CloudCog,
  Database,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Network,
  Orbit,
  PackageOpen,
  Server,
  ShieldCheck,
  UserRoundCheck,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { AdoptionPaths } from "./AdoptionPaths";
import { ConditionalRouting } from "./ConditionalRouting";
import { DemoDisclosure } from "./DemoForm";
import { DeploymentStory } from "./DeploymentStory";
import { MobileNav } from "./MobileNav";
import { PolicyActivation } from "./PolicyActivation";
import { ProvenanceRecord } from "./ProvenanceRecord";
import { RuntimeDecision } from "./RuntimeDecision";
import { RUNTIME_RUN_ID } from "./RuntimeStory";
import { RuntimeStoryArc } from "./RuntimeStoryArc";
import { StoryMotionShell } from "./StoryMotionShell";
import styles from "./runtime-home.module.css";

const executionTargets = [
  {
    label: "Models",
    detail: "Frontier · local · sovereign",
    icon: Orbit,
  },
  {
    label: "Agents",
    detail: "First-party · third-party",
    icon: Bot,
  },
  {
    label: "Tools",
    detail: "Studios · APIs · custom code",
    icon: Braces,
  },
];

const systems = [
  { label: "Core systems", icon: Server },
  { label: "Data warehouse", icon: Database },
  { label: "Document service", icon: FileCheck2 },
  { label: "Internal API", icon: Braces },
  { label: "Private cloud", icon: CloudCog },
  { label: "Service desk", icon: Workflow },
];

const runtimeSteps = [
  { label: "Route", icon: GitBranch },
  { label: "Policy", icon: ShieldCheck },
  { label: "Authority", icon: Fingerprint },
  { label: "Review", icon: UserRoundCheck },
];

const capabilityNotes = [
  {
    title: "Approved routes",
    body: "Aarvion selects an approved model or agent for each workflow step.",
    tone: "green",
  },
  {
    title: "Delegated authority",
    body: "Aarvion checks the action against its delegated scope and owner.",
    tone: "blue",
  },
  {
    title: "Human review",
    body: "Actions outside delegated authority wait for the designated approver.",
    tone: "amber",
  },
  {
    title: "Signed record",
    body: "The runtime signs a record of the route, policy, authority, and approval state.",
    tone: "slate",
  },
];

const dashboardNav: { label: string; icon: LucideIcon }[] = [
  { label: "Overview", icon: Boxes },
  { label: "Fleet", icon: Bot },
  { label: "Policies", icon: ShieldCheck },
  { label: "Routing", icon: Waypoints },
  { label: "Activity", icon: Workflow },
  { label: "Provenance", icon: Fingerprint },
];

export function RuntimeHome() {
  return (
    <StoryMotionShell>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <header className={styles.navShell}>
        <a className={styles.brand} href="#top" aria-label="Aarvion home">
          <LogoMark size={27} className={styles.brandMark} />
          <span>Aarvion</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <a href="#runtime">Runtime</a>
          <a href="#routing">Routing</a>
          <a href="#deployment">Deployment</a>
          <a href="#product">Product</a>
          <a href="#cadre">Cadre</a>
        </nav>

        <div className={styles.navActions}>
          <a href="https://dev.aarvion.ai/" target="_blank" rel="noreferrer">
            Log in
          </a>
          <a className={styles.navCta} href="#demo">
            Book a demo
          </a>
        </div>

        <MobileNav />
      </header>

      <main id="main-content">
        <section className={styles.hero} id="top">
          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
              <h1>
                The runtime for enterprise agents.
                <br /> From pilot to production.
              </h1>
              <p>
                Bring the agents you already use or start with a Cadre pack. For
                every workflow step, Aarvion selects an approved model or
                environment, checks the action against delegated authority, and
                writes the handoff to a signed record.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#demo">
                  Book a demo <ArrowRight aria-hidden="true" size={17} />
                </a>
                <a className={styles.textButton} href="#runtime">
                  Explore the runtime <ArrowRight aria-hidden="true" size={17} />
                </a>
              </div>
            </div>

            <div className={styles.entryPaths} aria-label="Ways to start with Aarvion">
              <a className={styles.entryPath} href="#bring-your-agents">
                <Network aria-hidden="true" size={20} strokeWidth={1.5} />
                <span>
                  <small>Bring your agents</small>
                  <strong>Connect your agent stack</strong>
                </span>
              </a>
              <a
                className={styles.entryPath}
                href="https://cadreagents.com"
                target="_blank"
                rel="noreferrer"
              >
                <PackageOpen aria-hidden="true" size={20} strokeWidth={1.5} />
                <span>
                  <small>Start with Cadre</small>
                  <strong>Choose a pack or blueprint</strong>
                </span>
              </a>
            </div>
          </div>

          <div className={styles.runtimePlane} id="runtime">
            <div className={styles.planeInner}>
              <div className={styles.runtimeTopology} data-evidence>
                <div className={styles.runtimeCore}>
                  <div className={styles.runtimeBrand}>
                    <LogoMark size={30} className={styles.inverseMark} />
                    <span>Aarvion Runtime</span>
                  </div>
                  <RuntimeDecision compact />
                </div>
                <aside
                  className={styles.approvedExecution}
                  aria-label="Approved models, agents, and tools"
                >
                  <div className={styles.executionHeading}>
                    <h2>Approved routes</h2>
                    <p>Models, agents, and tools selected for each step.</p>
                  </div>
                  <div className={styles.executionTargets}>
                    {executionTargets.map(({ label, detail, icon: Icon }) => (
                      <div className={styles.executionTarget} key={label}>
                        <Icon aria-hidden="true" size={18} strokeWidth={1.55} />
                        <span>
                          <strong>{label}</strong>
                          <small>{detail}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className={styles.executionRule}>By task · data · region</span>
                </aside>
              </div>
              <div className={styles.systemArea}>
                <p>Enterprise systems</p>
                <div className={styles.systemGrid}>
                  {systems.map(({ label, icon: Icon }) => (
                    <div key={label}>
                      <Icon aria-hidden="true" size={16} strokeWidth={1.5} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ProvenanceRecord />
            </div>
          </div>
        </section>

        <RuntimeStoryArc
          overview={
            <section className={styles.consequence} aria-labelledby="consequence-title">
              <div className={styles.sectionFrame}>
                <div className={styles.consequenceCopy}>
                  <h2 id="consequence-title">
                    Control every handoff between agents and enterprise systems.
                  </h2>
                  <p>
                    At each step, Aarvion chooses where the work runs, checks policy
                    and delegated authority, and records the outcome before the
                    workflow continues.
                  </p>
                </div>
                <div className={styles.stepLine} data-evidence>
                  {runtimeSteps.map(({ label, icon: Icon }) => (
                    <div className={styles.stepMarker} key={label}>
                      <div>
                        <Icon aria-hidden="true" size={27} strokeWidth={1.5} />
                      </div>
                      <span>{label}</span>
                    </div>
                  ))}
                  <div className={styles.stepMarker}>
                    <div className={styles.actionMarker}>
                      <Check aria-hidden="true" size={27} strokeWidth={1.6} />
                    </div>
                    <span>Act</span>
                  </div>
                </div>
              </div>
            </section>
          }
        >
          <ConditionalRouting />

          <PolicyActivation />

          <DeploymentStory />

          <section
            className={`${styles.productStage} ${styles.storyChapter}`}
            data-story-chapter="product"
            id="product"
          >
            <div className={styles.sectionFrame}>
              <div className={styles.productIntro}>
                <p className={styles.storyChapterLabel}><span>04</span> Operate</p>
                <h2>See what every agent did, why it was allowed, and who approved it.</h2>
                <p>
                  Monitor connected agents, clear actions waiting for review,
                  and open the signed record behind each production change.
                </p>
              </div>
              <div className={styles.productSurface} data-evidence>
                <RuntimeDashboard />
                <div className={styles.productFacts}>
                  {capabilityNotes.map((note) => (
                    <article key={note.title}>
                      <span className={styles[note.tone]} aria-hidden="true" />
                      <div>
                        <h3>{note.title}</h3>
                        <p>{note.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RuntimeStoryArc>

        <AdoptionPaths />

        <section className={styles.demoSection} id="demo">
          <div className={styles.sectionFrame}>
            <div className={styles.demoCopy}>
              <h2>Start with one workflow that needs to reach production.</h2>
              <p>
                Bring a workflow you already run, or start with a Cadre pack or
                blueprint. We’ll define where each step can run, what the agents
                may do, and when a named owner must review the action.
              </p>
              <div className={styles.runtimeLockup}>
                <LogoMark size={31} className={styles.inverseMark} />
                <span>Aarvion Runtime</span>
              </div>
            </div>
            <div><DemoDisclosure /></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <a className={styles.footerBrand} href="#top" aria-label="Aarvion home">
            <LogoMark size={25} className={styles.inverseMark} />
            <span>Aarvion</span>
          </a>
          <span>© {new Date().getFullYear()} Aarvion</span>
        </div>
        <nav aria-label="Footer navigation">
          <a href="https://cadreagents.com" target="_blank" rel="noreferrer">Cadre</a>
          <a href="mailto:sales@aarvion.ai">sales@aarvion.ai</a>
          <a href="https://dev.aarvion.ai/" target="_blank" rel="noreferrer">Product login</a>
        </nav>
      </footer>
    </StoryMotionShell>
  );
}

function RuntimeDashboard() {
  const trace = [
    ["01", "Classify", "Local", "PASS"],
    ["02", "Reason", "Frontier", "PASS"],
    ["03", "Transfer", "Sovereign", "BLOCK"],
    ["04", "Act", "Local", "PARK"],
  ];

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
            <div className={styles.inspectorVerdict}><span>BLOCK</span><p>Requested destination falls outside the approved region.</p></div>
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
