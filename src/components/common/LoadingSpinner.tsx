import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const LoadingSpinner = ({ size = 'md', fullScreen = false }: LoadingSpinnerProps) => {
  const spinner = (
    <div className={`spinner spinner-${size}`} role="status" aria-label="Loading">
      <div className="spinner-circle"></div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="spinner-fullscreen">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
