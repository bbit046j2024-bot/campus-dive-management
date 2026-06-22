import Link from "next/link";
import {
  Users, TrendingUp, MessageSquare, Globe, LayoutDashboard,
  FileText, ArrowRight, Shield, Zap, Github, ExternalLink,
  CheckCircle, AlertTriangle, Clock
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary-light mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            v2.0 · Production Ready · Open Source
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6 animate-fade-up">
            <span className="text-ink">Campus Dive:</span>
            <br />
            <span className="gradient-text">Transforming Campus</span>
            <br />
            <span className="gradient-text">Recruitment</span>
          </h1>

          <p className="text-xl text-ink-muted max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Connect students with opportunities seamlessly. Manage recruitment pipelines,
            build vibrant communities, and track progress — all in one unified platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/docs" className="btn-primary text-base px-8 py-3.5">
              Explore Documentation <ArrowRight size={18} />
            </Link>
            <Link href="/issues" className="btn-outline text-base px-8 py-3.5">
              <AlertTriangle size={18} className="text-warning" /> View Issues
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href="https://github.com/bbit046j2024-bot/campus-dive-v2" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors">
              <Github size={16} /> GitHub Repository
            </a>
            <a href="https://campus-dive-v2.vercel.app" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors">
              <ExternalLink size={16} /> Live Application
            </a>
          </div>
        </div>
      </section>

      {/* ── PROBLEM WE SOLVE ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">The Problem We Solve</p>
          <h2 className="section-heading text-ink mb-4">From Chaos to <span className="gradient-text">Clarity</span></h2>
          <p className="text-ink-muted max-w-2xl mx-auto">Campus Dive replaces fragmented, manual processes with a single intelligent platform.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              before: "Manual recruitment processes",
              after: "Automated workflows",
              beforeIcon: "📋", afterIcon: "⚡",
              desc: "From paper forms and email chains to instant digital pipelines with status tracking.",
              color: "danger",
            },
            {
              before: "Fragmented communication",
              after: "Unified platform",
              beforeIcon: "📧", afterIcon: "💬",
              desc: "Replace scattered emails, WhatsApp groups, and spreadsheets with one central hub.",
              color: "warning",
            },
            {
              before: "No student networking",
              after: "Social community hub",
              beforeIcon: "🏝️", afterIcon: "🌐",
              desc: "Students can now form groups, share posts, and collaborate with peers campus-wide.",
              color: "success",
            },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-danger bg-danger/10 px-3 py-1.5 rounded-lg border border-danger/20">
                  <span>{item.beforeIcon}</span>
                  <span>{item.before}</span>
                </div>
                <ArrowRight size={16} className="text-ink-faint shrink-0" />
              </div>
              <div className="flex items-center gap-2 text-sm text-success bg-success/10 px-3 py-1.5 rounded-lg border border-success/20 mb-4">
                <span>{item.afterIcon}</span>
                <span className="font-semibold">{item.after}</span>
              </div>
              <p className="text-ink-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-gradient-to-b from-surface/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">By The Numbers</p>
            <h2 className="section-heading text-ink">Platform <span className="gradient-text">Statistics</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value={500} suffix="+" label="Students Enrolled" icon={<Users size={22} />} color="primary" />
            <StatCard value={95} suffix="%" label="Placement Rate" icon={<TrendingUp size={22} />} color="success" />
            <StatCard value={48} suffix="h" label="Avg Review Time" icon={<Clock size={22} />} color="warning" />
            <StatCard value={50} suffix="+" label="Open-Source Contributions" icon={<Github size={22} />} color="accent" />
          </div>
        </div>
      </section>

      {/* ── FEATURE PREVIEW ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Core Modules</p>
          <h2 className="section-heading text-ink">6 Powerful <span className="gradient-text">Feature Pillars</span></h2>
          <p className="text-ink-muted max-w-2xl mx-auto mt-4">Every aspect of campus recruitment and community management — covered.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { icon: <Users size={22} />, title: "Student Recruitment", desc: "Profile creation, document upload, and recruitment status tracking.", color: "bg-primary/20 text-primary-light" },
            { icon: <TrendingUp size={22} />, title: "Live App Tracking", desc: "Real-time status updates and interview scheduling pipeline.", color: "bg-success/20 text-success" },
            { icon: <MessageSquare size={22} />, title: "Direct Messaging", desc: "1:1 communication between students and administrators.", color: "bg-accent/20 text-accent-light" },
            { icon: <Globe size={22} />, title: "Social Community Hub", desc: "Groups, posts, comments, and peer networking.", color: "bg-warning/20 text-warning" },
            { icon: <LayoutDashboard size={22} />, title: "Admin Dashboard", desc: "User management, analytics, bulk operations, and broadcasting.", color: "bg-danger/20 text-danger" },
            { icon: <FileText size={22} />, title: "Document Management", desc: "Secure upload, verification, and archival of student documents.", color: "bg-primary/20 text-primary-light" },
          ].map((f, i) => (
            <div key={i} className="glass-hover p-6 rounded-2xl">
              <div className={`inline-flex p-3 rounded-xl mb-4 ${f.color}`}>{f.icon}</div>
              <h3 className="text-ink font-bold mb-2">{f.title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/features" className="btn-primary">
            Explore All Features <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── QUICK STATUS ── */}
      <section className="py-20 bg-gradient-to-b from-transparent to-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/issues" className="glass-hover p-6 rounded-2xl group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-danger/20 text-danger"><Shield size={20} /></div>
                <h3 className="text-ink font-bold">Security Issues</h3>
              </div>
              <p className="text-ink-muted text-sm mb-4 leading-relaxed">4 critical/high security vulnerabilities identified and documented with fixes.</p>
              <span className="text-xs font-semibold text-danger flex items-center gap-1">View Security Issues <ArrowRight size={12} /></span>
            </Link>
            <Link href="/issues#performance" className="glass-hover p-6 rounded-2xl group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-warning/20 text-warning"><Zap size={20} /></div>
                <h3 className="text-ink font-bold">Performance Issues</h3>
              </div>
              <p className="text-ink-muted text-sm mb-4 leading-relaxed">N+1 queries, missing indexes causing 1.2s load time. Target: &lt;500ms.</p>
              <span className="text-xs font-semibold text-warning flex items-center gap-1">View Performance Issues <ArrowRight size={12} /></span>
            </Link>
            <Link href="/roadmap" className="glass-hover p-6 rounded-2xl group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-success/20 text-success"><CheckCircle size={20} /></div>
                <h3 className="text-ink font-bold">8-Week Roadmap</h3>
              </div>
              <p className="text-ink-muted text-sm mb-4 leading-relaxed">Prioritized implementation plan from security hardening to full deployment.</p>
              <span className="text-xs font-semibold text-success flex items-center gap-1">View Roadmap <ArrowRight size={12} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEVELOPER PROFILE ── */}
      <section className="py-20 border-t border-white/5 bg-surface/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Project Creator</p>
            <h2 className="text-3xl sm:text-4xl font-black text-ink">Meet the <span className="gradient-text">Lead Developer</span></h2>
            <p className="text-ink-muted text-sm max-w-xl mx-auto mt-3">
              The talent, institutions, and core motivation behind the creation and engineering of the Campus Dive v2 platform.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center glass p-8 rounded-3xl border border-white/10 relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <img src="/university.png" alt="Technical University of Mombasa" className="h-10 w-auto object-contain rounded bg-white/5 p-1.5" title="Technical University of Mombasa" />
              <img src="/motivation.jpg" alt="The Campus Dive Motivation" className="h-10 w-auto object-contain rounded bg-white/5 p-1.5" title="The Campus Dive Motivation" />
            </div>

            {/* Profile Photo */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-44 h-44 rounded-full p-1.5 bg-gradient-to-br from-primary to-accent shadow-glow-primary mb-4">
                <img src="/developer.png" alt="Onyango Elisha Adera" className="w-full h-full object-cover rounded-full border border-[#0F0F1A]" />
              </div>
              <h3 className="text-xl font-bold text-ink text-center">Onyango Elisha Adera</h3>
              <p className="text-xs text-primary-light font-medium tracking-wider uppercase mt-1">Lead Software Architect</p>
            </div>

            {/* Profile Info */}
            <div className="md:col-span-8 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">The Motivation</h4>
                <p className="text-ink-muted text-sm leading-relaxed">
                  &ldquo;Campus Dive v2 was conceptualized to solve a critical issue faced by thousands of college students: fragmented, manual, and offline recruitment processes. By integrating professional networking tools, automated job applications, real-time tracking, and community social hubs into a single unified workspace, we empower students to transition seamlessly into the professional world.&rdquo;
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-1">Education &amp; Institution</h4>
                  <p className="text-ink text-sm font-semibold">Technical University of Mombasa</p>
                  <p className="text-xs text-ink-muted">Bachelor of Business Information Technology (BBIT)</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-1">Contact Details</h4>
                  <a href="mailto:bbit046j2024@students.tum.ac.ke" className="block text-sm text-primary-light hover:underline">
                    bbit046j2024@students.tum.ac.ke
                  </a>
                  <p className="text-xs text-ink-muted mt-0.5">Phone: 0797844540</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
