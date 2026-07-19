import { describe, it, expect } from 'vitest';
import { getInitials } from './strings';

describe('getInitials', () => {
  it('returns the first letter of the first two words, uppercased', () => {
    expect(getInitials('Pranav Pathak')).toBe('PP');
    expect(getInitials('udit pandey')).toBe('UP');
  });

  it('ignores extra whitespace between words', () => {
    expect(getInitials('Saumya   Pathak')).toBe('SP');
  });

  it('caps at two initials for names with more than two words', () => {
    expect(getInitials('Aditya Kumar Pandey')).toBe('AK');
  });

  it('handles a single-word name', () => {
    expect(getInitials('Cher')).toBe('C');
  });

  it('returns an empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
