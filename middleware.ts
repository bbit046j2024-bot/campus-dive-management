import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // Match all paths except Next.js internals and API routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
