"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/50 hover:text-white hover:border-white/20 transition-colors"
    >
      Sign Out
    </button>
  );
}
