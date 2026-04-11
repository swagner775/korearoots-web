import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeatureCards />
      <HowItWorksCTA />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
      {/* Background grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-8">
          <p className="text-teal text-xs font-semibold uppercase tracking-widest">Korea&apos;s First AI-Powered FDI Advisory &amp; Concierge Platform</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Find it. Fix it.{" "}
            <span className="text-gold">Own it. Live it.</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed max-w-lg">
            KoreaRoots is an AI-powered FDI advisory and concierge platform that aggregates Korea&apos;s 89 municipal{" "}
            <span className="text-white/90 font-medium">빈집 (bin-jip) — literally &ldquo;empty house,&rdquo; Korea&apos;s officially registered abandoned rural properties</span>{" "}
            — into a single English-language directory. Whether you want to{" "}
            <span className="text-white/80">retire in Korea</span>, build a{" "}
            <span className="text-white/80">countryside life in Korea</span>, or simply{" "}
            <span className="text-white/80">buy property in Korea</span>, we guide you through acquisition, company incorporation, D-8 visa filing, and rental income management.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { value: "1.53M", label: "Abandoned Homes in Korea" },
              { value: "89", label: "Municipal Registries" },
              { value: "D-8", label: "Visa Pathway" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold text-gold">{stat.value}</span>
                <span className="text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/properties"
              className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
            >
              Browse Properties
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Right: hero photo */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          <Image
            src="/images/hero2.jpeg"
            alt="Korean countryside hanok"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

const cards = [
  {
    icon: "🏡",
    title: "Curated 빈집 Listings",
    body: "Hand-picked abandoned rural properties with clear title, verified ownership, and renovation potential.",
  },
  {
    icon: "📋",
    title: "End-to-End FDI Advisory",
    body: "We handle legal due diligence, MOLIT filings, and investment registration through government-approved channels so your investment is fully compliant.",
  },
  {
    icon: "🛂",
    title: "D-8 Visa Sponsorship",
    body: "Our advisory team guides you through the ₩100M minimum investment threshold and immigration paperwork.",
  },
  {
    icon: "🇰🇷",
    title: "Foreign Investment Promotion Act",
    body: "Registered advisory firm operating under Korean 외국인투자촉진법 — your investment is legally protected.",
  },
];

function FeatureCards() {
  return (
    <section className="bg-navy border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-teal/30 hover:bg-white/[0.07] transition-all"
            >
              <span className="text-2xl">{card.icon}</span>
              <h3 className="text-sm font-semibold text-white">{card.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksCTA() {
  return (
    <section className="bg-navy border-t border-white/10 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Not sure where to start?
        </h2>
        <p className="text-white/50 max-w-md leading-relaxed">
          We&apos;ve broken the entire journey — from finding your 빈집 to holding
          your D-8 visa — into 6 clear steps.
        </p>
        <Link
          href="/how-it-works"
          className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
        >
          See How It Works →
        </Link>
      </div>
    </section>
  );
}
