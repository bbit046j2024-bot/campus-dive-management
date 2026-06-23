import { Code2, Globe, Lock, Mail, Phone, Building2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/026/922/533/large_2x/ai-generative-happy-diverse-group-of-college-students-working-together-on-study-project-in-university-library-sitting-at-table-with-books-laptop-talking-discussing-research-learning-tasks-laughing-photo.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24 sm:py-32">
        
        {/* Main Card Container */}
        <div className="w-full max-w-4xl bg-zinc-950/75 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fade-up">
          
          {/* Header */}
          <div className="text-center">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
              About the Platform
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              What is{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Campus Dive
              </span>
              ?
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Campus Dive Management is a secure, AI-powered workspace designed for students and developers
              to collaborate on academic projects, audit code for security vulnerabilities, and learn
              defensive engineering through interactive tools.
            </p>
          </div>

          {/* Grid for Mission and Security */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission Card */}
            <div className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                  <Globe size={18} className="text-emerald-400" />
                  Our Mission
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  We believe every student developer should have access to professional-grade security
                  tooling. Campus Dive bridges the gap between academic learning and real-world application
                  security — providing AI-assisted code auditing, interactive exploit demonstrations, and
                  a collaborative chat environment where questions about web security are answered with
                  depth and precision.
                </p>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                  <Lock size={18} className="text-rose-400" />
                  Security First
                </h2>
                <ul className="space-y-2 text-zinc-400 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    All dashboard routes are server-side protected — no authenticated data leaks to unauthenticated visitors.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    OpenAI Moderation API pre-screens every user input before processing.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    Rate limiting prevents API abuse (10 requests/minute per user).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    System prompts enforce strict &quot;remediation only&quot; mode — exploit code generation is blocked.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <Code2 size={18} className="text-indigo-400" />
              Technology Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Next.js 14",
                  desc: "App Router with server-side rendering, API routes, and optimized page generation.",
                  color: "text-white",
                },
                {
                  name: "Tailwind CSS",
                  desc: "Utility-first styling with custom design tokens for a premium glassmorphic dark theme.",
                  color: "text-sky-400",
                },
                {
                  name: "Clerk Authentication",
                  desc: "Enterprise-grade auth with middleware route protection, session management, and user profiles.",
                  color: "text-violet-400",
                },
                {
                  name: "OpenAI GPT-4o-mini",
                  desc: "Powers the AI Security Auditor with low-temperature factual responses and moderation safety.",
                  color: "text-emerald-400",
                },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
                >
                  <h3 className={`font-bold text-sm mb-1 ${tech.color}`}>{tech.name}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Redesigned Developer Card */}
          <div className="bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 rounded-2xl p-6 sm:p-8 transition-all duration-300">
            <h2 className="text-white font-bold text-base mb-6 flex items-center gap-2">
              <Building2 size={18} className="text-amber-400" />
              Lead Developer & Project Info
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatars */}
              <div className="flex flex-row md:flex-col items-center gap-4 shrink-0">
                <div className="relative">
                  <img
                    src="/developer.png"
                    alt="Onyango Elisha Adera"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-emerald-500/30 shadow-lg"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
                </div>
                <img
                  src="/university.png"
                  alt="Technical University of Mombasa Logo"
                  className="h-10 sm:h-12 w-auto object-contain rounded bg-white/5 p-1 border border-white/10"
                />
              </div>

              {/* Bio & Details */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h3 className="text-white font-extrabold text-xl tracking-tight">Onyango Elisha Adera</h3>
                  <p className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">Lead Developer · Security Researcher</p>
                  <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-0.5">Technical University of Mombasa</p>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Campus Dive was designed and built as a secure campus management and recruitment platform. 
                  Integrating modern web frameworks with AI-driven vulnerability assessment tools, 
                  this project serves as a demonstration of defensive software engineering principles 
                  and secure-by-design methodologies for student environments.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs text-zinc-400">
                  <a
                    href="mailto:bbit046j2024@students.tum.ac.ke"
                    className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <Mail size={14} className="text-emerald-400" />
                    bbit046j2024@students.tum.ac.ke
                  </a>
                  <a
                    href="tel:0797844540"
                    className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <Phone size={14} className="text-emerald-400" />
                    0797844540
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              <Sparkles size={15} />
              Enter the Workspace
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
