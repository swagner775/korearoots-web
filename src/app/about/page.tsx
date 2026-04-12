import Link from "next/link";

export const metadata = {
  title: "About & Glossary",
  description:
    "Understand the key terms behind Korean rural property investment — 빈집, FDI, MOLIT, D-8 visa, F-2 residency, and STR explained in plain English.",
};

const glossary = [
  {
    id: "binjip",
    term: "빈집 (Bin-jip)",
    pronunciation: "bean-jeep",
    short: "Abandoned rural property",
    body: `빈집 (bin-jip) — literally "empty house," Korea's officially registered abandoned rural properties. These are rural and semi-rural properties — mostly traditional hanok farmhouses — that have been abandoned as South Korea's population has shifted to cities over the past 50 years.

Korea now has 1.53 million of these properties (Korea Herald, 2025), and the government actively wants them redeveloped. Municipal governments maintain public 빈집 registers and offer purchase incentives to buyers who commit to renovation and business use.

For foreign investors, 빈집 represent one of the only legal pathways to purchasing affordable Korean real estate — at prices far below urban markets — while simultaneously qualifying for a business investment visa.`,
    tag: "Property",
    tagColor: "text-gold border-gold/30 bg-gold/10",
  },
  {
    id: "fdi",
    term: "FDI — Foreign Direct Investment",
    pronunciation: null,
    short: "The legal framework that lets foreigners invest in Korea",
    body: `Foreign Direct Investment (FDI) is the formal mechanism by which non-Korean citizens can invest money into a Korean business or property. Korea actively encourages FDI under the Foreign Investment Promotion Act (외국인투자촉진법).

To qualify as FDI — and unlock visa eligibility — your investment must be:
• At least ₩100,000,000 (approximately $75,000 USD)
• Structured through a registered Korean business entity (법인)
• Declared to the relevant government authority before the purchase closes

KoreaRoots handles the full FDI structuring process. You don't need to understand the legal mechanics — that's what we're here for.`,
    tag: "Legal",
    tagColor: "text-teal border-teal/30 bg-teal/10",
  },
  {
    id: "molit",
    term: "MOLIT — Ministry of Land, Infrastructure and Transport",
    pronunciation: null,
    short: "The Korean government body that oversees property transactions",
    body: `MOLIT (국토교통부) is the South Korean government ministry responsible for land ownership, property registration, construction permits, and real estate transactions.

When a foreigner buys property in Korea, MOLIT is where the title transfer is registered. They also oversee the 빈집 revitalization program and issue renovation permits for rural properties.

In practice, you won't deal with MOLIT directly. Your Korean attorney and our advisory team submit the required filings on your behalf as part of the purchase process.`,
    tag: "Government",
    tagColor: "text-white/60 border-white/20 bg-white/5",
  },
  {
    id: "d8-visa",
    term: "D-8 Visa — Business Investment Visa",
    pronunciation: null,
    short: "Your legal right to live in Korea as a foreign investor",
    body: `The D-8 visa is South Korea's business investment visa, issued to foreigners who make a qualifying FDI investment in a Korean company.

Key facts:
• Requires a minimum ₩100,000,000 investment registered through government-approved channels
• Grants 2-year residency in South Korea, renewable
• Allows you to manage and operate your business in Korea
• After maintaining the visa, you can apply for F-2 long-term resident status (see below)
• Family members can be added as dependents on an F-3 visa

The D-8 is not a fast path to permanent residency, but it is a legitimate, stable route to building a life in Korea as a business owner. Many of our clients use it as a stepping stone toward F-5 (permanent residency) over a 5–10 year horizon.`,
    tag: "Visa",
    tagColor: "text-teal border-teal/30 bg-teal/10",
  },
  {
    id: "f2-visa",
    term: "F-2 Visa — Long-Term Resident",
    pronunciation: null,
    short: "The next step after the D-8 — a more flexible, long-term Korean residency",
    body: `The F-2 visa is South Korea's long-term resident visa. It's a significant upgrade from the D-8 because it isn't tied to a specific business investment — you can work, run a business, or live in Korea without restrictions on the type of activity.

How you get there from a D-8:
• Maintain your D-8 visa and registered business in good standing
• Accumulate enough points under Korea's points-based system (사회통합프로그램) — factors include Korean language ability, income, age, and time in the country
• Most D-8 holders qualify for F-2 consideration after 3–5 years

Key advantages of F-2 over D-8:
• Not tied to a minimum investment amount
• Allows employment for any company, not just your own
• Easier to renew — less dependent on business performance
• Stepping stone to F-5 (permanent residency) after 5 years on F-2

The F-2 is the goal most of our clients are working toward. The D-8 is how you get there.`,
    tag: "Visa",
    tagColor: "text-teal border-teal/30 bg-teal/10",
  },
  {
    id: "str",
    term: "STR — Short-Term Rental",
    pronunciation: null,
    short: "We run your property as a rental business while you're back home — generating the income that keeps your visa alive",
    body: `A Short-Term Rental (STR) means renting your renovated 빈집 to guests for short stays — nights, weekends, or weeks — on platforms like Airbnb, Booking.com, and Korean platform Wehome.

Here's the part most people don't realize: you don't have to be in Korea to run it.

KoreaRoots acts as your on-the-ground property management team. Once your property is live, we handle everything — listing management, guest communication, check-ins, cleaning coordination, and maintenance. You receive a monthly income report and your share of the revenue, deposited to your account. You stay home.

Why STR and not a long-term tenant?
• Higher returns. Nightly hanok rates in scenic rural areas consistently outperform long-term lease yields.
• Visa compliance. Your D-8 renewal requires proof that your Korean business is generating revenue within the first two years. STR creates a clean, verifiable paper trail — booking records, platform payouts, bank deposits — that satisfies Korean Immigration.
• Flexibility. Block off dates to visit and use the property yourself.

STR in Korea requires a tourism business registration (관광사업자등록). KoreaRoots handles this as part of the launch process.`,
    tag: "Business",
    tagColor: "text-gold border-gold/30 bg-gold/10",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-4 pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 w-fit">
            <span className="text-teal text-xs font-semibold uppercase tracking-widest">
              Plain English
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What does all this mean?
          </h1>
          <p className="text-white/50 leading-relaxed max-w-2xl">
            Korean property investment comes with a lot of acronyms and government
            terms. Here&apos;s everything explained in plain English — no finance
            or legal background required.
          </p>
        </div>

        {/* Quick jump links */}
        <div className="flex flex-wrap gap-2">
          {glossary.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 hover:border-teal/40 hover:text-white transition-colors"
            >
              {item.term.split("—")[0].trim()}
            </a>
          ))}
        </div>

        {/* Glossary entries */}
        <div className="flex flex-col gap-12">
          {glossary.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="flex flex-col gap-4 scroll-mt-24"
            >
              {/* Term header */}
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{item.term}</h2>
                    <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  {item.pronunciation && (
                    <p className="text-xs text-white/30 italic">
                      Pronounced: &ldquo;{item.pronunciation}&rdquo;
                    </p>
                  )}
                  <p className="text-teal text-sm font-medium mt-1">{item.short}</p>
                </div>
              </div>

              {/* Body */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                {item.body.split("\n\n").map((para, i) => (
                  <p key={i} className={`text-white/60 leading-relaxed text-sm whitespace-pre-line ${i > 0 ? "mt-4" : ""}`}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="h-px bg-white/10" />
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 w-fit">
              <span className="text-teal text-xs font-semibold uppercase tracking-widest">The Team</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Who&apos;s behind KoreaRoots</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
              No other team in Korea holds both sides of this equation — foreign investor trust and rural Korean access.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Steve */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-lg">Steve Wagner</h3>
                <p className="text-teal text-sm font-medium">Co-Founder and CEO</p>
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "American entrepreneur, F-4 visa holder",
                  "6+ years continuous residence and business operation in Seoul",
                  "Founded Shared Homies — Seoul's largest English-language international co-living network",
                  "750+ international residents housed over 6 years",
                  "50+ rooms under active management",
                  "Consistent 90%+ occupancy rate",
                  "Former Samsung executive English trainer",
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-2.5 text-sm text-white/60">
                    <svg className="w-4 h-4 text-teal/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            {/* Danny */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-lg">Danny Hong (홍관호)</h3>
                <p className="text-teal text-sm font-medium">Co-Founder and Korea Operations</p>
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "Korean serial entrepreneur",
                  "Founded GMMC (주식회사 지엠엠씨) — medical device manufacturer with globally exported products",
                  "Awarded by KITA, KICOX, and the Korean Parliament",
                  "Featured in JoongAng Ilbo (Korea's second-largest national newspaper) in 2014",
                  "Lived in a 빈집 for two years",
                  "Deep established relationships with rural community centers (마을회관) across multiple provinces",
                  "Fully bilingual (English and Korean)",
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-2.5 text-sm text-white/60">
                    <svg className="w-4 h-4 text-teal/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-white font-bold text-base">Legal &amp; Compliance</h2>
          <ul className="flex flex-col gap-3">
            {[
              "KoreaRoots does not operate as a licensed real estate agent (공인중개사). We are an FDI advisory and concierge platform.",
              "All property transactions are facilitated through partner law firms and licensed Korean entities.",
              "D-8 visa filing is coordinated through partner immigration law firms — KoreaRoots does not practice law directly.",
              "STR income for clients flows through Wehome (government-certified) to remain legally compliant for foreign owners.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs text-white/40">
                <svg className="w-3.5 h-3.5 text-teal/40 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-bold text-white">Ready to see the process?</h2>
          <p className="text-white/40 text-sm">
            Now that you know the terms, walk through the full 6-step journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/how-it-works"
              className="rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
            >
              How It Works
            </Link>
            <Link
              href="/properties"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
