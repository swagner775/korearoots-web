import Link from "next/link";
import STRInfographic from "@/components/ui/STRInfographic";

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

export const metadata = {
  title: "How It Works — KoreaRoots",
  description:
    "A step-by-step guide to buying a 빈집 abandoned rural Korean property and obtaining a D-8 business investment visa.",
};

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Browse & Select a Property",
    body: <>Explore our curated <Term href="/about#binjip">빈집</Term> listings filtered by region, size, and budget. Every property is title-verified and assessed for business conversion potential.</>,
    detail: <>We source directly from Korean municipal <Term href="/about#binjip">빈집</Term> registers and private sellers, so you skip the noise.</>,
  },
  {
    number: "02",
    icon: "📋",
    title: "Structure Your Investment",
    body: <>Our advisory team structures your investment to meet <Term href="/about#molit">MOLIT</Term> requirements, conducts a full title search, and prepares the foreign investment declaration — coordinated through our partner law firms and government-approved channels.</>,
    detail: <>Minimum investment threshold: ₩100,000,000 (approx. $75,000 USD) to qualify for <Term href="/about#d8-visa">D-8 visa</Term> eligibility.</>,
  },
  {
    number: "03",
    icon: "🏛️",
    title: "Purchase & Entity Setup",
    body: <>We register your Korean business entity (법인), handle the property transfer at the local registry office, and ensure full <Term href="/about#fdi">FDI</Term> compliance at closing.</>,
    detail: "Typical timeline: 6–10 weeks from offer acceptance to title transfer.",
  },
  {
    number: "04",
    icon: "🛂",
    title: "D-8 Visa Application",
    body: <>With your registered investment in hand, we prepare and submit your <Term href="/about#d8-visa">D-8 business investment visa</Term> application to the Korean Immigration Service.</>,
    detail: <><Term href="/about#d8-visa">D-8 visa</Term> grants 2-year residency, renewable, with a path to <Term href="/about#f2-visa">F-2 long-term residency</Term>.</>,
  },
  {
    number: "05",
    icon: "🔨",
    title: "Renovation & Launch",
    body: <>Our network of local architects, contractors, and permit consultants turns your <Term href="/about#binjip">빈집</Term> into a short-term rental, guesthouse, café, or remote workspace.</>,
    detail: "Korean rural renovation grants (농촌 활성화) may offset up to 50% of renovation costs.",
  },
  {
    number: "06",
    icon: "🤝",
    title: "Ongoing Support",
    body: "We stay on as your in-country partner long after closing day — handling the details so you can focus on running your business.",
    detail: <>Founding members get ongoing advisory support included — tax filing, visa renewals, and <Term href="/about#str">STR management</Term>.</>,
  },
];

export default function HowItWorksPage() {
  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-20">

        {/* Page header */}
        <div className="flex flex-col items-center text-center gap-4 pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5">
            <span className="text-teal text-xs font-semibold uppercase tracking-widest">
              The Process
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            From browsing to{" "}
            <span className="text-gold">visa in hand</span>
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            A clear, end-to-end process designed for Western buyers with no prior
            Korean real estate or immigration experience required.
          </p>
        </div>

        {/* STR Roadmap */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <h2 className="text-xl font-bold text-white">The STR Roadmap</h2>
            <p className="text-white/40 text-sm max-w-lg">
              How KoreaRoots manages your property and generates income on your behalf — from purchase to passive revenue.
            </p>
          </div>
          <STRInfographic />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white text-center">The 6 Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-teal/30 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-white/10 leading-none">
                    {step.number}
                  </span>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-white text-base">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.body as React.ReactNode}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="text-xs text-teal/70 leading-relaxed">{step.detail as React.ReactNode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4 text-center pb-4">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <p className="text-white/40 text-sm max-w-sm">
            Browse available properties or learn more about our advisory services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/properties"
              className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
            >
              Browse Properties
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
