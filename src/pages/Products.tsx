import { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, LoadingSpinner } from '@components'
import { ROUTES } from '@utils/constants'
import type { Product } from '@types'
import { fetchProducts } from '../services/products'
import './Products.css'

const ALL = 'All'

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: 'easeOut' as const, delay: i * 0.06 },
  }),
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>(ALL)
  const { hash } = useLocation()

  const categories = useMemo(
    () => [ALL, ...new Set(products.map((p) => p.category))],
    [products]
  )

  const filteredProducts = useMemo(
    () => activeCategory === ALL ? products : products.filter((p) => p.category === activeCategory),
    [products, activeCategory]
  )

  useEffect(() => {
    if (!isLoading && hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    }
  }, [isLoading, hash])

  useEffect(() => {
    let isMounted = true
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        if (isMounted) setProducts(data)
      } catch (err) {
        if (isMounted)
          setError(err instanceof Error ? err.message : 'Unable to load products at the moment.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadProducts()
    return () => { isMounted = false }
  }, [])

  return (
    <div className="products">
      {/* Hero */}
      <section className="products-hero">
        <div className="container">
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            Discover our range of innovative solutions designed to transform your business.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section products-section">
        <div className="container">

          {isLoading && (
            <div className="products-loading">
              <LoadingSpinner size="lg" />
              <p>Loading products...</p>
            </div>
          )}

          {error && (
            <div className="products-error">
              <p>{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {/* Filter tabs */}
              <div className="products-filter-bar" role="tablist" aria-label="Filter by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    type="button"
                    aria-selected={activeCategory === cat}
                    className={`products-filter-tab ${activeCategory === cat ? 'products-filter-tab--active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                    <span className="products-filter-count">
                      {cat === ALL ? products.length : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Grid — keyed by activeCategory so framer re-mounts cards on switch */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="products-grid"
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      id={`product-${product.id}`}
                      custom={i}
                      variants={cardVariants}
                    >
                      <Card hoverable className="product-card">
                        <Card.Body>
                          <span className="product-category">{product.category}</span>
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-description">{product.description}</p>
                          <ul className="product-features">
                            {product.features.map((feature) => (
                              <li key={`${product.id}-${feature}`}>{feature}</li>
                            ))}
                          </ul>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant="primary" size="sm">Learn More</Button>
                        </Card.Footer>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="products-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>We can build tailored products to meet your specific business requirements.</p>
            <Link to={ROUTES.CONTACT}>
              <Button variant="secondary" size="lg">Contact Our Team</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
