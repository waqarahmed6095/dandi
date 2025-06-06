"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthActions() {
  const router = useRouter();

  return (
    <div className="flex gap-4 mt-4">
      <button
        className="rounded bg-red-500 text-white px-4 py-2"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <button
        className="rounded bg-blue-500 text-white px-4 py-2"
        onClick={() => router.push("/dashboard")}
      >
        Manage API Keys
      </button>
    </div>
  );
}
