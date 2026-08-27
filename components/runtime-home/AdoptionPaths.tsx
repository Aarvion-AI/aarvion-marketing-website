import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  Network,
  PackageOpen,
  ShieldCheck,
  SquareTerminal,
} from "lucide-react";
import styles from "./runtime-home.module.css";

const pathContent = {
  agents: {
    label: "Bring your agents",
    title: "Connect your agent stack",
    body: "Connect your existing agents, studios, MCP servers, OpenClaw installations, and custom workflows without rebuilding them on a new framework.",
    action: "Bring your agents",
    href: "#demo",
    steps: [
      ["Connect", "Agents stay where they run", Network],
      ["Observe", "Review decisions in shadow mode", SquareTerminal],
      ["Enforce", "Apply approved policies", ShieldCheck],
    ],
  },
  cadre: {
    label: "Start with Cadre",
    title: "Choose a pack or blueprint",
    body: "Deploy a Cadre agent pack, or adapt a blueprint to your systems, handoffs, and operating rules.",
    action: "Explore Cadre packs",
    href: "https://cadreagents.com",
    steps: [
      ["Choose", "Pack or blueprint", PackageOpen],
      ["Adapt", "Systems, rules, and handoffs", Braces],
      ["Deploy", "Run on Aarvion Runtime", Boxes],
    ],
  },
} as const;

export function AdoptionPaths() {
  return (
    <section className={styles.adoptionPaths} id="cadre">
      <div className={styles.sectionFrame}>
        <div className={styles.adoptionHeading}>
          <h2>Use the same runtime whether you bring agents or start with Cadre.</h2>
          <p>
            Connect the agents and workflows you already run. If you need
            agents, deploy a Cadre pack or adapt a blueprint to your systems
            and operating rules.
          </p>
        </div>

        <div className={styles.adoptionSwitch}>
          <div className={styles.adoptionTracks}>
            {(Object.entries(pathContent) as Array<
              [keyof typeof pathContent, (typeof pathContent)[keyof typeof pathContent]]
            >).map(([source, content]) => {
              const PathIcon = source === "agents" ? Bot : PackageOpen;
              return (
                <article
                  className={styles.adoptionTrack}
                  id={source === "agents" ? "bring-your-agents" : "cadre-packs"}
                  key={source}
                >
                  <div className={styles.adoptionTrackHeading}>
                    <PathIcon aria-hidden="true" size={20} strokeWidth={1.5} />
                    <div>
                      <span>{content.label}</span>
                      <h3>{content.title}</h3>
                    </div>
                  </div>
                  <p>{content.body}</p>
                  <ol>
                    {content.steps.map(([label, note, Icon]) => (
                      <li key={label}>
                        <Icon aria-hidden="true" size={17} strokeWidth={1.5} />
                        <span><strong>{label}</strong><small>{note}</small></span>
                      </li>
                    ))}
                  </ol>
                  <a
                    href={content.href}
                    target={source === "cadre" ? "_blank" : undefined}
                    rel={source === "cadre" ? "noreferrer" : undefined}
                  >
                    {content.action} <ArrowRight aria-hidden="true" size={17} />
                  </a>
                </article>
              );
            })}
          </div>
          <div className={styles.adoptionRuntime}>
            <ShieldCheck aria-hidden="true" size={20} />
            <span>Aarvion Runtime</span>
            <small>Shared routing, policy, authority, and signed record</small>
          </div>
        </div>
      </div>
    </section>
  );
}
