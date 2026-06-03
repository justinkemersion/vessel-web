import type { WorkStatus } from "@/lib/vessel-vocabulary";

export type ManifestStatus = "ACTIVE" | "IN_DEVELOPMENT";

export type ProjectKey =
  | "flux"
  | "yeast-coast"
  | "pseudo-channel"
  | "mailpilot-ai"
  | "vessel-ledger"
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
  /** Link destination while still IN_DEVELOPMENT (alpha / preview hosts). */
  linkInDevelopment?: boolean;
  /** Optional note shown in the expanded row (e.g. why manifest status lags the product). */
  developmentNote?: string;
};

/** Project copy keyed by repo. Order matches manifest policy in `_contract/portal-manifest.md`. */
export const portalProjects: PortalProject[] = [
  {
    name: "Flux",
    repo: "flux",
    readmePath: "~/Projects/flux/README.md",
    description:
      "Flux is a slim Backend-as-a-Service and Database-as-a-Service platform where each project gets an isolated PostgreSQL + PostgREST tenant bucket managed by a control plane.",
  },
  {
    name: "Ledger",
    repo: "vessel-ledger",
    readmePath: "~/Projects/vessel-ledger/README.md",
    description:
      "A calm household finance operations app for recurring bills, due dates, payment notes, and monthly obligation awareness. Vessel Ledger quietly keeps the household vessel afloat by tracking recurring obligations, upcoming bills, paid/unpaid status, payment notes, and calm reminders.",
  },
  {
    name: "Bloom Atelier",
    repo: "bloom-atelier",
    readmePath: "~/Projects/bloom-atelier/README.md",
    description:
      "Bloom Atelier is a sovereign, identity-first marketplace on a shared Flux backbone, without Bloom owning a row of maker data. A curated public floor (/market), a high-density maker atelier (/studio), and Flux-backed settings built for individuated excellence.",
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
    name: "Tone",
    repo: "tone",
    readmePath: "~/Projects/tone/README.md",
    description:
      "Tone is a browser-based guitar tuner with Listen and Reference modes, sharing the same tuning data so live detection and reference pitches stay in sync.",
  },
  {
    name: "MailPilot AI",
    repo: "mailpilot-ai",
    readmePath: "~/Projects/mailpilot-ai/README.md",
    description:
      "MailPilot AI is an inbox copilot that pairs a Next.js control plane with a Python worker to classify and process Gmail using AI, coordinated through Supabase.",
  },
];

/**
 * Flight manifest row order. See `_contract/portal-manifest.md`:
 * ACTIVE rows first (Flux → Ledger → Bloom Atelier → YeastCoast), then IN_DEVELOPMENT.
 */
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
    service: "Ledger",
    destination: "ledger.vsl-base.com",
    status: "ACTIVE",
    repo: "vessel-ledger",
  },
  {
    gate: "03",
    service: "Bloom Atelier",
    destination: "bloom.vsl-base.com",
    status: "ACTIVE",
    repo: "bloom-atelier",
  },
  {
    gate: "04",
    service: "YeastCoast",
    destination: "yeastcoast.vsl-base.com",
    status: "ACTIVE",
    repo: "yeast-coast",
  },
  {
    gate: "05",
    service: "PseudoChannel",
    destination: "static.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "pseudo-channel",
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
    service: "MailPilot AI",
    destination: "mailpilot.vsl-base.com",
    status: "IN_DEVELOPMENT",
    repo: "mailpilot-ai",
    linkInDevelopment: true,
    developmentNote:
      "MailPilot is in public alpha at the link above. Manifest status stays in development until Google Gmail API verification is complete.",
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

const destinationByRepo: Partial<Record<ProjectKey, string>> =
  manifestRows.reduce(
    (acc, row) => {
      acc[row.repo] = row.destination;
      return acc;
    },
    {} as Partial<Record<ProjectKey, string>>,
  );

export type RegisterWork = {
  name: string;
  tagline: string;
  status: WorkStatus;
  repo?: ProjectKey;
  href?: string;
};

/** Curated public register. See `_contract/portal-manifest.md` for full manifest. */
export const registerWorks: RegisterWork[] = [
  {
    name: "Flux",
    tagline: "Infrastructure for small, serious web projects.",
    status: "active",
    repo: "flux",
    href: `https://${destinationByRepo.flux}`,
  },
  {
    name: "Bloom Atelier",
    tagline: "An editorial marketplace for independent makers.",
    status: "active",
    repo: "bloom-atelier",
    href: `https://${destinationByRepo["bloom-atelier"]}`,
  },
  {
    name: "YeastCoast",
    tagline: "A brewing project for repeatable, classic-quality beer.",
    status: "active",
    repo: "yeast-coast",
    href: `https://${destinationByRepo["yeast-coast"]}`,
  },
  {
    name: "Vessel Ledger",
    tagline:
      "A calm ledger for obligations, records, and recurring operations.",
    status: "active",
    repo: "vessel-ledger",
    href: `https://${destinationByRepo["vessel-ledger"]}`,
  },
  {
    name: "MailPilot AI",
    tagline: "Inbox maintenance for real life.",
    status: "alpha",
    repo: "mailpilot-ai",
    href: `https://${destinationByRepo["mailpilot-ai"]}`,
  },
  {
    name: "The Golden Standard",
    tagline: "A future public house for beer, standards, and ritual.",
    status: "concept",
  },
];

export type Principle = {
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    title: "Owned directly",
    body: "We build and operate the work ourselves.",
  },
  {
    title: "Useful before loud",
    body: "No theater. No fake scale. Utility first.",
  },
  {
    title: "Maintained seriously",
    body: "A thing is not real until it can be kept alive.",
  },
];
