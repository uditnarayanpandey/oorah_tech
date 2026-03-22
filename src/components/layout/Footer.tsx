import { Link } from 'react-router-dom'
import { APP_NAME, NAV_ITEMS, CONTACT_INFO, SOCIAL_LINKS } from '@utils/constants'
import oorahLogoWhite from '@assets/images/oorah-logo-white.svg'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src={oorahLogoWhite} alt={APP_NAME} className="footer-logo" />
            <p className="footer-description">
              Innovative product solutions for a better tomorrow. We deliver excellence across various industries.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav" aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.id} 
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <address className="footer-contact">
              <p>Email: {CONTACT_INFO.EMAIL}</p>
              <p>Phone: {CONTACT_INFO.PHONE}</p>
            </address>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              <a 
                href={SOCIAL_LINKS.LINKEDIN} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
              >
                LinkedIn
              </a>
              <a 
                href={SOCIAL_LINKS.TWITTER} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
              >
                Twitter
              </a>
              <a 
                href={SOCIAL_LINKS.FACEBOOK} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
