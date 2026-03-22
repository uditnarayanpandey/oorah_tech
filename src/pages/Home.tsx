import { Link } from 'react-router-dom'
import { Button, HeroCarousel } from '@components'
import { HERO_SLIDES, HOME_FEATURES } from '@/data/home'
import teamImage from '@assets/images/team-image-home-page.svg'
import './Home.css'

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

            {/* Left — team photo */}
            <div className="about-photo">
              <img src={teamImage} alt="OORAH Team" />
            </div>

            {/* Right — text */}
            <div className="about-text">
              <h2 className="about-heading">Who We Are</h2>
              <p className="about-tagline">Technology that fits your world — not the other way around.</p>
              <p className="about-description">
                At OORAH Tech, we're built on one simple belief: great technology should feel invisible.
                We design tools that integrate directly into your existing ecosystem so you can focus
                on your business, not your software.
              </p>
              <p className="about-description">
                We partner with everyone from emerging startups to established enterprises to deliver:
              </p>
              <ul className="about-list">
                <li>
                  <strong>Frictionless Integration</strong> — No costly overhauls or steep learning curves.
                  Our solutions plug right into what you already use.
                </li>
                <li>
                  <strong>Disciplined Innovation</strong> — Innovation isn't a buzzword here. Every product
                  we ship comes from deep listening and an obsession with your actual business outcomes.
                </li>
                <li>
                  <strong>Quiet Reliability</strong> — Whether you're navigating a fast-moving market or
                  building infrastructure for the next decade, we bring the clarity and craft to make it
                  happen without the noise.
                </li>
              </ul>
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