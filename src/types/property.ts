export type PropertyStatus = "available" | "under-review" | "sold";
export type PropertyRegion =
  | "Gangwon"
  | "Gyeongbuk"
  | "Gyeongnam"
  | "Jeonbuk"
  | "Jeonnam"
  | "Chungbuk"
  | "Chungnam"
  | "Jeju";

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: {
    siGunGu: string;   // e.g. "Yeongwol-gun"
    province: PropertyRegion;
    mapUrl?: string;
  };
  price: number;        // KRW
  landSizeM2: number;
  buildingSizeM2: number;
  yearBuilt?: number;
  status: PropertyStatus;
  images: string[];     // local paths or Vercel Blob / Cloudinary URLs
  tags: string[];
  visaEligible: boolean;
  description: string;
}
