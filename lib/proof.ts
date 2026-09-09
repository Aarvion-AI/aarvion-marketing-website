export const INCEPTION = {
  label: "Part of the NVIDIA Inception Program",
  short: "NVIDIA Inception",
};

export type Mark = { id: string; name: string };

export const TEAMS: Mark[] = [
  { id: "fareye", name: "FarEye" },
  { id: "adobe", name: "Adobe" },
  { id: "esri", name: "Esri" },
  { id: "postman", name: "Postman" },
];

export const CUSTOMERS: Mark[] = [
  { id: "flipkart", name: "Flipkart" },
  { id: "myntra", name: "Myntra" },
  { id: "cleartrip", name: "Cleartrip" },
  { id: "shopsy", name: "Shopsy" },
  { id: "edgepoint", name: "EdgePoint" },
];

export const BUILDERS = ["Postman", "Deloitte", "PwC", "EY"];

export const PROOF_STATS = [
  {
    value: "3",
    label: "execution routes",
    detail: "Frontier, local, or sovereign — chosen per workflow step.",
  },
  {
    value: "PASS · PARK · BLOCK",
    label: "on every consequential action",
    detail: "Policy and delegated authority decide before the action reaches a system.",
  },
  {
    value: "Your VPC",
    label: "is where it runs",
    detail: "Operational data never leaves your environment.",
  },
  {
    value: "Signed",
    label: "record for every handoff",
    detail: "Route, policy, authority and approval state, hash-chained.",
  },
];
