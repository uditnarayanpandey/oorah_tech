// Product Type
export interface Product {
  id: string | number
  name: string
  category: string
  description: string
  features: string[]
}

// Team Member Type
export interface TeamMember {
  id: string | number
  name: string
  role: string
  bio?: string
  imageUrl?: string
  slug: string
  yearsOfExperience?: number
  socialLinks?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}
