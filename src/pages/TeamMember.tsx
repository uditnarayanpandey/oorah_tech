import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { TeamMember as TeamMemberType } from '../types'
import { fetchTeamMemberBySlug } from '../services/team'
import './TeamMember.css'

const TeamMember = () => {
  const { slug } = useParams()
  const [member, setMember] = useState<TeamMemberType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadTeamMember = async () => {
      try {
        if (!slug) {
          throw new Error('Missing team member identifier.')
        }

        const data = await fetchTeamMemberBySlug(slug)
        if (isMounted) {
          setMember(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load team details at the moment.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTeamMember()

    return () => {
      isMounted = false
    }
  }, [])

  const initials = useMemo(() => {
    if (!member) return ''
    return member.name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
  }, [member])

  if (isLoading) {
    return (
      <div className="team-member">
        <section className="team-member-hero">
          <div className="container">
            <h1>Loading team member...</h1>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="team-member">
        <section className="team-member-hero">
          <div className="container">
            <h1>Unable to load team member</h1>
            <p>{error}</p>
            <Link to="/about" className="team-member-back">
              Back to About
            </Link>
          </div>
        </section>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="team-member">
        <section className="team-member-hero">
          <div className="container">
            <h1>Team Member Not Found</h1>
            <p>We couldn’t find the team member you’re looking for.</p>
            <Link to="/about" className="team-member-back">
              Back to About
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="team-member">
      <section className="team-member-hero">
        <div className="container team-member-layout">
          <div className="team-member-avatar" aria-hidden>
            {member.imageUrl ? (
              <img src={member.imageUrl} alt="" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <p className="team-member-role">{member.role}</p>
            <h1 className="team-member-name">{member.name}</h1>
            {member.bio && <p className="team-member-bio">{member.bio}</p>}
            <Link to="/about" className="team-member-back">
              Back to About
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamMember
