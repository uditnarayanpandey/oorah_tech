import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner, Button } from '@components'
import type { TeamMember } from '../types'
import { fetchTeamMembers } from '../services/team'
import './About.css'

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const About = () => {
  const teamCarouselRef = useRef<HTMLDivElement | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoadingTeam, setIsLoadingTeam] = useState(true)
  const [teamError, setTeamError] = useState<string | null>(null)

  const handleTeamScroll = (direction: 'left' | 'right') => {
    const container = teamCarouselRef.current
    if (!container) return

    const scrollAmount = Math.round(container.clientWidth * 0.8)
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  const stats = [
    { id: 'experience', number: '10+', label: 'Years of Experience' },
    { id: 'clients', number: '500+', label: 'Happy Clients' },
    { id: 'products', number: '50+', label: 'Products Delivered' },
    { id: 'support', number: '24/7', label: 'Support Available' }
  ]

  const values = [
    {
      id: 'innovation',
      title: 'Innovation First',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead of the curve.'
    },
    {
      id: 'customer-success',
      title: 'Customer Success',
      description: 'Your success is our success. We partner with you to ensure every product delivers measurable results.'
    },
    {
      id: 'quality',
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in everything we do, from development to delivery and support.'
    },
    {
      id: 'transparency',
      title: 'Transparency',
      description: 'We believe in open communication and honest relationships with all our stakeholders.'
    }
  ]

  useEffect(() => {
    let isMounted = true

    const loadTeam = async () => {
      try {
        const data = await fetchTeamMembers()
        if (isMounted) {
          setTeamMembers(data)
        }
      } catch (err) {
        if (isMounted) {
          setTeamError(err instanceof Error ? err.message : 'Unable to load team members at the moment.')
        }
      } finally {
        if (isMounted) {
          setIsLoadingTeam(false)
        }
      }
    }

    loadTeam()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About OORAH Tech</h1>
          <p className="about-subtitle">
            Building innovative products that transform businesses and empower success.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story">
        <div className="container">
          <div className="story-content">
            <h2 className="section-heading">Our Story</h2>
            <p>
              OORAH was founded with a simple yet powerful vision: to create products that make a real difference in how businesses operate and succeed. What started as a small team of passionate innovators has grown into a trusted partner for companies across various industries.
            </p>
            <p>
              Today, we continue to uphold our founding principles while embracing new technologies and methodologies to deliver even greater value to our clients. Our journey is defined by continuous learning, adaptation, and an unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values">
        <div className="container">
          <h2 className="section-heading text-center">Our Values</h2>
          <p className="values-intro">These core values guide everything we do at OORAH.</p>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.id} className="value-item">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="section team">
        <div className="container">
          <h2 className="section-heading text-center">Meet Our Core Team</h2>
          <p className="team-intro">
            A dedicated group of leaders, builders, and creators focused on delivering meaningful results.
          </p>
          {isLoadingTeam && (
            <div className="team-loading">
              <LoadingSpinner size="md" />
              <p>Loading team members...</p>
            </div>
          )}
          {teamError && (
            <div className="team-error">
              <p>{teamError}</p>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}
          {!isLoadingTeam && !teamError && (
            <div className="team-carousel-wrapper">
              <button
                type="button"
                className="team-carousel-control team-carousel-control--left"
                aria-label="Scroll team members left"
                onClick={() => handleTeamScroll('left')}
              >
                ‹
              </button>
              <div
                className="team-carousel"
                role="region"
                aria-label="Meet our team"
                ref={teamCarouselRef}
              >
                <div className="team-track">
                  {teamMembers.map((member) => (
                    <Link key={member.id} to={`/team/${member.slug}`} className="team-card">
                      <div className="team-avatar" aria-hidden>
                        {member.imageUrl ? (
                          <img src={member.imageUrl} alt="" />
                        ) : (
                          <span>{getInitials(member.name)}</span>
                        )}
                      </div>
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="team-carousel-control team-carousel-control--right"
                aria-label="Scroll team members right"
                onClick={() => handleTeamScroll('right')}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To empower businesses with innovative, reliable, and scalable product solutions that drive growth, efficiency, and success in an ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
