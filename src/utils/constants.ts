/**
 * Application Constants
 * 
 * Define all application-wide constants here.
 */

export const APP_NAME = 'OORAH'

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  CONTACT: '/contact',
} as const

/** Navigation items configuration */
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: ROUTES.HOME },
  { id: 'about', label: 'About', path: ROUTES.ABOUT },
  { id: 'products', label: 'Products', path: ROUTES.PRODUCTS },
  { id: 'contact', label: 'Contact', path: ROUTES.CONTACT },
] as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const

export const SOCIAL_LINKS = {
  LINKEDIN: 'https://linkedin.com/company/oorah',
  TWITTER: 'https://twitter.com/oorah',
  FACEBOOK: 'https://facebook.com/oorah',
} as const

export const CONTACT_INFO = {
  EMAIL: 'info@oorah.com',
  SUPPORT_EMAIL: 'support@oorah.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: {
    STREET: '123 Innovation Street',
    CITY: 'Tech City',
    STATE: 'TC',
    ZIP: '12345',
    COUNTRY: 'United States',
  },
} as const
