import type { ManifestRow, ProjectKey } from "@/lib/portal-content";

export type WorkStatus = "active" | "alpha" | "concept" | "private";

export const WORK_STATUS_LABELS: Record<WorkStatus, string> = {
  active: "Active",
  alpha: "Alpha",
  concept: "Concept",
  private: "Private",
};

const PRIVATE_REPOS = new Set<ProjectKey>(["pseudo-channel", "tone"]);

export function getWorkStatusLabel(status: WorkStatus): string {
  return WORK_STATUS_LABELS[status];
}

/** Map a portal manifest row to a public status label. */
export function getManifestWorkStatus(row: ManifestRow): WorkStatus {
  if (row.status === "ACTIVE") {
    return "active";
  }
  if (row.linkInDevelopment) {
    return "alpha";
  }
  if (PRIVATE_REPOS.has(row.repo)) {
    return "private";
  }
  return "concept";
}

export type WorkStatusStyle = {
  dot: string;
  label: string;
  rowAccent?: string;
  summaryBg?: string;
  summaryHover?: string;
  destinationText?: string;
  destinationLink?: string;
  detailBorder?: string;
  detailBg?: string;
};

export const workStatusStyles: Record<WorkStatus, WorkStatusStyle> = {
  active: {
    dot: "inline-block size-1.5 rounded-full bg-emerald-600",
    label: "text-emerald-500/90",
    summaryHover: "hover:bg-zinc-900/50",
    destinationText: "font-mono text-xs text-zinc-400",
    destinationLink:
      "font-mono text-xs text-zinc-400 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-zinc-200",
  },
  alpha: {
    dot: "inline-block size-1.5 rounded-full border border-amber-600/80 bg-amber-600/30",
    label: "text-amber-500/85",
    rowAccent: "border-l-2 border-l-amber-700/70",
    summaryBg: "bg-amber-950/10",
    summaryHover: "bg-amber-950/10 text-zinc-500 hover:bg-amber-950/20",
    destinationText: "font-mono text-xs text-amber-200/70",
    destinationLink:
      "font-mono text-xs text-amber-200/80 underline decoration-amber-700/60 underline-offset-2 transition-colors hover:text-amber-100",
    detailBorder: "border-amber-900/40",
    detailBg: "bg-amber-950/10",
  },
  concept: {
    dot: "inline-block size-1.5 rounded-full border border-amber-700/80 bg-amber-700/25",
    label: "text-amber-600/85",
    summaryBg: "bg-zinc-950",
    summaryHover: "bg-zinc-950 text-zinc-600 hover:bg-zinc-900/40",
    destinationText: "font-mono text-xs text-zinc-600",
  },
  private: {
    dot: "inline-block size-1.5 rounded-full border border-zinc-700",
    label: "text-zinc-600",
    summaryBg: "bg-zinc-950",
    summaryHover: "bg-zinc-950 text-zinc-600 hover:bg-zinc-900/40",
    destinationText: "font-mono text-xs text-zinc-600",
  },
};

export function isManifestRowLinkable(
  row: ManifestRow,
  status: WorkStatus,
): boolean {
  return status === "active" || status === "alpha";
}
