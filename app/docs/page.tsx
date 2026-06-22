import type { Metadata } from "next";
import { Server, Database, Globe, Lock, GitBranch, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Documentation",
  description: "Architecture, tech stack, data flow, authentication, and API overview for Campus Dive v2.",
};

const frontendStack = [
  { name: "React", version: "19.2.0", purpose: "UI component library & virtual DOM rendering" },
  { name: "React Router DOM", version: "6.30.3", purpose: "Client-side navigation & route management" },
  { name: "Vite", version: "7.3.1", purpose: "High-performance module bundler & dev server" },
  { name: "Tailwind CSS", version: "3.4.19", purpose: "Utility-first CSS framework" },
  { name: "Recharts", version: "3.7.0", purpose: "React charting library for analytics dashboards" },
  { name: "Lucide React", version: "0.575.0", purpose: "Lightweight SVG icon library" },
];

const backendStack = [
  { name: "PHP", version: "7.4+", purpose: "Backend runtime for REST API" },
  { name: "MySQL / TiDB", version: "8.x", purpose: "Relational database on Railway" },
  { name: "Google OAuth 2.0", version: "v2", purpose: "Social login integration" },
  { name: "PHPMailer", version: "^6.0", purpose: "Transactional email delivery (SMTP)" },
  { name: "Composer", version: "2.x", purpose: "PHP dependency manager" },
];

const infra = [
  { component: "Frontend Hosting", platform: "Vercel", url: "campus-dive-v2.vercel.app" },
  { component: "Backend API", platform: "Railway", url: "campus-dive-v2-production.up.railway.app" },
  { component: "Database", platform: "Railway MySQL", url: "Internal (PDO connection)" },
  { component: "Dev Environment", platform: "Replit", url: "Ad-hoc / on-demand" },
];

