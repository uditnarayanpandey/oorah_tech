import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, LoadingSpinner } from '@components'
import { ROUTES } from '@utils/constants'
import type { Product } from '@types'
import { fetchProducts } from '../services/products'
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const data = await fetchProducts()

        if (isMounted) {
          setProducts(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load products at the moment.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="products">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            Discover our range of innovative products designed to transform your business.
          </p>
        </div>
      </section>

      {/* Products Grid */}
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
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}
          {!isLoading && !error && (
            <div className="products-grid">
              {products.map((product) => (
                <Card key={product.id} hoverable className="product-card">
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
                    <Button variant="primary" size="sm">
                      Learn More
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="products-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>We can build tailored products to meet your specific business requirements.</p>
            <Link to={ROUTES.CONTACT}>
              <Button variant="secondary" size="lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
