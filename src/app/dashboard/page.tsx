import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

const visaStages = [
  { key: "consultation",  label: "Consultation",       icon: "💬" },
  { key: "property",      label: "Property Selected",  icon: "🏡" },
  { key: "legal",         label: "FDI & Legal Setup",  icon: "📋" },
  { key: "visa",          label: "D-8 Visa Applied",   icon: "🛂" },
  { key: "renovation",    label: "Renovation",         icon: "🔨" },
  { key: "live",          label: "Live & Earning",     icon: "📈" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const firstName = user.user_metadata?.first_name || user.email?.split("@")[0] || "there";
  const currentStage = user.user_metadata?.stage || "consultation";
  const currentIndex = visaStages.findIndex((s) => s.key === currentStage);

  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 flex flex-col gap-10 pt-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-sm">Welcome back</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize">
              {firstName} 👋
            </h1>
            <p className="text-white/40 text-sm">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Journey progress */}
        <div className="flex flex-col gap-5">
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest text-white/40">
            Your Journey
          </h2>
          <div className="flex flex-col gap-3">
            {visaStages.map((stage, i) => {
              const done = i < currentIndex;
              const active = i === currentIndex;
              return (
                <div
                  key={stage.key}
                  className={`flex items-center gap-4 rounded-2xl border p-5 transition-all ${
                    active
                      ? "border-teal/50 bg-teal/10"
                      : done
                      ? "border-white/10 bg-white/5"
                      : "border-white/5 bg-white/[0.02] opacity-40"
                  }`}
                >
                  <span className="text-xl shrink-0">{stage.icon}</span>
                  <span className={`text-sm font-medium flex-1 ${active ? "text-white" : done ? "text-white/60" : "text-white/30"}`}>
                    {stage.label}
                  </span>
                  {done && (
                    <span className="text-xs text-teal/60 font-semibold">Complete</span>
                  )}
                  {active && (
                    <span className="flex items-center gap-1.5 text-xs text-teal font-semibold">
                      <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                      In Progress
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-semibold text-sm uppercase tracking-widest text-white/40">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "🏡", label: "Browse Properties", href: "/properties" },
              { icon: "📖", label: "How It Works", href: "/how-it-works" },
              { icon: "💬", label: "Book a Call", href: "/consultation" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-teal/30 hover:bg-white/[0.07] transition-all"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-sm font-medium text-white/70">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 flex items-start gap-4">
          <span className="text-2xl shrink-0">🤝</span>
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold text-sm">Need help?</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Your advisory team is available Monday–Friday. Book a call or reply to your welcome email and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
