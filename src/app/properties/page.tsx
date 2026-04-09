import PropertyCard from "@/components/ui/PropertyCard";
import { properties } from "@/lib/properties";
import { PropertyRegion, PropertyStatus } from "@/types/property";

const regions: PropertyRegion[] = [
  "Gangwon",
  "Gyeongbuk",
  "Gyeongnam",
  "Jeonbuk",
  "Jeonnam",
  "Chungbuk",
  "Chungnam",
  "Jeju",
];

const statuses: { value: PropertyStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "under-review", label: "Under Review" },
];

export const metadata = {
  title: "Properties — KoreaRoots",
  description: "Browse verified 빈집 abandoned rural properties in Korea eligible for D-8 business investment visa.",
};

export default function PropertiesPage() {
  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 w-fit">
            <span className="text-teal text-xs font-semibold uppercase tracking-widest">
              빈집 Listings
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Available Properties
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            Every listing is title-verified and assessed for D-8 visa eligibility. Prices
            shown in Korean won (₩).
          </p>
        </div>

        {/* Filters — static UI, interactivity to be added */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex gap-2">
            {statuses.map((s) => (
              <button
                key={s.value}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 hover:border-teal/40 hover:text-white transition-colors first:border-teal/60 first:text-teal"
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {regions.map((r) => (
              <button
                key={r}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 hover:border-teal/40 hover:text-white transition-colors"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-white/30 gap-3">
            <span className="text-5xl">🏚️</span>
            <p className="text-sm">No properties found.</p>
          </div>
        )}

      </div>
    </main>
  );
}
