"use client";

import { useState } from "react";
import { Shield, Code2, RefreshCw, AlertTriangle, Copy, Check } from "lucide-react";
import AuditMarkdown from "@/components/ui/AuditMarkdown";

const EXAMPLE_SNIPPETS = [
  {
    label: "SQLi — Login Query (PHP)",
    lang: "php",
    code: `<?php
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $_SESSION['user'] = mysqli_fetch_assoc($result);
    header("Location: /dashboard");
}`,
  },
  {
    label: "XSS — Search Output (PHP)",
    lang: "php",
    code: `<?php
$search = $_GET['q'];
echo "<h2>Results for: " . $search . "</h2>";
$results = $db->query("SELECT * FROM posts WHERE title LIKE '%$search%'");`,
  },
  {
    label: "IDOR — File Download (Node.js)",
    lang: "javascript",
    code: `app.get('/download', (req, res) => {
  const filename = req.query.file;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath);
});`,
  },
];

export default function AuditPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const runAudit = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please perform a comprehensive security audit on the following code:\n\`\`\`\n${code}\n\`\`\``,
            },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `${res.status}`);
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-primary-light text-xs font-bold uppercase tracking-widest mb-2">AI Code Auditor</p>
          <h1 className="text-3xl font-black text-ink mb-2">Security Audit <span className="gradient-text">Workspace</span></h1>
          <p className="text-ink-muted text-sm">Paste any code snippet to receive a technical severity-ranked audit with remediation.</p>
        </div>

        {/* Example Snippets */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-2">Load an Example</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_SNIPPETS.map((s) => (
              <button
                key={s.label}
                onClick={() => setCode(s.code)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 text-xs text-ink-muted hover:text-ink transition-all"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Code Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-ink-muted uppercase tracking-widest">
                <Code2 size={13} /> Code Input
              </label>
              <button
                onClick={() => { setCode(""); setResult(""); setError(""); }}
                className="text-[10px] text-ink-faint hover:text-ink-muted transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Paste your code here...\n\nExample:\n<?php\n$sql = "SELECT * FROM users WHERE email='$_POST[email]'";\n$result = mysqli_query($conn, $sql);`}
              rows={22}
              className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-ink placeholder:text-ink-faint focus:outline-none focus:border-primary/50 resize-none transition-colors leading-relaxed"
              disabled={loading}
            />
            <button
              onClick={runAudit}
              disabled={loading || !code.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark disabled:from-white/5 disabled:to-white/5 disabled:text-ink-faint text-white font-bold text-sm transition-all"
            >
              {loading ? (
                <><RefreshCw size={15} className="animate-spin" /> Auditing…</>
              ) : (
                <><Shield size={15} /> Run Security Audit</>
              )}
            </button>
          </div>

          {/* Audit Result */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-ink-muted uppercase tracking-widest">
                <Shield size={13} /> Audit Report
              </label>
              {result && (
                <button onClick={copyResult} className="flex items-center gap-1 text-[10px] text-ink-faint hover:text-ink-muted transition-colors">
                  {copied ? <Check size={11} className="text-success" /> : <Copy size={11} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 min-h-[460px] max-h-[560px] overflow-y-auto">
              {!result && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                    <Shield size={22} className="text-primary-light" />
                  </div>
                  <p className="text-ink-muted text-sm font-medium">Audit report will appear here</p>
                  <p className="text-ink-faint text-xs mt-1">Paste code and click Run Security Audit</p>
                </div>
              )}
              {loading && (
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <p className="text-ink-muted text-xs">Scanning for vulnerabilities…</p>
                </div>
              )}
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
              {result && <AuditMarkdown content={result} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
