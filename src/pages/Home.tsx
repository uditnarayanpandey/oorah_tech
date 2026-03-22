import { Link } from 'react-router-dom'
import { Button, HeroCarousel } from '@components'
import { HERO_SLIDES, HOME_FEATURES } from '@/data/home'
import oonahLogo from '@assets/images/oorah-logo.svg'
import oonahLogoWhite from '@assets/images/oorah-logo-white.svg'
import oonahLogoV1 from '@assets/images/oorah-logo-v1.svg'
import './Home.css'

const ABOUT_IMAGES = [oonahLogo, oonahLogoWhite, oonahLogoV1, oonahLogo, oonahLogoWhite, oonahLogoV1]

const ABOUT_HIGHLIGHTS = [
  { label: 'Seamless Integration', desc: 'We plug directly into your existing stack — no rip and replace.' },
  { label: 'Cross-Vertical Reach', desc: 'From healthcare to finance, our tools adapt to any industry.' },
  { label: 'Innovation First', desc: 'Every product is built with tomorrow\'s challenges in mind.' },
  { label: 'Client-Centric Design', desc: 'We listen before we build, ensuring every feature earns its place.' },
  { label: 'Scalable by Nature', desc: 'Grow without friction — our architecture scales with your ambitions.' },
  { label: 'Trusted Partnership', desc: 'We\'re not just vendors; we\'re long-term partners in your success.' },
]

const Home = () => {
  return (
    <div className="home">
      {/* Hero Carousel Section */}
      <HeroCarousel slides={HERO_SLIDES} autoPlay interval={5000} pauseOnHover>
        {() => (
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome to <span className="highlight">OORAH</span>
              </h1>
              <p className="hero-subtitle">
                Innovative product solutions designed to transform your business and drive success across various industries.
              </p>
              <div className="hero-buttons">
                <Link to="/products">
                  <Button variant="primary" size="lg">
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </HeroCarousel>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <div className="about-grid">

            {/* Left 30% — scrolling images */}
            <div className="about-images">
              <div className="about-image-track">
                {[...ABOUT_IMAGES, ...ABOUT_IMAGES].map((src, i) => (
                  <div key={i} className={`about-image-tile about-image-tile--${i % 3}`}>
                    <img src={src} alt="OORAH" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right 70% — text */}
            <div className="about-text">
              <p className="about-eyebrow">Who We Are</p>
              <h2 className="about-heading">
                Technology that fits your world — <span>not the other way around.</span>
              </h2>
              <p className="about-description">
                OORAH Tech is a company built on one simple belief: great technology should feel invisible.
                We design and build tools that integrate directly into your existing ecosystem —
                no costly overhauls, no steep learning curves, no friction.
                From emerging startups to established enterprises, we partner with organisations
                across verticals to solve real problems with focused, elegant solutions.
              </p>
              <p className="about-description">
                Innovation at OORAH isn't a buzzword — it's a discipline. Every product we ship
                is the result of deep listening, rigorous thinking, and an obsession with outcomes
                that actually matter to your business.
              </p>

              <div className="about-highlights">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="about-highlight-card">
                    <h4>{item.label}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="wcu-wrapper">
            <div className="wcu-title-cell">
              <h2 className="wcu-title">Why Choose US?</h2>
              <p className="wcu-subtitle">We deliver excellence through innovation, quality, and dedicated support.</p>
            </div>

            <div className="wcu-scroll">
              <div className="wcu-grid">
                {HOME_FEATURES.map((feature, i) => (
                  <div
                    key={feature.id}
                    className={`wcu-card ${i % 3 === 0 ? 'wcu-card-tall' : ''}`}
                    style={{ backgroundImage: `url(${feature.image})` }}
                  >
                    <div className="wcu-card-body">
                      <h3 className="wcu-card-title">{feature.title}</h3>
                      <p className="wcu-card-desc">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join hundreds of companies already using OORAH products to power their success.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home