import { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  /** Only use ariaLabel when button has no visible text (e.g., icon-only buttons) */
  ariaLabel?: string
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ariaLabel,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
