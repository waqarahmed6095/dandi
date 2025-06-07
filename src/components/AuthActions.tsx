"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthActions() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        className="px-5 py-2 rounded-full font-semibold shadow-md bg-gradient-to-r from-pink-500 to-red-500 text-white transition-all duration-200 hover:from-red-500 hover:to-pink-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-300"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <button
        className="px-5 py-2 rounded-full font-semibold shadow-md bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all duration-200 hover:from-purple-600 hover:to-blue-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </button>
    </div>
  );
}
