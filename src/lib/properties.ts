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
    slug: "boryeong-country-house-geumam",
    title: "Affordable Country House — Geumam-ri",
    location: {
      siGunGu: "Boryeong-si",
      province: "Chungnam",
    },
    price: 100_000_000,
    landSizeM2: 446,
    buildingSizeM2: 66.81,
    yearBuilt: 2013,
    status: "available",
    images: ["/images/properties/kr-001/cover.jpeg"],
    tags: ["Move-in Ready", "Country House", "Large Plot"],
    visaEligible: true,
    description:
      "Single-storey detached home on 446㎡ of land in the quiet village of Geumam-ri, Boryeong. 2 bedrooms, south-east facing, immediate move-in available. Perfect low-cost entry for STR conversion.",
  },
  {
    id: "kr-002",
    slug: "boryeong-log-cabin-dongori",
    title: "Log Cabin in Mountain Village — Dong-o-ri",
    location: {
      siGunGu: "Boryeong-si",
      province: "Chungnam",
    },
    price: 110_000_000,
    landSizeM2: 200,
    buildingSizeM2: 68.75,
    yearBuilt: 2024,
    status: "available",
    images: ["/images/properties/kr-002/B2(2).jpeg"],
    tags: ["Log Cabin", "Mountain View", "New Build"],
    visaEligible: true,
    description:
      "Charming log cabin nestled at the foot of a mountain in a peaceful village in Boryeong. Built 2024, 2 bedrooms, south-facing. Ideal for nature-focused short-term rental with strong Airbnb potential.",
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
