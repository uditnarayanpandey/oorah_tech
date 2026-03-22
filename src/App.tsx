import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary, LoadingSpinner } from '@components'
import Layout from '@components/layout/Layout'
import { ROUTES } from '@utils/constants'

// Lazy load pages for better performance
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Products = lazy(() => import('@pages/Products'))
const Contact = lazy(() => import('@pages/Contact'))
const TeamMember = lazy(() => import('@pages/TeamMember'))
const NotFound = lazy(() => import('@pages/NotFound'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner fullScreen size="lg" />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="team/:slug" element={<TeamMember />} />
            <Route path="products" element={<Products />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
