import type { HeroSlide } from '@components'

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://i.pinimg.com/736x/77/81/e2/7781e2e0d509a2ddbb0cb92282e61c38.jpg',
    alt: 'Team collaboration'
  },
  {
    id: 2,
    type: 'image',
    src: 'https://i.pinimg.com/1200x/28/5c/cd/285ccdc4772a66845c803c0ccfbc7666.jpg',
    alt: 'Business meeting'
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    alt: 'Data analytics'
  }
]

export const HOME_FEATURES = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We push boundaries to create cutting-edge solutions that transform industries.',
    image: 'https://i.pinimg.com/736x/06/2e/be/062ebeec90d74125b8b8e32450fc66b9.jpg'
  },
  {
    id: 'quality',
    title: 'Quality',
    description: 'Every product we deliver meets the highest standards of excellence.',
    image: 'https://i.pinimg.com/736x/a5/4a/63/a54a634124ad63442b5f54bade85751d.jpg'
  },
  {
    id: 'support',
    title: 'Support',
    description: '24/7 dedicated support to ensure your success with our products.',
    image: 'https://i.pinimg.com/1200x/45/82/d7/4582d72a1967f304837a67f8c4946680.jpg'
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Join a thriving network of professionals and grow together.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80'
  }
] as const
