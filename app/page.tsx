import Link from "next/link";
import { ArrowRight, Shield, MessageSquare, Scan, Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/026/922/533/large_2x/ai-generative-happy-diverse-group-of-college-students-working-together-on-study-project-in-university-library-sitting-at-table-with-books-laptop-talking-discussing-research-learning-tasks-laughing-photo.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24 sm:py-32">

        {/* Hero Text */}
        <div className="text-center mb-10 max-w-2xl mx-auto animate-fade-in">
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Campus Dive Management
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Find where you{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              belong
            </span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            A secure workspace for students to collaborate on projects, audit code security, and master defensive engineering — all in one place.
          </p>
        </div>

        {/* Glassmorphism Feature Card */}
        <div className="w-full max-w-lg bg-zinc-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6 animate-fade-up">

          {/* Feature 1 — AI Code Auditor */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
              <Scan size={18} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">AI Code Auditor</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Paste any code snippet and receive a deep-dive security audit — severity-ranked vulnerabilities, attack vector breakdowns, and production-ready remediation patches.
              </p>
            </div>
          </div>

          {/* Feature 2 — Security Chat */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <MessageSquare size={18} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Security Chat</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                An interactive AI assistant trained on exploit patterns, OWASP Top 10, and defensive techniques. Ask follow-up questions naturally with full conversation memory.
              </p>
            </div>
          </div>

          {/* Feature 3 — Exploit Simulator */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center">
              <Shield size={18} className="text-rose-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Exploit Simulator</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Visualize SQLi and XSS attacks in real-time on an interactive canvas. Toggle between vulnerable and secure modes to see exactly how defenses work.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* CTA */}
          <Link
            href="/dashboard"
            className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            <Sparkles size={15} />
            APPLY NOW
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <p className="text-[10px] text-zinc-500 text-center">
            Authentication powered by Clerk · Sign in to access the secure workspace
          </p>
        </div>
      </div>
    </div>
  );
}
