import { Property } from "@/types/property";

// ---------------------------------------------------------------------------
// Property data
// ---------------------------------------------------------------------------
// Images: drop JPGs into /public/images/properties/<id>/
// e.g. /public/images/properties/kr-001/cover.jpg
//
// When you move to Vercel Blob or Cloudinary, replace the path strings below
// with the remote URLs — nothing else changes.
// ---------------------------------------------------------------------------

export const properties: Property[] = [
  {
    id: "kr-001",
    slug: "yeongwol-hanok-farmhouse",
    title: "Restored Hanok Farmhouse",
    location: {
      siGunGu: "Yeongwol-gun",
      province: "Gangwon",
    },
    price: 120_000_000,
    landSizeM2: 660,
    buildingSizeM2: 82,
    yearBuilt: 1968,
    status: "available",
    images: ["/images/properties/kr-001/cover.jpeg"],
    tags: ["Hanok", "Mountain View", "Renovation Ready"],
    visaEligible: true,
    description:
      "Traditional Korean hanok set on 660㎡ of terraced farmland in Yeongwol county. Structural walls intact; roof recently re-tiled. Ideal for boutique guesthouse or remote work retreat.",
  },
  {
    id: "kr-002",
    slug: "hadong-tea-village-cottage",
    title: "Tea Village Cottage",
    location: {
      siGunGu: "Hadong-gun",
      province: "Gyeongnam",
    },
    price: 85_000_000,
    landSizeM2: 430,
    buildingSizeM2: 54,
    yearBuilt: 1975,
    status: "available",
    images: ["/images/properties/kr-002/B2(2).jpeg"],
    tags: ["Tea Plantation", "River View", "Off-grid Potential"],
    visaEligible: true,
    description:
      "Stone-walled cottage adjacent to the famous Hadong green tea fields along the Seomjin River. Electricity connected; water from shared village well.",
  },
  {
    id: "kr-003",
    slug: "jeju-basalt-villa",
    title: "Basalt Stone Villa",
    location: {
      siGunGu: "Seogwipo-si",
      province: "Jeju",
    },
    price: 210_000_000,
    landSizeM2: 820,
    buildingSizeM2: 110,
    yearBuilt: 1982,
    status: "under-review",
    images: ["/images/properties/kr-003/B2(4).jpeg"],
    tags: ["Jeju", "Ocean View", "Tourism Zoned"],
    visaEligible: true,
    description:
      "Rare basalt-stone villa in Seogwipo with southern ocean views. Tourism-zoned land allows short-term rental operation. Title verification in progress.",
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function formatKRW(amount: number): string {
  if (amount >= 100_000_000) {
    const eok = amount / 100_000_000;
    return `₩${eok % 1 === 0 ? eok : eok.toFixed(1)}억`;
  }
  const manwon = amount / 10_000;
  return `₩${manwon.toLocaleString()}만`;
}
