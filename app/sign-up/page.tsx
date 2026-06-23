import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign Up" };

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex justify-center">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
