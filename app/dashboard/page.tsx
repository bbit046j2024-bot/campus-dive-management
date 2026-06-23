import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Shield, MessageSquare, BookOpen, ArrowRight,
  AlertTriangle, Zap, Lock, Code2
} from "lucide-react";

export const metadata = { title: "Security Dashboard" };

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const username = user.firstName ?? user.emailAddresses[0]?.emailAddress ?? "Developer";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-primary-light text-xs font-bold uppercase tracking-widest mb-2">Security Dashboard</p>
          <h1 className="text-3xl sm:text-4xl font-black text-ink mb-2">
            Welcome back, <span className="gradient-text">{username}</span>
          </h1>
          <p className="text-ink-muted text-sm max-w-xl">
            Your AI-powered security audit workspace. Analyse code, explore vulnerabilities, and get remediation guidance.
          </p>
        </div>

        {/* Primary Action Cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <Link
            href="/dashboard/audit"
            className="group glass-hover p-6 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/20 text-primary-light">
                <Shield size={22} />
              </div>
              <ArrowRight size={16} className="text-ink-faint group-hover:text-primary-light group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-ink font-black text-lg mb-1">AI Code Auditor</h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Paste any code snippet and get a deep-dive security audit with severity ratings, attack vectors, and fixes.
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-primary-light">
              Start Audit <ArrowRight size={12} />
            </span>
          </Link>

          <Link
            href="/dashboard/chat"
            className="group glass-hover p-6 rounded-2xl border border-white/5 hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageSquare size={22} />
              </div>
              <ArrowRight size={16} className="text-ink-faint group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-ink font-black text-lg mb-1">Security Chat</h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Ask the AI Security Auditor anything — exploit patterns, defensive techniques, code reviews, or CVE analysis.
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-emerald-400">
              Open Chat <ArrowRight size={12} />
            </span>
          </Link>
        </div>

        {/* Workspace Resources */}
        <div className="mb-4">
          <h3 className="text-ink font-bold text-sm mb-3">Workspace Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/issues", icon: <AlertTriangle size={15} />, label: "Security Issues", color: "text-danger" },
              { href: "/standards", icon: <Lock size={15} />, label: "Coding Standards", color: "text-warning" },
              { href: "/docs", icon: <BookOpen size={15} />, label: "Documentation", color: "text-primary-light" },
              { href: "/roadmap", icon: <Zap size={15} />, label: "Dev Roadmap", color: "text-success" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all group"
              >
                <span className={item.color}>{item.icon}</span>
                <span className="text-xs font-semibold text-ink-muted group-hover:text-ink transition-colors">{item.label}</span>
                <ArrowRight size={11} className="ml-auto text-ink-faint group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="glass rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={15} className="text-accent-light" />
            <h3 className="text-xs font-bold text-ink-muted uppercase tracking-widest">Quick Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">▸</span> Use the <strong className="text-ink">Code Auditor</strong> to paste raw PHP, JS, or SQL and get instant severity analysis.</li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">▸</span> The <strong className="text-ink">Security Chat</strong> maintains full conversation history — ask follow-ups naturally.</li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">▸</span> Try the <strong className="text-ink">Exploit Simulator</strong> on the Chat page to visually see SQLi and XSS in action.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