const keyTables = [
  { table: "users", columns: "id, firstname, lastname, email, password, google_id, role, avatar, status, created_at" },
  { table: "documents", columns: "id, user_id, filename, original_name, file_type, file_size, uploaded_at" },
  { table: "groups", columns: "id, name, slug, description, is_public, created_by, created_at" },
  { table: "group_members", columns: "id, group_id, user_id, status, joined_at" },
  { table: "posts", columns: "id, group_id, user_id, content, created_at" },
  { table: "comments", columns: "id, post_id, user_id, content, created_at" },
  { table: "likes", columns: "id, post_id, user_id, created_at" },
  { table: "messages", columns: "id, sender_id, receiver_id, subject, message, is_read, created_at" },
  { table: "notifications", columns: "id, user_id, title, message, type, is_read, created_at" },
  { table: "roles", columns: "id, name, description, created_at" },
  { table: "permissions", columns: "id, role_id, action, resource, created_at" },
  { table: "interview_slots", columns: "id, student_id, interviewer_id, scheduled_at, status" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Technical Reference</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink mb-4">
            Architecture &amp; <span className="gradient-text">Tech Stack</span>
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">
            A comprehensive reference for developers — covering system architecture, data flows, authentication, and database schema.
          </p>
        </div>

        {/* ── Architecture Diagram ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Cpu size={22} className="text-primary-light" /> System Architecture
          </h2>
          <div className="glass rounded-2xl p-6 border border-primary/20">
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
              {/* Client */}
              <div className="flex-1 bg-primary/10 border border-primary/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={18} className="text-primary-light" />
                  <span className="font-bold text-primary-light text-sm uppercase tracking-wider">Client Tier</span>
                </div>
                <div className="space-y-2 text-xs text-ink-muted font-mono">
                  <div className="bg-white/5 rounded-lg p-2">React 19 SPA</div>
                  <div className="bg-white/5 rounded-lg p-2">Vite + React Router</div>
                  <div className="bg-white/5 rounded-lg p-2">Tailwind CSS + Recharts</div>
                  <div className="bg-white/5 rounded-lg p-2">AuthContext (Global State)</div>
                </div>
                <div className="mt-3 text-[10px] text-ink-faint">Vercel · campus-dive-v2.vercel.app</div>
              </div>

              {/* Arrow */}
              <div className="flex lg:flex-col items-center justify-center gap-1 text-ink-faint text-xs">
                <div className="hidden lg:block w-px h-6 bg-primary/30" />
                <div className="text-[10px] font-mono bg-surface/50 px-2 py-1 rounded border border-white/10">HTTP/REST</div>
                <div className="text-[10px] font-mono bg-surface/50 px-2 py-1 rounded border border-white/10">JSON · Cookies</div>
                <div className="hidden lg:block w-px h-6 bg-primary/30" />
              </div>

              {/* API */}
              <div className="flex-1 bg-accent/10 border border-accent/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Server size={18} className="text-accent-light" />
                  <span className="font-bold text-accent-light text-sm uppercase tracking-wider">API Tier</span>
                </div>
                <div className="space-y-2 text-xs text-ink-muted font-mono">
                  <div className="bg-white/5 rounded-lg p-2">PHP 7.4+ REST API</div>
                  <div className="bg-white/5 rounded-lg p-2">Router → Controllers</div>
                  <div className="bg-white/5 rounded-lg p-2">Auth / Role / CSRF Middleware</div>
                  <div className="bg-white/5 rounded-lg p-2">Google OAuth 2.0</div>
                </div>
                <div className="mt-3 text-[10px] text-ink-faint">Railway · .up.railway.app</div>
              </div>

              {/* Arrow */}
              <div className="flex lg:flex-col items-center justify-center gap-1 text-ink-faint text-xs">
                <div className="hidden lg:block w-px h-6 bg-success/30" />
                <div className="text-[10px] font-mono bg-surface/50 px-2 py-1 rounded border border-white/10">PDO</div>
                <div className="text-[10px] font-mono bg-surface/50 px-2 py-1 rounded border border-white/10">SQL</div>
                <div className="hidden lg:block w-px h-6 bg-success/30" />
              </div>

              {/* DB */}
              <div className="flex-1 bg-success/10 border border-success/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Database size={18} className="text-success" />
                  <span className="font-bold text-success text-sm uppercase tracking-wider">Data Tier</span>
                </div>
                <div className="space-y-2 text-xs text-ink-muted font-mono">
                  <div className="bg-white/5 rounded-lg p-2">MySQL / TiDB</div>
                  <div className="bg-white/5 rounded-lg p-2">12+ Relational Tables</div>
                  <div className="bg-white/5 rounded-lg p-2">users, documents, groups</div>
                  <div className="bg-white/5 rounded-lg p-2">messages, notifications</div>
                </div>
                <div className="mt-3 text-[10px] text-ink-faint">Railway · Internal Network</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Frontend Stack ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Globe size={22} className="text-primary-light" /> Frontend Stack
          </h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Technology</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Version</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {frontendStack.map((r) => (
                  <tr key={r.name} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 font-mono text-primary-light font-medium">{r.name}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.version}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Backend Stack ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Server size={22} className="text-accent-light" /> Backend Stack
          </h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Technology</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Version</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {backendStack.map((r) => (
                  <tr key={r.name} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 font-mono text-accent-light font-medium">{r.name}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.version}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Auth Flow ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Lock size={22} className="text-warning" /> Authentication Flow
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email/Password */}
            <div className="glass rounded-2xl p-6 border border-primary/20">
              <h3 className="text-ink font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary-light flex items-center justify-center text-xs font-bold">A</span>
                Email / Password Login
              </h3>
              <ol className="space-y-3">
                {[
                  "User visits /login and enters credentials",
                  "POST /api/auth/login with { email, password }",
                  "Backend validates against users table (bcrypt)",
                  "PHP session created with user data + role",
                  "AuthContext populated: user, isAdmin, isManager",
                  "React Router redirects based on role",
                ].map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-muted">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            {/* Google OAuth */}
            <div className="glass rounded-2xl p-6 border border-accent/20">
              <h3 className="text-ink font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-xs font-bold">B</span>
                Google OAuth 2.0
              </h3>
              <ol className="space-y-3">
                {[
                  "User clicks \"Login with Google\" button",
                  "GET /api/auth/google-url → returns OAuth URL",
                  "Redirect to Google consent screen",
                  "Google redirects to /google_callback.php with code",
                  "Backend exchanges code for tokens via Google API",
                  "User created or updated in DB (first-time login)",
                  "Session created, redirected to dashboard",
                ].map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-muted">
                    <span className="w-5 h-5 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Database Schema ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Database size={22} className="text-success" /> Database Schema
          </h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Table</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Key Columns</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {keyTables.map((t) => (
                  <tr key={t.table} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 font-mono text-success font-medium whitespace-nowrap">{t.table}</td>
                    <td className="px-5 py-3 text-ink-muted font-mono text-xs">{t.columns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Infrastructure ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <GitBranch size={22} className="text-primary-light" /> Infrastructure
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {infra.map((r) => (
              <div key={r.component} className="glass rounded-xl p-5 border border-white/10">
                <div className="text-xs text-ink-faint uppercase tracking-wider mb-1">{r.component}</div>
                <div className="text-ink font-bold mb-1">{r.platform}</div>
                <div className="text-xs font-mono text-primary-light">{r.url}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Environment Variables ── */}
        <section>
          <h2 className="text-2xl font-black text-ink mb-6">Environment Variables</h2>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <pre className="text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
{`# Database (Railway)
MYSQLHOST=<railway-db-host>
MYSQLUSER=<db-user>
MYSQLPASSWORD=<db-password>
MYSQLDATABASE=campus_recruitment

# Google OAuth
GOOGLE_CLIENT_ID=580964465243-6pduk4son190sfmn2fb3a7u34k1l4vlb.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-secret>
GOOGLE_REDIRECT_URI=https://campus-dive-v2-production.up.railway.app/google_callback.php

# App Config
APP_ENV=production
APP_URL=https://campus-dive-v2-production.up.railway.app
FRONTEND_URL=https://campus-dive-v2.vercel.app
APP_DEBUG=false

# Frontend (.env.production)
VITE_API_URL=https://campus-dive-v2-production.up.railway.app/api`}
            </pre>
          </div>
        </section>

      </div>
    </div>
  );
}
