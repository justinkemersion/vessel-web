import {
  getWorkStatusLabel,
  workStatusStyles,
  type WorkStatus,
} from "@/lib/vessel-vocabulary";

type WorkStatusBadgeProps = {
  status: WorkStatus;
  className?: string;
};

export function WorkStatusBadge({ status, className }: WorkStatusBadgeProps) {
  const styles = workStatusStyles[status];

  return (
    <span
      className={`flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] ${className ?? ""}`}
    >
      <span aria-hidden className={styles.dot} />
      <span className={styles.label}>{getWorkStatusLabel(status)}</span>
    </span>
  );
}
