/**
 * Global Type Definitions
 * 
 * Define shared TypeScript types and interfaces here.
 */

// Common API Response Type
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
  error?: string
}

// Product Type
export interface Product {
  id: string | number
  name: string
  category: string
  description: string
  features: string[]
  price?: number
  imageUrl?: string
  createdAt?: string
  updatedAt?: string
}

// Contact Form Data Type
export interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}

// Navigation Link Type
export interface NavLink {
  label: string
  path: string
  isExternal?: boolean
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

// Testimonial Type
export interface Testimonial {
  id: string | number
  author: string
  company: string
  role: string
  content: string
  rating?: number
  imageUrl?: string
}

// Common Props for components with children
export interface WithChildren {
  children: React.ReactNode
}

// Common Props for components with className
export interface WithClassName {
  className?: string
}
