import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const bgImage = "https://static.vecteezy.com/system/resources/previews/026/922/533/large_2x/ai-generative-happy-diverse-group-of-college-students-working-together-on-study-project-in-university-library-sitting-at-table-with-books-laptop-talking-discussing-research-learning-tasks-laughing-photo.jpg";

  return (
    <div 
      className="fixed inset-0 z-50 w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 overflow-hidden select-none"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-all" />

      {/* Content Container */}
      <div className="relative z-10 max-w-md w-full bg-zinc-950/75 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 text-center shadow-2xl animate-fade-in space-y-6">
        
        {/* Logo */}
        <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden shadow-inner">
          <Image src="/logo.png" alt="Campus Dive Logo" width={64} height={64} className="w-full h-full object-contain" priority />
        </div>

        {/* Branding & Copy */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Campus Dive Management
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Study & Project Collaboration Space
          </p>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          Connect with peers, collaborate on academic projects, and manage your campus workflows seamlessly in a secure workspace.
        </p>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            Access Workspace
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <p className="text-[10px] text-zinc-500">
          Secure authentication powered by Clerk. By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
