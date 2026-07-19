// Product Type
export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
}

// Team Member Type
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  slug: string;
  yearsOfExperience?: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}
