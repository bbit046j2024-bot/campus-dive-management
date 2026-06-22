interface Props {
  week: string;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  tasks: string[];
  isLast?: boolean;
}

const priorityStyles: Record<string, { dot: string; badge: string; line: string }> = {
  Critical: { dot: "bg-danger shadow-[0_0_12px_rgba(244,63,94,0.6)]",  badge: "badge-critical", line: "border-danger/30" },
  High:     { dot: "bg-warning shadow-[0_0_12px_rgba(245,158,11,0.6)]", badge: "badge-high",     line: "border-warning/30" },
  Medium:   { dot: "bg-accent shadow-[0_0_12px_rgba(168,85,247,0.6)]",  badge: "badge-medium",   line: "border-accent/30" },
  Low:      { dot: "bg-success shadow-[0_0_12px_rgba(16,185,129,0.6)]", badge: "badge-low",      line: "border-success/30" },
};

export default function TimelineStep({ week, title, priority, tasks, isLast }: Props) {
  const s = priorityStyles[priority];
  return (
    <div className="flex gap-6">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full shrink-0 mt-1 ${s.dot}`} />
        {!isLast && <div className={`w-px flex-1 border-l-2 border-dashed mt-2 ${s.line}`} />}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold text-ink-muted bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
            {week}
          </span>
          <span className={s.badge}>{priority}</span>
        </div>
        <h3 className="text-ink font-bold text-lg mb-3">{title}</h3>
        <div className="glass rounded-xl p-4 space-y-2">
          {tasks.map((t, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-ink-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-faint shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
