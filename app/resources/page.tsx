import type { Metadata } from "next";
import { Github, ExternalLink, Terminal, GitBranch, BookOpen, AlertCircle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Resources",
  description: "Quick start guide, contributing guidelines, ADRs, and troubleshooting for Campus Dive v2 contributors.",
};

const troubleshooting = [
  { issue: "401 Unauthorized on all API calls", cause: "Missing session cookie / CORS mismatch", fix: "Check API health endpoint, verify CORS origins in api/index.php" },
  { issue: "CORS error in browser console", cause: "Frontend origin not whitelisted", fix: "Add your domain to allowed_origins array in api/index.php" },
  { issue: "Database connection failed on startup", cause: "Wrong MySQL credentials or network", fix: "Verify MYSQLHOST, MYSQLUSER, MYSQLPASSWORD in .env; check Railway network whitelist" },
  { issue: "Google OAuth redirect_uri_mismatch", cause: "Redirect URI not registered in Google Console", fix: "Add GOOGLE_REDIRECT_URI value to Google Cloud Console → Credentials → OAuth 2.0 Client" },
  { issue: "404 on API routes", cause: "Route not matched in PHP router", fix: "Verify exact route path in api/index.php routes array; check Apache/Nginx rewrite rules" },
  { issue: "Emails not sending", cause: "SMTP not configured", fix: "Set email credentials in .env, run POST /api/admin/system/test-email to diagnose" },
  { issue: "npm run dev fails on port 5000", cause: "Port already in use", fix: "Kill process on port 5000: netstat -ano | findstr 5000, or change port in vite.config.js" },
  { issue: "Vite proxy errors (502)", cause: "PHP backend not running", fix: "Start backend: php -S localhost:8000 -t api/ in a separate terminal" },
];

