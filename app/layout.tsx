import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { default: "Campus Dive v2 Docs", template: "%s | Campus Dive v2" },
  description: "Comprehensive documentation for Campus Dive v2 — the campus recruitment and community management platform. Architecture, features, security issues, roadmap and developer resources.",
  keywords: ["campus recruitment", "student platform", "documentation", "open source", "PHP", "React"],
  authors: [{ name: "Campus Dive Team" }],
  openGraph: {
    title: "Campus Dive v2 Documentation",
    description: "Transforming campus recruitment with a unified platform for students, admins, and community.",
    type: "website",
    url: "https://campus-dive-v2.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
