import type { Metadata } from "next";
import { Code, Database, Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Code Quality & Standards",
  description: "PHP, React, and database coding standards for Campus Dive v2 contributors.",
};

export default function StandardsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Coding Standards</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink mb-4">
            Code Quality &amp; <span className="gradient-text">Standards</span>
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed">
            Consistent patterns across PHP, React, and SQL ensure maintainability, security, and readability for all contributors.
          </p>
        </div>

        {/* PHP Standards */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Code size={22} className="text-accent-light" /> PHP Standards
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Naming Conventions",
                code: `// Classes: PascalCase
class UserController { }
class EmailService { }

// Methods & variables: camelCase
public function getStudentById(int $id): array { }
$studentData = [];

// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5242880; // 5MB

// Files: PascalCase matching class name
// UserController.php, EmailService.php`,
              },
              {
                title: "Type Hints (Required)",
                code: `// ✅ REQUIRED — Always use type hints
public function login(string $email, string $password): array
{
    $user = $this->db->fetchOne(
        "SELECT * FROM users WHERE email = ?",
        [$email]
    );
    if (!$user || !password_verify($password, $user['password'])) {
        throw new AuthException('Invalid credentials', 401);
    }
    return $user;
}

// ❌ AVOID — No types, unclear contract
public function login($email, $password) {
    // ...
}`,
              },
              {
                title: "Prepared Statements (Mandatory)",
                code: `// ✅ ALWAYS use prepared statements
$stmt = $db->prepare(
    "SELECT id, firstname, lastname, email 
     FROM users 
     WHERE role = ? AND status = ?"
);
$stmt->execute([$role, $status]);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ❌ NEVER interpolate variables into SQL
$sql = "SELECT * FROM users WHERE email = '$email'"; // VULNERABLE`,
              },
              {
                title: "Error Handling",
                code: `// ✅ Structured error responses
try {
    $user = $this->authService->login($email, $password);
    Response::success($user, 'Login successful');
} catch (AuthException $e) {
    Response::error($e->getMessage(), $e->getCode());
} catch (\\Exception $e) {
    error_log('[AuthController] Unexpected error: ' . $e->getMessage());
    Response::error('Internal server error', 500);
}

// ✅ Response helper (consistent format)
// Response::success($data, $message = 'OK', $code = 200)
// Response::error($message, $code = 400)`,
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl overflow-hidden border border-white/10">
                <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                  <span className="text-sm font-semibold text-ink">{item.title}</span>
                </div>
                <pre className="p-5 text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* React Standards */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Code size={22} className="text-primary-light" /> React Best Practices
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Component Structure",
                code: `// ✅ Functional components with TypeScript interfaces
interface StudentCardProps {
  student: {
    id: number;
    firstname: string;
    lastname: string;
    status: 'pending' | 'approved' | 'rejected';
  };
  onStatusChange: (id: number, status: string) => void;
}

export default function StudentCard({ student, onStatusChange }: StudentCardProps) {
  // 1. Hooks (always at top, never conditional)
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // 2. Derived state / computed values
  const fullName = \`\${student.firstname} \${student.lastname}\`;

  // 3. Event handlers
  const handleApprove = async () => { ... };

  // 4. Render
  return <div>...</div>;
}`,
              },
              {
                title: "Data Fetching Pattern",
                code: `// ✅ Consistent fetch pattern with loading/error states
const [students, setStudents] = useState<Student[]>([]);
const [loading, setLoading]   = useState(true);
const [error, setError]       = useState<string | null>(null);

useEffect(() => {
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/students', {
        credentials: 'include', // Always include cookies!
      });
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      setStudents(data.students);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  fetchStudents();
}, []);`,
              },
              {
                title: "Error Boundaries",
                code: `// ✅ Wrap route-level components with error boundaries
// app/dashboard/layout.tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-bold text-danger">Something went wrong</h2>
      <p className="text-ink-muted text-sm">{error.message}</p>
      <button onClick={() => window.location.reload()} className="btn-primary">
        Reload Page
      </button>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}`,
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl overflow-hidden border border-white/10">
                <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                  <span className="text-sm font-semibold text-ink">{item.title}</span>
                </div>
                <pre className="p-5 text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Database Standards */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Database size={22} className="text-success" /> Database Patterns
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Query Optimization",
                code: `-- ✅ Always use specific column lists (never SELECT *)
SELECT u.id, u.firstname, u.lastname, u.email, u.status,
       COUNT(DISTINCT d.id) AS document_count
FROM users u
LEFT JOIN documents d ON d.user_id = u.id
WHERE u.role = 'user'
  AND u.status = 'pending'
GROUP BY u.id
ORDER BY u.created_at DESC
LIMIT 20 OFFSET 0;

-- ✅ Use EXPLAIN to verify index usage
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
-- Should show: key = idx_users_email (not NULL)`,
              },
              {
                title: "Index Strategy",
                code: `-- ✅ Index all foreign keys used in JOINs
CREATE INDEX idx_documents_user_id     ON documents(user_id);
CREATE INDEX idx_posts_group_id        ON posts(group_id);
CREATE INDEX idx_comments_post_id      ON comments(post_id);

-- ✅ Index columns used in WHERE clauses
CREATE INDEX idx_users_email           ON users(email);
CREATE INDEX idx_users_status_role     ON users(status, role);

-- ✅ Composite indexes for common filter patterns
CREATE INDEX idx_messages_sender_read  ON messages(sender_id, is_read);`,
              },
              {
                title: "Migration Format",
                code: `-- migrations/003_add_must_change_password.sql
-- Description: Add must_change_password flag for initial admin setup
-- Author: dev-name
-- Date: 2026-06-22

ALTER TABLE users 
  ADD COLUMN must_change_password TINYINT(1) NOT NULL DEFAULT 0
  AFTER status;

-- Verify migration
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'users' AND COLUMN_NAME = 'must_change_password';`,
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl overflow-hidden border border-white/10">
                <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                  <span className="text-sm font-semibold text-ink">{item.title}</span>
                </div>
                <pre className="p-5 text-xs font-mono text-ink-muted overflow-x-auto leading-relaxed">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Security Checklist */}
        <section>
          <h2 className="text-2xl font-black text-ink mb-6 flex items-center gap-2">
            <Shield size={22} className="text-warning" /> Security Checklist
          </h2>
          <div className="glass rounded-2xl p-6 border border-warning/20">
            <p className="text-ink-muted text-sm mb-6">Every PR touching the backend must satisfy these checks before merge:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { item: "All SQL uses prepared statements (no string interpolation)", critical: true },
                { item: "No SELECT * in any query — explicit column lists only", critical: true },
                { item: "CSRF token validated on all POST/PUT/DELETE endpoints", critical: true },
                { item: "File uploads validated: MIME type, extension, size limit", critical: true },
                { item: "Uploaded file paths sanitized with basename() + realpath()", critical: true },
                { item: "No sensitive fields in API responses (password_hash, google_id)", critical: true },
                { item: "Input length validated before database insertion", critical: false },
                { item: "Session uses HTTP-only, Secure, SameSite=None cookies", critical: false },
                { item: "New endpoints added to CORS whitelist if needed", critical: false },
                { item: "Error messages don't expose internal stack traces", critical: false },
                { item: "PHPStan passes at configured level", critical: false },
                { item: "No hardcoded credentials or tokens in source code", critical: true },
              ].map((c) => (
                <div key={c.item} className={`flex items-start gap-2.5 text-sm p-3 rounded-xl ${c.critical ? "bg-danger/5 border border-danger/10" : "bg-white/3 border border-white/5"}`}>
                  <CheckCircle size={15} className={`shrink-0 mt-0.5 ${c.critical ? "text-danger" : "text-success"}`} />
                  <span className="text-ink-muted leading-snug">{c.item}</span>
                  {c.critical && <span className="badge-critical ml-auto shrink-0">Required</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
