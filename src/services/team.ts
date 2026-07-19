import type { TeamMember } from '../types';
import { teamMembers } from '../data/team';

export const fetchTeamMembers = async (): Promise<TeamMember[]> => teamMembers;

export const fetchTeamMemberBySlug = async (
  slug: string,
): Promise<TeamMember> => {
  const member = teamMembers.find((item) => item.slug === slug);

  if (!member) {
    throw new Error('Team member not found.');
  }

  return member;
};
