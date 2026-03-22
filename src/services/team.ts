import type { TeamMember } from '../types'
import { createApi } from './api'

const TEAM_BASE_URL =
  import.meta.env.VITE_TEAM_API_URL || import.meta.env.VITE_API_URL || '/api'

const teamApi = createApi(TEAM_BASE_URL)

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await teamApi.get<TeamMember[]>('/team')
  return response.data
}

export const fetchTeamMemberBySlug = async (slug: string): Promise<TeamMember> => {
  const response = await teamApi.get<TeamMember>(`/team/${slug}`)
  return response.data
}