const adrs = [
  { id: "ADR-001", title: "React 19 over Vue/Angular", reason: "Team familiarity, large ecosystem, hooks-based architecture aligns with modern patterns." },
  { id: "ADR-002", title: "Vite over Create React App", reason: "10x faster HMR, native ESM, smaller bundle sizes, active maintenance." },
  { id: "ADR-003", title: "PHP 7.4+ over Node.js backend", reason: "Existing team expertise, shared hosting compatibility, rapid CRUD API development." },
  { id: "ADR-004", title: "MySQL over MongoDB", reason: "Relational data model (users → documents → roles), ACID compliance, Railway hosting." },
  { id: "ADR-005", title: "Session cookies over JWT", reason: "HTTP-only cookies prevent XSS token theft; server-side invalidation on logout." },
  { id: "ADR-006", title: "Tailwind CSS over CSS Modules", reason: "Faster iteration, design consistency, no context-switching between files." },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Developer Hub</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink mb-4">
            Developer <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">
            Everything you need to clone, run, contribute, and understand the Campus Dive v2 codebase.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          <a href="https://github.com/bbit046j2024-bot/campus-dive-v2" target="_blank" rel="noopener noreferrer"
             className="glass-hover p-5 rounded-2xl group flex items-start gap-3">
            <Github size={20} className="text-ink-muted group-hover:text-ink mt-0.5 transition-colors" />
            <div>
              <div className="text-ink font-bold text-sm mb-0.5">GitHub Repository</div>
              <div className="text-ink-muted text-xs">Source code, issues, PRs</div>
            </div>
          </a>
          <a href="https://campus-dive-v2.vercel.app" target="_blank" rel="noopener noreferrer"
             className="glass-hover p-5 rounded-2xl group flex items-start gap-3">
            <ExternalLink size={20} className="text-ink-muted group-hover:text-primary-light mt-0.5 transition-colors" />
            <div>
              <div className="text-ink font-bold text-sm mb-0.5">Live Application</div>
              <div className="text-ink-muted text-xs">Production deployment</div>
            </div>
          </a>
          <a href="https://github.com/bbit046j2024-bot/campus-dive-v2/issues" target="_blank" rel="noopener noreferrer"
             className="glass-hover p-5 rounded-2xl group flex items-start gap-3">
            <AlertCircle size={20} className="text-ink-muted group-hover:text-danger mt-0.5 transition-colors" />
            <div>
              <div className="text-ink font-bold text-sm mb-0.5">GitHub Issues</div>
              <div className="text-ink-muted text-xs">Bug reports & features</div>
            </div>
          </a>
        </div>

        {/* Quick Start */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Terminal size={22} className="text-primary-light" /> Quick Start Guide
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1. Clone & Install",
                code: `# Clone the repository
git clone https://github.com/bbit046j2024-bot/campus-dive-v2.git
cd campus-dive-v2

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies  
cd ../  && composer install`,
              },
              {
                step: "2. Configure Environment",
                code: `# Copy example env file
cp .env.example .env

# Edit .env with your values:
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=your_password
MYSQLDATABASE=campus_recruitment
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret`,
              },
              {
                step: "3. Set Up Database",
                code: `# Create database and tables
mysql -u root -p < database.sql

# For local dev environment
mysql -u root -p < setup_localhost.sql`,
              },
              {
                step: "4. Run the Application",
                code: `# Terminal 1 — Start PHP backend (port 8000)
php -S localhost:8000 -t api/

# Terminal 2 — Start React frontend (port 5000)
cd frontend && npm run dev

# Visit: http://localhost:5000`,
              },
              {
                step: "5. Verify Setup",
                code: `# Check backend health
curl http://localhost:8000/api/health

# Expected response:
{
  "ok": true,
  "checks": {
    "database": { "status": "ok" },
    "google_oauth": { "GOOGLE_CLIENT_ID": "set" }
  }
}`,
              },
            ].map((item) => (
              <div key={item.step} className="glass rounded-2xl overflow-hidden border border-white/10">
                <div className="px-5 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                  <Terminal size={14} className="text-primary-light" />
                  <span className="text-sm font-semibold text-ink">{item.step}</span>
                </div>
                <pre className="p-5 text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Contributing Guidelines */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <GitBranch size={22} className="text-accent-light" /> Contributing Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-ink font-bold mb-4">Branch Naming</h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { type: "feature/", ex: "feature/add-bulk-export" },
                  { type: "fix/", ex: "fix/sql-injection-search" },
                  { type: "security/", ex: "security/csrf-global-enforcement" },
                  { type: "perf/", ex: "perf/add-db-indexes" },
                  { type: "docs/", ex: "docs/update-api-reference" },
                  { type: "chore/", ex: "chore/update-dependencies" },
                ].map((b) => (
                  <div key={b.type} className="flex items-center gap-2">
                    <span className="text-primary-light">{b.type}</span>
                    <span className="text-ink-muted">{b.ex.replace(b.type, "")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-ink font-bold mb-4">Commit Messages</h3>
              <div className="space-y-2 font-mono text-xs text-ink-muted">
                <div><span className="text-success">feat:</span> add bulk student export to CSV</div>
                <div><span className="text-danger">fix:</span> SQL injection in legacy search.php</div>
                <div><span className="text-warning">perf:</span> add indexes on documents.user_id</div>
                <div><span className="text-accent-light">security:</span> enforce CSRF at router level</div>
                <div><span className="text-primary-light">docs:</span> update API authentication section</div>
                <div><span className="text-ink-faint">chore:</span> bump PHPStan to level 5</div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10 md:col-span-2">
              <h3 className="text-ink font-bold mb-4">Pull Request Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Tests pass locally (npm run lint, phpstan analyse)",
                  "No new SELECT * queries introduced",
                  "All SQL uses prepared statements",
                  "New API endpoints validate CSRF",
                  "No sensitive data in API responses",
                  "Docs updated if behavior changed",
                  "Migration file added for schema changes",
                  "PR description explains the why, not the what",
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm text-ink-muted">
                    <CheckCircle size={14} className="text-success shrink-0 mt-0.5" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ADRs */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <BookOpen size={22} className="text-warning" /> Architecture Decision Records
          </h2>
          <div className="space-y-3">
            {adrs.map((adr) => (
              <div key={adr.id} className="glass rounded-xl p-5 border border-white/10 flex gap-4">
                <span className="font-mono text-xs text-ink-faint bg-white/5 px-2.5 py-1 rounded-lg h-fit shrink-0 border border-white/10">
                  {adr.id}
                </span>
                <div>
                  <div className="text-ink font-semibold text-sm mb-1">{adr.title}</div>
                  <div className="text-ink-muted text-xs leading-relaxed">{adr.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <AlertCircle size={22} className="text-danger" /> Troubleshooting
          </h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Symptom</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold hidden md:table-cell">Root Cause</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {troubleshooting.map((t) => (
                  <tr key={t.issue} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 text-ink font-medium text-xs">{t.issue}</td>
                    <td className="px-5 py-3 text-ink-muted text-xs hidden md:table-cell">{t.cause}</td>
                    <td className="px-5 py-3 text-ink-muted text-xs">{t.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
