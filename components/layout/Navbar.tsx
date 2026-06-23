"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";

const publicLinks: { href: string; label: string }[] = [];

const internalLinks = [
  { href: "/features",  label: "Features" },
  { href: "/docs",      label: "Docs" },
  { href: "/issues",    label: "Issues Hub" },
  { href: "/roadmap",   label: "Roadmap" },
  { href: "/resources", label: "Resources" },
  { href: "/standards", label: "Standards" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const logoHref = isSignedIn ? "/dashboard" : "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0F0F1A]/90 backdrop-blur-xl border-b border-white/10 shadow-card" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={logoHref} className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="Campus Dive Logo" className="h-8 w-auto object-contain rounded" />
            <span className="font-black text-lg tracking-tight">
              <span className="gradient-text">Campus Dive</span>
              <span className="text-ink-muted text-sm font-medium ml-1">v2</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {publicLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary/20 text-primary-light border border-primary/30"
                      : "text-ink-muted hover:text-ink hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <SignedIn>
              {internalLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-primary/20 text-primary-light border border-primary/30"
                        : "text-ink-muted hover:text-ink hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </SignedIn>
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/bbit046j2024-bot/campus-dive-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-outline text-sm py-2 px-4"
            >
              <BookOpen size={14} /> GitHub
            </a>

            <div className="flex items-center gap-2">
              <SignedOut>
                <Link href="/sign-in" className="btn-outline text-sm py-2 px-4 cursor-pointer">
                  Sign In
                </Link>
                <Link href="/sign-up" className="btn-primary text-sm py-2 px-4 rounded-xl cursor-pointer">
                  Join Now
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white/5 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0F0F1A]/95 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {publicLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active ? "bg-primary/20 text-primary-light" : "text-ink-muted hover:text-ink hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <SignedIn>
              {internalLinks.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active ? "bg-primary/20 text-primary-light" : "text-ink-muted hover:text-ink hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </SignedIn>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="w-full btn-outline text-sm py-2 px-4 justify-center cursor-pointer text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="w-full btn-primary text-sm py-2 px-4 rounded-xl justify-center cursor-pointer text-center"
                >
                  Join Now
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm font-medium text-ink-muted">My Account</span>
                </div>
              </SignedIn>
            </div>

            <a
              href="https://github.com/bbit046j2024-bot/campus-dive-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 btn-outline text-sm py-2 text-center"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
