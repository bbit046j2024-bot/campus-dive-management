import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex justify-center">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
