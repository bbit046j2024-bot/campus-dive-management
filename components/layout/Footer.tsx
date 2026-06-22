import Link from "next/link";
import { Github, ExternalLink, Mail, AlertCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Campus Dive Logo" className="h-8 w-auto object-contain rounded" />
              <span className="font-black text-lg gradient-text">Campus Dive v2</span>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed">
              Transforming campus recruitment with a unified platform for students, administrators, and communities.
            </p>
          </div>

          {/* Docs */}
          <div>
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Documentation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Overview" },
                { href: "/features", label: "Features" },
                { href: "/docs", label: "Architecture" },
                { href: "/issues", label: "Issues Hub" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-primary-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dev */}
          <div>
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Developers</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/roadmap",   label: "Roadmap" },
                { href: "/resources", label: "Resources" },
                { href: "/standards", label: "Code Standards" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-primary-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/bbit046j2024-bot/campus-dive-v2" target="_blank" rel="noopener noreferrer"
                   className="text-ink-muted hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <Github size={14} /> GitHub Repo
                </a>
              </li>
              <li>
                <a href="https://campus-dive-v2.vercel.app" target="_blank" rel="noopener noreferrer"
                   className="text-ink-muted hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <ExternalLink size={14} /> Live App
                </a>
              </li>
              <li>
                <a href="https://github.com/bbit046j2024-bot/campus-dive-v2/issues" target="_blank" rel="noopener noreferrer"
                   className="text-ink-muted hover:text-danger transition-colors flex items-center gap-1.5">
                  <AlertCircle size={14} /> GitHub Issues
                </a>
              </li>
              <li>
                <a href="mailto:admin@campusdive.com"
                   className="text-ink-muted hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <Mail size={14} /> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Lead Developer */}
          <div className="md:col-span-1">
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Lead Developer</h3>
            <div className="flex items-center gap-3 mb-3">
              <img src="/developer.png" alt="Onyango Elisha Adera" className="w-10 h-10 rounded-full object-cover border border-white/20" />
              <div>
                <p className="text-sm font-bold text-ink">Onyango E. Adera</p>
                <p className="text-[11px] text-ink-muted">TUM Student</p>
              </div>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mb-2">
              Technical University of Mombasa
            </p>
            <div className="space-y-1 text-xs mb-3">
              <a href="mailto:bbit046j2024@students.tum.ac.ke" className="block text-primary-light hover:underline truncate" title="bbit046j2024@students.tum.ac.ke">
                bbit046j2024@students.tum.ac.ke
              </a>
              <p className="text-ink-muted">Tel: 0797844540</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <img src="/university.png" alt="Technical University of Mombasa" className="h-8 w-auto object-contain rounded bg-white/5 p-1" title="Technical University of Mombasa" />
              <img src="/motivation.jpg" alt="Educational Motivation" className="h-8 w-auto object-contain rounded bg-white/5 p-1" title="Educational Motivation" />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-faint text-xs">
            © 2026 Campus Dive. Open-source under MIT License.
          </p>
          <p className="text-ink-faint text-xs">
            Built with Next.js 14 · Tailwind CSS · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
