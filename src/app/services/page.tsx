import Link from "next/link";

export const metadata = {
  title: "Services & Pricing",
  description:
    "End-to-end advisory services for buying a Korean 빈집 property, setting up your business, and obtaining a D-8 visa — handled for you from start to finish.",
};

const services = [
  {
    icon: "🔍",
    title: "Property Search & Shortlist",
    description:
      "We search municipal 빈집 registers and private networks to build a curated shortlist of properties that match your budget, region preference, and business goals. Includes a due diligence report on each property.",
    includes: [
      "Up to 5 shortlisted properties",
      "Title & ownership verification",
      "Business conversion assessment",
      "Region & market analysis",
    ],
    price: "$1,200",
    unit: "one-time",
  },
  {
    icon: "🏛️",
    title: "FDI Structuring & Entity Setup",
    description:
      "We structure your investment to meet Korean FDI requirements and register your Korean business entity (법인). This is the legal foundation that makes your visa application possible.",
    includes: [
      "Korean 법인 company registration",
      "Foreign investment declaration",
      "Investment registration via partner law firms & government-approved channels",
      "Bank account setup guidance",
    ],
    price: "$2,400",
    unit: "one-time",
  },
  {
    icon: "🛂",
    title: "D-8 Visa Application",
    description:
      "Full preparation and submission of your D-8 business investment visa application to the Korean Immigration Service. We handle the paperwork, track the application, and brief you on every step.",
    includes: [
      "Full document preparation",
      "Application submission & tracking",
      "Immigration liaison on your behalf",
      "Approval briefing & next steps",
    ],
    price: "$1,800",
    unit: "one-time",
  },
  {
    icon: "🔨",
    title: "Renovation Management",
    description:
      "We manage your entire renovation remotely — hiring the architect, coordinating contractors, securing permits, and sending you weekly updates. You don't need to be in Korea for a single day of construction.",
    includes: [
      "Architect & contractor sourcing",
      "Permit filing through MOLIT",
      "Grant application (농촌 활성화)",
      "Weekly photo & progress reports",
    ],
    price: "12%",
    unit: "of renovation cost",
  },
  {
    icon: "📈",
    title: "STR Property Management",
    description:
      "Once your property is live, we run it as a short-term rental on your behalf — managing listings, guests, cleaning, and maintenance while you stay home and collect income.",
    includes: [
      "Airbnb, Booking.com & Wehome listing",
      "Guest communication & check-in",
      "Cleaning & maintenance coordination",
      "Monthly revenue reports",
    ],
    price: "18%",
    unit: "of rental revenue",
  },
  {
    icon: "📑",
    title: "Visa Renewal & Ongoing Advisory",
    description:
      "When your D-8 is up for renewal, we compile your revenue records, file your taxes, and resubmit to immigration. We also advise on the path to F-2 long-term residency.",
    includes: [
      "Annual tax filing",
      "D-8 renewal preparation & submission",
      "Revenue record compilation",
      "F-2 eligibility assessment",
    ],
    price: "$900",
    unit: "per year",
  },
];

const packages = [
  {
    name: "Essentials",
    tagline: "For buyers who want to find and secure the right property.",
    price: "$4,900",
    period: "one-time",
    highlight: false,
    features: [
      "Property search & shortlist (up to 5)",
      "Title & due diligence report",
      "FDI structuring & investment registration",
      "Korean 법인 entity setup",
      "D-8 visa application",
    ],
    cta: "Get Started",
    note: null,
  },
  {
    name: "Full Service",
    tagline: "Everything in Essentials, plus we manage your renovation and launch.",
    price: "$7,900",
    period: "one-time + 12% renovation",
    highlight: true,
    features: [
      "Everything in Essentials",
      "Renovation management",
      "Permit filing & grant application",
      "STR setup — photography, listings & pricing",
      "First 3 months STR management free",
    ],
    cta: "Most Popular",
    note: "Renovation management fee (12%) charged separately on actual renovation cost.",
  },
  {
    name: "Founding Member",
    tagline: "Full service plus ongoing management and advisory — our top-tier partnership.",
    price: "$7,900",
    period: "+ $299/mo ongoing",
    highlight: false,
    features: [
      "Everything in Full Service",
      "Ongoing STR management (18% → 12% member rate)",
      "Annual tax filing included",
      "D-8 renewal included every 2 years",
      "Priority access to new listings",
      "Direct access to your advisory team",
    ],
    cta: "Apply Now",
    note: "Founding Member spots are limited. Monthly fee covers ongoing advisory, tax, and visa renewal services.",
  },
];

