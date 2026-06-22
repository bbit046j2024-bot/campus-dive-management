import type { Metadata } from "next";
import TimelineStep from "@/components/ui/TimelineStep";
import { GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "8-week prioritized implementation plan for Campus Dive v2 — from security hardening to full deployment.",
};

const steps = [
  {
    week: "Week 1–2",
    title: "Security Hardening",
    priority: "Critical" as const,
    tasks: [
      "Fix SQL injection in legacy_site/* with prepared statements",
      "Rotate admin credentials — remove admin123 from database.sql",
      "Add path traversal protection to all file-serving endpoints",
      "Move CSRF validation to global router-level enforcement",
      "Deploy security patches to staging environment",
    ],
  },
  {
    week: "Week 2–3",
    title: "Performance Optimization",
    priority: "High" as const,
    tasks: [
      "Add 10 database indexes on foreign key columns",
      "Rewrite N+1 queries in AdminController using JOIN aggregations",
      "Replace SELECT * with explicit column selection in all controllers",
      "Benchmark admin dashboard — target: <500ms, <20 queries",
      "Implement API response pagination (20 items per page default)",
    ],
  },
  {
    week: "Week 3–4",
    title: "Code Quality & Static Analysis",
    priority: "Medium" as const,
    tasks: [
      "Install PHPStan, configure to level 3, fix all reported errors",
      "Implement structured Logger class replacing scattered error_log() calls",
      "Add PHPStan analysis step to GitHub Actions CI workflow",
      "Write PHPUnit tests for AuthController (login, register, OAuth callback)",
      "Code review of all legacy_site/* for additional vulnerabilities",
    ],
  },
  {
    week: "Week 4–5",
    title: "Testing & Documentation",
    priority: "Medium" as const,
    tasks: [
      "Write integration tests for SQL injection prevention",
      "Write unit tests for file upload validation and path traversal protection",
      "Generate OpenAPI/Swagger specification from existing API routes",
      "Create developer onboarding guide and local setup documentation",
      "Document all API endpoints with request/response examples",
    ],
  },
  {
    week: "Week 5–6",
    title: "Database Migration System",
    priority: "Low" as const,
    tasks: [
      "Design versioned migration file format (e.g. 001_add_indexes.sql)",
      "Build migration runner script that tracks applied migrations",
      "Convert existing database.sql into numbered migration files",
      "Add migration runner to deployment pipeline",
      "Document migration workflow for contributors",
    ],
  },
  {
    week: "Week 6–7",
    title: "Enhancement & Polish",
    priority: "Low" as const,
    tasks: [
      "Raise PHPStan to level 5 and fix new violations",
      "Add rate limiting to auth endpoints (prevent brute force)",
      "Implement HTTPS-only redirect enforcement",
      "Add Content Security Policy headers",
      "Review and tighten CORS allowed origins list",
    ],
  },
  {
    week: "Week 7–8",
    title: "Production Deployment",
    priority: "High" as const,
    tasks: [
      "Full regression testing on staging environment",
      "Security audit sign-off (all CRITICAL and HIGH issues resolved)",
      "Performance benchmark sign-off (dashboard <500ms)",
      "Deploy all fixes to production (Railway + Vercel)",
      "Train team on new standards, testing workflow, and migration system",
      "Update documentation to reflect all changes",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Implementation Plan</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink mb-4">
            8-Week <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed mb-6">
            A prioritized, dependency-aware sprint plan moving from critical security hardening
            to full production deployment. Critical issues come first — no exceptions.
          </p>

          {/* Progress summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Critical", count: 1, color: "bg-danger/20 text-danger border-danger/30" },
              { label: "High", count: 2, color: "bg-warning/20 text-warning border-warning/30" },
              { label: "Medium", count: 2, color: "bg-accent/20 text-accent-light border-accent/30" },
              { label: "Low", count: 2, color: "bg-success/20 text-success border-success/30" },
            ].map((s) => (
              <div key={s.label} className={`glass rounded-xl p-3 border text-center ${s.color}`}>
                <div className="text-2xl font-black">{s.count}</div>
                <div className="text-xs font-semibold">{s.label} Priority</div>
                <div className="text-[10px] opacity-70">{s.count === 1 ? "sprint" : "sprints"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          {steps.map((step, i) => (
            <TimelineStep key={i} {...step} isLast={i === steps.length - 1} />
          ))}
        </div>

        {/* Dependency note */}
        <div className="glass rounded-2xl p-6 border border-primary/20 mt-8">
          <h3 className="text-ink font-bold flex items-center gap-2 mb-3">
            <GitBranch size={18} className="text-primary-light" /> Dependency Graph
          </h3>
          <div className="space-y-2 text-sm text-ink-muted">
            <p>🔒 <strong className="text-ink">Security hardening</strong> must complete before production deployment.</p>
            <p>⚡ <strong className="text-ink">Indexes</strong> must be applied before N+1 query optimization benchmarking.</p>
            <p>📊 <strong className="text-ink">PHPStan</strong> must be at level 3 before writing new unit tests.</p>
            <p>🚀 <strong className="text-ink">Staging sign-off</strong> required before any production deployment.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/issues" className="btn-primary">
            View All Issues <ArrowRight size={18} />
          </Link>
          <Link href="/resources" className="btn-outline">
            Developer Resources
          </Link>
        </div>

      </div>
    </div>
  );
}
