"use client";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type Status = "Open" | "In Progress" | "Resolved";

interface Props {
  title: string;
  severity: Severity;
  status: Status;
  issueNumber?: number;
  problem: string;
  vulnerableCode?: string;
  fixedCode?: string;
  steps?: string[];
  impact?: string;
}

const severityClass: Record<Severity, string> = {
  CRITICAL: "badge-critical",
  HIGH: "badge-high",
  MEDIUM: "badge-medium",
  LOW: "badge-low",
};
const statusClass: Record<Status, string> = {
  Open: "badge-open",
  "In Progress": "badge-progress",
  Resolved: "badge-done",
};
const borderColor: Record<Severity, string> = {
  CRITICAL: "border-danger/40 hover:border-danger/70",
  HIGH: "border-warning/40 hover:border-warning/70",
  MEDIUM: "border-accent/40 hover:border-accent/70",
  LOW: "border-success/40 hover:border-success/70",
};

export default function IssueCard({
  title, severity, status, issueNumber, problem,
  vulnerableCode, fixedCode, steps, impact
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`glass border rounded-2xl transition-all duration-300 ${borderColor[severity]}`}>
      <div className="p-5 flex items-start justify-between gap-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={severityClass[severity]}>{severity}</span>
            <span className={statusClass[status]}>{status}</span>
            {issueNumber && (
              <a href={`https://github.com/bbit046j2024-bot/campus-dive-v2/issues/${issueNumber}`}
                 target="_blank" rel="noopener noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-primary-light transition-colors">
                <ExternalLink size={11} /> #{issueNumber}
              </a>
            )}
          </div>
          <h4 className="text-ink font-semibold text-sm">{title}</h4>
          <p className="text-ink-muted text-xs mt-1 leading-relaxed line-clamp-2">{problem}</p>
        </div>
        <ChevronDown size={16} className={`text-ink-faint shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="border-t border-white/10 p-5 space-y-4 animate-fade-in">
          {/* Problem */}
          <div>
            <h5 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">The Problem</h5>
            <p className="text-ink-muted text-sm leading-relaxed">{problem}</p>
          </div>

          {/* Impact */}
          {impact && (
            <div className="p-3 rounded-xl bg-danger/5 border border-danger/20">
              <p className="text-xs text-danger font-semibold mb-0.5">⚠ Security Impact</p>
              <p className="text-xs text-ink-muted">{impact}</p>
            </div>
          )}

          {/* Vulnerable code */}
          {vulnerableCode && (
            <div>
              <h5 className="text-xs font-bold text-danger uppercase tracking-wider mb-2">❌ Vulnerable Code</h5>
              <pre className="bg-[#0D0D1F] border border-danger/20 rounded-xl p-4 text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
                <code>{vulnerableCode}</code>
              </pre>
            </div>
          )}

          {/* Fixed code */}
          {fixedCode && (
            <div>
              <h5 className="text-xs font-bold text-success uppercase tracking-wider mb-2">✅ Fixed Code</h5>
              <pre className="bg-[#0D0D1F] border border-success/20 rounded-xl p-4 text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
                <code>{fixedCode}</code>
              </pre>
            </div>
          )}

          {/* Steps */}
          {steps && steps.length > 0 && (
            <div>
              <h5 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">Implementation Steps</h5>
              <ol className="space-y-1.5">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