const faqs = [
  {
    q: "Do I need to travel to Korea to buy a property?",
    a: "Not necessarily. Most of the process — consultations, shortlisting, and legal structuring — can be handled remotely. We recommend one in-person visit for the property viewing and signing, but we can work around that with a local power of attorney if needed.",
  },
  {
    q: "What's the minimum budget I need?",
    a: "The Korean government requires a minimum ₩100,000,000 (approx. $75,000 USD) investment to qualify for the D-8 visa. On top of that, budget for the property purchase price, renovation costs, and our advisory fees.",
  },
  {
    q: "How long does the whole process take?",
    a: "From first consultation to D-8 visa in hand is typically 4–6 months. Renovation and STR launch add another 3–4 months. Most clients are earning rental income within 7–9 months of starting.",
  },
  {
    q: "What if my visa renewal is denied?",
    a: "Denial is rare when the business has clear revenue records — which is exactly why we prioritise STR income from day one. In the unlikely event of complications, we handle the resubmission and immigration liaison at no extra cost.",
  },
  {
    q: "Can I do this without the visa and just own the property?",
    a: "Yes. Foreign nationals can own Korean real estate without a visa. However, most of our clients pursue the D-8 because it gives them the legal right to live in and operate their business in Korea.",
  },
];

export default function ServicesPage() {
  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-20 pt-8">

        {/* SaaS Membership */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5">
              <span className="text-teal text-xs font-semibold uppercase tracking-widest">Membership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              SaaS Membership
            </h2>
            <p className="text-white/40 text-sm max-w-lg">
              Access the platform — AI-translated 빈집 directory, D-8 eligibility tools, pre-screening resources, and community materials.
            </p>
          </div>
          <div className="max-w-sm mx-auto w-full rounded-2xl border border-teal/30 bg-teal/5 p-7 flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-gold">KRW 150,000</span>
              <span className="text-white/30 text-xs mt-0.5">per year (~$110 USD)</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                "AI-translated 빈집 (bin-jip) property directory",
                "Filter by region, price, and D-8 eligibility",
                "D-8 visa eligibility pre-screening tools",
                "Property pre-screening and shortlist tools",
                "Community resources and guides",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                  <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/consultation"
              className="mt-auto rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-center text-white hover:bg-white/10 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Packages */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5">
              <span className="text-teal text-xs font-semibold uppercase tracking-widest">Pricing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Choose your package
            </h1>
            <p className="text-white/40 text-sm max-w-lg">
              All packages include a free 30-minute consultation. No commitment until you&apos;re ready to move forward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col gap-5 rounded-2xl border p-7 ${
                  pkg.highlight
                    ? "border-teal/50 bg-teal/5 shadow-lg shadow-teal/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-teal px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <h2 className="text-white font-bold text-lg">{pkg.name}</h2>
                  <p className="text-white/40 text-xs leading-relaxed">{pkg.tagline}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-gold">{pkg.price}</span>
                  <span className="text-white/30 text-xs mt-0.5">{pkg.period}</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                      <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {pkg.note && (
                  <p className="text-xs text-white/25 leading-relaxed border-t border-white/10 pt-4">
                    {pkg.note}
                  </p>
                )}
                <Link
                  href="/consultation"
                  className={`mt-auto rounded-full px-6 py-3 text-sm font-semibold text-center transition-colors ${
                    pkg.highlight
                      ? "bg-teal text-white hover:bg-teal/80 shadow-lg shadow-teal/20"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Individual services */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Individual services
            </h2>
            <p className="text-white/40 text-sm max-w-lg">
              Already have part of the process sorted? Pick only what you need.
            </p>
            <p className="text-xs text-white/25 max-w-md">
              Note: STR Property Management and Renovation Management are Phase B services — available as standalone offerings post-launch. They are included in our Full Service and Founding Member packages from day one.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-teal/30 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="text-right">
                    <span className="text-gold font-black text-xl">{s.price}</span>
                    <p className="text-white/30 text-xs">{s.unit}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mt-1.5">{s.description}</p>
                </div>
                <ul className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/40">
                      <svg className="w-3.5 h-3.5 text-teal/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-white font-semibold text-sm mb-2">{faq.q}</p>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl border border-teal/20 bg-teal/5 p-10 flex flex-col items-center text-center gap-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Not sure which service is right for you?
          </h2>
          <p className="text-white/50 max-w-md leading-relaxed text-sm">
            Book a free 30-minute consultation. We&apos;ll walk through your situation, answer every question, and recommend the right path — with zero pressure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/consultation"
              className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
