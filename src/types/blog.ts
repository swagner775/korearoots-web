export type BlogCategory =
  | "Visa & Legal"
  | "Property"
  | "Investment"
  | "STR & Management"
  | "Renovation"
  | "Residency";

export interface BlogSection {
  type: "paragraph" | "heading" | "list" | "callout";
  content: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: BlogCategory;
  coverImage: string;
  sections: BlogSection[];
}
