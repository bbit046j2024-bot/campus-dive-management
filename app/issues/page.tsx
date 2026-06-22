import type { Metadata } from "next";
import IssueCard from "@/components/ui/IssueCard";
import { Shield, Zap, Wrench, ExternalLink, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Issues & Solutions Hub",
  description: "Documented security vulnerabilities, performance bottlenecks, and maintainability gaps in Campus Dive v2 — with fixes and implementation guidance.",
};

export default function IssuesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Known Issues</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink mb-4">
            Issues &amp; <span className="gradient-text">Solutions Hub</span>
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed mb-6">
            A transparent, detailed record of identified security vulnerabilities, performance bottlenecks,
            and maintainability gaps — each with documented fixes, code examples, and implementation steps.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "GitHub Issue #1", href: "https://github.com/bbit046j2024-bot/campus-dive-v2/issues/1", color: "text-warning" },
              { label: "GitHub Issue #2", href: "https://github.com/bbit046j2024-bot/campus-dive-v2/issues/2", color: "text-danger" },
              { label: "GitHub Issue #3", href: "https://github.com/bbit046j2024-bot/campus-dive-v2/issues/3", color: "text-accent-light" },
            ].map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                 className={`inline-flex items-center gap-1.5 text-sm font-medium ${l.color} hover:underline`}>
                <ExternalLink size={13} /> {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Summary boxes */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
            { icon: <Shield size={20} />, label: "Security Issues", count: 4, color: "danger", desc: "2 Critical, 2 High" },
            { icon: <Zap size={20} />, label: "Performance Issues", count: 3, color: "warning", desc: "2 High, 1 Medium" },
            { icon: <Wrench size={20} />, label: "Maintainability", count: 4, color: "accent", desc: "2 Medium, 2 Low" },
          ].map((s) => {
            const bg: Record<string, string> = {
              danger: "bg-danger/10 border-danger/30 text-danger",
              warning: "bg-warning/10 border-warning/30 text-warning",
              accent: "bg-accent/10 border-accent/30 text-accent-light",
            };
            return (
              <div key={s.label} className={`glass rounded-2xl p-5 border ${bg[s.color]}`}>
                <div className={`inline-flex p-2.5 rounded-xl mb-3 ${bg[s.color]}`}>{s.icon}</div>
                <div className="text-3xl font-black text-ink mb-0.5">{s.count}</div>
                <div className="text-sm font-semibold text-ink mb-0.5">{s.label}</div>
                <div className="text-xs text-ink-muted">{s.desc}</div>
              </div>
            );
          })}
        </div>

        {/* ── SECURITY ISSUES ── */}
        <section className="mb-16" id="security">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-danger/20 text-danger"><Shield size={20} /></div>
            <div>
              <h2 className="text-2xl font-black text-ink">🔴 Security Issues</h2>
              <p className="text-ink-muted text-sm">Immediate action required — user data at risk</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-danger/5 border border-danger/20 mb-6 flex gap-3">
            <AlertTriangle size={18} className="text-danger shrink-0 mt-0.5" />
            <p className="text-sm text-ink-muted leading-relaxed">
              <strong className="text-danger">Why it matters:</strong> These vulnerabilities expose user data, enable unauthorized access,
              and risk privilege escalation. Deploy fixes to staging immediately; production by end of sprint.
            </p>
          </div>

          <div className="space-y-4">
            <IssueCard
              title="SQL Injection in Legacy Search Code"
              severity="CRITICAL"
              status="Open"
              issueNumber={2}
              problem="Legacy files use string interpolation directly in SQL queries, allowing attackers to inject malicious SQL via the search query parameter."
              impact="Returns ALL users instead of search results. Can be used to dump the entire database, bypass authentication, or delete records."
              vulnerableCode={`// legacy_site/search.php (VULNERABLE ❌)
$sql = "SELECT id, firstname, lastname, email 
        FROM users 
        WHERE role = 'user' 
        AND firstname LIKE '%$query%'";
// Input: %' OR '1'='1
// → Returns ALL users from database`}
              fixedCode={`// SAFE ✅ — Use prepared statements
$stmt = $conn->prepare(
  "SELECT id, firstname, lastname, email 
   FROM users 
   WHERE role = 'user' 
   AND (firstname LIKE ? OR lastname LIKE ?)"
);
$stmt->execute(["%$query%", "%$query%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);`}
              steps={[
                "Create a DatabaseWrapper class with PDO prepared statement methods",
                "Audit all legacy_site/* PHP files for string concatenation in SQL",
                "Replace all vulnerable patterns with prepared statements",
                "Add static security scanner (PHPStan + security-checker) to CI",
                "Write integration tests for search functionality",
                "Deploy to staging → user acceptance testing → production",
              ]}
            />

            <IssueCard
              title="Hardcoded Default Admin Credentials"
              severity="CRITICAL"
              status="Open"
              problem="The database.sql seed file contains a known default password (admin123) for the admin account. Production deployments may have these credentials unchanged."
              impact="Anyone who reads the public GitHub repository can log in as admin and access all student data, documents, and system controls."
              vulnerableCode={`-- database.sql (VULNERABLE ❌)
INSERT INTO users 
  (firstname, lastname, email, password, role, status)
VALUES 
  ('Admin', 'User', 'admin@campusdive.com',
   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
   'admin', 'approved');
-- Password: admin123 (KNOWN PUBLICLY!)`}
              fixedCode={`-- install.php — Generate secure random password
$securePassword = bin2hex(random_bytes(16));
$hash = password_hash($securePassword, PASSWORD_BCRYPT);

// Store in DB, email to admin, enforce change on first login
$stmt = $db->prepare(
  "INSERT INTO users (email, password, role, status, must_change_password)
   VALUES (?, ?, 'admin', 'approved', 1)"
);
$stmt->execute(['admin@campusdive.com', $hash]);`}
              steps={[
                "Run install.php wizard that generates a cryptographically secure random password",
                "Email generated credentials to the administrator on setup",
                "Add must_change_password flag to users table",
                "Force password change on first admin login",
                "Remove hardcoded password from database.sql",
                "Add deployment checklist verifying admin credentials have been changed",
              ]}
            />

            <IssueCard
              title="Missing Path Traversal Protection"
              severity="HIGH"
              status="Open"
              issueNumber={2}
              problem="File path construction in legacy_site/view_document.php uses the raw filename from the database without validating that the resolved path stays within the uploads directory."
              impact="An attacker who can manipulate filenames in the database could access files outside the uploads directory, including config.php with database credentials."
              vulnerableCode={`// legacy_site/view_document.php (VULNERABLE ❌)
$filepath = 'uploads/' . $doc['filename'];
// If $doc['filename'] = '../../config.php'
// → Reads: uploads/../../config.php → config.php!
if (!file_exists($filepath)) { die('Not found'); }
readfile($filepath);`}
              fixedCode={`// SAFE ✅ — Validate resolved path stays in uploads dir
$filename = basename($doc['filename']); // Strip directory traversal
if (!preg_match('/^[a-zA-Z0-9\._-]+$/', $filename)) {
    http_response_code(400); die('Invalid filename');
}
$uploadsDir = realpath(__DIR__ . '/uploads/');
$filepath   = realpath($uploadsDir . '/' . $filename);

// Critical check: ensure path is within uploads/
if (!$filepath || strpos($filepath, $uploadsDir) !== 0) {
    http_response_code(403); die('Access denied');
}
readfile($filepath);`}
              steps={[
                "Apply basename() to all file path operations to strip directory components",
                "Use realpath() to resolve the absolute path before serving",
                "Validate the resolved path starts with the uploads directory path",
                "Whitelist allowed file extensions (pdf, docx, jpg, png)",
                "Apply the same fix to all file-serving endpoints",
              ]}
            />

            <IssueCard
              title="Inconsistent CSRF Token Validation"
              severity="HIGH"
              status="Open"
              issueNumber={1}
              problem="CSRF validation via CsrfMiddleware::validate() is applied per-controller, not globally. Some POST endpoints may be missing this protection, allowing cross-site request forgery attacks."
              impact="An attacker can trick a logged-in admin into unknowingly submitting requests — deleting users, changing roles, or sending broadcasts."
              fixedCode={`// api/index.php — Enforce CSRF globally (SAFE ✅)
$method = $_SERVER['REQUEST_METHOD'];

// Apply CSRF check to ALL state-changing requests at router level
if (!in_array($method, ['GET', 'OPTIONS', 'HEAD'])) {
    CsrfMiddleware::validate(); // Single enforcement point
}

// Individual controllers no longer need to call validate()
// — it is guaranteed to have already run`}
              steps={[
                "Move CsrfMiddleware::validate() to the top of api/index.php, before route matching",
                "Remove duplicate CSRF calls from individual controllers",
                "Write integration test that verifies CSRF protection on all POST/PUT/DELETE routes",
                "Add CSRF token injection to the frontend API client (credentials: 'include')",
                "Document CSRF token refresh mechanism for long sessions",
              ]}
            />
          </div>
        </section>

        {/* ── PERFORMANCE ISSUES ── */}
        <section className="mb-16" id="performance">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-warning/20 text-warning"><Zap size={20} /></div>
            <div>
              <h2 className="text-2xl font-black text-ink">🟠 Performance Issues</h2>
              <p className="text-ink-muted text-sm">Baseline measured — clear targets set</p>
            </div>
          </div>

          {/* Before/After table */}
          <div className="glass rounded-2xl overflow-hidden border border-warning/20 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-warning/5 border-b border-warning/20">
                <tr>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Issue</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Severity</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Baseline</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/3">
                  <td className="px-5 py-3 text-ink font-medium">Missing Database Indexes</td>
                  <td className="px-5 py-3"><span className="badge-high">HIGH</span></td>
                  <td className="px-5 py-3 text-danger font-mono text-xs">200+ queries / page</td>
                  <td className="px-5 py-3 text-success font-mono text-xs">&lt;20 queries via JOINs</td>
                </tr>
                <tr className="hover:bg-white/3">
                  <td className="px-5 py-3 text-ink font-medium">N+1 Query Problem</td>
                  <td className="px-5 py-3"><span className="badge-high">HIGH</span></td>
                  <td className="px-5 py-3 text-danger font-mono text-xs">1.2s load (100 users)</td>
                  <td className="px-5 py-3 text-success font-mono text-xs">&lt;500ms</td>
                </tr>
                <tr className="hover:bg-white/3">
                  <td className="px-5 py-3 text-ink font-medium">Overfetching API Data</td>
                  <td className="px-5 py-3"><span className="badge-medium">MEDIUM</span></td>
                  <td className="px-5 py-3 text-danger font-mono text-xs">50KB per response</td>
                  <td className="px-5 py-3 text-success font-mono text-xs">&lt;10KB per response</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <IssueCard
              title="Missing Database Indexes on Foreign Keys"
              severity="HIGH"
              status="Open"
              issueNumber={3}
              problem="Foreign key columns used in JOIN operations and WHERE clauses (user_id, group_id, post_id) lack database indexes, causing full table scans on every query."
              impact="Admin dashboard triggers 200+ queries per page load. Degrades exponentially with user growth. 100 students = 1.2s; 1000 students = 12s+."
              fixedCode={`-- Add indexes to eliminate full table scans (SAFE ✅)
-- Run in MySQL once:
CREATE INDEX idx_documents_user_id    ON documents(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_group_members_group  ON group_members(group_id);
CREATE INDEX idx_group_members_user   ON group_members(user_id);
CREATE INDEX idx_posts_group_id       ON posts(group_id);
CREATE INDEX idx_posts_user_id        ON posts(user_id);
CREATE INDEX idx_comments_post_id     ON comments(post_id);
CREATE INDEX idx_likes_post_id        ON likes(post_id);
CREATE INDEX idx_messages_sender      ON messages(sender_id);
CREATE INDEX idx_messages_receiver    ON messages(receiver_id);`}
              steps={[
                "Run the index creation SQL script on the production database (zero-downtime)",
                "Use EXPLAIN SELECT to verify query plans show index usage",
                "Benchmark admin dashboard before and after (target: <20 queries)",
                "Add indexes to database.sql so new deployments include them",
              ]}
            />

            <IssueCard
              title="N+1 Query Problem in Admin Dashboard"
              severity="HIGH"
              status="Open"
              issueNumber={3}
              problem="Admin student list fetches all students (1 query), then loops to fetch each student's document count and notification count individually (N+N queries = 200+ total for 100 students)."
              vulnerableCode={`// AdminController.php (INEFFICIENT ❌)
$students = User::getAll(); // Query 1: get all students
foreach ($students as $student) {
    // Query 2 to N+1: one per student!
    $docs  = Document::getByUserId($student['id']);
    $notifs = Notification::getByUserId($student['id']);
    $student['doc_count']   = count($docs);
    $student['notif_count'] = count($notifs);
}`}
              fixedCode={`// EFFICIENT ✅ — Single query with JOINs
$stmt = $db->prepare("
  SELECT u.*,
    COUNT(DISTINCT d.id)  AS document_count,
    COUNT(DISTINCT n.id)  AS notification_count
  FROM users u
  LEFT JOIN documents     d ON d.user_id = u.id
  LEFT JOIN notifications n ON n.user_id = u.id
  WHERE u.role_id = ?
  GROUP BY u.id
  ORDER BY u.created_at DESC
  LIMIT ? OFFSET ?
");
$stmt->execute([$roleId, $limit, $offset]);`}
              steps={[
                "Rewrite AdminController::students() to use a single JOIN query",
                "Apply same pattern to all list endpoints that loop and query",
                "Add database indexes first (see issue above)",
                "Benchmark: expect drop from 1.2s to <200ms for 100 users",
              ]}
            />

            <IssueCard
              title="API Overfetching — Full Objects in List Views"
              severity="MEDIUM"
              status="Open"
              problem="List endpoints return complete user objects (including hashed passwords, all fields) even for paginated views that only display name, email, and status."
              vulnerableCode={`// Returns ~50KB for 20 users (WASTEFUL ❌)
SELECT * FROM users WHERE role = 'user';
// Includes: password_hash, google_id, created_at, all metadata`}
              fixedCode={`// Return only required fields (EFFICIENT ✅)
SELECT id, firstname, lastname, email, 
       student_id, status, avatar, created_at
FROM users
WHERE role = 'user'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
// ~5KB for 20 users — 90% reduction`}
              steps={[
                "Audit all SELECT * queries in controllers and replace with field lists",
                "Never return password_hash, google_id, or internal fields in API responses",
                "Create a toPublicArray() method on User model for safe serialization",
                "Implement API response pagination with configurable page size",
              ]}
            />
          </div>
        </section>

        {/* ── MAINTAINABILITY ── */}
        <section id="maintainability">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-accent/20 text-accent-light"><Wrench size={20} /></div>
            <div>
              <h2 className="text-2xl font-black text-ink">🟡 Maintainability &amp; DevOps</h2>
              <p className="text-ink-muted text-sm">Technical debt — address after critical items</p>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden border border-accent/20 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-accent/5 border-b border-accent/20">
                <tr>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Category</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Gap</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Recommendation</th>
                  <th className="text-left px-5 py-3 text-ink-muted font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { cat: "Code Quality", gap: "No PHPStan / static analysis", rec: "Add PHPStan level 5 to CI pipeline", pri: "MEDIUM" },
                  { cat: "Error Handling", gap: "Scattered ad-hoc logging", rec: "Implement structured Logger class with levels", pri: "MEDIUM" },
                  { cat: "DB Migrations", gap: "Manual schema changes", rec: "Create versioned migration system", pri: "LOW" },
                  { cat: "Testing", gap: "No automated test suite", rec: "Add PHPUnit for critical paths", pri: "LOW" },
                ].map((r) => (
                  <tr key={r.cat} className="hover:bg-white/3">
                    <td className="px-5 py-3 text-ink font-medium">{r.cat}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.gap}</td>
                    <td className="px-5 py-3 text-ink-muted">{r.rec}</td>
                    <td className="px-5 py-3">
                      <span className={r.pri === "MEDIUM" ? "badge-medium" : "badge-low"}>{r.pri}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <IssueCard
              title="No Static Analysis / Code Quality Tooling"
              severity="MEDIUM"
              status="Open"
              issueNumber={1}
              problem="The backend has no PHPStan or similar static analysis configured. Type errors, undefined variables, and logic bugs slip through to production undetected."
              fixedCode={`# Add to composer.json devDependencies:
composer require --dev phpstan/phpstan

# phpstan.neon config:
parameters:
    level: 5
    paths:
        - api/

# GitHub Actions (.github/workflows/ci.yml):
- name: Static Analysis
  run: vendor/bin/phpstan analyse`}
              steps={[
                "Install PHPStan as a dev dependency via Composer",
                "Start at level 3 (allows existing errors) then raise to level 5 gradually",
                "Add phpstan/analyse step to GitHub Actions CI workflow",
                "Fix all level 3 errors before merging to main",
              ]}
            />

            <IssueCard
              title="No Automated Test Suite"
              severity="LOW"
              status="Open"
              issueNumber={1}
              problem="There are no unit or integration tests for the PHP backend. Refactoring is risky without a safety net, and regressions reach production undetected."
              fixedCode={`# Install PHPUnit
composer require --dev phpunit/phpunit

# tests/AuthControllerTest.php
class AuthControllerTest extends TestCase {
    public function testLoginWithValidCredentials(): void {
        $response = $this->post('/api/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'securepassword',
        ]);
        $this->assertEquals(200, $response->status());
        $this->assertArrayHasKey('user', $response->json());
    }
    
    public function testLoginWithInvalidCredentials(): void {
        $response = $this->post('/api/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'wrong',
        ]);
        $this->assertEquals(401, $response->status());
    }
}`}
              steps={[
                "Install PHPUnit as dev dependency",
                "Write tests for AuthController (login, register, logout)",
                "Write tests for prepared statement security (SQL injection prevention)",
                "Add test runner to GitHub Actions CI",
                "Target 60%+ coverage on critical paths",
              ]}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
