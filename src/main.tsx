import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

const startApp = async () => {
  // Initialize MSW for API mocking in development
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your HTML.')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

startApp()
