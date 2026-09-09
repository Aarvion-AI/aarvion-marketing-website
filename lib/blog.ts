import type { ImageSlotId } from "./images";

export type PostSection = { heading?: string; paragraphs: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  cover: ImageSlotId;
  tag: string;
  sections: PostSection[];
};

export const POSTS: Post[] = [
  {
    slug: "why-agent-pilots-stall-before-production",
    title: "Why agent pilots stall before production",
    description:
      "Most enterprise agent pilots work. Most never ship. The gap is not model quality — it is that nobody can say what the agent is allowed to do, where it may run, and who approved it.",
    date: "2026-08-18",
    readingMinutes: 6,
    cover: "blog-pilot-to-production",
    tag: "Perspective",
    sections: [
      {
        paragraphs: [
          "Ask a platform team how their agent pilot went and you usually hear the same thing: the demo was good, the business sponsor was excited, and the rollout is now in its fourth month of review. The agent can do the work. What it cannot do is answer the questions that production raises.",
          "Which systems is it allowed to touch? Which model handled the step that moved money? Whose authority was it acting under when it changed a record? If a customer disputes the outcome, what do we show them? These are not model questions. They are runtime questions, and a pilot built around a prompt and a tool list has no answers to them.",
        ],
      },
      {
        heading: "The pilot proved capability, not control",
        paragraphs: [
          "A pilot is designed to show that an agent can complete a workflow. That is the right goal for a pilot and the wrong goal for production. Production asks whether the organisation can stand behind every action the agent takes, including the ones that go wrong.",
          "Risk and security teams are not being obstructive when they hold a rollout. They are asking for the same things they ask of any system that touches production: a definition of allowed behaviour, a way to enforce it, and a record that survives an incident. Agents built as prompts plus tools provide none of the three by default.",
        ],
      },
      {
        heading: "What production actually needs",
        paragraphs: [
          "Three things close the gap. First, a routing decision per step: which model or environment is allowed to handle this work given the data it touches and where it must stay. Second, a check on each consequential action against policy and delegated authority — the scope the agent was actually given, and the owner who gave it. Third, a record of the route, the check, and any human approval, signed so it cannot be edited after the fact.",
          "When those three exist in the action path, the questions above have answers. The security review becomes a review of rules rather than a review of prompts. The business sponsor gets a workflow that can be extended without re-litigating trust each time.",
        ],
      },
      {
        heading: "Start with one workflow",
        paragraphs: [
          "The fastest route from pilot to production is not a bigger platform. It is one workflow that matters, run under a runtime that can route, check, and record every step. Connect the agents you already have, observe their decisions in shadow mode, and enforce policy when the owners have signed it. The second workflow is easier because the rules, the approvals, and the record already exist.",
        ],
      },
    ],
  },
  {
    slug: "pass-park-block-an-operating-model-for-agents",
    title: "PASS, PARK, BLOCK: an operating model for agent actions",
    description:
      "Every consequential agent action should resolve to one of three verdicts. Here is why three is the right number, and what each verdict has to carry with it.",
    date: "2026-07-29",
    readingMinutes: 5,
    cover: "blog-pass-park-block",
    tag: "How it works",
    sections: [
      {
        paragraphs: [
          "Agent governance discussions tend to split into two camps: allow the agent to act and review the logs later, or put a human in front of every action. The first camp ships and then spends its time on incidents. The second never ships. Neither is an operating model.",
          "A runtime needs a small, complete vocabulary for what happens when an agent tries to do something consequential. Aarvion uses three verdicts, and the number matters.",
        ],
      },
      {
        heading: "PASS: inside delegated authority",
        paragraphs: [
          "An action passes when it is within the scope the agent was delegated, on a route that is approved for the data it touches, and consistent with the signed policy version. Passing is not the absence of a check. It is a check that succeeded, and the record shows who delegated the scope and which policy applied.",
        ],
      },
      {
        heading: "PARK: a human decides",
        paragraphs: [
          "An action parks when it exceeds delegated authority but is not forbidden. The runtime holds it and routes it to the named owner — a risk owner, a business owner, an operator — with the policy, the route, and the agent's reasoning attached. The owner approves or declines, and either outcome is recorded.",
          "Parking is what makes bounded autonomy workable. Agents can handle the routine ninety percent while the consequential ten percent waits for a person who has the context and the authority to decide.",
        ],
      },
      {
        heading: "BLOCK: not available for review",
        paragraphs: [
          "Some actions should never be queued for a human because no human in the loop is authorised to approve them. Exporting restricted data outside an approved region is the clear example. The runtime blocks the action, records the denial, and moves on. Making BLOCK distinct from PARK keeps approval queues honest: nothing in the queue is there because the policy was unclear.",
        ],
      },
      {
        heading: "Why three, and why in the action path",
        paragraphs: [
          "Two verdicts collapse the important distinction between 'needs a decision' and 'never allowed'. More than three and owners stop understanding what the queue means. Three is enough to express every operating rule we have seen, and few enough that a reviewer can read a record at a glance.",
          "The verdict has to be produced before the action reaches a system, not derived from logs afterwards. That is the difference between governance and forensics.",
        ],
      },
    ],
  },
  {
    slug: "frontier-local-sovereign-routing-per-step",
    title: "Frontier, local, or sovereign: routing per step, not per workflow",
    description:
      "Choosing one model for an entire workflow forces a bad trade between capability, cost, and data residency. Route each step instead.",
    date: "2026-07-08",
    readingMinutes: 5,
    cover: "blog-routing",
    tag: "How it works",
    sections: [
      {
        paragraphs: [
          "Teams usually pick a model for a workflow the way they pick a database: once, up front, for everything. For agents that is the wrong unit. A single workflow can include a cheap classification step, a hard reasoning step, and a step that touches data which must not leave a region. No single model is the right answer to all three.",
        ],
      },
      {
        heading: "Three routes, one workflow",
        paragraphs: [
          "A frontier route uses an approved external model where the step genuinely needs the capability — complex judgment, long context, unfamiliar inputs. A local route runs a smaller model near the source system for routine, latency-sensitive, or high-volume steps. A sovereign route keeps execution inside dedicated infrastructure when policy says the data cannot leave.",
          "Routing per step lets one workflow use all three. The classification runs locally, the reasoning goes to the frontier model, and the transfer that would move restricted data is routed to sovereign infrastructure — or blocked if no sovereign route is eligible.",
        ],
      },
      {
        heading: "Routing is a policy decision, so record it",
        paragraphs: [
          "Which route handled a step is not an implementation detail. It is evidence. When an auditor asks whether customer data was sent to an external model, the answer should be a query against the signed record, not an archaeology project through prompt logs.",
          "That is why routing belongs in the runtime alongside policy and authority. The rule that selects the route, the policy version in force, and the verdict on the action are written into the same record for each step.",
        ],
      },
      {
        heading: "What this changes for platform teams",
        paragraphs: [
          "Model choice stops being a one-time architecture decision and becomes a rule that can be reviewed and changed. Adding a new local model, or retiring a frontier one, is a routing change with a signed version, not a rewrite of every agent. Cost and residency become things you can enforce rather than things you hope the prompt respects.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
