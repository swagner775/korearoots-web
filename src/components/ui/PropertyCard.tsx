import Link from "next/link";
import Image from "next/image";
import { formatKRW } from "@/lib/properties";
import { Property } from "@/types/property";

const statusLabel: Record<Property["status"], { text: string; className: string }> = {
  available: { text: "Available", className: "bg-teal/20 text-teal" },
  "under-review": { text: "Under Review", className: "bg-gold/20 text-gold" },
  sold: { text: "Sold", className: "bg-white/10 text-white/40" },
};

export default function PropertyCard({ property }: { property: Property }) {
  const status = statusLabel[property.status];
  const coverImage = property.images[0];

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-teal/30 hover:bg-white/[0.07] transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl">
            🏡
          </div>
        )}
        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.text}
        </span>
        {property.visaEligible && (
          <span className="absolute top-3 left-3 rounded-full bg-navy/80 border border-teal/30 px-3 py-1 text-xs font-semibold text-teal backdrop-blur-sm">
            D-8 Eligible
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-white text-base leading-snug group-hover:text-gold transition-colors">
            {property.title}
          </h3>
          <p className="text-sm text-white/50 mt-0.5">
            {property.location.siGunGu}, {property.location.province}
          </p>
        </div>

        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
          {property.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {property.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-lg font-bold text-gold">
            {formatKRW(property.price)}
          </span>
          <div className="flex gap-3 text-xs text-white/40">
            <span>{property.landSizeM2}㎡ land</span>
            <span>{property.buildingSizeM2}㎡ bldg</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
