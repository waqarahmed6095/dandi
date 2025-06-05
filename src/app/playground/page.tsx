"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "../dashboard/lib/supabaseClient";

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("Please enter an API key.", {
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
      return;
    }
    setLoading(true);
    // Validate API key in Supabase (no .single())
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("key", apiKey)
      .limit(1);
    setLoading(false);
    if (!data || data.length === 0) {
      toast.error("API key is not valid.", {
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
      return;
    }
    // Store API key in localStorage for /protected page
    localStorage.setItem("playground_api_key", apiKey);
    toast.success("API key validated!", {
      style: {
        background: '#dcfce7',
        color: '#166534',
        border: '1px solid #86efac',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    });
    setTimeout(() => {
      router.push("/protected");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f8fa] p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#1a2233] mb-4 text-center">API Playground</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block text-sm font-semibold text-gray-800 mb-1">API Key</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Validating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
} 