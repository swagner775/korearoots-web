"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1 — About you
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  heardFrom: string;
  // Step 2 — Your investment
  budget: string;
  timeline: string;
  priorRealEstate: string;
  livedAbroad: string;
  // Step 3 — Property goals
  regions: string[];
  propertyUse: string[];
  propertySize: string;
  // Step 4 — Visa & legal
  visaGoals: string[];
  priorVisaIssues: string;
  hasKoreanAdvisor: string;
  // Step 5 — Final details
  biggestConcerns: string[];
  callNotes: string;
  timezone: string;
};

const empty: FormData = {
  firstName: "", lastName: "", email: "", country: "", heardFrom: "",
  budget: "", timeline: "", priorRealEstate: "", livedAbroad: "",
  regions: [], propertyUse: [], propertySize: "",
  visaGoals: [], priorVisaIssues: "", hasKoreanAdvisor: "",
  biggestConcerns: [], callNotes: "", timezone: "",
};

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  "About You",
  "Your Investment",
  "Property Goals",
  "Visa & Legal",
  "Final Details",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Radio({
  name, value, current, label, onChange,
}: { name: string; value: string; current: string; label: string; onChange: (v: string) => void }) {
  const checked = current === value;
  return (
    <label className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all text-sm ${checked ? "border-teal/60 bg-teal/10 text-white" : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"}`}>
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${checked ? "border-teal" : "border-white/20"}`}>
        {checked && <span className="w-2 h-2 rounded-full bg-teal" />}
      </span>
      {label}
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
    </label>
  );
}

function Checkbox({
  value, checked, label, onChange,
}: { value: string; checked: boolean; label: string; onChange: (v: string) => void }) {
  return (
    <label className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all text-sm ${checked ? "border-teal/60 bg-teal/10 text-white" : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"}`}>
      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${checked ? "border-teal bg-teal" : "border-white/20"}`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label}
      <input type="checkbox" value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
    </label>
  );
}

function TextInput({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal/50 focus:bg-white/[0.07] transition-all"
      />
    </div>
  );
}

function Question({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-white font-semibold text-sm">{label}</p>
        {hint && <p className="text-white/30 text-xs mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ConsultationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggle = (field: keyof FormData, value: string) =>
    setForm((f) => {
      const arr = f[field] as string[];
      return { ...f, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });

  const progress = ((step + 1) / STEPS.length) * 100;

  if (submitted) {
    return (
      <main className="flex-1 bg-navy min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="mx-auto max-w-lg px-6 text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-3xl">
            🎉
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">You&apos;re booked in.</h1>
          <p className="text-white/50 leading-relaxed">
            Thanks, <span className="text-white font-medium">{form.firstName}</span>. We&apos;ve received your intake form and will reach out to <span className="text-teal">{form.email}</span> within 24 hours to confirm your consultation time.
          </p>
          <p className="text-white/30 text-sm">
            Come prepared with any photos of properties you&apos;ve seen, your budget range, and any questions you want answered. We&apos;ll handle the rest.
          </p>
          <a
            href="/"
            className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 flex flex-col gap-8 pt-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 w-fit">
            <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="text-teal text-xs font-semibold uppercase tracking-widest">Free Consultation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Tell us about your goals
          </h1>
          <p className="text-white/40 text-sm leading-relaxed">
            5 short steps — takes about 3 minutes. This lets us skip the discovery chat and get straight to your situation on the call.
          </p>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-white/30">
            <span>Step {step + 1} of {STEPS.length} — {STEPS[step]}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10">
            <div
              className="h-1.5 rounded-full bg-teal transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 flex flex-col gap-7">

          {/* ── Step 1: About You ─────────────────────────────────────────── */}
          {step === 0 && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <TextInput label="First name" placeholder="Jane" value={form.firstName} onChange={(v) => set("firstName", v)} />
                <TextInput label="Last name" placeholder="Smith" value={form.lastName} onChange={(v) => set("lastName", v)} />
              </div>
              <TextInput label="Email address" placeholder="jane@email.com" value={form.email} onChange={(v) => set("email", v)} type="email" />
              <TextInput label="Country of residence" placeholder="e.g. United States, UK, Canada..." value={form.country} onChange={(v) => set("country", v)} />
              <Question label="How did you hear about KoreaRoots?">
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Google search", "Social media", "YouTube", "Podcast", "Friend or referral", "Reddit", "News article", "Other"].map((o) => (
                    <Radio key={o} name="heardFrom" value={o} current={form.heardFrom} label={o} onChange={(v) => set("heardFrom", v)} />
                  ))}
                </div>
              </Question>
            </>
          )}

          {/* ── Step 2: Your Investment ───────────────────────────────────── */}
          {step === 1 && (
            <>
              <Question label="What is your total available investment budget?" hint="Including property purchase, renovation, and advisory fees.">
                <div className="flex flex-col gap-2">
                  {[
                    "Under $75,000",
                    "$75,000 – $100,000",
                    "$100,000 – $150,000",
                    "$150,000 – $200,000",
                    "$200,000+",
                    "Not sure yet",
                  ].map((o) => (
                    <Radio key={o} name="budget" value={o} current={form.budget} label={o} onChange={(v) => set("budget", v)} />
                  ))}
                </div>
              </Question>
              <Question label="When are you looking to move forward?">
                <div className="flex flex-col gap-2">
                  {[
                    "As soon as possible (0–3 months)",
                    "Soon (3–6 months)",
                    "Planning ahead (6–12 months)",
                    "Just researching for now",
                  ].map((o) => (
                    <Radio key={o} name="timeline" value={o} current={form.timeline} label={o} onChange={(v) => set("timeline", v)} />
                  ))}
                </div>
              </Question>
              <Question label="Have you invested in real estate before?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Yes", "No", "Currently own property"].map((o) => (
                    <Radio key={o} name="priorRealEstate" value={o} current={form.priorRealEstate} label={o} onChange={(v) => set("priorRealEstate", v)} />
                  ))}
                </div>
              </Question>
              <Question label="Have you ever lived or worked in a foreign country?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Yes", "No", "Currently do"].map((o) => (
                    <Radio key={o} name="livedAbroad" value={o} current={form.livedAbroad} label={o} onChange={(v) => set("livedAbroad", v)} />
                  ))}
                </div>
              </Question>
            </>
          )}

          {/* ── Step 3: Property Goals ────────────────────────────────────── */}
          {step === 2 && (
            <>
              <Question label="Which region(s) of Korea interest you?" hint="Select all that apply.">
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Gangwon", "Gyeongbuk", "Gyeongnam", "Jeonbuk", "Jeonnam", "Chungbuk", "Chungnam", "Jeju", "No preference — show me everything"].map((o) => (
                    <Checkbox key={o} value={o} checked={form.regions.includes(o)} label={o} onChange={(v) => toggle("regions", v)} />
                  ))}
                </div>
              </Question>
              <Question label="What do you want to do with the property?" hint="Select all that apply.">
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Short-term rental / Airbnb income",
                    "Personal retreat / holiday home",
                    "Boutique guesthouse",
                    "Café or small restaurant",
                    "Remote work studio",
                    "Long-term rental",
                    "Not sure yet",
                  ].map((o) => (
                    <Checkbox key={o} value={o} checked={form.propertyUse.includes(o)} label={o} onChange={(v) => toggle("propertyUse", v)} />
                  ))}
                </div>
              </Question>
              <Question label="What size property are you looking for?">
                <div className="flex flex-col gap-2">
                  {[
                    "Small — cozy retreat (under 50㎡ building)",
                    "Medium — comfortable home (50–100㎡)",
                    "Large — space to grow (100㎡+)",
                    "No preference",
                  ].map((o) => (
                    <Radio key={o} name="propertySize" value={o} current={form.propertySize} label={o} onChange={(v) => set("propertySize", v)} />
                  ))}
                </div>
              </Question>
            </>
          )}

          {/* ── Step 4: Visa & Legal ──────────────────────────────────────── */}
          {step === 3 && (
            <>
              <Question label="What is your main goal with the D-8 visa?" hint="Select all that apply.">
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Legal right to live in Korea",
                    "Path to F-2 long-term residency",
                    "Run my business from Korea",
                    "I just want the property — not the visa",
                    "Not sure yet",
                  ].map((o) => (
                    <Checkbox key={o} value={o} checked={form.visaGoals.includes(o)} label={o} onChange={(v) => toggle("visaGoals", v)} />
                  ))}
                </div>
              </Question>
              <Question label="Have you had any previous visa issues or immigration complications?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Yes", "No", "Prefer not to say"].map((o) => (
                    <Radio key={o} name="priorVisaIssues" value={o} current={form.priorVisaIssues} label={o} onChange={(v) => set("priorVisaIssues", v)} />
                  ))}
                </div>
              </Question>
              <Question label="Do you already have a Korean attorney or accountant?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Yes", "No", "I have referrals but nothing confirmed"].map((o) => (
                    <Radio key={o} name="hasKoreanAdvisor" value={o} current={form.hasKoreanAdvisor} label={o} onChange={(v) => set("hasKoreanAdvisor", v)} />
                  ))}
                </div>
              </Question>
            </>
          )}

          {/* ── Step 5: Final Details ─────────────────────────────────────── */}
          {step === 4 && (
            <>
              <Question label="What is your biggest concern about this process?" hint="Select all that apply.">
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Language barrier",
                    "Legal complexity",
                    "Managing the property remotely",
                    "Getting the visa approved",
                    "Finding the right property",
                    "Understanding all the costs",
                    "Whether this is right for me",
                    "Something else",
                  ].map((o) => (
                    <Checkbox key={o} value={o} checked={form.biggestConcerns.includes(o)} label={o} onChange={(v) => toggle("biggestConcerns", v)} />
                  ))}
                </div>
              </Question>
              <Question label="Is there anything specific you want to cover on the call?" hint="Optional — the more detail you give us, the more useful the call will be.">
                <textarea
                  rows={4}
                  placeholder="e.g. I want to understand the full cost breakdown, I've seen a specific property in Gangwon I want to ask about, I'm not sure if my budget qualifies..."
                  value={form.callNotes}
                  onChange={(e) => setForm((f) => ({ ...f, callNotes: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal/50 focus:bg-white/[0.07] transition-all resize-none w-full"
                />
              </Question>
              <TextInput
                label="Your timezone"
                placeholder="e.g. EST (New York), GMT (London), PST (Los Angeles)..."
                value={form.timezone}
                onChange={(v) => set("timezone", v)}
              />
            </>
          )}

        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="rounded-full bg-teal px-8 py-3 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
            >
              Continue →
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {submitError && (
                <p className="text-red-400 text-xs">{submitError}</p>
              )}
              <button
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  setSubmitError("");
                  try {
                    const res = await fetch("/api/consultation", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(form),
                    });
                    if (!res.ok) throw new Error("Failed");
                    setSubmitted(true);
                  } catch {
                    setSubmitError("Something went wrong — please try again or email us directly.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="rounded-full bg-teal px-8 py-3 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit & Book My Call →"}
              </button>
            </div>
          )}
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 pb-4">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === step ? "w-6 h-2 bg-teal" : i < step ? "w-2 h-2 bg-teal/40" : "w-2 h-2 bg-white/10"}`}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
