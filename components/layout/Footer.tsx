"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, ExternalLink, Mail, AlertCircle } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();

  // Hide the footer completely ONLY on the root page
  if (pathname === "/") {
    return null;
  }

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
            <p className="text-ink-muted text-sm leading-relaxed mb-5">
              Transforming campus recruitment with a unified platform for students, administrators, and communities.
            </p>
            <a
              href="https://chat.whatsapp.com/LhZ1amfYHL5Ln5ogBkoNnw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              Join WhatsApp
            </a>
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
                <a href="https://chat.whatsapp.com/LhZ1amfYHL5Ln5ogBkoNnw" target="_blank" rel="noopener noreferrer"
                   className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5 mb-2">
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" /> WhatsApp Group
                </a>
              </li>
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
