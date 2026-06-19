'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Login Admin Atlas</h2>
          
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
  
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">Username</label>
            <input name="username" type="text" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
  
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700">Password</label>
            <input name="password" type="password" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
  
          <button type="submit" disabled={loading} className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400">
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    );
}