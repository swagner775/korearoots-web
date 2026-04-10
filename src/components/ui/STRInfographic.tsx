import Link from "next/link";
import React from "react";

function Term({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-teal underline underline-offset-2 decoration-teal/40 hover:decoration-teal transition-colors"
    >
      {children}
    </Link>
  );
}

const phases: {
  month: string;
  label: string;
  who: string;
  color: string;
  dot: string;
  text: string;
  items: React.ReactNode[];
}[] = [
  {
    month: "Month 1–3",
    label: "Purchase Complete",
    who: "KoreaRoots + You",
    color: "border-gold/40 bg-gold/10",
    dot: "bg-gold",
    text: "text-gold",
    items: [
      "Initial online consultation with KoreaRoots",
      "Property shortlist reviewed & site visits arranged",
      "In-person or virtual meetings with sellers",
      "Due diligence, title search & offer accepted",
      <><Term href="/about#fdi">FDI</Term> structured & registered through government-approved channels</>,
      <><Term href="/about#d8-visa">D-8</Term> visa application submitted</>,
    ],
  },
  {
    month: "Month 3–6",
    label: "Renovation",
    who: "KoreaRoots manages",
    color: "border-white/20 bg-white/5",
    dot: "bg-white/40",
    text: "text-white",
    items: [
      "Local architect & contractor hired",
      <>Permits secured through <Term href="/about#molit">MOLIT</Term></>,
      "Renovation grant application submitted",
      "You receive weekly photo updates remotely",
    ],
  },
  {
    month: "Month 6–7",
    label: "STR Setup",
    who: "KoreaRoots manages",
    color: "border-white/20 bg-white/5",
    dot: "bg-white/40",
    text: "text-white",
    items: [
      "Professional photography & listing copy",
      "Listed on Airbnb, Booking.com & Wehome",
      "Pricing strategy set for the region",
      "Guest communication templates ready",
    ],
  },
  {
    month: "Month 7+",
    label: "Live & Earning",
    who: "KoreaRoots manages",
    color: "border-teal/40 bg-teal/10",
    dot: "bg-teal",
    text: "text-teal",
    items: [
      "Bookings managed on your behalf",
      "Guests checked in & supported",
      "Cleaning & maintenance coordinated",
      "Monthly revenue reports sent to you",
    ],
  },
  {
    month: "Month 24–30",
    label: "Visa Renewal",
    who: "KoreaRoots + You",
    color: "border-teal/40 bg-teal/10",
    dot: "bg-teal",
    text: "text-teal",
    items: [
      <>Revenue records compiled as <Term href="/about#d8-visa">D-8</Term> evidence</>,
      "Tax filing completed by our accountant",
      <><Term href="/about#d8-visa">D-8</Term> renewal submitted to Immigration</>,
      <><Term href="/about#f2-visa">F-2</Term> eligibility assessment begins</>,
    ],
  },
];

const split: {
  role: string;
  color: string;
  labelColor: string;
  tasks: React.ReactNode[];
}[] = [
  {
    role: "You",
    color: "border-gold/30 bg-gold/5",
    labelColor: "text-gold",
    tasks: [
      "Own the property & Korean business entity",
      "Receive monthly income from bookings",
      "Approve major renovation or maintenance decisions",
      <>Hold the <Term href="/about#d8-visa">D-8</Term> visa in your home country</>,
    ],
  },
  {
    role: "KoreaRoots",
    color: "border-teal/30 bg-teal/5",
    labelColor: "text-teal",
    tasks: [
      <>Manage all <Term href="/about#str">STR</Term> listings & bookings</>,
      "Coordinate guests, check-in & cleaning",
      "Handle maintenance & local contractors",
      "File taxes, renew visa, keep records",
    ],
  },
];

export default function STRInfographic() {
  return (
    <div className="flex flex-col gap-10">

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/10 hidden sm:block" />

        {phases.map((phase, i) => (
          <div key={i} className="relative flex gap-5 pb-6 last:pb-0">
            <div className="relative z-10 hidden sm:flex flex-col items-center shrink-0">
              <div className={`w-10 h-10 rounded-full border-2 ${phase.color} flex items-center justify-center mt-1`}>
                <div className={`w-3 h-3 rounded-full ${phase.dot}`} />
              </div>
            </div>

            <div className={`flex-1 rounded-2xl border p-5 ${phase.color}`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-xs font-black uppercase tracking-widest ${phase.text}`}>
                  {phase.month}
                </span>
                <span className="text-white font-semibold text-sm">{phase.label}</span>
                <span className="ml-auto text-xs text-white/30 border border-white/10 rounded-full px-2.5 py-0.5">
                  {phase.who}
                </span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                    <span className={`mt-1 shrink-0 w-1.5 h-1.5 rounded-full ${phase.dot} opacity-70`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Who does what */}
      <div className="flex flex-col gap-3">
        <p className="text-xs text-white/30 uppercase tracking-widest font-semibold text-center">
          Who does what
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {split.map((s) => (
            <div key={s.role} className={`rounded-2xl border p-5 ${s.color}`}>
              <p className={`text-sm font-bold mb-3 ${s.labelColor}`}>{s.role}</p>
              <ul className="flex flex-col gap-2">
                {s.tasks.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                    <span className={`mt-1 shrink-0 w-1.5 h-1.5 rounded-full ${s.role === "You" ? "bg-gold" : "bg-teal"} opacity-70`} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue note */}
      <div className="rounded-2xl border border-teal/20 bg-teal/5 p-5 flex flex-col sm:flex-row gap-4 items-start">
        <span className="text-2xl shrink-0">💡</span>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-white">Why <Term href="/about#str">STR</Term> income matters for your visa</p>
          <p className="text-sm text-white/50 leading-relaxed">
            To renew your <Term href="/about#d8-visa">D-8</Term> visa, Korean Immigration requires evidence that your business is generating revenue. <Term href="/about#str">STR</Term> bookings create a clear, verifiable paper trail — guest records, platform payouts, and bank deposits — that satisfies this requirement and keeps your residency pathway on track.
          </p>
        </div>
      </div>

    </div>
  );
}
