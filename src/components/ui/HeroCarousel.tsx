import { useState, useEffect, ReactNode } from 'react'
import './HeroCarousel.css'

export interface HeroSlide {
  id: string | number
  type: 'image' | 'video'
  src: string
  alt?: string
  poster?: string // For video thumbnails
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  pauseOnHover?: boolean
  children?: (slide: HeroSlide, index: number) => ReactNode
  className?: string
}

const HeroCarousel = ({
  slides,
  autoPlay = true,
  interval = 5000,
  showIndicators = true,
  pauseOnHover = true,
  children,
  className = '',
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [contentLoaded, setContentLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const totalSlides = slides.length
  const isSingleSlide = totalSlides === 1

  // Preload content
  useEffect(() => {
    if (isSingleSlide) {
      setContentLoaded(true)
      return
    }

    let loadedCount = 0
    slides.forEach((slide) => {
      if (slide.type === 'image') {
        const img = new Image()
        img.src = slide.src
        img.onload = () => {
          loadedCount++
          if (loadedCount === totalSlides) {
            setContentLoaded(true)
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === totalSlides) {
            setContentLoaded(true)
          }
        }
      } else {
        // For videos, just mark as loaded (they'll load progressively)
        loadedCount++
        if (loadedCount === totalSlides) {
          setContentLoaded(true)
        }
      }
    })
  }, [slides, totalSlides, isSingleSlide])

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || !contentLoaded || isSingleSlide) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, isPaused, contentLoaded, interval, totalSlides, isSingleSlide])

  // Pause when tab is not visible
  useEffect(() => {
    if (isSingleSlide) return

    const handleVisibilityChange = () => {
      setIsPaused(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isSingleSlide])

  // Handle touch swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSingleSlide) return
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSingleSlide) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (isSingleSlide || !touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    } else if (distance < -minSwipeDistance) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (totalSlides === 0) return null

  return (
    <section
      className={`hero-carousel ${contentLoaded ? 'loaded' : ''} ${className}`}
      onMouseEnter={() => pauseOnHover && !isSingleSlide && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && !isSingleSlide && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero carousel"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-carousel-slide ${index === currentIndex ? 'active' : ''}`}
          role={slide.type === 'image' ? 'img' : undefined}
          aria-label={slide.alt || `Slide ${index + 1} of ${totalSlides}`}
        >
          {slide.type === 'image' ? (
            <div
              className="hero-carousel-background"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ) : (
            <video
              className="hero-carousel-video"
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={slide.alt || 'Background video'}
            />
          )}
          <div className="hero-carousel-overlay" />
        </div>
      ))}

      {/* Content passed as children */}
      {children && (
        <div className="hero-carousel-content">
          {children(slides[currentIndex], currentIndex)}
        </div>
      )}

      {/* Slide Indicators */}
      {showIndicators && !isSingleSlide && (
        <div className="hero-carousel-indicators" aria-label="Carousel controls">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default HeroCarousel
