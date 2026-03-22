import { Link } from 'react-router-dom'
import { Button, HeroCarousel } from '@components'
import { HERO_SLIDES, HOME_FEATURES } from '@/data/home'
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

            {/* Left — video */}
            <div className="about-media">
              <iframe
                className="about-video-frame"
                src="https://www.youtube.com/embed/MXG91YFP3O0"
                title="OORAH Tech — Our Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Right — text */}
            <div className="about-text">
              <h2 className="about-heading">Who We Are</h2>
              <p className="about-tagline">Technology that fits your world — not the other way around.</p>
              <p className="about-description">
                At OORAH Tech, we're built on one simple belief: great technology should feel invisible.
                We design and build tools that slip quietly into your existing workflows — no costly
                overhauls, no steep learning curves, and no need to rip out what already works.
                From emerging startups to global enterprises, we partner across verticals to solve
                real problems with focused, elegant solutions.
              </p>
              <p className="about-description">
                Innovation at OORAH isn't a buzzword — it's a discipline. Every product we ship is
                the result of deep listening, rigorous thinking, and an obsession with outcomes that
                actually move the needle for your business. We don't chase trends. We build with
                intention, and we ship with conviction.
              </p>
              <ul className="about-list">
                <li>
                  <strong>Frictionless Integration</strong> — Our solutions plug directly into what
                  you already use. No disruption, no downtime, no compromise.
                </li>
                <li>
                  <strong>Disciplined Innovation</strong> — Every product we ship comes from deep
                  listening and an obsession with your actual business outcomes, not industry buzzwords.
                </li>
                <li>
                  <strong>Quiet Reliability</strong> — Whether you're navigating a volatile market or
                  laying the groundwork for the next decade, we bring the clarity and craft to make
                  it happen — without the noise.
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