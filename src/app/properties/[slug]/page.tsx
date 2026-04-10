import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { properties, formatKRW } from "@/lib/properties";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return {};
  return {
    title: `${property.title} — KoreaRoots`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const statusLabel = {
    available: { text: "Available", className: "bg-teal/20 text-teal border-teal/30" },
    "under-review": { text: "Under Review", className: "bg-gold/20 text-gold border-gold/30" },
    sold: { text: "Sold", className: "bg-white/10 text-white/40 border-white/10" },
  }[property.status];

  const priceUsd = Math.round(property.price / 1380);

  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 flex flex-col gap-10 pt-8">

        {/* Back */}
        <Link href="/properties" className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors w-fit">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to listings
        </Link>

        {/* Hero image */}
        {property.images[0] && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
            {property.visaEligible && (
              <span className="absolute top-4 left-4 rounded-full bg-navy/80 border border-teal/30 px-3 py-1 text-xs font-semibold text-teal backdrop-blur-sm">
                D-8 Eligible
              </span>
            )}
            <span className={`absolute top-4 right-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${statusLabel.className}`}>
              {statusLabel.text}
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — details */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Title + location */}
            <div className="flex flex-col gap-2">
              <p className="text-white/40 text-sm">{property.location.siGunGu}, {property.location.province}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{property.title}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                {property.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <h2 className="text-white font-semibold text-sm uppercase tracking-widest text-white/40">About this property</h2>
              <p className="text-white/70 leading-relaxed">{property.description}</p>
            </div>

            {/* Property specs */}
            <div className="flex flex-col gap-3">
              <h2 className="text-white font-semibold text-sm uppercase tracking-widest text-white/40">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Land Area", value: `${property.landSizeM2} ㎡` },
                  { label: "Building Area", value: `${property.buildingSizeM2} ㎡` },
                  { label: "Year Built", value: property.yearBuilt },
                  { label: "Province", value: property.location.province },
                  { label: "District", value: property.location.siGunGu },
                  { label: "Visa Eligible", value: property.visaEligible ? "Yes — D-8" : "No" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col gap-1">
                    <p className="text-white/40 text-xs">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right — price + CTA */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5 sticky top-28">
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-xs uppercase tracking-widest">Asking Price</p>
                <p className="text-3xl font-bold text-gold">{formatKRW(property.price)}</p>
                <p className="text-white/40 text-sm">≈ ${priceUsd.toLocaleString()} USD</p>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-sm text-white/50">
                <div className="flex justify-between">
                  <span>Land</span>
                  <span className="text-white">{property.landSizeM2} ㎡</span>
                </div>
                <div className="flex justify-between">
                  <span>Building</span>
                  <span className="text-white">{property.buildingSizeM2} ㎡</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-white">{statusLabel.text}</span>
                </div>
              </div>

              <Link
                href="/consultation"
                className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white text-center hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
              >
                Enquire About This Property
              </Link>

              <p className="text-white/30 text-xs text-center leading-relaxed">
                Free consultation — no commitment required
              </p>
            </div>
          </div>

        </div>

        {/* Map */}
        {property.location.mapUrl && (
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest text-white/40">Location</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10 w-full aspect-[16/7]">
              <iframe
                src={property.location.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${property.title}`}
              />
            </div>
            <p className="text-white/30 text-xs">
              {property.location.siGunGu}, {property.location.province} · Exact address shared after consultation
            </p>
          </div>
        )}

        {/* D-8 eligibility callout */}
        {property.visaEligible && (
          <div className="rounded-2xl border border-teal/20 bg-teal/5 p-6 flex items-start gap-4">
            <span className="text-2xl shrink-0">🛂</span>
            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-sm">D-8 Business Investment Visa Eligible</p>
              <p className="text-white/50 text-sm leading-relaxed">
                This property meets the ₩100M minimum FDI threshold required for a D-8 business investment visa application. KoreaRoots handles the full legal structuring, investment registration, and visa filing on your behalf.{" "}
                <Link href="/about#d8-visa" className="text-teal hover:text-teal/80 transition-colors">Learn more about the D-8 visa →</Link>
              </p>
            </div>
          </div>
        )}

        {/* Back to listings */}
        <div className="flex justify-center pt-4">
          <Link href="/properties" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-colors">
            View all listings
          </Link>
        </div>

      </div>
    </main>
  );
}
