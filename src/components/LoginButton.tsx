"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "Profile photo"}
            className="w-8 h-8 rounded-full border"
          />
        )}
        <span className="text-sm">{session.user?.name || session.user?.email}</span>
        <button
          className="rounded bg-red-500 text-white px-4 py-2 ml-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button
      className="rounded bg-blue-500 text-white px-4 py-2"
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </button>
  );
}
