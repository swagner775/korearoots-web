"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="flex-1 bg-navy min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center">
          <Image
            src="/BinJibLogo.png"
            alt="KoreaRoots"
            width={36}
            height={36}
            className="object-contain brightness-0 invert w-auto"
          />
          <span className="text-white font-bold text-lg tracking-tight">
            Korea <span className="text-teal">Roots</span>
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-xl font-bold text-white">Welcome back</h1>
            <p className="text-white/40 text-sm">Sign in to your client dashboard</p>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/consultation" className="text-teal hover:text-teal/80 transition-colors">
            Book a free consultation
          </Link>{" "}
          and we&apos;ll set you up.
        </p>

      </div>
    </main>
  );
}
