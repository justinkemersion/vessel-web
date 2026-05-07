export type ManifestStatus = "ACTIVE" | "IN_DEVELOPMENT";

export type ProjectKey =
  | "flux"
  | "yeast-coast"
  | "pseudo-channel"
  | "mailpilot-ai"
  | "finances-ai"
  | "tone"
  | "bloom-atelier";

export type PortalProject = {
  name: string;
  repo: ProjectKey;
  readmePath: string;
  description: string;
};

export type ManifestRow = {
  gate: string;
  service: string;
  destination: string;
  status: ManifestStatus;
  repo: ProjectKey;
};

export const portalProjects: PortalProject[] = [
  {
    name: "Flux",
    repo: "flux",
    readmePath: "~/Projects/flux/README.md",
    description:
      "Flux is a slim Backend-as-a-Service and Database-as-a-Service platform where each project gets an isolated PostgreSQL + PostgREST tenant bucket managed by a control plane.",
  },
  {
    name: "YeastCoast",
    repo: "yeast-coast",
    readmePath: "~/Projects/yeast-coast/README.md",
    description:
      "YeastCoast is a full-stack homebrewing platform with a scientific dashboard feel, focused on readable brewing workflows, recipe tooling, and high-density product UX.",
  },
  {
    name: "PseudoChannel",
    repo: "pseudo-channel",
    readmePath: "~/Projects/pseudo-channel/pseudochannel/README.md",
    description:
      "PseudoChannel turns a personal Plex library into deterministic live channels with block scheduling, gap-filling, AI programming support, and synchronized guide data.",
  },
  {
    name: "MailPilot AI",
    repo: "mailpilot-ai",
    readmePath: "~/Projects/mailpilot-ai/README.md",
    description:
      "MailPilot AI is an inbox copilot that pairs a Next.js control plane with a Python worker to classify and process Gmail using AI, coordinated through Supabase.",
  },
  {
    name: "finances-ai",
    repo: "finances-ai",
    readmePath: "~/Projects/finances-ai/README.md",
    description:
      "Finance AI Analyzer is a privacy-first personal finance analyzer with deterministic analytics and optional AI explanations, built to keep users in full control of their data.",
  },
  {
    name: "Tone",
    repo: "tone",
    readmePath: "~/Projects/tone/README.md",
    description:
      "Tone is a browser-based guitar tuner with Listen and Reference modes, sharing the same tuning data so live detection and reference pitches stay in sync.",
  },
  {
    name: "Bloom Atelier",
    repo: "bloom-atelier",
    readmePath: "~/Projects/bloom-atelier/README.md",
    description:
      "Bloom Atelier is an identity-first marketplace where a curated public market and maker studio run on Flux-backed APIs without Bloom owning maker data rows.",
  },
];

export const manifestRows: ManifestRow[] = [
  {
    gate: "01",
    service: "Flux",
    destination: "flux.vsl-base.com",
    status: "ACTIVE",
    repo: "flux",
  },
  {
    gate: "02",
    service: "YeastCoast",
    destination: "yeastcoast.vsl-base.com",
    status: "ACTIVE",
    repo: "yeast-coast",
  },
  {
    gate: "03",
    service: "PseudoChannel",
    destination: "static.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "pseudo-channel",
  },
  {
    gate: "04",
    service: "MailPilot AI",
    destination: "mail.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "mailpilot-ai",
  },
  {
    gate: "05",
    service: "finances-ai",
    destination: "ledger.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "finances-ai",
  },
  {
    gate: "06",
    service: "Tone",
    destination: "tone.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "tone",
  },
  {
    gate: "07",
    service: "Bloom Atelier",
    destination: "bloom.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "bloom-atelier",
  },
];

export const projectDescriptionsByRepo: Record<ProjectKey, string> =
  portalProjects.reduce(
    (acc, project) => {
      acc[project.repo] = project.description;
      return acc;
    },
    {} as Record<ProjectKey, string>,
  );

export const readmePathByRepo: Record<ProjectKey, string> =
  portalProjects.reduce(
    (acc, project) => {
      acc[project.repo] = project.readmePath;
      return acc;
    },
    {} as Record<ProjectKey, string>,
  );
