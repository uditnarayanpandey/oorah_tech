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