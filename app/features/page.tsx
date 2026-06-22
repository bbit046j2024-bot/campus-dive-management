import type { Metadata } from "next";
import FeaturePillar from "@/components/ui/FeaturePillar";
import { Users, TrendingUp, MessageSquare, Globe, LayoutDashboard, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the 6 core feature pillars of Campus Dive v2 — recruitment, tracking, messaging, social, admin, and document management.",
};

const pillars = [
  {
    title: "Student Recruitment",
    icon: <Users size={22} />,
    description: "End-to-end student onboarding with profile creation, document submission, and real-time status tracking through the recruitment pipeline.",
    color: "primary",
    features: [
      "Student profile creation with photo avatar upload",
      "Secure document upload (PDF, DOCX, images) with file size validation",
      "Application status tracking: Pending → Reviewed → Interview → Approved/Rejected",
      "Student ID and contact information management",
      "Email verification on registration",
      "Google OAuth single sign-on support",
      "Password reset via secure email token",
    ],
  },
  {
    title: "Live Application Tracking",
    icon: <TrendingUp size={22} />,
    description: "Real-time visibility into where each student stands in the recruitment pipeline, with interview scheduling and status broadcasts.",
    color: "success",
    features: [
      "Kanban-style application stage pipeline",
      "Admin can update individual or bulk student statuses",
      "Interview slot creation and scheduling system",
      "Email notification on status change",
      "48-hour average review SLA tracking",
      "Application export to CSV for reporting",
      "Audit trail of all status changes",
    ],
  },
  {
    title: "Direct Messaging",
    icon: <MessageSquare size={22} />,
    description: "Private 1:1 messaging between students and administrators, with conversation threading and unread count indicators.",
    color: "accent",
    features: [
      "Real-time direct messaging between any two users",
      "Conversation thread view with message history",
      "Unread message badge count in navigation",
      "Mark messages as read on open",
      "Delete entire conversation thread",
      "User search to start new conversations",
      "Admin broadcast announcements to all users",
    ],
  },
  {
    title: "Social Community Hub",
    icon: <Globe size={22} />,
    description: "A full-featured social network within the campus platform — groups, posts, comments, likes, and group chat.",
    color: "warning",
    features: [
      "Create public or private groups with custom descriptions",
      "Join/leave groups with membership management",
      "Global activity feed showing posts from all joined groups",
      "Rich post creation with URL media embedding",
      "Threaded comments on each post",
      "Like/unlike posts with live count",
      "Group-level real-time chat messaging",
      "Group Manager role with moderation controls",
      "Social profile with bio and activity history",
    ],
  },
  {
    title: "Admin Dashboard",
    icon: <LayoutDashboard size={22} />,
    description: "Comprehensive administration panel with user management, analytics, role-based access control, and system broadcasting.",
    color: "danger",
    features: [
      "Admin overview: total users, pending applications, documents, groups",
      "Full student roster with search, filter, and pagination",
      "Bulk student actions: approve, reject, export selected",
      "Role assignment: admin, manager, interviewer, user",
      "Custom permissions per role",
      "Analytics dashboard with Recharts visualizations",
      "Mass email broadcast to all or filtered users",
      "Social groups administration and moderation",
      "Health check endpoint monitoring",
    ],
  },
  {
    title: "Document Management",
    icon: <FileText size={22} />,
    description: "Secure, structured document storage with upload validation, admin verification, and organized retrieval per student.",
    color: "primary",
    features: [
      "Multi-format upload support: PDF, DOCX, PNG, JPG",
      "Server-side file size and MIME type validation",
      "Documents organized per student profile",
      "Admin document review and verification workflow",
      "Secure file serving with permission checks",
      "Document deletion with confirmation",
      "File metadata tracking: upload date, type, size",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">Platform Capabilities</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink mb-4">
            6 Core <span className="gradient-text">Feature Pillars</span>
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Every aspect of campus recruitment and community management — built with care, documented with detail.
            Click any pillar to expand its full feature list.
          </p>
        </div>

        {/* Pillars */}
        <div className="space-y-4">
          {pillars.map((p) => (
            <FeaturePillar key={p.title} {...p} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 glass rounded-2xl p-8 text-center border border-primary/20">
          <h2 className="text-2xl font-black text-ink mb-3">Ready to explore the architecture?</h2>
          <p className="text-ink-muted mb-6">Understand how these features are built under the hood — stack, data flow, and API design.</p>
          <a href="/docs" className="btn-primary">View Technical Docs</a>
        </div>
      </div>
    </div>
  );
}
