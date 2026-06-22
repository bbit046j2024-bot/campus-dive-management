"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color?: string;
}

export default function FeaturePillar({ title, icon, description, features, color = "primary" }: Props) {
  const [open, setOpen] = useState(false);

  const colors: Record<string, string> = {
    primary: "border-primary/30 hover:border-primary/60 group-hover:text-primary-light",
    accent:  "border-accent/30 hover:border-accent/60 group-hover:text-accent-light",
    success: "border-success/30 hover:border-success/60 group-hover:text-success",
    warning: "border-warning/30 hover:border-warning/60 group-hover:text-warning",
    danger:  "border-danger/30 hover:border-danger/60 group-hover:text-danger",
  };

  const iconBg: Record<string, string> = {
    primary: "bg-primary/20 text-primary-light",
    accent:  "bg-accent/20 text-accent-light",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    danger:  "bg-danger/20 text-danger",
  };

  const dotColor: Record<string, string> = {
    primary: "bg-primary-light",
    accent:  "bg-accent-light",
    success: "bg-success",
    warning: "bg-warning",
    danger:  "bg-danger",
  };

  return (
    <div className={`glass border rounded-2xl transition-all duration-300 group cursor-pointer ${colors[color]}`}
         onClick={() => setOpen(!open)}>
      <div className="p-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${iconBg[color]} shrink-0`}>{icon}</div>
          <div>
            <h3 className={`text-lg font-bold text-ink mb-1 transition-colors ${colors[color]}`}>{title}</h3>
            <p className="text-ink-muted text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="text-ink-faint shrink-0 mt-1">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {open && (
        <div className="px-6 pb-6 border-t border-white/10 pt-4 animate-fade-in">
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-ink-muted">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[color]}`} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
