import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_ITEMS, ROUTES } from '@utils/constants'
import { products } from '@/data/products'
import ooahLogo from '@assets/images/oorah-logo.svg'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Derive unique categories and default to first one
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  )
  const [activeCategory, setActiveCategory] = useState(categories[0])

  const filteredProducts = useMemo(
    () => products.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setIsMobileProductsOpen(false)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
    setIsMobileProductsOpen(false)
  }

  const openDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
    setIsDropdownOpen(true)
  }

  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
      setActiveCategory(categories[0])
    }, 150)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen, closeMenu])

  return (
    <header className="header" ref={headerRef}>
      <div className="container header-container">
        <Link to={ROUTES.HOME} className="logo" aria-label="OORAH Home">
          <img src={ooahLogo} alt="OORAH Logo" className="logo-img" />
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} role="navigation">
          {NAV_ITEMS.map((item) =>
            item.id === 'products' ? (
              <div
                key={item.id}
                className="nav-item"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={closeMenu}
                >
                  {item.label}
                  <span className={`nav-chevron ${isDropdownOpen ? 'nav-chevron--open' : ''}`}>▾</span>
                </NavLink>

                {/* ── Desktop mega dropdown ── */}
                <div className={`nav-dropdown ${isDropdownOpen ? 'nav-dropdown--open' : ''}`}>
                  {/* Left — categories */}
                  <div className="nav-dropdown-categories">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`nav-dropdown-cat ${activeCategory === cat ? 'nav-dropdown-cat--active' : ''}`}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => setActiveCategory(cat)}
                        type="button"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Right — products for active category */}
                  <div className="nav-dropdown-products">
                    <p className="nav-dropdown-cat-label">{activeCategory}</p>
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products#product-${product.id}`}
                        className="nav-dropdown-item"
                        onClick={() => { closeMenu(); setIsDropdownOpen(false) }}
                      >
                        <span className="nav-dropdown-name">{product.name}</span>
                        <span className="nav-dropdown-desc">{product.description.slice(0, 60)}…</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ── Mobile accordion ── */}
                <div className="nav-mobile-products">
                  <button
                    className="nav-mobile-products-toggle"
                    onClick={() => setIsMobileProductsOpen(prev => !prev)}
                    aria-expanded={isMobileProductsOpen}
                    type="button"
                  >
                    Browse products
                    <span className={`nav-chevron ${isMobileProductsOpen ? 'nav-chevron--open' : ''}`}>▾</span>
                  </button>
                  {isMobileProductsOpen && (
                    <div className="nav-mobile-products-list">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products#product-${product.id}`}
                          className="nav-dropdown-item"
                          onClick={closeMenu}
                        >
                          <span className="nav-dropdown-name">{product.name}</span>
                          <span className="nav-dropdown-category">{product.category}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
