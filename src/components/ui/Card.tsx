import { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

const Card = ({ children, className = '', hoverable = false }: CardProps) => {
  return (
    <div className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return <div className={`card-header ${className}`}>{children}</div>
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

const CardBody = ({ children, className = '' }: CardBodyProps) => {
  return <div className={`card-body ${className}`}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return <div className={`card-footer ${className}`}>{children}</div>
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
